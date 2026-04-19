export type Locale = 'it' | 'en' | 'fr' | 'es' | 'de'

export interface Translation {
  name: string
  description?: string
  note?: string
}

export interface MenuItem {
  id: string
  category: string
  price: number
  translations: Record<string, Translation>
  position: number
  active: boolean
  created_at: string
}

export interface MenuCategory {
  id: string
  translations: Record<string, { label: string }>
  position: number
}
