'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import ChallengeSidebar from '@/components/Challenges/ChallengeSidebar';
import ChallengeMain from '@/components/Challenges/ChallengeMain';
import { apiFetch } from '@/utils/apiFetch';
import { env } from '@/config/env';
import '@/styles/components/Challenges.css';

// 響應式設計斷點
const MOBILE_BREAKPOINT = 1024; // 使用標準的桌面斷點 (lg)

// 安全設定常數
const FLAG_MAX_LENGTH = 150; // Flag 輸入的最大長度限制
const FLAG_PATTERN = /^SITCON\{.*\}$/; // Flag 格式驗證正則表達式

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
  const { data: session, status } = useSession();
  const t = useTranslations('challenges');

  const [challengesList, setChallengesList] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 登入提醒狀態
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // 如果 session 為 null，導回首頁並提醒登入
  useEffect(() => {
    if (status === 'loading') return; // 等待 useSession 完成
    if (!session) {
      setShowLoginAlert(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }, [session, status]);

  // 清理和驗證 flag 輸入
  const sanitizeFlag = (input: string): string => {
    // 強制轉成字串
    const strInput = String(input);
    // 移除多餘空白
    const trimmed = strInput.trim();
    // 限制長度 (防止過長輸入攻擊)
    return trimmed.length > FLAG_MAX_LENGTH
      ? trimmed.substring(0, FLAG_MAX_LENGTH)
      : trimmed;
  };

  // 驗證 flag 格式
  const validateFlagFormat = (flag: string): boolean => {
    // 檢查是否為空
    if (!flag) return false;
    // 檢查是否包含 SITCON{...} 格式
    return FLAG_PATTERN.test(flag);
  };

  // 獲取用戶進度
  const fetchUserProgress = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/profile`);

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data && typeof result.data === 'object') {
          // 安全地驗證 progress 資料
          const progressData = result.data.progress;
          if (Array.isArray(progressData)) {
            // 更新關卡完成狀態
            setChallengesList((prevChallenges) =>
              prevChallenges.map((challenge: Challenge) => {
                // 檢查這個關卡是否已完成
                const stageProgress = progressData.find(
                  (progress: any) =>
                    progress &&
                    typeof progress === 'object' &&
                    'stage_id' in progress &&
                    'passed' in progress &&
                    progress.stage_id === challenge.stageId
                );

                const isCompleted = stageProgress?.passed === true;

                return {
                  ...challenge,
                  completed: isCompleted,
                };
              })
            );

            // 更新選中的關卡狀態
            setSelectedChallenge((prevSelected: Challenge | null) => {
              if (!prevSelected) return null;

              const stageProgress = progressData.find(
                (progress: any) =>
                  progress &&
                  typeof progress === 'object' &&
                  'stage_id' in progress &&
                  'passed' in progress &&
                  progress.stage_id === prevSelected.stageId
              );

              const isCompleted = stageProgress?.passed === true;

              return {
                ...prevSelected,
                completed: isCompleted,
              };
            });
          }
        }
      }
    } catch (error) {
      // 靜默處理錯誤
    }
  }, [session]);

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
        link: 'https://very-nice-python-jail-game.nelsongx.me/',
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
    const checkScreenSize = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
      setSubmitMessage(t('loginRequired'));
      return;
    }

    // 清理和驗證 flag
    const sanitizedPassword = sanitizeFlag(password);

    // 驗證 flag 格式
    if (!validateFlagFormat(sanitizedPassword)) {
      setSubmitStatus('error');
      setSubmitMessage(t('invalidFlagFormat'));
      return;
    }

    try {
      setIsSubmitting(true);
      // 調用後端 API 驗證關卡密碼
      const apiUrl = `${env.API_BASE_URL}/api/stages/verify`;

      const response = await apiFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.apiToken && {
            Authorization: `Bearer ${session.apiToken}`,
          }),
        },
        body: JSON.stringify({
          stage_id: selectedChallenge.stageId,
          password: sanitizedPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // 驗證 API 回應格式
        if (result && typeof result === 'object' && 'success' in result) {
          if (result.success) {
            setSubmitStatus('success');
            setSubmitMessage(t('successMessage'));

            // 重新獲取用戶進度以更新 UI
            await fetchUserProgress();

            // 清空輸入框
            setPassword('');
          } else {
            setSubmitStatus('error');
            // 安全地處理錯誤訊息
            const errorMsg =
              result.error &&
                typeof result.error === 'object' &&
                'message' in result.error
                ? String(result.error.message)
                : t('errorMessage');
            setSubmitMessage(errorMsg);
            setPassword('');
          }
        } else {
          setSubmitStatus('error');
          setSubmitMessage(t('validationFailed'));
          setPassword('');
        }
      } else {
        try {
          const errorData = await response.json();
          setSubmitStatus('error');
          // 安全地處理錯誤訊息
          const errorMsg =
            errorData.error &&
              typeof errorData.error === 'object' &&
              'message' in errorData.error
              ? String(errorData.error.message)
              : t('errorMessage');
          setSubmitMessage(errorMsg);
        } catch (parseError) {
          setSubmitStatus('error');
          setSubmitMessage(t('errorMessage'));
        }
        setPassword('');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(t('validationFailed'));
      setPassword('');
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('idle');
    }, 5000);
  };

  if (showLoginAlert) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-4">{t('loginRequired')}</h2>
          <p>{t('redirectingToHome')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={isMobile ? 'layout-mobile ' : 'layout-desktop pb-4'}>
        <ChallengeSidebar
          challengesList={challengesList}
          selectedChallenge={selectedChallenge}
          setSelectedChallenge={setSelectedChallenge}
          isMobile={isMobile}
        />
        {selectedChallenge && (
          <ChallengeMain
            selectedChallenge={selectedChallenge}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            isMobile={isMobile}
            submitMessage={submitMessage}
            submitStatus={submitStatus}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
