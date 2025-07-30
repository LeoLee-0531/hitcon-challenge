// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import BaseFooter from './components/BaseFooter'

export const metadata: Metadata = {
  title: 'My App',
  description: 'A Next.js App with Tailwind and Custom Footer',
}

const navigationLinks = [
  { text: '首頁', href: '/' },
  { text: '關於我們', href: '/about' },
  { text: '聯絡方式', href: '/contact' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className="flex flex-col min-h-screen">
        
        {/* NavBar */}
        <nav className="bg-[#77B55A] text-white px-6 py-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              TempNavbar
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <BaseFooter navigationLinks={navigationLinks} />
      </body>
    </html>
  )
}