# Agent Kammer Decision Blueprint™

**Status:** Spec + client-ready template (docs first; Hub module **Planned**)  
**Position in journey:** post–Discovery Call deliverable  
**Tone:** advisor-first · Decision Intelligence · not a sales proposal

**Canonical name:** Decision Blueprint™  
**Aliases (same artifact):** Strategic Recommendation · Executive Decision Brief  

Do **not** call this a “proposal.” It is a decision artifact — clarity before search, not a pitch deck.

**Related**

- Front door diagnostic: [`docs/product/BELONGING-ASSESSMENT.md`](./BELONGING-ASSESSMENT.md)
- Hub module alignment: [`docs/architecture/ARCHITECTURE-REVIEW.md`](../architecture/ARCHITECTURE-REVIEW.md) · [`docs/architecture/SYSTEM-DESIGN.md`](../architecture/SYSTEM-DESIGN.md)
- Ops / next action: [`docs/integrations/notion-crm.md`](../integrations/notion-crm.md) · [`docs/admin/ADMIN-COMMAND-CENTER.md`](../admin/ADMIN-COMMAND-CENTER.md)
- Notion (shareable):
  - [Decision Blueprint™ — Guide & Recap](https://www.notion.so/39d0ad628ae581158d9dc26128a751ea) — why it exists, journey, sections, ops
  - [Decision Blueprint™ — Template](https://www.notion.so/39d0ad628ae581dcae58c4b4bf93585a) — fill-in client deliverable
  - Both live under [CRM Command Center](https://www.notion.so/39d0ad628ae581e595f8c4fb49874b89)

---

## Product decision

Insert in the client journey:

```txt
Belonging Assessment → Decision Profile → Discovery Call → Decision Blueprint™ → Building Intelligence / Search → …
```

| Stage | Role |
|-------|------|
| **Belonging Assessment** | Free diagnostic — are you living where you belong? Spec: [`BELONGING-ASSESSMENT.md`](./BELONGING-ASSESSMENT.md) |
| **Decision Profile** | Visitor report + internal Decision Quality Score (help-worthiness routing) |
| **Decision Guide / Guidance Advisor** | Early clarity — what changed, constraints, options to consider |
| **Discovery Call** | Human synthesis — goals, risk tolerance, timeline, building vs life trade-offs (starts from the Decision Profile when available) |
| **Decision Blueprint™** | Written decision state — situation, key decisions, lens, path, next step |
| **Building Intelligence / Search** | Evidence and shortlist after the decision frame is set |

**Hub module:** Decision Blueprint is already listed as **Planned** on the life-decision workspace. This doc is the content contract for that module and for human-delivered Blueprints today (Markdown / Notion / PDF later).

---

## What it is / what it is not

| Is | Is not |
|----|--------|
| A Decision Intelligence artifact after Discovery | A listing packet or CMA |
| Structured decision state the client can revisit | A “proposal” or retainer pitch |
| Evidence-backed (ICC, construction, envelope, BIS™) | Credentials theater |
| One clear recommended next step | A menu of services to upsell |

---

## Contents (six sections)

Every Blueprint uses these headings in order.

| # | Section | Job |
|---|---------|-----|
| 1 | **Your Situation** | What’s changing, goals, constraints |
| 2 | **Key Decisions** | Stay / Move / Renovate / Wait / Invest |
| 3 | **Building Intelligence Lens** | What matters, risks, trade-offs |
| 4 | **How We Work** | Pipeline from clarity → ownership |
| 5 | **Why Agent Kammer** | Philosophy, not credentials |
| 6 | **Recommended Next Step** | One clear action |

### Section notes

**1. Your Situation** — Life change, housing goals, hard constraints (budget, timeline, schools, board, financing, insurance appetite, renovation appetite). Mirror language from Decision Guide + Discovery Call; no fluff.

**2. Key Decisions** — Name the live forks. Typically a primary path plus what would change the recommendation. Options: Stay · Move · Renovate · Wait · Invest (or combinations, e.g. renovate-then-wait).

**3. Building Intelligence Lens** — What building attributes matter *for this client*, not generic luxury talk. Use content-as-proof (below) as evidence inside the Blueprint.

**4. How We Work** — Always include the full pipeline so the client sees where Blueprint sits:

```txt
Belonging Assessment
  → Decision Guide
  → Discovery Call
  → Decision Blueprint™
  → Building Intelligence™
  → Property Search
  → Building Reports
  → Decision Memo
  → Offer Strategy
  → Negotiation
  → Closing
  → Ownership Intelligence
```

**5. Why Agent Kammer** — Philosophy only. Prefer these pillars:

- Buildings Before Listings
- Decisions Before Emotions
- Insurance protects events. Buildings determine outcomes.
- Building Intelligence™ / Decision Intelligence™
- Long-term advisor, not transaction-first

**6. Recommended Next Step** — Exactly one primary action. Examples: commission a Building Report · tour a shortlist · wait six months · renovate first · make an offer · deepen Building Intelligence on 2–3 candidates. Optional secondary “if X changes” note only when it clarifies the primary step.

---

## Content as proof (evidence inside the Blueprint)

Use published / practiced Building Intelligence as *evidence*, not as blog promotion:

| Evidence type | How it shows up in a Blueprint |
|---------------|--------------------------------|
| **ICC / inspection literacy** | Framing inspection scope, red flags, what “pass” does not mean for ownership outcomes |
| **Construction types** | Fit to risk tolerance, insurance reality, renovation feasibility |
| **Envelope** | Comfort, durability, water/air/thermal risk — especially for wait vs buy vs renovate |
| **Structural systems** | What can be changed vs what is permanent; noise, layout, alteration limits |
| **Insurance vs buildings** | “Insurance protects events. Buildings determine outcomes.” — map to this client’s exposure |
| **Building Intelligence Score™ (BIS™)** | Comparative lens across shortlist; not a vanity score — decision support |

If a specific building is already in play, cite the relevant Building Report section or BIS™ factors. If not, name the *classes* of evidence that will decide Stay / Move / Renovate / Wait / Invest.

---

## Delivery & ops

| Channel | Status |
|---------|--------|
| Markdown template (this file) | **Live** (operator fill-in) |
| Notion template page | Preferred ops surface under CRM Command Center |
| Hub module (client-facing) | **Planned** |
| Public marketing page | **Out of scope** for now |

**CRM:** After Discovery Call, set **Recommended next action** to Blueprint delivery or the Blueprint’s own next step (e.g. “Deliver Decision Blueprint™” → then “Building Report: {building}”). See Notion CRM sync contract.

---

## Fill-in template (client-ready Markdown)

Copy from the line below. Replace bracketed prompts. Keep headings. Keep philosophy section short.

```markdown
# Decision Blueprint™
**Prepared for:** [Client name(s)]  
**Date:** [YYYY-MM-DD]  
**Discovery Call:** [Date]  
**Prepared by:** Agent Kammer  

*Also known as: Strategic Recommendation / Executive Decision Brief*  
*This is a decision artifact — not a proposal.*

---

## 1. Your Situation

**What’s changing**
- [Life / work / family / ownership change]

**Goals**
- [What the next chapter of housing must do better]

**Constraints**
- Timeline: […]
- Budget / financing: […]
- Geography / buildings: […]
- Non-negotiables: […]
- Soft preferences: […]

---

## 2. Key Decisions

| Decision | Status for you | Notes |
|----------|----------------|-------|
| Stay | [Primary / Secondary / Off] | […] |
| Move | […] | […] |
| Renovate | […] | […] |
| Wait | […] | […] |
| Invest | […] | […] |

**Working thesis**
[1–3 sentences: the decision frame we will hold until new evidence changes it.]

**What would change this**
- [Trigger A]
- [Trigger B]

---

## 3. Building Intelligence Lens

**What matters most for this decision**
1. […]
2. […]
3. […]

**Risks to watch**
- […]

**Trade-offs we accept / refuse**
- Accept: […]
- Refuse: […]

**Evidence we will use** *(content as proof — not marketing)*
- Construction type / structural system: […]
- Envelope / durability / comfort: […]
- Insurance vs building outcomes: […]
- ICC / inspection literacy applied how: […]
- Building Intelligence Score™ factors (if shortlist exists): […]

---

## 4. How We Work

```txt
Belonging Assessment
  → Decision Guide
  → Discovery Call
  → Decision Blueprint™   ← you are here
  → Building Intelligence™
  → Property Search
  → Building Reports
  → Decision Memo
  → Offer Strategy
  → Negotiation
  → Closing
  → Ownership Intelligence
```

[Optional one sentence on which stage is next and why.]

---

## 5. Why Agent Kammer

- **Buildings Before Listings** — the building frames the unit, not the other way around.
- **Decisions Before Emotions** — clarity first; tours and offers after the frame is set.
- **Insurance protects events. Buildings determine outcomes.**
- **Building Intelligence™ / Decision Intelligence™** — evidence over inventory theater.
- **Long-term advisor, not transaction-first.**

---

## 6. Recommended Next Step

**Primary action:** [One clear step — e.g. Building Report on X · tour shortlist of N · wait until DATE · renovate first · prepare offer strategy]

**Owner:** [Client / Agent Kammer / Shared]  
**Timing:** [When]  
**Success looks like:** [One sentence]

**If conditions change:** [Optional — only if it clarifies the primary step]
```

---

## Naming glossary (avoid confusion)

| Term | Meaning |
|------|---------|
| **Decision Guide** | Live AI companion / early conversation |
| **Decision Brief** | Public service / niche landing content (SEO + education) |
| **Decision Blueprint™** | Post–Discovery Call personal decision artifact (this doc) |
| **Decision Memo** | Later-stage memo before offer / major commitment |
| **Building Report** | Building-level interpretation (evidence for Blueprint & search) |

---

## Acceptance checklist (operator)

- [ ] Six sections present; no “proposal” language  
- [ ] Key Decisions name Stay / Move / Renovate / Wait / Invest explicitly  
- [ ] Building Intelligence Lens cites at least one proof class (ICC, construction, envelope, structure, insurance-vs-buildings, BIS™)  
- [ ] How We Work pipeline included with Blueprint marked as current  
- [ ] Why Agent Kammer is philosophy-only  
- [ ] Exactly one Recommended Next Step  
- [ ] CRM Recommended next action updated to match delivery or next step  
