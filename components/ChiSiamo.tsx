'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ChiSiamo({
  eyebrow,
  title,
  body,
  cta,
  locale,
}: {
  eyebrow: string
  title: string
  body: string
  cta: string
  locale: string
}) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const els = [eyebrowRef, titleRef, bodyRef, btnRef]
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
        .chi-item:nth-child(4) { transition-delay: 0.35s; }
        .chi-btn:hover { background: #fff !important; color: #1a1a18 !important; }
      `}</style>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px' }}>
        <p ref={eyebrowRef} className="chi-item" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
          {eyebrow}
        </p>
        <h2 ref={titleRef} className="chi-item" style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '20px', lineHeight: 1.25 }}>
          {title}
        </h2>
        <p ref={bodyRef} className="chi-item" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '640px', marginBottom: '32px' }}>
          {body}
        </p>
        <Link
          ref={btnRef}
          href={`/${locale}/menu`}
          className="chi-item chi-btn"
          style={{ display: 'inline-block', fontSize: '13px', fontWeight: 500, padding: '10px 22px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
        >
          {cta} →
        </Link>
      </div>
    </section>
  )
}