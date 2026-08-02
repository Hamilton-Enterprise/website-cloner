"use server";

import { generateStoreFromPrompt } from "@/lib/generate-store";
import { saveStore, listRecentStores } from "@/lib/store-repo";
import type { GeneratedStore } from "@/types/store";

export interface GenerateStoreResult {
  ok: boolean;
  slug?: string;
  error?: string;
}

export async function generateStoreAction(
  prompt: string
): Promise<GenerateStoreResult> {
  try {
    const store = await generateStoreFromPrompt(prompt);
    saveStore(store);
    return { ok: true, slug: store.slug };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Falha desconhecida ao gerar a loja.",
    };
  }
}

export async function getRecentStoresAction(): Promise<GeneratedStore[]> {
  return listRecentStores(12);
}
