import type { Metadata } from 'next'
import MenuClient from '@/components/MenuClient'
import menuData from '@/data/menu.json'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Menu completo della Trattoria Da Simonetta: antipasti, pizza cotta in forno a legna, ' +
    'primi e secondi romani, dolci e bevande. Via Pontremoli 30, Roma.',
}

type Locale = 'it' | 'en'

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return <MenuClient menuData={menuData as any} locale={locale} />
}
