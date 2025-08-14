"use client";
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ScanPanel() {
  const t = useTranslations('scan');
  const { data: session, status } = useSession();

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);

  // 掛載時自動啟動掃描器，卸載時停止
  useEffect(() => {
    // 掛載時取得攝像頭列表 (dynamic import)
    let isMounted = true;
    import('html5-qrcode').then(({ Html5Qrcode }) => {
      Html5Qrcode.getCameras().then((devices: any[]) => {
        if (!isMounted) return;
        setCameras(devices);
        // 預設選擇後置或第一個攝像頭
        const defaultCamera =
          devices.find(
            (camera) =>
              camera.label.toLowerCase().includes('back') ||
              camera.label.toLowerCase().includes('後置') ||
              camera.label.toLowerCase().includes('rear')
          )?.id || devices[0]?.id;
        setSelectedCameraId(defaultCamera || null);
      });
    });
    return () => { isMounted = false; };
  }, []);

  // cameraId 變動時啟動掃描器
  useEffect(() => {
    if (!selectedCameraId || !scannerRef.current) return;
    const timer = setTimeout(() => {
      startScanner(selectedCameraId);
    }, 0);
    return () => {
      clearTimeout(timer);
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [selectedCameraId]);

  // 掃描成功處理
  const handleScanSuccess = async (data: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setScanResult(data);
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop().catch((err: any) => {
        if (err && typeof err.message === 'string' && err.message.includes('scanner is not running or paused')) {
          // 忽略此錯誤
          return;
        }
        console.error(err);
      });
      setIsScanning(false);
    }
    // 呼叫 API 取得使用者資料
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const token = session?.apiToken || '';
      const res = await fetch(`${baseURL}/api/reward/status?user_id=${encodeURIComponent(data)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
        setShowModal(true);
      } else {
        alert(t('queryFailed'));
      }
    } catch (err) {
      alert(t('apiError'));
      console.error(err);
    } finally {
      // 無論成功或失敗都重設 isProcessing，確保可以再次掃描
      setIsProcessing(false);
    }
  };

  // Modal 元件
  // TODO: Modal 樣式優化
  const UserModal = ({ data }: { data: any }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181c18] rounded-lg p-8 w-[90vw] max-w-md shadow-lg relative">
        <div className="space-y-2 text-white">
          <div><span className="text-gray-400">名稱:</span> {data.name ?? '未提供'}</div>
          <div><span className="text-gray-400">通過關卡數:</span> {data.passed_count}</div>
          <div><span className="text-gray-400">已領獎:</span> {data.reward_claimed ? '是' : '否'}</div>
          {data.claimed_at && (
            <div><span className="text-gray-400">領獎時間:</span> {new Date(data.claimed_at).toLocaleString()}</div>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-2 items-center">
          {/* 領取獎勵按鈕 */}
          {!data.reward_claimed ? (
            <button
              className="bg-[#0DF20D] text-black px-4 py-2 rounded hover:bg-[#0be80b] w-full"
              onClick={async () => {
                try {
                  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
                  const token = session?.apiToken || '';
                  const res = await fetch(`${baseURL}/api/admin/reward/claim`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({ user_id: data.user_id }),
                  });
                  const result = await res.json();
                  if (result.success) {
                    alert(t('claimSuccess'));
                    setShowModal(false);
                    setUserData(null);
                    handleRestart();
                  } else {
                    alert(result.message || t('claimFailed'));
                  }
                } catch (err) {
                  alert(t('apiError'));
                  console.error(err);
                }
              }}
            >{t('claimReward')}</button>
          ) : (
            <button
              className="bg-[#F20D0D] text-white px-4 py-2 rounded hover:bg-[#e80b0b] w-full border-2 border-[#F20D0D]"
              onClick={async () => {
                if (!window.confirm('確定要重製兌換狀態？')) return;
                try {
                  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
                  const token = session?.apiToken || '';
                  const res = await fetch(`${baseURL}/api/admin/reward/reset`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: token ? `Bearer ${token}` : '',
                    },
                    body: JSON.stringify({ user_id: data.user_id }),
                  });
                  const result = await res.json();
                  if (result.success) {
                    alert(t('resetSuccess'));
                    setShowModal(false);
                    setUserData(null);
                    handleRestart();
                  } else {
                    alert(result.message || t('resetFailed'));
                  }
                } catch (err) {
                  alert(t('apiError'));
                  console.error(err);
                }
              }}
            >{t("resetReward")}</button>
          )}
          <button
            className="bg-[#0DF20D] text-black px-4 py-2 rounded hover:bg-[#0be80b] w-full"
            onClick={() => {
              setShowModal(false);
              setUserData(null);
              handleRestart();
            }}
          >{t('scanAgain')}</button>
        </div>
      </div>
    </div>
  );

  // 啟動掃描器
  const startScanner = async (cameraId?: string | null) => {
    try {
      if (html5QrCodeRef.current) {
        try {
          await html5QrCodeRef.current.stop();
        } catch (err: any) {
          // 只在非「scanner is not running or paused」時才顯示錯誤
        }
      }
      if (!scannerRef.current) {
        throw new Error('Scanner DOM element not mounted');
      }
      if (!cameraId) {
        setIsScanning(false);
        return;
      }
      // dynamic import
      const { Html5Qrcode } = await import('html5-qrcode');
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;
      await html5QrCode.start(
        { deviceId: cameraId },
        {
          fps: 10,
          aspectRatio: 1.0,
          disableFlip: false,
        },
        handleScanSuccess,
        () => { }
      );
      setIsScanning(true);
    } catch (err: any) {
      let errorMsg = t('cameraAccessError');
      if (err && err.message) {
        errorMsg += `\n${err.message}`;
      }
      alert(errorMsg);
      setIsScanning(false);
      console.error('Error occurred while starting scanner: ', err);
    }
  };

  // 重新開始掃描
  const handleRestart = async () => {
    setScanResult(null);
    setIsProcessing(false);
    setIsScanning(false);
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.error('Error occurred while stopping scanner:', err);
      }
      html5QrCodeRef.current = null;
    }
    setTimeout(() => {
      startScanner(selectedCameraId);
    }, 100);
  };

  if (status === 'loading') {
    // 不執行 API 請求
    return;
  }

  return (
    <>
      {/* Header */}
      <div className="w-full max-w-[960px] flex flex-col mb-8 px-4 md:px-8">
        <div className="text-center mt-5">
          <div className="text-[#8FCC8F] text-lg mb-2">{t('alignQRCode')}</div>
          <div className="text-gray-400 text-sm">{t('autoRedirect')}</div>
          {/* 相機權限/存取失敗提示 */}
          {!isScanning && !scanResult && (
            <div className="text-red-400 text-sm mt-2">{t('cameraAccessError')}</div>
          )}
          {/* 攝像頭選擇下拉選單 */}
          {cameras.length > 0 && (
            <div className="mt-4 flex flex-col items-center">
              <label htmlFor="camera-select" className="text-gray-400 mb-1">{t('selectCamera')}</label>
              <select
                id="camera-select"
                className="bg-[#181c18] text-white border border-[#0DF20D] rounded px-2 py-1"
                value={selectedCameraId || ''}
                onChange={e => setSelectedCameraId(e.target.value)}
              >
                {cameras.map(cam => (
                  <option key={cam.id} value={cam.id}>{cam.label || cam.id}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-[960px] bg-[#121712] flex flex-col items-center px-4 md:px-8">
        {/* 掃描中狀態 */}
        <div className="w-full max-w-[640px] flex justify-center">
          <div className="relative flex flex-col items-center">
            {/* 掃描器容器 */}
            <div className="relative overflow-hidden rounded-lg border-2 border-[#0DF20D] w-[300px] h-[300px] md:w-[400px] md:h-[400px] aspect-square">
              <div id="qr-reader" ref={scannerRef} className="w-full h-full aspect-square" />

              {/* 隱藏 html5-qrcode 的內建掃描框，保持相機正常亮度 */}
              <style jsx>{`
                #qr-reader {
                  position: relative;
                }
                #qr-reader video {
                  border-radius: 8px;
                  filter: none !important;
                }
                /* 隱藏內建的白色掃描框 */
                #qr-reader div[style*='border: 2px solid white'],
                #qr-reader
                  div[style*='border: 2px solid rgb(255, 255, 255)'] {
                  display: none !important;
                }
              `}</style>

              {/* 掃描框指示器覆蓋層 */}
              <div className="absolute inset-0 pointer-events-none">
                {/* 四個角落的掃描指示器 */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-[#0DF20D]"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-[#0DF20D]"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-[#0DF20D]"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#0DF20D]"></div>

                {/* 掃描線動畫 */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0DF20D] to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* 掃描說明 */}
            <div className="mt-6 text-center">
              <div className="text-white text-lg mb-2">
                {t('putQRCodeInFrame')}
              </div>
              <div className="text-gray-400 text-sm">{t('ensureClear')}</div>
            </div>
          </div>
        </div>
        {/* Modal 顯示使用者資料 */}
        {showModal && userData && (
          <UserModal data={userData} />
        )}
      </main>
    </>
  );
}
