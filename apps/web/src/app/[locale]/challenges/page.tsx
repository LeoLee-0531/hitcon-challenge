'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiFetch';
import { env } from '@/config/env';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024; // 使用標準的桌面斷點 (lg)

interface Challenge {
  id: string;
  stageId: string; // 新增：資料庫中的關卡 ID
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  link: string;
}

export default function ChallengesPage() {
  const t = useTranslations('challenges');
  const { data: session } = useSession();
  const router = useRouter();
  const [challengesList, setChallengesList] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 調試環境變數
  useEffect(() => {
    console.log('Environment variables:');
    console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log('env.API_BASE_URL:', env.API_BASE_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);
  }, []);

  // 獲取用戶進度
  const fetchUserProgress = useCallback(async () => {
    if (!session?.apiToken) return;

    try {
      const response = await apiFetch(`${env.API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.apiToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User profile:', result);
        
        if (result.success && result.data) {
          // 更新關卡完成狀態
          setChallengesList(prevChallenges => 
            prevChallenges.map((challenge) => {
              // 檢查這個關卡是否已完成
              const stageProgress = result.data.progress?.find(
                (progress: any) => progress.stage_id === challenge.stageId
              );
              
              const isCompleted = stageProgress?.passed || false;
              
              return {
                ...challenge,
                completed: isCompleted,
              };
            })
          );
          
          // 更新選中的關卡狀態
          setSelectedChallenge(prevSelected => {
            if (!prevSelected) return null;
            
            const stageProgress = result.data.progress?.find(
              (progress: any) => progress.stage_id === prevSelected.stageId
            );
            
            const isCompleted = stageProgress?.passed || false;
            
            return {
              ...prevSelected,
              completed: isCompleted,
            };
          });
        }
      }
    } catch (error) {
      console.error('獲取用戶進度錯誤:', error);
    }
  }, [session?.apiToken]);

  // 初始化挑戰列表
  useEffect(() => {
    const challenges: Challenge[] = [
      {
        id: 'instagram',
        stageId: '688a0306075d3123e024b691',
        title: t('instagram.title'),
        description: t('instagram.description'),
        completed: false,
        current: false,
        link: 'https://sitcon.org/instagram',
      },
      {
        id: 'worker-recruitment',
        stageId: '688a0306075d3123e024b68c',
        title: t('workerRecruitment.title'),
        description: t('workerRecruitment.description'),
        completed: false,
        current: false,
        link: '/recruitment',
      },
      {
        id: 'elf-text',
        stageId: '688a0306075d3123e024b692',
        title: t('elfText.title'),
        description: t('elfText.description'),
        completed: false,
        current: false,
        link: 'https://en.wikipedia.org/wiki/Cryptography',
      },
      {
        id: 'git-leak',
        stageId: '688a0306075d3123e024b68d',
        title: t('gitLeak.title'),
        description: t('gitLeak.description'),
        completed: false,
        current: false,
        link: 'https://camp-2025-gitleak.pages.dev/',
      },
      {
        id: 'python-jail',
        stageId: '688a0306075d3123e024b690',
        title: t('pythonJail.title'),
        description: t('pythonJail.description'),
        completed: false,
        current: false,
        link: 'https://camp-python-jail-game.joingame.cc/',
      },
      {
        id: 'about-sitcon',
        stageId: '688a0306075d3123e024b68f',
        title: t('aboutSitcon.title'),
        description: t('aboutSitcon.description'),
        completed: false,
        current: false,
        link: '/about',
      },
    ];

    setChallengesList(challenges);
    setSelectedChallenge(challenges[0]);
  }, [t]);

  // 當 session 改變時，獲取用戶進度（只在登入狀態改變時）
  useEffect(() => {
    if (session?.apiToken && challengesList.length > 0) {
      fetchUserProgress();
    }
  }, [session?.apiToken, challengesList.length, fetchUserProgress]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSubmit = async () => {
    if (!selectedChallenge) return;

    // 防止重複送出
    if (isSubmitting) return;

    // 檢查用戶是否已登入
    if (!session?.apiToken) {
      setSubmitStatus('error');
      setSubmitMessage('請先登入後再進行關卡驗證');
      return;
    }

    const trimmedPassword = password.trim();

    // 調試信息
    console.log('API Base URL:', env.API_BASE_URL);
    console.log('Selected Challenge:', selectedChallenge);
    console.log('Session:', session);

    try {
      setIsSubmitting(true);
      // 調用後端 API 驗證關卡密碼
      const apiUrl = `http://localhost:3001/api/stages/verify`;
      console.log('Calling API:', apiUrl);
      
      const response = await apiFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.apiToken && {
            'Authorization': `Bearer ${session.apiToken}`,
          }),
        },
        body: JSON.stringify({
          stage_id: selectedChallenge.stageId,
          password: trimmedPassword,
        }),
      });

      console.log('API Response:', response);

      if (response.ok) {
        const result = await response.json();
        console.log('API Result:', result);
        
        if (result.success) {
          setSubmitStatus('success');
          setSubmitMessage(t('successMessage'));

          // 重新獲取用戶進度以更新 UI
          await fetchUserProgress();

          // 清空輸入框
          setPassword('');
        } else {
          setSubmitStatus('error');
          setSubmitMessage(result.error?.message || t('errorMessage'));
          setPassword('');
        }
      } else {
        const errorData = await response.json();
        console.log('API Error:', errorData);
        setSubmitStatus('error');
        setSubmitMessage(errorData.error?.message || t('errorMessage'));
        setPassword('');
      }
    } catch (error) {
      console.error('驗證關卡密碼錯誤:', error);
      setSubmitStatus('error');
      setSubmitMessage(t('validationFailed'));
      setPassword('');
    } finally {
      setIsSubmitting(false);
    }

    // 5秒後清除訊息
    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('idle');
    }, 5000);
  };

  if (!selectedChallenge) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="text-white w-full"
      style={{
        backgroundColor: '#121712',
        fontFamily: 'var(--font-family-base)',
        maxWidth: '820px',
        margin: '0 auto',
      }}
    >
      <div
        className={
          isMobile
            ? 'flex flex-col items-center justify-center'
            : 'flex items-center'
        }
        style={{
          height: isMobile ? 'auto' : 'auto',
          minHeight: 'auto',
        }}
      >
        {/* Left Sidebar */}
        <div
          className="py-6"
          style={{
            backgroundColor: '#121712',
            width: isMobile ? '100%' : 'min(270px, 25vw)',
            maxWidth: '270px',
            paddingLeft: isMobile ? '16px' : '16px',
            paddingRight: isMobile ? '16px' : '16px',
            paddingTop: isMobile ? '8px' : '24px',
            paddingBottom: isMobile ? '8px' : '24px',
            marginTop: '10px',
            marginBottom: isMobile ? '12px' : '0',
          }}
        >
                     {isMobile ? (
             // 手機版：左右兩列布局
             <div
               style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
             >
               {/* 左邊三個任務 */}
               <div style={{ flex: 1 }}>
                 {challengesList.slice(0, 3).map((challenge, index) => (
                   <div
                     key={challenge.id}
                     className="relative flex items-start cursor-pointer"
                     style={{
                       width: '100%',
                       height: '40px',
                       marginBottom: '2px',
                     }}
                     onClick={() => setSelectedChallenge(challenge)}
                   >
                     {/* 圓形圖標 */}
                     <div
                       className="rounded-full flex items-center justify-center relative"
                       style={{
                         width: '24px',
                         height: '24px',
                         padding: '4px',
                         backgroundColor: challenge.completed
                           ? '#77B55A'
                           : 'transparent',
                         border: challenge.completed
                           ? 'none'
                           : '3px solid #ffffff',
                       }}
                     >
                       {challenge.completed && (
                         <svg
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           style={{
                             color: '#000000',
                             width: '14px',
                             height: '14px',
                             strokeWidth: '2',
                           }}
                         >
                           <path
                             fillRule="evenodd"
                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                             clipRule="evenodd"
                             stroke="currentColor"
                             strokeWidth="1.5"
                           />
                         </svg>
                       )}
                     </div>

                     {/* 文字框 */}
                     <div
                       className="ml-3 flex items-center"
                       style={{
                         width: 'calc(100% - 35px)',
                         height: '18px',
                         paddingTop: '5px',
                       }}
                     >
                       <span
                         style={{
                           color: '#ffffff',
                           fontSize: '12px',
                           fontWeight: 'bold',
                           lineHeight: '1',
                         }}
                       >
                         {challenge.title}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>

               {/* 右邊三個任務 */}
               <div style={{ flex: 1 }}>
                 {challengesList.slice(3, 6).map((challenge, index) => (
                   <div
                     key={challenge.id}
                     className="relative flex items-start cursor-pointer"
                     style={{
                       width: '100%',
                       height: '40px',
                       marginBottom: '2px',
                     }}
                     onClick={() => setSelectedChallenge(challenge)}
                   >
                     {/* 圓形圖標 */}
                     <div
                       className="rounded-full flex items-center justify-center relative"
                       style={{
                         width: '24px',
                         height: '24px',
                         padding: '4px',
                         backgroundColor: challenge.completed
                           ? '#77B55A'
                           : 'transparent',
                         border: challenge.completed
                           ? 'none'
                           : '3px solid #ffffff',
                       }}
                     >
                       {challenge.completed && (
                         <svg
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           style={{
                             color: '#000000',
                             width: '14px',
                             height: '14px',
                             strokeWidth: '2',
                           }}
                         >
                           <path
                             fillRule="evenodd"
                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                             clipRule="evenodd"
                             stroke="currentColor"
                             strokeWidth="1.5"
                           />
                         </svg>
                       )}
                     </div>

                     {/* 文字框 */}
                     <div
                       className="ml-3 flex items-center"
                       style={{
                         width: 'calc(100% - 35px)',
                         height: '18px',
                         paddingTop: '5px',
                       }}
                     >
                       <span
                         style={{
                           color: '#ffffff',
                           fontSize: '12px',
                           fontWeight: 'bold',
                           lineHeight: '1',
                         }}
                       >
                         {challenge.title}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          ) : (
            // 電腦版：保持原來的垂直布局
            <div className="relative">
              {challengesList.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className="relative flex items-start cursor-pointer"
                  style={{
                    width: '214px',
                    height: '64px',
                    marginBottom: '0',
                  }}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  {/* 圓形圖標 */}
                  <div
                    className="rounded-full flex items-center justify-center relative"
                    style={{
                      width: '33px',
                      height: '33px',
                      padding: '7px',
                      backgroundColor: challenge.completed
                        ? '#77B55A'
                        : 'transparent',
                      border: challenge.completed
                        ? 'none'
                        : '3px solid #ffffff',
                    }}
                  >
                    {challenge.completed && (
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{
                          color: '#000000',
                          width: '20px',
                          height: '20px',
                          strokeWidth: '2',
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </div>

                  {/* 文字框 */}
                  <div
                    className="ml-3 flex items-center"
                    style={{
                      width: '166px',
                      height: '24px',
                      paddingTop: '8px',
                    }}
                  >
                    <span
                      style={{
                        color: '#ffffff',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        lineHeight: '1',
                      }}
                    >
                      {challenge.title}
                    </span>
                  </div>

                  {/* 連接線 (除了最後一個項目) */}
                  {index < challengesList.length - 1 && (
                    <div
                      className="absolute"
                      style={{
                        left: '15px',
                        top: '40px',
                        width: '2px',
                        height: '20px',
                        backgroundColor: '#3B543B',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div
          className={isMobile ? 'w-full' : 'flex-1 flex items-start'}
          style={{
            paddingLeft: isMobile ? '0' : '40px',
            paddingRight: isMobile ? '0' : '40px',
          }}
        >
          <div
            className="p-8 flex flex-col justify-center"
            style={{
              width: isMobile ? 'calc(100% - 64px)' : 'min(520px, 60vw)',
              height: isMobile ? 'auto' : '400px',
              minHeight: isMobile ? '350px' : '400px',
              borderRadius: isMobile ? '16px' : '20px',
              background:
                'linear-gradient(135deg, rgba(143, 204, 143, 0.3) 0%, rgba(71, 102, 71, 0.3) 100%)',
              marginLeft: isMobile ? '32px' : '40px',
              marginRight: isMobile ? '32px' : '0',
              backdropFilter: 'blur(20px) brightness(80%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow:
                '20px 20px 40px rgba(0, 0, 0, 0.5), inset -1px -1px 0 rgba(255, 255, 255, 0.3), inset 1px 1px 0 rgba(0, 0, 0, 0.2)',
              filter: 'brightness(80%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="flex justify-center mb-6">
              <h1
                className="font-bold"
                style={{
                  color: '#ffffff',
                  fontSize: isMobile ? '20px' : '28px',
                }}
              >
                {selectedChallenge.title}
              </h1>
            </div>

            {selectedChallenge.description && (
              <div className="flex justify-center mb-8">
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: isMobile ? '12px' : '16px',
                    textAlign: 'center',
                    padding: isMobile ? '0 20px' : '0',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {selectedChallenge.description}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-center">
                <Link
                  href={selectedChallenge.link}
                  className="font-medium rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    width: isMobile ? '120px' : '140px',
                    height: isMobile ? '36px' : '40px',
                    backgroundColor: '#0DF20D',
                    color: '#000000',
                    border: 'none',
                    fontSize: isMobile ? '12px' : '14px',
                    gap: '4px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0BE00B')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0DF20D')
                  }
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: isMobile ? '14px' : '18px',
                      margin: isMobile ? '4px' : '6px',
                      color: '#121712',
                    }}
                  >
                    open_in_new
                  </span>
                  <span>{t('goToChallenge')}</span>
                </Link>
              </div>

              <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Enter Flag: SITCON{...}"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSubmitting) {
                        handleSubmit();
                      }
                    }}
                    disabled={isSubmitting}
                    className="rounded-lg transition-colors custom-input"
                    style={{
                      width: isMobile ? 'calc(100% - 32px)' : 'min(448px, 100%)',
                      height: isMobile ? '48px' : '56px',
                      backgroundColor: 'rgba(23, 51, 23, 0.2)',
                      border: '1px solid #306930',
                      color: '#ffffff',
                      outline: 'none',
                      margin: '8px 16px',
                      padding: '0 16px',
                      borderRadius: '8px',
                      backdropFilter: 'blur(30px) brightness(90%)',
                      boxShadow:
                        '0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      filter: 'brightness(90%)',
                      fontSize: isMobile ? '14px' : '16px',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
                    onBlur={(e) => (e.target.style.borderColor = '#444444')}
                  />

                  <button
                    className="font-medium rounded-lg transition-colors"
                    style={{
                      width: isMobile ? 'calc(100% - 32px)' : 'min(448px, 100%)',
                      height: isMobile ? '36px' : '40px',
                      backgroundColor: '#0DF20D',
                      color: '#000000',
                      border: 'none',
                      margin: '8px 16px',
                      fontSize: isMobile ? '14px' : '16px',
                      opacity: isSubmitting ? 0.6 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => {
                      if (!isSubmitting) handleSubmit();
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0BE00B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0DF20D';
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('submitting') : t('submit')}
                  </button>
              </div>

              {submitMessage && (
                <div
                  style={{
                    textAlign: 'center',
                    margin: '4px 16px',
                    padding: '8px',
                    borderRadius: '8px',
                    width: isMobile ? 'calc(100% - 32px)' : 'min(448px, 100%)',
                    backgroundColor:
                      submitStatus === 'success'
                        ? 'rgba(34, 197, 94, 0.25)'
                        : 'rgba(239, 68, 68, 0.25)',
                    color: submitStatus === 'success' ? '#22c55e' : '#ef4444',
                    fontSize: isMobile ? '12px' : '14px',
                    border: `1px solid ${submitStatus === 'success' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
