import { Noto_Sans_TC, Space_Grotesk } from 'next/font/google';

export const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

// 組合所有字體變數的字串
export const fontVariables = `${spaceGrotesk.variable} ${notoSansTC.variable}`;
