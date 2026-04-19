import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

type Locale = 'it' | 'en'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const punti = locale === 'it' ? [
    {  title: 'Cucina tradizionale romana', desc: 'Ricette della nonna, tramandate di generazione in generazione. Sapori autentici che raccontano Roma.' },
    {  title: 'Pasta fatta a mano', desc: 'Ogni giorno impastiamo a mano. Tonnarelli, rigatoni e gnocchi preparati con farina e uova fresche.' },
    {  title: 'Pizza cotta in forno a legna', desc: 'Il nostro forno a legna brucia dal 1995. Impasto a lunga lievitazione, cornicione croccante.' },
  ] : [
    {  title: 'Traditional Roman cuisine', desc: 'Grandma\'s recipes, passed down through generations. Authentic flavours that tell the story of Rome.' },
    {  title: 'Handmade pasta', desc: 'We knead by hand every day. Tonnarelli, rigatoni and gnocchi made with fresh flour and eggs.' },
    {  title: 'Wood-fired pizza', desc: 'Our wood-fired oven has been burning since 1995. Long-leavened dough, crispy crust.' },
  ]

  const chiSiamo = locale === 'it' ? {
    eyebrow: 'La nostra storia',
    title: 'Una trattoria di famiglia, nel cuore di Roma',
    body: 'Da Simonetta è una trattoria a gestione familiare aperta nel 1995 in Via Pontremoli, nel quartiere Appio Latino. Quello che trovi qui è cucina romana vera — abbacchio, coda alla vaccinara, cacio e pepe — preparata ogni giorno con ingredienti freschi e ricette di famiglia. Niente fronzoli, niente menu turistici: solo la cucina che i romani mangiano a casa propria. Al tavolo ci trovi sempre qualcuno della famiglia, pronto ad accoglierti come un ospite.',
  } : {
    eyebrow: 'Our story',
    title: 'A family trattoria in the heart of Rome',
    body: 'Da Simonetta is a family-run trattoria opened in 1995 on Via Pontremoli, in the Appio Latino neighbourhood. What you\'ll find here is real Roman cooking — abbacchio, coda alla vaccinara, cacio e pepe — prepared every day with fresh ingredients and family recipes. No frills, no tourist menus: just the food Romans eat at home. There\'s always a family member at the table, ready to welcome you like a guest.',
  }

  return (
    <>
      {/* ── Hero con foto ── */}
      <section style={{ position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="/hero1.jpg"
          alt="Trattoria Da Simonetta"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            {t('eyebrow')}
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.2, maxWidth: '640px', margin: 0 }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', maxWidth: '320px', lineHeight: 1.6, margin: 0 }}>
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}/menu`}
            style={{ marginTop: '8px', display: 'inline-block', background: '#fff', color: '#1a1a18', fontSize: '13px', fontWeight: 500, padding: '10px 24px', borderRadius: '999px', textDecoration: 'none' }}
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* ── Strip info ── */}
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
          <a href="tel:+390670491589" className="text-sm font-medium hover:text-[#6a6a5a] transition-colors">
            06 7049 1589
          </a>
        </div>
      </section>

      {/* ── 3 Punti di forza ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">
          {locale === 'it' ? 'Perché da noi' : 'Why us'}
        </p>
        <h2 className="text-3xl sm:text-4xl mb-10" style={{ fontFamily: "'Fraunces', serif" }}>
          {locale === 'it' ? 'La cucina di una volta' : 'Old-school Roman cooking'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {punti.map(p => (
            <div key={p.title} className="flex flex-col gap-3">
              <h3 className="text-base font-medium" style={{ fontFamily: "'Fraunces', serif" }}>
                {p.title}
              </h3>
              <p className="text-sm text-[#6a6a5a] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Chi siamo ── */}
      <section style={{ background: '#1a1a18', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
            {chiSiamo.eyebrow}
          </p>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '20px', lineHeight: 1.25 }}>
            {chiSiamo.title}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '640px', marginBottom: '32px' }}>
            {chiSiamo.body}
          </p>
          <Link
            href={`/${locale}/menu`}
            style={{ display: 'inline-block', fontSize: '13px', fontWeight: 500, padding: '10px 22px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
          >
            {t('cta')} →
          </Link>
        </div>
      </section>
    </>
  )
}