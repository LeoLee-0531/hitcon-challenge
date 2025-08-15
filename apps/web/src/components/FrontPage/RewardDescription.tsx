'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

interface RewardDescriptionProps {
  isMobile: boolean;
}

export default function RewardDescription({
  isMobile,
}: RewardDescriptionProps) {
  const t = useTranslations('home.rewardDescription');
  return (
    <div className="glass-container shadow-md">
      <div>
        <div className="event-title font-bold">{t('title')}</div>
        <p className="event-content font-light">{t('content')}</p>
      </div>
      <div>
        <div className="reward-title font-bold">{t('levelSystemTitle')}</div>
        <div
          className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-8`}
        >
          <div className="reward-glass-container">
            <p className="reward-3 reward-level font-bold">{t('level1')}</p>
            <p className="reward-3 reward-prize font-bold">
              {t('level1Prize')}
            </p>
          </div>
          <div className="reward-glass-container">
            <p className="reward-5 reward-level font-bold">{t('level2')}</p>
            <p className="reward-5 reward-prize font-bold">
              {t('level2Prize')}
            </p>
          </div>
          <div className="reward-glass-container">
            <p className="reward-7 reward-level font-bold">{t('level3')}</p>
            <p className="reward-7 reward-prize font-bold">
              {t('level3Prize')}
            </p>
          </div>
        </div>
        <p className="pt-2 font-light text-[1rem] text-center text-[#E3E3E3]">
          {t('limitNote')}
        </p>
      </div>
      <div>
        <div className="reward-title font-bold">
          {t('exchangeProcessTitle')}
        </div>

        <div className="reward-list event-content">
          <div className="reward-list-content">
            <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full "></div>
            <p className="font-normal">{t('step1')}</p>
          </div>

          <div className="reward-list-content">
            <div className="w-[0.625rem] h-[0.625rem] bg-gray-300 rounded-full "></div>
            <p className="font-normal ">{t('step2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
