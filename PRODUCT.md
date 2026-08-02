# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Comerciantes em geral que querem lançar ou gerir uma loja online — o mesmo público alargado do Amboras (concorrente directo, ver `docs/research/amboras.com/`), sem pré-requisito de já teres marca ou orçamento estabelecido. Auto-serviço, sem chamada de vendas obrigatória.

## Product Purpose

Uma plataforma de e-commerce nativa em IA: o comerciante escreve uma frase a descrever o que quer vender, e o sistema gera uma loja real — nome, produtos, identidade de marca — pronta a ver num URL próprio. Sucesso = uma loja viva, gerada de ponta a ponta, sem passos manuais de configuração.

## Positioning

Mesma categoria do Amboras (plataforma de e-commerce nativa em IA), mas com identidade visual distinta (ver `DESIGN.md`) e engenharia honesta — nenhuma funcionalidade anunciada que não exista mesmo a correr. **Por decidir:** ainda não temos um mecanismo tecnicamente diferenciador do Amboras além da execução e identidade; isso é uma lacuna real, não inventada aqui. As dez ideias de crescimento viral discutidas antes (selo "feito com", clonagem de loja, afiliados) ficam para uma fase posterior, não bloqueiam esta construção.

## Operating Context

Fluxo web auto-serviço: visitante chega à página inicial, escreve uma frase sobre o negócio, o sistema gera a loja em segundos usando IA real, e mostra a loja viva numa rota própria (`/store/[slug]`).

## Capabilities and Constraints

**Dentro do âmbito desta construção (real, a funcionar):**
- Geração de loja a partir de uma frase — nome da marca, 3 produtos (título, descrição, preço), paleta/slogan — via chamadas reais à API da OpenAI (única chave disponível no ambiente; facturada à conta do Hamilton).
- Persistência real dos dados gerados (ficheiro/SQLite local — sem infra-estrutura de produção esta noite).
- Página da loja gerada, renderizada a sério, seguindo o `DESIGN.md`.
- Página de marketing/landing completa, com o fluxo "gerar loja" ligado ao motor real.

**Explicitamente fora do âmbito desta construção — decisão técnica, não esquecimento:**
- Processamento de pagamentos reais (Stripe/PayPal).
- Alojamento multi-loja em produção, domínios próprios por cliente.
- Migração de outras plataformas (Shopify, BigCommerce, etc.).
- Contas de utilizador / autenticação.
- Base de dados de produção (Supabase/Postgres) — fica para quando houver decisão de infra-estrutura com o Hamilton.

**Restrição transversal:** nunca estatísticas, logótipos de clientes ou testemunhos inventados (herdado do `DESIGN.md`).

## Brand Commitments

Nome do produto ainda não escolhido pelo Hamilton. Uso provisório de **"Ember"** neste build (liga-se ao cobre queimado do `DESIGN.md`, curto, sem conflito óbvio com Amboras) — marcado como decisão minha, não confirmada, a rever.

## Evidence on Hand

Nenhuma. Sem clientes reais, sem testemunhos, sem imprensa. A página não deve fabricar nenhum destes — mensagem "em construção / acesso antecipado", conforme decidido com o Hamilton.

## Product Principles

1. Nunca anunciar capacidade, prova ou escala que não exista mesmo a funcionar.
2. Identidade visual distinta do Amboras (ver `DESIGN.md`) — mesma categoria, aspecto diferente.
3. Toda a funcionalidade "ao vivo" na página tem de estar ligada a código real — nunca uma demo simulada apresentada como real.
4. Auto-serviço primeiro — sem chamada de vendas para começar.
5. Público alargado nesta construção; o ângulo indie/criador discutido antes é refinamento de fase posterior, não bloqueia esta build.
