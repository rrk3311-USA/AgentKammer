# Belonging Assessment

**Status:** Product brief (spec first; build next)  
**Position in journey:** public front door — before Discovery Call  
**Tone:** diagnostic · advisory · life-first — not a quiz gimmick or valuation funnel

**Canonical name:** Belonging Assessment  
**Public promise:** Find out if you’re living where you belong.  
**Visitor artifact:** Decision Profile (report)  
**Internal artifact:** Decision Quality Score + opportunity routing

**Related**

- Brand: [`docs/brand/AGENT-KAMMER-BRAND.md`](../brand/AGENT-KAMMER-BRAND.md) — two-question spine, outcome vs diagnostic
- Next deliverable: [`docs/product/DECISION-BLUEPRINT.md`](./DECISION-BLUEPRINT.md)
- Architecture: [`docs/architecture/SYSTEM-DESIGN.md`](../architecture/SYSTEM-DESIGN.md)

---

## Product decision

Insert at the start of the client journey:

```txt
Belonging Assessment
  → Decision Profile (visitor) + Decision Quality Score (internal)
  → Discovery Call (when warranted)
  → Decision Blueprint™
  → Building Intelligence / Search
  → …
```

| Stage | Role |
|-------|------|
| **Belonging Assessment** | Free diagnostic — life fit, not listing filters |
| **Decision Profile** | Personalized report the visitor receives by email |
| **Decision Quality Score** | Internal — help-worthiness and follow-up routing |
| **Discovery Call** | Human synthesis when the profile warrants it |
| **Decision Blueprint™** | Written decision state after the call |

This is the product. Not “book a call.” Not “get a home valuation.” The AI is the first diagnostician of an advisory practice.

---

## What it is / what it is not

| Is | Is not |
|----|--------|
| A life-fit diagnostic | A personality quiz for entertainment |
| Personalized report with a clear next step | Generic “your home style is…” copy |
| Decision-profile builder for the advisor | A contact form with extra fields |
| Help-worthiness scoring for follow-up | Close-likelihood CRM only |
| Outcome-aligned with Live Where You Belong | A “you should move” funnel |
| Free email assessment (3–5 minutes) | Paid lead magnet or gated brochure |

**Brand rule:** “Are you living where you belong?” is the **diagnostic**. “Live Where You Belong” is the **outcome / tagline**. Do not conflate them in UI.

---

## Two questions the assessment serves

1. **Should anything change?** — Sometimes no.
2. **Are you living where you belong?** — Even if nothing changes, is the environment still serving who they want to become?

Valid recommendations: stay · renovate · rent · buy · sell · wait · do nothing yet.

---

## Visitor experience

### Promise

> Find out if you’re living where you belong.

### Format

- **12–20 questions**
- **3–5 minutes**
- Email capture at start or end (prefer end after value is clear, or soft gate before report delivery)
- Mobile-first; calm, editorial UI — Brand DNA, not “quiz app”

### Question domains (life — not real estate filters)

Questions should feel like counsel, not lead qualification theater. Cover:

| Domain | Example prompts |
|--------|-----------------|
| Change | What’s changing in your life right now? |
| Friction | What drains you about where you live? |
| Love | What do you love and would miss? |
| Ease | What do you wish your home made easier? |
| Time | Where do you spend most of your time? |
| Social | How often do you host — and does the space support it? |
| Horizon | If nothing changed for 5 years, would you be happy? |
| Ideal day | What’s your ideal Saturday? |
| Priorities | What matters most: time, views, privacy, walkability, space, prestige, schools, flexibility? |
| Readiness | How ready do you feel to decide anything — from 1–5? |
| Constraints | Rough timeline, budget confidence, ownership vs rent (light touch) |

Avoid leading with beds/baths, Zillow-style filters, or “are you a buyer or seller?” as question one.

---

## Visitor output — Decision Profile

Delivered as a personalized report (email + on-site / account later).

### Structure

```txt
Are You Living Where You Belong?

Belonging Score: NN/100

Strengths
  • …
  • …

Friction
  • …
  • …

Recommendation
  One clear posture + horizon
  e.g. Stay for now; begin planning a move within 18–24 months.
```

### Recommendation vocabulary (use these)

Stay · Renovate · Rent · Buy · Sell · Wait · Do nothing yet  
(Combinations allowed: stay-and-renovate, wait-then-buy, etc.)

### Tone of the report

- Measured, specific, adult
- No manufactured urgency
- No “dream home” language
- One recommended posture — not a menu of services to upsell

---

## Internal output — Decision Quality Score

The visitor never sees this layer as “lead scoring.” Ops and AI use it to answer:

> How much can Agent Kammer genuinely help this person?

Often overlaps with transaction readiness — **not the same**.

### Profile fields (quietly built)

| Field | Purpose |
|-------|---------|
| Life stage | Context for advice |
| Decision readiness | Act / explore / not ready |
| Budget confidence | High / medium / low / unknown |
| Timeline | e.g. 0–3 mo · 3–6 · 6–18 · 18–24 · none |
| Motivations | Lifestyle, life change, financial, family, relocation… |
| Trade-offs | What they’ll sacrifice vs protect |
| Building preferences | Light signals only at this stage |
| Neighborhood preferences | Light signals only at this stage |
| Personality / decision style | Deliberate, urgent, collaborative… |
| Confidence level | How sure they are of their own answer |
| Referral potential | Internal signal |
| Help-worthiness | Core score — can we add real judgment? |

### Decision Quality Score (example shape)

```txt
Decision Quality Score: NN/100

• Ready to act / Exploring / Not ready
• Timeline: …
• Budget confidence: …
• Motivation: …
• Decision complexity: Low / Medium / High
• Referral potential: …
• Likelihood they’ll value advice: …
```

### Follow-up routing

| Signal | Action |
|--------|--------|
| High help-worthiness + ready | Call within 24 hours |
| High complexity + exploring | Send educational content; offer call |
| Strong fit, long horizon | Quarterly check-in |
| Low help-worthiness / no need | No follow-up needed — still leave the report valuable |

**CRM shift:** Most CRMs ask “How likely are they to buy?” This system asks “How much can I genuinely help?” Route on the second question.

---

## Email delivery

1. Immediate: Decision Profile summary + Belonging Score + recommendation
2. Optional sequence (nurture only when routing says so): short notes tied to their friction points — not listing alerts
3. Clear path to Request a call / Begin the decision when ready

Assessment answers + scores feed the advisor brief before any Discovery Call so the call starts from a known decision profile.

---

## Success metrics

Optimize for:

- Completed assessments (not bounce vanity)
- Report open / revisit rate
- “This was useful” signal (optional one-tap)
- Discovery Calls that start already oriented
- Decisions that include stay / wait / renovate as wins
- Follow-up precision (call the right people; leave others alone)

Do **not** optimize for:

- Raw lead volume
- Forced buyer/seller labeling
- Valuation-form conversion rates

---

## Build notes (implementation later)

| Layer | Direction |
|-------|-----------|
| Frontend | Multi-step form; Brand DNA; progress without gamification chrome |
| AI | Trained on Agent Kammer objectives + brand philosophy; outputs visitor report + internal profile JSON |
| Storage | Persist answers, scores, routing; link to contact / CRM (Notion or Hub) |
| Privacy | Clear consent; advisory use of data; no selling of leads |
| Auth | Phase 1: email magic / anonymous + email; Phase 2: account memory |

Out of scope for v1: full Building Intelligence, listing search, automated broker matching.

---

## Copy anchors

**CTA:** Find out if you’re living where you belong.  
**Report title:** Are You Living Where You Belong?  
**Method line (optional, never as brand name):** I diagnose housing decisions before recommending solutions.  
**Avoid:** House Doctor · free home valuation · take our fun quiz · dream home score

---

## Open decisions (resolve before build)

1. Email gate: before questions vs before report delivery  
2. Exact question bank (12–20) and scoring rubric  
3. Belonging Score formula vs narrative-only first version  
4. ~~Where the CTA lives first~~ → `/belonging` (homepage + header + shared CTA)  
5. CRM write path: Notion CRM vs Hub module first

**Shipped front door (July 2026):** `/belonging` editorial page + intake via `/contact?intent=belonging` until the scored AI quiz ships.

---

*Last updated: July 2026 · Spec precedes build. Align with brand two-question spine and Decision Blueprint journey.*
