import React, { useState, useEffect, useCallback } from 'react'

const API = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://labease-backend.onrender.com'

const TOKEN_KEY = 'labease_admin_token'

function getToken() { return localStorage.getItem(TOKEN_KEY) }
function setToken(t) { localStorage.setItem(TOKEN_KEY, t) }
function clearToken() { localStorage.removeItem(TOKEN_KEY) }

async function apiFetch(path, opts = {}) {
  const token = getToken()
  const res = await fetch(API + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(opts.headers || {}),
    },
  })
  if (res.status === 401) {
    clearToken()
    window.location.reload()
    return
  }
  return res
}

/* ── COLORS ── */
const C = {
  primary: '#1158A6',
  primaryLight: '#EFF6FF',
  bg: '#F8FAFC',
  white: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  shadow: '0 1px 4px rgba(0,0,0,0.08)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.10)',
}

const card = {
  background: C.white,
  borderRadius: 12,
  boxShadow: C.shadow,
  padding: 24,
}

const btn = {
  primary: {
    background: C.primary, color: '#fff', border: 'none',
    borderRadius: 8, padding: '8px 18px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
  },
  danger: {
    background: C.danger, color: '#fff', border: 'none',
    borderRadius: 8, padding: '8px 18px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
  },
  success: {
    background: C.success, color: '#fff', border: 'none',
    borderRadius: 8, padding: '8px 18px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
  },
  ghost: {
    background: 'transparent', color: C.primary,
    border: `1px solid ${C.primary}`, borderRadius: 8,
    padding: '8px 18px', cursor: 'pointer',
    fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
  },
}

const inputStyle = {
  width: '100%', padding: '9px 12px',
  border: `1px solid ${C.border}`, borderRadius: 8,
  fontFamily: 'inherit', fontSize: 14,
  outline: 'none', background: C.white, color: C.text,
}

function Badge({ status }) {
  const map = {
    confirmed: { bg: '#DBEAFE', color: '#1D4ED8' },
    pending:   { bg: '#FEF3C7', color: '#92400E' },
    completed: { bg: '#DCFCE7', color: '#166534' },
    cancelled: { bg: '#FEE2E2', color: '#991B1B' },
  }
  const s = map[status] || { bg: '#F1F5F9', color: '#475569' }
  return (
    <span style={{
      background: s.bg, color: s.color,
      borderRadius: 99, padding: '3px 10px',
      fontSize: 12, fontWeight: 600,
    }}>{status}</span>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.4)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: C.white, borderRadius: 16, boxShadow: C.shadowMd,
        padding: 28, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: C.muted }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const NAV = [
  { id: 'dashboard',     label: 'Dashboard',     icon: '⊞' },
  { id: 'bookings',      label: 'Bookings',       icon: '📋' },
  { id: 'labs',          label: 'Labs',           icon: '🏥' },
  { id: 'users',         label: 'Users',          icon: '👥' },
  { id: 'packages',      label: 'Packages',       icon: '📦' },
  { id: 'tests',         label: 'Tests',          icon: '🧪' },
  { id: 'reports',       label: 'Reports',        icon: '📊' },
  { id: 'notifications', label: 'Notifications',  icon: '🔔' },
  { id: 'settings',      label: 'Settings',       icon: '⚙️' },
]

/* ── LOGIN ── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@labease.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res = await fetch(API + '/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return }
      setToken(data.token)
      onLogin(data.admin)
    } catch {
      setError('Network error. Is the server running?')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ ...card, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: C.primary, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>🏥</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 4 }}>LabEase Admin</h1>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>Sign in to the admin panel</p>
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="admin@labease.com" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.text, display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} placeholder="••••••••" />
          </div>
          {error && <div style={{ background: '#FEE2E2', color: '#991B1B', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ ...btn.primary, width: '100%', padding: '11px 18px', fontSize: 15 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── SIDEBAR ── */
function Sidebar({ currentPage, setPage, open, setOpen }) {
  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99, display: 'none' }} className="mob-overlay" />
      )}
      <style>{`
        @media (max-width: 768px) {
          .sidebar { transform: ${open ? 'translateX(0)' : 'translateX(-100%)'} !important; transition: transform 0.25s !important; }
          .mob-overlay { display: block !important; }
        }
      `}</style>
      <aside className="sidebar" style={{ width: 220, flexShrink: 0, background: C.white, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏥</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>LabEase</div>
            <div style={{ fontSize: 11, color: C.muted }}>Admin Panel</div>
          </div>
        </div>
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV.map(item => {
            const active = currentPage === item.id
            return (
              <button key={item.id} onClick={() => { setPage(item.id); setOpen(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: active ? C.primary : 'transparent', color: active ? '#fff' : C.text, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 14, marginBottom: 2, textAlign: 'left' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.primaryLight }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>LabEase Admin v1.0</div>
      </aside>
    </>
  )
}

/* ── TOP HEADER ── */
function TopHeader({ admin, currentPage, onLogout, notifCount, onHamburger }) {
  const label = NAV.find(n => n.id === currentPage)?.label || 'Dashboard'
  return (
    <header style={{ height: 60, background: C.white, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
      <button onClick={onHamburger} className="ham-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: C.text, padding: 4, display: 'none' }}>☰</button>
      <style>{`@media (max-width: 768px) { .ham-btn { display: block !important; } }`}</style>
      <h2 style={{ fontWeight: 700, fontSize: 17, color: C.text, flex: 1 }}>{label}</h2>
      <div style={{ position: 'relative' }}>
        <span style={{ fontSize: 20, cursor: 'pointer' }}>🔔</span>
        {notifCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: C.danger, color: '#fff', borderRadius: 99, fontSize: 10, fontWeight: 700, padding: '1px 5px', lineHeight: 1.6 }}>{notifCount}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{(admin?.name || 'A')[0].toUpperCase()}</div>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{admin?.name || 'Admin'}</span>
      </div>
      <button onClick={onLogout} style={{ ...btn.ghost, padding: '6px 14px', fontSize: 13 }}>Logout</button>
    </header>
  )
}

/* ── SPINNER ── */
function Spinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: `3px solid ${C.border}`, borderTopColor: C.primary, animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ── DASHBOARD ── */
function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/admin/dashboard')
      .then(r => r && r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />
  if (!data) return <p style={{ color: C.muted }}>Failed to load dashboard.</p>

  const statCards = [
    { label: 'Total Bookings', value: data.totalBookings, icon: '📋', color: '#DBEAFE' },
    { label: 'Revenue',        value: '₹' + (data.revenue || 0).toLocaleString(), icon: '💰', color: '#DCFCE7' },
    { label: 'Users',          value: data.userCount,    icon: '👥', color: '#FEF3C7' },
    { label: 'Labs',           value: data.labCount,     icon: '🏥', color: '#F3E8FF' },
  ]

  const statusMap = {}
  ;(data.statusCounts || []).forEach(s => { statusMap[s.status] = s.count })
  const barData = [
    { label: 'Confirmed', count: statusMap.confirmed || 0, color: '#1D4ED8' },
    { label: 'Pending',   count: statusMap.pending   || 0, color: '#F59E0B' },
    { label: 'Completed', count: statusMap.completed || 0, color: '#22C55E' },
    { label: 'Cancelled', count: statusMap.cancelled || 0, color: '#EF4444' },
  ]
  const maxBar = Math.max(...barData.map(b => b.count), 1)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 24 }}>
        {statCards.map(s => (
          <div key={s.label} style={card}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={card}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, color: C.text }}>Booking Status</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            {barData.map(b => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{b.count}</span>
                <div style={{ width: '100%', height: Math.max(4, (b.count / maxBar) * 90), background: b.color, borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: 11, color: C.muted, textAlign: 'center' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={card}>
          <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: C.text }}>Quick Stats</h3>
          {barData.map(b => (
            <div key={b.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.color }} />
                <span style={{ fontSize: 14, color: C.text }}>{b.label}</span>
              </div>
              <span style={{ fontWeight: 700, color: C.text }}>{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: C.text }}>Recent Bookings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {['ID', 'Patient', 'Lab', 'Date', 'Status', 'Amount'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(data.recentBookings || []).map((b, i) => (
                <tr key={b.id} style={{ background: i % 2 === 0 ? C.white : C.bg }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.bg}
                >
                  <td style={{ padding: '8px 12px', color: C.muted }}>#{b.id}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{b.patient_name}</td>
                  <td style={{ padding: '8px 12px' }}>{b.lab_name}</td>
                  <td style={{ padding: '8px 12px' }}>{b.date}</td>
                  <td style={{ padding: '8px 12px' }}><Badge status={b.status} /></td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>₹{b.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── BOOKINGS ── */
function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ status: '', date: '' })
  const [selected, setSelected] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [saving, setSaving] = useState(false)
  const limit = 20

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, limit })
    if (filters.status) params.set('status', filters.status)
    if (filters.date) params.set('date', filters.date)
    apiFetch('/api/admin/bookings?' + params)
      .then(r => r && r.json())
      .then(d => { setBookings(d.bookings || []); setTotal(d.total || 0); setLoading(false) })
      .catch(() => setLoading(false))
  }, [page, filters])

  useEffect(() => { load() }, [load])

  async function updateStatus() {
    if (!statusUpdate || !selected) return
    setSaving(true)
    await apiFetch('/api/admin/bookings/' + selected.id, { method: 'PATCH', body: JSON.stringify({ status: statusUpdate }) })
    setSaving(false)
    setSelected(null)
    load()
  }

  const pages = Math.ceil(total / limit)

  return (
    <div>
      <div style={{ ...card, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1) }} style={{ ...inputStyle, width: 160 }}>
          <option value="">All Statuses</option>
          {['confirmed', 'pending', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" value={filters.date} onChange={e => { setFilters(f => ({ ...f, date: e.target.value })); setPage(1) }} style={{ ...inputStyle, width: 180 }} />
        <button onClick={() => { setFilters({ status: '', date: '' }); setPage(1) }} style={btn.ghost}>Clear</button>
        <span style={{ marginLeft: 'auto', color: C.muted, fontSize: 13 }}>{total} bookings</span>
      </div>
      <div style={card}>
        {loading ? <Spinner /> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {['ID', 'Patient', 'Lab', 'Date', 'Mode', 'Status', 'Amount', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.id} style={{ background: i % 2 === 0 ? C.white : C.bg }}
                    onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.bg}
                  >
                    <td style={{ padding: '9px 12px', color: C.muted }}>#{b.id}</td>
                    <td style={{ padding: '9px 12px' }}><div style={{ fontWeight: 600 }}>{b.patient_name}</div><div style={{ fontSize: 11, color: C.muted }}>{b.user_email}</div></td>
                    <td style={{ padding: '9px 12px' }}>{b.lab_name}</td>
                    <td style={{ padding: '9px 12px' }}>{b.date}<br /><span style={{ fontSize: 11, color: C.muted }}>{b.slot}</span></td>
                    <td style={{ padding: '9px 12px' }}>{b.mode}</td>
                    <td style={{ padding: '9px 12px' }}><Badge status={b.status} /></td>
                    <td style={{ padding: '9px 12px', fontWeight: 700 }}>₹{b.total}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <button onClick={() => { setSelected(b); setStatusUpdate(b.status) }} style={{ ...btn.ghost, padding: '5px 12px', fontSize: 12 }}>View</button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: C.muted }}>No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={btn.ghost}>← Prev</button>
            <span style={{ padding: '8px 16px', fontSize: 14 }}>Page {page} of {pages}</span>
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} style={btn.ghost}>Next →</button>
          </div>
        )}
      </div>

      {selected && (
        <Modal title={`Booking #${selected.id}`} onClose={() => setSelected(null)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              ['Patient', selected.patient_name],
              ['Age / Gender', `${selected.patient_age || '—'} / ${selected.patient_gender || '—'}`],
              ['Lab', selected.lab_name],
              ['Date', selected.date],
              ['Slot', selected.slot],
              ['Mode', selected.mode],
              ['Address', selected.address],
              ['Amount', '₹' + selected.total],
              ['Phone', selected.user_phone],
              ['Email', selected.user_email],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 14, color: C.text }}>{v || '—'}</div>
              </div>
            ))}
          </div>
          {selected.tests && selected.tests.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Tests</div>
              {selected.tests.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                  <span>{t.test_name}</span><span style={{ fontWeight: 600 }}>₹{t.price}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
              {['confirmed', 'pending', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={updateStatus} disabled={saving} style={btn.primary}>{saving ? 'Saving…' : 'Update Status'}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── LABS ── */
function LabsPage() {
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    apiFetch('/api/admin/labs').then(r => r && r.json())
      .then(d => { setLabs(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function startEdit(lab) {
    setEditing(lab)
    setForm({ name: lab.name || '', address: lab.address || '', timing: lab.timing || '', report_timing: lab.report_timing || '', rating: lab.rating || '', nabl: lab.nabl || 0, home_collection: lab.home_collection || 0 })
  }

  async function saveEdit() {
    setSaving(true)
    const res = await apiFetch('/api/admin/labs/' + editing.id, { method: 'PATCH', body: JSON.stringify(form) })
    const updated = await res.json()
    setLabs(labs.map(l => l.id === updated.id ? updated : l))
    setSaving(false); setEditing(null)
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {labs.map(lab => (
          <div key={lab.id} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{lab.name}</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {lab.nabl ? <span style={{ fontSize: 10, background: '#DCFCE7', color: '#166534', borderRadius: 99, padding: '2px 8px', fontWeight: 700 }}>NABL</span> : null}
                {lab.home_collection ? <span style={{ fontSize: 10, background: '#DBEAFE', color: '#1D4ED8', borderRadius: 99, padding: '2px 8px', fontWeight: 700 }}>Home</span> : null}
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.muted }}>{lab.address}</div>
            <div style={{ fontSize: 13, color: C.muted }}>⏰ {lab.timing}</div>
            {lab.report_timing && <div style={{ fontSize: 13, color: C.muted }}>📄 Report: {lab.report_timing}</div>}
            <div style={{ fontSize: 13, color: C.muted }}>⭐ {lab.rating}</div>
            <button onClick={() => startEdit(lab)} style={{ ...btn.ghost, marginTop: 8, alignSelf: 'flex-start', padding: '6px 14px', fontSize: 13 }}>Edit</button>
          </div>
        ))}
        {labs.length === 0 && <p style={{ color: C.muted }}>No labs found.</p>}
      </div>

      {editing && (
        <Modal title={`Edit Lab: ${editing.name}`} onClose={() => setEditing(null)}>
          {[{ key: 'name', label: 'Name' }, { key: 'address', label: 'Address' }, { key: 'timing', label: 'Lab Timing', hint: 'e.g. 6:00 AM – 10:00 PM' }, { key: 'report_timing', label: 'Report Delivery Timing', hint: 'e.g. 4–6 hrs, Same day, 24–48 hrs' }, { key: 'rating', label: 'Rating', type: 'number' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input type={f.type || 'text'} value={form[f.key] || ''} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} style={inputStyle} placeholder={f.hint || ''} />
              {f.hint && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{f.hint}</div>}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={!!form.nabl} onChange={e => setForm(x => ({ ...x, nabl: e.target.checked ? 1 : 0 }))} /> NABL Certified
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={!!form.home_collection} onChange={e => setForm(x => ({ ...x, home_collection: e.target.checked ? 1 : 0 }))} /> Home Collection
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={saveEdit} disabled={saving} style={btn.primary}>{saving ? 'Saving…' : 'Save Changes'}</button>
            <button onClick={() => setEditing(null)} style={btn.ghost}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── USERS ── */
function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    apiFetch('/api/admin/users').then(r => r && r.json())
      .then(d => { setUsers(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  async function toggleActive(user) {
    await apiFetch('/api/admin/users/' + user.id, { method: 'PATCH', body: JSON.stringify({ active: user.active ? 0 : 1 }) })
    load()
  }

  if (loading) return <Spinner />

  return (
    <div style={card}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {['Name', 'Email', 'Phone', 'Joined', 'Bookings', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ background: i % 2 === 0 ? C.white : C.bg }}
                onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.bg}
              >
                <td style={{ padding: '9px 12px', fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: '9px 12px', color: C.muted }}>{u.email}</td>
                <td style={{ padding: '9px 12px' }}>{u.phone || '—'}</td>
                <td style={{ padding: '9px 12px' }}>{u.created_at ? u.created_at.slice(0, 10) : '—'}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}>{u.booking_count}</td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ background: u.active ? '#DCFCE7' : '#FEE2E2', color: u.active ? '#166534' : '#991B1B', borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{u.active ? 'Active' : 'Inactive'}</span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <button onClick={() => toggleActive(u)} style={{ ...(u.active ? btn.danger : btn.success), padding: '5px 12px', fontSize: 12 }}>{u.active ? 'Deactivate' : 'Activate'}</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: C.muted }}>No users found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── PACKAGES ── */
function PackagesPage() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', sub: '', price: '', mrp: '', off: '', badge: '', img: '' })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    apiFetch('/api/admin/packages').then(r => r && r.json())
      .then(d => { setPackages(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  function openNew() { setEditing('new'); setForm({ title: '', sub: '', price: '', mrp: '', off: '', badge: '', img: '' }) }
  function openEdit(pkg) { setEditing(pkg); setForm({ title: pkg.title || '', sub: pkg.sub || '', price: pkg.price || '', mrp: pkg.mrp || '', off: pkg.off || '', badge: pkg.badge || '', img: pkg.img || '' }) }

  async function save() {
    setSaving(true)
    const isNew = editing === 'new'
    await apiFetch(isNew ? '/api/admin/packages' : '/api/admin/packages/' + editing.id, {
      method: isNew ? 'POST' : 'PATCH',
      body: JSON.stringify({ ...form, price: Number(form.price), mrp: Number(form.mrp), off: Number(form.off) }),
    })
    setSaving(false); setEditing(null); load()
  }

  async function del(id) {
    setDeleting(id)
    await apiFetch('/api/admin/packages/' + id, { method: 'DELETE' })
    setDeleting(null); load()
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={openNew} style={btn.primary}>+ Add Package</button>
      </div>
      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {['Name', 'Description', 'Price', 'MRP', 'Discount', 'Badge', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? C.white : C.bg }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.bg}
                >
                  <td style={{ padding: '9px 12px', fontWeight: 600 }}>{p.title}</td>
                  <td style={{ padding: '9px 12px', color: C.muted, maxWidth: 200 }}>{p.sub}</td>
                  <td style={{ padding: '9px 12px', fontWeight: 700 }}>₹{p.price}</td>
                  <td style={{ padding: '9px 12px', textDecoration: 'line-through', color: C.muted }}>₹{p.mrp}</td>
                  <td style={{ padding: '9px 12px' }}>{p.off}%</td>
                  <td style={{ padding: '9px 12px' }}>{p.badge}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(p)} style={{ ...btn.ghost, padding: '5px 10px', fontSize: 12 }}>Edit</button>
                      <button onClick={() => del(p.id)} disabled={deleting === p.id} style={{ ...btn.danger, padding: '5px 10px', fontSize: 12 }}>{deleting === p.id ? '…' : 'Delete'}</button>
                    </div>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: C.muted }}>No packages yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <Modal title={editing === 'new' ? 'New Package' : 'Edit Package'} onClose={() => setEditing(null)}>
          {[{ key: 'title', label: 'Name' }, { key: 'sub', label: 'Description' }, { key: 'price', label: 'Price', type: 'number' }, { key: 'mrp', label: 'MRP', type: 'number' }, { key: 'off', label: 'Discount %', type: 'number' }, { key: 'badge', label: 'Badge' }, { key: 'img', label: 'Image URL' }].map(f => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input type={f.type || 'text'} value={form[f.key] || ''} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={save} disabled={saving} style={btn.primary}>{saving ? 'Saving…' : 'Save'}</button>
            <button onClick={() => setEditing(null)} style={btn.ghost}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── TESTS ── */
function TestsPage() {
  const [tests, setTests] = useState([])
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ lab_id: '', category: '' })
  const [editingPrice, setEditingPrice] = useState(null)
  const [priceVal, setPriceVal] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.lab_id) params.set('lab_id', filters.lab_id)
    if (filters.category) params.set('category', filters.category)
    apiFetch('/api/admin/tests?' + params).then(r => r && r.json())
      .then(d => { setTests(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filters])

  useEffect(() => {
    apiFetch('/api/admin/labs').then(r => r && r.json()).then(d => setLabs(Array.isArray(d) ? d : []))
  }, [])

  useEffect(() => { load() }, [load])

  const categories = [...new Set(tests.map(t => t.category).filter(Boolean))]

  async function savePrice(id) {
    setSaving(true)
    await apiFetch('/api/admin/tests/' + id, { method: 'PATCH', body: JSON.stringify({ price: Number(priceVal) }) })
    setSaving(false); setEditingPrice(null); load()
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div style={{ ...card, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filters.lab_id} onChange={e => setFilters(f => ({ ...f, lab_id: e.target.value }))} style={{ ...inputStyle, width: 180 }}>
          <option value="">All Labs</option>
          {labs.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, width: 160 }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => setFilters({ lab_id: '', category: '' })} style={btn.ghost}>Clear</button>
        <span style={{ marginLeft: 'auto', color: C.muted, fontSize: 13 }}>{tests.length} tests</span>
      </div>
      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {['Test Name', 'Lab', 'Category', 'Price', 'MRP', 'Turnaround', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={t.id} style={{ background: i % 2 === 0 ? C.white : C.bg }}
                  onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? C.white : C.bg}
                >
                  <td style={{ padding: '9px 12px', fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: '9px 12px' }}>{t.lab_name}</td>
                  <td style={{ padding: '9px 12px' }}>{t.category}</td>
                  <td style={{ padding: '9px 12px' }}>
                    {editingPrice === t.id ? (
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <input type="number" value={priceVal} onChange={e => setPriceVal(e.target.value)} style={{ ...inputStyle, width: 80 }} autoFocus />
                        <button onClick={() => savePrice(t.id)} disabled={saving} style={{ ...btn.success, padding: '4px 10px', fontSize: 12 }}>✓</button>
                        <button onClick={() => setEditingPrice(null)} style={{ ...btn.ghost, padding: '4px 10px', fontSize: 12 }}>✕</button>
                      </div>
                    ) : (
                      <span style={{ fontWeight: 700 }}>₹{t.price}</span>
                    )}
                  </td>
                  <td style={{ padding: '9px 12px', textDecoration: 'line-through', color: C.muted }}>₹{t.mrp}</td>
                  <td style={{ padding: '9px 12px' }}>{t.time}</td>
                  <td style={{ padding: '9px 12px' }}>
                    {editingPrice !== t.id && (
                      <button onClick={() => { setEditingPrice(t.id); setPriceVal(t.price) }} style={{ ...btn.ghost, padding: '5px 10px', fontSize: 12 }}>Edit Price</button>
                    )}
                  </td>
                </tr>
              ))}
              {tests.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: C.muted }}>No tests found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── REPORTS ── */
function ReportsPage() {
  const today = new Date().toISOString().slice(0, 10)
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
  const [from, setFrom] = useState(monthAgo)
  const [to, setTo] = useState(today)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  function generate() {
    setLoading(true)
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    apiFetch('/api/admin/reports?' + params).then(r => r && r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }

  function exportCSV() {
    if (!data?.byDay) return
    const rows = [['Date', 'Bookings', 'Revenue', 'Status']]
    data.byDay.forEach(d => rows.push([d.date, d.bookings, d.revenue, d.status]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `labease-report-${from}-${to}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div style={{ ...card, marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>From</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ ...inputStyle, width: 160 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>To</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ ...inputStyle, width: 160 }} />
        </div>
        <button onClick={generate} disabled={loading} style={btn.primary}>{loading ? 'Generating…' : 'Generate Report'}</button>
        {data && <button onClick={exportCSV} style={btn.success}>Export CSV</button>}
      </div>

      {data && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ ...card, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.primary }}>{data.summary?.total_bookings || 0}</div>
              <div style={{ color: C.muted, fontSize: 13 }}>Total Bookings</div>
            </div>
            <div style={{ ...card, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.success }}>₹{(data.summary?.revenue || 0).toLocaleString()}</div>
              <div style={{ color: C.muted, fontSize: 13 }}>Total Revenue</div>
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Day-by-Day Breakdown</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.bg }}>
                    {['Date', 'Status', 'Bookings', 'Revenue'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: C.muted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(data.byDay || []).map((d, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                      <td style={{ padding: '8px 12px' }}>{d.date}</td>
                      <td style={{ padding: '8px 12px' }}><Badge status={d.status} /></td>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>{d.bookings}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600 }}>₹{d.revenue}</td>
                    </tr>
                  ))}
                  {data.byDay?.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24, color: C.muted }}>No data for this period</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ── NOTIFICATIONS ── */
function NotificationsPage() {
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/admin/notifications').then(r => r && r.json())
      .then(d => { setNotifs(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {notifs.map(n => (
        <div key={n.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14, borderLeft: `4px solid ${n.type === 'cancellation' ? C.danger : C.primary}` }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: n.type === 'cancellation' ? '#FEE2E2' : '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
            {n.type === 'cancellation' ? '✕' : '✓'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{n.message}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{n.created_at}</div>
          </div>
          {n.amount && <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>₹{n.amount}</div>}
          <Badge status={n.status} />
        </div>
      ))}
      {notifs.length === 0 && <div style={{ ...card, textAlign: 'center', color: C.muted }}>No notifications yet</div>}
    </div>
  )
}

/* ── SETTINGS ── */
function SettingsPage({ admin }) {
  const [profile, setProfile] = useState({ name: admin?.name || '', email: admin?.email || '' })
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  function saveProfile(e) {
    e.preventDefault()
    setMsg('Profile updated successfully! (Note: server endpoint required for persistence)')
    setTimeout(() => setMsg(''), 3000)
  }

  function changePassword(e) {
    e.preventDefault(); setErr('')
    if (pwd.next !== pwd.confirm) { setErr('New passwords do not match'); return }
    if (pwd.next.length < 6) { setErr('Password must be at least 6 characters'); return }
    setMsg('Password change requires backend endpoint. (Coming soon)')
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, maxWidth: 720 }}>
      <div style={card}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Admin Profile</h3>
        <form onSubmit={saveProfile}>
          {[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email', type: 'email' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input type={f.type || 'text'} value={profile[f.key]} onChange={e => setProfile(x => ({ ...x, [f.key]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
          {msg && <div style={{ color: C.success, fontSize: 13, marginBottom: 12 }}>{msg}</div>}
          <button type="submit" style={btn.primary}>Save Profile</button>
        </form>
      </div>

      <div style={card}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Change Password</h3>
        <form onSubmit={changePassword}>
          {[{ key: 'current', label: 'Current Password' }, { key: 'next', label: 'New Password' }, { key: 'confirm', label: 'Confirm New Password' }].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input type="password" value={pwd[f.key]} onChange={e => setPwd(x => ({ ...x, [f.key]: e.target.value }))} style={inputStyle} />
            </div>
          ))}
          {err && <div style={{ color: C.danger, fontSize: 13, marginBottom: 12 }}>{err}</div>}
          <button type="submit" style={btn.primary}>Change Password</button>
        </form>
      </div>
    </div>
  )
}

/* ── MAIN APP ── */
export default function AdminApp() {
  const [token, setTokenState] = useState(getToken)
  const [admin, setAdmin] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifCount, setNotifCount] = useState(0)

  function handleLogin(adminData) {
    setAdmin(adminData)
    setTokenState(getToken())
  }

  function handleLogout() {
    clearToken()
    setTokenState(null)
    setAdmin(null)
  }

  useEffect(() => {
    if (!token) return
    apiFetch('/api/admin/notifications')
      .then(r => r && r.json())
      .then(d => { if (Array.isArray(d)) setNotifCount(d.filter(n => n.type === 'new_booking').length) })
      .catch(() => {})
  }, [token])

  if (!token) return <LoginPage onLogin={handleLogin} />

  const pages = {
    dashboard:     <DashboardPage />,
    bookings:      <BookingsPage />,
    labs:          <LabsPage />,
    users:         <UsersPage />,
    packages:      <PackagesPage />,
    tests:         <TestsPage />,
    reports:       <ReportsPage />,
    notifications: <NotificationsPage />,
    settings:      <SettingsPage admin={admin} />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'Manrope, sans-serif' }}>
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="main-content">
        <style>{`@media (max-width: 768px) { .main-content { margin-left: 0 !important; } }`}</style>
        <TopHeader admin={admin} currentPage={currentPage} onLogout={handleLogout} notifCount={notifCount} onHamburger={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1, padding: 24, maxWidth: 1200, width: '100%' }}>
          {pages[currentPage] || <DashboardPage />}
        </main>
      </div>
    </div>
  )
}
