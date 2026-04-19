'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import type { MenuItem, MenuCategory, Locale } from '@/lib/types'

export default function MenuClient({
  categories,
  items,
  locale,
}: {
  categories: MenuCategory[]
  items: MenuItem[]
  locale: Locale
}) {
  const t = useTranslations('menu')
  const [activeCategory, setActiveCategory] = useState('all')
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale: Locale = locale === 'it' ? 'en' : 'it'
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const visibleItems =
    activeCategory === 'all'
      ? items
      : items.filter(i => i.category === activeCategory)

  const visibleCategories = categories.filter(cat =>
    visibleItems.some(i => i.category === cat.id)
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

      {/* Intestazione + switcher lingua */}
      <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">{t('eyebrow')}</p>
          <h1 className="text-3xl sm:text-4xl font-medium"
              style={{ fontFamily: "'Fraunces', serif" }}>
            {t('title')}
          </h1>
        </div>
        <div className="flex items-center gap-1 p-1 bg-[#e8e6e0] rounded-xl shrink-0 mt-1">
          <button
            onClick={() => locale !== 'it' && router.push(switchPath)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              locale === 'it' ? 'bg-[#f5f3ee] text-[#1a1a18] font-medium' : 'text-[#6a6a5a] hover:text-[#1a1a18]'
            }`}
          >IT</button>
          <button
            onClick={() => locale !== 'en' && router.push(switchPath)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              locale === 'en' ? 'bg-[#f5f3ee] text-[#1a1a18] font-medium' : 'text-[#6a6a5a] hover:text-[#1a1a18]'
            }`}
          >EN</button>
        </div>
      </div>

      {/* Filtri categoria — scrollabili su mobile */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-1 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
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
              label={cat.translations[locale]?.label ?? cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Sezioni menu */}
      <div className="space-y-10 sm:space-y-12">
        {visibleCategories.map(cat => {
          const catItems = visibleItems.filter(i => i.category === cat.id)
          if (catItems.length === 0) return null
          return (
            <section key={cat.id}>
              <h2 className="text-2xl font-medium mb-5 pb-2 border-b border-black/10"
                  style={{ fontFamily: "'Fraunces', serif" }}>
                {cat.translations[locale]?.label ?? cat.id}
              </h2>
              <div className="divide-y divide-black/5">
                {catItems.map(item => {
                  const tr = item.translations[locale] ?? item.translations['it']
                  return (
                    <div key={item.id} className="flex justify-between items-start py-3 gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium">{tr?.name}</span>
                        {tr?.description && (
                          <p className="text-xs text-[#6a6a5a] mt-0.5 leading-snug">{tr.description}</p>
                        )}
                        {tr?.note && (
                          <p className="text-[11px] text-[#9a9a8a] mt-0.5 italic">{tr.note}</p>
                        )}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap shrink-0">
                        € {Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <p className="mt-12 sm:mt-16 text-xs text-[#6a6a5a] italic border-t border-black/10 pt-4">
        {t('note')}
      </p>
    </div>
  )
}

function SegTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
        active ? 'bg-[#f5f3ee] text-[#1a1a18] font-medium' : 'text-[#6a6a5a] hover:text-[#1a1a18]'
      }`}
    >
      {label}
    </button>
  )
}