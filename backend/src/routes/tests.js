const router = require("express").Router();
const { getDb } = require("../db/schema");

// GET /api/tests  ?q=&cat=&lab=
router.get("/", (req, res) => {
  const db = getDb();
  let query = `
    SELECT t.*, l.name as lab_name, l.city, l.rating, l.nabl, l.home_collection
    FROM tests t JOIN labs l ON t.lab_id = l.id
    WHERE 1=1
  `;
  const params = [];
  if (req.query.q)   { query += " AND LOWER(t.name) LIKE LOWER(?)"; params.push(`%${req.query.q}%`); }
  if (req.query.cat) { query += " AND LOWER(t.category)=LOWER(?)";  params.push(req.query.cat); }
  if (req.query.lab) { query += " AND t.lab_id=?";                  params.push(req.query.lab); }
  query += " ORDER BY t.price ASC";

  res.json(db.prepare(query).all(...params));
});

// GET /api/tests/categories  — distinct list
router.get("/categories", (_req, res) => {
  const db   = getDb();
  const cats = db.prepare("SELECT DISTINCT category FROM tests ORDER BY category").all().map(r => r.category);
  res.json(cats);
});

module.exports = router;
