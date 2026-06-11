const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../labease.db");

let db;
function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
  }
  return db;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      phone     TEXT,
      password  TEXT    NOT NULL,
      created_at TEXT   DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS labs (
      id             INTEGER PRIMARY KEY,
      name           TEXT    NOT NULL,
      rating         REAL,
      reviews        INTEGER,
      city           TEXT,
      address        TEXT,
      distance       TEXT,
      timing         TEXT,
      home_collection INTEGER DEFAULT 0,
      nabl           INTEGER DEFAULT 0,
      color          TEXT,
      founded        TEXT,
      short          TEXT,
      accent         TEXT,
      bg             TEXT,
      tag            TEXT,
      since          TEXT
    );

    CREATE TABLE IF NOT EXISTS tests (
      id       TEXT    PRIMARY KEY,
      lab_id   INTEGER NOT NULL REFERENCES labs(id),
      name     TEXT    NOT NULL,
      price    INTEGER NOT NULL,
      mrp      INTEGER,
      category TEXT,
      time     TEXT
    );

    CREATE TABLE IF NOT EXISTS packages (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      sub        TEXT,
      price      INTEGER NOT NULL,
      mrp        INTEGER,
      off        INTEGER,
      badge      TEXT,
      badge_color TEXT,
      img        TEXT
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER REFERENCES users(id),
      lab_id     INTEGER REFERENCES labs(id),
      patient_name TEXT NOT NULL,
      patient_age  INTEGER,
      patient_gender TEXT,
      date       TEXT,
      slot       TEXT,
      mode       TEXT CHECK(mode IN ('home','visit')),
      address    TEXT,
      total      INTEGER,
      status     TEXT DEFAULT 'confirmed',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS booking_tests (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
      test_id    TEXT    NOT NULL,
      test_name  TEXT    NOT NULL,
      price      INTEGER NOT NULL
    );
  `);
}

module.exports = { getDb };
