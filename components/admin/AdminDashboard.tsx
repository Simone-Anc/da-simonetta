'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { MenuItem, MenuCategory } from '@/lib/types'

const LANGS = ['it', 'en', 'fr', 'es', 'de'] as const
const LANG_FLAGS: Record<string, string> = { it: '🇮🇹 IT', en: '🇬🇧 EN', fr: '🇫🇷 FR', es: '🇪🇸 ES', de: '🇩🇪 DE' }

const s: Record<string, React.CSSProperties> = {
  wrap: { minHeight: '100vh', background: '#f5f3ee' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.1)', background: '#fff' },
  logo: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px', color: '#1a1a18' },
  badge: { fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: '#f0ede8', color: '#6a6a5a', marginLeft: '8px' },
  logoutBtn: { fontSize: '12px', color: '#6a6a5a', border: '0.5px solid rgba(0,0,0,0.15)', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer', background: 'none' },
  content: { padding: '20px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '16px' },
  stat: { background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '12px 14px' },
  statN: { fontSize: '22px', fontWeight: 500, color: '#1a1a18' },
  statL: { fontSize: '11px', color: '#6a6a5a', marginTop: '2px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px', flexWrap: 'wrap' as const },
  toolbarLeft: { display: 'flex', gap: '6px', flexWrap: 'wrap' as const },
  select: { fontSize: '12px', padding: '6px 10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', color: '#1a1a18' },
  searchInput: { fontSize: '12px', padding: '6px 10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', color: '#1a1a18', width: '150px' },
  addBtn: { fontSize: '12px', fontWeight: 500, padding: '6px 14px', background: '#1a1a18', color: '#f5f3ee', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' as const },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '0.5px solid rgba(0,0,0,0.08)' },
  th: { textAlign: 'left' as const, fontSize: '11px', fontWeight: 500, color: '#6a6a5a', textTransform: 'uppercase' as const, letterSpacing: '.05em', padding: '8px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.08)' },
  td: { padding: '10px 12px', borderBottom: '0.5px solid rgba(0,0,0,0.06)', verticalAlign: 'middle' as const },
  nameIt: { fontWeight: 500, color: '#1a1a18', fontSize: '13px' },
  nameEn: { fontSize: '11px', color: '#6a6a5a', marginTop: '1px' },
  catPill: { fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: '#f0ede8', color: '#6a6a5a', whiteSpace: 'nowrap' as const },
  price: { fontWeight: 500, color: '#1a1a18', whiteSpace: 'nowrap' as const },
  langDots: { display: 'flex', gap: '3px' },
  dot: { width: '20px', height: '20px', borderRadius: '50%', fontSize: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d4edda', color: '#276339' },
  dotMissing: { width: '20px', height: '20px', borderRadius: '50%', fontSize: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0ede8', color: '#9a9a8a' },
  acts: { display: 'flex', gap: '5px' },
  btnE: { fontSize: '11px', padding: '4px 10px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '6px', cursor: 'pointer', background: 'none', color: '#6a6a5a' },
  btnD: { fontSize: '11px', padding: '4px 10px', border: '0.5px solid #f09595', borderRadius: '6px', cursor: 'pointer', background: 'none', color: '#a32d2d' },
  btnH: { fontSize: '11px', padding: '4px 10px', border: '0.5px solid #FAC775', borderRadius: '6px', cursor: 'pointer', background: 'none', color: '#854F0B' },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflowY: 'auto' as const },
  modal: { background: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '520px', border: '0.5px solid rgba(0,0,0,0.1)', margin: 'auto' },
  modalTitle: { fontSize: '15px', fontWeight: 500, marginBottom: '4px', color: '#1a1a18' },
  modalSub: { fontSize: '12px', color: '#6a6a5a', marginBottom: '16px' },
  divider: { fontSize: '11px', fontWeight: 500, color: '#6a6a5a', textTransform: 'uppercase' as const, letterSpacing: '.06em', padding: '10px 0 6px', borderTop: '0.5px solid rgba(0,0,0,0.08)', marginTop: '4px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' },
  fg: { marginBottom: '12px' },
  fgLabel: { fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '4px' },
  fgInput: { width: '100%', padding: '8px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', boxSizing: 'border-box' as const },
  fgTextarea: { width: '100%', padding: '8px 10px', fontSize: '13px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', background: '#fff', minHeight: '56px', resize: 'vertical' as const, fontFamily: 'system-ui', boxSizing: 'border-box' as const },
  langTabs: { display: 'flex', gap: '2px', padding: '3px', background: '#f0ede8', borderRadius: '10px', marginBottom: '14px', width: 'fit-content' },
  langTab: { fontSize: '12px', padding: '5px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'none', color: '#6a6a5a', fontWeight: 500 },
  langTabOn: { fontSize: '12px', padding: '5px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#fff', color: '#1a1a18', fontWeight: 500 },
  modalActions: { display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '14px', borderTop: '0.5px solid rgba(0,0,0,0.08)' },
  btnCancel: { fontSize: '13px', padding: '7px 16px', border: '0.5px solid rgba(0,0,0,0.15)', borderRadius: '8px', cursor: 'pointer', background: 'none', color: '#6a6a5a' },
  btnSave: { fontSize: '13px', fontWeight: 500, padding: '7px 18px', background: '#1a1a18', color: '#f5f3ee', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  toast: { position: 'fixed' as const, bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', padding: '10px 18px', background: '#d4edda', color: '#276339', border: '0.5px solid #a3d9b1', borderRadius: '8px', zIndex: 300, whiteSpace: 'nowrap' as const },
}

const emptyTranslations = () =>
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
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Dati del form
  const [fCat, setFCat] = useState('antipasti')
  const [fPrice, setFPrice] = useState('')
  const [fTr, setFTr] = useState<Record<string, { name: string; description: string; note: string }>>(emptyTranslations())

  const filtered = items.filter(i => {
    const matchCat = !catFilter || i.category === catFilter
    const matchQ = !searchQ || LANGS.some(l =>
      i.translations[l]?.name?.toLowerCase().includes(searchQ.toLowerCase())
    )
    return matchCat && matchQ
  })

  const cats = [...new Set(items.map(i => i.category))]
  const catLabel = (id: string) => initialCategories.find(c => c.id === id)?.translations?.it?.label || id

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openModal(item: MenuItem | null) {
    setEditItem(item)
    setActiveLang('it')
    if (item) {
      setFCat(item.category)
      setFPrice(String(item.price))
      const tr = emptyTranslations()
      LANGS.forEach(l => {
        tr[l] = {
          name: item.translations[l]?.name || '',
          description: item.translations[l]?.description || '',
          note: item.translations[l]?.note || '',
        }
      })
      setFTr(tr)
    } else {
      setFCat('antipasti')
      setFPrice('')
      setFTr(emptyTranslations())
    }
    setModal(true)
  }

  function updateTr(lang: string, field: string, value: string) {
    setFTr(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }))
  }

  async function saveItem() {
    if (!fTr.it.name.trim()) { alert('Inserisci almeno il nome in italiano'); return }
    const data = {
      category: fCat,
      price: parseFloat(fPrice) || 0,
      translations: fTr,
      active: true,
    }
    if (editItem) {
      const { error } = await supabase.from('menu_items').update(data).eq('id', editItem.id)
      if (!error) {
        setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...data } : i))
        showToast('Piatto aggiornato')
      }
    } else {
      const { data: newItem, error } = await supabase.from('menu_items').insert({ ...data, position: items.length }).select().single()
      if (!error && newItem) {
        setItems(prev => [...prev, newItem])
        showToast('Nuovo piatto aggiunto')
      }
    }
    setModal(false)
  }

  async function deleteItem() {
    if (!deleteId) return
    const { error } = await supabase.from('menu_items').delete().eq('id', deleteId)
    if (!error) {
      setItems(prev => prev.filter(i => i.id !== deleteId))
      showToast('Piatto eliminato')
    }
    setDeleteId(null)
  }

  async function toggleActive(item: MenuItem) {
    const newActive = !item.active
    const { error } = await supabase
      .from('menu_items')
      .update({ active: newActive })
      .eq('id', item.id)
    if (!error) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, active: newActive } : i))
      showToast(newActive ? 'Piatto visibile sul menu' : 'Piatto nascosto dal menu')
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/admin')
    router.refresh()
  }

  return (
    <div style={s.wrap}>
      {/* Topbar */}
      <div style={s.topbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={s.logo}>Da Simonetta</span>
          <span style={s.badge}>Gestione menu</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#9a9a8a' }}>{userEmail}</span>
          <button style={s.logoutBtn} onClick={logout}>Esci</button>
        </div>
      </div>

      <div style={s.content}>
        {/* Stats */}
        <div style={s.stats}>
          <div style={s.stat}><div style={s.statN}>{items.length}</div><div style={s.statL}>Piatti totali</div></div>
          <div style={s.stat}><div style={s.statN}>{cats.length}</div><div style={s.statL}>Categorie</div></div>
          <div style={s.stat}><div style={s.statN}>{filtered.length}</div><div style={s.statL}>Visualizzati</div></div>
        </div>

        {/* Toolbar */}
        <div style={s.toolbar}>
          <div style={s.toolbarLeft}>
            <select style={s.select} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">Tutte le categorie</option>
              {cats.map(c => <option key={c} value={c}>{catLabel(c)}</option>)}
            </select>
            <input style={s.searchInput} type="text" placeholder="Cerca piatto..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
          </div>
          <button style={s.addBtn} onClick={() => openModal(null)}>+ Nuovo piatto</button>
        </div>

        {/* Tabella */}
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Nome</th>
                <th style={s.th}>Categoria</th>
                <th style={s.th}>Prezzo</th>
                <th style={s.th}>Lingue</th>
                <th style={{ ...s.th, width: '130px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} onMouseEnter={e => (e.currentTarget.style.background = '#faf9f6')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
                  <td style={s.td}>
                    <div style={s.nameIt}>
                      {item.translations.it?.name || '—'}
                      {!item.active && (
                        <span style={{ fontSize: '10px', marginLeft: '6px', padding: '1px 6px', borderRadius: '20px', background: '#faeeda', color: '#854F0B' }}>
                          nascosto
                        </span>
                      )}
                    </div>
                    <div style={s.nameEn}>{item.translations.en?.name || ''}</div>
                  </td>
                  <td style={s.td}><span style={s.catPill}>{catLabel(item.category)}</span></td>
                  <td style={{ ...s.td, ...s.price }}>€ {Number(item.price).toFixed(2)}</td>
                  <td style={s.td}>
                    <div style={s.langDots}>
                      {LANGS.map(l => {
                        const has = !!item.translations[l]?.name?.trim()
                        return <div key={l} style={has ? s.dot : s.dotMissing} title={has ? 'Tradotto' : 'Mancante'}>{l.toUpperCase()}</div>
                      })}
                    </div>
                  </td>
                  <td style={s.td}>
                    <div style={s.acts}>
                      <button style={s.btnE} onClick={() => openModal(item)}>Modifica</button>
                      <button style={s.btnH} onClick={() => toggleActive(item)}>
                        {item.active ? 'Nascondi' : 'Mostra'}
                      </button>
                      <button style={s.btnD} onClick={() => setDeleteId(item.id)}>Elimina</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal modifica/aggiunta */}
      {modal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div style={s.modal}>
            <div style={s.modalTitle}>{editItem ? 'Modifica piatto' : 'Nuovo piatto'}</div>
            <div style={s.modalSub}>{editItem ? 'Modifica nome, prezzo o traduzioni' : 'Compila almeno italiano e inglese'}</div>

            <div style={s.divider}>Dati generali</div>
            <div style={{ ...s.row2, marginTop: '10px' }}>
              <div style={{ ...s.fg, marginBottom: 0 }}>
                <label style={s.fgLabel}>Categoria</label>
                <select style={{ ...s.fgInput }} value={fCat} onChange={e => setFCat(e.target.value)}>
                  {initialCategories.map(c => (
                    <option key={c.id} value={c.id}>{c.translations.it?.label || c.id}</option>
                  ))}
                </select>
              </div>
              <div style={{ ...s.fg, marginBottom: 0 }}>
                <label style={s.fgLabel}>Prezzo (€)</label>
                <input style={s.fgInput} type="number" step="0.50" min="0" placeholder="10.00" value={fPrice} onChange={e => setFPrice(e.target.value)} />
              </div>
            </div>

            <div style={{ ...s.divider, marginTop: '16px' }}>Traduzioni</div>

            {/* Tab lingue */}
            <div style={{ ...s.langTabs, marginTop: '10px' }}>
              {LANGS.map(l => (
                <button key={l} style={activeLang === l ? s.langTabOn : s.langTab} onClick={() => setActiveLang(l)}>
                  {LANG_FLAGS[l]}
                </button>
              ))}
            </div>

            {/* Pannello lingua attiva */}
            <div style={s.fg}>
              <label style={s.fgLabel}>Nome in {activeLang.toUpperCase()}</label>
              <input style={s.fgInput} type="text" placeholder="Nome del piatto" value={fTr[activeLang]?.name || ''} onChange={e => updateTr(activeLang, 'name', e.target.value)} />
            </div>
            <div style={s.fg}>
              <label style={s.fgLabel}>Descrizione</label>
              <textarea style={s.fgTextarea} placeholder="Ingredienti o breve descrizione..." value={fTr[activeLang]?.description || ''} onChange={e => updateTr(activeLang, 'description', e.target.value)} />
            </div>
            <div style={{ ...s.fg, marginBottom: 0 }}>
              <label style={s.fgLabel}>Nota (opzionale)</label>
              <input style={s.fgInput} type="text" placeholder="es. Solo su prenotazione" value={fTr[activeLang]?.note || ''} onChange={e => updateTr(activeLang, 'note', e.target.value)} />
            </div>

            <div style={s.modalActions}>
              <button style={s.btnCancel} onClick={() => setModal(false)}>Annulla</button>
              <button style={s.btnSave} onClick={saveItem}>Salva piatto</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {deleteId && (
        <div style={s.overlay}>
          <div style={{ ...s.modal, maxWidth: '340px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>Elimina piatto</div>
            <div style={{ fontSize: '13px', color: '#6a6a5a', marginBottom: '20px', lineHeight: 1.5 }}>
              Sei sicura di voler eliminare &ldquo;{items.find(i => i.id === deleteId)?.translations.it?.name}&rdquo;?<br />
              L&apos;operazione non è reversibile.
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button style={s.btnCancel} onClick={() => setDeleteId(null)}>Annulla</button>
              <button style={{ ...s.btnSave, background: '#a32d2d' }} onClick={deleteItem}>Sì, elimina</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  )
}