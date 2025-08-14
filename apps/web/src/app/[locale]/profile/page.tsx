'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { apiFetch } from '@/utils/apiFetch';
import { env } from '@/config/env';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024; // 使用標準的桌面斷點 (lg)

export default function ProfilePage() {
  const t = useTranslations('profile');
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 使用者資料結構
  const defaultUserData = {
    id: '',
    username: '',
    avatar: '/avatar.png',
    completedChallenges: 0,
    totalChallenges: 6,
    level: 0,
  };

  // 從 API 資料計算進度
  const currentUserData = userData || defaultUserData;
  const progressPercentage =
    (currentUserData.completedChallenges / currentUserData.totalChallenges) * 100;

  // 獲取使用者資料
  const fetchUserData = async () => {
    if (!session?.apiToken) return;

    try {
      const response = await apiFetch(`${env.API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.apiToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // 顯示API回傳的資料
          console.log('API回傳的完整資料:', result.data);
          console.log('API回傳的ID:', result.data.id);
          console.log('API回傳的ID類型:', typeof result.data.id);
          
          // 計算等級 (每完成 2 個關卡升一級)
          const completedCount = result.data.progress?.filter((p: any) => p.passed).length || 0;
          // 根據完成的關卡數計算等級：每完成2關升一級
          const calculatedLevel = Math.floor(completedCount / 2);
          
          setUserData({
            id: result.data.id,
            username: result.data.name || 'NonameUser',
            avatar: result.data.image || '/avatar.png',
            completedChallenges: completedCount,
            totalChallenges: 6,
            level: calculatedLevel,
          });
        }
      }
    } catch (error) {
      console.error('獲取使用者資料失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.apiToken) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [session?.apiToken]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const generateQRCode = async () => {
    try {
      setIsGenerating(true);

      // 模擬 QR code 生成過程
      await new Promise((resolve) => setTimeout(resolve, 1000));

             // 生成 QR code，內容是使用者 ID
       console.log('生成 QR code，使用者 ID:', currentUserData.id);
      setQrCodeGenerated(true);
    } catch (error) {
      console.error('生成 QR code 失敗:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
             src={currentUserData.avatar}
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
             {currentUserData.username}
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
                         {currentUserData.completedChallenges}/{currentUserData.totalChallenges}
          </div>
          <div
            className="text-[#8FCC8F] mb-4 text-[14px]"
            style={{
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            {t('completedChallenges')}
          </div>
          <div className="w-full">
            <div
              className="text-[16px] flex justify-between text-xs text-gray-300 mb-1"
              style={{
                fontSize: isMobile ? '12px' : '16px',
              }}
            >
              <span>{t('rewardLevel')}</span>
            </div>
            <div className="relative w-full h-2 bg-gray-700 rounded-full">
                             {/* milestone 標籤（進度條上方） */}
               <div
                 className="absolute w-full"
                 style={{ top: '-25px', height: '16px', pointerEvents: 'none' }}
               >
                 <span className="absolute left-1/3 top-0 -translate-x-1/2 text-white text-xs">
                   {t('level1')}
                 </span>
                 <span className="absolute left-2/3 top-0 -translate-x-1/2 text-white text-xs">
                   {t('level2')}
                 </span>
                 <span className="absolute right-0 top-0 text-white text-xs">
                   {t('level3')}
                 </span>
               </div>
              {/* 6個關卡進度條 */}
              <div className="flex w-full h-2">
                {/* 動態生成進度條 */}
                             {Array.from(
                   { length: currentUserData.totalChallenges },
                   (_, index) => {
                     const isCompleted =
                       index < currentUserData.completedChallenges;
                     const isFirst = index === 0;
                     const isLast = index === currentUserData.totalChallenges - 1;

                    return (
                      <div
                        key={index}
                        className={`flex-1 ${isFirst ? 'rounded-l-full' : ''} ${isLast ? 'rounded-r-full' : ''}`}
                        style={{
                          backgroundColor: isCompleted ? '#0DF20D' : '#306930',
                        }}
                      />
                    );
                  }
                )}
              </div>
                                            {/* 分隔線 */}
                <div className="absolute top-0 left-1/6 w-px h-2 bg-white"></div>
                <div className="absolute top-[-1px] left-2/6 w-0.5 h-3 bg-white"></div>
                <div className="absolute top-0 left-3/6 w-px h-2 bg-white"></div>
                <div className="absolute top-[-1px] left-4/6 w-0.5 h-3 bg-white"></div>
                <div className="absolute top-0 left-5/6 w-px h-2 bg-white"></div>
              {/* 數字標籤（進度條下方） */}
              <div
                className="absolute w-full"
                style={{ top: '14px', height: '14px', pointerEvents: 'none' }}
              >
                                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '8.33%', lineHeight: '14px' }}
                 >
                   1
                 </span>
                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '25%', lineHeight: '14px' }}
                 >
                   2
                 </span>
                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '41.67%', lineHeight: '14px' }}
                 >
                   3
                 </span>
                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '58.33%', lineHeight: '14px' }}
                 >
                   4
                 </span>
                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '75%', lineHeight: '14px' }}
                 >
                   5
                 </span>
                 <span
                   className="absolute -translate-x-1/2 text-gray-300 opacity-70 text-[10px] select-none"
                   style={{ left: '91.67%', lineHeight: '14px' }}
                 >
                   6
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
            {t('rewardLevelDescription')}
            <span className="text-sm font-normal text-gray-300 ml-2">
              {t('minRequirementNote')}
            </span>
          </div>
          {/* 動態渲染獎勵等級說明 */}
          {(() => {
            const userLevel = currentUserData.level;
            const levels = [
              { label: t('level1Requirement'), achieved: userLevel >= 1 },
              { label: t('level2Requirement'), achieved: userLevel >= 2 },
              { label: t('level3Requirement'), achieved: userLevel >= 3 },
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
                      {level.achieved ? t('achieved') : t('notAchieved')}
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
              {t('exchangeRules')}
            </span>
          </div>
          <div
            className="text-sm text-white leading-[20px]"
            style={{
              fontSize: isMobile ? '12px' : '14px',
              lineHeight: isMobile ? '16px' : '20px',
            }}
          >
            {t('exchangeRulesDescription')}
            <ul
              className="list-disc pl-5 mt-2 space-y-[12px]"
              style={{
                gap: isMobile ? '8px' : '12px',
              }}
            >
              <li>{t('level1Reward')}</li>
              <li>{t('level2Reward')}</li>
              <li>{t('level3Reward')}</li>
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
          onClick={generateQRCode}
          disabled={isGenerating}
        >
          {isGenerating ? t('generating') : t('generateQRCode')}
        </button>
        <div
          className="w-full max-w-[960px] text-center text-xs text-gray-400 mb-4"
          style={{
            fontSize: isMobile ? '10px' : '12px',
          }}
        >
          {t('qrCodeNote')}
        </div>

        {/* QR code 區塊 */}
        {qrCodeGenerated && (
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
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg inline-block">
                                     <QRCodeSVG
                     value={currentUserData.id}
                     size={isMobile ? 150 : 200}
                     level="M"
                     includeMargin={true}
                   />
                 </div>
                 <div className="text-white text-lg font-bold mt-2">
                   {t('congratulations')} {currentUserData.username}{' '}
                   {t('completedText')} {currentUserData.completedChallenges}{' '}
                   {t('completedChallengesText')}
                 </div>
                <div className="text-white text-lg mt-2">{t('thankYou')}</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
