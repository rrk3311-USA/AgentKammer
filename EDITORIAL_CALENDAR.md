# Agent Kammer — Editorial Calendar

**Purpose:** Prevent random publishing. Content quality is now the bottleneck — not the site.  
**Companion:** `BUILDING_REPORT_TEMPLATE.md` (report structure) · `DESIGN_SYSTEM.md` (visual rules) · `client/src/data/perspectives.ts` (live perspectives)  
**Positioning:** *Agent Kammer is a Manhattan advisory practice focused on modern residential buildings.*

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
| **Building Report** | Deep interpretation (7 sections) | 1–2 per month | `/buildings/{slug}/report` (future) |
| **Neighborhood Report** | Micro-market study | 1 per quarter | Perspectives or PDF |
| **Perspective** | Observation → Conclusion (5 sections) | 2 per month max | `/perspectives/{slug}` |
| **Market Note** | Short timing / liquidity read | Monthly (not weekly) | Manhattan Brief + Perspectives |
| **Client Story** | Anonymized decision arc | As available | Perspectives (Lifestyle tag) |

---

## Priority Queue

### Tier 1 — Building Reports (ship first)

These differentiate the practice. Each report follows `BUILDING_REPORT_TEMPLATE.md` (8 sections, identical structure).

| Building | Slug | Status | Target | Notes |
|----------|------|--------|--------|-------|
| **Lantern House** | `lantern-house` | ✅ Published | Jun 2026 | Chelsea waterfront — flagship report |
| **One High Line** | `one-high-line` | 🔴 Not started | Q2 2026 | West Chelsea, High Line proximity |
| **35 Hudson Yards** | `35-hudson-yards` | 🔴 Not started | Q3 2026 | Hudson Yards anchor tower |
| **15 Hudson Yards** | `15-hudson-yards` | 🔴 Not started | Q3 2026 | Hudson Yards residential tower |
| **565 Broome** | `565-broome` | 🔴 Not started | Q4 2026 | SoHo modern luxury |

**Report sections (required):** See `BUILDING_REPORT_TEMPLATE.md` — 14 sections (Executive Summary → Bottom Line). Lantern House is the gold standard.  

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

#### Pipeline (approved topics — not yet written)

| Title (working) | Content type | Question it answers | Target |
|-----------------|--------------|---------------------|--------|
| What Concierge Service Actually Means | 🏢 Building | Why doorman quality changes daily life? | Q2 2026 |
| Why Some Buildings Feel More Valuable Than They Are | 📊 Market Note | What drives perceived value beyond price? | Q2 2026 |
| Tribeca vs Hudson Yards for Finance Professionals | 📍 Neighborhood | Where should a finance executive actually live? | Q3 2026 |
| The First 90 Days in Manhattan | 🚕 Relocation | What should relocation clients decide first? | Q3 2026 |

*Before writing:* confirm the piece answers **one question** and is not a guide or listicle.

---

### Tier 4 — Market Notes (Manhattan Brief)

Monthly observations bundled in **Manhattan Brief** newsletter. Short — 300–500 words max.

| Month | Topic (working) | Status |
|-------|-----------------|--------|
| Jun 2026 | Hudson Yards leasing velocity | 🔴 Planned |
| Jul 2026 | Tribeca liquidity vs new development | 🔴 Planned |
| Aug 2026 | Summer relocation window | 🔴 Planned |

Market Notes reuse Perspectives discipline — one observation, one implication. Not market recaps.

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
| Building Reports | `client/src/data/building-reports.ts` · `/buildings/{slug}/report` |
| Sitemap | `client/public/sitemap.xml` |
| Newsletter signups | `/api/leads` · `leadSource: "manhattan_brief"` |

---

## Risk to manage

> The biggest risk is not visual inconsistency. It is publishing random content.

The editorial calendar exists to keep Agent Kammer feeling like a **practice that studies Manhattan** — not a site that fills a content schedule.

---

*Last updated: June 2026*
