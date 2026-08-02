# Amboras.com — Reconnaissance (Phase 1)

Feasibility pass only — confirms the site is fully extractable and maps its structure.
Not yet a full pixel-perfect extraction (no per-component computed-style dump, no
click/hover sweep per element). Run `/clone-website https://www.amboras.com/` for that.

## Tech stack

- Next.js (App Router, Turbopack build chunks under `_next/static/chunks/`), deployed on Vercel.
- No `__NEXT_DATA__` / no client React hydration markers detected on initial inspection —
  page reads as heavily static/prerendered marketing content, not an app shell.
- Styling: Tailwind + shadcn/ui token system — confirmed via `:root` CSS custom properties
  (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`,
  `--destructive`, `--border`, `--input`, `--ring`, plus custom `--primary-action*` and
  `--radius-badge` tokens). 91 CSS variables total.
- No `/api/*` network calls observed on page load — this is a static marketing page, not
  an app requiring backend reverse-engineering.

## Design tokens (partial — from `:root`, HSL triplets)

| Token | Value (H S L) |
|---|---|
| background | 0 0% 100% |
| foreground | 0 0% 9% |
| primary | 195 100% 23% (deep teal) |
| secondary | 31 99% 71% (warm orange) |
| muted | 0 0% 96% |
| destructive | 0 63% 31% |
| border / input | 0 0% 90% |
| ring | 31 72% 55% |

Maps 1:1 onto this template's existing shadcn token names in `globals.css` — no custom
mapping needed, just value substitution.

## Page topology (top to bottom)

1. **Header** — fixed, white bg, logo + nav (Product / Solutions / Resources dropdowns,
   Examples, Pricing) + Log in / Get started. Has a `nav-diagonal-reveal` keyframe
   animation (mask-position sweep) — likely a hover/dropdown reveal effect.
2. **Hero** — dark background, H1 "World's first AI-native ecommerce platform", CTA pair
   (Try for Free / Book a call), subtext. Below it: a horizontally auto-scrolling logo/
   store-example strip (Harvest & Root, Howl & Honey, art prints, etc.) — **time-driven**,
   moved on its own between two scrolls with no user input.
3. **Stats bar** — "20,000+ Stores made", "YC, A* Backed by Y Combinator", "250+ Shop apps
   replaced".
4. **"Easier than ever. Your website on Amboras."** — dark section, sticky/pinned scroll
   area containing a self-playing showcase carousel (pause button + progress dots visible)
   cycling through claims ("Spin up variants and A/B test", "Launch on your domain",
   "Track first-party analytics live") paired with blurred/sharp product screenshots.
   **Time-driven with manual pause control** — not scroll-driven within the section.
5. **"Everything you need on one platform"** — horizontal card carousel, 6 feature cards
   (AI Store Editing, AI Shop System, Generative A/B Testing, AI Image Enhancing,
   One-Click Checkout, First-Party Analytics), each numbered "0N/06", with prev/next
   arrow controls and dot pagination. **Click/arrow-driven.**
6. **"Grow your e-commerce"** — pill tab switcher (Bundles / Upsells / Design /
   Subscription), **click-driven**, each tab swaps a large demo screenshot below (verified:
   Design tab shows a lamp product page; scrolling further showed different pinned panels
   per implied tab — Lumiere candle store examples with before/after AOV stat card overlay).
7. **Second showcase carousel** (Lumiere brand) — same pinned/self-playing pattern as
   section 4, cycling through storefront examples (product page, bundle builder, "Light
   every moment" hero) with an AOV lift stat card overlay ($16 → $49). Confirmed
   **click/arrow-driven internal navigation** (dots + prev/next arrows) — direct
   `scrollTo()` jumps landed on the same frame, i.e. it does not advance on page scroll.
8. **"Generative A/B Testing"** section — label appears immediately but content area was
   still blank/black when jumped to directly via `scrollTo()`. This is a
   **scroll-triggered reveal** (IntersectionObserver or similar) that only paints when
   scrolled into view incrementally — confirms Guiding Principle #5 from the skill
   (extract behavior, not just static CSS) applies here.
9. **Footer** — dark, 5-column link grid (Product, Solutions, Resources, Support, Company)
   + Follow column (Instagram, LinkedIn, X, Y Combinator), tagline "E-commerce, version
   two.", copyright, Terms/Privacy/Privacy Choices.

## Confirmed interaction models requiring special handling

- Auto-scrolling logo/example strip (hero) — time-driven, likely CSS `animation` with
  `translateX` loop, not JS.
- Two pinned/sticky showcase sections with self-playing internal carousels, pause button,
  and dot+arrow navigation — time-driven by default, click-interruptible. NOT scroll-driven
  internally (page scroll does not advance them).
- Numbered feature card carousel with prev/next arrows and pagination dots — click-driven.
- Pill tab switcher (Bundles/Upsells/Design/Subscription) — click-driven, swaps a large
  visual panel.
- At least one section ("Generative A/B Testing") uses scroll-triggered content reveal —
  needs IntersectionObserver, not just a static scroll position.
- Header has a diagonal-reveal keyframe animation, likely tied to nav dropdown hover.

## Verdict

Extraction is fully feasible: same stack (Next.js + Tailwind + shadcn tokens) as this
template, static marketing page (no backend to reverse-engineer), clear 9-section
topology, and every interactive pattern present is a known, documented case in the
`/clone-website` skill's Guiding Principles (auto-play carousels, pinned/sticky sections,
scroll-triggered reveals, click-driven tabs). Nothing found here is out of scope.

## Not done in this pass (deferred to a real `/clone-website` run)

- Full-page desktop/mobile screenshots saved to disk
- Per-component `getComputedStyle()` extraction
- Complete hover-state sweep
- Asset inventory (images/videos/SVGs) and download script
- Pricing, Examples, and other sub-pages (only the homepage was inspected)
