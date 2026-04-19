import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function NotFound() {
  const locale = useLocale()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-6">
      <p
        className="text-8xl text-[#e8e6e0]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        404
      </p>
      <h1
        className="text-3xl sm:text-4xl text-[#1a1a18]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Pagina non trovata
      </h1>
      <p className="text-sm text-[#6a6a5a] max-w-xs leading-relaxed">
        La pagina che cerchi non esiste o è stata spostata.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href={`/${locale}`}
          className="text-sm px-5 py-2.5 bg-[#1a1a18] text-[#f5f3ee] rounded-lg hover:opacity-90 transition-opacity"
        >
          Torna alla home
        </Link>
        <Link
          href={`/${locale}/menu`}
          className="text-sm px-5 py-2.5 border border-black/20 rounded-lg hover:bg-[#1a1a18] hover:text-[#f5f3ee] transition-all"
        >
          Vai al menu
        </Link>
      </div>
    </div>
  )
}
