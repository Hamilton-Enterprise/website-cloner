import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "stores.sqlite");

declare global {
  var __emberDb: Database.Database | undefined;
}

export function getDb(): Database.Database {
  if (!global.__emberDb) {
    const db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS stores (
        slug TEXT PRIMARY KEY,
        prompt TEXT NOT NULL,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        color_primary TEXT NOT NULL,
        color_secondary TEXT NOT NULL,
        products TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    global.__emberDb = db;
  }
  return global.__emberDb;
}
