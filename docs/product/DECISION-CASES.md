# Decision Cases — the mental model behind the Decision Hub

**Status:** Strategic framing, adopted now. Schema migration deferred (see below).  
**Philosophy:** We store **Cases**, not "users." A user is a login. A Case is a housing decision in progress.

## Why this matters

Agent Kammer's category is **Decision Intelligence for Housing** — not "AI Real Estate Advisor," not a chatbot. The competitive frame is wealth advisors, executive coaches, McKinsey-style consultants, and concierge relocation firms — not Zillow-style agent tools. Those categories don't have "user accounts" with dashboards; they have **client files** and **engagements**. Agent Kammer's product language should read the same way: a private advisor who remembers your Case, not software that manages your account.

See [`docs/brand/AGENT-KAMMER-BRAND.md`](../brand/AGENT-KAMMER-BRAND.md) for the full brand lock and vocabulary table.

## The Case model

Every visitor who saves progress is opening a **Case** — a single housing decision, tracked over time, with its own shape:

| Field | What it holds |
|-------|---------------|
| **Case type** | e.g. Executive Relocation, Downsizing, First Purchase, Rent vs. Buy, Estate Sale |
| **Status** | Exploring · Active · Awaiting Decision · Resolved |
| **Research** | Buildings, neighborhoods, and briefs reviewed so far |
| **Decision Confidence** | Internal read on how close the client is to a clear answer (not shown as a raw "lead score" to the client) |
| **Primary Goal** | The life outcome the decision serves (e.g. "settle before school year," "reduce housing cost," "buy once, buy right") |
| **Tradeoffs** | The constraints and trade-offs surfaced in conversation (budget vs. space, commute vs. quiet, now vs. wait) |
| **Buildings** | Buildings or listings under active consideration |
| **Last Recommendation** | The most recent Decision Recap / recommendation brief sent |

This is the shape a Case should present in — on the Decision Hub UI, in admin/CRM tooling, and in future exports — regardless of what the underlying table is called today.

## Cases vs. users

| Users (avoid) | Cases (use) |
|----------------|--------------|
| Sign up, log in | Chat freely, save by email, resume with PIN |
| Account created | Case opened |
| Profile fields | Decision Map (situation, desire, constraints, trade-off, recommendation) |
| Dashboard | Decision Hub — one Case, front and center |
| Session / login history | Decision History — recommendation briefs and recaps over time |

A visitor can explore anonymously indefinitely; nothing is "created" until they choose to save. Once saved, what exists is a **Case** — not a user record with a password.

## Auth stays as-is

This document does **not** change the auth model. Email + PIN, httpOnly cookies, and the recovery layers described in [`docs/product/ACCOUNT-AUTH.md`](./ACCOUNT-AUTH.md) are unchanged. This is a **framing and vocabulary** layer on top of that model — see the vocabulary table there for the exact public-UI terms.

## Deferred (explicitly out of scope for this pass)

- **Schema rename.** `member_profiles` (see `shared/schema.ts`) remains the underlying table. Do not rename `memberProfiles` → `cases` yet — that touches `server/storage.ts`, `server/routes.ts`, `server/lib/claim-account.ts`, and the DB migration path. Plan as a future engineering task once the vocabulary has settled in production copy.
- **Magic links.** Referenced as "planned" in `ACCOUNT-AUTH.md`; still not implemented.
- **Case-type classification.** Nothing today auto-labels a Case as "Executive Relocation" vs. "Downsizing" — that's a future enrichment on top of the existing Decision Map fields (`situation`, `desire`, `constraints`, `tradeOff`, `recommendation`).

## Related

- Brand lock: [`docs/brand/AGENT-KAMMER-BRAND.md`](../brand/AGENT-KAMMER-BRAND.md)
- Auth model: [`docs/product/ACCOUNT-AUTH.md`](./ACCOUNT-AUTH.md)
- Schema: `shared/schema.ts` (`memberProfiles` table)

---

*Last updated: July 2026*
