import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="border-t border-black/10 bg-[#f5f3ee] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-serif text-sm font-medium">Trattoria Da Simonetta</span>
        <span className="text-xs text-[#6a6a5a] text-center">{t('copy')}</span>
      </div>
    </footer>
  )
}
