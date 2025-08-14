'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';
import {
  Menu,
  X,
  User,
  MapPin,
  Calendar,
  Users,
  Trophy,
  ExternalLink,
  Shield,
  Zap,
  Brain,
  Smartphone,
} from "lucide-react";

interface HeroSectionProps {
  isMobile: boolean;
}

export default function HeroSection({ isMobile }: HeroSectionProps) {
  const t = useTranslations('');
  return (
    <div className="front-hero flex-col-center">
      <div
        className={`front-hero-title font-bold ${isMobile ? 'text-center' : ''}`}
      >
        SITCON X HITCON 2025
      </div>

      <div className="front-hero-subtitle font-bold">駭客挑戰，限時開啟！</div>

      <div className="front-hero-div flex-center flex-wrap ">
        <div className="flex-center">
          <Calendar className="front-hero-icon " />
          <div className="front-hero-content">8/15–8/16</div>
        </div>

        <div className="flex-center">
          <MapPin className="front-hero-icon " />
          <div className="front-hero-content">中央研究院 人文社會科學館</div>
        </div>
      </div>
    </div>
  );
}
