'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

interface SitconLogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export function SitconLogo({ className, height = 30, width = 100 }: SitconLogoProps) {
  return (
    <Image
      src="/logo/sitcon-white.svg"
      alt="Sitcon Logo"
      className={className}
      height={height}
      width={width}
    />
  );
}

export default function Navigation() {
  const t = useTranslations('nav');

  return (
    <nav className='nav p-10'>
      <div className="nav-content glass-box mx-auto flex justify-between items-center">
        <div className="nav-side">
          <Link href="/" className="flex items-center">
            <SitconLogo />
          </Link>
        </div>
        <div className="nav-links flex gap-[50px]">
          <Link href="/about" className="nav-link">
            {t('challenges')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('about')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('recruitment')}
          </Link>
        </div>
        <div className="nav-side flex items-center gap-4">
          <LanguageSwitcher className="language-switcher side-box" />
          <Link href="/login" className="login side-box nav-link flex items-center justify-center">
            {t('login')}
          </Link>
        </div>
      </div>
    </nav>
  );
}