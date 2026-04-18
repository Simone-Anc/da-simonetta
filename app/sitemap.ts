import { MetadataRoute } from 'next'

const BASE = 'https://www.dasimonetta.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['it', 'en']
  const pages = ['', '/menu', '/dove-siamo']
  return locales.flatMap(locale =>
    pages.map(page => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === '/menu' ? 'monthly' : 'yearly') as 'monthly' | 'yearly',
      priority: page === '' ? 1 : page === '/menu' ? 0.9 : 0.7,
    }))
  )
}
