# Agent Kammer — UX Audit v1

**Date:** June 2026  
**Scope:** Public marketing pages — contrast, rhythm, hierarchy, photography, module variety  
**Companion:** `DESIGN_SYSTEM.md` · `SITE_COPY_AUDIT.md`  
**Principle:** *Add too little, not too much. Identity is settled; pacing is not.*

---

## Executive Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Brand** | 9/10 | Navy / ivory / champagne, serif headlines, editorial voice — distinctive |
| **Copy** | 8.5/10 | Perspectives, Buildings, Lease strongest; framework language mostly removed |
| **UX rhythm** | 7.5/10 | Section contrast and module repetition are the remaining roughness |

The site no longer looks like an unlicensed agent trying to look established. It reads as a Manhattan advisory publication. What still *feels* flat is **ivory on slightly different ivory** — sections that share the same visual weight in sequence.

---

## Core Rule

Every section must answer:

> **What visually separates me from the section above?**

Use at least one:

1. **Background change** (ivory → white → warm `#f7f3ea` → surface `#f3f2ee` → navy)
2. **Border** (`border-t border-brand-midnight/10`)
3. **Image** (hero, neighborhood texture, architectural sketch)
4. **Layout shift** (full-width table, split grid, quote block, horizontal scroll)

**Target rhythm (example):**

```
Navy hero
↓ White or warm ivory
↓ Navy or surface texture
↓ White
↓ Warm ivory CTA
```

Avoid:

```
Ivory → Ivory → Ivory → Ivory
```

---

## Photography & Graphics

### Add (sparingly — not everywhere)

| Asset type | Where | Style |
|------------|-------|-------|
| **Architectural sketches** ✏️ | About hero accent, Perspectives hero, Building Reports | Facade line drawings, blueprint fragments, street grid, elevations — Robb Report / Monocle / AD |
| **Neighborhood texture** 📷 | Home, Lease, Perspectives (not every card) | High Line, Hudson River path, Tribeca cobblestones, Chelsea galleries, coffee corners, tree-lined streets |
| **Report graphics** | Building Reports only | Editorial resident-profile bars (e.g. Creative ◼◼◼◼◻) — not more building photos |

### Remove / never add

- Random stock people  
- Handshakes, business meetings, smiling couples  
- AI luxury lifestyle people  
- Generic skyline-as-hero filler  

These destroy luxury credibility faster than weak copy.

### Current inventory (audit)

| Asset | Location | Status |
|-------|----------|--------|
| `rooftop-terrace-lifestyle-hero.png` | Home hero | ⚠️ Generated lifestyle — monitor; no people visible preferred |
| `rooftop-pool-wtc.png` | Home relocation strip | ✅ Architecture / place — acceptable |
| `lantern-house.jpg` | Home differentiator | ✅ Building-specific |
| `/buildings/thumbs/*.webp` | Watchlist cards | ✅ Local building exteriors |
| `Tuxedo_professional_on_phone` | Chat avatar | ⚠️ Person — acceptable as small UI avatar only; never hero-scale |
| Building-heavy overall | Site-wide | 🔴 Add neighborhood texture before more towers |

**Photography mix target (DESIGN_SYSTEM):** 40% building · 30% neighborhood · 20% interior/detail · 10% lifestyle — currently skewed building + generated lifestyle.

---

## Module Variety

### Problem

Many pages repeat:

```
Eyebrow → Headline → Paragraph → 3 cards
```

Same weight throughout. Luxury needs **surprise** — one module type per scroll depth.

### Module library (use mixed, not stacked)

| Module | Best for | Pages using today |
|--------|----------|-------------------|
| Navy hero + primary question card | Page open | Home, Buildings, Buy/Sell, Lease, About |
| Comparison table (2-col) | Contrast / belief | Buy/Sell, Lease, About |
| Horizontal building scroll | Watchlist | Home, Buildings |
| Full-width quote / belief line | Philosophy | About — **add one** |
| Report preview / featured report | Moat | Buildings — **when 2+ reports live** |
| Perspective excerpt (featured card) | Editorial | Perspectives ✅ |
| Step flow (numbered) | Process | Buy/Sell, Lease |
| Split image + copy | Break rhythm | Home differentiator ✅ |
| CTA band (bordered card) | Next step | Lease, Buildings, Buy/Sell ✅ |
| Resident profile graphic | Report differentiation | Building Reports — **not yet** |

---

## Page-by-Page: Section Contrast

Legend: 🟢 clear separation · 🟡 weak · 🔴 blends / flat streak

### Home (`/`)

| # | Section | Background | Separator | Verdict |
|---|---------|------------|-----------|---------|
| 1 | Hero | Navy + photo | — | 🟢 |
| 2 | Philosophy | `brand-ivory` | none | 🟡 follows navy — ok |
| 3 | Differentiator | `white` + image | none | 🟢 |
| 4 | Buildings We Track | `.brand-surface-intelligence` | none | 🟢 texture helps |
| 5 | Leasing Today | `#f7f3ea` + border-y | border | 🟢 |
| 6 | Relocating | Navy + image | top rule | 🟢 |
| 7 | Recent Observations | `white` | border-t | 🟢 |
| 8 | Bespoke Matches CTA | `brand-ivory` | border-t | 🟡 **white → ivory** — subtle; consider staying white or warm band |

**Home priority:** Section 8 — either keep white (continue from Perspectives) or use `#f7f3ea` for CTA; avoid ivory-on-ivory if section 2 feeling is remembered (2 ivory bookends).

---

### Perspectives (`/perspectives`) — 🥇

| # | Section | Background | Verdict |
|---|---------|------------|---------|
| 1 | Hero | Navy | 🟢 |
| 2 | Featured | Default ivory | 🟡 |
| 3 | Areas Of Observation | `#f7f3ea` | 🟢 |
| 4 | Recent Observations | Default ivory | 🟡 **warm → ivory** — add `bg-white` or border-t |
| 5 | Manhattan Brief | Component | check subscribe block |

**Perspectives priority:** Add **one** architectural sketch in hero (low opacity, right edge) — not photos. Fix section 4 background to `white`.

---

### Buildings (`/buildings`) — 🥈

| # | Section | Background | Verdict |
|---|---------|------------|---------|
| 1 | Hero | Navy | 🟢 |
| 2 | Lens | `#f3f2ee` | 🟢 |
| 3 | What We Study | `brand-ivory` | 🟡 **f3f2ee → ivory** — close; border-t present |
| 4 | Building cards | `#f3f2ee` | 🟡 same family as 2 |
| 5 | Next Step CTA | `brand-ivory` | 🔴 **f3f2ee → ivory** — weak |
| 6 | Markets | Navy | 🟢 |

**Buildings priority:** Alternate section 3 → `white`, keep cards on `#f3f2ee`. When 2+ reports exist: **Featured Reports** band above grid (navy or white break).

---

### About (`/about`) — 4️⃣

| # | Section | Background | Verdict |
|---|---------|------------|---------|
| 1 | Hero | Navy | 🟢 |
| 2 | Philosophy | Default ivory | 🟡 |
| 3 | Mission | `#f7f3ea` | 🟢 |
| 4 | A Different Lens | Navy | 🟢 |
| 5 | Outcomes | Default ivory | 🟡 **navy → ivory** — ok with border? **no border** |

**About priority:** Section 5 needs `border-t` or `bg-white`. Add **one** sketch accent in Philosophy or hero — belief line as pull-quote (`font-serif text-2xl`) before body copy.

---

### Lease (`/lease`) — 5️⃣

| # | Section | Background | Verdict |
|---|---------|------------|---------|
| 1 | Hero | Navy | 🟢 |
| 2 | Who This Serves | Default ivory | 🟡 |
| 3 | Approach | `#f7f3ea` | 🟢 |
| 4 | Comparison | Navy | 🟢 |
| 5 | Next Step | Default ivory | 🟡 |

**Lease:** Strong copy. Section 5 → `bg-white` band for CTA clarity.

---

### Buy / Sell (`/buy-sell`) — 6️⃣

| # | Section | Background | Verdict |
|---|---------|------------|---------|
| 1 | Hero | Navy | 🟢 |
| 2 | Advisory Paths | Default ivory | 🟡 |
| 3 | Preparation | Default ivory + border-b | 🔴 **ivory → ivory** |
| 4 | For Buyers | Default ivory | 🔴 long flat streak |
| 5 | What Informs | Default ivory | 🔴 |
| 6 | A Different Approach | Navy | 🟢 saves the page |
| 7 | For Sellers | `#f7f3ea` | 🟢 |
| 8 | Next Step | Default ivory | 🟡 |

**Buy/Sell priority:** Highest contrast debt. Insert `bg-white` on Preparation OR For Buyers; keep one ivory section max between navy blocks.

---

## CTA Consistency

| Page language | Button label | Pattern |
|---------------|--------------|---------|
| Request A Building Shortlist | Curate Matches | ✅ Lease, Buildings |
| Request A Private Review | Curate Matches | ✅ Buy/Sell |
| Subscribe To Manhattan Brief | — | ✅ Perspectives |
| Start your search / Meet your matches | Curate Matches / Meet your matches | ⚠️ Home footer — align copy to shortlist language over time |

**Rule:** Page headline = clear (*Request A…*). Button = premium (*Curate Matches*).

---

## Typography & White Space

| Check | Status |
|-------|--------|
| One H1 per page | ✅ |
| Eyebrow + H2 pairing | ✅ — risk of eyebrow fatigue on long pages |
| Section padding `py-14`–`py-20` | ✅ consistent |
| Belief lines in serif at larger size | ⚠️ Underused — About Philosophy is the model |
| Mobile horizontal scroll (buildings) | ✅ |
| Mobile 3-col card grids | ⚠️ Test Buy/Sell decision inputs at `md:grid-cols-2 lg:grid-cols-4` |

---

## Building Report UX (when scaling)

For Lantern House and future reports:

1. Add **resident profile graphic** (editorial bars) — one per report, not photos  
2. Optional sketch: facade line art in hero margin  
3. Keep 14-section structure; vary **internal** rhythm with pull-quotes and profile blocks  
4. **Featured Reports** on Buildings when ≥2 live — reports above watchlist grid  

---

## Prioritized Fix List

### P0 — Contrast only (no new assets)

| Fix | Page | Effort |
|-----|------|--------|
| Buy/Sell: white band on Preparation or For Buyers | `/buy-sell` | 1 line |
| Buildings: white on What We Study; ivory CTA → white or bordered | `/buildings` | 2 lines |
| About: `border-t` + white on Outcomes | `/about` | 1 line |
| Perspectives: `bg-white` on Recent Observations | `/perspectives` | 1 line |
| Home: CTA section — white or `#f7f3ea` not ivory | `/` | 1 line |

### P1 — One asset per surface (restraint)

| Fix | Where |
|-----|-------|
| Architectural sketch (SVG, low opacity) | About Philosophy or Perspectives hero |
| Neighborhood photo (1) | Home or Lease — not building |
| Resident profile bars | `BuildingReport.tsx` — Lantern House only |

### P2 — Structure (when content ready)

| Fix | When |
|-----|------|
| Featured Reports band | ≥2 building reports published |
| Full-width belief quote module | About or Home — one per site |
| Neighborhood texture library | `public/neighborhoods/` — 5–8 images |

### Do not do yet

- Sketch on every page  
- More hero photography  
- New page templates  
- Stock people / lifestyle AI  
- Component library expansion  

---

## Review Checklist (before next UX pass)

- [ ] No three consecutive sections share the same background without border or layout break  
- [ ] No page has more than two "eyebrow + headline + 3 cards" blocks in a row without a table, image, or quote between  
- [ ] All Next Step sections use clear page language + premium button  
- [ ] No new person photography above fold  
- [ ] Building Reports include at least one non-photo graphic  
- [ ] Mobile spot-check: Home, Buy/Sell, Buildings  

---

## Scores After P0 (projected)

| Dimension | Current | After P0 |
|-----------|---------|----------|
| UX rhythm | 7.5 | ~8.5 |
| Brand | 9 | 9 |
| Copy | 8.5 | 8.5 |

P1 assets are polish, not foundation. **Do P0 first. Stop.**

---

*The issue isn't identity anymore. It's pacing, contrast, and visual rhythm between sections.*
