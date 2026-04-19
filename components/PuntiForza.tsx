'use client'

import { useEffect, useRef } from 'react'

type Punto = { title: string; desc: string }

export default function PuntiForza({ punti, label, title }: { punti: Punto[]; label: string; title: string }) {
    const refs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 }
        )
        refs.current.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <style>{`
        .slide-item {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .slide-item.slide-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-item:nth-child(2) { transition-delay: 0.12s; }
        .slide-item:nth-child(3) { transition-delay: 0.24s; }
      `}</style>

            <p className="text-xs text-[#6a6a5a] uppercase tracking-widest mb-2">{label}</p>
            <h2 className="text-3xl sm:text-4xl mb-10" style={{ fontFamily: "'Fraunces', serif" }}>{title}</h2>

            <div className="flex flex-col gap-0">
                {punti.map((p, i) => (
                    <div
                        key={p.title}
                        ref={el => { refs.current[i] = el }}
                        className="slide-item flex gap-4 items-start py-5 border-b border-black/8 last:border-0"
                    >
                        <div style={{ width: '2px', borderRadius: '2px', background: '#1a1a18', alignSelf: 'stretch', flexShrink: 0 }} />
                        <div>
                            <h3 className="text-base font-medium mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                                {p.title}
                            </h3>
                            <p className="text-sm text-[#6a6a5a] leading-relaxed">{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}