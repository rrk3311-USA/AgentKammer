# Curation IQ — Suggested → Selected

**Status:** Live (v1 operator paste)  
**Surface:** unlisted `/tools/curation` (alias `/admin/curation`)  
**Not in:** public header, sitemap, or the Advisory sidebar

Raphi’s **Property Assessment queue**. Twice-monthly Suggested shortlist (1st & 15th). He edits freely. A secret admin mark is set when he replaces a suggestion.

## Layers (never collapse)

1. **Suggested (IQ)** — system / reference only. Operator paste or, later, MLS.
2. **Selected (Raphi)** — what gets a Report and what can go on sale on the site.

If Raphi swaps a suggestion, that Selected slot is marked `raphi_replaced` and keeps `replaced_suggestion_id`. **The public never sees that mark.** Suggested rows stay for learning.

## v1 data source (no MLS yet)

Interim until the brokerage MLS / RESO feed:

- Seed + admin paste of **StreetEasy (or listing) URLs** into Suggested
- Optional fields: address, ask price, band (`$5–10` / `$10–15` / `$15–20`), persona, notes, `source_url`, `captured_at`
- Operators capture StreetEasy **Most Popular** per band (Weekly OS style) and paste
- **Do not** build production StreetEasy / Zillow scrapers

`MlsFeedAdapter` is a stub (`server/lib/curation/mls-adapter.ts`). Swap Suggested ingest later without redesigning Suggested → Selected.

## Constraints

- Manhattan condos · for sale
- Research ~$5–20M; primary publish $5–15M; $15–20M trophy-only
- Cap **3–5** Selected live “on sale” picks for any public drop (hard cap 5)
- Sale-only (rentals rejected)

## Sell / unsell

`on_sale` toggle on Selected. **Off** removes the listing from the live drop. It does **not** delete pins or history.

Status chip (independent of the toggle): `on_sale` | `reserved_pinned` | `pending` | `escrow` | `price_drop` | `sold`

## Buyer-facing

`GET /api/curation/picks` returns Selected-on-sale only (no `raphi_replaced`). Hub Home may show a light **Picks** area. Pins / StreetEasy favorites stay on Hub Saved.

## Schema

Drizzle: `shared/schema-curation.ts`  
SQL: `migrations/0001_curation_iq.sql`  
Push: `npm run db:push` when `DATABASE_URL` is set

| Table | Role |
|-------|------|
| `curation_batches` | 1st / 15th period |
| `curation_suggestions` | Suggested layer + history |
| `curation_selections` | Selected queue, sale flag, secret replace mark |

Without `DATABASE_URL`, the desk uses in-memory storage for the process lifetime (same pattern as other MemStorage paths). A SAMPLE batch is seeded so the UI is demoable.

## Seed

```bash
npm run seed:curation
# or POST /api/admin/curation/seed
```

Sample rows are labeled **SAMPLE** and use well-known public building names as stand-ins.

## Auth / indexing

Same HTTP Basic as `/admin`. `robots.txt` disallows `/tools`. `X-Robots-Tag: noindex` on `/tools` and `/admin`.
