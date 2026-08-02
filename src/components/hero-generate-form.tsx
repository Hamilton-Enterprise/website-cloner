"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { generateStoreAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

const EXAMPLE = "luvas de boxe artesanais em couro, feitas por encomenda";

export function HeroGenerateForm() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await generateStoreAction(prompt);
      if (result.ok && result.slug) {
        router.push(`/store/${result.slug}`);
      } else {
        setError(result.error ?? "Não foi possível gerar a loja.");
      }
    });
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 rounded-lg border border-border bg-card/80 p-3 backdrop-blur-sm sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label htmlFor="prompt" className="sr-only">
            Descreve o teu negócio numa frase
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Ex.: ${EXAMPLE}`}
            rows={2}
            maxLength={300}
            disabled={isPending}
            className="w-full resize-none bg-transparent px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending || prompt.trim().length < 8}
          className="shrink-0 rounded-full px-6"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> A gerar a tua loja…
            </>
          ) : (
            <>
              Gerar a minha loja <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
