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
            className="cta-hero"
            style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500, color: '#1a1a18', background: '#fff', padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', transition: 'gap 0.2s ease, opacity 0.2s ease' }}
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <style>{`.cta-hero:hover { gap: 16px !important; opacity: 0.9; }`}</style>
        </div>
      </section>

      {/* ── Strip info su sfondo grigio ── */}
      <section style={{ background: '#e8e6e0', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '14px 20px', borderRight: '0.5px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '10px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>
            {locale === 'it' ? 'Orari' : 'Hours'}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a18', margin: 0 }}>
            {locale === 'it' ? 'Tutti i giorni' : 'Every day'}
          </p>
        </div>
        <Link href={`/${locale}/dove-siamo`} style={{ padding: '14px 20px', textDecoration: 'none', display: 'block' }}>
          <p style={{ fontSize: '10px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>
            {locale === 'it' ? 'Dove siamo' : 'Location'}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a18', margin: 0 }}>Via Pontremoli 30 ↗</p>
        </Link>
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
      />

      {/* ── Prenota ── */}
      <section style={{ background: '#f5f3ee', borderTop: '0.5px solid rgba(0,0,0,0.06)', padding: '56px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#9a9a8a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
          {locale === 'it' ? 'Prenota' : 'Reservations'}
        </p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#1a1a18', marginBottom: '10px', lineHeight: 1.25 }}>
          {locale === 'it' ? 'Riserva il tuo tavolo' : 'Reserve your table'}
        </h2>
        <p style={{ fontSize: '14px', color: '#6a6a5a', marginBottom: '28px' }}>
          {locale === 'it' ? 'Contattaci al numero' : 'Call us at'}
        </p>
        <a href="tel:+390670491589" style={{ display: 'inline-block', fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, color: '#1a1a18', textDecoration: 'none', letterSpacing: '.01em', borderBottom: '1.5px solid rgba(0,0,0,0.15)', paddingBottom: '4px' }}>
          06 7049 1589
        </a>
      </section>
    </>
  )
}