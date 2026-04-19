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
            style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#fff', padding: '9px 20px', border: '0.5px solid rgba(255,255,255,0.3)', borderRadius: '999px', textDecoration: 'none', transition: 'gap 0.2s ease, border-color 0.2s ease' }}
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', flexShrink: 0 }} className="cta-arrow">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <style>{`.cta-hero:hover { border-color: rgba(255,255,255,0.7) !important; gap: 14px !important; }`}</style>
        </div>
      </section>

      {/* ── Strip info — banner scuro compatto ── */}
      <section style={{ background: '#1a1a18', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '14px 16px', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{t('strip.hours')}</p>
          <p style={{ fontSize: '12px', fontWeight: 500, color: '#fff', margin: 0 }}>{t('hoursShort')}</p>
        </div>
        <div style={{ width: '0.5px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
        <Link href={`/${locale}/dove-siamo`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' }}>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{t('strip.location')}</p>
          <p style={{ fontSize: '12px', fontWeight: 500, color: '#fff', margin: 0 }}>Via Pontremoli 30 ↗</p>
        </Link>
        <div style={{ width: '0.5px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{t('strip.contact')}</p>
          <a href="tel:+390670491589" style={{ fontSize: '12px', fontWeight: 500, color: '#fff', textDecoration: 'none' }}>
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