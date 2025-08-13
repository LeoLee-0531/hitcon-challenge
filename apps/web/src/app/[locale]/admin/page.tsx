'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024;

export default function ScanParticipantPage() {
  const t = useTranslations('admin');
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<{
    id: string;
    username: string;
    avatar: string;
    completedChallenges: number;
    totalChallenges: number;
    level: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 檢查 URL 參數中是否有掃描結果
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scannedUserId = urlParams.get('userid');

    if (scannedUserId) {
      // 模擬 API 請求獲取用戶資料
      // 這裡會是實際的 API 請求：http://localhost:3001/api/reward/status?user_id=${scannedUserId}
      console.log('掃描到用戶ID:', scannedUserId);

      // 模擬 API 響應延遲
      setTimeout(() => {
        // 根據掃描到的 userid 生成模擬資料
        const completedChallenges = Math.floor(Math.random() * 7) + 1; // 1-7 隨機數

        // 根據解題數計算等級
        let level = 0;
        if (completedChallenges >= 7) {
          level = 3;
        } else if (completedChallenges >= 5) {
          level = 2;
        } else if (completedChallenges >= 3) {
          level = 1;
        }

        const mockUserData = {
          id: scannedUserId,
          username: `小美 ${scannedUserId}`,
          avatar: '/avatar.png',
          completedChallenges: completedChallenges,
          totalChallenges: 7,
          level: level,
        };

        setUserData(mockUserData);
        // 清除 URL 參數
        window.history.replaceState({}, '', '/admin');
      }, 500);
    }
  }, []);

  // 處理掃描 QR Code
  const handleScanQRCode = () => {
    router.push('/admin/scan');
  };

  // 處理兌換獎品
  const handleRedeem = () => {
    if (userData) {
      // 這裡可以發送 API 請求更新領獎狀態
      alert(t('rewardRedeemed'));
    }
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
        <h2 className="text-white text-2xl font-bold mb-6">
          {t('scanParticipantQRCode')}
        </h2>
        <div className="flex justify-center">
          <button
            className="bg-[#0DF20D] text-black px-8 py-3 rounded-[9999px] font-semibold hover:bg-[#BEE3BE] transition text-lg"
            onClick={handleScanQRCode}
          >
            {t('scanQRCode')}
          </button>
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
        {!userData ? (
          // 未掃描狀態
          <div className="text-white text-center py-20">
            <div className="text-4xl mb-4">📱</div>
            <div className="text-xl">{t('pleaseScanFirst')}</div>
          </div>
        ) : (
          // 已掃描狀態 - 顯示用戶資料
          <>
            {/* Participant Profile Title */}
            <h2 className="text-white text-2xl font-bold mb-6 self-start">
              {t('participantProfile')}
            </h2>

            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src={userData.avatar}
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
                {userData.username}
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
                {userData.completedChallenges}/{userData.totalChallenges}
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
                    style={{
                      top: '-25px',
                      height: '16px',
                      pointerEvents: 'none',
                    }}
                  >
                    <span className="absolute left-3/7 top-0 -translate-x-1/2 text-white text-xs">
                      {t('level1')}
                    </span>
                    <span
                      className="absolute top-0 -translate-x-1/2 text-white text-xs"
                      style={{ left: '42.8571%' }}
                    >
                      {t('level1')}
                    </span>
                    <span
                      className="absolute top-0 -translate-x-1/2 text-white text-xs"
                      style={{ left: '71.4286%' }}
                    >
                      {t('level2')}
                    </span>
                    <span className="absolute right-0 top-0 text-white text-xs">
                      {t('level3')}
                    </span>
                  </div>
                  {/* 7個關卡進度條 */}
                  <div className="flex w-full h-2">
                    {/* 動態生成進度條 */}
                    {Array.from(
                      { length: userData.totalChallenges },
                      (_, index) => {
                        const isCompleted =
                          index < userData.completedChallenges;
                        const isFirst = index === 0;
                        const isLast = index === userData.totalChallenges - 1;

                        return (
                          <div
                            key={index}
                            className={`flex-1 ${isFirst ? 'rounded-l-full' : ''} ${isLast ? 'rounded-r-full' : ''}`}
                            style={{
                              backgroundColor: isCompleted
                                ? '#0DF20D'
                                : '#306930',
                            }}
                          />
                        );
                      }
                    )}
                  </div>
                  {/* 分隔線 */}
                  <div
                    className="absolute top-0 w-px h-2 bg-white"
                    style={{ left: '14.2857%' }}
                  ></div>
                  <div
                    className="absolute top-0 w-px h-2 bg-white"
                    style={{ left: '28.5714%' }}
                  ></div>
                  <div
                    className="absolute top-[-1px] w-0.5 h-3 bg-white"
                    style={{ left: '42.8571%' }}
                  ></div>
                  <div
                    className="absolute top-0 w-px h-2 bg-white"
                    style={{ left: '57.1429%' }}
                  ></div>
                  <div
                    className="absolute top-[-1px] w-0.5 h-3 bg-white"
                    style={{ left: '71.4286%' }}
                  ></div>
                  <div
                    className="absolute top-0 w-px h-2 bg-white"
                    style={{ left: '85.7143%' }}
                  ></div>
                  {/* 數字標籤（進度條下方） */}
                  <div
                    className="absolute w-full"
                    style={{
                      top: '14px',
                      height: '14px',
                      pointerEvents: 'none',
                    }}
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
                {t('rewardLevelDescription')}
              </div>
              {/* 動態渲染獎勵等級說明 */}
              {(() => {
                const userLevel = userData.level; // 假資料，之後可從 API 取得
                const levels = [
                  {
                    label: t('level1Reward'),
                    achieved: userLevel >= 1,
                  },
                  {
                    label: t('level2Reward'),
                    achieved: userLevel >= 2,
                  },
                  {
                    label: t('level3Reward'),
                    achieved: userLevel >= 3,
                  },
                ];
                return (
                  <div
                    className="space-y-[20px]"
                    style={{ gap: isMobile ? '12px' : '20px' }}
                  >
                    {levels.map((level, idx) => (
                      <div
                        className="flex items-center gap-3"
                        key={level.label}
                        style={{
                          minHeight: isMobile ? '40px' : '48px',
                          alignItems: 'center',
                        }}
                      >
                        {level.achieved ? (
                          <div
                            className="relative flex items-center justify-center"
                            style={{
                              width: isMobile ? '32px' : '48px',
                              height: isMobile ? '32px' : '48px',
                              aspectRatio: '1',
                              flexShrink: 0,
                            }}
                          >
                            {/* dark circle */}
                            <span
                              className="absolute"
                              style={{
                                width: isMobile ? '32px' : '48px',
                                height: isMobile ? '32px' : '48px',
                                background: '#1F2937',
                                borderRadius: '50%',
                                aspectRatio: '1',
                                flexShrink: 0,
                              }}
                            />
                            {/* green circle centered */}
                            <span
                              className="absolute"
                              style={{
                                width: isMobile ? '16px' : '24px',
                                height: isMobile ? '16px' : '24px',
                                background: '#0DF20D',
                                borderRadius: '50%',
                                aspectRatio: '1',
                                flexShrink: 0,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                            {/* check icon centered */}
                            <span
                              className="material-symbols-outlined"
                              style={{
                                fontSize: isMobile ? '16px' : '24px',
                                color: '#1F2937',
                                zIndex: 1,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              check
                            </span>
                          </div>
                        ) : (
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: isMobile ? '32px' : '48px',
                              height: isMobile ? '32px' : '48px',
                              background: '#1F2937',
                              borderRadius: '50%',
                              aspectRatio: '1',
                              flexShrink: 0,
                            }}
                          >
                            <span
                              className="material-symbols-outlined text-white"
                              style={{
                                fontSize: isMobile ? '16px' : '24px',
                              }}
                            >
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
                          style={{
                            fontSize: isMobile ? '10px' : '12px',
                            width: isMobile ? '60px' : '80px',
                            textAlign: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {level.achieved ? t('achieved') : t('notAchieved')}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Action Button */}
            <button
              className="bg-[#0DF20D] text-black text-lg font-bold rounded-lg hover:bg-[#BEE3BE] transition mt-8"
              style={{
                width: isMobile ? '280px' : '480px',
                height: isMobile ? '36px' : '40px',
                fontSize: isMobile ? '12px' : '14px',
              }}
              onClick={handleRedeem}
            >
              {t('redeemReward')}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
