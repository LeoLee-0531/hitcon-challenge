import type { Metadata } from 'next';
import { fontVariables } from '@/config/fonts';
import SessionProviderWrapper from './SessionProviderWrapper';

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
    <html suppressHydrationWarning className={fontVariables}>
      <body className="antialiased">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
