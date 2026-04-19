'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { MenuItem, MenuCategory } from '@/lib/types'

const LANGS = ['it', 'en', 'fr', 'es', 'de'] as const
const LANG_LABELS: Record<string, string> = { it: '🇮🇹 IT', en: '🇬🇧 EN', fr: '🇫🇷 FR', es: '🇪🇸 ES', de: '🇩🇪 DE' }

const emptyTr = () =>
  Object.fromEntries(LANGS.map(l => [l, { name: '', description: '', note: '' }]))

export default function AdminDashboard({
  initialItems,
  initialCategories,
  userEmail,
}: {
  initialItems: MenuItem[]
  initialCategories: MenuCategory[]
  userEmail: string
}) {
  const router = useRouter()
  const supabase = createClient()

  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [catFilter, setCatFilter] = useState('')
  const [searchQ, setSearchQ] = useState('')
  const [modal, setModal] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [activeLang, setActiveLang] = useState('it')
  const [toast, setToast] = useState('')
  const [toastType, setToastType] = useState<'ok' | 'err'>('ok')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [fCat, setFCat] = useState('antipasti')
  const [fPrice, setFPrice] = useState('')
  const [fTr, setFTr] = useState<Record<string, { name: string; description: string; note: string }>>(emptyTr())

  // Blocca scroll body quando modal aperto
  useEffect(() => {
    document.body.style.overflow = modal || !!deleteId ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal, deleteId])

  const filtered = items.filter(i => {
    const matchCat = !catFilter || i.category === catFilter
    const matchQ = !searchQ || LANGS.some(l =>
      i.translations[l]?.name?.toLowerCase().includes(searchQ.toLowerCase())
    )
    return matchCat && matchQ
  })

  const cats = [...new Set(items.map(i => i.category))]
  const catLabel = (id: string) =>
    initialCategories.find(c => c.id === id)?.translations?.it?.label || id

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast(msg); setToastType(type)
    setTimeout(() => setToast(''), 2800)
  }

  function openModal(item: MenuItem | null) {
    setEditItem(item)
    setActiveLang('it')
    if (item) {
      setFCat(item.category)
      setFPrice(String(item.price))
      const tr = emptyTr()
      LANGS.forEach(l => {
        tr[l] = {
          name: item.translations[l]?.name || '',
          description: item.translations[l]?.description || '',
          note: item.translations[l]?.note || '',
        }
      })
      setFTr(tr)
    } else {
      setFCat(initialCategories[0]?.id || 'antipasti')
      setFPrice('')
      setFTr(emptyTr())
    }
    setModal(true)
  }

  function updateTr(lang: string, field: string, value: string) {
    setFTr(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }))
  }

  async function saveItem() {
    if (!fTr.it.name.trim()) { showToast('Inserisci almeno il nome in italiano', 'err'); return }
    setSaving(true)
    const data = { category: fCat, price: parseFloat(fPrice) || 0, translations: fTr, active: true }
    if (editItem) {
      const { error } = await supabase.from('menu_items').update(data).eq('id', editItem.id)
      if (error) showToast('Errore nel salvataggio', 'err')
      else { setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...data } : i)); showToast('Piatto aggiornato') }
    } else {
      const { data: newItem, error } = await supabase.from('menu_items').insert({ ...data, position: items.length }).select().single()
      if (error) showToast('Errore nel salvataggio', 'err')
      else if (newItem) { setItems(prev => [...prev, newItem]); showToast('Nuovo piatto aggiunto') }
    }
    setSaving(false)
    setModal(false)
  }

  async function deleteItem() {
    if (!deleteId) return
    const { error } = await supabase.from('menu_items').delete().eq('id', deleteId)
    if (error) showToast('Errore durante eliminazione', 'err')
    else { setItems(prev => prev.filter(i => i.id !== deleteId)); showToast('Piatto eliminato') }
    setDeleteId(null)
  }

  async function toggleActive(item: MenuItem) {
    const newActive = !item.active
    const { error } = await supabase.from('menu_items').update({ active: newActive }).eq('id', item.id)
    if (error) showToast('Errore', 'err')
    else {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: newActive } : i))
      showToast(newActive ? 'Piatto visibile sul menu' : 'Piatto nascosto dal menu')
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/gestione-menu-ds95')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ee', fontFamily: 'system-ui, sans-serif' }}>

      {/* Topbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.1)', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px' }}>Da Simonetta</span>
          <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: '#f0ede8', color: '#6a6a5a' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#9a9a8a', display: 'none' }} className="email-desktop">{userEmail}</span>
          <button onClick={logout} style={{ fontSize: '12px', color: '#6a6a5a', border: '0.5px solid rgba(0,0,0,0.15)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', background: 'none', minHeight: '36px' }}>
            Esci
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '16px' }}>
          {[
            { n: items.length, l: 'Totali' },
            { n: cats.length, l: 'Categorie' },
            { n: filtered.length, l: 'Filtrati' },
          ].map(({ n, l }) => (
            <div key={l} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '10px 12px' }}>
              <div style={{ fontSize: '20px', fontWeight: 500 }}>{n}</div>
              <div style={{ fontSize: '11px', color: '#6a6a5a' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            style={{ fontSize: '13px', padding: '8px 10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', flex: 1, minWidth: '120px', minHeight: '40px' }}>
            <option value="">Tutte le categorie</option>
            {cats.map(c => <option key={c} value={c}>{catLabel(c)}</option>)}
          </select>
          <input type="text" placeholder="Cerca..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
            style={{ fontSize: '13px', padding: '8px 10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', flex: 1, minWidth: '100px', minHeight: '40px' }} />
          <button onClick={() => openModal(null)}
            style={{ fontSize: '13px', fontWeight: 500, padding: '8px 16px', background: '#1a1a18', color: '#f5f3ee', border: 'none', borderRadius: '8px', cursor: 'pointer', minHeight: '40px', whiteSpace: 'nowrap' }}>
            + Nuovo
          </button>
        </div>

        {/* Lista piatti — card su mobile invece di tabella */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(item => (
            <div key={item.id} style={{
              background: item.active ? '#fff' : '#faf8f4',
              border: `0.5px solid ${item.active ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)'}`,
              borderRadius: '10px', padding: '12px 14px',
              opacity: item.active ? 1 : 0.7,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 500, fontSize: '14px' }}>
                      {item.translations.it?.name || '—'}
                    </span>
                    {!item.active && (
                      <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '20px', background: '#faeeda', color: '#854F0B' }}>
                        nascosto
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6a6a5a', marginTop: '2px' }}>
                    {catLabel(item.category)} · € {Number(item.price).toFixed(2)}
                  </div>
                </div>
                {/* Indicatori lingue */}
                <div style={{ display: 'flex', gap: '2px', marginLeft: '8px', flexShrink: 0 }}>
                  {LANGS.map(l => {
                    const has = !!item.translations[l]?.name?.trim()
                    return (
                      <div key={l} title={l.toUpperCase()} style={{
                        width: '18px', height: '18px', borderRadius: '50%', fontSize: '7px', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: has ? '#d4edda' : '#f0ede8',
                        color: has ? '#276339' : '#9a9a8a',
                      }}>
                        {l.toUpperCase()}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Azioni — bottoni grandi touch-friendly */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button onClick={() => openModal(item)} style={{ flex: 1, fontSize: '12px', padding: '8px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', cursor: 'pointer', background: 'none', color: '#1a1a18', minHeight: '36px' }}>
                  ✏️ Modifica
                </button>
                <button onClick={() => toggleActive(item)} style={{ flex: 1, fontSize: '12px', padding: '8px', border: `0.5px solid ${item.active ? '#FAC775' : '#97C459'}`, borderRadius: '8px', cursor: 'pointer', background: 'none', color: item.active ? '#854F0B' : '#3B6D11', minHeight: '36px' }}>
                  {item.active ? '🙈 Nascondi' : '👁 Mostra'}
                </button>
                <button onClick={() => setDeleteId(item.id)} style={{ fontSize: '12px', padding: '8px 12px', border: '0.5px solid #f09595', borderRadius: '8px', cursor: 'pointer', background: 'none', color: '#a32d2d', minHeight: '36px' }}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal modifica/aggiunta */}
      {modal && (
        <div onClick={e => e.target === e.currentTarget && setModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, overflowY: 'auto', padding: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '500px', margin: 'auto' }}>
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>{editItem ? 'Modifica piatto' : 'Nuovo piatto'}</div>
            <div style={{ fontSize: '12px', color: '#6a6a5a', marginBottom: '16px' }}>{editItem ? 'Modifica dati o traduzioni' : 'Compila almeno italiano e inglese'}</div>

            {/* Categoria + Prezzo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' }}>Categoria</label>
                <select value={fCat} onChange={e => setFCat(e.target.value)}
                  style={{ width: '100%', padding: '9px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', minHeight: '40px' }}>
                  {initialCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.translations.it?.label || c.id}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' }}>Prezzo (€)</label>
                <input type="number" step="0.50" min="0" placeholder="10.00" value={fPrice} onChange={e => setFPrice(e.target.value)}
                  style={{ width: '100%', padding: '9px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', boxSizing: 'border-box', minHeight: '40px' }} />
              </div>
            </div>

            {/* Tab lingue */}
            <div style={{ fontSize: '11px', color: '#6a6a5a', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '10px' }}>Traduzioni</div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
              {LANGS.map(l => (
                <button key={l} onClick={() => setActiveLang(l)}
                  style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', minHeight: '36px', fontWeight: 500,
                    background: activeLang === l ? '#1a1a18' : '#f0ede8',
                    color: activeLang === l ? '#f5f3ee' : '#6a6a5a',
                  }}>
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            {/* Campi traduzione */}
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' }}>Nome</label>
              <input type="text" placeholder="Nome del piatto" value={fTr[activeLang]?.name || ''} onChange={e => updateTr(activeLang, 'name', e.target.value)}
                style={{ width: '100%', padding: '9px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', boxSizing: 'border-box', minHeight: '40px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' }}>Descrizione</label>
              <textarea placeholder="Ingredienti o breve descrizione..." value={fTr[activeLang]?.description || ''} onChange={e => updateTr(activeLang, 'description', e.target.value)}
                style={{ width: '100%', padding: '9px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', minHeight: '72px', resize: 'vertical', fontFamily: 'system-ui', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' }}>Nota (opzionale)</label>
              <input type="text" placeholder="es. Solo su prenotazione" value={fTr[activeLang]?.note || ''} onChange={e => updateTr(activeLang, 'note', e.target.value)}
                style={{ width: '100%', padding: '9px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', boxSizing: 'border-box', minHeight: '40px' }} />
            </div>

            <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
              <button onClick={() => setModal(false)}
                style={{ flex: 1, fontSize: '13px', padding: '10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', cursor: 'pointer', background: 'none', minHeight: '44px' }}>
                Annulla
              </button>
              <button onClick={saveItem} disabled={saving}
                style={{ flex: 2, fontSize: '13px', fontWeight: 500, padding: '10px', background: '#1a1a18', color: '#f5f3ee', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, minHeight: '44px' }}>
                {saving ? 'Salvataggio...' : 'Salva piatto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm elimina */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '320px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>Elimina piatto</div>
            <div style={{ fontSize: '13px', color: '#6a6a5a', marginBottom: '20px', lineHeight: 1.5 }}>
              Sei sicura di voler eliminare <strong>{items.find(i => i.id === deleteId)?.translations.it?.name}</strong>?<br />
              L&apos;operazione non è reversibile. Puoi anche solo nasconderlo.
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setDeleteId(null)}
                style={{ flex: 1, fontSize: '13px', padding: '10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', cursor: 'pointer', background: 'none', minHeight: '44px' }}>
                Annulla
              </button>
              <button onClick={deleteItem}
                style={{ flex: 1, fontSize: '13px', fontWeight: 500, padding: '10px', background: '#a32d2d', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', minHeight: '44px' }}>
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          fontSize: '13px', padding: '10px 18px', borderRadius: '8px', zIndex: 300, whiteSpace: 'nowrap',
          background: toastType === 'ok' ? '#d4edda' : '#fcebeb',
          color: toastType === 'ok' ? '#276339' : '#a32d2d',
          border: `0.5px solid ${toastType === 'ok' ? '#a3d9b1' : '#f09595'}`,
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}