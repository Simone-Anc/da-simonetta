# Trattoria Da Simonetta — Sito Web

Sito vetrina con menu multilingua (IT/EN) e QR code per i tavoli.
Stack: **Next.js 16 · Tailwind CSS v4 · next-intl · TypeScript**

---

## Avvio in locale

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)
Il browser viene reindirizzato automaticamente a `/it` o `/en` in base alla lingua del browser.

---

## Struttura del progetto

```
app/
  layout.tsx                    ← root layout (semplice wrapper)
  sitemap.ts                    ← sitemap automatica → /sitemap.xml
  robots.ts                     ← robots.txt → /robots.txt
  [locale]/
    layout.tsx                  ← layout con Navbar, Footer, Schema.org SEO
    globals.css                 ← stili globali Tailwind v4
    page.tsx                    ← homepage
    menu/
      page.tsx                  ← pagina menu
    dove-siamo/
      page.tsx                  ← pagina dove siamo con orari e QR

components/
  Navbar.tsx                    ← navigazione sticky + language switcher IT/EN
  Footer.tsx                    ← footer con copyright
  MenuClient.tsx                ← menu interattivo: filtri categoria + filtro vegetariano
  QRSection.tsx                 ← QR code generato lato client (cambia con la lingua)
  RestaurantSchema.tsx          ← dati strutturati JSON-LD per Google

data/
  menu.json                     ← TUTTO il menu reale (IT + EN + prezzi)

messages/
  it.json                       ← stringhe interfaccia italiano
  en.json                       ← stringhe interfaccia inglese

scripts/
  generate-qr.ts                ← genera 3 QR SVG vettoriali per la stampa

routing.ts                      ← configurazione lingue centralizzata
proxy.ts                        ← routing automatico delle lingue (Next.js 16)
i18n.ts                         ← configurazione next-intl
```

---

## Aggiornare il menu

Modifica `data/menu.json`. Ogni piatto ha questa forma:

```json
{
  "id": "carbonara",
  "name":        { "it": "Carbonara",    "en": "Carbonara" },
  "description": { "it": "...",          "en": "..." },
  "price": 10.00,
  "vegetarian": true,
  "note": { "it": "Solo su prenotazione", "en": "Only on preorder" }
}
```

Salva → Vercel fa il rebuild automatico in ~30 secondi.

---

## Generare i QR per la stampa

```bash
npm run generate-qr
```

Crea in `public/qr/`:
- `qr-menu-auto.svg` — rileva lingua del telefono → per i tavoli
- `qr-menu-it.svg`   → menu italiano fisso
- `qr-menu-en.svg`   → menu inglese fisso

Aprili in Figma o Illustrator. Con `errorCorrectionLevel: H` puoi mettere il logo al centro (max 25% della superficie).

---

## Aggiungere una lingua (es. spagnolo)

1. Crea `messages/es.json` (copia da `en.json` e traduci le stringhe UI)
2. In `routing.ts` aggiungi `'es'` all'array `locales`
3. In `data/menu.json` aggiungi `"es": "..."` ai campi `name` e `description` dei piatti

---

## Deploy su Vercel

```bash
# 1. Pubblica su GitHub
git init
git add .
git commit -m "primo commit"
git remote add origin https://github.com/tuoutente/da-simonetta.git
git push -u origin main

# 2. Su vercel.com → Add New Project → importa il repo
#    Vercel rileva Next.js automaticamente → Deploy in ~2 minuti

# 3. Aggiungi il dominio personalizzato:
#    Vercel Dashboard → Domains → aggiungi dasimonetta.it
#    Copia i record DNS sul tuo registrar (Cloudflare consigliato)
```

---

## Checklist prima del lancio

- [ ] Aggiornare il dominio `dasimonetta.it` nei file se cambia
- [ ] Aggiornare le coordinate GPS in `components/RestaurantSchema.tsx`
- [ ] Aggiungere `public/og-image.jpg` (foto del locale, 1200×630px)
- [ ] Creare il Google Business Profile su business.google.com
- [ ] Dopo il deploy, registrare il sito su Google Search Console
- [ ] Inviare la sitemap: `https://www.dasimonetta.it/sitemap.xml`
- [ ] Generare i QR con `npm run generate-qr` e stamparli

---

## Comandi utili

```bash
npm run dev          # sviluppo locale → localhost:3000
npm run build        # build produzione (verifica errori)
npm run start        # avvia la build di produzione
npm run generate-qr  # genera i QR SVG per la stampa
```
