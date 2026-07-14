# Agent Kammer — Component & Interaction Audit v1

**Date:** June 2026  
**Follows:** `UX_AUDIT_V1.md` (P0 section contrast — deployed)  
**Companion:** `DESIGN_SYSTEM.md` §6  
**Principle:** *Same editor everywhere — editorial publication, not listing portal.*

---

## Executive Summary

| Dimension | Score (pre) | Target |
|-----------|-------------|--------|
| Module consistency | 7/10 | 8.5+ |
| Portal leakage | Medium | Low |
| Editorial modules | Growing | Stable set of 3 |

P0 fixed **section rhythm**. This audit fixes **component language** — where StreetEasy energy still leaks through amenity widgets, filter pills, and mixed icon systems.

---

## Current Module Inventory

| Module | Status | Editor tone |
|--------|--------|-------------|
| Navy hero + primary question card | ✅ Strong | Advisory |
| Comparison table (2-col) | ✅ Strong | Publication |
| Step flow (numbered) | ✅ Strongest | Keep as-is |
| CTA band (bordered) | ✅ Strong | Clear + premium button |
| Perspective cards | ✅ Strong | Editorial |
| Building watchlist cards | ⚠️ Was portal | → Known For tags |
| Filter pills | ⚠️ Was SaaS | → Monocle subtle |
| Content type tags | ⚠️ Was blog emoji | → Lucide |
| Belief quote | ✅ Added | `BeliefQuote` |
| Resident profile bars | ✅ Added | `ResidentProfileBars` |
| Related buildings | ✅ Added | End of reports |

---

## Icons — Lucide Only

**Removed:** Emoji content type system (🏢 📍 📊 🚕 🏙 🥂)

**Replaced with:**

| Type | Lucide | Stroke |
|------|--------|--------|
| Building | `Building2` | 1.5 |
| Neighborhood | `MapPin` | 1.5 |
| Market Note | `ChartColumn` | 1.5 |
| Relocation | `TrainFront` | 1.5 |
| Development | `Landmark` | 1.5 |
| Lifestyle | `Compass` | 1.5 |

**Files:** `client/src/lib/perspective-icons.tsx` · `PerspectiveContentTag.tsx` · Perspectives filter pills

Same size (`h-3.5 w-3.5`), same champagne/graphite color context. More premium. Less blog.

---

## Amenity Widgets → Known For

**Was:** 4-column icon grid — Pool, Gym, Doorman, River View (StreetEasy / portal)

**Now:** Editorial footer on watchlist cards:

```
Known For
Design · Character · High Line · Architecture
```

**Data:** `knownFor: string[]` on `TrackedBuilding` in `client/src/data/buildings.ts`

**Future (optional):** Group under "Resident Experience" or "Known For" section headers on report pages — not database amenity keys.

`amenities[]` retained in data for internal reference; not shown on public watchlist cards.

---

## Filter / Toggle Pills

**Was:** Active = midnight fill + ivory text (SaaS tab energy)

**Now:** `ObservationFilterPill`

- Active: white bg, champagne border, midnight text, subtle inset shadow
- Inactive: transparent, light border, muted text
- Lucide icon + label (Perspectives)

Monocle / Robb Report — not product UI.

---

## Comparison Tables

**Status:** ✅ Keep current pattern

- Navy section container
- Champagne header row
- Left column muted ivory, right column brighter
- Professional contrast — never combative

No changes needed. One of the stronger module types.

---

## Step Flows

**Status:** ✅ Keep

Numbered steps on Buy/Sell (Preparation, For Buyers) and Lease (Approach) are among the strongest modules. Do not redesign.

---

## Editorial Modules (add only these 3)

### 1. Belief Quote — `BeliefQuote.tsx`

Full-width, centered serif, white band.

```tsx
<BeliefQuote>A building shapes daily life in ways a floor plan never can.</BeliefQuote>
```

**Live:** About page

### 2. Resident Profile Bars — `ResidentProfileBars.tsx`

```
Creative   ◼◼◼◼◻
Finance    ◼◼◻◻◻
```

**Live:** Lantern House report (`residentProfileMix` in `building-reports.ts`)

### 3. Related Buildings

End of building reports — natural next click.

```
If Lantern House interests you:
One High Line
565 Broome
The Cortland
```

**Live:** `BuildingReport.tsx` — links to report or `/buildings`

---

## What to Avoid

| Pattern | Why |
|---------|-----|
| Accordions everywhere | Portal software |
| Tabs everywhere | SaaS |
| Fancy animations | Cheap luxury |
| Dashboard widgets | CRM |
| Interactive maps | Zillow |
| Expand/collapse overload | Portal |
| More tower photos | Already building-heavy |
| AI lifestyle people | Credibility destroyer |
| Stock people / handshakes | Credibility destroyer |

---

## Portal Leakage Audit

| Surface | Was | Now |
|---------|-----|-----|
| Watchlist card footer | Amenity icon grid | Known For tags |
| Perspective tags | Emoji | Lucide |
| Perspective filters | Midnight active pill | Subtle editorial pill |
| Chat avatar | Generated person | Small UI only — monitor |
| Profile / forms | shadcn defaults | OK — app context not marketing |

**Remaining portal energy (low priority):**

- `NewYorkMarket.tsx` — market hub still dense; not primary funnel
- `Profile.tsx` — product surface; acceptable
- RBO / RSA pages — framework names in paths only; cards softened

---

## Component File Map

| Component | Path |
|-----------|------|
| BeliefQuote | `client/src/components/BeliefQuote.tsx` |
| ObservationFilterPill | `client/src/components/ObservationFilterPill.tsx` |
| PerspectiveContentTag | `client/src/components/PerspectiveContentTag.tsx` |
| ResidentProfileBars | `client/src/components/ResidentProfileBars.tsx` |
| EditorialAccent (sketch) | `client/src/components/EditorialAccent.tsx` |
| Perspective icons | `client/src/lib/perspective-icons.tsx` |

---

## Deployment Status (v1)

| Item | Status |
|------|--------|
| Lucide content type tags | ✅ |
| Monocle filter pills | ✅ |
| Known For watchlist cards | ✅ |
| BeliefQuote component | ✅ |
| Related Buildings on reports | ✅ |
| Resident profile bars | ✅ (Lantern House) |
| UX_AUDIT P0 contrast | ✅ (prior pass) |

---

## Do Not Do Next

- More pages
- More navigation
- More graphics packs
- Accordion FAQ modules
- Interactive maps
- Dashboard-style building stats
- Resident Experience grouped amenity accordions (until 3+ reports justify it)

---

## Review Checklist (before next component pass)

- [ ] New UI chrome uses Lucide only — no emoji
- [ ] New filters use `ObservationFilterPill` pattern
- [ ] Building cards use `knownFor` — not amenity icon grids
- [ ] New reports include `residentProfileMix` + related building slugs
- [ ] Belief quotes use `BeliefQuote` — not one-off blockquote styles
- [ ] No module added without removing or consolidating another

---

*Brand is finished. Copy is strong. Remaining gains: one editor, less portal, more breathing room.*
