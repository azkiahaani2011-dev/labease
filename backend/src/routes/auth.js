const router  = require("express").Router();
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const { getDb } = require("../db/schema");

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "name, email and password are required" });

  const db   = getDb();
  const hash = bcrypt.hashSync(password, 10);
  try {
    const stmt = db.prepare("INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)");
    const info = stmt.run(name, email, phone || null, hash);
    const user = db.prepare("SELECT id,name,email,phone FROM users WHERE id=?").get(info.lastInsertRowid);
    res.status(201).json({ token: sign(user), user });
  } catch (e) {
    if (e.message.includes("UNIQUE")) return res.status(409).json({ error: "Email already registered" });
    throw e;
  }
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email and password are required" });

  const db   = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email=?").get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const { password: _, ...safe } = user;
  res.json({ token: sign(safe), user: safe });
});

// GET /api/auth/me  (protected)
router.get("/me", require("../middleware/auth"), (req, res) => {
  const db   = getDb();
  const user = db.prepare("SELECT id,name,email,phone,created_at FROM users WHERE id=?").get(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

module.exports = router;
