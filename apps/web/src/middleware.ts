import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

const intlMiddleware = createMiddleware({
  // 支援的語言列表
  locales,

  // 當沒有匹配的語言時使用的預設語言
  defaultLocale,

  // 同時為預設語言顯示語言前綴
  localePrefix: 'as-needed',
});

export function middleware(request: NextRequest) {
  // const session = request.cookies.get('session')?.value;
  // const { pathname } = request.nextUrl;
  // const locale = pathname.split('/')[1]; // 取得語言前綴（如 'en' 或 'zh'）

  // let loginPath = '/login';
  // if (locale === 'en' || locale === 'zh') {
  //   loginPath = `/${locale}/login`;
  // }

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
