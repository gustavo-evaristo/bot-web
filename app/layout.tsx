import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TopNav } from '@/components/top-nav'

export const metadata: Metadata = {
  title: 'botweb - Plataforma de Automacao',
  description: 'Gerencie leads, conversas e fluxos de automacao em uma unica plataforma.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4d6bfe',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <TopNav />
        <main className="p-6 lg:p-8">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
