# Internal portal (Admin OS)

## Surfaces

| Surface | URL | Audience |
|--------|-----|----------|
| Visitor site | `/` and public routes | Prospects — Decision Guide, reports, contact |
| Internal portal | `/admin` | You — pipeline, funnel, strategy scoring |

## Login

- **Local default:** `admin` / `kammer` (when `ADMIN_USER` / `ADMIN_PASS` are unset and not production)
- **Production:** set `ADMIN_USER` and `ADMIN_PASS` in the environment

Auth is HTTP Basic, stored in `sessionStorage` for the browser session. All `/api/admin/*` routes use `requireAdmin` and return 401 without valid credentials. Production refuses to start admin auth until `ADMIN_USER` and `ADMIN_PASS` are set.

## Indexing

- `robots.txt` disallows `/admin` and `/admin/`
- Admin UI sets `noindex, nofollow, noarchive` on mount
- `/admin` is not listed in `sitemap.xml`

## Opening screen

1. **PIPELINE** — New Signals → Engaged → Profiled → Qualified → Call Ready → Active  
2. **TODAY** — high-intent, returning, profile changes, reports, calls, follow-ups  
3. **FUNNEL** — Source → Page → Conversation → Report → Email → Call → Client  
4. **Signals** — strategy-weighted lead scoring (identity / intent / engagement / readiness)

## Backend tables (Postgres / Supabase-ready)

Defined in `shared/schema.ts`:

**Existing CRM truth**

- `leads`
- `contact_submissions`
- `chat_conversations`
- `rbo_buyer_profiles`

**CRM OS additions**

- `visitor_profiles`
- `lead_signal_events`
- `pipeline_opportunities`

Identity ladder (do not collapse):

```txt
visitor → contact → lead → opportunity → client
```

Dashboard aggregation: `server/lib/admin-intelligence.ts`  
Pipeline/scoring rules: `shared/crm-pipeline.ts`  
Live visitor beacon: `POST /api/signals` + `client/src/lib/visitor-signals.ts`

## APIs

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/admin/session` | Basic |
| GET | `/api/admin/dashboard` | Basic |
| GET | `/api/admin/pipeline` | Basic |
| GET | `/api/admin/rbo-profiles` | Basic |
| POST | `/api/signals` | Public |

## Stack notes

- **Now:** Drizzle + Neon/MemStorage (same Postgres shape as Supabase)
- **Next:** point `DATABASE_URL` at Supabase Postgres; `npm run db:push`
- **PostHog:** behavioral funnels/session replay — not CRM storage. Finish PostHog wizard when Node ≥ 22.22 if required by the wizard package.

## PostHog (optional)

After the wizard adds keys, keep PostHog for traffic/session telemetry. Lead truth and strategy scores stay in Postgres.
