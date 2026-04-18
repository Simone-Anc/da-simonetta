import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const securityHeaders = [
  // Impedisce al sito di essere caricato in un iframe da altri siti (anti-clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Impedisce al browser di "indovinare" il tipo di file (anti-sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Forza HTTPS per 1 anno
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Limita le informazioni inviate quando si clicca su un link esterno
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disabilita funzionalità browser non necessarie
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Protezione XSS per browser vecchi
  { key: 'X-XSS-Protection', value: '1; mode=block' },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Applica gli header a tutte le pagine
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)