'use client';

import { useTranslations } from 'next-intl';
import '@/styles/components/FrontPage.css';

export default function Banner() {
  const t = useTranslations('');
  return (
    <div className="flex-center">
      <div className="banner-content font-bold">
        挑戰七道關卡，贏得 SITCON 限定好禮！
      </div>
    </div>
  );
}
