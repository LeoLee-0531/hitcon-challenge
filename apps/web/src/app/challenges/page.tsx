'use client';

import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

const challenges: Challenge[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    description: '在 SITCON 的 Instagram 上,似乎藏著什麼祕密....',
    completed: true,
    current: true,
  },
  {
    id: 'prompt-injection',
    title: 'Prompt Injection',
    description: '',
    completed: true,
    current: false,
  },
  {
    id: 'worker-recruitment',
    title: 'SITCON 工人招募',
    description: '',
    completed: false,
    current: false,
  },
  {
    id: 'elf-text',
    title: '精靈文',
    description: '',
    completed: false,
    current: false,
  },
  {
    id: 'git-leak',
    title: 'Git Leak',
    description: '',
    completed: false,
    current: false,
  },
  {
    id: 'python-jail',
    title: 'Python Jail',
    description: '',
    completed: false,
    current: false,
  },
  {
    id: 'about-sitcon',
    title: '關於 SITCON',
    description: '',
    completed: false,
    current: false,
  },
];

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [password, setPassword] = useState('');

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundColor: '#121712',
        fontFamily: '"Noto Sans TC", "Microsoft JhengHei", Arial, sans-serif',
        paddingLeft: '65px',
        paddingRight: '65px',
      }}
    >
      {/* Top Navigation Bar */}
      <nav
        className="px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: '#121712',
          borderBottom: '1px solid #374151',
        }}
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold" style={{ color: '#ffffff' }}>
              SITCON
            </span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#4ade80' }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#000000' }}
              ></div>
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="transition-colors"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              闖關地圖
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              關於 SITCON
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              SITCON 工人招募
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: '#22c55e',
              color: '#ffffff',
            }}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: '#6b7280' }}
          ></div>
        </div>
      </nav>

      <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Left Sidebar */}
        <div
          className="py-6"
          style={{
            backgroundColor: '#121712',
            width: '320px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <div className="relative">
            {challenges.map((challenge, index) => (
              <div
                key={challenge.id}
                className="relative flex items-start cursor-pointer"
                style={{
                  width: '214px',
                  height: '64px',
                }}
                onClick={() => setSelectedChallenge(challenge)}
              >
                {/* 33x33 圓形圖標 */}
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: '33px',
                    height: '33px',
                    padding: '7px',
                    backgroundColor: challenge.completed
                      ? '#77B55A'
                      : 'transparent',
                    border: challenge.completed ? 'none' : '3px solid #ffffff',
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

                {/* 166x24 文字框 */}
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
                      left: '15px' /* 圓形的中心點 */,
                      top: '40px' /* 40px圓形的底部 + 2px */,
                      width: '2px',
                      height: '20px',
                      backgroundColor: '#3B543B',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="p-8 flex flex-col justify-center"
            style={{
              width: '520px',
              height: '395px',
              borderRadius: '20px',
              background:
                'linear-gradient(135deg, rgba(143, 204, 143, 0.3) 0%, rgba(71, 102, 71, 0.3) 100%)',
              marginLeft: '187px',
              marginRight: '187px',
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
                  fontSize: '28px',
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
                    fontSize: '16px',
                  }}
                >
                  {selectedChallenge.description}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-center">
                <button
                  className="font-medium rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    width: '116px',
                    height: '40px',
                    backgroundColor: '#0DF20D',
                    color: '#000000',
                    border: 'none',
                    fontSize: '14px',
                    gap: '4px',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0BE00B')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0DF20D')
                  }
                >
                  <img
                    src="go-to-challenge.png"
                    alt="check"
                    style={{ width: '18px', height: '18px', margin: '6px' }}
                  />
                  <span>前往關卡</span>
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="輸入 Flag : SITCON{...}"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg transition-colors custom-input"
                  style={{
                    width: '448px',
                    height: '56px',
                    backgroundColor: 'rgba(23, 51, 23, 0.2)',
                    border: '1px solid #306930',
                    color: '#ffffff',
                    outline: 'none',
                    margin: '12px 16px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(30px) brightness(90%)',
                    boxShadow:
                      '0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    filter: 'brightness(90%)',
                    fontSize: '16px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
                  onBlur={(e) => (e.target.style.borderColor = '#444444')}
                />
              </div>

              <button
                className="font-medium rounded-lg transition-colors"
                style={{
                  width: '448px',
                  height: '40px',
                  backgroundColor: '#0DF20D',
                  color: '#000000',
                  border: 'none',
                  margin: '12px 16px',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#0BE00B')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#0DF20D')
                }
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
