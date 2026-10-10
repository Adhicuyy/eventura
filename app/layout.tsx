import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Kaushan_Script } from 'next/font/google'
import { AppStoreProvider } from '@/components/app-store'
import { SiteHeader } from '@/components/site-header'
import { MobileNav } from '@/components/mobile-nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const script = Kaushan_Script({ subsets: ['latin'], weight: '400', variable: '--font-kaushan' })

export const metadata: Metadata = {
  title: 'Eventura — Temukan Event Menarik di Setiap Destinasi',
  description:
    'Eventura membantu wisatawan menemukan festival budaya, konser, pameran, hingga pasar malam di berbagai destinasi Indonesia.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#17695d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${script.variable}`}>
      <body className="font-sans antialiased">
        <AppStoreProvider>
          <SiteHeader />
          <div className="pb-20 md:pb-0">{children}</div>
          <MobileNav />
        </AppStoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
