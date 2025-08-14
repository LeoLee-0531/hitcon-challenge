'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

interface BannerProps {
  isMobile: boolean;
}

export default function Banner({ isMobile }: BannerProps) {
  const t = useTranslations('home.banner');
  return (
    <div className="flex-center">
      <div
        className={`banner-content font-bold ${isMobile ? 'text-base' : ''}`}
      >
        {t('content')}
      </div>
    </div>
  );
}
