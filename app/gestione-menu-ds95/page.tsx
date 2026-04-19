import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from './LoginForm'
import AdminPanel from './AdminPanel'
import type { MenuItem, MenuCategory } from '@/lib/types'

export const metadata = {
  title: 'Gestione Menu | Da Simonetta',
  robots: { index: false, follow: false },
}

export default async function GestioneMenuPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh', background: '#f5f3ee',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}>
        <LoginForm />
      </div>
    )
  }

  const [{ data: rawItems }, { data: rawCategories }] = await Promise.all([
    supabase.from('menu_items').select('*').order('position'),
    supabase.from('menu_categories').select('*').order('position'),
  ])

  return (
    <AdminPanel
      initialItems={(rawItems || []) as MenuItem[]}
      initialCategories={(rawCategories || []) as MenuCategory[]}
      userEmail={user.email || ''}
    />
  )
}
