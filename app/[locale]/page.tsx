import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import menuData from '@/data/menu.json'

type Locale = 'it' | 'en'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const featured = [
    menuData.categories.find(c => c.id === 'pizza')?.items?.find(i => i.id === 'margherita'),
    menuData.categories.find(c => c.id === 'primi')?.items?.find(i => i.id === 'carbonara'),
    menuData.categories.find(c => c.id === 'primi')?.items?.find(i => i.id === 'cacio-pepe'),
    menuData.categories.find(c => c.id === 'secondi')?.items?.find(i => i.id === 'coda-vaccinara'),
  ].filter((x): x is NonNullable<typeof x> => x != null)

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#1a1a18] min-h-[480px] sm:min-h-[520px] flex flex-col items-center justify-center text-center px-6 gap-4">
        <p className="text-xs tracking-widest text-white/50 uppercase">
          {t('eyebrow')}
        </p>
        <h1
          className="text-4xl sm:text-6xl text-white leading-tight max-w-xs sm:max-w-2xl"
          style={{ fontFamily: 'Satisfy, cursive' }}
        >
          {t('title')}
        </h1>
        <p className="text-sm text-white/60 max-w-xs sm:max-w-sm leading-relaxed">
          {t('subtitle')}
        </p>
        <Link
          href={`/${locale}/menu`}
          className="mt-2 inline-block bg-white text-[#1a1a18] text-sm font-medium
                     px-7 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {t('cta')}
        </Link>
        <div className="flex gap-2 flex-wrap justify-center mt-1">
          {(t.raw('features') as string[]).map((f: string) => (
            <span key={f} className="text-xs text-white/50 border border-white/20 px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* ── Strip info: 1 colonna su mobile, 3 su desktop ── */}
      <section className="border-b border-black/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
        <div className="px-6 py-4">
          <p className="text-xs text-[#6a6a5a] uppercase tracking-wide mb-1">{t('strip.hours')}</p>
          <p className="text-sm font-medium">{t('hoursShort')}</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-xs text-[#6a6a5a] uppercase tracking-wide mb-1">{t('strip.location')}</p>
          <p className="text-sm font-medium">Via Pontremoli 30</p>
          <p className="text-xs text-[#6a6a5a]">Roma RM</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-xs text-[#6a6a5a] uppercase tracking-wide mb-1">{t('strip.contact')}</p>
          {/* Numero cliccabile su mobile */}
          <a href="tel:+390670491589" className="text-sm font-medium hover:text-[#6a6a5a] transition-colors">
            06 7049 1589
          </a>
        </div>
      </section>

      {/* ── Piatti in evidenza ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">{t('featured')}</p>
        <h2 className="text-3xl sm:text-4xl mb-8 sm:mb-10" style={{ fontFamily: 'Satisfy, cursive' }}>
          {t('featuredTitle')}
        </h2>
        {/* 1 colonna su mobile piccolo, 2 su mobile medio, 4 su desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {featured.map((item: any) => (
            <div key={item.id} className="border border-black/10 rounded-xl p-3 sm:p-4 bg-white/50">
              <p className="font-medium text-sm mb-1">{item.name[locale]}</p>
              {item.description && (
                <p className="text-xs text-[#6a6a5a] leading-snug mb-2 sm:mb-3">
                  {item.description[locale]}
                </p>
              )}
              <p className="text-sm sm:text-base font-medium">€{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/menu`}
            className="text-sm border border-black/20 px-5 py-2.5 rounded-lg
                       hover:bg-[#1a1a18] hover:text-[#f5f3ee] transition-all"
          >
            {t('cta')} →
          </Link>
        </div>
      </section>
    </>
  )
}