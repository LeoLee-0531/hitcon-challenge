'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Html5Qrcode, CameraDevice } from 'html5-qrcode';
import { useTranslations } from 'next-intl';

type UserData = {
  user_id: string;
  name?: string | null;
  passed_count: number;
  reward_claimed: boolean;
  claimed_at?: string | null;
};

export default function ScanPanel() {
  const t = useTranslations('scan');

  // UI 與流程狀態
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 相機裝置清單與當前選擇
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  // DOM 與掃描器實例
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // 掃描器執行狀態旗標（避免重入/重複 stop）
  const runningRef = useRef(false);
  const stoppingRef = useRef(false);

  // 安全停止掃描器：集中處理 stop、狀態與可忽略錯誤
  const safeStop = useCallback(async () => {
    // 若沒有實例、不是在跑、或已經在停止中，直接跳過
    if (!html5QrCodeRef.current || !runningRef.current || stoppingRef.current) return;

    stoppingRef.current = true;
    try {
      await html5QrCodeRef.current.stop();
    } catch (e) {
      const err = e as unknown;
      // 僅在「不是已停止/暫停」這類可忽略錯誤時輸出
      if (
        !(
          typeof err === 'object' &&
          err !== null &&
          'message' in err &&
          typeof (err as { message?: unknown }).message === 'string' &&
          (err as { message: string }).message.includes('scanner is not running or paused')
        )
      ) {
        console.error('停止掃描器時發生非預期錯誤：', err);
      }
    } finally {
      runningRef.current = false;
      stoppingRef.current = false;
      setIsScanning(false);
    }
  }, []);

  // 掃描成功回調：停止掃描器，呼叫後端查詢並顯示結果
  const handleScanSuccess = useCallback(
    async (data: string) => {
      // 避免同一個結果重複處理
      if (isProcessing) return;
      setIsProcessing(true);
      setScanResult(data);

      // 成功掃描後先停止掃描器，避免一直持續掃描
      await safeStop();

      // 呼叫後端取得使用者資料
      try {
        const res = await fetch(`/api/reward/status?user_id=${encodeURIComponent(data)}`);
        const result = (await res.json()) as { success: boolean; data?: UserData; message?: string };
        if (result.success && result.data) {
          setUserData(result.data);
          setShowModal(true);
        } else {
          alert(t('queryFailed'));
        }
      } catch (e) {
        console.error(e);
        alert(t('apiError'));
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, safeStop, t]
  );

  // 啟動掃描器：會先安全停止舊實例，再以指定相機開啟
  const startScanner = useCallback(
    async (cameraId?: string | null) => {
      try {
        // 啟動前先確保舊的已停止
        await safeStop();

        // 檢查 DOM 與 cameraId
        if (!scannerRef.current) {
          throw new Error('Scanner DOM element not mounted');
        }
        if (!cameraId) {
          setIsScanning(false);
          return;
        }

        // 建立新的 Html5Qrcode 實例
        const { Html5Qrcode } = await import('html5-qrcode');
        const html5QrCode = new Html5Qrcode('qr-reader');
        html5QrCodeRef.current = html5QrCode;

        // 開始掃描
        await html5QrCode.start(
          { deviceId: cameraId },
          {
            fps: 10,
            aspectRatio: 1.0,
            disableFlip: false,
          },
          handleScanSuccess,
          () => {
            // 可選：在這裡接收掃描失敗/未識別回調（此專案先忽略）
          }
        );

        // 標記為執行中
        runningRef.current = true;
        setIsScanning(true);
      } catch (e) {
        // 啟動失敗，重置執行狀態
        runningRef.current = false;

        let errorMsg = t('cameraAccessError');
        const err = e as unknown;
        if (
          typeof err === 'object' &&
          err !== null &&
          'message' in err &&
          typeof (err as { message?: unknown }).message === 'string'
        ) {
          errorMsg += `\n${(err as { message: string }).message}`;
        }
        alert(errorMsg);
        setIsScanning(false);
        console.error('啟動掃描器時發生錯誤：', e);
      }
    },
    [handleScanSuccess, safeStop, t]
  );

  // 重新開始掃描：清狀態、停止、再啟動
  const handleRestart = useCallback(async () => {
    setScanResult(null);
    setIsProcessing(false);
    setIsScanning(false);

    await safeStop();

    // 稍微延遲一下，避免瀏覽器裝置切換卡頓
    setTimeout(() => {
      void startScanner(selectedCameraId);
    }, 100);
  }, [safeStop, selectedCameraId, startScanner]);

  // 掛載時取得攝影機清單
  useEffect(() => {
    let isMounted = true;

    import('html5-qrcode')
      .then(({ Html5Qrcode }) => Html5Qrcode.getCameras())
      .then((devices: CameraDevice[]) => {
        if (!isMounted) return;
        setCameras(devices);

        // 預設選擇「後置」或清單第一個
        const defaultCamera =
          devices.find((camera) => {
            const label = camera.label?.toLowerCase?.() ?? '';
            return label.includes('back') || label.includes('後置') || label.includes('rear');
          })?.id ?? devices[0]?.id;

        setSelectedCameraId(defaultCamera ?? null);
      })
      .catch((e) => {
        console.error('取得攝影機清單失敗：', e);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // cameraId 變動時啟動掃描器；同時處理清理（離開或切換時停止）
  useEffect(() => {
    if (!selectedCameraId || !scannerRef.current) return;

    const timer = setTimeout(() => {
      void startScanner(selectedCameraId);
    }, 0);

    return () => {
      clearTimeout(timer);
      void safeStop();
    };
  }, [selectedCameraId, startScanner, safeStop]);

  // 使用者資訊 Modal
  const UserModal = ({ data }: { data: UserData }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181c18] rounded-lg p-8 w-[90vw] max-w-md shadow-lg relative">
        {/* 使用者資訊 */}
        <div className="space-y-2 text-white">
          <div>
            <span className="text-gray-400">名稱:</span> {data.name ?? '未提供'}
          </div>
          <div>
            <span className="text-gray-400">通過關卡數:</span> {data.passed_count}
          </div>
          <div>
            <span className="text-gray-400">已領獎:</span> {data.reward_claimed ? '是' : '否'}
          </div>
          {data.claimed_at && (
            <div>
              <span className="text-gray-400">領獎時間:</span> {new Date(data.claimed_at).toLocaleString()}
            </div>
          )}
        </div>

        {/* 操作按鈕 */}
        <div className="mt-6 flex flex-col gap-2 items-center">
          {!data.reward_claimed ? (
            // 領取獎勵
            <button
              className="bg-[#0DF20D] text-black px-4 py-2 rounded hover:bg-[#0be80b] w-full"
              onClick={async () => {
                try {
                  const res = await fetch('/api/reward/claim', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: data.user_id }),
                  });
                  const result = (await res.json()) as { success: boolean; message?: string };
                  if (result.success) {
                    alert(t('claimSuccess'));
                    setShowModal(false);
                    setUserData(null);
                    void handleRestart();
                  } else {
                    alert(result.message || t('claimFailed'));
                  }
                } catch (e) {
                  console.error(e);
                  alert(t('apiError'));
                }
              }}
            >
              {t('claimReward')}
            </button>
          ) : (
            // 重設兌換
            <button
              className="bg-[#F20D0D] text-white px-4 py-2 rounded hover:bg-[#e80b0b] w-full border-2 border-[#F20D0D]"
              onClick={async () => {
                if (!window.confirm('確定要重製兌換狀態？')) return;
                try {
                  const res = await fetch(`/api/reward/reset`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: data.user_id }),
                  });
                  const result = (await res.json()) as { success: boolean; message?: string };
                  if (result.success) {
                    alert(t('resetSuccess'));
                    setShowModal(false);
                    setUserData(null);
                    void handleRestart();
                  } else {
                    alert(result.message || t('resetFailed'));
                  }
                } catch (e) {
                  console.error(e);
                  alert(t('apiError'));
                }
              }}
            >
              {t('resetReward')}
            </button>
          )}

          {/* 再掃一次 */}
          <button
            className="bg-[#0DF20D] text黑 px-4 py-2 rounded hover:bg-[#0be80b] w-full"
            onClick={() => {
              setShowModal(false);
              setUserData(null);
              void handleRestart();
            }}
          >
            {t('scanAgain')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Header 說明與相機選擇 */}
      <div className="w-full max-w-[960px] flex flex-col mb-8 px-4 md:px-8">
        <div className="text-center mt-5">
          <div className="text-[#8FCC8F] text-lg mb-2">{t('alignQRCode')}</div>
          <div className="text-gray-400 text-sm">{t('autoRedirect')}</div>

          {/* 相機權限/存取失敗提示（未掃描時顯示） */}
          {!isScanning && !scanResult && (
            <div className="text-red-400 text-sm mt-2">{t('cameraAccessError')}</div>
          )}

          {/* 攝影機下拉選單 */}
          {cameras.length > 0 && (
            <div className="mt-4 flex flex-col items-center">
              <label htmlFor="camera-select" className="text-gray-400 mb-1">
                {t('selectCamera')}
              </label>
              <select
                id="camera-select"
                className="bg-[#181c18] text-white border border-[#0DF20D] rounded px-2 py-1"
                value={selectedCameraId ?? ''}
                onChange={(e) => setSelectedCameraId(e.target.value)}
              >
                {cameras.map((cam) => (
                  <option key={cam.id} value={cam.id}>
                    {cam.label || cam.id}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* 主內容：掃描框與提示 */}
      <main className="w-full max-w-[960px] bg-[#121712] flex flex-col items-center px-4 md:px-8">
        <div className="w-full max-w-[640px] flex justify-center">
          <div className="relative flex flex-col items-center">
            {/* 掃描器容器（html5-qrcode 會將 video 與 canvas 插入這個 div） */}
            <div className="relative overflow-hidden rounded-lg border-2 border-[#0DF20D] w-[300px] h-[300px] md:w-[400px] md:h-[400px] aspect-square">
              <div id="qr-reader" ref={scannerRef} className="w-full h-full aspect-square" />

              {/* 隱藏 html5-qrcode 的內建掃描框，並避免影像變暗 */}
              <style jsx>{`
                #qr-reader {
                  position: relative;
                }
                #qr-reader video {
                  border-radius: 8px;
                  filter: none !important;
                }
                #qr-reader div[style*='border: 2px solid white'],
                #qr-reader div[style*='border: 2px solid rgb(255, 255, 255)'] {
                  display: none !important;
                }
              `}</style>

              {/* 自訂掃描框指示器與掃描線 */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-[#0DF20D]"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-[#0DF20D]"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-[#0DF20D]"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#0DF20D]"></div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0DF20D] to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* 說明文字 */}
            <div className="mt-6 text-center">
              <div className="text-white text-lg mb-2">{t('putQRCodeInFrame')}</div>
              <div className="text-gray-400 text-sm">{t('ensureClear')}</div>
            </div>
          </div>
        </div>

        {/* 使用者資訊 Modal */}
        {showModal && userData && <UserModal data={userData} />}
      </main>
    </>
  );
}