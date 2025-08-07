import { getRequestConfig } from 'next-intl/server';

// 支援的語言列表
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

// 預設語言
export const defaultLocale: Locale = 'zh';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
