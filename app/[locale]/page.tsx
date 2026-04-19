import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PuntiForza from '@/components/PuntiForza'
import ChiSiamo from '@/components/ChiSiamo'

type Locale = 'it' | 'en'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  const punti = locale === 'it' ? [
    { title: 'Cucina tradizionale romana', desc: 'Ricette della nonna, tramandate di generazione in generazione. Sapori autentici che raccontano Roma.' },
    { title: 'Pasta fatta a mano', desc: 'Ogni giorno impastiamo a mano. Tonnarelli, rigatoni e gnocchi preparati con farina e uova fresche.' },
    { title: 'Pizza cotta in forno a legna', desc: 'Il nostro forno a legna brucia dal 1995. Impasto a lunga lievitazione, cornicione croccante.' },
  ] : [
    { title: 'Traditional Roman cuisine', desc: 'Grandma\'s recipes, passed down through generations. Authentic flavours that tell the story of Rome.' },
    { title: 'Handmade pasta', desc: 'We knead by hand every day. Tonnarelli, rigatoni and gnocchi made with fresh flour and eggs.' },
    { title: 'Wood-fired pizza', desc: 'Our wood-fired oven has been burning since 1995. Long-leavened dough, crispy crust.' },
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

      {/* ── Strip info — sfondo caldo con icone ── */}
      <section style={{ background: '#f0ede8', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '0.5px solid rgba(0,0,0,0.08)', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '16px 20px', borderRight: '0.5px solid rgba(0,0,0,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, marginBottom: '8px', display: 'block' }}>
            <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
          </svg>
          <p style={{ fontSize: '10px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{t('strip.hours')}</p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a18', margin: 0 }}>{t('hoursShort')}</p>
        </div>
        <div style={{ padding: '16px 20px', borderRight: '0.5px solid rgba(0,0,0,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, marginBottom: '8px', display: 'block' }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
          <p style={{ fontSize: '10px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{t('strip.location')}</p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a18', margin: '0 0 2px' }}>Via Pontremoli 30</p>
          <p style={{ fontSize: '11px', color: '#6a6a5a', margin: 0 }}>Roma RM</p>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, marginBottom: '8px', display: 'block' }}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <p style={{ fontSize: '10px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{t('strip.contact')}</p>
          <a href="tel:+390670491589" style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a18', textDecoration: 'none' }}>
            06 7049 1589
          </a>
        </div>
      </section>

      {/* ── 3 Punti di forza — animazione slide-in ── */}
      <PuntiForza
        punti={punti}
        label={locale === 'it' ? 'Perché da noi' : 'Why us'}
        title={locale === 'it' ? 'La cucina di una volta' : 'Old-school Roman cooking'}
      />

      {/* ── Chi siamo — animazione fade-up ── */}
      <ChiSiamo
        eyebrow={chiSiamo.eyebrow}
        title={chiSiamo.title}
        body={chiSiamo.body}
        cta={t('cta')}
        locale={locale}
      />
    </>
  )
}