'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

type Locale = 'it' | 'en'

interface MenuItem {
  id: string
  name: Record<Locale, string>
  price: number
  description?: Record<Locale, string>
  note?: Record<Locale, string>
  vegetarian?: boolean
}

interface SubCategory {
  label: Record<Locale, string>
  items: MenuItem[]
}

interface Category {
  id: string
  label: Record<Locale, string>
  items?: MenuItem[]
  subcategories?: SubCategory[]
}

interface MenuData {
  categories: Category[]
}

export default function MenuClient({
  menuData,
  locale,
}: {
  menuData: MenuData
  locale: Locale
}) {
  const t = useTranslations('menu')
  const [activeCategory, setActiveCategory] = useState('all')
  const [vegOnly, setVegOnly] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const categories = menuData.categories

  const visibleCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter(c => c.id === activeCategory)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      {/* Intestazione */}
      <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">{t('eyebrow')}</p>
      <h1 className="text-3xl sm:text-4xl font-medium mb-6 sm:mb-8"
          style={{ fontFamily: 'Satisfy, cursive' }}>
        {t('title')}
      </h1>

      {/* ── Segmented control scrollabile su mobile ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-1 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-1 p-1 bg-[#e8e6e0] rounded-xl w-max sm:w-fit">
          <SegTab
            label={t('all')}
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {categories.map(cat => (
            <SegTab
              key={cat.id}
              label={cat.label[locale]}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Filtro vegetariano */}
      <label className="flex items-center gap-2 text-sm text-[#6a6a5a] cursor-pointer mb-8 sm:mb-10 select-none w-fit">
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={e => setVegOnly(e.target.checked)}
          className="rounded border-black/20"
        />
        {t('vegetarian')}
      </label>

      {/* Sezioni menu */}
      <div className="space-y-10 sm:space-y-12">
        {visibleCategories.map(cat => {
          if (cat.subcategories) {
            return (
              <section key={cat.id}>
                <h2 className="text-2xl font-medium mb-5 pb-2 border-b border-black/10"
                    style={{ fontFamily: 'Satisfy, cursive' }}>
                  {cat.label[locale]}
                </h2>
                {cat.subcategories.map((sub, i) => (
                  <div key={i} className="mb-8">
                    <h3 className="text-xs uppercase tracking-widest text-[#6a6a5a] mb-4">
                      {sub.label[locale]}
                    </h3>
                    <ItemList items={sub.items} locale={locale} vegOnly={vegOnly} t={t} />
                  </div>
                ))}
              </section>
            )
          }

          const items = cat.items ?? []
          const filtered = vegOnly ? items.filter(i => i.vegetarian) : items
          if (filtered.length === 0) return null

          return (
            <section key={cat.id}>
              <h2 className="text-2xl font-medium mb-5 pb-2 border-b border-black/10"
                  style={{ fontFamily: 'Satisfy, cursive' }}>
                {cat.label[locale]}
              </h2>
              <ItemList items={filtered} locale={locale} vegOnly={false} t={t} />
            </section>
          )
        })}
      </div>

      {/* Nota surgelati */}
      <p className="mt-12 sm:mt-16 text-xs text-[#6a6a5a] italic border-t border-black/10 pt-4">
        {t('note')}
      </p>
    </div>
  )
}

function SegTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
        active
          ? 'bg-[#f5f3ee] text-[#1a1a18] font-medium'
          : 'text-[#6a6a5a] hover:text-[#1a1a18]'
      }`}
    >
      {label}
    </button>
  )
}

function ItemList({
  items,
  locale,
  vegOnly,
  t,
}: {
  items: MenuItem[]
  locale: Locale
  vegOnly: boolean
  t: ReturnType<typeof useTranslations>
}) {
  const filtered = vegOnly ? items.filter(i => i.vegetarian) : items
  if (filtered.length === 0) return null

  return (
    <div className="divide-y divide-black/5">
      {filtered.map(item => (
        <div key={item.id} className="flex justify-between items-start py-3 gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">{item.name[locale]}</span>
              {item.vegetarian && (
                <span className="text-[10px] border border-green-600 text-green-700 px-1.5 py-0.5 rounded-full">
                  V
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-xs text-[#6a6a5a] mt-0.5 leading-snug">
                {item.description[locale]}
              </p>
            )}
            {item.note && (
              <p className="text-[11px] text-[#9a9a8a] mt-0.5 italic">
                {item.note[locale]}
              </p>
            )}
          </div>
          <span className="text-sm font-medium whitespace-nowrap shrink-0">
            € {item.price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  )
}