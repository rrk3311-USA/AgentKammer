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
| `docs/brand/` | Canonical brand operating manual |
| `brand/` | Brand asset drop zone (production logos live in `client/public/brand/`) |

## Public references

- https://www.agentkammer.com/llms.txt — positioning, IA, URLs
- https://www.agentkammer.com/sitemap.xml — crawl map

## Commands

```bash
npm run dev        # local site (Express + Vite)
npm run build      # client + server production build
vercel deploy --prod   # deploy THIS repo only to the agentkammer project
```

Do not deploy Fresh1 / Success Chemistry into the `agentkammer` Vercel project.

Design tokens (implementation): `client/src/index.css`, `client/src/lib/design-system.ts`, `tailwind.config.ts`.  
Brand rules (human/AI): `docs/brand/AGENT-KAMMER-BRAND.md`.
