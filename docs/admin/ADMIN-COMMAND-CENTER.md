# Agent Kammer — Admin Command Center

**Version:** 2.0 Internal  
**Accepted pivot:** Notion Command Center first · `/admin` stays light/dev  
**Mindset:** Operational brain of Decision OS — Person-centric, advisor-first. Humans run CRM in Notion; the website remains the capture system and source of truth.

**Related docs**

- [Notion CRM sync contract](../integrations/notion-crm.md)
- [Decision Blueprint™ (post–Housing Strategy Session deliverable)](../product/DECISION-BLUEPRINT.md)
- [Admin portal (implementation notes)](../admin-portal.md)
- [Architecture review (Decision OS)](../architecture/ARCHITECTURE-REVIEW.md)
- [System design](../architecture/SYSTEM-DESIGN.md)

**Notion workspace**

- [Admin Command Center](https://www.notion.so/39d0ad628ae58164b52ff2b0e1d3a4a8)
- [CRM Command Center](https://www.notion.so/39d0ad628ae581e595f8c4fb49874b89) (People, Leads, Conversations, Tasks, Buildings, Decision Briefs)
- [Decision Blueprint™ — Guide & Recap](https://www.notion.so/39d0ad628ae581158d9dc26128a751ea)
- [Decision Blueprint™ — Template](https://www.notion.so/39d0ad628ae581dcae58c4b4bf93585a)

**Status legend:** **Live** = shipped · **Partial** = present but incomplete · **Planned** = not shipped · **Notion** = operator surface lives in Notion (not a heavy `/admin` rebuild)

---

## Accepted product decision

| Layer | Role |
|-------|------|
| **Website DB** | **Source of truth** — identity, chat memory, analytics, automation, lead scores |
| **Notion** | **Private human admin / CRM workspace** — triage, pipeline notes, follow-ups |
| **`/admin`** | **Light / dev** — diagnostics, pipeline peek, strategy scoring. Do **not** invest in a heavy admin portal now |

Sync (v1): **website → Notion (one-way)**. Notion is **not** the only database and must never become SoT. Full payload + DB contract: [`docs/integrations/notion-crm.md`](../integrations/notion-crm.md).

---

## How it works

```txt
Visitor → Website capture (SoT)
       → Person / lead / conversation / score persisted
       → (optional) one-way sync → Notion Person + Conversation + Opportunity
       → Human follow-up in Notion Tasks / Leads
```

1. Website captures Decision Guide / contact / chat signals into Postgres (or MemStorage in preview).
2. When `NOTION_*` env is configured, sync creates/updates Notion **People**, attaches **Conversations** + **Leads / Opportunities**, and can open a **Task / Follow-up**.
3. Without Notion keys, capture still works; sync is a no-op (production must not break).
4. Operators live in Notion CRM Command Center. `/admin` remains a secondary peek for scoring and storage mode.

---

## Surfaces

| Surface | Audience | Investment |
|---------|----------|------------|
| Notion CRM Command Center | Owner / advisor ops | **Primary** |
| `/admin` | Dev / light ops peek | **Minimal** — keep working, avoid large UI rebuilds |
| Public site | Prospects | Capture + Decision OS |

---

## Notion CRM modules (primary)

| Module | Notion DB | Status |
|--------|-----------|--------|
| People | People | **Notion** (schema live) |
| Pipeline | Leads / Opportunities | **Notion** (schema live) |
| Conversations | Conversations | **Notion** (schema live) |
| Follow-ups | Tasks / Follow-ups | **Notion** (schema live) |
| Buildings (catalog) | Buildings | **Notion** (lightweight) |
| Decision Briefs (catalog) | Decision Briefs | **Notion** (lightweight) |
| Website → Notion sync | — | **Planned** (stub may exist; full sync later) |

Relations: People ↔ Leads / Opportunities · People ↔ Conversations · People ↔ Tasks / Follow-ups.

---

## `/admin` (light / dev)

**Status:** Keep as diagnostics; do not expand into a full CRM OS UI.

Current useful tabs: **Pipeline** · **Funnel** · **Signals** · **People** (read-oriented aggregation from website SoT).

| Module | Status on `/admin` |
|--------|--------------------|
| Dashboard (Today’s Activity) | **Live** (keep) |
| People | **Partial** — prefer Notion for human CRM |
| Decision Intelligence (score) | **Partial** |
| Pipeline stages (computed) | **Live** (read-only) |
| Timeline / Building admin / AI Monitor / Comms inbox | **Planned** — prefer Notion + later product Hub, not a heavy `/admin` |

Rules: `shared/crm-pipeline.ts` · Aggregation: `server/lib/admin-intelligence.ts`

---

## People (contract)

People are the unit of truth on the **website**. Notion People rows are mirrors for human ops.

Identity ladder (do not collapse prematurely):

```txt
visitor → contact → lead → opportunity → client
```

Target: one **Person** with aliases; everything else attaches to the Person ([ARCHITECTURE-REVIEW](../architecture/ARCHITECTURE-REVIEW.md) P0).

Payload fields mirrored to Notion (see sync contract): Name, Email/phone, Source page, Decision Guide summary, Goals, Timeline, Budget, Neighborhoods/buildings, Lead score, Pipeline stage, Recommended next action, Last activity, Full conversation link.

**Recommended next action (advisor journey):** after Housing Strategy Session, next action should be **Deliver Decision Blueprint™** (or the Blueprint’s §6 step once delivered). Do not label this a “proposal.” Journey: Decision Guide → Housing Strategy Session → Decision Blueprint™ → Building Intelligence / Search → … Full contract: [`docs/product/DECISION-BLUEPRINT.md`](../product/DECISION-BLUEPRINT.md).

---

## Pipeline stages

```txt
New Signals → Engaged → Profiled → Qualified → Call Ready → Active
```

Computed on website for scoring / `/admin` peek. Human stage notes and next actions live primarily in Notion until durable `pipeline_opportunities` write-back exists. **Call Ready → Active** typically includes Housing Strategy Session + Decision Blueprint™ delivery before heavy search.

---

## Login Recommendation

Do **not** use a fixed short numeric PIN (e.g. 5-digit like `312155`) — too weak for an internet-facing admin surface.

| Environment | Recommendation |
|-------------|----------------|
| **Dev** | Username `admin` + a long random passphrase (**20+ characters**) in env vars `ADMIN_USER` / `ADMIN_PASS` |
| **Prod (until Google)** | Keep HTTP Basic Auth or a strong password — **never** a short PIN |
| **Prod (long-term)** | Google Sign-In restricted to the owner account + optional 2FA |

Local non-production defaults (`admin` / `kammer` when unset) are for convenience only. Production refuses admin auth until `ADMIN_USER` and `ADMIN_PASS` are set. See [admin-portal.md](../admin-portal.md) → Auth security.

Google OAuth for admin is a **docs/roadmap** item — not required to implement for this version. Prefer Notion (private workspace auth) for day-to-day CRM until then.

---

## What we are explicitly not doing now

- Building a heavy new admin UI
- Making Notion the source of truth
- Changing short PIN auth beyond what is already documented above

---

## Module status summary

| Module | Primary surface | Status |
|--------|-----------------|--------|
| CRM People / Leads / Tasks | Notion | **Notion** schema live; sync **Planned** |
| Dashboard peek | `/admin` | **Live** |
| Decision Intelligence (score) | Website + `/admin` peek | **Partial** |
| Timeline | Hub (product) / later | **Planned** |
| Building Intelligence | Product + Notion catalog | **Partial** / lightweight Notion |
| Decision Blueprint™ | Docs + Notion Guide & Template; Hub module later | **Planned** (human deliverable ready) |
| AI Monitor | Later | **Planned** |
| Communications | Notion Tasks + Telegram/email alerts | **Partial** |
| System Health | `/admin` storage mode | **Partial** |
| Business KPIs | Later | **Partial** / **Planned** |
