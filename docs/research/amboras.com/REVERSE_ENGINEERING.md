# Amboras — Reverse Engineering Report

Method: passive inspection of publicly served material only — client-side JS bundles
(shipped to every visitor's browser), public marketing/pricing/status pages, and public
company records (Y Combinator, search index). No login was created, no non-public system
was accessed, nothing paywalled or authenticated was touched.

Confidence is graded per finding. "Confirmed" = stated verbatim by Amboras themselves in
something publicly served. "Inferred" = a reasonable deduction from confirmed signals, not
stated outright. "Not knowable" = genuinely outside what any legitimate external
inspection can reveal — this is the hard boundary, not a gap I failed to close.

## Confirmed

**Frontend & hosting**
- Next.js (Turbopack build), deployed on Vercel.
- Tailwind + shadcn/ui token system — same `--primary`/`--background`/etc. CSS variable
  naming this template already uses.

**Backend & infrastructure** — from the `/status` page's own description: *"Live status
of Claude, OpenAI, and AWS."* Their three declared external dependencies, stated by them.
- AWS — confirmed further by a live network call to
  `*.ecs.us-west-2.on.aws` (AWS Elastic Container Service, us-west-2) during a `/status`
  page load — they run backend containers directly on AWS ECS, not just Vercel functions.
- Anthropic Claude AND OpenAI — both, not one or the other.
- Database: Supabase / Postgres references present in shipped JS.
- Object storage/CDN: Cloudflare (R2) references present in shipped JS.
- Product analytics: PostHog (loaded on every page, incl. session recording surveys.js).
- Support chat: Intercom.
- Error monitoring: Sentry.
- Ad/attribution pixels: Meta/Facebook Pixel (Conversions API signals endpoint observed).

**AI model strategy** — the Basic tier's own feature list says: *"Choose your AI model —
Opus 5, Sonnet 4.6, GPT-5 & more."* They deliberately expose model choice to the merchant
rather than locking to one vendor, and gate usage by tier (5x on Grow, 20x on Advanced vs.
Basic) — a usage-quota model, not unlimited-per-seat.

**Payments** — Stripe + PayPal "pre-wired", 150+ payment methods claimed. Money settles to
the merchant's own bank account directly ("not ours") — they are not acting as merchant of
record, consistent with a Stripe Connect–style direct-integration model.

**Product architecture** (from their own `/what-is-amboras` page) — six bundled pieces
sold as one platform instead of separate vendors: AI business assistant (embedded in every
admin page, described as able to "act, not just answer"), storefront, backend
(products/orders/customers/inventory/returns/promotions/shipping), payments, transactional
+ marketing email (sent from the merchant's own domain), domain/DNS/SSL/CDN automation.

**Onboarding flow** — explicitly agentic and parallel, in their own words: type one
sentence, then "watch agents work in parallel — products on one branch, branding on
another, promotions on a third." Concretely: a naming agent, a product-generation agent
(3 products with AI images, 150–200 word descriptions, pricing), a brand agent (colors,
slogan, logo), and a promotions agent (discount codes) — claimed under 2 minutes
end-to-end.

**Migration flow** — imports from Shopify, BigCommerce, WooCommerce, Magento, Squarespace:
products, customers, orders, 301 redirects/SEO. Claimed <48h, free on paid plans.

**Business model / pricing** — subscription SaaS, not a GMV/revenue-share cut:
| Tier | Price | Key gates |
|---|---|---|
| Basic | €43/mo | 1 store, choice of AI model, unlimited AI image enhancement |
| Grow | €91/mo | 5x AI usage vs Basic, up to 5 stores/subscription, up to 5 seats, A/B/n testing |
| Advanced | €347/mo | 20x AI usage, autonomous A/B/n testing, up to 20 stores/seats/domains, white-label storefront |
| Enterprise | custom | sandbox cloning for testing, custom agentic analytics, SOC 2/SCIM, white-label for agencies |

30-day launch guarantee on Basic/Grow/Advanced. Prices shown in EUR, billed in USD.

**Company** (Y Combinator + search index, all public record)
- Founded 2025 by brothers **Imad Mokadem** (Mechanical Engineering, ETH Zurich) and
  **Amin Mokadem** (Computer Science, ETH Zurich).
- Y Combinator **Spring 2026** batch. **$500K raised**, YC as investor — early seed stage,
  not a mature incumbent.
- Founders previously scaled their own DTC brand (educational board games) to
  ~$200K/month on Shopify, then built **EcomCoder** (a Shopify dev tool, 1,000+ users)
  before concluding the whole stack needed rebuilding — hence Amboras.
- Marketing claims 80%+ CVR lift for early merchants (unverified, their own number).

## Inferred (medium confidence, not stated outright)

- The "agents on parallel branches" language plus confirmed AWS ECS usage suggests
  isolated per-task containers or jobs (one process per agent task), not literal git
  branches — a job-orchestration pattern, not a version-control metaphor made real.
- No hit for known job-orchestration vendors (Temporal, Inngest, Trigger.dev) in the
  scanned bundles — the orchestration layer is most likely custom-built, or the vendor
  isn't exposed client-side (plausible either way; this is genuinely uncertain).
- The `/status` backend endpoint hostname pattern doesn't match a known status-page SaaS
  (Statuspage.io, Better Uptime) — likely a lightweight custom or self-hosted status
  service, not a bought product.

## Not knowable from outside — and no technique changes that

- The actual system prompts, agent instructions, or fine-tuning behind "AI Store
  Designer" / "AI Store Editing" / the naming, product, brand, and promo agents.
- Which specific tasks route to Claude vs. GPT-5 vs. other models, and why.
- The orchestration framework's exact implementation, retry/failure handling, or cost
  controls.
- Database schema, exact multi-tenant isolation strategy, or how migrations actually
  execute against source platforms.
- Whether the 80%+ CVR lift claim holds up under independent measurement.

This is the real boundary. Building a competitor doesn't require reproducing any of the
above — the differentiated angle discussed earlier (self-serve, viral/PLG growth loops
aimed at a segment Amboras' sales-led motion ignores) doesn't depend on knowing Amboras'
internals at all. It depends on our own product decisions.

## Sources

- [Y Combinator — Amboras launch](https://www.ycombinator.com/launches/QRm-amboras-your-self-improving-online-store)
- [YC company profile](https://ycombinator.com/companies/amboras)
- Direct inspection of amboras.com (JS bundles, `/status`, `/pricing`, `/what-is-amboras`) — 2026-08-02
