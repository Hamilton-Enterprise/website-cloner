import OpenAI from "openai";
import type { GeneratedProduct, GeneratedStore } from "@/types/store";
import { slugExists } from "@/lib/store-repo";

const MODEL = process.env.OPENAI_STORE_MODEL ?? "gpt-4o-mini";

const SYSTEM_PROMPT = `You are the store-generation engine for Ember, an AI-native ecommerce platform.
Given one sentence describing a business, invent a real, sellable store for it.
Respond with strict JSON only, matching exactly this shape:
{
  "name": string (short, brandable store name, 1-3 words, no generic words like "Shop" or "Store"),
  "tagline": string (one sentence, under 12 words),
  "colorPrimary": string (a hex color that fits the business, e.g. "#c4794a"),
  "colorSecondary": string (a complementary hex color),
  "products": [
    { "title": string, "description": string (30-60 words), "priceCents": integer }
  ] (exactly 3 products, realistic pricing for the category)
}
No commentary, no markdown fences, JSON only.`;

const DIACRITIC_RANGE = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITIC_RANGE, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueSlug(name: string): string {
  const base = slugify(name) || "loja";
  let candidate = base;
  let suffix = 1;
  while (slugExists(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

interface RawGeneration {
  name: string;
  tagline: string;
  colorPrimary: string;
  colorSecondary: string;
  products: GeneratedProduct[];
}

function assertValid(raw: unknown): asserts raw is RawGeneration {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Resposta da IA não é um objecto");
  }
  const r = raw as Record<string, unknown>;
  if (typeof r.name !== "string" || !r.name.trim()) {
    throw new Error("Falta o nome da loja gerado");
  }
  if (typeof r.tagline !== "string" || !r.tagline.trim()) {
    throw new Error("Falta o slogan gerado");
  }
  if (typeof r.colorPrimary !== "string" || typeof r.colorSecondary !== "string") {
    throw new Error("Faltam as cores geradas");
  }
  if (!Array.isArray(r.products) || r.products.length === 0) {
    throw new Error("Faltam os produtos gerados");
  }
  for (const p of r.products) {
    if (
      typeof p !== "object" ||
      p === null ||
      typeof (p as GeneratedProduct).title !== "string" ||
      typeof (p as GeneratedProduct).description !== "string" ||
      typeof (p as GeneratedProduct).priceCents !== "number"
    ) {
      throw new Error("Um produto gerado está incompleto");
    }
  }
}

export async function generateStoreFromPrompt(
  prompt: string
): Promise<GeneratedStore> {
  const trimmed = prompt.trim();
  if (trimmed.length < 8) {
    throw new Error("Descreve o negócio com uma frase completa.");
  }
  if (trimmed.length > 300) {
    throw new Error("Frase demasiado longa — mantém-a a uma frase.");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY não está configurada neste ambiente — a geração real não pode correr."
    );
  }

  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model: MODEL,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: trimmed },
    ],
    temperature: 0.9,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("A IA não devolveu conteúdo.");
  }

  const parsed: unknown = JSON.parse(content);
  assertValid(parsed);

  const products: GeneratedProduct[] = parsed.products.slice(0, 3).map((p) => ({
    title: String(p.title).slice(0, 120),
    description: String(p.description).slice(0, 500),
    priceCents: Math.max(0, Math.round(Number(p.priceCents))),
  }));

  return {
    slug: uniqueSlug(parsed.name),
    prompt: trimmed,
    name: parsed.name.trim(),
    tagline: parsed.tagline.trim(),
    colorPrimary: parsed.colorPrimary.trim(),
    colorSecondary: parsed.colorSecondary.trim(),
    products,
    createdAt: new Date().toISOString(),
  };
}
