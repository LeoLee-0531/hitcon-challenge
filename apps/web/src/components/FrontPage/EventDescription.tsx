'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';
import {
  Menu,
  X,
  User,
  Users,
  Trophy,
  ExternalLink,
  Shield,
  Zap,
  Brain,
  Smartphone,
} from 'lucide-react';
interface EventDescriptionProps {
  isMobile: boolean;
}

export default function EventDescription({ isMobile }: EventDescriptionProps) {
  const t = useTranslations('home.eventDescription');
  return (
    <div
      className={`glass-container shadow-md ${isMobile ? 'w-full p-4' : ''}`}
    >
      <div>
        <div className="event-title font-bold">{t('title')}</div>
        <p className="event-content font-light">{t('content')}</p>
      </div>
      <div>
        <div className="event-title font-bold">{t('participationTitle')}</div>
        <div className="event-list">
          <div className="event-list-content">
            <User className="event-list-icon " />
            <p className="event-content font-normal ">{t('login')}</p>
          </div>
          <div className="event-list-content">
            <Shield className="event-list-icon " />
            <p className="event-content font-normal ">{t('flag')}</p>
          </div>
          <div className="event-list-content">
            <Trophy className="event-list-icon " />
            <p className="event-content font-normal ">{t('rewards')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
