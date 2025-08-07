'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale, locales } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

const languageNames: Record<Locale, string> = {
  en: 'EN',
  zh: 'ZH',
};

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageToggle = () => {
    // 切換到另一種語言
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    // 移除當前語言前綴，然後加上新語言前綴
    const pathWithoutLocale =
      pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <button
      className={`w-full h-full ${className}`}
      onClick={handleLanguageToggle}
    >
      {languageNames[locale === 'zh' ? 'en' : 'zh']}
    </button>
  );
}
