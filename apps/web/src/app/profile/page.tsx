'use client';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#121712] flex flex-col items-center py-8">
      {/* Header */} {/* 之後直接 import 寫好的 navbar */}
      <header className="w-full max-w-[1280px] flex items-center justify-between px-8 py-4 bg-[#121712] rounded-t-2xl border border-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-[#0DF20D]">
            SITC
            <span className="inline-flex items-center justify-center w-8 h-8 bg-[#0DF20D] rounded-full text-[#121712] text-sm font-bold relative">
              <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0DF20D] rounded-full"></span>
              <span className="text-xs">X</span>
            </span>
            N
          </span>
        </div>
        <nav className="flex gap-8 text-white font-medium">
          <a href="#" className="hover:underline">
            闖關地圖
          </a>
          <a href="#" className="hover:underline">
            關於 SITCON
          </a>
          <a href="#" className="hover:underline">
            SITCON 工人招募
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-[#232B20] w-10 h-10 flex items-center justify-center">
            <span className="text-white">🌐</span>
          </button>
          <Image
            src="/avatar.png"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </header>
      {/* Main Content */}{' '}
      {/* 等 google OAuth 用好之後要改，這裡要去取 user 資料 */}
      <main className="w-full max-w-[1280px] bg-[#121712] flex flex-col items-center px-[160px] py-12">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={128}
            height={128}
            className="rounded-full border-4 border-[#232B20]"
          />
          <div className="text-[22px] font-bold text-white mt-4">小美</div>
        </div>
        {/* Progress Section - 簡潔版本 */}{' '}
        {/* 等 google OAuth 用好之後要改，這裡要去取 user 資料 */}
        <div className="w-full max-w-[960px] flex flex-col items-center mb-8 rounded-lg p-6 border border-[#306930] border-opacity-100">
          <div className="text-[24px] font-bold text-white mb-2">5/7</div>
          <div className="text-[#8FCC8F] mb-4 text-[14px]">通過關卡</div>
          <div className="w-full">
            <div className="text-[16px] flex justify-between text-xs text-gray-300 mb-1">
              <span>獎勵等級</span>
              <span>第2級</span>
            </div>
            <div className="relative w-full h-2 bg-gray-700 rounded-full">
              <div
                className="absolute left-0 top-0 h-2 bg-[#0DF20D] rounded-full"
                style={{ width: '71%' }}
              />
            </div>
          </div>
        </div>
        {/* 等級說明 - 簡潔版本 */}{' '}
        {/* 等 google OAuth 用好之後要改，這裡要去取 user 資料 */}
        <div className="w-full max-w-[960px] mb-8">
          <div className="text-[22px] font-bold text-lg mb-4 text-white">
            獎勵等級說明
          </div>
          <div className="space-y-[20px]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#0DF20D] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>{' '}
                {/* 依 user 資料改變 */}
              </div>
              <span className="text-white">第一級:需完成3關</span>
              <span className="ml-auto text-[#0DF20D]">已達成</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#0DF20D] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>{' '}
                {/* 依 user 資料改變 */}
              </div>
              <span className="text-white">第二級:需完成5關</span>
              <span className="ml-auto text-[#0DF20D]">已達成</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏆</span>{' '}
                {/* 依 user 資料改變 */}
              </div>
              <span className="text-white">第三級:需完成7關</span>
              <span className="ml-auto text-gray-400">未達成</span>
            </div>
          </div>
        </div>
        {/* 兌換規則 */}
        <div className="w-full max-w-[960px] rounded-lg p-6 mb-8 border border-[#306930] border-opacity-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-white">兌換規則說明</span>
          </div>
          <div className="text-sm text-white leading-[20px]">
            不管達成哪個等級，都只能領取一份獎品！但達成等級越高升能有更多選擇！
            <ul className="list-disc pl-5 mt-2 space-y-[12px]">
              <li>第一級：可選擇「吊飾」作為獎品。</li>
              <li>第二級：可選擇「吊飾」或「衣服」作為獎品（二擇一）。</li>
              <li>
                第三級：可選擇「吊飾」、「衣服」或「馬克杯」作為獎品（三擇一）。
              </li>
            </ul>
          </div>
        </div>
        {/* 產生 QR code 按鈕 */} {/* 要搞產生 QRcode 的 api */}
        <button className="w-full max-w-[960px] bg-[#0DF20D] text-[#232B20] font-bold py-3 rounded-lg mb-4 hover:bg-[#0BE60B] transition">
          產生兌換 QR code {/* 按鈕按後要跳出產生的 QRcode  */}
        </button>
        <div className="w-full max-w-[960px] text-center text-xs text-gray-400 mb-4">
          * 回到 SITCON 攤位出示 QR Code 即可兌換獎品
        </div>
        {/* QR code 區塊 */}
        <div className="w-full max-w-[960px] bg-[#2A3A2A] rounded-xl flex flex-col items-center py-12 relative overflow-hidden">
          {/* 玻璃光線效果 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent transform -skew-y-12 -translate-x-1/2 translate-y-1/2 w-full h-full"></div>
          {/* 折射效果層 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform rotate-45"></div>
          {/* 深度效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
          {/* 色散效果 - 改為更淺色 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3A4A3A]/25 to-[#2A3A2A]/25"></div>
          {/* 霜化效果 */}
          <div className="absolute inset-0 backdrop-blur-sm bg-[#3A4A3A]/12"></div>
          {/* QR code 內容 */} {/* 等產生 QRcode 的 api 搞好之後要改 */}
          <div className="relative z-10">
            <Image src="/qrcode.png" alt="QR code" width={200} height={200} />
          </div>
        </div>
      </main>
    </div>
  );
}
