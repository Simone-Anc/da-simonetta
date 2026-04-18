'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const otherLocale = locale === 'it' ? 'en' : 'it'
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <header className="sticky top-0 z-50 bg-[#f5f3ee] border-b border-black/10">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo — sempre a sinistra */}
        <Link
          href={`/${locale}`}
          className="text-xl sm:text-2xl shrink-0 leading-none"
          style={{ fontFamily: 'Satisfy, cursive' }}
        >
          Da Simonetta
        </Link>

        {/* Links + switcher — su mobile i link si accorciano */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href={`/${locale}/menu`}
            className="text-sm text-[#6a6a5a] hover:text-[#1a1a18] transition-colors whitespace-nowrap"
          >
            {t('menu')}
          </Link>
          <Link
            href={`/${locale}/dove-siamo`}
            className="text-sm text-[#6a6a5a] hover:text-[#1a1a18] transition-colors whitespace-nowrap
                       hidden xs:block sm:block"
          >
            {t('location')}
          </Link>
          <button
            onClick={() => router.push(switchPath)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/20
                       text-[#6a6a5a] hover:text-[#1a1a18] hover:border-black/40 transition-all shrink-0"
          >
            {otherLocale.toUpperCase()}
          </button>
        </div>

      </nav>
    </header>
  )
}