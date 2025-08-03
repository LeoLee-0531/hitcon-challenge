'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale, locales } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

const languageNames: Record<Locale, string> = {
  en: 'English',
  zh: '繁體中文',
};

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    // 移除當前語言前綴，然後加上新語言前綴
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {languageNames[loc]}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.23 7.21l4.77 4.77 4.77-4.77 1.06 1.06-5.83 5.83-5.83-5.83 1.06-1.06z" />
        </svg>
      </div>
    </div>
  );
}
