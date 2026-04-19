'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o password non corretti')
      setLoading(false)
    } else {
      router.push('/gestione-menu-ds95')
      router.refresh()
    }
  }

  return (
    <div style={{
      background: '#fff',
      border: '0.5px solid rgba(0,0,0,0.1)',
      borderRadius: '16px',
      padding: '36px 32px',
      width: '100%',
      maxWidth: '360px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '24px', marginBottom: '4px' }}>
          Da Simonetta
        </div>
        <div style={{ fontSize: '13px', color: '#6a6a5a' }}>Accesso area gestione</div>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@dasimonetta.it"
            required
            style={{
              width: '100%', padding: '9px 12px', fontSize: '13px',
              border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: '8px',
              background: '#fff', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#6a6a5a', display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%', padding: '9px 12px', fontSize: '13px',
              border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: '8px',
              background: '#fff', boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div style={{
            fontSize: '13px', color: '#a32d2d', background: '#fcebeb',
            border: '0.5px solid #f09595', borderRadius: '8px',
            padding: '9px 12px', marginBottom: '14px',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '10px', fontSize: '13px', fontWeight: 500,
            background: '#1a1a18', color: '#f5f3ee', border: 'none',
            borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Accesso in corso...' : 'Entra'}
        </button>
      </form>

      <div style={{ fontSize: '11px', color: '#9a9a8a', textAlign: 'center', marginTop: '16px' }}>
        Solo personale autorizzato
      </div>
    </div>
  )
}