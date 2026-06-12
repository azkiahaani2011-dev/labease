import React, { useState, useEffect, useCallback } from "react";

const API = window.location.hostname === "localhost"
  ? "http://localhost:4000"
  : "https://labease-backend.onrender.com";

const TOKEN_KEY = "labease_admin_token";

const C = {
  primary: "#1158A6",
  primaryDark: "#0D4280",
  primaryLight: "#EFF6FF",
  accent: "#2563EB",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  bg: "#F8FAFC",
  sidebar: "#fff",
  text: "#0D1117",
  muted: "#64748B",
  border: "#E2E8F0",
  card: "#fff",
};

const shadow = "0 1px 4px rgba(17,88,166,.08), 0 4px 16px rgba(17,88,166,.06)";
const shadowMd = "0 4px 24px rgba(17,88,166,.12)";

function api(path, opts = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  return fetch(API + path, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }).then(async r => {
    if (r.status === 401) { localStorage.removeItem(TOKEN_KEY); window.location.reload(); }
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Request failed");
    return data;
  });
}

// ─── STATUS BADGE ────────────────────────────────────────────────────────────
function Badge({ status }) {
  const map = {
    confirmed: [C.primaryLight, C.primary],
    completed: ["#F0FDF4", C.success],
    cancelled: ["#FEF2F2", C.danger],
    active:    ["#F0FDF4", C.success],
    inactive:  ["#F8FAFC", C.muted],
  };
  const [bg, color] = map[status] || ["#F1F5F9", C.muted];
  return (
    <span style={{ background: bg, color, borderRadius: 50, padding: "3px 12px", fontSize: ".72rem", fontWeight: 700, textTransform: "capitalize" }}>
      {status}
    </span>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: C.card, borderRadius: 14, boxShadow: shadow, padding: 24, ...style }}>{children}</div>;
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color = C.primary, sub }) {
  return (
    <Card style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.5rem" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: ".75rem", color: C.muted, fontWeight: 600, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: "1.7rem", fontWeight: 900, color: C.text, lineHeight: 1, fontFamily: "'Manrope',sans-serif" }}>{value}</div>
        {sub && <div style={{ fontSize: ".72rem", color: C.success, fontWeight: 600, marginTop: 4 }}>{sub}</div>}
      </div>
    </Card>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: wide ? 720 : 480, maxHeight: "90vh", overflow: "auto", boxShadow: shadowMd }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: C.text, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: C.muted, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: ".78rem", fontWeight: 700, color: C.muted, marginBottom: 6 }}>{label}</label>}
      <input {...props} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: ".88rem", color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "'Manrope',sans-serif", background: "#fff", ...props.style }}
        onFocus={e => e.target.style.borderColor = C.primary}
        onBlur={e => e.target.style.borderColor = C.border} />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: ".78rem", fontWeight: 700, color: C.muted, marginBottom: 6 }}>{label}</label>}
      <select {...props} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: ".88rem", color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "'Manrope',sans-serif", background: "#fff", ...props.style }}>
        {children}
      </select>
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, style = {}, disabled }) {
  const styles = {
    primary: { background: C.primary, color: "#fff", border: "none" },
    danger:  { background: C.danger, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
    ghost:   { background: C.primaryLight, color: C.primary, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...styles[variant], borderRadius: 10, padding: "10px 20px", fontSize: ".84rem", fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'Manrope',sans-serif", opacity: disabled ? .6 : 1, transition: "all .14s", ...style }}>
      {children}
    </button>
  );
}

// ─── TABLE ────────────────────────────────────────────────────────────────────
function Table({ cols, rows, onRow }) {
  if (!rows?.length) return <div style={{ textAlign: "center", padding: "48px 0", color: C.muted, fontSize: ".9rem" }}>No data found</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".83rem" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${C.border}` }}>
            {cols.map(c => <th key={c.key || c.label} style={{ padding: "10px 14px", textAlign: "left", color: C.muted, fontWeight: 700, whiteSpace: "nowrap", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".06em" }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} onClick={() => onRow?.(row)}
              style={{ borderBottom: `1px solid ${C.border}`, cursor: onRow ? "pointer" : "default", transition: "background .1s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.primaryLight}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {cols.map(c => <td key={c.key || c.label} style={{ padding: "12px 14px", color: C.text, whiteSpace: "nowrap" }}>{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
function Pagination({ page, total, limit, onChange }) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
      <Btn variant="outline" onClick={() => onChange(page - 1)} disabled={page <= 1} style={{ padding: "6px 14px" }}>← Prev</Btn>
      {Array.from({ length: Math.min(pages, 7) }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onChange(p)} style={{ width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${p === page ? C.primary : C.border}`, background: p === page ? C.primary : "#fff", color: p === page ? "#fff" : C.text, fontWeight: 700, cursor: "pointer", fontSize: ".83rem" }}>{p}</button>
      ))}
      <Btn variant="outline" onClick={() => onChange(page + 1)} disabled={page >= pages} style={{ padding: "6px 14px" }}>Next →</Btn>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api("/api/admin/dashboard").then(setData).catch(() => {}); }, []);

  if (!data) return <Loading />;
  return (
    <div>
      <PageHeader title="Dashboard" sub="Welcome back! Here's what's happening today." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18, marginBottom: 28 }}>
        <StatCard label="Total Bookings" value={data.total_bookings ?? 0} icon="📋" color={C.primary} />
        <StatCard label="Revenue (₹)" value={"₹" + ((data.total_revenue ?? 0)).toLocaleString()} icon="💰" color={C.success} />
        <StatCard label="Registered Users" value={data.total_users ?? 0} icon="👥" color={C.warning} />
        <StatCard label="Partner Labs" value={data.total_labs ?? 0} icon="🏥" color="#8B5CF6" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
        {/* booking status breakdown */}
        <Card>
          <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: ".95rem", color: C.text, marginBottom: 18 }}>Bookings by Status</h3>
          {[
            { label: "Confirmed", val: data.confirmed ?? 0, color: C.primary },
            { label: "Completed", val: data.completed ?? 0, color: C.success },
            { label: "Cancelled", val: data.cancelled ?? 0, color: C.danger },
          ].map(({ label, val, color }) => {
            const total = (data.total_bookings || 1);
            const pct = Math.round((val / total) * 100);
            return (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: ".8rem", fontWeight: 600 }}>
                  <span style={{ color: C.text }}>{label}</span>
                  <span style={{ color: C.muted }}>{val} ({pct}%)</span>
                </div>
                <div style={{ height: 8, background: C.border, borderRadius: 99 }}>
                  <div style={{ height: 8, width: pct + "%", background: color, borderRadius: 99, transition: "width .4s" }} />
                </div>
              </div>
            );
          })}
        </Card>

        {/* recent bookings */}
        <Card>
          <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: ".95rem", color: C.text, marginBottom: 18 }}>Recent Bookings</h3>
          <div style={{ overflowX: "auto" }}>
            {(data.recent_bookings || []).slice(0, 5).map(b => (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".82rem", color: C.text }}>#{b.id} — {b.patient_name}</div>
                  <div style={{ fontSize: ".72rem", color: C.muted }}>{b.lab_name} · {b.date}</div>
                </div>
                <Badge status={b.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
function Bookings() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const limit = 15;

  const load = useCallback(() => {
    const params = new URLSearchParams({ page, limit, ...(status && { status }), ...(search && { search }) });
    api(`/api/admin/bookings?${params}`).then(d => { setRows(d.bookings || []); setTotal(d.total || 0); }).catch(() => {});
  }, [page, status, search]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = (id, newStatus) => {
    api(`/api/admin/bookings/${id}`, { method: "PATCH", body: { status: newStatus } })
      .then(() => { load(); setSelected(null); }).catch(e => alert(e.message));
  };

  return (
    <div>
      <PageHeader title="Bookings" sub={`${total} total bookings`} />
      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <input placeholder="Search patient, lab..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ flex: 1, minWidth: 180, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none" }} />
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}
            style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none", background: "#fff" }}>
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <Table
          cols={[
            { label: "ID", key: "id" },
            { label: "Patient", key: "patient_name" },
            { label: "Lab", key: "lab_name" },
            { label: "Date", key: "date" },
            { label: "Slot", key: "slot" },
            { label: "Mode", key: "mode" },
            { label: "Total", render: r => "₹" + (r.total || 0) },
            { label: "Status", render: r => <Badge status={r.status} /> },
          ]}
          rows={rows}
          onRow={setSelected}
        />
        <Pagination page={page} total={total} limit={limit} onChange={setPage} />
      </Card>

      {selected && (
        <Modal title={`Booking #${selected.id}`} onClose={() => setSelected(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[["Patient", selected.patient_name], ["Age", selected.patient_age], ["Gender", selected.patient_gender],
              ["Lab", selected.lab_name], ["Date", selected.date], ["Slot", selected.slot],
              ["Mode", selected.mode], ["Total", "₹" + selected.total], ["Created", selected.created_at?.slice(0, 10)]
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: ".72rem", color: C.muted, fontWeight: 700, marginBottom: 3 }}>{k}</div>
                <div style={{ fontWeight: 600, color: C.text }}>{v || "—"}</div>
              </div>
            ))}
          </div>
          {selected.address && <div style={{ marginBottom: 16 }}><div style={{ fontSize: ".72rem", color: C.muted, fontWeight: 700, marginBottom: 3 }}>Address</div><div>{selected.address}</div></div>}
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: ".82rem", color: C.muted, fontWeight: 600, alignSelf: "center" }}>Update status:</div>
            {["confirmed", "completed", "cancelled"].map(s => (
              <Btn key={s} variant={s === selected.status ? "primary" : "outline"} onClick={() => updateStatus(selected.id, s)}
                style={{ padding: "7px 16px", textTransform: "capitalize" }}>{s}</Btn>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── LABS ─────────────────────────────────────────────────────────────────────
function Labs() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { api("/api/admin/labs").then(d => setRows(d.labs || [])).catch(() => {}); }, []);

  const save = () => {
    api(`/api/admin/labs/${editing.id}`, { method: "PATCH", body: form })
      .then(() => { api("/api/admin/labs").then(d => setRows(d.labs || [])); setEditing(null); })
      .catch(e => alert(e.message));
  };

  return (
    <div>
      <PageHeader title="Diagnostic Labs" sub={`${rows.length} partner labs`} />
      <Card>
        <Table
          cols={[
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "Rating", render: r => `⭐ ${r.rating || "—"}` },
            { label: "NABL", render: r => r.nabl ? "✅ Yes" : "❌ No" },
            { label: "Home", render: r => r.home_collection ? "✅ Yes" : "❌ No" },
            { label: "Timing", key: "timing" },
          ]}
          rows={rows}
          onRow={r => { setEditing(r); setForm({ name: r.name, city: r.city, address: r.address, timing: r.timing, rating: r.rating, nabl: r.nabl, home_collection: r.home_collection }); }}
        />
      </Card>

      {editing && (
        <Modal title={`Edit Lab — ${editing.name}`} onClose={() => setEditing(null)}>
          <Input label="Name" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input label="City" value={form.city || ""} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
          <Input label="Address" value={form.address || ""} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          <Input label="Timing" value={form.timing || ""} onChange={e => setForm(f => ({ ...f, timing: e.target.value }))} />
          <Input label="Rating" type="number" step="0.1" min="0" max="5" value={form.rating || ""} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} />
          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600, fontSize: ".85rem", cursor: "pointer" }}>
              <input type="checkbox" checked={!!form.nabl} onChange={e => setForm(f => ({ ...f, nabl: e.target.checked ? 1 : 0 }))} /> NABL Certified
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600, fontSize: ".85rem", cursor: "pointer" }}>
              <input type="checkbox" checked={!!form.home_collection} onChange={e => setForm(f => ({ ...f, home_collection: e.target.checked ? 1 : 0 }))} /> Home Collection
            </label>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="outline" onClick={() => setEditing(null)}>Cancel</Btn>
            <Btn onClick={save}>Save Changes</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── USERS ────────────────────────────────────────────────────────────────────
function Users() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const limit = 15;

  const load = useCallback(() => {
    const params = new URLSearchParams({ page, limit, ...(search && { search }) });
    api(`/api/admin/users?${params}`).then(d => { setRows(d.users || []); setTotal(d.total || 0); }).catch(() => {});
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <PageHeader title="Users" sub={`${total} registered users`} />
      <Card>
        <div style={{ marginBottom: 20 }}>
          <input placeholder="Search by name or email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ width: "100%", maxWidth: 340, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none", boxSizing: "border-box" }} />
        </div>
        <Table
          cols={[
            { label: "ID", key: "id" },
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Bookings", key: "booking_count" },
            { label: "Joined", render: r => r.created_at?.slice(0, 10) },
          ]}
          rows={rows}
          onRow={setSelected}
        />
        <Pagination page={page} total={total} limit={limit} onChange={setPage} />
      </Card>

      {selected && (
        <Modal title={`User — ${selected.name}`} onClose={() => setSelected(null)}>
          {[["Email", selected.email], ["Phone", selected.phone || "—"], ["Total Bookings", selected.booking_count], ["Joined", selected.created_at?.slice(0, 10)]].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: ".72rem", color: C.muted, fontWeight: 700, marginBottom: 3 }}>{k}</div>
              <div style={{ fontWeight: 600, color: C.text }}>{v}</div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
}

// ─── PACKAGES ─────────────────────────────────────────────────────────────────
function Packages() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [adding, setAdding] = useState(false);

  const load = () => api("/api/admin/packages").then(d => setRows(d.packages || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = () => {
    const method = editing ? "PATCH" : "POST";
    const path = editing ? `/api/admin/packages/${editing.id}` : "/api/admin/packages";
    api(path, { method, body: form }).then(() => { load(); setEditing(null); setAdding(false); setForm({}); }).catch(e => alert(e.message));
  };

  const del = id => {
    if (!confirm("Delete this package?")) return;
    api(`/api/admin/packages/${id}`, { method: "DELETE" }).then(() => load()).catch(e => alert(e.message));
  };

  const openEdit = r => { setEditing(r); setAdding(true); setForm({ title: r.title, sub: r.sub, price: r.price, mrp: r.mrp, off: r.off, badge: r.badge, badge_color: r.badge_color, img: r.img }); };

  return (
    <div>
      <PageHeader title="Health Packages" sub={`${rows.length} packages`}>
        <Btn onClick={() => { setEditing(null); setForm({}); setAdding(true); }}>+ Add Package</Btn>
      </PageHeader>
      <Card>
        <Table
          cols={[
            { label: "ID", key: "id" },
            { label: "Title", key: "title" },
            { label: "Sub", key: "sub" },
            { label: "Price", render: r => "₹" + r.price },
            { label: "MRP", render: r => r.mrp ? "₹" + r.mrp : "—" },
            { label: "Off", render: r => r.off ? r.off + "%" : "—" },
            { label: "Badge", key: "badge" },
            { label: "Actions", render: r => (
              <div style={{ display: "flex", gap: 8 }}>
                <Btn variant="ghost" onClick={e => { e.stopPropagation(); openEdit(r); }} style={{ padding: "4px 12px", fontSize: ".75rem" }}>Edit</Btn>
                <Btn variant="danger" onClick={e => { e.stopPropagation(); del(r.id); }} style={{ padding: "4px 12px", fontSize: ".75rem" }}>Del</Btn>
              </div>
            )},
          ]}
          rows={rows}
        />
      </Card>

      {adding && (
        <Modal title={editing ? "Edit Package" : "Add Package"} onClose={() => { setAdding(false); setEditing(null); setForm({}); }}>
          <Input label="Title" value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <Input label="Subtitle" value={form.sub || ""} onChange={e => setForm(f => ({ ...f, sub: e.target.value }))} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Price (₹)" type="number" value={form.price || ""} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            <Input label="MRP (₹)" type="number" value={form.mrp || ""} onChange={e => setForm(f => ({ ...f, mrp: e.target.value }))} />
            <Input label="Discount %" type="number" value={form.off || ""} onChange={e => setForm(f => ({ ...f, off: e.target.value }))} />
            <Input label="Badge Text" value={form.badge || ""} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
          </div>
          <Input label="Badge Color" value={form.badge_color || ""} onChange={e => setForm(f => ({ ...f, badge_color: e.target.value }))} placeholder="#1158A6" />
          <Input label="Image URL" value={form.img || ""} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="outline" onClick={() => { setAdding(false); setEditing(null); setForm({}); }}>Cancel</Btn>
            <Btn onClick={save}>{editing ? "Save Changes" : "Add Package"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── TESTS ────────────────────────────────────────────────────────────────────
function Tests() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [labId, setLabId] = useState("");
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const limit = 20;

  const load = useCallback(() => {
    const params = new URLSearchParams({ page, limit, ...(labId && { lab_id: labId }), ...(cat && { category: cat }), ...(search && { search }) });
    api(`/api/admin/tests?${params}`).then(d => { setRows(d.tests || []); setTotal(d.total || 0); }).catch(() => {});
  }, [page, labId, cat, search]);

  useEffect(() => { load(); }, [load]);

  const save = () => {
    api(`/api/admin/tests/${editing.id}`, { method: "PATCH", body: form })
      .then(() => { load(); setEditing(null); }).catch(e => alert(e.message));
  };

  const cats = [...new Set(rows.map(r => r.category).filter(Boolean))];

  return (
    <div>
      <PageHeader title="Tests" sub={`${total} tests across all labs`} />
      <Card>
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <input placeholder="Search test name..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ flex: 1, minWidth: 160, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none" }} />
          <select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }}
            style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none", background: "#fff" }}>
            <option value="">All Categories</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Table
          cols={[
            { label: "Test ID", key: "id" },
            { label: "Name", key: "name" },
            { label: "Category", key: "category" },
            { label: "Lab", key: "lab_name" },
            { label: "Price", render: r => "₹" + r.price },
            { label: "MRP", render: r => r.mrp ? "₹" + r.mrp : "—" },
            { label: "TAT", key: "time" },
            { label: "Edit", render: r => <Btn variant="ghost" onClick={e => { e.stopPropagation(); setEditing(r); setForm({ price: r.price, mrp: r.mrp }); }} style={{ padding: "4px 12px", fontSize: ".75rem" }}>Edit</Btn> },
          ]}
          rows={rows}
        />
        <Pagination page={page} total={total} limit={limit} onChange={setPage} />
      </Card>

      {editing && (
        <Modal title={`Edit — ${editing.name}`} onClose={() => setEditing(null)}>
          <div style={{ marginBottom: 12, fontSize: ".82rem", color: C.muted }}>{editing.lab_name} · {editing.category}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Price (₹)" type="number" value={form.price || ""} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            <Input label="MRP (₹)" type="number" value={form.mrp || ""} onChange={e => setForm(f => ({ ...f, mrp: e.target.value }))} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="outline" onClick={() => setEditing(null)}>Cancel</Btn>
            <Btn onClick={save}>Save Price</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports() {
  const [data, setData] = useState(null);
  const [from, setFrom] = useState(new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));

  const load = () => {
    api(`/api/admin/reports?from=${from}&to=${to}`).then(setData).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const exportCSV = () => {
    if (!data?.bookings?.length) return;
    const header = "ID,Patient,Lab,Date,Mode,Total,Status\n";
    const rows = data.bookings.map(b => `${b.id},"${b.patient_name}","${b.lab_name}",${b.date},${b.mode},${b.total},${b.status}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `labease-report-${from}-${to}.csv`; a.click();
  };

  return (
    <div>
      <PageHeader title="Reports" sub="Booking and revenue analytics">
        <Btn variant="outline" onClick={exportCSV}>⬇ Export CSV</Btn>
      </PageHeader>

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: C.muted, marginBottom: 5 }}>From</label>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".75rem", fontWeight: 700, color: C.muted, marginBottom: 5 }}>To</label>
            <input type="date" value={to} onChange={e => setTo(e.target.value)} style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: ".85rem", outline: "none" }} />
          </div>
          <Btn onClick={load}>Generate Report</Btn>
        </div>
      </Card>

      {data && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18, marginBottom: 24 }}>
            <StatCard label="Bookings" value={data.total_bookings ?? 0} icon="📋" />
            <StatCard label="Revenue" value={"₹" + (data.total_revenue ?? 0).toLocaleString()} icon="💰" color={C.success} />
            <StatCard label="Completed" value={data.completed ?? 0} icon="✅" color={C.success} />
            <StatCard label="Cancelled" value={data.cancelled ?? 0} icon="❌" color={C.danger} />
          </div>
          <Card>
            <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: ".95rem", marginBottom: 16 }}>Booking Details</h3>
            <Table
              cols={[
                { label: "ID", key: "id" },
                { label: "Patient", key: "patient_name" },
                { label: "Lab", key: "lab_name" },
                { label: "Date", key: "date" },
                { label: "Mode", key: "mode" },
                { label: "Total", render: r => "₹" + r.total },
                { label: "Status", render: r => <Badge status={r.status} /> },
              ]}
              rows={data.bookings || []}
            />
          </Card>
        </>
      )}
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
function Notifications() {
  const [rows, setRows] = useState([]);
  useEffect(() => { api("/api/admin/notifications").then(d => setRows(d.notifications || [])).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Notifications" sub="Recent system events" />
      <Card>
        {rows.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}>No notifications yet</div>
        ) : rows.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
              {n.type === "new_booking" ? "📋" : n.type === "cancelled" ? "❌" : n.type === "completed" ? "✅" : "🔔"}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: ".85rem", color: C.text, marginBottom: 3 }}>{n.message}</div>
              <div style={{ fontSize: ".72rem", color: C.muted }}>{n.created_at?.slice(0, 16).replace("T", " ")}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({ admin, setAdmin }) {
  const [form, setForm] = useState({ name: admin?.name || "", email: admin?.email || "" });
  const [pwForm, setPwForm] = useState({ current: "", new_password: "", confirm: "" });
  const [msg, setMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const saveProfile = () => {
    api("/api/admin/settings/profile", { method: "PATCH", body: form })
      .then(d => { setMsg("Profile updated!"); setAdmin(d.admin); setTimeout(() => setMsg(""), 3000); })
      .catch(e => setMsg(e.message));
  };

  const changePassword = () => {
    if (pwForm.new_password !== pwForm.confirm) { setPwMsg("Passwords don't match"); return; }
    api("/api/admin/settings/password", { method: "PATCH", body: { current: pwForm.current, new_password: pwForm.new_password } })
      .then(() => { setPwMsg("Password changed!"); setPwForm({ current: "", new_password: "", confirm: "" }); setTimeout(() => setPwMsg(""), 3000); })
      .catch(e => setPwMsg(e.message));
  };

  return (
    <div>
      <PageHeader title="Settings" sub="Manage your admin account" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card>
          <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: ".95rem", marginBottom: 20 }}>Profile</h3>
          <Input label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          {msg && <div style={{ color: msg.includes("!") ? C.success : C.danger, fontSize: ".82rem", marginBottom: 12, fontWeight: 600 }}>{msg}</div>}
          <Btn onClick={saveProfile}>Save Profile</Btn>
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: ".95rem", marginBottom: 20 }}>Change Password</h3>
          <Input label="Current Password" type="password" value={pwForm.current} onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))} />
          <Input label="New Password" type="password" value={pwForm.new_password} onChange={e => setPwForm(f => ({ ...f, new_password: e.target.value }))} />
          <Input label="Confirm New Password" type="password" value={pwForm.confirm} onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))} />
          {pwMsg && <div style={{ color: pwMsg.includes("!") ? C.success : C.danger, fontSize: ".82rem", marginBottom: 12, fontWeight: 600 }}>{pwMsg}</div>}
          <Btn onClick={changePassword}>Change Password</Btn>
        </Card>
      </div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Loading() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: C.muted, fontSize: ".9rem" }}>Loading...</div>;
}

function PageHeader({ title, sub, children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
      <div>
        <h2 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 900, fontSize: "1.35rem", color: C.text, margin: "0 0 4px" }}>{title}</h2>
        {sub && <p style={{ color: C.muted, fontSize: ".83rem", margin: 0 }}>{sub}</p>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@labease.com");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const data = await api("/api/admin/login", { method: "POST", body: { email, password } });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.admin);
    } catch (e) { setErr(e.message); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 24, boxShadow: shadowMd, padding: "40px 36px", width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: C.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <span style={{ fontSize: "1.6rem" }}>🏥</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 900, fontSize: "1.4rem", color: C.text, margin: "0 0 6px" }}>LabEase Admin</h1>
          <p style={{ color: C.muted, fontSize: ".85rem", margin: 0 }}>Sign in to your admin panel</p>
        </div>
        <form onSubmit={submit}>
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {err && <div style={{ color: C.danger, fontSize: ".82rem", marginBottom: 12, fontWeight: 600, background: "#FEF2F2", padding: "8px 12px", borderRadius: 8 }}>{err}</div>}
          <Btn style={{ width: "100%", justifyContent: "center", marginTop: 4 }} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Btn>
        </form>
        <div style={{ marginTop: 20, padding: "12px 14px", background: C.primaryLight, borderRadius: 10, fontSize: ".78rem", color: C.primary, fontWeight: 600 }}>
          Default: admin@labease.com / admin123
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",     label: "Dashboard",     icon: "📊" },
  { id: "bookings",      label: "Bookings",       icon: "📋" },
  { id: "labs",          label: "Labs",           icon: "🏥" },
  { id: "users",         label: "Users",          icon: "👥" },
  { id: "packages",      label: "Packages",       icon: "📦" },
  { id: "tests",         label: "Tests",          icon: "🧪" },
  { id: "reports",       label: "Reports",        icon: "📈" },
  { id: "notifications", label: "Notifications",  icon: "🔔" },
  { id: "settings",      label: "Settings",       icon: "⚙️" },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api("/api/admin/me").then(d => setAdmin(d.admin)).catch(() => localStorage.removeItem(TOKEN_KEY));
    }
  }, []);

  const logout = () => { localStorage.removeItem(TOKEN_KEY); setAdmin(null); };

  if (!admin) return <Login onLogin={setAdmin} />;

  const PAGES = { dashboard: <Dashboard />, bookings: <Bookings />, labs: <Labs />, users: <Users />, packages: <Packages />, tests: <Tests />, reports: <Reports />, notifications: <Notifications />, settings: <Settings admin={admin} setAdmin={setAdmin} /> };

  const Sidebar = () => (
    <div style={{ width: 230, background: C.sidebar, borderRight: `1px solid ${C.border}`, height: "100vh", position: "fixed", top: 0, left: 0, display: "flex", flexDirection: "column", zIndex: 200, boxShadow: isMobile ? shadowMd : "none" }}>
      {/* logo */}
      <div style={{ padding: "24px 20px 18px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "1.1rem" }}>🏥</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 900, fontSize: ".95rem", color: C.text }}>LabEase</div>
            <div style={{ fontSize: ".68rem", color: C.muted, fontWeight: 600 }}>Admin Panel</div>
          </div>
        </div>
      </div>
      {/* nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => { setPage(n.id); setSideOpen(false); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: ".85rem", marginBottom: 2, transition: "all .13s",
              background: page === n.id ? C.primaryLight : "transparent",
              color: page === n.id ? C.primary : C.muted }}>
            <span style={{ fontSize: "1rem" }}>{n.icon}</span>
            {n.label}
            {page === n.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: 99, background: C.primary }} />}
          </button>
        ))}
      </nav>
      {/* admin info */}
      <div style={{ padding: "16px 14px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: ".85rem", flexShrink: 0 }}>
            {admin.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: ".8rem", color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admin.name}</div>
            <div style={{ fontSize: ".68rem", color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admin.email}</div>
          </div>
          <button onClick={logout} title="Logout" style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: "1rem" }}>⬅</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Manrope',sans-serif" }}>
        {/* sidebar */}
        {(!isMobile || sideOpen) && <Sidebar />}
        {/* mobile overlay */}
        {isMobile && sideOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 199 }} onClick={() => setSideOpen(false)} />}

        {/* main */}
        <div style={{ marginLeft: isMobile ? 0 : 230, minHeight: "100vh" }}>
          {/* top bar */}
          <div style={{ height: 60, background: "#fff", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
            {isMobile && (
              <button onClick={() => setSideOpen(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: C.text }}>☰</button>
            )}
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 800, fontSize: ".95rem", color: C.text, textTransform: "capitalize" }}>
                {NAV.find(n => n.id === page)?.label}
              </span>
            </div>
            <button onClick={() => setPage("notifications")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>🔔</button>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: ".85rem", cursor: "pointer" }} onClick={() => setPage("settings")}>
              {admin.name?.[0]?.toUpperCase()}
            </div>
          </div>

          {/* page content */}
          <div style={{ padding: isMobile ? 16 : 28 }}>
            {PAGES[page] || <Dashboard />}
          </div>
        </div>
      </div>
    </>
  );
}
