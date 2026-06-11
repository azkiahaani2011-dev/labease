const router = require("express").Router();
const { getDb } = require("../db/schema");

// GET /api/packages
router.get("/", (_req, res) => {
  const db = getDb();
  res.json(db.prepare("SELECT * FROM packages ORDER BY id").all());
});

module.exports = router;
