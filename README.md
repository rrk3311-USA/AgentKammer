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
- **Env:** `DATABASE_URL`, `SITE_URL`, and other secrets live on Vercel only. Contact defaults in this repo are `info@agentkammer.com` / `agentkammer.com` — never Success Chemistry.

## Repo / deploy firewall

These are two different products. Do not mix GitHub remotes, Vercel projects, env, or contact defaults.

| Product | GitHub | Vercel project | Live contact |
|---------|--------|----------------|--------------|
| **Agent Kammer** (this repo only) | `rrk3311-USA/AgentKammer` | `agentkammer` | `info@agentkammer.com` |
| **Fresh1 / Success Chemistry** (ecom — do not deploy here) | `rrk3311-USA/Fresh1` | `scv2-success-chemistry` | Success Chemistry inbox in *that* repo |

- Fresh1 = Success Chemistry ecom (separate GitHub + separate Vercel project `scv2-success-chemistry`).
- AgentKammer = this repo only → `agentkammer` Vercel.
- Historical Success Chemistry inbox strings in `docs/archive/` are **not** production. Do not copy them into env or deploy this repo into the Fresh1 / SC project.

## Commands

```bash
npm run dev        # local site (Express + Vite)
npm run build      # client + server production build
vercel deploy --prod   # deploy THIS repo only to the agentkammer project
```

Design tokens (implementation): `client/src/index.css`, `client/src/lib/design-system.ts`, `tailwind.config.ts`.  
Brand rules (human/AI): `docs/brand/AGENT-KAMMER-BRAND.md`.

## Curation IQ (unlisted)

Raphi’s **Kammer Report / Property Assessment queue** — Suggested (IQ) → Selected (Raphi). Not in the public nav.

- Desk: `/tools/curation` (alias `/admin/curation`). Same Basic auth as `/admin`.
- **v1 source:** operators capture StreetEasy *Most Popular* per band (Weekly OS style) and **paste sale URLs**. No production StreetEasy / Zillow scrapers. MLS / RESO swaps in later via `MlsFeedAdapter` without redesigning the two layers.
- Universe: Manhattan condos, for sale, research $5–20M; primary publish $5–15M; $15–20M trophy-only. Cap 3–5 live on-sale picks.
- Replacing a suggestion secretly sets `raphi_replaced` (admin only). Suggested history stays.
- Seed: `npm run seed:curation` — SAMPLE placeholders so the desk is demoable before the first real paste.
- Docs: [`docs/admin/CURATION-IQ.md`](docs/admin/CURATION-IQ.md)
