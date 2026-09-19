# Pay-to-run Tools (credits wallet)

**Status:** Built, **unlisted** until `TOOLS_PUBLIC=1`  
**Routes:** `/tools` · `/tools/livability`  
**Not in primary nav:** Home · Start Here · Guides · Contact

A private analysis desk. First tool is **Livability Score**. More tools can share the same wallet later (`building-fit` and `decision-brief` are scaffolded).

## How to flip it live

1. Leave the six primary nav items unchanged.
2. In Vercel (project `agentkammer`), set `TOOLS_PUBLIC=1`.
3. Redeploy `luxury-homepage` (or the merged PR).
4. `/tools` becomes reachable without `?preview=1`. A quiet **Tools** link appears in the footer only — still not in the header.
5. Keep it out of `sitemap.xml` until you want it indexed. `robots.txt` currently disallows `/tools`.

### Preview before go-live

- Open `https://www.agentkammer.com/tools?preview=1`
- The client stores preview in `sessionStorage` and sends `x-tools-preview: 1` on API calls
- Without the flag or preview, the page is a calm “desk is being prepared” screen (not a 404)

## Pricing rule (enforced in code)

| Rule | Detail |
|------|--------|
| Unit | **1 credit = $1 = 1 paid run** |
| First free | The **first Livability Score run is free per wallet** |
| After that | **1 credit** per Livability run |
| Top-ups | **$5 / $10 / $15 / $25** → 5 / 10 / 15 / 25 credits |

Wallet identity:

- Anonymous visitor: `ak_visitor_id` cookie
- Claimed member: existing email + PIN session (`ak_member_token`)
- Claiming later merges visitor credits + the free-used flag onto the member wallet

Do not present this as software signup. Point people at **Resume My Decision** (`/account`) if they want the wallet on another device.

## Persistence

Preferred: Neon / Postgres via `DATABASE_URL` (same pattern as the rest of the repo).

```bash
# Direct (non-pooled) URL for migrations
psql "$DATABASE_URL_UNPOOLED" -f migrations/0001_tools_wallet.sql
# or, once DATABASE_URL is set:
npm run db:push
```

Tables: `tool_wallets`, `tool_credit_ledger`, `tool_runs`, `tool_payments`.

If `DATABASE_URL` is not set (current Vercel note on account routes), the wallet falls back to a signed httpOnly cookie (`ak_tools_wallet`) plus in-memory store for local tests. Stripe webhooks can only credit a **database** wallet; cookie wallets are credited on Checkout return via `POST /api/tools/checkout/confirm`.

## Stripe

Checkout Sessions (not Payment Intents). Webhook + return-URL confirm are both idempotent on `stripe_session_id`.

### Env vars (never commit live secrets)

| Variable | Required to take real money |
|----------|-----------------------------|
| `STRIPE_SECRET_KEY` | Yes |
| `STRIPE_WEBHOOK_SECRET` | Yes (webhook) |
| `STRIPE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional (server-side Checkout redirect) |
| `TOOLS_WALLET_SECRET` | Recommended (cookie HMAC; falls back to `ACCOUNT_SESSION_SECRET`) |
| `SITE_URL` | Success/cancel URLs (default `https://www.agentkammer.com`) |
| `TOOLS_PUBLIC` | Flip the page live |
| `TOOLS_ALLOW_STUB_PAYMENTS` | Force stub top-ups even in production |

Optional Price IDs if you create Dashboard products instead of ad-hoc `price_data`:

- `STRIPE_PRICE_5` · `STRIPE_PRICE_10` · `STRIPE_PRICE_15` · `STRIPE_PRICE_25`

### Dashboard setup (if using Price IDs)

Create four one-time Products / Prices in USD:

| Product name | Amount | Env |
|--------------|--------|-----|
| Agent Kammer Tools — 5 credits | $5 | `STRIPE_PRICE_5` |
| Agent Kammer Tools — 10 credits | $10 | `STRIPE_PRICE_10` |
| Agent Kammer Tools — 15 credits | $15 | `STRIPE_PRICE_15` |
| Agent Kammer Tools — 25 credits | $25 | `STRIPE_PRICE_25` |

Webhook endpoint: `https://www.agentkammer.com/api/tools/webhook`  
Event: `checkout.session.completed`

Without Stripe keys, **local / test mode** credits the wallet immediately (`NODE_ENV !== production`, or `TOOLS_ALLOW_STUB_PAYMENTS=1`). Production without keys refuses real top-ups.

## Livability pipeline

1. Validate: address and/or listing URL and/or images (max 3, JPEG/PNG/WebP, 1.5 MB)
2. Charge: first free, else 1 credit (402 if empty)
3. Heuristic score (always) — deterministic for the same inputs
4. If `XAI_API_KEY` / `OPENAI_API_KEY` / `AI_INTEGRATIONS_OPENAI_API_KEY` exists, enrich with the model
5. Otherwise return a labeled **demo** result

Copy stays diagnostic. No IBCC / inspector / “house doctor” pitching. The read may still be: stay put.

## API

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/tools/status` | Always available; `unlocked` if public or preview |
| GET | `/api/tools/wallet` | Balance, next-run cost, top-up CTAs |
| GET/POST | `/api/tools/runs` | List / create Livability run |
| GET | `/api/tools/runs/:id` | Job + result JSON |
| POST | `/api/tools/checkout` | `{ pack: 5\|10\|15\|25 }` |
| POST | `/api/tools/checkout/confirm` | `{ sessionId }` after Stripe return |
| POST | `/api/tools/webhook` | Stripe signature |

Local Express (`npm run dev`) and Vercel `api/tools/*` share `server/lib/tools`.

## What this is not

- Not a seventh primary nav item
- Not an inspector marketplace
- Not a live Stripe key in the repo
