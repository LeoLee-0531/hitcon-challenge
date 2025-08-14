import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import Navigation from '@/components/Navigation';
import ConditionalFooter from '@/components/ConditionalFooter';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // 根據語言設置標題和描述
  const isChinese = locale === 'zh';

  return {
    title: {
      default: isChinese ? 'HITCON 挑戰賽' : 'HITCON Challenge',
      template: isChinese ? '%s | HITCON 挑戰賽' : '%s | HITCON Challenge',
    },
    description: isChinese ? '資安挑戰平台' : 'Security Challenge Platform',
    keywords: ['security', 'hacking', 'CTF', 'cybersecurity', 'challenge'],
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_TW' : 'en_US',
      title: isChinese ? 'HITCON 挑戰賽' : 'HITCON Challenge',
      description: isChinese ? '資安挑戰平台' : 'Security Challenge Platform',
      siteName: isChinese ? 'HITCON 挑戰賽' : 'HITCON Challenge',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
    <SessionProvider>
      <div
        lang={locale}
        dir="ltr"
        className="antialiased flex flex-col min-h-screen pt-[100px] bg-primary"
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </div>
    </SessionProvider>
  );
}
