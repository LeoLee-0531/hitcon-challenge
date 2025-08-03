import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // 支援的語言列表
  locales,

  // 當沒有匹配的語言時使用的預設語言
  defaultLocale,

  // 同時為預設語言顯示語言前綴
  localePrefix: 'as-needed',
});

export const config = {
  // 僅匹配需要國際化的路徑
  matcher: [
    // 在根路徑啟用重定向到匹配的語言
    '/',

    // 為所有帶有語言前綴的請求設定 cookie 來記住之前的語言
    '/(zh|en)/:path*',

    // 啟用為缺失語言的重定向
    // (例如：`/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
