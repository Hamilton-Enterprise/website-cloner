import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoreBySlug } from "@/lib/store-repo";
import { Button } from "@/components/ui/button";

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) return { title: "Loja não encontrada — Ember" };
  return {
    title: `${store.name} — feita com Ember`,
    description: store.tagline,
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  return (
    <main className="min-h-screen">
      <header
        className="border-b border-border px-6 py-16 sm:px-10"
        style={{
          background: `linear-gradient(135deg, ${store.colorPrimary}22, transparent 60%)`,
        }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Ember
          </Link>
          <h1
            className="text-4xl font-[family-name:var(--font-heading)] sm:text-5xl"
            style={{ color: store.colorPrimary }}
          >
            {store.name}
          </h1>
          <p className="text-lg text-muted-foreground">{store.tagline}</p>
          <p className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            Gerada por IA a partir de: &ldquo;{store.prompt}&rdquo;
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10">
        <h2 className="mb-6 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Produtos
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {store.products.map((product) => (
            <div
              key={product.title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5"
            >
              <div
                className="h-24 w-full rounded-md"
                style={{
                  background: `linear-gradient(135deg, ${store.colorPrimary}, ${store.colorSecondary})`,
                }}
              />
              <h3 className="font-medium text-card-foreground">
                {product.title}
              </h3>
              <p className="flex-1 text-sm text-muted-foreground">
                {product.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-medium">
                  {formatPrice(product.priceCents)}
                </span>
                <Button size="sm" style={{ backgroundColor: store.colorPrimary }}>
                  Adicionar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 py-10 text-sm text-muted-foreground sm:px-10">
        Loja gerada e alojada por{" "}
        <Link href="/" className="text-foreground underline underline-offset-4">
          Ember
        </Link>
        . Sem processamento de pagamentos real nesta demonstração.
      </footer>
    </main>
  );
}
