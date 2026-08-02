import { getDb } from "@/lib/db";
import type { GeneratedStore } from "@/types/store";

interface StoreRow {
  slug: string;
  prompt: string;
  name: string;
  tagline: string;
  color_primary: string;
  color_secondary: string;
  products: string;
  created_at: string;
}

function rowToStore(row: StoreRow): GeneratedStore {
  return {
    slug: row.slug,
    prompt: row.prompt,
    name: row.name,
    tagline: row.tagline,
    colorPrimary: row.color_primary,
    colorSecondary: row.color_secondary,
    products: JSON.parse(row.products),
    createdAt: row.created_at,
  };
}

export function saveStore(store: GeneratedStore): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO stores (slug, prompt, name, tagline, color_primary, color_secondary, products, created_at)
     VALUES (@slug, @prompt, @name, @tagline, @colorPrimary, @colorSecondary, @products, @createdAt)`
  ).run({
    slug: store.slug,
    prompt: store.prompt,
    name: store.name,
    tagline: store.tagline,
    colorPrimary: store.colorPrimary,
    colorSecondary: store.colorSecondary,
    products: JSON.stringify(store.products),
    createdAt: store.createdAt,
  });
}

export function getStoreBySlug(slug: string): GeneratedStore | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM stores WHERE slug = ?").get(slug) as
    | StoreRow
    | undefined;
  return row ? rowToStore(row) : null;
}

export function listRecentStores(limit = 12): GeneratedStore[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM stores ORDER BY created_at DESC LIMIT ?")
    .all(limit) as StoreRow[];
  return rows.map(rowToStore);
}

export function slugExists(slug: string): boolean {
  const db = getDb();
  const row = db.prepare("SELECT 1 FROM stores WHERE slug = ?").get(slug);
  return !!row;
}
