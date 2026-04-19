import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import MenuClient from '@/components/MenuClient'
import type { MenuItem, MenuCategory, Locale } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Menu completo della Trattoria Da Simonetta: antipasti, pizza cotta in forno a legna, ' +
    'primi e secondi romani, dolci e bevande. Via Pontremoli 30, Roma.',
}

// Rivalida la cache ogni 5 minuti
// 100 visitatori in 5 minuti = 1 sola query a Supabase invece di 100
export const revalidate = 3600

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const [{ data: rawItems }, { data: rawCategories }] = await Promise.all([
    supabase.from('menu_items').select('*').eq('active', true).order('position'),
    supabase.from('menu_categories').select('*').order('position'),
  ])

  const items: MenuItem[] = (rawItems || []).map((i: any) => ({
    id: i.id,
    category: i.category,
    price: Number(i.price),
    translations: i.translations,
    position: i.position,
    active: i.active,
    created_at: i.created_at,
  }))

  const categories: MenuCategory[] = (rawCategories || []).map((c: any) => ({
    id: c.id,
    translations: c.translations,
    position: c.position,
  }))

  return (
    <MenuClient
      categories={categories}
      items={items}
      locale={(locale as Locale) ?? 'it'}
    />
  )
}