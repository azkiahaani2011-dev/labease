const router = require("express").Router();
const { getDb } = require("../db/schema");

// GET /api/labs  ?city=&nabl=&home=&q=
router.get("/", (req, res) => {
  const db = getDb();
  let query = "SELECT * FROM labs WHERE 1=1";
  const params = [];

  if (req.query.city) { query += " AND LOWER(city)=LOWER(?)"; params.push(req.query.city); }
  if (req.query.nabl === "1") { query += " AND nabl=1"; }
  if (req.query.home === "1") { query += " AND home_collection=1"; }
  if (req.query.q) { query += " AND LOWER(name) LIKE LOWER(?)"; params.push(`%${req.query.q}%`); }

  const labs = db.prepare(query).all(...params);
  res.json(labs.map(formatLab));
});

// GET /api/labs/:id
router.get("/:id", (req, res) => {
  const db  = getDb();
  const lab = db.prepare("SELECT * FROM labs WHERE id=?").get(req.params.id);
  if (!lab) return res.status(404).json({ error: "Lab not found" });
  res.json(formatLab(lab));
});

// GET /api/labs/:id/tests  ?cat=
router.get("/:id/tests", (req, res) => {
  const db = getDb();
  let query = "SELECT * FROM tests WHERE lab_id=?";
  const params = [req.params.id];
  if (req.query.cat) { query += " AND LOWER(category)=LOWER(?)"; params.push(req.query.cat); }
  if (req.query.q)   { query += " AND LOWER(name) LIKE LOWER(?)"; params.push(`%${req.query.q}%`); }
  res.json(db.prepare(query).all(...params));
});

function formatLab(l) {
  return { ...l, home_collection: !!l.home_collection, nabl: !!l.nabl };
}

module.exports = router;
