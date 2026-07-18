# Attio Integration — Agent Kammer Advisor OS

The website creates and enriches the relationship. **Attio manages it internally.**

Customers never see Attio.

## Architecture

```
Website chat / assessment / forms
  → Agent Kammer backend
  → Structured client_profiles
  → Attio sync queue (async)
  → Attio Person + Housing Advisory record
  → Lead Pipeline OR Current Clients list (by stage)
  → Attio tasks, stages, notes
  → Transactions object only when a buy/sell deal starts
```

**Separation of concerns**

| Layer | What it is |
|-------|------------|
| **People** | Identity (everyone) |
| **Housing Advisory** | Ongoing client chart (one per relationship) |
| **Lead Pipeline** list | Pre-client board: New Signal → Call Ready / nurture |
| **Current Clients** list | Advisory / transaction / past relationship board |
| **Transactions** object | Deal file when they buy/sell (not the lead board) |
| **Active Transactions** list | Kanban for open deal files |

Do **not** put active advisory clients on the same board as cold website leads. Deals are a third layer — a client can be on Current Clients while a Transaction record tracks the deal.

Chat responses are never blocked on Attio availability. Failed syncs retry with exponential backoff.

## Environment

```bash
ATTIO_API_KEY=
ATTIO_WORKSPACE_ID=
ATTIO_PEOPLE_OBJECT_ID=people
ATTIO_HOUSING_RECORD_OBJECT_ID=housing_advisory
ATTIO_TRANSACTIONS_OBJECT_ID=transactions
ATTIO_LEAD_LIST_ID=lead_pipeline
ATTIO_CLIENT_LIST_ID=client_pipeline
ATTIO_DEAL_LIST_ID=deal_pipeline
ATTIO_WEBHOOK_SECRET=
ATTIO_SYNC_ENABLED=true                 # set false to disable
```

Bootstrap objects + lists:

```bash
npx tsx scripts/setup-attio.ts
```

Official API base: `https://api.attio.com/v2`

Key endpoints used:

| Action | Method | Path |
|--------|--------|------|
| Query person by email | `POST` | `/objects/{people}/records/query` |
| Assert person (upsert by email) | `PUT` | `/objects/{people}/records?matching_attribute=email_addresses` |
| Create / update person | `POST` / `PATCH` | `/objects/{people}/records[/{id}]` |
| Assert / update housing record | `PUT` / `PATCH` | `/objects/{housing}/records…` |
| Notes | `POST` | `/notes` |
| Tasks | `POST` | `/tasks` |

Docs: [Attio REST API](https://docs.attio.com/rest-api/endpoint-reference)

## Attio workspace setup

### 1. People (standard object)

Contact + light ops only. Do **not** store the housing chart here.

| Label | Slug | Type |
|-------|------|------|
| Visitor ID | `website_visitor_id` | Text |
| Lead source | `lead_source` | Text |
| Lifecycle stage | `lifecycle_stage` | Select |
| Lead score | `lead_score` | Number |
| Timeline | `timeline` | Text |
| Assigned advisor | `assigned_advisor` | Text |
| Last active | `last_active_date` | Date |
| Next action | `next_action` | Text |
| Attio sync status | `attio_sync_status` | Select (`Pending` / `Synced` / `Error`) |

Native fields: `email_addresses`, `name`, `phone_numbers`.

### 2. Housing Advisory (custom object)

Main longitudinal chart. Set `ATTIO_HOUSING_RECORD_OBJECT_ID=housing_advisory`.

| Label | Slug | Type |
|-------|------|------|
| Client | `client` | Record reference → People |
| Situation | `situation` | Text |
| Desired outcome | `desired_outcome` | Text |
| Current housing | `current_housing_situation` | Text |
| Current location | `current_location` | Text |
| Target locations | `target_locations` | Text |
| Property type | `property_type` | Text |
| Budget range | `budget_range` | Text |
| Timeline | `timeline` | Text |
| Financing status | `financing_status` | Text |
| Credit readiness | `credit_readiness` | Text |
| Down payment readiness | `down_payment_readiness` | Text |
| Constraints | `housing_constraints` | Text |
| Trade-offs | `tradeoffs` | Text |
| Dealbreakers | `dealbreakers` | Text |
| Readiness score | `readiness_score` | Number |
| Belonging score | `belonging_score` | Number |
| Advisor summary | `last_advisor_summary` | Text |
| Next recommendation | `recommended_next_action` | Text |
| Next review date | `next_review_date` | Date |
| Membership status | `advisory_membership_status` | Select |
| Lifecycle stage | `lifecycle_stage` | Select |
| Website visitor ID | `website_visitor_id` | Text (**unique**) |

### 3. Pipeline / lifecycle stages (exact match)

Same labels in website mapping, Attio selects, Attio list boards, and admin:

```
New Signal
Engaged
Profiled
Qualified
Call Ready
Long-Term Nurture
Advisory Client
Transaction Ready
Inactive
```

| List | Parent | Stages |
|------|--------|--------|
| Lead Pipeline | People | New Signal … Long-Term Nurture |
| Current Clients | People | Advisory Client, Transaction Ready, Inactive |
| Active Transactions | Transactions | Preparing … Closed / Lost (deal file only) |

Website keys (`anonymous`, `engaged`, …) map via `LIFECYCLE_TO_ATTIO`. When stage is **Advisory Client** (or Transaction Ready / Inactive), sync moves the person onto **Current Clients** and off Lead Pipeline. Active Transactions is never populated by website planning sync — only when a Transaction record is created for real execution.

**Closed transaction ≠ Inactive.** Website `closed` (deal completed) maps to **Advisory Client**. Use website `inactive` → Attio **Inactive** only for disqualified leads, unresponsive leads, opt-outs, or former clients with no ongoing relationship.

### 4. Transactions (deals)

Create only when a real buy/sell/lease engagement starts. Link `client` → People and optionally `housing_chart` → Housing Advisory. Put the deal on **Active Transactions** — never mix deal stages into Lead Pipeline.

## Sync rules

Sync when:

- Email or phone provided
- Lead becomes profiled / score changes materially (≥8 points)
- Timeline changes
- Call requested
- Assessment completed
- Consultation / advisor review created
- Manual admin resync

Each sync bundle upserts Person + Housing, updates stage fields, and asserts list membership (Lead vs Current Clients).

Do **not** sync every chat message. Local chat history is stored; Attio receives summaries and profile changes.

## Tasks (deduped)

Created when:

- Call requested
- Lead score crosses 80
- Timeline moves under six months
- User indicates readiness to act
- Quarterly review due / completed

Open tasks with the same `dedupeKey` are not re-queued.

## Admin companion

`/admin/clients` is a lightweight monitoring layer:

- Search / filter clients
- View AI summary + conversation
- View Attio sync logs
- Open Attio record
- Assign advisor, add notes, force resync, mark stage

Attio remains the operational CRM.

## Webhooks (Phase 2+)

`ATTIO_WEBHOOK_SECRET` is reserved for verifying inbound Attio webhooks (stage changes, task completion). Not required for outbound Phase 1 sync.

## Migration

```bash
# Ensure DATABASE_URL is set, then push schema
npm run db:push

# Optional seed
npx tsx scripts/seed-advisory.ts
```

See [ADVISOR-OS.md](../architecture/ADVISOR-OS.md) for full system notes.
