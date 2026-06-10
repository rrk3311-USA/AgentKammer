# Agent Kammer — Content First Directive

**Status:** Canonical. Overrides framework, navigation, and feature work until content thresholds are met.  
**Use with:** Codex · Replit · Cursor · any agent working on Agent Kammer  
**Companion:** `BUILDING_REPORT_TEMPLATE.md` · `EDITORIAL_CALENDAR.md` · `content/building-reports/`  
**Positioning:** *Agent Kammer is a Manhattan advisory practice focused on modern residential buildings.*

---

## Do Not Build

Do **not** build:

- Building DNA
- New frameworks
- New navigation
- New pages
- New dashboards
- New scoring systems

The site has enough architecture.

**The priority is content.**

---

## Current Assets (Sufficient for Next Phase)

These already exist. Use them — do not replace them.

| Asset | Location / usage |
|-------|------------------|
| Building Reports | `BUILDING_REPORT_TEMPLATE.md` · `building-reports.ts` · `/buildings/{slug}/report` |
| Perspectives | `perspectives.ts` · `/perspectives/{slug}` |
| Resident Profile Bars | Building Report page |
| Known For Tags | Watchlist cards · `buildings.ts` |
| Related Buildings | Building Report comparables |
| Manhattan Brief | Newsletter signup · `/api/leads` · `leadSource: "manhattan_brief"` |
| Comparison Tables | Building Report comparables |
| Belief Quotes | About · Perspectives · Reports |

---

## Publishing Roadmap

### Phase 1 — Building Reports

Create and publish using the **existing** Building Report template. Do not invent a new report structure.

| # | Building | Slug | Status |
|---|----------|------|--------|
| — | Lantern House | `lantern-house` | ✅ Published |
| 1 | One High Line | `one-high-line` | ✅ Published |
| 2 | 35 Hudson Yards | `35-hudson-yards` | 🔴 Draft |
| 3 | 15 Hudson Yards | `15-hudson-yards` | 🔴 Draft |
| 4 | 565 Broome | `565-broome` | 🔴 Draft |
| 5 | Waterline Square | `waterline-square` | 🔴 Draft |

**Ship checklist per report:**

1. Write draft → `content/building-reports/{slug}.md`
2. Add entry → `client/src/data/building-reports.ts`
3. Cross-link related Perspective (existing or Phase 2)
4. Add URL → `client/public/sitemap.xml`
5. Enable “Read Building Report →” on watchlist card when live

**Reference:** `content/building-reports/lantern-house.md` is the gold standard.

---

### Phase 2 — Perspectives

Create using the **existing** Perspective structure. Do not invent a new article format.

**Required sections (in order):**

1. Observation  
2. Context  
3. Interpretation  
4. Implication  
5. Conclusion  

| # | Title | Suggested slug |
|---|-------|----------------|
| 1 | Why Some Buildings Feel More Expensive Than They Are | `why-some-buildings-feel-more-expensive-than-they-are` |
| 2 | The Quiet Luxury Buildings Of Manhattan | `the-quiet-luxury-buildings-of-manhattan` |
| 3 | Why Service Quality Matters More Than Amenities | `why-service-quality-matters-more-than-amenities` |
| 4 | What Residents Actually Pay For In Luxury Buildings | `what-residents-actually-pay-for-in-luxury-buildings` |
| 5 | The Difference Between Prestige And Convenience | `the-difference-between-prestige-and-convenience` |

**Ship checklist per perspective:**

1. Add entry → `client/src/data/perspectives.ts`
2. Optional `relatedBuildingReportSlug` when tied to a report
3. Add URL → `client/public/sitemap.xml`

---

### Phase 3 — Manhattan Brief (Content Flywheel)

Each Building Report should generate **three** derivative assets:

| Asset | Format |
|-------|--------|
| **Newsletter issue** | One Manhattan Brief issue — excerpt Executive Summary or one report section (300–500 words) |
| **Perspective article** | One linked Perspective (new or cross-linked from Phase 2) |
| **Instagram carousel** | One carousel — one slide per report section or thesis-led hook from Executive Summary |

**Content flywheel:**

```
Building Report
  → Perspective
  → Manhattan Brief
  → Instagram
  → Website Visitor
  → Future Client
```

Instagram and Brief are **content assets**, not new site features.

---

## Content Rules

| Rule | Meaning |
|------|---------|
| **Publish before building** | Ship drafts to production before adding UI or data models |
| **Write before redesigning** | No visual or IA passes until content queue advances |
| **Add assets before frameworks** | Reports and perspectives beat methodologies |
| **Five reports > one methodology** | If choosing between a framework and a report, publish the report |
| **Ten perspectives > one new page** | If choosing between a new page and perspectives, publish perspectives |

---

## Architecture Gate

**No new architecture** until all thresholds are met:

| Threshold | Current | Target |
|-----------|---------|--------|
| Building Reports | 2 | **5+** |
| Perspectives | 9 | **10+** |
| Manhattan Brief issues | 0 | **3+** |

Only **after** these thresholds: evaluate additional editorial systems (e.g. Building DNA, new dashboards, scoring).

Until then: **write, publish, cross-link.**

---

## Current Objective

Become known for **studying Manhattan buildings**.

Not for creating frameworks about studying Manhattan buildings.

---

## Agent Instructions (paste block)

```
AGENT KAMMER — CONTENT FIRST

Do not build Building DNA, new frameworks, navigation, pages, dashboards, or scoring.

Priority: content. Use existing Building Report template (14 sections) and Perspective structure (Observation → Conclusion).

Phase 1: Publish building reports for one-high-line, 35-hudson-yards, 15-hudson-yards, 565-broome, waterline-square.

Phase 2: Publish 5 perspectives listed in CONTENT_FIRST_DIRECTIVE.md.

Phase 3: Per report — one Manhattan Brief issue, one perspective, one Instagram carousel.

Publish before building. No new architecture until 5+ reports, 10+ perspectives, 3+ Brief issues.

Reference: content/building-reports/lantern-house.md, client/src/data/building-reports.ts, client/src/data/perspectives.ts.
```

---

*Established: June 2026*
