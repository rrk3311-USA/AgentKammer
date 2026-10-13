# Agent Kammer

Manhattan housing advisory site — Decision OS product surface.

## Brand operating manual (canonical)

**Hand this to AIs, designers, and developers:**

[`docs/brand/AGENT-KAMMER-BRAND.md`](docs/brand/AGENT-KAMMER-BRAND.md)

## Layout

| Path | Purpose |
|------|---------|
| `client/` | Vite + React SPA (public site + admin UI) |
| `server/` | Express APIs (Decision Guide, CRM, signals) |
| `api/` | Vercel serverless shims (contact, leads, decision-*) |
| `shared/` | Drizzle schema + CRM pipeline |
| `content/` | Building-report markdown + knowledge graph |
| `docs/` | Live architecture/product docs (`docs/archive/` = historical) |
| `docs/product/PAY-TO-RUN-TOOLS.md` | Unlisted Tools desk + credits wallet (off primary nav) |
| `docs/brand/` | Canonical brand operating manual |
| `brand/` | Brand asset drop zone (production logos live in `client/public/brand/`) |

## Public references

- https://www.agentkammer.com/llms.txt — positioning, IA, URLs
- https://www.agentkammer.com/sitemap.xml — crawl map

## How we ship

- **Production branch:** `luxury-homepage` (Vercel project: `agentkammer`)
- **Feature work:** branch off `luxury-homepage` → PR into `luxury-homepage` → merge
- Do not push to Replit. Ignore local clones that are out of date unless synced from `luxury-homepage`.
- **Env:** Secrets live on Vercel only (project `agentkammer`). Contact defaults in this repo are `info@agentkammer.com` / `agentkammer.com` — never Success Chemistry.

### Vercel env for Decision Hub persistence

Hub/member schema already exists (`member_profiles` in `shared/schema.ts`). Production `/api/account/*` functions persist there **only when** `DATABASE_URL` is set. Missing env fails open to signed cookies (works, but briefs are capped by cookie size).

Set these on the `agentkammer` Vercel project (Production + Preview):

| Variable | Required for | Notes |
|----------|--------------|--------|
| `DATABASE_URL` | Hub DB persistence | Neon pooled Postgres URL. Then run `npm run db:push` once against that database so `member_profiles` exists. |
| `ACCOUNT_SESSION_SECRET` | Hub sessions | HMAC key for `ak_member_token` / OTP cookies. Generate a long random string. |
| `RESEND_API_KEY` | PIN email | Preferred mailer for Resume My Decision codes. |
| `ACCOUNT_EMAIL_FROM` | PIN email | e.g. `Agent Kammer <info@agentkammer.com>` |
| `SITE_URL` | Absolute links | `https://www.agentkammer.com` |

Optional fallbacks: `EMAIL_USER` / `EMAIL_PASS` if Resend is unset. Do not invent or commit database credentials — Raphi sets Neon + Vercel.

## Repo / deploy firewall

These are two different products. Do not mix GitHub remotes, Vercel projects, env, or contact defaults.

| Product | GitHub | Vercel project | Live contact |
|---------|--------|----------------|--------------|
| **Agent Kammer** (this repo only) | `rrk3311-USA/AgentKammer` | `agentkammer` | `info@agentkammer.com` |
| **Fresh1 / Success Chemistry** (ecom — do not deploy here) | `rrk3311-USA/Fresh1` | `scv2-success-chemistry` | Success Chemistry inbox in *that* repo |

- Fresh1 = Success Chemistry ecom (separate GitHub + separate Vercel project `scv2-success-chemistry`).
- AgentKammer = this repo only → `agentkammer` Vercel.
- Historical Success Chemistry inbox strings in `docs/archive/` are **not** production. Do not copy them into env or deploy this repo into the Fresh1 / SC project.

## Weekly board + Manhattan Minute

Public destination: [`/board`](https://www.agentkammer.com/board) (This week's board). Header label: **The Board**.

A future pipeline overwrites the JSON and redeploys. The page imports the files at build time. Tally counts are computed in `client/src/data/board.ts`, never stored.

| File | Cadence | What to overwrite |
|------|---------|-------------------|
| `client/src/data/board-data.json` | weekly | The three band #1s, movement, calls, brief, and “Did the call hold?” |
| `client/src/data/minute-data.json` | daily | The current Manhattan Minute only. No archive. |

**`board-data.json`**

- `sample.on` / `weekSample` / `listings[].sample[]` / `brief[].sample` / `checks.items[].sample` turn on the SAMPLE DATA bar. Keep `sample.on` true until the week is real.
- `listings[]` (three bands: `$5M to $10M`, `$10M to $15M`, `$15M to $20M`): `band`, `address`, `neighborhood`, `price`, `status` (`HOLD` / `NEW` / `MOVER` / `SOLD / IN CONTRACT` / `WAIT`), optional `bandCall`, `who`, `call` (`PICK` / `CONSIDER` / `WAIT` / `PASS`), `callQualifier`, `callClass`, `moveNote`, `last` (`address`, `price`, `call`, `callQualifier?`, `same`).
- `statusKey[]`, `brief[]`, `checks`, `footer.fine` (must stay `Educational commentary. Not advice. Opinions of Raphael Kammer.`).

**`minute-data.json`**

- Current daily only: `sample`, `date`, `dateISO`, `address`, `neighborhood`, `band`, `price`, `call`, `callQualifier`, `callClass`, `aside`.
- Instagram Story swipe-up lands on `/board`. Do not add past dailies, listing photos, or QR codes.

Copy rules: no em or en dashes, no “real estate advisor”, no guarantees. Schema comments also live in `client/src/data/board.ts`.

## Commands

```bash
npm run dev        # local site (Express + Vite)
npm run build      # client + server production build
vercel deploy --prod   # deploy THIS repo only to the agentkammer project
```

Design tokens (implementation): `client/src/index.css`, `client/src/lib/design-system.ts`, `tailwind.config.ts`.  
Brand rules (human/AI): `docs/brand/AGENT-KAMMER-BRAND.md`.

## Curation IQ (unlisted)

Raphi’s **Property Assessment queue** — Suggested (IQ) → Selected (Raphi). Not in the public nav.

- Desk: `/tools/curation` (alias `/admin/curation`). Same Basic auth as `/admin`.
- **v1 source:** operators capture StreetEasy *Most Popular* per band (Weekly OS style) and **paste sale URLs**. No production StreetEasy / Zillow scrapers. MLS / RESO swaps in later via `MlsFeedAdapter` without redesigning the two layers.
- Universe: Manhattan condos, for sale, research $5–20M; primary publish $5–15M; $15–20M trophy-only. Cap 3–5 live on-sale picks.
- Replacing a suggestion secretly sets `raphi_replaced` (admin only). Suggested history stays.
- Seed: `npm run seed:curation` — SAMPLE placeholders so the desk is demoable before the first real paste.
- Docs: [`docs/admin/CURATION-IQ.md`](docs/admin/CURATION-IQ.md)
