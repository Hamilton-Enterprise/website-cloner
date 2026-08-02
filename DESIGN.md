# DESIGN.md — website-cloner (concorrente ao Amboras)

## Direcção

Uma loja-plataforma editorial e quente na escuridão — não a sala de reuniões azul-e-laranja do Amboras, não o café-com-leite genérico de "startup de IA". O site vive num canvas quase-preto, aquecido por um único tom de cobre queimado, com títulos serifados de carácter a fazer o trabalho que normalmente é deixado para maquetes de portátil e estatísticas inventadas.

## Tipografia

| Token | Família | Tamanho | Peso | Altura de linha | Tracking | Uso |
|---|---|---|---|---|---|---|
| `display-xl` | Fraunces (variável) | 80px | 380 | 1.02 | -1px | H1 da hero |
| `display-lg` | Fraunces | 56px | 400 | 1.08 | -0.5px | Abertura de secção |
| `display-md` | Fraunces | 36px | 450 | 1.15 | -0.2px | Título de cartão de funcionalidade, preço do plano |
| `title` | Inter | 20px | 600 | 1.3 | 0 | Títulos de cartão |
| `body-lg` | Inter | 18px | 400 | 1.6 | 0 | Texto de abertura, subtítulos |
| `body` | Inter | 16px | 400 | 1.55 | 0 | Corpo de texto por defeito |
| `caption` | Inter | 13px | 500 | 1.4 | 0.3px | Legendas, etiquetas |
| `mono` | JetBrains Mono | 14px | 400 | 1.5 | 0 | Screenshots de produto, preços técnicos |

Regra: display sempre em Fraunces, nunca em peso acima de 450 — a serifa fica pomposa e deixa de parecer editorial para parecer um convite de casamento (aprendido do `claude` DESIGN.md: "bold serif reads as bombastic"). Corpo e UI sempre em Inter — nunca subir Inter a tamanho de display, nunca descer Fraunces a corpo de texto.

Se Fraunces não estiver disponível, usar Fraunces via `next/font/google` directamente (é grátis e está no Google Fonts, sem substituto necessário).

## Cor

Canvas quase-preto por defeito (marketing/hero), não branco. Um único acento — cobre queimado — carrega toda a "voltagem" de marca. Sem segunda cor cromática.

| Token shadcn | Valor (oklch aprox.) | Uso |
|---|---|---|
| `--background` | `oklch(0.15 0.01 60)` — ~#0c0b09, tinta quase-preta quente | Canvas por defeito |
| `--foreground` | `oklch(0.96 0.01 70)` — ~#f6f3ee, branco quente | Texto principal sobre o canvas |
| `--card` | `oklch(0.19 0.012 60)` — ~#161411 | Cartões, um passo acima do canvas |
| `--card-foreground` | igual a `--foreground` | |
| `--primary` | `oklch(0.62 0.14 45)` — cobre queimado, ~#c4794a | CTA principal, marca, moldura de foco |
| `--primary-foreground` | `oklch(0.98 0.005 70)` — quase branco | Texto sobre o cobre |
| `--secondary` | `oklch(0.24 0.012 60)` — ~#241f1a | Superfície secundária, nunca uma segunda cor cromática |
| `--muted` | `oklch(0.22 0.01 60)` | Fundos discretos |
| `--muted-foreground` | `oklch(0.65 0.01 60)` | Texto secundário |
| `--border` | `oklch(0.28 0.012 60)` | Linha capilar 1px |
| `--accent` | igual a `--card` | Estado hover de itens de lista |
| `--destructive` | `oklch(0.55 0.18 25)` | Erros |

Regra de uso: o cobre (`--primary`) é escasso — CTA principal, marca, anel de foco. Nunca pintar uma secção inteira de cobre (excepto uma faixa CTA de fecho, no máximo uma por página). Nunca introduzir uma segunda cor cromática (nada de verde, roxo ou um segundo azul) — aprendido do Linear e do Airbnb, ambos disciplinados a um único acento.

Deliberadamente **não** usamos azul-petróleo nem laranja — são as cores do Amboras (confirmado em `docs/research/amboras.com/RECONNAISSANCE.md`: `--primary: 195 100% 23%`, secundário laranja). Usar essas cores tornaria os dois sites confundíveis.

## Grelha e espaçamento

- Base: 4px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 96px (secção).
- Largura máxima de conteúdo: 1200px centrado.
- Ritmo de secção: 96px de padding vertical — cadência editorial, não densidade de dashboard.
- Cartões: `rounded-lg` (12px), borda capilar 1px em `--border`, sem sombra — profundidade vem do contraste de superfície (canvas → card → card elevado), não de `box-shadow`. Aprendido do Linear: "shadows são raras, a escada de superfícies é que carrega hierarquia."
- Botões: `rounded-md` (8px) por defeito; um botão pill (`rounded-full`) reservado só para o CTA principal da hero, como assinatura pontual — não o sistema inteiro em pílula (isso seria copiar o Shopify literalmente).

## Imagem

- **Nunca** maquete de portátil ou telemóvel como imagem principal — é o anti-padrão mais citado na biblioteca de referências (`04-generic-template-avoid`, `05-generic-device-render-avoid`): parece agência de 500€, não plataforma a sério.
- **Nunca** logótipos de clientes, número de utilizadores ou estatísticas de crescimento inventados. Enquanto não houver clientes reais, não mostrar prova social — mostrar produto real ou nada. (`08-generic-growth-site-avoid`, `18-abstract-volume-avoid`, e a regra do próprio Hamilton contra inventar clientes/resultados.)
- Quando existir UI real do produto, mostrá-la directamente — screenshot verdadeiro dentro de um `card` com moldura fina, sem overlay de venda por cima. Aprendido do Linear e do Claude: o produto é o protagonista, não uma ilustração de marketing do produto.
- Antes de haver produto para mostrar, a hero carrega-se de tipografia + um único fundo generativo (React Bits, ver Componentes) — nunca uma foto de stock de "gente de negócios a apertar a mão".

## Movimento

- Revelação ao scroll: fade + subida de 12px, uma vez, sem repetir ao voltar a passar — discreto, nunca a carrossel automático a tocar sozinho (o próprio Amboras abusa disto; ver `RECONNAISSANCE.md`, secções 4 e 7).
- Hover: só mudança de cor/borda, sem escala nem "bounce". Duração 150–200ms, `ease-out`.
- Um único momento de assinatura, tal como construído: o fundo `Aurora` (React Bits, recolorido a cobre em `src/components/react-bits/Aurora.tsx`) anima de forma contínua e lenta atrás da hero — é o único elemento com movimento perpétuo na página.
- O H1 da hero é texto estático, sem animação de entrada. A intenção original previa uma animação de texto discreta (`Blur Text`) no H1; foi removida deste build porque `BlurText` fica preso num `IntersectionObserver` (props `threshold`/`rootMargin`) que não dispara a tempo do primeiro paint acima da dobra, produzindo H1 invisível — bug real, corrigido pelo revisor `impeccable-finish-reviewer`. `BlurText` continua instalado em `src/components/react-bits/BlurText.tsx` para uso futuro nalgum elemento que não seja crítico above-the-fold, onde esperar pelo IntersectionObserver não é um problema — não usar em H1 de hero nem noutro elemento de primeiro paint.
- Nunca mais do que uma secção com carrossel automático por página.

## Componentes

Só os que a landing page usa (`src/app/page.tsx`, `src/components/hero-generate-form.tsx`, `src/components/store-gallery-card.tsx`):

- **Escala de display real** (`src/app/globals.css`, `@layer components`), Fraunces (`var(--font-heading)`) em todos os três — fluida por `clamp()`, resolve ao valor de desktop da tabela em Tipografia:
  - `.text-display-xl` — peso 380, `line-height` 1.02, `letter-spacing` -1px, `font-size: clamp(2.75rem, 5vw + 1.5rem, 5rem)` (resolve a 80px em desktop). H1 da hero.
  - `.text-display-lg` — peso 400, `line-height` 1.08, `letter-spacing` -0.5px, `font-size: clamp(2rem, 3vw + 1.25rem, 3.5rem)` (resolve a 56px). Abertura de secção.
  - `.text-display-md` — peso 450, `line-height` 1.15, `letter-spacing` -0.2px, `font-size: clamp(1.5rem, 1.5vw + 1.25rem, 2.25rem)` (resolve a 36px). Título de cartão, preço.
- **nav** — fixa, fundo `--background/80` com `backdrop-blur`, wordmark + 2 links + CTA. CTA da nav usa o `Button` por defeito (`rounded-lg`, não pill) — confirmado no código (`src/app/page.tsx`), consistente com a regra "pílula só no CTA principal da hero".
- **hero** — H1 `.text-display-xl` em Fraunces, estático (ver Movimento), subtítulo `body-lg`, fundo `Aurora` (React Bits, cores `["#c4794a", "#8a5a3a", "#241f1a"]`, opacidade 40% sobre o canvas). CTA do formulário (`hero-generate-form.tsx`) é o único botão `rounded-full` (pílula) de toda a página — verificado pelo revisor `impeccable-finish-reviewer`, disposition "ship".
- **hero-generate-form** — campo de texto + botão pill dentro de um `card` translúcido (`bg-card/80`, `backdrop-blur-sm`, `rounded-lg`, borda `--border`). Único ponto de entrada do fluxo de geração.
- **store-gallery-card** — grelha 3-up desktop / 1-up mobile de lojas reais geradas, sem números nem logótipos inventados.
- **como-funciona (passo numerado)** — círculo `rounded-full` numerado + ícone + `title` + `body`, sem cartão-com-sombra.
- **roteiro (lista honesta)** — item com borda tracejada (`border-dashed`) e etiqueta "em construção", nunca escondido.
- **cta-band** — uma só, perto do fecho, fundo `--primary` sólido, texto `--primary-foreground`, botão de fecho em `rounded-lg` (não pill) — reforça que a pílula é assinatura exclusiva do CTA da hero.
- **footer** — `--background`, wordmark + texto + link, `muted-foreground`.

## Proibido

- Maquetes de dispositivo (portátil, telemóvel) como visual principal. — `04-generic-template-avoid`, `05-generic-device-render-avoid`
- Números, logótipos de clientes/parceiros, ou testemunhos inventados. — `08-generic-growth-site-avoid`, `18-abstract-volume-avoid`, regra do Hamilton
- Blobs ou gradientes abstractos decorativos sem função. — `07-layered-media-flow-avoid`, `18-abstract-volume-avoid`
- Cartões de funcionalidade com ícone-em-pílula a apontar para o ecrã com linha tracejada. — `04-generic-template-avoid`
- Azul-petróleo ou laranja como cor de marca — são as cores do Amboras. — decisão do Hamilton
- Peso 700+ em Fraunces a tamanho de display. — aprendido do `claude` DESIGN.md
- Segunda cor cromática de acento (verde, roxo, um segundo azul). — aprendido do `linear.app` e `airbnb` DESIGN.md
- Mais de um carrossel a tocar sozinho por página. — contraste deliberado com o Amboras

## Proveniência

**Fonte A (awesome-design-md), lidos 2026-08-02:**
- `claude` — voz serifada e editorial para produto de IA que quer parecer calmo, não futurista-genérico; disciplina de "cor escassa"; regra de nunca usar peso 700+ em display serifado.
- `linear.app` — canvas quase-preto como base de marca (não um efeito pontual), escada de superfícies em vez de sombra, disciplina de acento único, produto real como protagonista.
- `shopify` — vocabulário directo da categoria (comércio electrónico), usado só para saber o que evitar copiar (canvas duplo cinemático/claro, tipografia fininha 330, tudo em pílula) — não adoptado ao pormenor, para não colidir com a identidade do Amboras nem parecer clonagem do Shopify.
- `airbnb` — confirmação cruzada da disciplina de acento único e tipografia de peso modesto; a foto humana honesta como alternativa a maquetes de dispositivo.

**Fonte B (`WORKSPACE/REFERENCIAS-VISUAIS/`):** biblioteca redigida para a Elo Blue — usei os princípios gerais (tipografia editorial de grande escala, fundos nocturnos com composição de produto, retrato humano honesto, e sobretudo a lista de anti-referências) e **não** o motivo específico "elo" (`12-sculptural-elo-principle`), que é um activo de marca da Elo Blue, não transferível. Imagens vistas directamente: `01`, `02`, `03`, `06` (aprovadas) e `04`, `05`, `08`, `18` (a evitar) — as quatro "a evitar" foram as mais decisivas: definem com muita clareza o género "site de agência genérico" que este projecto tem de escapar activamente, porque a categoria (plataforma SaaS de e-commerce) é exactamente onde esse cliché mais aparece.

**Ferramenta de implementação (não é decisão de fonte A/B, é recurso técnico):** React Bits (reactbits.dev) disponibiliza os fundos generativos e animações de texto recomendados acima, instalável via MCP do shadcn já compatível com este scaffold Next.js. **Actualização pós-build (2026-08-02, verificado no código, não na intenção original):** de dois componentes React Bits previstos (fundo shader + animação de texto no H1), só o fundo (`Aurora`) sobreviveu ao build. `BlurText` foi instalado e depois retirado do H1 por causar um bug real de visibilidade (H1 preso à espera de um `IntersectionObserver` que não disparava a tempo do primeiro paint) — ver Movimento. Fica registado como recurso técnico disponível, não como componente do sistema activo nesta página.

---

Ficou decidido: canvas escuro quente + cobre único + Fraunces/Inter como assinatura tipográfica, com uma lista de vetos muito concreta contra o cliché de "site de agência". As fontes A e B concordaram sem tensão real — a única divergência foi decidir não seguir o Shopify ao pormenor (a fonte A oferecia-o como vocabulário de categoria, mas segui-lo custaria a distinção que o Hamilton pediu). Por decidir, à espera do Hamilton: se a app do produto (dashboard do lojista, não a marketing) deve herdar este canvas escuro ou passar a claro para densidade de trabalho — isso não estava no âmbito desta peça.

Actualização pós-revisão final (impeccable-finish-reviewer, disposition "ship"): H1 visível desde o primeiro paint, escala de display resolvida a valores reais em `globals.css`, uso de pílula confinado ao CTA principal da hero (confirmado em nav, hero-generate-form e cta-band), badge flutuante removido. A secção Movimento e a lista de Componentes acima foram reescritas a partir do código tal como ficou, não da intenção original — a divergência (Blur Text previsto, texto estático entregue) fica registada como facto do build, não apagada.
