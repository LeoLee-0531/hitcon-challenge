'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

interface BannerProps {
  isMobile: boolean;
}

export default function Banner({ isMobile }: BannerProps) {
  const t = useTranslations('');
  return (
    <div className="flex-center">
      <div className={`banner-content font-bold ${isMobile ? 'text-base' : ''}`}>
        挑戰七道關卡，贏得 SITCON 限定好禮！
      </div>
    </div>
  );
}
