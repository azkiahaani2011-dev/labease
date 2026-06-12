const router    = require("express").Router();
const bcrypt    = require("bcryptjs");
const jwt       = require("jsonwebtoken");
const { getDb } = require("../db/schema");
const adminAuth = require("../middleware/adminAuth");

const JWT_SECRET = process.env.JWT_SECRET || "labease_jwt_secret";

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password are required" });
  const db    = getDb();
  const admin = db.prepare("SELECT * FROM admins WHERE email=?").get(email);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ id: admin.id, email: admin.email, name: admin.name, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
  const { password: _, ...safe } = admin;
  res.json({ token, admin: safe });
});

// All routes below require admin auth
router.use(adminAuth);

// GET /api/admin/me
router.get("/me", (req, res) => {
  const db    = getDb();
  const admin = db.prepare("SELECT id, name, email, created_at FROM admins WHERE id=?").get(req.admin.id);
  if (!admin) return res.status(404).json({ error: "Admin not found" });
  res.json({ admin });
});

// GET /api/admin/dashboard
router.get("/dashboard", (req, res) => {
  const db = getDb();
  const total_bookings = db.prepare("SELECT COUNT(*) as c FROM bookings").get().c;
  const total_revenue  = db.prepare("SELECT COALESCE(SUM(total),0) as s FROM bookings WHERE status != 'cancelled'").get().s;
  const total_users    = db.prepare("SELECT COUNT(*) as c FROM users").get().c;
  const total_labs     = db.prepare("SELECT COUNT(*) as c FROM labs").get().c;
  const confirmed      = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='confirmed'").get().c;
  const completed      = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='completed'").get().c;
  const cancelled      = db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status='cancelled'").get().c;
  const recent_bookings = db.prepare(`
    SELECT b.id, b.patient_name, b.date, b.slot, b.status, b.total, b.created_at,
           l.name as lab_name
    FROM bookings b
    LEFT JOIN labs l ON b.lab_id = l.id
    ORDER BY b.created_at DESC LIMIT 10
  `).all();
  res.json({ total_bookings, total_revenue, total_users, total_labs, confirmed, completed, cancelled, recent_bookings });
});

// GET /api/admin/bookings
router.get("/bookings", (req, res) => {
  const db = getDb();
  const { status, lab_id, date, search, page = 1, limit = 15 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = [];
  let params = [];
  if (status) { where.push("b.status = ?"); params.push(status); }
  if (lab_id) { where.push("b.lab_id = ?"); params.push(lab_id); }
  if (date)   { where.push("b.date = ?"); params.push(date); }
  if (search) { where.push("(b.patient_name LIKE ? OR l.name LIKE ?)"); params.push(`%${search}%`, `%${search}%`); }
  const w = where.length ? "WHERE " + where.join(" AND ") : "";
  const total = db.prepare(`SELECT COUNT(*) as c FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id ${w}`).get(...params).c;
  const bookings = db.prepare(`
    SELECT b.*, l.name as lab_name
    FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id
    ${w} ORDER BY b.created_at DESC LIMIT ? OFFSET ?
  `).all(...params, parseInt(limit), offset);
  res.json({ total, page: parseInt(page), bookings });
});

// PATCH /api/admin/bookings/:id
router.patch("/bookings/:id", (req, res) => {
  const db = getDb();
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "status required" });
  db.prepare("UPDATE bookings SET status=? WHERE id=?").run(status, req.params.id);
  res.json({ success: true });
});

// GET /api/admin/users
router.get("/users", (req, res) => {
  const db = getDb();
  const { search, page = 1, limit = 15 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = search ? "WHERE u.name LIKE ? OR u.email LIKE ?" : "";
  let params = search ? [`%${search}%`, `%${search}%`] : [];
  const total = db.prepare(`SELECT COUNT(*) as c FROM users u ${where}`).get(...params).c;
  const users = db.prepare(`
    SELECT u.id, u.name, u.email, u.phone, u.created_at,
           COUNT(b.id) as booking_count
    FROM users u LEFT JOIN bookings b ON b.user_id=u.id
    ${where} GROUP BY u.id ORDER BY u.created_at DESC LIMIT ? OFFSET ?
  `).all(...params, parseInt(limit), offset);
  res.json({ total, users });
});

// GET /api/admin/labs
router.get("/labs", (req, res) => {
  const db   = getDb();
  const labs = db.prepare("SELECT * FROM labs ORDER BY name").all();
  res.json({ labs });
});

// PATCH /api/admin/labs/:id
router.patch("/labs/:id", (req, res) => {
  const db = getDb();
  const { name, city, address, timing, rating, nabl, home_collection } = req.body;
  db.prepare(`UPDATE labs SET
    name=COALESCE(?,name), city=COALESCE(?,city), address=COALESCE(?,address),
    timing=COALESCE(?,timing), rating=COALESCE(?,rating),
    nabl=COALESCE(?,nabl), home_collection=COALESCE(?,home_collection)
    WHERE id=?`).run(name, city, address, timing, rating, nabl ?? null, home_collection ?? null, req.params.id);
  const lab = db.prepare("SELECT * FROM labs WHERE id=?").get(req.params.id);
  res.json({ lab });
});

// GET /api/admin/tests
router.get("/tests", (req, res) => {
  const db = getDb();
  const { lab_id, category, search, page = 1, limit = 20 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = []; let params = [];
  if (lab_id)   { where.push("t.lab_id=?"); params.push(lab_id); }
  if (category) { where.push("t.category=?"); params.push(category); }
  if (search)   { where.push("t.name LIKE ?"); params.push(`%${search}%`); }
  const w = where.length ? "WHERE " + where.join(" AND ") : "";
  const total = db.prepare(`SELECT COUNT(*) as c FROM tests t ${w}`).get(...params).c;
  const tests = db.prepare(`
    SELECT t.*, l.name as lab_name FROM tests t LEFT JOIN labs l ON t.lab_id=l.id
    ${w} ORDER BY t.name LIMIT ? OFFSET ?
  `).all(...params, parseInt(limit), offset);
  res.json({ total, tests });
});

// PATCH /api/admin/tests/:id
router.patch("/tests/:id", (req, res) => {
  const db = getDb();
  const { price, mrp } = req.body;
  db.prepare("UPDATE tests SET price=COALESCE(?,price), mrp=COALESCE(?,mrp) WHERE id=?").run(price, mrp, req.params.id);
  const test = db.prepare("SELECT * FROM tests WHERE id=?").get(req.params.id);
  res.json({ test });
});

// GET /api/admin/packages
router.get("/packages", (req, res) => {
  const db  = getDb();
  const pkgs = db.prepare("SELECT * FROM packages ORDER BY id DESC").all();
  res.json({ packages: pkgs });
});

// POST /api/admin/packages
router.post("/packages", (req, res) => {
  const db = getDb();
  const { title, sub, price, mrp, off, badge, badge_color, img } = req.body;
  if (!title || !price) return res.status(400).json({ error: "title and price required" });
  const info = db.prepare(`INSERT INTO packages (title,sub,price,mrp,off,badge,badge_color,img) VALUES (?,?,?,?,?,?,?,?)`)
    .run(title, sub || null, price, mrp || null, off || null, badge || null, badge_color || null, img || null);
  const pkg = db.prepare("SELECT * FROM packages WHERE id=?").get(info.lastInsertRowid);
  res.status(201).json({ package: pkg });
});

// PATCH /api/admin/packages/:id
router.patch("/packages/:id", (req, res) => {
  const db = getDb();
  const { title, sub, price, mrp, off, badge, badge_color, img } = req.body;
  db.prepare(`UPDATE packages SET
    title=COALESCE(?,title), sub=COALESCE(?,sub), price=COALESCE(?,price),
    mrp=COALESCE(?,mrp), off=COALESCE(?,off), badge=COALESCE(?,badge),
    badge_color=COALESCE(?,badge_color), img=COALESCE(?,img) WHERE id=?`)
    .run(title, sub, price, mrp, off, badge, badge_color, img, req.params.id);
  const pkg = db.prepare("SELECT * FROM packages WHERE id=?").get(req.params.id);
  res.json({ package: pkg });
});

// DELETE /api/admin/packages/:id
router.delete("/packages/:id", (req, res) => {
  const db = getDb();
  db.prepare("DELETE FROM packages WHERE id=?").run(req.params.id);
  res.json({ success: true });
});

// GET /api/admin/reports
router.get("/reports", (req, res) => {
  const db = getDb();
  const { from, to } = req.query;
  let where = []; let params = [];
  if (from) { where.push("b.date >= ?"); params.push(from); }
  if (to)   { where.push("b.date <= ?"); params.push(to); }
  const w = where.length ? "WHERE " + where.join(" AND ") : "";
  const totals = db.prepare(`
    SELECT COUNT(*) as total_bookings,
           COALESCE(SUM(CASE WHEN status!='cancelled' THEN total ELSE 0 END),0) as total_revenue,
           SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed,
           SUM(CASE WHEN status='cancelled' THEN 1 ELSE 0 END) as cancelled
    FROM bookings b ${w}`).get(...params);
  const bookings = db.prepare(`
    SELECT b.*, l.name as lab_name FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id
    ${w} ORDER BY b.date DESC`).all(...params);
  res.json({ ...totals, bookings });
});

// GET /api/admin/notifications
router.get("/notifications", (req, res) => {
  const db = getDb();
  const bookings = db.prepare(`
    SELECT b.id, b.patient_name, b.status, b.total, b.created_at, l.name as lab_name
    FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id
    ORDER BY b.created_at DESC LIMIT 30
  `).all();
  const notifications = bookings.map(b => ({
    id:         b.id,
    type:       b.status === "cancelled" ? "cancelled" : b.status === "completed" ? "completed" : "new_booking",
    message:    b.status === "cancelled"
                  ? `Booking #${b.id} cancelled — ${b.patient_name}`
                  : b.status === "completed"
                  ? `Booking #${b.id} completed — ${b.patient_name} at ${b.lab_name}`
                  : `New booking #${b.id} from ${b.patient_name} at ${b.lab_name}`,
    created_at: b.created_at,
  }));
  res.json({ notifications });
});

// PATCH /api/admin/settings/profile
router.patch("/settings/profile", (req, res) => {
  const db = getDb();
  const { name, email } = req.body;
  db.prepare("UPDATE admins SET name=COALESCE(?,name), email=COALESCE(?,email) WHERE id=?").run(name, email, req.admin.id);
  const admin = db.prepare("SELECT id,name,email,created_at FROM admins WHERE id=?").get(req.admin.id);
  res.json({ admin });
});

// PATCH /api/admin/settings/password
router.patch("/settings/password", (req, res) => {
  const db = getDb();
  const { current, new_password } = req.body;
  const admin = db.prepare("SELECT * FROM admins WHERE id=?").get(req.admin.id);
  if (!bcrypt.compareSync(current, admin.password)) return res.status(401).json({ error: "Current password incorrect" });
  const hash = bcrypt.hashSync(new_password, 10);
  db.prepare("UPDATE admins SET password=? WHERE id=?").run(hash, req.admin.id);
  res.json({ success: true });
});

module.exports = router;
