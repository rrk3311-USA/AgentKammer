# Notion CRM — sync contract

**Status:** Accepted direction · sync implementation **Planned** (optional no-op stub in code)  
**Parent Notion page:** [Agent Kammer — CRM Command Center](https://www.notion.so/39d0ad628ae581e595f8c4fb49874b89)  
**Related:** [`docs/admin/ADMIN-COMMAND-CENTER.md`](../admin/ADMIN-COMMAND-CENTER.md)

---

## Hard rules

1. **Website database is source of truth** for identity, chat memory, analytics, automation, and lead scores.
2. **Notion is a private human admin / CRM workspace** — not the only database.
3. **Direction (v1):** website → Notion **only** (one-way). Do not write Notion edits back to the website yet.
4. Missing `NOTION_*` env must be a **no-op** — never break production capture.

---

## Sync direction

```txt
Website (Postgres / MemStorage)
  → create/update Person
  → attach Conversation
  → attach Lead / Opportunity
  → optional Task / Follow-up
Notion CRM Command Center
```

No Notion → website writes in v1.

---

## Payload fields (lead / person sync)

| Field | Notion property (typical) | Notes |
|-------|---------------------------|--------|
| Name | Name (title) | Required when known |
| Email / phone | Email · Phone | Match key for upsert when possible |
| Source page | Source page (URL) | Landing / brief / hub path |
| Decision Guide summary | Decision Guide summary | Short narrative from guide |
| Goals | Goals | From profile / chat extraction |
| Timeline | Timeline | Move / buy / sell timing |
| Budget | Budget | Range or financing note |
| Neighborhoods / buildings | Neighborhoods / buildings | Free text or later Buildings relation |
| Lead score | Lead score (number) | From website strategy score |
| Pipeline stage | Pipeline stage | New Signals → … → Active |
| Recommended next action | Recommended next action | Operator-facing — after Discovery Call, prefer Blueprint delivery or the Blueprint’s own next step (see below) |
| Last activity | Last activity (date) | Recency |
| Full conversation link | Full conversation link (URL) | Admin or deep link when available |

Also store opaque website IDs (`Website person / lead ID`, `Website conversation / session ID`, `Website lead ID`) for idempotent upserts.

### Recommended next action ↔ Decision Blueprint™

Canonical post–call deliverable: **Decision Blueprint™** (not a “proposal”). Spec + fill-in template: [`docs/product/DECISION-BLUEPRINT.md`](../product/DECISION-BLUEPRINT.md).

Notion (under CRM Command Center):
- [Guide & Recap](https://www.notion.so/39d0ad628ae581158d9dc26128a751ea) — operator/advisor explanation
- [Template](https://www.notion.so/39d0ad628ae581dcae58c4b4bf93585a) — fill-in client deliverable

| Stage | Typical Recommended next action |
|-------|----------------------------------|
| Call booked / just completed | `Deliver Decision Blueprint™` |
| Blueprint delivered | Use §6 of the Blueprint (one action) — e.g. Building Report, tour shortlist, wait, renovate first, offer strategy |
| Earlier (pre-call) | Decision Guide follow-up · schedule Discovery Call |

When creating a Task / Follow-up from Recommended next action after a Discovery Call, title it for Blueprint delivery first, then for the Blueprint’s recommended next step.

---

## On new lead (behavior)

When the website creates or meaningfully updates a lead:

1. **Create or update Person** in Notion People (match on email, else phone, else website ID).
2. **Attach Conversation** — create/update Conversations row linked to Person; store summary + full conversation link.
3. **Attach Opportunity** — create/update Leads / Opportunities row linked to Person with score, stage, goals, next action.
4. **Optional:** create Tasks / Follow-ups from Recommended next action (Status = Todo) — including Blueprint delivery after Discovery Call.

Failures in Notion sync must log and swallow — website lead create always succeeds.

---

## Recommended Notion databases

Live under [CRM Command Center](https://www.notion.so/39d0ad628ae581e595f8c4fb49874b89):

| Database | URL | Role |
|----------|-----|------|
| People | https://www.notion.so/233b84f2bff24522931e5590dd8e7978 | Person mirror |
| Leads / Opportunities | https://www.notion.so/0af191292e724a5d8228eb5d5a36a522 | Pipeline |
| Conversations | https://www.notion.so/58314fe9b56c4d239286d56e2b49ecff | Chat mirrors |
| Tasks / Follow-ups | https://www.notion.so/a6dd97d9ed8744ba925daddccb80976c | Human queue |
| Buildings | https://www.notion.so/2e273bebb5d647d3b736ac405abd1846 | Lightweight catalog |
| Decision Briefs | https://www.notion.so/d4fccff04707422e87d2055540913f3d | Lightweight catalog |

**Relations (live):** People ↔ Leads / Opportunities · People ↔ Conversations · People ↔ Tasks / Follow-ups.

**Legacy (do not treat as SoT):** [Agent Kammer CRM](https://www.notion.so/5f8b080aec32422e99df191be91d1aa8) — older flat CRM; keep for historical contacts; prefer the new DBs for website sync.

### Test / seed data

Manual QA seed rows use a **`[TEST]` name/title prefix** (no dedicated Test checkbox on these DBs). Fake emails use `test+*@agentkammer.dev`. Website IDs look like `test-person-*`, `test-lead-*`, `test-session-*`.

**Identify:** In each CRM database, filter or search Name for `[TEST]`.

**Delete:** Multi-select matching `[TEST]` rows in People, Leads / Opportunities, Conversations, Tasks / Follow-ups, Buildings, and Decision Briefs → Delete / Move to trash. Deleting a Person does not auto-delete linked Lead/Conversation/Task rows — clear those DBs too (or delete by the same `[TEST]` prefix).

---

## Property schemas (reference)

### People

Name (title), Email, Phone, Kind (visitor/contact/lead/opportunity/client), Source page, Decision Guide summary, Goals, Timeline, Budget, Neighborhoods / buildings, Lead score, Pipeline stage, Recommended next action, Last activity, Full conversation link, Website person / lead ID · plus relation back-links from Leads / Conversations / Tasks.

### Leads / Opportunities

Name, Person (relation), Email, Phone, Source page, Decision Guide summary, Goals, Timeline, Budget, Neighborhoods / buildings, Lead score, Pipeline stage, Recommended next action, Last activity, Full conversation link, Website lead ID.

### Conversations

Name, Person (relation), Source page, Decision Guide summary, Goals, Timeline, Budget, Neighborhoods / buildings, Lead score, Last activity, Full conversation link, Website conversation / session ID.

### Tasks / Follow-ups

Name, Person (relation), Status (Todo/Doing/Done/Skipped), Due, Recommended next action, Pipeline stage, Full conversation link, Last activity.

### Buildings (lightweight)

Name, Neighborhood, Address, Website building / slug, Notes, URL.

### Decision Briefs (lightweight)

Name, Slug / path, Topic, URL, Notes.

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NOTION_API_KEY` | Integration secret (never commit) |
| `NOTION_PEOPLE_DATABASE_ID` | People DB id |
| `NOTION_LEADS_DATABASE_ID` | Leads / Opportunities DB id |
| `NOTION_CONVERSATIONS_DATABASE_ID` | Conversations DB id |
| `NOTION_TASKS_DATABASE_ID` | Tasks / Follow-ups DB id (optional) |
| `NOTION_SYNC_ENABLED` | Optional explicit `"true"` gate; if unset, sync runs only when API key + People + Leads IDs are present |

When keys/IDs are missing, `server/lib/notion-crm.ts` no-ops.

---

## Code hook

- Stub: `server/lib/notion-crm.ts` — `syncLeadToNotion(payload)` no-ops unless configured.
- Call site (TODO): after successful `storage.createLead` / lead update in Decision Guide / contact paths — fire-and-forget, never throw to the client.

---

## Explicit non-goals (v1)

- Notion as source of truth
- Two-way sync / Notion write-back to website
- Heavy `/admin` CRM UI to replace Notion
- Replacing Telegram/email alerts (Notion complements them)
