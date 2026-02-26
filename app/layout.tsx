import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TopNav } from '@/components/top-nav'
import { MainWrapper } from '@/components/main-wrapper'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'botweb - Plataforma de Automacao',
  description: 'Gerencie leads, conversas e fluxos de automacao em uma unica plataforma.',
  icons: [
    { url: "image/logo.png", type: "image/png"},
  ],
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
        <Providers>
          <TopNav />
          <MainWrapper>{children}</MainWrapper>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
