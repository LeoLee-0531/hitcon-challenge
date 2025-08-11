import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

const intlMiddleware = createMiddleware({
  // 支援的語言列表
  locales,

  // 當沒有匹配的語言時使用的預設語言
  defaultLocale,

  // 同時為預設語言顯示語言前綴
  localePrefix: 'as-needed',
});

export function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  return auth();
}

export const config = {
  // 僅匹配需要國際化的路徑
  matcher: [
    '/',
    '/(zh|en)/:path*',
    '/((?!api|_next|_vercel|auth/callback|.*\\..*).*)',
  ],
};
