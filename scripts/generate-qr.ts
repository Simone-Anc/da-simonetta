import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://www.dasimonetta.it'

const qrs = {
  'qr-menu-auto.svg': `${BASE_URL}/menu`,
  'qr-menu-it.svg':   `${BASE_URL}/it/menu`,
  'qr-menu-en.svg':   `${BASE_URL}/en/menu`,
}

const outDir = path.join(process.cwd(), 'public', 'qr')
fs.mkdirSync(outDir, { recursive: true })

for (const [filename, url] of Object.entries(qrs)) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    width: 512,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#1a1a18',
      light: '#f5f3ee',
    },
  })
  const filepath = path.join(outDir, filename)
  fs.writeFileSync(filepath, svg, 'utf-8')
  console.log(`✓ Generato: public/qr/${filename}  →  ${url}`)
}

console.log('\nI file SVG sono pronti in public/qr/ — aprili in Figma o Illustrator per aggiungere il logo al centro.')
