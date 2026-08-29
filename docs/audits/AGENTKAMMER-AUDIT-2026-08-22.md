# Agent Kammer site audit — 22 Aug 2026

**Audience:** Raphi (operator)  
**Scope:** Investigation only. No product rewrite. One markdown file.  
**Surfaces compared:**

| Surface | Ref | What it actually is |
|---|---|---|
| GitHub default `main` | `b256e56` (6 Jun 2026) | Stale Replit-era app: Manhattan luxury copy on top of a 2025 financial-comparison / affiliate template |
| Working branch `luxury-homepage` | `486877e` (7 Aug 2026) | Decision OS source that matches the live site |
| Live | [www.agentkammer.com](https://www.agentkammer.com/) on Vercel | “Buildings Before Listings” / Guidance Advisor / Situations / Hub / `/admin` |
| Notion | Command Center, CRM Command Center, Brand Systems, Decision Blueprint | Accepted architecture: website DB = capture SoT; Notion = human CRM; `/admin` stays light |

**How this was done:** repo map of `main` + `luxury-homepage`; live HTML/JS bundle (`/assets/index-CRG9-qdz.js`) and route/API probes; Notion product docs. Granola was not available (MCP unauthenticated).

**No code was changed.** No “tiny P0” hotfix was clearly safe in 1–5 lines without a deploy-source decision first.

---

## 1. Executive summary — top 10

Ranked by “what breaks the business or wastes the next sprint,” not by how interesting the code is.

| # | Pri | Issue | Why it matters | Act |
|---|---|---|---|---|
| 1 | **P0** | **`main` is not the product.** Default GitHub branch is 2.5 months behind live. Notion docs (`docs/integrations/notion-crm.md`, `docs/admin/ADMIN-COMMAND-CENTER.md`, `docs/architecture/SYSTEM-DESIGN.md`) exist only on `luxury-homepage`. | Any agent, Vercel “production branch = main”, or clone of `main` ships the wrong site. | Make `luxury-homepage` the default (or merge it to `main`). Point Vercel at that branch. Treat `main` as archive until then. |
| 2 | **P0** | **Vercel does not run Express. Most “Decision OS” APIs are Express-only.** Live `vercel.json` builds static `dist/public` + `api/*` serverless. Serverless exists for leads / Decision Guide / account / contact / international. **There is no `api/admin/*` and no `api/signals.ts`.** Live `GET /api/admin/session` and `GET /api/admin/dashboard` return the SPA HTML (`200`). `POST /api/signals` is not a real capture endpoint on Vercel. | `/admin` UI is a shell that cannot load clients. Visitor analytics / identity ladder does not persist. Website-DB-as-SoT is not true in production. | Either add thin `api/admin/*` + `api/signals.ts` wrappers, or stop linking `/admin` until Express is actually hosted. Do not rebuild the portal. |
| 3 | **P0** | **Unauthenticated `GET /api/leads` on Express** dumps every lead (name, email, phone, chat summary). Still present on `luxury-homepage` `server/routes.ts`. Live Vercel `api/leads.ts` correctly returns `405` on GET — so production is OK *only because Express is not deployed*. | One accidental Express/Replit deploy (or a future “run the Node server on Vercel”) leaks PII. | Delete or `requireAdmin` the GET. Do this before any Express hosting. |
| 4 | **P0** | **Admin auth is weak and stored in the browser.** Live `/admin` uses HTTP Basic (`ADMIN_USER` / `ADMIN_PASS`), default username field `admin`, credential blob in `sessionStorage` key `ak_admin_basic`. Express fallback in non-prod is `admin` / `kammer` (`server/routes.ts`). Notion Command Center already forbids short numeric PINs and a heavy portal. | If admin APIs ever go live, Basic + sessionStorage is trivial to replay. Default `kammer` is guessable. | Keep `/admin` dark until APIs exist. Then long passphrase in env, never a PIN, never `localStorage`/`sessionStorage` for the secret. Google SSO later — do not build it now. |
| 5 | **P1** | **Notion sync is a stub. Attio is the CRM being built.** `server/lib/notion-crm.ts` logs `sync stub (not yet implemented)`. Admin copy and `docs/integrations/attio.md` treat Attio as the operational system. Notion still says website → Notion one-way, Notion = human admin. | Two CRMs, zero durable website→Notion writes. Operator will keep copy-pasting. | Pick one human admin: **Notion (accepted)** or Attio (what the code is doing). Implement one-way sync to that one. Freeze the other. |
| 6 | **P1** | **Dual server: Express monolith still contains the 2025 “financial concierge” chatbot.** `LUXURY_CONCIERGE_PROMPT` (Jordan Belfort / 16 credit-card categories) is still the `/api/chat` system prompt on `luxury-homepage` `server/routes.ts`. Live chat is `/api/decision-guide/chat` (Guidance Advisor). | If anything still posts to `/api/chat` (old widgets, Replit), visitors get the wrong product. Dead code will get “fixed” by the next agent. | Leave Vercel Decision Guide alone. Delete or hard-disable Express `/api/chat` + the concierge prompt in the next cleanup PR. |
| 7 | **P1** | **Schema + storage drift.** `shared/schema.ts` still has `affiliates`, `travel_deals`, `rbo_buyer_profiles`, `content_items`, plus newer `visitor_profiles`, `client_profiles`, `chat_sessions`, `attio_sync_*`. `storage.ts` falls back to `MemStorage` when `DATABASE_URL` is missing. On `main`, storage is **hardcoded** `MemStorage` even if a DB exists. | Capture “SoT” dies on restart without Neon. Old tables invite building more affiliate/travel features. | Confirm `DATABASE_URL` on Vercel. Stop adding tables until unused ones are marked do-not-use. Never ship `main`’s hardcoded MemStorage. |
| 8 | **P1** | **Decision Progress 0/6 is real but leaky; Hub is a second, unfinished flow.** Guidance Advisor modules: Lifestyle · Location · Building · Financial · Timeline · Trade-offs. Completion is inferred from chat `answers`, not a persisted Decision Blueprint. Location/Building both flip on `answers.desire`; Timeline flips on any `constraints`. Hub `/hub` is empty until email claim; `/belonging` is the assessment door; `/account` is PIN claim. Admin roadmap uses a *different* 6–8 milestone list. | Users see 0/6, then 2–3 boxes fill from one sentence. Hub and Advisor do not share a Person record. | Persist the 6 flags on the visitor/lead. One next step: Advisor → claim email → Hub. Do not add Hub modules. |
| 9 | **P2** | **`/admin` is already a 10-item product** (Overview, Pipeline, Clients, Conversations, Reviews, Tasks, Reports, Calendar, Team, Settings). Seven of those are empty-state stubs (`AdminSection.tsx`). Notion: do **not** invest in a heavy admin portal. | Next sprint will get pulled into Calendar/Team/SSO. | Hide stub nav items. Keep Overview + Clients as diagnostics. Run the pipeline in Notion. |
| 10 | **P2** | **SEO / leftover-URL mess.** Live `200`s the SPA for dead `main` paths (`/affiliates`, `/luxury-travel`, `/dashboard`, `/art-gallery`, `/coaching`, `/e-shop`, `/refinancing`, `/free-tools`). Viewport `maximum-scale=1` blocks iOS pinch-zoom (a11y). `impact-site-verification` / `fo-verify` affiliate metas still in live `<head>`. Package name on `main` is still `rest-express`. | Soft-404s, affiliate-network residue, mobile frustration. | Add Vercel 404/410 for known-dead paths. Drop affiliate metas. Remove `maximum-scale=1`. |

---

## 2. Architecture map (as-is)

### 2.1 What is supposed to be true (Notion, accepted)

```
Visitor ──► Website DB (identity, chat memory, analytics)     = source of truth
                │
                │  one-way sync (planned)
                ▼
            Notion CRM  (People, Leads, Conversations, Tasks, Buildings, Decision Briefs)
                = human admin

/admin = light / dev only. Do not build a portal.
```

### 2.2 What is actually true (live + `luxury-homepage`)

```
                    ┌─ Vercel (LIVE) ─────────────────────────────────────┐
Browser ──────────► │  Vite SPA  (Decision OS UI)                          │
                    │  Serverless api/:                                    │
                    │    POST /api/leads                                   │
                    │    POST /api/decision-guide/chat                     │
                    │    /api/decision-assistant/conversation              │
                    │    POST /api/contact                                 │
                    │    /api/account/{claim,verify,hub,briefs}            │
                    │    POST /api/international-strategy                  │
                    │  MISSING: /api/admin/* , /api/signals                │
                    └──────────────┬──────────────────────────────────────┘
                                   │ email (Resend / Gmail) ──► rrk3311@ / info@
                                   │ Attio (partial, if ATTIO_* set)
                                   │ Notion sync ── stub (logs only)

                    ┌─ Express (code exists, NOT what Vercel runs) ────────┐
                    │  server/routes.ts  — old /api/chat (financial closer) │
                    │  GET /api/leads (unauthenticated)                     │
                    │  /api/admin/*  requireAdmin Basic                     │
                    │  /api/signals, RBO/RSO, content studio, travel, aff.  │
                    │  storage = DbStorage if DATABASE_URL else MemStorage  │
                    └──────────────────────────────────────────────────────┘
```

**Deploy config (`luxury-homepage` `vercel.json`):** `framework: null`, `buildCommand: npm run build`, `outputDirectory: dist/public`, SPA rewrite `/(.*) → /index.html`, plus ~25 permanent redirects (old Situations / Buildings / Perspectives URLs). Express `dist/index.js` is built but **not** the Vercel entrypoint.

**`main` `vercel.json`:** same static shape, **no redirects, no `api/` folder.** Deploying `main` would publish the June 2026 luxury-leasing homepage with no Decision OS routes.

### 2.3 Live client route map (from `App.tsx` on `luxury-homepage` + live bundle)

**Primary nav:** Home `/` · Situations `/situations` · Intelligence `/intelligence` · Buildings `/building-reports` · About `/about`

| Cluster | Routes | Notes |
|---|---|---|
| Home | `/` | “Private Housing Advisory” / Buildings before listings / Guidance Advisor CTA / Decision Assessment → `/belonging` |
| Situations | `/situations`, `/situations/:slug` (~30 slugs) | Old `/services/*` 308 → here |
| Intelligence | `/intelligence` | Architecture landing |
| Buildings | `/building-reports`, `/individual-buildings`, `/neighborhood-guides`, `/market-briefs`, `/:slug` | `/buildings` 308 → here |
| Insights | `/insights`, `/insights/:slug`, `/insights/reports/:slug` | `/perspectives` 308 → here |
| Guides | `/guides` + mortgage/deeds/ownership/Manhattan/liens | Educational, not the Advisor |
| International | `/international`, `/international/:country` | Country pages + strategy form |
| Decision path | `/belonging`, `/account`, `/hub`, `/hub/{roadmap,conversations,saved,reviews,profile}` | Assessment → PIN claim → Hub |
| Advisory / contact | `/advisory`, `/buyer-advisory`, `/contact`, `/privacy`, `/terms`, `/licenses` | `/buy` `/strategy` → buyer-advisory; `/lease` `/sell` → contact |
| Admin | `/admin`, `/admin/pipeline`, `/admin/clients`, plus 7 stub sections | UI only on Vercel |

**Hub path as designed:** Situation landing or Home → Guidance Advisor (0/6) and/or `/belonging` → optional email/PIN at `/account` → `/hub`.  
**Hub path as experienced:** Advisor works without an account. Hub empty-states until claim. Roadmap milestones ≠ Advisor 0/6 modules.

### 2.4 Database (Drizzle / Neon) — intended vs leftover

**Decision OS tables (use):** `visitor_profiles`, `visitors`, `lead_signal_events`, `client_profiles`, `member_profiles`, `chat_sessions`, `chat_messages`, `profile_events`, `saved_items`, `goals`, `advisor_reviews`, `pipeline_opportunities`, `account_claim_tokens`, `audit_logs`, `attio_sync_jobs`, `attio_sync_logs`, plus evolved `leads` / `chat_conversations`.

**Leftover tables (do not extend):** `affiliates`, `affiliate_referrals`, `travel_deals`, `travel_deal_subscribers`, `rbo_buyer_profiles`, `rso_seller_profiles`, `content_items`, `home_value_requests`, `broker_registrations`, `users` (generic Replit auth).

### 2.5 Env vars (union of Express + serverless)

**Must-have for live capture:** `DATABASE_URL`, `OPENAI_API_KEY` (or `AI_INTEGRATIONS_OPENAI_*` / `XAI_API_KEY`), `RESEND_API_KEY` or `EMAIL_USER`+`EMAIL_PASS`, `ACCOUNT_SESSION_SECRET`.

**Admin (only if Express or new `api/admin` is hosted):** `ADMIN_USER`, `ADMIN_PASS` — long passphrase, empty in production if unset (good). Non-prod Express defaults `admin`/`kammer` (bad).

**CRM (pick one):** Notion: `NOTION_API_KEY`, `NOTION_PEOPLE_DATABASE_ID`, `NOTION_LEADS_DATABASE_ID`, `NOTION_SYNC_ENABLED`. Attio: `ATTIO_API_KEY`, `ATTIO_*_OBJECT_ID`, `ATTIO_*_LIST_ID`, `ATTIO_SYNC_ENABLED`, `ATTIO_WEBHOOK_SECRET`.

**Optional / leftover:** `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RENTCAST_API_KEY`, `CONTACT_INBOX`, `CONTACT_FALLBACK_INBOX`, `REPLIT_DOMAINS`, `DECISION_GUIDE_MODEL`, `ACCOUNT_EMAIL_FROM`.

Passport, `express-session`, and `connect-pg-simple` are in `package.json` and **unused** on both branches.

### 2.6 Replit / template leftovers

- `main`: `package.json` name `rest-express`; `.replit`; `replit.md` still describes a 14-category financial comparison engine; `@replit/vite-plugin-*`; robot-mascot / AI-engine PNGs in repo root; `attached_assets/`; `preview-script.mjs`.
- `luxury-homepage`: cleaned product name (`agent-kammer`) but still Replit Vite plugins, `REPLIT_DOMAINS` in email HTML, `docs/archive/*` from prior rebuilds.

---

## 3. Dead / old / conflicting code inventory

### 3.1 Entire `main` branch (do not develop here)

These pages exist on `main` and are **gone** from `luxury-homepage`. Live still **200s** many of the URLs via SPA fallback (React then 404s or shows Home).

```
client/src/pages/AffiliateProgram.tsx
client/src/pages/LuxuryTravel.tsx
client/src/pages/WellnessShop.tsx
client/src/pages/ArtGallery.tsx
client/src/pages/Audiobooks.tsx
client/src/pages/Ecourses.tsx
client/src/pages/Downloads.tsx
client/src/pages/Coaching.tsx
client/src/pages/EShop.tsx
client/src/pages/Dashboard.tsx
client/src/pages/FreeTools.tsx
client/src/pages/Refinancing.tsx
client/src/pages/CategoryPage.tsx          # buying / selling / 14 financial categories
client/src/pages/RealEstate.tsx
client/src/pages/RealEstateLight.tsx
client/src/pages/RealEstateLightV2.tsx
client/src/pages/RealEstateLightV3.tsx
client/src/pages/Profile.tsx               # live 308 → /account
client/src/pages/ReverseBuyerOrigination.tsx
client/src/pages/ReverseByerOriginationGuide.tsx   # typo filename
client/src/pages/ReverseSellerOrigination.tsx
client/src/pages/AdminRBO.tsx              # Basic auth in localStorage
client/src/pages/GetPreapproved.tsx
client/src/pages/GetHomeValue.tsx
client/src/pages/BrokerRegistration.tsx
client/src/pages/DocumentPortal.tsx        # TODO: backend never wired
client/src/pages/LiveDealMap.tsx
client/src/pages/CommercialInvestment.tsx
client/src/pages/CaliforniaMarket.tsx
client/src/pages/NevadaMarket.tsx
client/src/pages/InternationalBuyers.tsx   # replaced by /international hub
client/src/pages/ContentStudio.tsx
client/src/pages/ContentDetail.tsx
client/src/pages/MediaCenter.tsx           # route on main points at Home
client/src/pages/SavedSearches.tsx
client/src/modules/archived-home-sections.tsx
client/src/archive/AgenticCompute/*
client/src/components/examples/*
shared/productOffers.ts                   # affiliate scoring engine
```

`main` routes that should never come back: `/affiliates`, `/luxury-travel`, `/e-shop`, `/refinancing`, `/dashboard`, `/free-tools`, `/art-gallery`, `/audiobooks`, `/ecourses`, `/coaching`, `/studio`, `/admin/rbo`, `/live-deal-map`, `/document-portal`.

### 3.2 Dead or conflicting on `luxury-homepage` (the live source)

```
server/routes.ts                         # LUXURY_CONCIERGE_PROMPT + /api/chat + unauth GET /api/leads
                                         # + content studio CRUD (no auth) + travel/affiliate/RBO
server/pdf-template.ts                   # CA / NYC / NV market PDF (old funnel)
server/lib/rentcast.ts                   # optional, unused by Decision OS path
server/lib/notion-crm.ts                 # stub
client/src/pages/DecisionHub.tsx         # not mounted in App.tsx (Hub* pages are)
blueprintSegments[].filled               # unused hardcoded true/false in DecisionAssistantDock.tsx
docs/archive/*                           # 20 prior audits/rebuild docs — useful history, not current spec
```

**Admin stubs (mounted, empty):**  
`/admin/conversations` `/admin/reviews` `/admin/tasks` `/admin/reports` `/admin/calendar` `/admin/team` `/admin/settings` → `client/src/pages/AdminSection.tsx`

**Duplicate funnels still linked internally:**

- Buyer path: `/buyer-advisory` vs Situation slugs (`first-home-buyers-nyc`, `rent-vs-buy-manhattan-relocation`) vs Guidance Advisor.
- Intelligence: `/intelligence` vs `/building-reports/market-briefs` (same `Intelligence.tsx` component on market-briefs).
- Assessment: `/belonging` vs Advisor dock vs `/advisory`.

### 3.3 TODOs that contradict the Notion pivot

| Location | What it says | Conflict |
|---|---|---|
| `server/lib/notion-crm.ts` | `TODO: implement Notion API upsert` | Accepted SoT path is unimplemented |
| Notion Command Center | `/admin` stays light | Live `/admin` is a 10-item Attio-shaped portal |
| `docs/architecture/ARCHITECTURE-REVIEW.md` | De-emphasize Travel / Affiliate / Concierge | Express still serves all three |
| `docs/integrations/attio.md` + admin Settings | Attio = operational CRM | Notion says Notion = human admin |
| `client/src/pages/DocumentPortal.tsx` (`main` only) | `TODO: Implement actual form submission` | Dead product |
| `replit.md` (`main`) | “When Brokers Compete You Win” / 14 categories | Opposite of current positioning |

---

## 4. Bug and risk list (with files)

### Security / PII

1. **`GET /api/leads` unauthenticated** — `luxury-homepage` `server/routes.ts` ~1244; also `main` `server/routes.ts` ~738. Live Vercel `api/leads.ts` is POST-only (safe).  
2. **Content Studio mutating APIs unauthenticated** — `server/routes.ts` `POST/PATCH/DELETE /api/content`. Express-only.  
3. **Admin Basic credentials in `sessionStorage`** — `client/src/pages/AdminOverview.tsx`, `AdminPortal.tsx`, `AdminSection.tsx` (`ak_admin_basic`). On `main`, `AdminRBO.tsx` uses **`localStorage`** (`admin_user` / `admin_pass`).  
4. **Default admin password `kammer`** — `server/routes.ts` ~79–80 (`NODE_ENV !== production`).  
5. **6-digit account PIN** — `api/account/verify.ts` (`/^\d{6}$/`), `server/lib/account-otp.ts` (`randomInt(0, 1_000_000)`). 1e6 space; Express hash is unsalted SHA256 of `email:pin`; Vercel path uses HMAC (`ACCOUNT_SESSION_SECRET`). Rate limit exists (5 attempts / 45s resend). Notion’s “no short PIN” note was about **admin**, but member PIN is still a small space.  
6. **PII in logs** — Express `/api/chat` logs raw AI output + extracted lead (`[CHAT] Extracted Lead Data`). Account OTP: `console.info` of PIN when `NODE_ENV !== production` (`api/account/claim.ts`). Notion stub logs `name`.  
7. **API request logger dumps JSON bodies** — `server/index.ts` / `create-app.ts` append `JSON.stringify` of responses to `/api` logs (truncated to 80 chars — still enough for emails).  
8. **Error middleware rethrows** — `server/index.ts` / `create-app.ts` `throw err` after `res.json`, can crash the process.  
9. **FRED API key hardcoded** — `main` only, `client/src/components/GlobalMarketTicker.tsx` ~30 (`45f54a01e27b13fab6a48d1f18ef16e8`).  
10. **No CORS hardening, no cookie `Secure` review on Express sessions** — passport/session unused; member cookies live on Vercel account helpers (verify `Secure`/`HttpOnly`/`SameSite` in `api/account/_shared.ts` before advertising Hub as private).

### Broken / incomplete product paths

11. **`/admin` APIs 200 HTML on live** — no `api/admin/*`. UI cannot sign in or load pipeline.  
12. **`POST /api/signals` not on Vercel** — client `trackVisitorSignal` (`client/src/lib/visitor-signals.ts`) talks to Express-only `server/routes.ts` ~1732. Identity/analytics SoT is dark.  
13. **OpenAI null crash on Express `/api/chat`** — `main` `server/routes.ts` ~589 calls `openai.chat.completions.create` without a null guard (`luxury-homepage` still has the concierge route).  
14. **`DecisionHub.tsx` unmounted** — duplicate of `/hub/*`. Dead file.  
15. **Hub empty states are the default** — `HubHome.tsx`, `HubSaved.tsx`, `HubReviews.tsx`, `HubConversations.tsx` require `fetchHubSnapshot()` / claimed email.  
16. **Advisor 0/6 over-counts** — `DecisionAssistantDock.tsx` ~942–948: `Location` and `Building` both accept `answers.desire`; `Timeline` accepts any `constraints`. Easy to show 3/6 after one vague reply. Static `filled: true` on Lifestyle/Location/Building is unused leftover.  
17. **Roadmap ≠ Advisor** — `HubRoadmap.tsx` maps lifecycle (`anonymous`…`closed`) onto a different numbered list (`shared/client-profile.ts` `R` milestones). Admin pipeline stages are a third list (New Signal → Active Search).  
18. **SPA soft-404s** — unknown paths and retired `main` URLs return `200` + `index.html` (`vercel.json` rewrite). Bad for SEO and for “is this page real?”  
19. **`maximum-scale=1`** — `client/index.html` (both branches + live). Blocks pinch-zoom.  
20. **Chat memory split** — Vercel Decision Guide is stateless-ish serverless; Express `sessionLeads` is an in-memory `Map`. Two conversation stores if both ever run.

### Schema / sync / deploy

21. **Notion sync no-ops** — `server/lib/notion-crm.ts`.  
22. **Attio + Notion + `/admin` + email inbox** — four “CRMs.”  
23. **`main` storage hardcoded to memory** — `server/storage.ts` ~682–684.  
24. **Vercel vs Express API drift** — same path names, different behavior (`GET /api/leads` 405 vs dump-all).  
25. **Live vs `luxury-homepage` lag** — branch tip 7 Aug 2026; live bundle may include later Vercel deploys from the same branch or unpushed local. Confirm Vercel project branch before merging anything to `main`.

---

## 5. Messaging / positioning conflicts

**Canonical (live + Notion, use these):**

- Buildings Before Listings  
- Decisions Before Emotions  
- Private housing guidance / Guidance Advisor  
- Situations (Executive Relocation, First Home, …)  
- Decision OS · Decision Progress 0/6 · Decision Blueprint™ (human deliverable, not a sales proposal)  
- Identity: Real Estate Strategist applying Decision Intelligence (Brand Systems, 19 Aug 2026)

**Conflicts still in code or docs:**

| Artifact | Language | Status |
|---|---|---|
| Live `<title>` / OG | “Agent Kammer \| Buildings Before Listings.” | Good |
| Live Home H1 | “Start with what feels unclear.” + Private Housing Advisory | Good — matches pivot |
| `main` `<title>` | “Modern Manhattan Luxury Leasing & Acquisition” | Stale |
| `main` Header | Lease → `/profile`, Buy → `/reverse-buyer-origination`, Buildings → `/#buildings` | Wrong IA |
| `main` Footer | “Modern Manhattan Luxury · Leasing • Strategic Acquisition” | Stale |
| `main` `replit.md` | “When Brokers Compete You Win”; 14 financial categories; Wall Street closer | Archive |
| Express `/api/chat` prompt | Jordan Belfort / credit cards / cashback apps / “financial concierge” | Contradicts Advisor |
| Live `<head>` | `impact-site-verification`, `fo-verify` | Affiliate-network leftover |
| `/intelligence` vs Home | Home CTA “Building Intelligence”; nav label “Intelligence” | Fine if `/intelligence` stays the architecture page — don’t revive “Intelligence Before Real Estate” / “Wall Street Intelligence” (not in live bundle) |
| Admin sidebar | “Advisory” + Attio + recruiting study guides | Operator OS, not the public brand — keep it off the public nav |
| Decision Blueprint™ vs Decision Brief vs Decision Assessment vs Decision Progress | Four similarly named objects | Brief = public Situation SEO; Assessment = `/belonging`; Progress = Advisor 0/6; Blueprint = post-call Notion artifact. Keep names; don’t add a fifth. |

**Nav vs routes (live):** nav matches real routes. Footer/legal (`/privacy`, `/terms`, `/licenses`) exist. Old marketing URLs redirect (good). Soft-404s for `main`-era URLs (bad).

---

## 6. Recommended cleanup order (no rewrite)

Do these as **small PRs on `luxury-homepage` (or a new default `main` that *is* that branch).** Do not start a new app.

### Step A — Stop the bleeding (half day, no UI)

1. Set GitHub default branch to `luxury-homepage` (or fast-forward `main` to `486877e` and protect it). Confirm Vercel production branch.  
2. Guard or delete Express `GET /api/leads`. Guard `/api/content` mutations.  
3. Confirm `ADMIN_USER` / `ADMIN_PASS` unset or long; never `kammer` / never a 5–6 digit PIN.  
4. Confirm `DATABASE_URL` and `ACCOUNT_SESSION_SECRET` on Vercel.  
5. Add Vercel 404/410 for `/affiliates`, `/luxury-travel`, `/dashboard`, `/art-gallery`, `/coaching`, `/e-shop`, `/refinancing`, `/free-tools`, `/audiobooks`, `/studio`.

### Step B — Make capture true (1–2 focused PRs)

6. Add **thin** `api/signals.ts` that writes `lead_signal_events` (copy Express handler). Until this exists, do not trust “website DB = SoT.”  
7. Implement **one** CRM write: Notion Person + Opportunity **or** Attio — not both. Update Notion Command Center if Attio wins.  
8. Disable Express `/api/chat` (return 410). Keep `/api/decision-guide/chat` only.

### Step C — Admin: shrink, don’t grow

9. Hide stub `/admin/*` nav (Conversations, Reviews, Tasks, Reports, Calendar, Team, Settings). Leave Overview + Clients as a diagnostic if APIs are wired; otherwise unpublish `/admin` from the public router (keep the files).  
10. If admin APIs are needed for you only: 20-line `api/admin/session.ts` + `dashboard.ts` using Basic from env — **no new modules**.

### Step D — Decision Progress / Hub (product, still small)

11. Persist the six Advisor flags on the lead/visitor. Tighten Location vs Building vs Timeline so 0/6 means 0/6.  
12. One CTA after 3/6: “Save this to your Hub” → `/account` PIN → `/hub`. Do not add Timeline/Vision Board/Decision Graph UI.  
13. Decision Blueprint™ stays a Notion/Markdown human deliverable (`docs/product/DECISION-BLUEPRINT.md`). Do not wait on a Hub module.

### Step E — Hygiene (whenever)

14. Remove `maximum-scale=1`.  
15. Remove Impact / FlexOffers meta tags unless those networks are still paid.  
16. Mark leftover Drizzle tables `DEPRECATED` in a comment; do not drop until Neon is backed up.  
17. Delete or `docs/archive` the unmounted `DecisionHub.tsx` and Express concierge prompt.  
18. Ignore `docs/archive/*` as current spec; `SYSTEM-DESIGN.md` + this audit + Notion Command Center are enough.

**Do not do:** a new admin portal, Google SSO, Calendar sync, affiliate rebuild, travel/concierge revival, merging `main`’s pages “just in case,” or a greenfield rewrite.

---

## 7. Operator checklist (Raphi)

- [ ] Which git branch does Vercel Production deploy? If `main`, that is a P0 misconfig.  
- [ ] Is Neon `DATABASE_URL` set on Vercel? If not, Hub/account is memory or empty.  
- [ ] Are `ATTIO_SYNC_ENABLED` and/or `NOTION_SYNC_ENABLED` true? Today Notion code cannot sync even if true.  
- [ ] Who uses `/admin` today? If nobody, hide it. If you do, APIs are not on Vercel.  
- [ ] Keep treating Notion CRM as the human desk until one sync exists.  
- [ ] Default branch change is the highest-leverage “code” change this week.

---

## Appendix A — Live route probe (22 Aug 2026)

**200 (SPA):** `/` `/situations` `/intelligence` `/hub` `/admin` `/admin/pipeline` `/privacy` `/terms` `/guides` `/about` `/international` `/building-reports` `/belonging` `/account` `/licenses` `/advisory` plus leftover `/affiliates` `/luxury-travel` `/dashboard` `/free-tools` `/art-gallery` `/coaching` `/e-shop` `/refinancing`

**308:** `/buildings` → `/building-reports` · `/real-estate` → `/building-reports` · `/profile` → `/account` · `/perspectives` → `/insights` · `/buy` `/strategy` → `/buyer-advisory` · `/sell` `/lease` → `/contact`

**APIs:** `GET /api/leads` → `405` JSON · `GET /api/decision-guide/chat` → `405` · `GET /api/admin/session` → `200` HTML (missing function) · `GET /api/chat` → `200` HTML (gone)

## Appendix B — Decision Progress 0/6 (Advisor)

Source: `client/src/components/DecisionAssistantDock.tsx`

| # | Module | Counted complete when |
|---|---|---|
| 1 | Lifestyle | `answers.situation` |
| 2 | Location | `desire` **or** `geography` **or** `neighborhoods` |
| 3 | Building | `buildingPreferences` **or** `desire` (overlaps Location) |
| 4 | Financial | `budget` or `financingStatus` or (`constraints` and score ≥ 2) |
| 5 | Timeline | `timeline` **or** `constraints` (overlaps Financial) |
| 6 | Trade-offs | `answers.tradeOff` |

Hub roadmap (`HubRoadmap.tsx`) is a separate lifecycle counter, not these six.

## Appendix C — Sources

- Repo: `https://github.com/rrk3311-USA/AgentKammer` (`main` @ `b256e56`, `luxury-homepage` @ `486877e`)  
- Live: `https://www.agentkammer.com/` (Vercel)  
- Notion: [Command Center](https://app.notion.com/p/39d0ad628ae58164b52ff2b0e1d3a4a8), [CRM Command Center](https://app.notion.com/p/39d0ad628ae581e595f8c4fb49874b89), [Decision Blueprint — Guide](https://app.notion.com/p/39d0ad628ae581158d9dc26128a751ea), [Brand Systems](https://app.notion.com/p/3700ad628ae5806dbd6ded532be0bbeb), [Agent Kammer](https://app.notion.com/p/34d0ad628ae58073b616d0c90d22f66c)  
- In-repo (on `luxury-homepage` only): `docs/architecture/SYSTEM-DESIGN.md`, `docs/architecture/ARCHITECTURE-REVIEW.md`, `docs/integrations/notion-crm.md`, `docs/admin/ADMIN-COMMAND-CENTER.md`, `docs/product/DECISION-BLUEPRINT.md`
