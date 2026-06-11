const router = require("express").Router();
const auth   = require("../middleware/auth");
const { getDb } = require("../db/schema");

// POST /api/bookings  (protected)
router.post("/", auth, (req, res) => {
  const { lab_id, patient_name, patient_age, patient_gender, date, slot, mode, address, tests } = req.body;

  if (!lab_id || !patient_name || !date || !slot || !mode || !tests?.length) {
    return res.status(400).json({ error: "lab_id, patient_name, date, slot, mode and tests[] are required" });
  }

  const db    = getDb();
  const total = tests.reduce((s, t) => s + (t.price || 0), 0);

  const insertBooking = db.prepare(`
    INSERT INTO bookings (user_id,lab_id,patient_name,patient_age,patient_gender,date,slot,mode,address,total)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `);
  const insertTest = db.prepare(`
    INSERT INTO booking_tests (booking_id,test_id,test_name,price) VALUES (?,?,?,?)
  `);

  const create = db.transaction(() => {
    const { lastInsertRowid: bookingId } = insertBooking.run(
      req.user.id, lab_id, patient_name, patient_age || null,
      patient_gender || null, date, slot, mode, address || null, total
    );
    for (const t of tests) insertTest.run(bookingId, t.id, t.name, t.price);
    return bookingId;
  });

  const bookingId = create();
  const booking   = getBooking(db, bookingId);
  res.status(201).json(booking);
});

// GET /api/bookings  — current user's bookings (protected)
router.get("/", auth, (req, res) => {
  const db = getDb();
  const bookings = db.prepare(
    "SELECT b.*,l.name as lab_name FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id WHERE b.user_id=? ORDER BY b.created_at DESC"
  ).all(req.user.id);
  res.json(bookings.map(b => ({ ...b, tests: getTests(db, b.id) })));
});

// GET /api/bookings/:id  (protected, own booking only)
router.get("/:id", auth, (req, res) => {
  const db      = getDb();
  const booking = getBooking(db, req.params.id);
  if (!booking)                          return res.status(404).json({ error: "Booking not found" });
  if (booking.user_id !== req.user.id)   return res.status(403).json({ error: "Forbidden" });
  res.json(booking);
});

// DELETE /api/bookings/:id  — cancel (protected)
router.delete("/:id", auth, (req, res) => {
  const db      = getDb();
  const booking = db.prepare("SELECT * FROM bookings WHERE id=?").get(req.params.id);
  if (!booking)                          return res.status(404).json({ error: "Booking not found" });
  if (booking.user_id !== req.user.id)   return res.status(403).json({ error: "Forbidden" });
  db.prepare("UPDATE bookings SET status='cancelled' WHERE id=?").run(req.params.id);
  res.json({ message: "Booking cancelled" });
});

function getTests(db, bookingId) {
  return db.prepare("SELECT * FROM booking_tests WHERE booking_id=?").all(bookingId);
}

function getBooking(db, id) {
  const b = db.prepare("SELECT b.*,l.name as lab_name FROM bookings b LEFT JOIN labs l ON b.lab_id=l.id WHERE b.id=?").get(id);
  if (!b) return null;
  return { ...b, tests: getTests(db, b.id) };
}

module.exports = router;
