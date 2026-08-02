import Link from "next/link";
import type { GeneratedStore } from "@/types/store";

export function StoreGalleryCard({ store }: { store: GeneratedStore }) {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
    >
      <div
        className="h-20 w-full rounded-md"
        style={{
          background: `linear-gradient(135deg, ${store.colorPrimary}, ${store.colorSecondary})`,
        }}
      />
      <div>
        <p className="font-[family-name:var(--font-heading)] text-lg text-card-foreground">
          {store.name}
        </p>
        <p className="text-sm text-muted-foreground">{store.tagline}</p>
      </div>
      <p className="mt-auto text-xs text-muted-foreground/70 group-hover:text-primary">
        Ver loja →
      </p>
    </Link>
  );
}
