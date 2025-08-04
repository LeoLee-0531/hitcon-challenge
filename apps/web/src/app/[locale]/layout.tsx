import type { Metadata } from 'next';
import { Noto_Sans_TC, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import Navigation from '@/components/Navigation';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'HITCON Challenge',
    template: '%s | HITCON Challenge',
  },
  description: 'Security Challenge Platform',
  keywords: ['security', 'hacking', 'CTF', 'cybersecurity', 'challenge'],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    title: 'HITCON Challenge',
    description: 'Security Challenge Platform',
    siteName: 'HITCON Challenge',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // 驗證語言是否有效
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // 取得該語言的翻譯訊息
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
    >
      <body
        className={`${notoSansTC.variable} ${spaceGrotesk.variable} font-sans antialiased pt-[100px] bg-primary`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
