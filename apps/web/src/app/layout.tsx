import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'SITCON Challenges',
  description: 'SITCON Challenge Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" style={{ backgroundColor: '#121712' }}>
      <body 
        className={`${notoSansTC.variable} antialiased`}
        style={{ backgroundColor: '#121712' }}
      >
        {children}
      </body>
    </html>
  );
} 