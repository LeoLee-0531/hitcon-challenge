import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // 支援的語言列表
  locales,

  // 當沒有匹配的語言時使用的預設語言
  defaultLocale,

  // 同時為預設語言顯示語言前綴
  localePrefix: 'as-needed',
});

export function middleware(request: NextRequest) {
  // 讀取 NEXT_LOCALE cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const { pathname, search } = request.nextUrl;

  // 檢查目前路徑是否有語言前綴，並取得目前路徑語言
  const matchedLocale = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // 執行原本的 intlMiddleware
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;
  return NextResponse.next();
}

export const config = {
  // 僅匹配需要國際化的路徑
  matcher: [
    '/',
    '/(zh|en)/:path*',
    '/((?!api|_next|_vercel|auth/callback|.*\\..*).*)',
  ],
};
