import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RestaurantSchema from '@/components/RestaurantSchema'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dasimonetta.it'),
  title: {
    default: 'Trattoria Da Simonetta – Cucina Romana a Roma',
    template: '%s | Trattoria Da Simonetta',
  },
  description:
    "Dal 1995, nel cuore di Roma. Cucina tradizionale e pizza cotta in forno a legna. Via Pontremoli 30.",
  keywords: ['trattoria roma', 'pizza forno a legna roma', 'cucina romana', 'da simonetta'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.dasimonetta.it',
    siteName: 'Trattoria Da Simonetta',
    title: 'Trattoria Da Simonetta – Cucina Romana a Roma',
    description: 'Pizza cotta in forno a legna e cucina romana. Via Pontremoli 30, Roma.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Trattoria Da Simonetta Roma' }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.dasimonetta.it' },
}

const locales = ['it', 'en']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RestaurantSchema />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}