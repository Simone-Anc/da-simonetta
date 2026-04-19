import { createClient } from '@supabase/supabase-js'
import menuData from '../data/menu.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function migrate() {
  console.log('Inizio migrazione da menu.json a Supabase...\n')

  // 1. Migra le categorie
  console.log('Migrazione categorie...')
  for (const [index, cat] of menuData.categories.entries()) {
    const { error } = await supabase.from('menu_categories').upsert({
      id: cat.id,
      translations: {
        it: { label: cat.label.it },
        en: { label: cat.label.en },
        fr: { label: cat.label.it },
        es: { label: cat.label.it },
        de: { label: cat.label.it },
      },
      position: index,
    })
    if (error) console.error('Errore categoria', cat.id, error.message)
    else console.log('  ✓ Categoria:', cat.id)
  }

  // 2. Migra i piatti
  console.log('\nMigrazione piatti...')
  let position = 0

  for (const cat of menuData.categories) {
    const allItems: any[] = [
      ...(cat.items || []),
      ...((cat as any).subcategories?.flatMap((s: any) => s.items) || []),
    ]

    for (const item of allItems) {
      const { error } = await supabase.from('menu_items').upsert({
        category: cat.id,
        price: item.price,
        translations: {
          it: {
            name: item.name?.it || '',
            description: item.description?.it || '',
            note: item.note?.it || '',
          },
          en: {
            name: item.name?.en || '',
            description: item.description?.en || '',
            note: item.note?.en || '',
          },
          fr: { name: item.name?.it || '', description: '', note: '' },
          es: { name: item.name?.it || '', description: '', note: '' },
          de: { name: item.name?.it || '', description: '', note: '' },
        },
        position: position++,
        active: true,
      })
      if (error) console.error('Errore piatto', item.id, error.message)
      else console.log('  ✓', item.name?.it)
    }
  }

  console.log('\n✅ Migrazione completata!')
  console.log('Ora apri il pannello admin e traduci FR, ES, DE dove necessario.')
}

migrate().catch(console.error)