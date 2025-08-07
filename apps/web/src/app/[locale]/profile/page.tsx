'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024; // 使用標準的桌面斷點 (lg)

export default function ProfilePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-[#121712] flex flex-col items-center py-8">
      {/* Main Content */}
      <main
        className="w-full max-w-[1280px] bg-[#121712] flex flex-col items-center px-[160px] py-12"
        style={{
          paddingLeft: isMobile ? '16px' : '160px',
          paddingRight: isMobile ? '16px' : '160px',
          paddingTop: isMobile ? '24px' : '48px',
          paddingBottom: isMobile ? '24px' : '48px',
        }}
      >
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={128}
            height={128}
            className="rounded-full border-4 border-[#232B20]"
            style={{
              width: isMobile ? '80px' : '128px',
              height: isMobile ? '80px' : '128px',
              borderWidth: isMobile ? '2px' : '4px',
            }}
          />
          <div
            className="text-[22px] font-bold text-white mt-4"
            style={{
              fontSize: isMobile ? '16px' : '22px',
            }}
          >
            小美
          </div>
        </div>

        {/* Progress Section */}
        <div
          className="w-full max-w-[960px] flex flex-col items-center mb-8 rounded-lg p-6 border border-[#306930] border-opacity-100"
          style={{
            padding: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '24px' : '32px',
          }}
        >
          <div
            className="text-[24px] font-bold text-white mb-2"
            style={{
              fontSize: isMobile ? '18px' : '24px',
            }}
          >
            5/7
          </div>
          <div
            className="text-[#8FCC8F] mb-4 text-[14px]"
            style={{
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            通過關卡
          </div>
          <div className="w-full">
            <div
              className="text-[16px] flex justify-between text-xs text-gray-300 mb-1"
              style={{
                fontSize: isMobile ? '12px' : '16px',
              }}
            >
              <span>獎勵等級</span>
            </div>
            <div className="relative w-full h-2 bg-gray-700 rounded-full">
              {/* milestone 標籤（進度條上方） */}
              <div
                className="absolute w-full"
                style={{ top: '-25px', height: '16px', pointerEvents: 'none' }}
              >
                <span className="absolute left-3/7 top-0 -translate-x-1/2 text-white text-xs">
                  第一級
                </span>
                <span className="absolute left-5/7 top-0 -translate-x-1/2 text-white text-xs">
                  第二級
                </span>
                <span className="absolute right-0 top-0 text-white text-xs">
                  第三級
                </span>
              </div>
              {/* 7個關卡進度條 */}
              <div className="flex w-full h-2">
                {/* 第一關 */}
                <div className="flex-1 bg-[#0DF20D] rounded-l-full"></div>
                {/* 第二關 */}
                <div className="flex-1 bg-[#0DF20D]"></div>
                {/* 第三關 */}
                <div className="flex-1 bg-[#0DF20D]"></div>
                {/* 第四關 */}
                <div className="flex-1 bg-[#0DF20D]"></div>
                {/* 第五關 */}
                <div className="flex-1 bg-[#0DF20D]"></div>
                {/* 第六關 */}
                <div
                  className="flex-1"
                  style={{ backgroundColor: '#306930' }}
                ></div>
                {/* 第七關 */}
                <div
                  className="flex-1 rounded-r-full"
                  style={{ backgroundColor: '#306930' }}
                ></div>
              </div>
              {/* 分隔線 */}
              <div className="absolute top-0 left-1/7 w-px h-2 bg-white"></div>
              <div className="absolute top-0 left-2/7 w-px h-2 bg-white"></div>
              <div className="absolute top-[-1px] left-3/7 w-0.5 h-3 bg-white"></div>
              <div className="absolute top-0 left-4/7 w-px h-2 bg-white"></div>
              <div className="absolute top-[-1px] left-5/7 w-0.5 h-3 bg-white"></div>
              <div className="absolute top-0 left-6/7 w-px h-2 bg-white"></div>
              {/* 數字標籤（進度條下方） */}
              <div
                className="absolute w-full"
                style={{ top: '14px', height: '14px', pointerEvents: 'none' }}
              >
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '7.14%', lineHeight: '14px' }}
                >
                  1
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '21.43%', lineHeight: '14px' }}
                >
                  2
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '35.71%', lineHeight: '14px' }}
                >
                  3
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '50%', lineHeight: '14px' }}
                >
                  4
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '64.29%', lineHeight: '14px' }}
                >
                  5
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '78.57%', lineHeight: '14px' }}
                >
                  6
                </span>
                <span
                  className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                  style={{ left: '92.86%', lineHeight: '14px' }}
                >
                  7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 等級說明 */}
        <div
          className="w-full max-w-[960px] mb-8"
          style={{
            marginBottom: isMobile ? '24px' : '32px',
          }}
        >
          <div
            className="text-[22px] font-bold text-lg mb-4 text-white"
            style={{
              fontSize: isMobile ? '16px' : '22px',
              marginBottom: isMobile ? '16px' : '16px',
            }}
          >
            獎勵等級說明
          </div>
          {/* 動態渲染獎勵等級說明 */}
          {(() => {
            const userLevel = 2; // 假資料，之後可從 API 取得
            const levels = [
              { label: '第一級:需完成3關', achieved: userLevel >= 1 },
              { label: '第二級:需完成5關', achieved: userLevel >= 2 },
              { label: '第三級:需完成7關', achieved: userLevel >= 3 },
            ];
            return (
              <div
                className="space-y-[20px]"
                style={{ gap: isMobile ? '12px' : '20px' }}
              >
                {levels.map((level, idx) => (
                  <div className="flex items-center gap-3" key={level.label}>
                    {level.achieved ? (
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* 48x48 dark circle */}
                        <span
                          className="absolute w-12 h-12 rounded-full"
                          style={{ background: '#1F2937' }}
                        />
                        {/* 24x24 green circle centered */}
                        <span
                          className="absolute w-6 h-6 rounded-full"
                          style={{ background: '#0DF20D' }}
                        />
                        {/* check icon centered */}
                        <span
                          className="material-symbols-outlined text-[24px]"
                          style={{ color: '#1F2937', zIndex: 1 }}
                        >
                          check
                        </span>
                      </div>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: '#1F2937' }}
                      >
                        <span className="material-symbols-outlined text-[24px] text-white">
                          trophy
                        </span>
                      </div>
                    )}
                    <span
                      className="text-white"
                      style={{ fontSize: isMobile ? '12px' : '14px' }}
                    >
                      {level.label}
                    </span>
                    <span
                      className={`ml-auto ${level.achieved ? 'text-[#0DF20D]' : 'text-gray-400'}`}
                      style={{ fontSize: isMobile ? '10px' : '12px' }}
                    >
                      {level.achieved ? '已達成' : '未達成'}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* 兌換規則 */}
        <div
          className="w-full max-w-[960px] rounded-lg p-6 mb-8 border border-[#306930] border-opacity-100"
          style={{
            padding: isMobile ? '16px' : '24px',
            marginBottom: isMobile ? '24px' : '32px',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-bold text-white"
              style={{
                fontSize: isMobile ? '14px' : '16px',
              }}
            >
              兌換規則說明
            </span>
          </div>
          <div
            className="text-sm text-white leading-[20px]"
            style={{
              fontSize: isMobile ? '12px' : '14px',
              lineHeight: isMobile ? '16px' : '20px',
            }}
          >
            不管達成哪個等級，都只能領取一份獎品！但達成等級越高升能有更多選擇！
            <ul
              className="list-disc pl-5 mt-2 space-y-[12px]"
              style={{
                gap: isMobile ? '8px' : '12px',
              }}
            >
              <li>第一級：可選擇「貼紙」作為獎品。</li>
              <li>第二級：可選擇「貼紙」或「鑰匙圈」作為獎品（二擇一）。</li>
              <li>
                第三級：可選擇「貼紙」、「鑰匙圈」或「衣服」作為獎品（三擇一）。
              </li>
            </ul>
          </div>
        </div>

        {/* 產生 QR code 按鈕 */}
        <button
          className="w-full max-w-[960px] bg-[#0DF20D] text-[#232B20] font-bold py-3 rounded-lg mb-4 hover:bg-[#0BE60B] transition"
          style={{
            paddingTop: isMobile ? '12px' : '12px',
            paddingBottom: isMobile ? '12px' : '12px',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
          產生兌換 QR code
        </button>
        <div
          className="w-full max-w-[960px] text-center text-xs text-gray-400 mb-4"
          style={{
            fontSize: isMobile ? '10px' : '12px',
          }}
        >
          * 回到 SITCON 攤位出示 QR Code 即可兌換獎品
        </div>

        {/* QR code 區塊 */}
        <div
          className="w-full max-w-[960px] bg-[#2A3A2A] rounded-xl flex flex-col items-center py-12 relative overflow-hidden"
          style={{
            paddingTop: isMobile ? '32px' : '48px',
            paddingBottom: isMobile ? '32px' : '48px',
          }}
        >
          {/* 玻璃光線效果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent transform -skew-y-12 -translate-x-1/2 translate-y-1/2 w-full h-full"></div>
          {/* 折射效果層 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform rotate-45"></div>
          {/* 深度效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
          {/* 色散效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3A4A3A]/25 to-[#2A3A2A]/25"></div>
          {/* 霜化效果 */}
          <div className="absolute inset-0 backdrop-blur-sm bg-[#3A4A3A]/12"></div>
          {/* QR code 內容 */}
          <div className="relative z-10">
            <Image
              src="/qrcode.png"
              alt="QR code"
              width={200}
              height={200}
              style={{
                width: isMobile ? '150px' : '200px',
                height: isMobile ? '150px' : '200px',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
