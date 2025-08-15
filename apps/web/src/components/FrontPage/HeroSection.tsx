'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';
import { MapPin, Calendar } from 'lucide-react';

interface HeroSectionProps {
  isMobile: boolean;
}

export default function HeroSection({ isMobile }: HeroSectionProps) {
  const t = useTranslations('home.hero');
  return (
    <div className="front-hero flex-col-center">
      <div
        className={`front-hero-title font-bold ${isMobile ? 'text-center' : ''}`}
      >
        {t('title')}
      </div>

      <div className="front-hero-subtitle font-bold">{t('subtitle')}</div>

      <div className="front-hero-div flex-center flex-wrap ">
        <div className="flex-center">
          <Calendar className="front-hero-icon " />
          <div className="front-hero-content">{t('date')}</div>
        </div>

        <div className="flex-center">
          <MapPin className="front-hero-icon " />
          <div className="front-hero-content">{t('location')}</div>
        </div>
      </div>
    </div>
  );
}
