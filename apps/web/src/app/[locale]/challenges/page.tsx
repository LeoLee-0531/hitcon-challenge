'use client';

import { useState, useEffect } from 'react';
import { validateFlag } from '@/data/flags';
import challenges from '@/data/challenges';
import type { Challenge } from '@/types/challenge';
import ChallengeSidebar from '@/components/Challenges/ChallengeSidebar';
import ChallengeMain from '@/components/Challenges/ChallengeMain';
import '@/styles/components/Challenges.css';

const MOBILE_BREAKPOINT = 1024;

export default function ChallengesPage() {
  const [challengesList, setChallengesList] = useState<Challenge[]>(challenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
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
        const updatedChallenges = challengesList.map((challenge) =>
          challenge.id === selectedChallenge.id
            ? { ...challenge, completed: true }
            : challenge
        );
        setChallengesList(updatedChallenges);
        setSelectedChallenge((prev) => ({ ...prev, completed: true }));
        setPassword('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Flag 錯誤，請再試一次！');
        setPassword('');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('驗證失敗，請稍後再試！');
      setPassword('');
    }
    setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('idle');
    }, 5000);
  };

  return (
    <div className={isMobile ? 'layout-mobile' : 'layout-desktop'}>
      <ChallengeSidebar
        challengesList={challengesList}
        selectedChallenge={selectedChallenge}
        setSelectedChallenge={setSelectedChallenge}
        isMobile={isMobile}
      />
      <ChallengeMain
        selectedChallenge={selectedChallenge}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isMobile={isMobile}
        submitMessage={submitMessage}
        submitStatus={submitStatus}
      />
    </div>
  );
}