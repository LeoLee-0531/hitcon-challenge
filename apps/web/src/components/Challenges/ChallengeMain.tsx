'use client';

import { useState } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import '@/styles/components/Challenges.css';

interface Challenge {
  id: string;
  stageId: string; // New: stage ID in database
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  link: string;
}

interface ChallengeMainProps {
  selectedChallenge: Challenge | null;
  isMobile: boolean;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  submitMessage: string;
  submitStatus: 'idle' | 'success' | 'error';
}

export default function ChallengeMain({
  selectedChallenge,
  isMobile,
  password,
  setPassword,
  handleSubmit,
  isSubmitting,
  submitMessage,
  submitStatus,
}: ChallengeMainProps) {
  const t = useTranslations('challenges');

  if (!selectedChallenge) {
    return (
      <div
        className="challenge-glass-container"
        style={{
          width: isMobile ? 'calc(100% - 32px)' : '',
          height: isMobile ? 'auto' : '',
          minHeight: isMobile ? '350px' : '',
          padding: isMobile ? '24px 16px' : '',
        }}
      >
        <div
          className="font-bold title"
          style={{ fontSize: isMobile ? '20px' : '' }}
        >
          {t('selectChallenge')}
        </div>
      </div>
    );
  }

  return (
    <div
      className="challenge-glass-container"
      style={{
        width: isMobile ? 'calc(100% - 32px)' : '',
        height: isMobile ? 'auto' : '',
        minHeight: isMobile ? '350px' : '',
        padding: isMobile ? '24px 16px' : '',
      }}
    >
      <div
        className="font-bold title"
        style={{ fontSize: isMobile ? '20px' : '' }}
      >
        {selectedChallenge.title}
      </div>

      {selectedChallenge.description && (
        <p
          className="description"
          style={{
            fontSize: isMobile ? '14px' : '',
            padding: isMobile ? '0 16px' : '',
          }}
        >
          {selectedChallenge.description}
        </p>
      )}

      <a
        href={selectedChallenge.link}
        target="_blank"
        rel="noopener noreferrer"
        className="challenge-btn goto"
      >
        <div className="goto-span">
          <SquareArrowOutUpRight className="h-5" />
          <span>{t('goToChallenge')}</span>
        </div>
      </a>

      <input
        type="text"
        placeholder={'Enter Flag: SITCON{...}'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        className="flag-glass-container"
        style={{
          width: isMobile ? 'calc(100% - 32px)' : '',
          height: isMobile ? '48px' : '',
          fontSize: isMobile ? '14px' : '',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
        onBlur={(e) => (e.target.style.borderColor = '#444444')}
      />

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="challenge-btn submit"
        style={{
          width: isMobile ? 'calc(100% - 32px)' : '',
          height: isMobile ? '36px' : '',
          fontSize: isMobile ? '14px' : '',
          padding: isMobile ? '8px 16px' : '',
        }}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>

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
            border: `1px solid ${
              submitStatus === 'success'
                ? 'rgba(34, 197, 94, 0.4)'
                : 'rgba(239, 68, 68, 0.4)'
            }`,
            backdropFilter: 'blur(10px)',
          }}
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
}
