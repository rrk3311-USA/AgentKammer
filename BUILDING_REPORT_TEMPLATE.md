# Agent Kammer — Building Report Template

**Purpose:** Gold-standard structure for every building report. Write once, publish everywhere.  
**Reference:** `content/building-reports/lantern-house.md` · `client/src/data/building-reports.ts`  
**Companion:** `EDITORIAL_CALENDAR.md` · `DESIGN_SYSTEM.md`  
**Positioning:** *Agent Kammer is a Manhattan advisory practice focused on modern residential buildings.*

---

## What a Building Report Is

Interpretation — not inventory, not a listing roundup, not Zillow with better fonts.

> *Should a serious Manhattan client study this building — and for whom does it actually work?*

Each report becomes four assets at once:

| Channel | Format |
|---------|--------|
| **Website** | `/buildings/{slug}/report` |
| **Manhattan Brief** | Monthly digest excerpt — Executive Summary or one section |
| **Instagram** | Carousel per section; reel hook from Executive Summary |
| **SEO** | Canonical report page + linked Perspective article |

**Content moat pattern:** Publish the Building Report, then a related Perspective (e.g. Lantern House + *Why Some Luxury Buildings Have More Personality Than Others*). Cross-link both.

---

## Required Sections (14)

Every report uses these headings in this order. Do not add sections. Do not reorder.

| # | Section | Job |
|---|---------|-----|
| 1 | **Title block** | `{BUILDING NAME} REPORT` · Agent Kammer Building Report Series · neighborhood |
| 2 | **Executive Summary** | 3–5 short paragraphs. Thesis + why study this building now |
| 3 | **Observation** | The tension or distinction that makes this building interesting |
| 4 | **Building Profile** | Neighborhood · Building Type · Design · Positioning |
| 5 | **Resident Profile** | Likely residents + Less common |
| 6 | **What Makes {Building} Different** | 3–5 subsections (Architecture, Windows, Scale, etc.) |
| 7 | **Strengths** | 4–6 bullets — defensible advantages |
| 8 | **Tradeoffs** | 4–6 bullets + one closing line on fit |
| 9 | **Neighborhood Context** | What the micro-market combines |
| 10 | **Comparable Buildings** | 3–5 named comparables, two lines each |
| 11 | **Who This Building Fits** | Excellent · Moderate · Poor fit tiers |
| 12 | **Commute Perspective** | Typical access destinations + closing line |
| 13 | **Agent Kammer Perspective** | Editorial voice — the point of view |
| 14 | **Bottom Line** | Memorable close — personality, not summary |

---

## Section Guidance

### Executive Summary

Open with character, not amenities. End with a memorable line.

*Lantern House example:* "This is not the most efficient luxury building. It may be one of the most memorable."

### Observation

Name the tradeoff early. Charm vs exposure. Efficiency vs experience.

### What Makes {Building} Different

Building-specific subsections — not generic luxury copy. Each subsection: 2–3 sentences max.

### Tradeoffs

Always include a closing line:

> *A building should not be judged solely by strengths. The tradeoffs are often what determine fit.*

### Comparable Buildings

Two lines per comparable — what it does more of, what it does less of.

### Who This Building Fits

Three tiers: Excellent fit · Moderate fit · Poor fit. Be direct in Poor fit.

### Agent Kammer Perspective

This is editorial voice — not a recap. Answer: what is interesting about this building that listings do not convey?

### Bottom Line

Close with personality. *Lantern House example:* "A building with a personality."

---

## Report Metadata

```yaml
building: Lantern House
slug: lantern-house
series: Agent Kammer Building Report Series
location: West Chelsea, Manhattan
status: draft | review | published
target_publish: Q2 2026
read_minutes: 12–18
related_perspective_slug: why-some-luxury-buildings-have-more-personality-than-others
comparables:
  - one-high-line
  - 565-broome
  - 35-hudson-yards
```

---

## Voice & Rules

- Interpretation over inventory
- One building, one report
- Thesis headlines — not "Complete Guide to…"
- No portal language
- Pre-license safe — no salesperson, brokerage, or fair-housing boilerplate
- Strengths and Tradeoffs must balance
- Pair with a related Perspective when the building illustrates a broader idea

---

## Tier 1 Queue

| # | Building | Slug | Status |
|---|----------|------|--------|
| 1 | **Lantern House** | `lantern-house` | ✅ Published |
| 2 | **One High Line** | `one-high-line` | 🔴 Not started |
| 3 | **35 Hudson Yards** | `35-hudson-yards` | 🔴 Not started |
| 4 | **15 Hudson Yards** | `15-hudson-yards` | 🔴 Not started |
| 5 | **565 Broome** | `565-broome` | 🔴 Not started |

Copy `lantern-house.md`, swap metadata and section copy. Structure stays fixed.

---

## Production Workflow

| Step | Activity |
|------|----------|
| 1 | Draft in `content/building-reports/{slug}.md` |
| 2 | Review checklist (below) |
| 3 | Add to `client/src/data/building-reports.ts` |
| 4 | Ship — route live at `/buildings/{slug}/report` |
| 5 | Write + link related Perspective |
| 6 | Excerpt to Manhattan Brief · Instagram carousel |

**Pace:** One section per week. Full report in 6–8 weeks is fine.

---

## Review Checklist (before publish)

- [ ] All 14 sections present, in order
- [ ] Executive Summary opens with character, not amenities
- [ ] Observation names a real tension
- [ ] Strengths and Tradeoffs balanced
- [ ] 3–5 comparables with two-line summaries
- [ ] Fit tiers include Poor fit — direct, not apologetic
- [ ] Agent Kammer Perspective is editorial, not recap
- [ ] Bottom Line is memorable
- [ ] Related Perspective drafted and cross-linked
- [ ] Slug matches `client/src/data/buildings.ts`
- [ ] Added to `sitemap.xml`

---

## File Locations

| Asset | Path |
|-------|------|
| Draft (source) | `content/building-reports/{slug}.md` |
| Live data | `client/src/data/building-reports.ts` |
| Page | `client/src/pages/BuildingReport.tsx` |
| Watchlist | `client/src/data/buildings.ts` |
| Perspectives | `client/src/data/perspectives.ts` |
| Sitemap | `client/public/sitemap.xml` |

---

## Draft Skeleton

```markdown
# {BUILDING NAME} REPORT
## Agent Kammer Building Report Series

{Neighborhood}, Manhattan

---

### Executive Summary

---

## Observation

---

## Building Profile

Neighborhood · Building Type · Design · Positioning

---

## Resident Profile

Likely residents include:
Less common:

---

## What Makes {Building} Different

### {Subsection}

---

## Strengths

---

## Tradeoffs

---

## Neighborhood Context

---

## Comparable Buildings

### {Comparable Name}

---

## Who This Building Fits

Excellent fit · Moderate fit · Poor fit

---

## Commute Perspective

---

## Agent Kammer Perspective

---

## Bottom Line
```

---

*The next 90% of progress is publishing observations and building reports — not editing the website.*
