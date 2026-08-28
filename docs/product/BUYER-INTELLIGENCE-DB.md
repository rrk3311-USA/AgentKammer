# Buyer Intelligence Database — Codex spec

**Status:** Implemented in-repo (Drizzle + ingest + matcher). Spec remains the contract.

**Code**

- Schema: `shared/schema-buyer-intel.ts` (`bi_*` tables)
- Logic: `server/lib/buyer-intel/`
- Seed: `npm run seed:buyer-intel` or `POST /api/admin/buyer-intel/seed`
- Push tables: `npm run db:push` (needs `DATABASE_URL`)
- Hub save: `POST /api/hub/save` (visitor cookie → `saved_items` + observed favorite)
- Contact / Decision Guide ingest into stated preferences automatically

**Audience:** Implementers / operators  
**Audience:** Codex / implementer  
**Stack:** Postgres (Supabase or Neon — same SQL). Website capture remains source of truth for identity; this schema is the **buyer-intelligence layer**.  
**Repo today:** `shared/schema.ts` already has `leads`, `client_profiles`, `member_profiles`, `rbo_buyer_profiles`, pipeline tables. **Do not replace those.** Add a dedicated schema `buyer_intel` (or prefix `bi_`) and optional FK/link columns back to `client_profiles.id` / `leads.id`.

**Human ops stay where they are:** Attio = operational CRM · Notion = command center. This database answers: *what this buyer actually wants, what they reject, and who should see this listing.*

---

## Codex prompt (paste this)

Build this as a **normalized Supabase/Postgres schema** for a luxury residential real-estate **buyer intelligence** system (Agent Kammer Residential Advisory). Preserve **longitudinal** buyer preference data. Distinguish **stated / observed / inferred** preferences. Support property-to-buyer matching, interaction history, nurture workflows, property reactions, rejection reasons, and eventual transactions.

Requirements:

- UUID primary keys (`gen_random_uuid()`)
- `created_at` / `updated_at` on every table
- Soft deletion (`deleted_at timestamptz null`)
- RLS-ready (enable RLS; service-role policies for the backend; no public `anon` write)
- Enums where values are closed sets
- **JSONB only for genuinely flexible metadata** — not for core relational data (preferences, matches, reactions, buildings)
- **Never overwrite preferences.** Append events. Current snapshot is a view or a maintained current-row with history in `preference_events`
- Killer table: **`buyer_property_matches`** — eventually AI continuously answers: *Who in my database should see this new listing?*
- **Ingest existing product surfaces** (do not replace them): Contact / Belonging start forms, Decision Guide answers, Decision Hub login (`/account` email+PIN), and Hub **Save** when someone is logged in. Forms = **stated**. Hub saves and listing clicks = **observed**.
- Do **not** build a generic CRM UI in v1. Schema + indexes + views + seed + match query first. + ingest map from live tables.

---

## What this is / is not

| This is | This is not |
|---------|-------------|
| Longitudinal preference intelligence | Overwriting a “notes” field when they change their mind |
| Stated vs observed vs inferred | One JSON blob of “likes” |
| Building-level facts + property reviews | MLS clone |
| Match scores with reasoning | Lead score as a substitute for taste |
| Household as first-class (couples buying together) | One email = one deal always |

**Do not overwrite preferences.** Track three layers:

| Layer | Meaning | Example |
|-------|---------|---------|
| **Stated** | What they tell you | “View isn’t that important.” |
| **Observed** | What behavior reveals | Favorites are all high-floor units |
| **Inferred** | Model interpretation | view importance = HIGH, confidence = 0.82 |

When stated and observed conflict, **keep both rows**. Inferred may update as a *new* event with a new confidence — never delete the stated row.

---

## Identity model

```txt
contacts  (one person)
    ↓
households  ← household_members (role: primary, partner, advisor, family)
    ↓
buyer_profiles  ← THE acquisition case (budget, timeline, product)
    ├── preference_events / buyer_preferences (current)
    ├── buyer_aversions
    ├── buyer_persona_assignments
    ├── interactions, tasks, nurture_plans, documents
    └── buyer_property_matches
              ↓
properties → buildings → property_reviews
              ↓
     property_reactions → rejection_reasons
              ↓
         transactions (when a deal exists)
```

**`buyer_id` in this spec = `buyer_profiles.id`.**  
A household of two people has **one** buyer profile (the search). Contacts remain people. Do not hang matches off `contacts.id` or you cannot represent couples cleanly.

A buyer profile is owned by **either** a household **or** a solo contact:

```sql
CHECK (
  (household_id IS NOT NULL AND contact_id IS NULL)
  OR (household_id IS NULL AND contact_id IS NOT NULL)
)
```

Optional: `website_client_profile_id` UUID — link to existing `client_profiles.id` (text UUID in current Drizzle).  
Also store `member_profile_id` (Decision Hub login) and `visitor_id` so Hub saves join to the same person.

---

## Ingest from the live site (yes — Hub people give info)

**Yes.** Buyer Intelligence should **pull** from the start forms, the Decision Hub, and logged-in actions. Those are already how people tell us (and show us) what they want. This schema is the taste layer on top — it does **not** replace `/account`, `/hub`, or `client_profiles`.

Identity join:

```txt
anonymous visitor (visitor_id)
  → Guidance Advisor / briefs / contact form
  → Resume My Decision (/account email + PIN) → member_profiles
  → Decision Hub (/hub) — profile, goals, saved pages
  → client_profiles (website chart + Attio sync)
  → buyer_intel.contacts + buyer_profiles  (this spec)
```

Login is **not** a preference. It is the key that lets “pressing Save” attach to a person.

### Stated (what they type)

| Source | What they give | Maps to |
|--------|----------------|---------|
| Contact form (`/contact`, including `?intent=belonging`) | Name, email, what changed, budget band, timing, next step | `contacts` + `buyer_profiles` budget/timeline (**stated**) |
| Guidance Advisor dock answers | Situation, deal-breakers, neighborhoods, financing | `preference_events` origin=`stated`; aversions from deal-breakers |
| Belonging Assessment → Decision Profile | Life friction, priorities, readiness (when built) | stated preferences + timeline |
| Hub Profile (`/hub/profile`) | Objective, timeline they shared | `buyer_profiles` fields, stated |
| `member_profiles` | goals, vision, priorities, `decision_map` | stated events (parse map; don’t dump JSON as SoT) |
| `client_profiles` | `budgetRange`, `timeline`, `financingStatus`, `creditReadiness`, `downPaymentReadiness`, `propertyTypes`, `targetLocations`, `dealBreakers`, `constraints` | stated profile + aversions |
| `rbo_buyer_profiles` | Legacy pre-qual (price range, cities, credit band) | stated **financing / budget** only — source `rbo_legacy` |
| `leads` | timeline, financing from older capture | stated, if not already on client_profiles |

Pre-qual / “user profile” here is **`client_profiles` + Hub**, not a mortgage LOS. `creditReadiness` / `downPaymentReadiness` / `financingStatus` feed `preapproval_status`. A real letter goes in `documents`.

### Observed (what they press when logged in)

| Source | What they do | Maps to |
|--------|----------------|---------|
| Hub Saved (`/hub/saved`) · `saved_items` | Save a building, brief, listing | `property_saves` + `property_reactions` kind=`favorite` + `preference_events` origin=`observed` |
| `client_profiles.buildingsViewed` / `listingsViewed` | Browse without saving | weaker observed |
| Repeat saves in one neighborhood / building type | Pattern | observed neighborhood / ownership_form |
| Reject / skip (when built) | No | `property_reactions` rejected + `rejection_reasons` |

**Rule:** Hub Save of three high-floor buildings while they *said* “view doesn’t matter” is the Raphael example. Keep both. Inferred comes later.

### Codex ingest job (v1)

1. Match `contacts.email` to `client_profiles.email` / `member_profiles.email` (citext).
2. Upsert `buyer_profiles` from client_profile budget/timeline/financing as **new stated events** when values change — never silently overwrite old stated rows.
3. For each `saved_items` row: upsert property/building from slug if known; insert save + observed hints.
4. Copy `deal_breakers[]` → `buyer_aversions` origin=stated.
5. Idempotent: `source_system` + `source_row_id` on events so re-runs don’t duplicate.

Add on `preference_events` and `property_saves`:

| Column | Purpose |
|--------|---------|
| source_system | `contact_form`, `decision_guide`, `hub_save`, `client_profile`, `member_profile`, `rbo_legacy`, `advisor` |
| source_row_id | id in the originating table |

---

## Target “chart” (product feel)

This is the row-shape the UI/query should assemble — not a single table:

```txt
BUYER
Raphael Example
Budget: $5M–$8M
Timeline: 3–6 months
Financing: Cash
Neighborhoods: Chelsea, Hudson Yards, Tribeca
Persona: Design-conscious executive

MUST HAVE
• High floor · Quiet unit · Large windows · Doorman · Modern building

PREFER
• South/west exposure · Architectural interiors · Gym · 1,800+ sqft

AVOID
• Glossy finishes · Dark corridors · Small kitchens · Heavy street noise

OBSERVED BEHAVIOR
• Rejected 3 units for enclosed kitchens
• Consistently likes limestone + warm wood
• Will pay premium for view
```

MUST HAVE = `buyer_preferences` where `hard_requirement = true`  
PREFER = `hard_requirement = false` ordered by `importance`  
AVOID = `buyer_aversions`  
OBSERVED = `preference_events` where `origin = 'observed'` plus aggregates from `property_reactions` / `rejection_reasons`

---

## Enums

```sql
create schema if not exists buyer_intel;

create type buyer_intel.contact_status as enum (
  'signal', 'nurture', 'active_search', 'paused', 'under_contract',
  'closed', 'lost', 'do_not_contact'
);

create type buyer_intel.household_member_role as enum (
  'primary', 'partner', 'family', 'advisor', 'attorney', 'other'
);

create type buyer_intel.financing_type as enum (
  'cash', 'mortgage', 'mixed', 'unknown'
);

create type buyer_intel.preapproval_status as enum (
  'none', 'in_progress', 'prequalified', 'preapproved', 'expired', 'cash_verified'
);

create type buyer_intel.timeline_band as enum (
  'immediate', '0_3_months', '3_6_months', '6_12_months', '12_plus', 'unknown'
);

create type buyer_intel.ownership_form as enum (
  'condo', 'coop', 'condop', 'townhouse', 'rental', 'unknown'
);

create type buyer_intel.preference_origin as enum (
  'stated', 'observed', 'inferred'
);

create type buyer_intel.preference_category as enum (
  'floor', 'light', 'view', 'noise', 'layout', 'kitchen', 'outdoor',
  'building', 'service', 'finish', 'neighborhood', 'size', 'exposure',
  'outdoor_space', 'parking', 'pets', 'other'
);

create type buyer_intel.aversion_severity as enum (
  'soft', 'strong', 'dealbreaker'
);

create type buyer_intel.property_status as enum (
  'coming_soon', 'active', 'under_contract', 'sold', 'off_market', 'withdrawn'
);

create type buyer_intel.match_recommendation as enum (
  'show', 'maybe', 'hold', 'do_not_show'
);

create type buyer_intel.reaction_kind as enum (
  'interested', 'favorite', 'rejected', 'neutral', 'toured', 'offer_considered'
);

create type buyer_intel.interaction_type as enum (
  'call', 'text', 'email', 'meeting', 'tour', 'video', 'note'
);

create type buyer_intel.task_status as enum (
  'open', 'done', 'canceled', 'snoozed'
);

create type buyer_intel.task_priority as enum (
  'low', 'normal', 'high', 'urgent'
);

create type buyer_intel.nurture_stage as enum (
  'new', 'education', 'shortlist', 'touring', 'offer', 'paused', 'closed'
);

create type buyer_intel.document_type as enum (
  'preapproval', 'proof_of_funds', 'id', 'tax_return', 'entity_docs', 'other'
);

create type buyer_intel.transaction_stage as enum (
  'exploring', 'offer', 'contract', 'attorney_review', 'board', 'closing', 'closed', 'dead'
);

create type buyer_intel.referral_source_type as enum (
  'personal', 'professional', 'campaign', 'website', 'event', 'other'
);
```

---

## Tables

Convention: every table has

```sql
id uuid primary key default gen_random_uuid(),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
deleted_at timestamptz
```

Trigger `updated_at` on update. Partial unique indexes ignore `deleted_at is not null`.

### `referral_sources`

Acquisition tracking (user name: `referrals_sources`).

| Column | Type | Notes |
|--------|------|--------|
| source_name | text not null | |
| type | referral_source_type | |
| campaign | text | |
| metadata | jsonb | UTM blob only |

### `contacts`

One row per person.

| Column | Type | Notes |
|--------|------|--------|
| first_name, last_name | text | |
| email | citext | unique where not deleted |
| phone | text | |
| source_id | uuid | FK referral_sources |
| source | text | free-text fallback |
| status | contact_status | default `signal` |
| owner | text | advisor handle / email until staff table exists |
| website_client_profile_id | text | link to `client_profiles.id` |
| website_lead_id | text | link to `leads.id` |
| metadata | jsonb | optional only |

### `households`

| Column | Type | Notes |
|--------|------|--------|
| household_name | text not null | e.g. “Example / Partner” |
| primary_contact_id | uuid not null | FK contacts |

### `household_members`

| Column | Type | Notes |
|--------|------|--------|
| household_id | uuid not null | |
| contact_id | uuid not null | |
| role | household_member_role | |

Unique `(household_id, contact_id)` where not deleted.

### `buyer_profiles`

Main acquisition profile (the search).

| Column | Type | Notes |
|--------|------|--------|
| contact_id | uuid | XOR household |
| household_id | uuid | XOR contact |
| display_name | text | chart title |
| budget_min_cents | bigint | store money as integer cents |
| budget_max_cents | bigint | |
| financing_type | financing_type | |
| preapproval_status | preapproval_status | |
| timeline | timeline_band | |
| property_type | ownership_form | primary product filter |
| beds_min | numeric(3,1) | |
| baths_min | numeric(3,1) | |
| sqft_min | integer | |
| notes | text | narrative, not preferences |
| status | contact_status | search-level status |
| owner | text | |

Neighborhoods are **not** a text dump on this row. Use `buyer_neighborhoods`.

### `buyer_neighborhoods`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid not null |
| neighborhood_slug | text not null |
| rank | int | 1 = top |

Unique `(buyer_profile_id, neighborhood_slug)`.

### `buyer_personas`

Internal classification (seeded, not buyer-facing).

| Column | Type |
|--------|------|
| persona_name | text unique |
| description | text |

Seed examples: `design_conscious_executive`, `pied_a_terre_lock_and_leave`, `value_coop_primary`, `foreign_condo_first`.

### `buyer_persona_assignments`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| persona_id | uuid |
| confidence | numeric(4,3) | 0–1 |
| assigned_by | text | `advisor` \| `model` \| `rule` |

### Preference system (do not overwrite)

#### `preference_events` (append-only source of truth)

Every change is a **new row**. No updates except `deleted_at` for mistakes.

| Column | Type | Notes |
|--------|------|--------|
| buyer_profile_id | uuid not null | |
| origin | preference_origin not null | stated / observed / inferred |
| category | preference_category not null | |
| preference | text not null | “high floor”, “view”, “limestone + warm wood” |
| importance | smallint | 1–5, null if unknown |
| hard_requirement | boolean | default false |
| polarity | text | `want` \| `avoid` (avoids can also live in aversions) |
| confidence | numeric(4,3) | required for inferred; optional otherwise |
| evidence_reaction_id | uuid | FK property_reactions when observed |
| evidence_note | text | “Rejected 3 enclosed kitchens” |
| recorded_at | timestamptz | when the signal happened |
| superseded_by | uuid | later event id if advisor marks replacement |

**Never UPDATE `preference` / `importance` in place.** If they reverse themselves, insert a new stated event; keep the old one.

#### `buyer_preferences` (current snapshot)

Materialized convenience for the chart. Maintained by trigger or application from latest non-deleted event per `(buyer_profile_id, origin, category, preference)` — **or** skip this table and use view `v_buyer_preferences_current`.

Preferred v1: **view**, no duplicate truth.

```sql
create view buyer_intel.v_buyer_preferences_current as
select distinct on (buyer_profile_id, origin, category, lower(preference))
  *
from buyer_intel.preference_events
where deleted_at is null
order by buyer_profile_id, origin, category, lower(preference), recorded_at desc, created_at desc;
```

If Codex implements a physical `buyer_preferences` table, it must be rebuilt from events, not hand-edited as SoT.

### `buyer_aversions`

Explicit dislikes / dealbreakers (can overlap polarity=avoid events). Keep relational for the AVOID block.

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| category | preference_category |
| issue | text not null |
| severity | aversion_severity |
| origin | preference_origin | default stated |
| notes | text |

### `buildings`

Building intelligence (separate from markdown Building Reports; optional `report_slug`).

| Column | Type |
|--------|------|
| name | text not null |
| address | text |
| neighborhood_slug | text |
| ownership_form | ownership_form |
| year_built | int |
| developer | text |
| amenities | text[] | closed-enough list; not a JSON kitchen sink |
| report_slug | text | e.g. `lantern-house` |

### `properties`

Master property record.

| Column | Type |
|--------|------|
| building_id | uuid | nullable if unknown |
| address | text not null |
| unit | text | |
| ask_price_cents | bigint | |
| beds | numeric(3,1) | |
| baths | numeric(3,1) | |
| sqft | int | |
| status | property_status | |
| listing_url | text | |
| external_id | text | brokerage/MLS key |

### `property_attributes`

EAV for flexible facts (exposure, floor, ceiling height) — this is the allowed “flexible” relational pattern, **not** JSONB.

| Column | Type |
|--------|------|
| property_id | uuid |
| attribute | text | `floor`, `exposure`, `kitchen_type`, `finish` |
| value | text |

Unique `(property_id, attribute)` where not deleted.

### `property_reviews`

Advisor analysis.

| Column | Type |
|--------|------|
| property_id | uuid |
| reviewer | text | owner |
| score | numeric(4,1) | 0–10 |
| grade | text | A–F |
| verdict | text | |
| pricing_assessment | text | |
| risks | text | |

### `buyer_property_matches` 🔥

Who should see this listing — and why.

| Column | Type | Notes |
|--------|------|--------|
| buyer_profile_id | uuid not null | |
| property_id | uuid not null | |
| match_score | numeric(5,2) | 0–100 |
| recommendation | match_recommendation | |
| reasoning | text not null | human-readable |
| model_version | text | e.g. `rules-v1` |
| computed_at | timestamptz | |
| input_hash | text | skip recompute if unchanged |

Unique `(buyer_profile_id, property_id, model_version)` where not deleted.

**v1 matcher (rules, no LLM required):**

1. Hard fail: ask price outside budget ± buffer; ownership_form mismatch if profile is strict; dealbreaker aversion hit (attribute or review keyword).
2. Neighborhood: in `buyer_neighborhoods` = boost.
3. Beds/baths/sqft mins.
4. Preference hits: each current `want` with `hard_requirement` must match an attribute or fail.
5. Observed/inferred view/floor: boost if floor high or `view` attribute present even if stated said view is unimportant.
6. Score 0–100; `do_not_show` if hard fail.

**Query Codex must ship:**

```sql
-- Who should see this new listing?
select
  bp.display_name,
  m.match_score,
  m.recommendation,
  m.reasoning
from buyer_intel.buyer_property_matches m
join buyer_intel.buyer_profiles bp on bp.id = m.buyer_profile_id
where m.property_id = $1
  and m.deleted_at is null
  and bp.deleted_at is null
  and m.recommendation in ('show', 'maybe')
order by m.match_score desc;
```

### `property_reactions`

Buyer response after seeing a listing or review.

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| property_id | uuid |
| kind | reaction_kind |
| reaction_score | smallint | optional 1–5 heat |
| notes | text |
| occurred_at | timestamptz |

This is an **event log** (multiple reactions over time). Latest kind is derived.

When `kind = 'rejected'`, require at least one `rejection_reasons` row (application rule).

### `rejection_reasons`

| Column | Type |
|--------|------|
| reaction_id | uuid not null |
| reason_category | preference_category |
| detail | text |

### `property_saves`

Current favorites (state table). Unique `(buyer_profile_id, property_id)`.  
On favorite reaction, upsert here; on unsave, soft-delete. Do not use this as the only history — reactions remain the log.

### `interactions`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| contact_id | uuid | which person on the household |
| type | interaction_type |
| occurred_at | timestamptz |
| summary | text |
| next_action | text |

### `tasks`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| title | text not null | user field `task` |
| due_at | timestamptz |
| status | task_status |
| priority | task_priority |

### `nurture_plans`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid unique | one active plan |
| cadence | text | `weekly`, `biweekly`, `monthly` |
| stage | nurture_stage |
| next_touch_at | timestamptz |

### `documents`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| type | document_type |
| url | text | storage path, not a public dump |
| received_at | timestamptz |
| expires_at | timestamptz |

### `transactions`

| Column | Type |
|--------|------|
| buyer_profile_id | uuid |
| property_id | uuid |
| stage | transaction_stage |
| offer_cents | bigint |
| contract_price_cents | bigint |
| close_date | date |
| attio_transaction_id | text | optional sync key |

---

## Indexes (minimum)

- `contacts (email)` unique where `deleted_at is null`
- `buyer_profiles (status)`, `(owner)`
- `preference_events (buyer_profile_id, origin, recorded_at desc)`
- `buyer_property_matches (property_id, match_score desc)`
- `buyer_property_matches (buyer_profile_id, recommendation)`
- `property_reactions (buyer_profile_id, occurred_at desc)`
- `properties (building_id)`, `(status)`
- `buildings (neighborhood_slug)`

---

## RLS posture

- `alter table ... enable row level security` on every `buyer_intel` table
- No policies for `anon`
- Backend uses **service role** / server connection (same pattern as current Express + `DATABASE_URL`)
- If advisor auth is added later: `owner = auth.jwt()->>'email'` or a `staff_id` table — **do not fake `auth.uid()` policies** until staff identities exist
- Views: `security_invoker = true` (Postgres 15+)

---

## Seed: Raphael Example

Insert one contact, one buyer_profile, neighborhoods Chelsea / Hudson Yards / Tribeca, persona `design_conscious_executive`.

Stated wants: high floor, quiet, large windows, doorman, modern (hard). Prefer: S/W exposure, architectural interiors, gym, 1800+ sqft.

Aversions: glossy finishes, dark corridors, small kitchens, heavy street noise.

Then **also** insert:

- stated: `view` importance 2, hard_requirement false, preference “View isn’t that important”
- observed: `view` / `floor` importance 5 from three high-floor favorites
- inferred: `view` importance 5, confidence 0.82, evidence_note “favorites are all high-floor; will pay premium for view”

Three rejected properties with `rejection_reasons.detail = enclosed kitchen`.

This seed is the acceptance test for “do not overwrite.”

---

## Implementation order for Codex

1. Schema + enums + updated_at trigger + RLS enabled  
2. Views: current preferences, latest reaction, buyer chart SQL  
3. Seed Raphael Example  
4. Rules-based `recompute_matches(property_id)` function  
5. “Who should see this listing?” query  
6. **Stop.** Do not build a full admin CRM UI. Optional: Drizzle models in `shared/schema-buyer-intel.ts` if wiring into this repo.

---

## Existing repo — do not smash

| Existing | Role vs this spec |
|----------|-------------------|
| `client_profiles` | Website intelligence / Attio sync — **link**, don’t duplicate as SoT for taste |
| `leads` / `pipeline_opportunities` | Capture + pipeline peek |
| `member_profiles` | Decision Hub login (Case) — different product surface |
| `rbo_buyer_profiles` | Legacy origination — leave |
| Attio | Tasks, stages, human CRM |
| Notion Command Center | Operator notes |

If a column would exist in both `client_profiles.budgetRange` and `buyer_profiles.budget_min_cents`, **buyer_intel wins for matching**; website profile can stay a coarse string until a sync job maps them.

---

## Out of scope (v1)

- Public-facing buyer dashboard
- MLS ingest
- Overwriting preference rows
- Storing core preferences in JSONB
- Replacing Attio
- Success Chemistry / Fresh1 databases (wrong brand, wrong repo)

---

*Agent Kammer — Buyer Intelligence. Buildings before listings; taste before inventory.*
