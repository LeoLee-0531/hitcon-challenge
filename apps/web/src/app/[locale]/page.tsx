'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import HeroSection from '@/components/FrontPage/HeroSection';
import Banner from '@/components/FrontPage/Banner';
import EventDescription from '@/components/FrontPage/EventDescription';
import RewardDescription from '@/components/FrontPage/RewardDescription';
import EnhancedAnimatedGrid from '@/components/EnhancedAnimatedGrid';

const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const checkScreenSize = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <EnhancedAnimatedGrid />
      <div className="flex flex-col gap-6 md:gap-[3.25rem] px-4 md:px-8">
        <HeroSection isMobile={isMobile} />
        <Banner isMobile={isMobile} />
        <EventDescription isMobile={isMobile} />
        <RewardDescription isMobile={isMobile} />
      </div>
    </>
  );
}
