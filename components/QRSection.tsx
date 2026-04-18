'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function QRSection({ locale }: { locale: string }) {
  const t = useTranslations('location')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const url = `https://www.dasimonetta.it/${locale}/menu`

  useEffect(() => {
    if (!canvasRef.current) return
    import('qrcode').then(QRCode => {
      QRCode.toCanvas(canvasRef.current!, url, {
        width: 120,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: { dark: '#1a1a18', light: '#f5f3ee' },
      })
    })
  }, [url])

  return (
    <div className="mt-8 flex items-center gap-5 border border-black/10 rounded-xl p-4 bg-white/40">
      <div className="shrink-0 rounded-lg overflow-hidden border border-black/10">
        <canvas ref={canvasRef} width={120} height={120} />
      </div>
      <div>
        <p className="text-sm font-medium mb-1">{t('qrTitle')}</p>
        <p className="text-xs text-[#6a6a5a] leading-relaxed">{t('qrSub')}</p>
        <p className="text-[11px] text-[#9a9a8a] font-mono mt-2 break-all">{url}</p>
      </div>
    </div>
  )
}
