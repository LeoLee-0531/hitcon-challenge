'use client';

import { useState, useEffect } from 'react';
import { validateFlag } from '@/data/flags';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024; // 使用標準的桌面斷點 (lg)

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  link: string;
}

const challenges: Challenge[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    description: '在 SITCON 的 Instagram 上,似乎藏著什麼祕密....',
    completed: true,
    current: true,
    link: 'https://sitcon.org/instagram',
  },
  {
    id: 'prompt-injection',
    title: 'Prompt Injection',
    description: '',
    completed: true,
    current: false,
    link: 'https://sitcon.org/prompt-injection',
  },
  {
    id: 'worker-recruitment',
    title: 'SITCON 工人招募',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/worker-recruitment',
  },
  {
    id: 'elf-text',
    title: '精靈文',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/elf-text',
  },
  {
    id: 'git-leak',
    title: 'Git Leak',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/git-leak',
  },
  {
    id: 'python-jail',
    title: 'Python Jail',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/python-jail',
  },
  {
    id: 'about-sitcon',
    title: '關於 SITCON',
    description: '',
    completed: false,
    current: false,
    link: 'https://sitcon.org/about-sitcon',
  },
];

export default function ChallengesPage() {
  const [challengesList, setChallengesList] = useState<Challenge[]>(challenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

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
    const trimmedPassword = password.trim();

    try {
      const isValid = await validateFlag(selectedChallenge.id, trimmedPassword);

      if (isValid) {
        setSubmitStatus('success');
        setSubmitMessage('恭喜！Flag 正確！');

        // 更新 challenges 陣列
        const updatedChallenges = challengesList.map((challenge) =>
          challenge.id === selectedChallenge.id
            ? { ...challenge, completed: true }
            : challenge
        );
        setChallengesList(updatedChallenges);

        // 更新 selectedChallenge
        setSelectedChallenge((prev) => ({ ...prev, completed: true }));

        // 清空輸入框
        setPassword('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Flag 錯誤，請再試一次！');

        // 清空輸入框
        setPassword('');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('驗證失敗，請稍後再試！');
      setPassword('');
    }

    // 5秒後清除訊息
    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('idle');
    }, 5000);
  };

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
          height: isMobile ? 'auto' : 'calc(100vh - 80px - 180px)',
          minHeight: 'calc(100vh - 80px - 180px)',
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
              {/* 左邊四個任務 */}
              <div style={{ flex: 1 }}>
                {challengesList.slice(0, 4).map((challenge, index) => (
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
                {challengesList.slice(4, 7).map((challenge, index) => (
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
                  {index < challenges.length - 1 && (
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
              width: isMobile ? 'calc(100% - 32px)' : 'min(520px, 60vw)',
              height: isMobile ? 'auto' : '400px',
              minHeight: isMobile ? '350px' : '400px',
              borderRadius: isMobile ? '16px' : '20px',
              background:
                'linear-gradient(135deg, rgba(143, 204, 143, 0.3) 0%, rgba(71, 102, 71, 0.3) 100%)',
              marginLeft: isMobile ? '16px' : '40px',
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
                  }}
                >
                  {selectedChallenge.description}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-center">
                <a
                  href={selectedChallenge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    width: isMobile ? '120px' : '116px',
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
                    className="material-icons"
                    style={{
                      fontSize: isMobile ? '14px' : '18px',
                      margin: isMobile ? '4px' : '6px',
                      color: '#121712',
                    }}
                  >
                    open_in_new
                  </span>
                  <span>前往關卡</span>
                </a>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="輸入 Flag : SITCON{...}"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
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
                  }}
                  onClick={handleSubmit}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0BE00B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0DF20D';
                  }}
                >
                  送出
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
