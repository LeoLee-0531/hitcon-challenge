import type { Metadata } from 'next';
import { fontVariables } from '@/config/fonts';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'HITCON Challenge',
  description: 'Security Challenge Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html suppressHydrationWarning className={fontVariables}>
        <body className="antialiased">{children}</body>
      </html>
    </SessionProvider>
  );
}
