import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import Navigation from '@/components/Navigation';
import '../globals.css';
import { SessionProvider } from 'next-auth/react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: 'HITCON Challenge - Challenges',
      template: '%s | HITCON Challenge',
    },
    description: 'Security Challenge Platform - Complete challenges and earn rewards',
    keywords: ['security', 'hacking', 'CTF', 'cybersecurity', 'challenge'],
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_TW' : 'en_US',
      title: 'HITCON Challenge - Challenges',
      description: 'Security Challenge Platform - Complete challenges and earn rewards',
      siteName: 'HITCON Challenge',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface ChallengesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function ChallengesLayout({
  children,
  params,
}: ChallengesLayoutProps) {
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
        className="pt-[100px] bg-primary min-h-screen"
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />

          <main className="flex-1">{children}</main>

          {/* 挑戰頁面不顯示 footer */}
        </NextIntlClientProvider>
      </div>
    </SessionProvider>
  );
}
