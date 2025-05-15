-- Seguridad Primavera – Esquema SQLite

CREATE TABLE IF NOT EXISTS users (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  user  TEXT UNIQUE,
  pass  TEXT,  -- (texto plano demo)
  role  TEXT   -- super | admin | guard | vecino
);

CREATE TABLE IF NOT EXISTS access (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  doc_id TEXT,
  host   TEXT,
  house  TEXT,
  tipo   TEXT,
  guard  TEXT,
  time   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bitacora (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT,
  time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS residents (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT,
  house TEXT,
  phone TEXT,
  addr  TEXT
);

CREATE TABLE IF NOT EXISTS guards (
  id      TEXT PRIMARY KEY,
  name    TEXT,
  phone   TEXT,
  id_card TEXT
);

CREATE TABLE IF NOT EXISTS companies (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT,
  unit  TEXT,
  phone TEXT,
  addr  TEXT
);

CREATE TABLE IF NOT EXISTS payments (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT,
  house  TEXT,
  amount REAL,
  mes    TEXT,
  time   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS debts (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT,
  house  TEXT,
  mes    TEXT,
  amount REAL,
  type   TEXT
);

CREATE TABLE IF NOT EXISTS requests (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  req_type  TEXT,
  requester TEXT,
  status    TEXT,
  time      DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO users (user, pass, role)
VALUES ('super', 'root2025', 'super'),
       ('admin', 'admin123', 'admin');
