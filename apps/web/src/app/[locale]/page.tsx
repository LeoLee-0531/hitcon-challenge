'use client';

import { useTranslations } from 'next-intl';
import HeroSection from '@/components/FrontPage/HeroSection';
import Banner from '@/components/FrontPage/Banner';
import EventDescription from '@/components/FrontPage/EventDescription';
import RewardDescription from '@/components/FrontPage/RewardDescription';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import EnhancedAnimatedGrid from '@/components/EnhancedAnimatedGrid';

export default function Home() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <>
      {/* 酷酷的背景 不要也可以拿掉 */}
      <EnhancedAnimatedGrid />

      <HeroSection />
      <div className="flex flex-col gap-[3.25rem]">
        <Banner />
        <EventDescription />
        <RewardDescription />
      </div>
    </>
  );
}
