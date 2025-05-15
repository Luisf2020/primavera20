/**
 * Seguridad Primavera – Backend Express + SQLite + JWT
 * Funcionará localmente y en Render.com sin necesidad de Postgres.
 *
 *  ▸ `npm install`
 *  ▸ `npm start`
 */

import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';

/*──────────────── Básicos ────────────────*/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SECRET = process.env.JWT_SECRET || 'change-me';
const dbFile = path.join(__dirname, 'seguridad.db');
const db = new Database(dbFile);
db.pragma('journal_mode = WAL');

/*─────────────── Migración (crea tablas una sola vez) ──────────*/
function migrate() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
  console.log('✓ Base de datos inicializada');
}

if (process.argv.includes('--migrate')) {
  migrate();
  process.exit(0);
}
migrate(); // ejecuta silenciosamente en cada arranque

/*────────────── Express + Static ──────────*/
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/*────────────── Autenticación JWT ─────────*/
function auth(req, res, next) {
  const hdr = req.headers.authorization;
  if (!hdr) return res.sendStatus(401);
  try {
    req.user = jwt.verify(hdr.split(' ')[1], SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  const row = db
    .prepare('SELECT * FROM users WHERE user = ? AND pass = ?')
    .get(user, pass);
  if (!row) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign(
    { id: row.id, user: row.user, role: row.role },
    SECRET,
    { expiresIn: '8h' }
  );
  res.json({ token, role: row.role });
});

/*────────────── CRUD genérico ─────────────*/
const tables = [
  'access',
  'bitacora',
  'residents',
  'guards',
  'companies',
  'payments',
  'debts',
  'requests'
];

tables.forEach((t) => {
  app.get(`/api/${t}`, auth, (_req, res) => {
    const rows = db.prepare(`SELECT * FROM ${t} ORDER BY id DESC`).all();
    res.json(rows);
  });

  app.post(`/api/${t}`, auth, (req, res) => {
    const obj = req.body;
    const cols = Object.keys(obj);
    const ph   = cols.map(() => '?').join(', ');
    const stmt = db.prepare(
      `INSERT INTO ${t} (${cols.join(', ')}) VALUES (${ph})`
    );
    const info = stmt.run(...Object.values(obj));
    res.json({ id: info.lastInsertRowid, ...obj });
  });
});

/*────────────── Lanzar servidor ───────────*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`▶ Seguridad Primavera API escuchando en http://localhost:${PORT}`)
);
