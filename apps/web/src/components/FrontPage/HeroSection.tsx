'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

export default function HeroSection() {
  const t = useTranslations('');
  return (
    <div className="front-hero flex-col-center">
      <div className="front-hero-title font-bold">SITCON X HITCON 2025</div>

      <div className="front-hero-subtitle font-bold">駭客挑戰，限時開啟！</div>

      <div className="front-hero-div flex-center flex-wrap ">
        <div className="flex-center">
          <img className="front-hero-icon" src="/calander.svg"></img>
          <div className='front-hero-content font-[\"Geist\"]'>8/15–8/16</div>
        </div>

        <div className="flex-center">
          <img className="front-hero-icon" src="/map.svg"></img>
          <div className="front-hero-content">中央研究院 人文社會科學館</div>
        </div>
      </div>
    </div>
  );
}
