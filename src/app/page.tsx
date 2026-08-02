import Link from "next/link";
import { Sparkles, Wand2, Rocket, Store } from "lucide-react";
import { listRecentStores } from "@/lib/store-repo";
import { HeroGenerateForm } from "@/components/hero-generate-form";
import { StoreGalleryCard } from "@/components/store-gallery-card";
import Aurora from "@/components/react-bits/Aurora";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const stores = listRecentStores(9);

  return (
    <main className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm sm:px-10">
        <span className="font-[family-name:var(--font-heading)] text-xl text-foreground">
          Ember
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#como-funciona"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Como funciona
          </a>
          <a
            href="#lojas"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Lojas geradas
          </a>
          <Button render={<a href="#gerar" />} nativeButton={false} size="sm">
            Começar grátis
          </Button>
        </div>
      </nav>

      {/* Hero — o mecanismo real é o herói, não uma ilustração dele. */}
      <section
        id="gerar"
        className="relative overflow-hidden border-b border-border px-6 py-24 sm:px-10 sm:py-32"
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Aurora colorStops={["#c4794a", "#8a5a3a", "#241f1a"]} amplitude={0.8} blend={0.6} speed={0.4} />
        </div>
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <h1 className="text-display-xl text-foreground">
            A tua loja nasce de uma frase.
          </h1>
          <p className="text-lg text-muted-foreground">
            Escreve o que queres vender. A Ember gera a marca, os produtos e
            a loja — a sério, ao vivo, sem ninguém a configurar nada por ti.
          </p>
          <div className="w-full max-w-xl">
            <HeroGenerateForm />
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <Sparkles className="size-3.5" /> Acesso antecipado, geração real
            por IA. Sem processamento de pagamentos nesta fase — ver{" "}
            <a href="#roteiro" className="underline underline-offset-4">
              o que ainda falta
            </a>
            .
          </p>
        </div>
      </section>

      {/* Galeria — prova social honesta: lojas reais geradas por quem visitou, não números inventados. */}
      <section id="lojas" className="border-b border-border px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-display-lg mb-2 text-foreground">
            Lojas geradas agora mesmo
          </h2>
          <p className="mb-8 text-muted-foreground">
            Sem logótipos de clientes fabricados — cada cartão abaixo é uma
            loja real, gerada por alguém que escreveu uma frase aqui em cima.
          </p>
          {stores.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {stores.map((store) => (
                <StoreGalleryCard key={store.slug} store={store} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              <Store className="size-8" />
              <p>
                Ainda não há nenhuma loja gerada. Sê a primeira pessoa a
                experimentar, ali em cima.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Como funciona — três passos reais, não seis funcionalidades por construir. */}
      <section id="como-funciona" className="border-b border-border px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-display-lg mb-10 text-foreground">
            Como funciona, a sério
          </h2>
          <ol className="flex flex-col gap-8">
            {[
              {
                icon: Wand2,
                title: "Escreves uma frase",
                body: "Descreves o que queres vender, em português normal — nada de formulários com vinte campos.",
              },
              {
                icon: Sparkles,
                title: "A IA gera a loja",
                body: "Nome de marca, três produtos com descrição e preço, e uma paleta de cor — gerado em segundos, chamada real à IA, sem respostas pré-fabricadas.",
              },
              {
                icon: Rocket,
                title: "A loja fica ao vivo",
                body: "Recebes um URL próprio com a loja gerada, já visível para qualquer pessoa. Aparece também na galeria acima.",
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-medium text-foreground">
                    <step.icon className="size-4 text-primary" /> {step.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Roteiro honesto — o que ainda NÃO existe, dito de frente. */}
      <section id="roteiro" className="border-b border-border px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-display-lg mb-2 text-foreground">
            O que ainda estamos a construir
          </h2>
          <p className="mb-8 text-muted-foreground">
            Preferimos dizer o que falta a fingir que já está feito.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Processamento de pagamentos real",
              "Domínio próprio por loja",
              "Migração do Shopify, WooCommerce e outros",
              "Contas de utilizador e gestão de equipa",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center justify-between rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground"
              >
                {item}
                <span className="text-xs text-muted-foreground/60">
                  em construção
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA de fecho — a única faixa inteiramente na cor de marca. */}
      <section className="bg-primary px-6 py-20 text-primary-foreground sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-display-lg">
            Escreve uma frase. Vê a tua loja nascer.
          </h2>
          <Button
            render={<a href="#gerar" />}
            nativeButton={false}
            size="lg"
            variant="secondary"
            className="bg-primary-foreground px-8 text-primary hover:bg-primary-foreground/90"
          >
            Experimentar agora
          </Button>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground sm:px-10">
        <span className="font-[family-name:var(--font-heading)] text-foreground">
          Ember
        </span>
        <p>Ainda em acesso antecipado. Nenhuma cobrança é feita nesta fase.</p>
        <Link href="/" className="underline underline-offset-4">
          Início
        </Link>
      </footer>
    </main>
  );
}
