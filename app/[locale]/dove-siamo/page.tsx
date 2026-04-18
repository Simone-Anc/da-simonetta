import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import QRSection from '@/components/QRSection'
import menuData from '@/data/menu.json'

export const metadata: Metadata = {
  title: 'Dove siamo',
  description:
    'Trattoria Da Simonetta · Via Pontremoli 30, 00182 Roma · Tel. 06 7049 1589 · ' +
    'Aperta a pranzo tutti i giorni, a cena dal martedì al sabato.',
}

type Locale = 'it' | 'en'

export default async function DoveSiamoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'location' })
  const hours = menuData.restaurant.hours[locale]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">{t('eyebrow')}</p>
      <h1 className="text-3xl sm:text-4xl font-medium mb-8 sm:mb-10"
          style={{ fontFamily: 'Satisfy, cursive' }}>
        {t('title')}
      </h1>

      {/* Su mobile: colonna unica. Su desktop: 2 colonne */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* Mappa + contatti */}
        <div>
          <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden border border-black/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.2247443735116!2d12.513427459552979!3d41.8839493978905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61eb51f4cf27%3A0x83de8b0edb38f637!2sTrattoria%20Pizzeria%20Da%20Simonetta!5e0!3m2!1sit!2sit!4v1776525253262!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href="https://maps.google.com/?q=Via+Pontremoli+30+Roma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-[#6a6a5a] hover:text-[#1a1a18]
                       border border-black/20 px-3 py-1.5 rounded-full transition-colors"
          >
            {t('openMaps')} ↗
          </a>

          <div className="mt-4 space-y-3">
            {/* Indirizzo */}
            <div className="flex gap-3 items-start border border-black/10 rounded-lg px-3 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                   className="mt-0.5 text-[#6a6a5a] shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <div>
                <p className="text-[11px] text-[#6a6a5a]">{t('address')}</p>
                <p className="text-sm font-medium">Via Pontremoli 30, 00182 Roma RM</p>
              </div>
            </div>

            {/* Telefono — cliccabile su mobile */}
            <a href="tel:+390670491589"
               className="flex gap-3 items-start border border-black/10 rounded-lg px-3 py-2.5
                          hover:border-black/20 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                   className="mt-0.5 text-[#6a6a5a] shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <div>
                <p className="text-[11px] text-[#6a6a5a]">{t('phone')}</p>
                <p className="text-sm font-medium">06 7049 1589</p>
              </div>
            </a>
          </div>
        </div>

        {/* Orari + QR */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#6a6a5a] mb-4">{t('hours')}</h2>
          <div className="divide-y divide-black/5">
            {hours.map((row) => (
              <div key={row.day} className="flex justify-between items-center py-2.5 text-sm">
                <span className="text-[#6a6a5a] w-28">{row.day}</span>
                <div className="text-right">
                  {!row.lunch && !row.dinner ? (
                    <span className="text-[#9a9a8a] italic">{t('closed')}</span>
                  ) : (
                    <>
                      {row.lunch && <p className="font-medium">{row.lunch}</p>}
                      {row.dinner
                        ? <p className="font-medium">{row.dinner}</p>
                        : <p className="text-xs text-[#9a9a8a] italic">{t('lunchOnly')}</p>
                      }
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <QRSection locale={locale} />
        </div>
      </div>
    </div>
  )
}