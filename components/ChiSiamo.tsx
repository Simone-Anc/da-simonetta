'use client'

import { useEffect, useRef } from 'react'

export default function ChiSiamo({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
 
  
  useEffect(() => {
    const els = [imgRef, eyebrowRef, titleRef, bodyRef]
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('chi-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach(ref => ref.current && observer.observe(ref.current))
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#1a1a18', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
      <style>{`
        .chi-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .chi-item.chi-visible { opacity: 1; transform: translateY(0); }
        .chi-item:nth-child(2) { transition-delay: 0.1s; }
        .chi-item:nth-child(3) { transition-delay: 0.2s; }
        .chi-item:nth-child(4) { transition-delay: 0.3s; }
        .chi-img {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .chi-img.chi-visible { opacity: 1; transform: translateX(0); }
      `}</style>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}
           className="chi-grid">
        <style>{`
          @media (min-width: 640px) {
            .chi-grid { grid-template-columns: 1fr 1fr !important; align-items: center; gap: 56px !important; }
          }
        `}</style>

        {/* Foto con vignetta ai bordi */}
        <div ref={imgRef} className="chi-img" style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
          <img
            src="/chi-siamo.jpg"
            alt="Il cuoco che fa la pasta a mano"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%)' }}
          />
          {/* Vignetta radiale sui bordi */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '12px',
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,24,0.75) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Sfocatura bordo superiore */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
            background: 'linear-gradient(to bottom, rgba(26,26,24,0.85) 0%, transparent 100%)',
            borderRadius: '12px 12px 0 0',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Testo */}
        <div>
          <p ref={eyebrowRef} className="chi-item" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
            {eyebrow}
          </p>
          <h2 ref={titleRef} className="chi-item" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#fff', marginBottom: '20px', lineHeight: 1.25 }}>
            {title}
          </h2>
          <p ref={bodyRef} className="chi-item" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
            {body}
          </p>
        </div>
      </div>
    </section>
  )
}