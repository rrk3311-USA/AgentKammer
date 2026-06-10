# Agent Kammer — Editorial Calendar

**Purpose:** Prevent random publishing. Content quality is now the bottleneck — not the site.  
**Canonical directive:** `CONTENT_FIRST_DIRECTIVE.md` — overrides framework and feature work until content thresholds are met.  
**Companion:** `BUILDING_REPORT_TEMPLATE.md` (report structure) · `DESIGN_SYSTEM.md` (visual rules) · `client/src/data/perspectives.ts` (live perspectives)  
**Positioning:** *Agent Kammer is a Manhattan advisory practice focused on modern residential buildings.*

---

## Architecture Gate (do not bypass)

No new pages, navigation, Building DNA, dashboards, or scoring until:

| Asset | Current | Required |
|-------|---------|----------|
| Building Reports | 1 | **5+** |
| Perspectives | 8 | **10+** |
| Manhattan Brief issues | 0 | **3+** |

Until then: **write → publish → cross-link.** See `CONTENT_FIRST_DIRECTIVE.md`.

---

## Editorial Principles

1. **One question per piece** — if it does not answer a specific question, it does not ship  
2. **Interpretation over inventory** — not Zillow, not listicles, not guides  
3. **Authority over volume** — one strong piece beats four mediocre ones  
4. **Building Reports are the moat** — everything else supports conviction toward a report  
5. **Perspectives are the umbrella** — briefs, neighborhoods, market notes, and guides live here long term

### What we do not publish

- Top 10 / Best Of listicles  
- Complete guides to renting or buying  
- Generic SEO articles without a point of view  
- Listing roundups disguised as research  

---

## Content Types & Cadence

| Type | Format | Cadence | Destination |
|------|--------|---------|---------------|
| **Building Report** | Deep interpretation (14 sections) | 1–2 per month | `/buildings/{slug}/report` |
| **Neighborhood Report** | Micro-market study | 1 per quarter | Perspectives or PDF |
| **Perspective** | Observation → Conclusion (5 sections) | 2 per month max | `/perspectives/{slug}` |
| **Market Note** | Short timing / liquidity read | Monthly (not weekly) | Manhattan Brief + Perspectives |
| **Client Story** | Anonymized decision arc | As available | Perspectives (Lifestyle tag) |

---

## Priority Queue (Phases 1–3)

### Phase 1 — Building Reports (ship first)

These differentiate the practice. Each report follows `BUILDING_REPORT_TEMPLATE.md` — 14 sections, identical structure. Drafts live in `content/building-reports/`.

| # | Building | Slug | Status | Draft file | Notes |
|---|----------|------|--------|------------|-------|
| — | **Lantern House** | `lantern-house` | ✅ Published | `lantern-house.md` | Chelsea waterfront — gold standard |
| 1 | **One High Line** | `one-high-line` | 🟡 Draft shell | `one-high-line.md` | West Chelsea, High Line proximity |
| 2 | **35 Hudson Yards** | `35-hudson-yards` | 🟡 Draft shell | `35-hudson-yards.md` | Hudson Yards anchor tower |
| 3 | **15 Hudson Yards** | `15-hudson-yards` | 🟡 Draft shell | `15-hudson-yards.md` | Hudson Yards residential tower |
| 4 | **565 Broome** | `565-broome` | 🟡 Draft shell | `565-broome.md` | SoHo modern luxury |
| 5 | **Waterline Square** | `waterline-square` | 🟡 Draft shell | `waterline-square.md` | Upper West Side, park + wellness |

**Per-report flywheel (Phase 3):** one Manhattan Brief issue · one linked Perspective · one Instagram carousel.

---

### Tier 2 — Neighborhood Reports

| Neighborhood | Status | Target | Angle |
|--------------|--------|--------|-------|
| **Tribeca** | 🔴 Not started | Q3 2026 | Quiet luxury, family + finance crossover |
| **Hudson Yards** | 🔴 Not started | Q3 2026 | New development vs established blocks |
| **Chelsea** | 🔴 Not started | Q4 2026 | Gallery district rhythm, west side access |

---

### Tier 3 — Perspectives (published & pipeline)

#### Live on site ✅

| Title | Content type | Slug | Published |
|-------|--------------|------|-----------|
| Why Some Luxury Buildings Have More Personality Than Others | 🏢 Building | `why-some-luxury-buildings-have-more-personality-than-others` | Jun 2026 |
| Why The Building Matters More Than The Residence | 🏢 Building | `why-the-building-matters-more-than-the-residence` | May 2026 |
| The Hidden Cost Of A Bad Commute | 🚕 Relocation | `the-hidden-cost-of-a-bad-commute` | May 2026 |
| Why Manhattan Keeps Building Offices | 🏙 Development | `why-manhattan-keeps-building-offices` | Apr 2026 |
| Luxury Is Often Proximity | 🥂 Lifestyle | `luxury-is-often-proximity` | Apr 2026 |
| Why Some Luxury Buildings Feel Empty | 🏢 Building | `why-some-luxury-buildings-feel-empty` | Apr 2026 |
| Leasing Today, Buying Tomorrow | 🥂 Lifestyle | `leasing-today-buying-tomorrow` | Mar 2026 |
| The Building Before The Apartment | 🏢 Building | `the-building-before-the-apartment` | Mar 2026 |

#### Phase 2 — Perspectives (approved — write next)

| # | Title | Suggested slug | Content type | Target |
|---|-------|----------------|--------------|--------|
| 1 | Why Some Buildings Feel More Expensive Than They Are | `why-some-buildings-feel-more-expensive-than-they-are` | 🏢 Building | Q2 2026 |
| 2 | The Quiet Luxury Buildings Of Manhattan | `the-quiet-luxury-buildings-of-manhattan` | 🏢 Building | Q2 2026 |
| 3 | Why Service Quality Matters More Than Amenities | `why-service-quality-matters-more-than-amenities` | 🏢 Building | Q3 2026 |
| 4 | What Residents Actually Pay For In Luxury Buildings | `what-residents-actually-pay-for-in-luxury-buildings` | 🥂 Lifestyle | Q3 2026 |
| 5 | The Difference Between Prestige And Convenience | `the-difference-between-prestige-and-convenience` | 🏢 Building | Q3 2026 |

*Before writing:* confirm the piece answers **one question** and is not a guide or listicle. Use Observation → Context → Interpretation → Implication → Conclusion.

#### Backlog (after Phase 2)

| Title (working) | Content type | Question it answers |
|-----------------|--------------|---------------------|
| What Concierge Service Actually Means | 🏢 Building | Why doorman quality changes daily life? |
| Tribeca vs Hudson Yards for Finance Professionals | 📍 Neighborhood | Where should a finance executive actually live? |
| The First 90 Days in Manhattan | 🚕 Relocation | What should relocation clients decide first? |

---

### Phase 3 — Manhattan Brief (content flywheel)

Each published Building Report spawns **one** Brief issue (300–500 words). Excerpt Executive Summary or one report section. Not a market recap.

| Issue | Source report | Status |
|-------|---------------|--------|
| Brief #1 | Lantern House | 🔴 Planned |
| Brief #2 | One High Line | 🔴 After Phase 1 #1 |
| Brief #3 | 35 Hudson Yards | 🔴 After Phase 1 #2 |

**Threshold:** 3+ Brief issues before evaluating new editorial systems.

**Instagram:** One carousel per report — thesis hook from Executive Summary or one slide per section. Content asset only; no new site features.

---

## Monthly Rhythm (suggested)

| Week | Activity |
|------|----------|
| 1 | Draft or refine one Building Report section |
| 2 | Publish one Perspective OR advance Report to review |
| 3 | Write Market Note for Manhattan Brief |
| 4 | Photography / building research — no publishing unless ready |

**Maximum publish rate:** 2 Perspectives + 1 Market Note + 1 Building Report section per month.  
Slower is fine. Random is not.

---

## Review Checklist (before publish)

- [ ] Answers exactly **one question**  
- [ ] Headline is a thesis — not a guide, ranking, or "Top N"  
- [ ] Tagged with one content type (🏢 📍 📊 🚕 🏙 🥂)  
- [ ] Follows Observation → Context → Interpretation → Implication → Conclusion  
- [ ] No "building intelligence," "platform," or listicle language  
- [ ] Photography follows 40/30/20/10 mix — no stock corporate scenes  
- [ ] Icons from preferred Lucide set only (DESIGN_SYSTEM §7)  
- [ ] Added to `sitemap.xml` if new route  

---

## File Locations (when shipping)

| Content | Data / file |
|---------|-------------|
| Perspectives | `client/src/data/perspectives.ts` |
| Building watchlist | `client/src/data/buildings.ts` |
| Building Reports | `content/building-reports/{slug}.md` · `client/src/data/building-reports.ts` · `/buildings/{slug}/report` |
| Content directive | `CONTENT_FIRST_DIRECTIVE.md` |
| Sitemap | `client/public/sitemap.xml` |
| Newsletter signups | `/api/leads` · `leadSource: "manhattan_brief"` |

---

## Risk to manage

> The biggest risk is not visual inconsistency. It is publishing random content.

The editorial calendar exists to keep Agent Kammer feeling like a **practice that studies Manhattan** — not a site that fills a content schedule.

---

*Last updated: June 2026*
