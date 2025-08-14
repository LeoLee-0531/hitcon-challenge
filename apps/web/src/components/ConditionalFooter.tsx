'use client';

import { usePathname } from 'next/navigation';
import BaseFooter from './BaseFooter';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // 在 profile 頁面不顯示 footer
  if (pathname.includes('/profile')) {
    return null;
  }
  
  return <BaseFooter />;
}
