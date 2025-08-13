'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';
import { useTranslations } from 'next-intl';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024;

export default function ScanPage() {
  const t = useTranslations('scan');
  const [isMobile, setIsMobile] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 啟動掃描器
  useEffect(() => {
    if (scannerRef.current && !html5QrCodeRef.current) {
      startScanner();
    }

    return () => {
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  const startScanner = async () => {
    try {
      // 如果已經有掃描器在運行，先停止它
      if (html5QrCodeRef.current && isScanning) {
        try {
          await html5QrCodeRef.current.stop();
        } catch (err) {
          console.log(t('stoppingScanner'), err);
        }
      }

      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 0) {
        // 選擇後置相機（如果有的話）
        const cameraId =
          cameras.find(
            (camera) =>
              camera.label.toLowerCase().includes('back') ||
              camera.label.toLowerCase().includes('後置') ||
              camera.label.toLowerCase().includes('rear')
          )?.id || cameras[0].id;

        await html5QrCode.start(
          { deviceId: cameraId },
          {
            fps: 10,
            aspectRatio: 1.0,
            disableFlip: false,
          },
          (decodedText) => {
            handleScanSuccess(decodedText);
          },
          (errorMessage) => {
            // 忽略掃描錯誤，繼續掃描
          }
        );
        setIsScanning(true);
      } else {
        setError(t('noCameraFound'));
      }
    } catch (err) {
      console.error(t('startingScannerFailed'), err);
      setError(t('cannotStartCamera'));
      setIsScanning(false);
    }
  };

  // 處理掃描成功
  const handleScanSuccess = (data: string) => {
    if (!isProcessing) {
      setIsProcessing(true);
      setScanResult(data);

      // 停止掃描器
      if (html5QrCodeRef.current && isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
        setIsScanning(false);
      }

      // 顯示掃描成功訊息
      setTimeout(() => {
        // 跳轉回管理頁面，帶上掃描到的用戶ID
        router.push(`/admin?userid=${encodeURIComponent(data)}`);
      }, 1500);
    }
  };

  // 返回管理頁面
  const handleBack = () => {
    router.push('/admin');
  };

  // 重新開始掃描
  const handleRestart = async () => {
    setScanResult(null);
    setError(null);
    setIsProcessing(false);
    setIsScanning(false);

    // 重新啟動掃描器
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.error('停止掃描器失敗:', err);
      }
    }

    // 重置掃描器引用
    html5QrCodeRef.current = null;

    setTimeout(() => {
      startScanner();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#121712] flex flex-col items-center py-8">
      {/* Header */}
      <div
        className="w-full max-w-[960px] flex flex-col mb-8"
        style={{
          paddingLeft: isMobile ? '16px' : '32px',
          paddingRight: isMobile ? '16px' : '32px',
        }}
      >
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-4 text-left">
            {t('qrCodeScanner')}
          </h2>
          <div className="text-center">
            <button
              onClick={handleBack}
              className="bg-[#BEE3BE] text-black px-8 py-3 rounded-[9999px] font-semibold hover:bg-gray-600 transition text-lg"
            >
              {t('backToAdmin')}
            </button>
          </div>
        </div>

        <div className="text-center topmargin-20">
          <div className="text-[#8FCC8F] text-lg mb-2">{t('alignQRCode')}</div>
          <div className="text-gray-400 text-sm">{t('autoRedirect')}</div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="w-full max-w-[960px] bg-[#121712] flex flex-col items-center px-4"
        style={{
          paddingLeft: isMobile ? '16px' : '32px',
          paddingRight: isMobile ? '16px' : '32px',
        }}
      >
        {error ? (
          // 錯誤狀態
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❌</div>
            <div className="text-white text-xl mb-4">
              {t('scannerStartFailed')}
            </div>
            <div className="text-gray-400 mb-6">{error}</div>
            <button
              onClick={handleRestart}
              className="bg-[#0DF20D] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#0BE60B] transition"
            >
              {t('retry')}
            </button>
          </div>
        ) : scanResult ? (
          // 掃描成功狀態
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✅</div>
            <div className="text-white text-xl mb-4">{t('scanSuccess')}</div>
            <div className="text-[#8FCC8F] mb-6">{t('redirecting')}</div>
            <div className="bg-[#232B20] rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="text-gray-400 text-sm mb-2">
                {t('scanResult')}
              </div>
              <div className="text-white text-sm break-all">{scanResult}</div>
            </div>
            <div className="animate-pulse">
              <div className="w-6 h-6 border-2 border-[#0DF20D] border-t-transparent rounded-full mx-auto animate-spin"></div>
            </div>
          </div>
        ) : (
          // 掃描中狀態
          <div className="w-full max-w-[640px] flex justify-center">
            <div className="relative flex flex-col items-center">
              {/* 掃描器容器 */}
              <div
                className="relative overflow-hidden rounded-lg border-2 border-[#0DF20D]"
                style={{
                  width: isMobile ? '300px' : '400px',
                  height: isMobile ? '300px' : '400px',
                }}
              >
                <div
                  id="qr-reader"
                  ref={scannerRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1 / 1',
                  }}
                />

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
        )}
      </main>
    </div>
  );
}
