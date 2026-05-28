import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono, Newsreader, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap'
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap'
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap'
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Kream Proxies | Ice-cold routing for serious operators',
  description:
    'Residential, mobile, ISP, and datacenter proxy infrastructure from one clean control plane.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${newsreader.variable} ${fraunces.variable} ${jetBrainsMono.variable} hero-intro-pending`}
    >
      <body>
        <noscript>
          <style>{'.hero-intro-pending .site-shell, .hero-intro-pending .nav, .hero-intro-pending .nav-home, .hero-intro-pending .mobile-menu-toggle, .hero-intro-pending .hero .reveal-copy, .hero-intro-pending .hero .dashboard-card, .hero-intro-pending .hero .orbit-chip, .hero-intro-pending .hero .mask-word span { opacity: 1 !important; transform: none !important; visibility: visible !important; }'}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
