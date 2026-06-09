# Site Architecture V3

Agent Kammer is a Manhattan advisory practice focused on modern residential buildings — luxury leasing and strategic acquisition.

Agent Kammer is not Zillow, Airbnb, e-commerce, coaching, wellness, travel, or courses.

**Live:** https://www.agentkammer.com  
**Branch:** `luxury-homepage`

---

## Core Principle

Visitors should immediately understand:

> Agent Kammer helps ambitious people **choose the right Manhattan building**, then **lease**, **acquire**, or **sell** within that context.

**Positioning line:** Choose the right building → Lease it → Acquire it → Sell it.

Everything on the site supports those outcomes — not the other way around.

---

## Primary Navigation

```
[ Logo → Home ]

Lease  |  Buy / Sell  |  Buildings  |  About  |  [ Curate Matches ]
```

| Nav item | Route | File |
| --- | --- | --- |
| Lease | `/lease` | `Lease.tsx` |
| Buy / Sell | `/buy-sell` | `BuySell.tsx` |
| Buildings | `/buildings` | `Buildings.tsx` |
| About | `/about` | `About.tsx` |
| Curate Matches (CTA) | `/profile` | `Profile.tsx` |

**Removed from nav:** Intelligence, Strategy (content merged — see Consolidation Map).

---

## Footer Navigation

Lease · Buy / Sell · Buildings · About · Contact

Plus: brand block, `info@AgentKammer.com`, compliance expandable, legal row.

---

## Production Route Map

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Philosophy — why building-first exists |
| `/lease` | Lease | Luxury leasing, building-first, relocation audiences |
| `/buy-sell` | Buy / Sell | Transactions — methodology + RBO™ / RSA™ |
| `/buildings` | Buildings | Curated watchlist + building research |
| `/about` | About | Mission, advisor vs agent, why Agent Kammer exists |
| `/profile` | Curate Matches | Private profile intake form |
| `/contact` | Contact | Concierge contact + seller value assessment |
| `/reverse-buyer-origination` | Reverse Buyer Origination™ | Buyer funnel (linked from Buy / Sell) |
| `/reverse-seller-architecture` | Reverse Seller Architecture™ | Seller funnel (linked from Buy / Sell) |
| `/new-york-market` | New York Market Brief | Market context (linked from Buildings) |

---

## Redirects (Legacy URLs)

| Old route | Redirects to |
| --- | --- |
| `/strategy` | `/buy-sell` |
| `/real-estate` | `/buildings` |

---

## Page Ownership

### Home (`/`)

**Job:** Explain *why* Agent Kammer exists — not list services.

| Section | Focus |
| --- | --- |
| Hero | Building matters more than residence |
| Philosophy | Choose the right building first |
| Differentiator | Right building changes everything |
| Buildings preview | 6-building watchlist strip |
| Client path | Leasing today → ownership tomorrow |
| Relocation | Timing, tribe, building, neighborhood… |
| CTA | Bespoke Matches |

### Lease (`/lease`)

**Job:** Building-first luxury leasing for Manhattan entrants.

| Section | Focus |
| --- | --- |
| Hero | Building-first luxury leasing |
| Who this serves | Executives, founders, finance, attorneys, first lease |
| Approach | Neighborhood → Building → Residence |
| CTA | Curate Matches · View Buildings |

### Buy / Sell (`/buy-sell`)

**Job:** Transaction process — strategy is part of the transaction, not a separate destination.

| Section | Focus |
| --- | --- |
| Hero | Acquire or sell within building context |
| Advisory paths | Reverse Buyer Origination™ · Reverse Seller Architecture™ |
| Preparation | Proper preparation prevents poor performance → Objectives → Building Intelligence → Strategy → Execution |
| For buyers | Objective → Building Context → Comparable Analysis → Offer Strategy |
| Methodology | Building Context · Comparable Analysis · Offer Strategy |
| Comparison | Typical search vs Agent Kammer |
| For sellers | Discreet first read |
| CTA | Curate Matches · Ask About Selling |

### Buildings (`/buildings`)

**Job:** Curated watchlist + intelligence supporting building selection.

| Section | Focus |
| --- | --- |
| Hero | Manhattan buildings worth studying |
| Lens | Amenities · Resident experience · Neighborhood placement |
| Research | Building report, neighborhood, opportunity, comps, market, resident fit |
| Watchlist | 18 building cards (`client/src/data/buildings.ts`) |
| Markets | Uptown · Midtown · Downtown → `/new-york-market` |
| CTA | Curate Matches |

### About (`/about`)

**Job:** Mission, philosophy, advisor positioning.

| Section | Focus |
| --- | --- |
| Hero | Why Agent Kammer exists |
| Philosophy | The building matters more |
| Mission | Observer · Interpreter · Advisor |
| Positioning | Advisor vs typical search |
| Outcomes | Choose building → lease → acquire → sell |
| CTA | Curate Matches · Contact |

### Curate Matches (`/profile`)

**Job:** Intake form — not a marketing page.

- Private profile (objective, budget, timeline, market, context)
- Results → RBO™, RSA™, Buildings

---

## Content Consolidation Map

| Before | After |
| --- | --- |
| `/strategy` | Merged into `/buy-sell` |
| `/real-estate` | Merged into `/buildings` |
| Old `About.tsx` | Replaced by new `/about` |
| `/profile` as Lease nav | `/lease` (new) + `/profile` (CTA only) |

**Archived:** `archived/pages/Strategy.tsx`, `archived/pages/RealEstate.tsx`, `archived/pages/About.tsx`

---

## Existing Page Map

| Page | Status | Notes |
| --- | --- | --- |
| `Home.tsx` | KEEP | Philosophy-first homepage |
| `Lease.tsx` | KEEP | Building-first luxury leasing |
| `BuySell.tsx` | KEEP | Transaction advisory + merged strategy |
| `Buildings.tsx` | KEEP | Watchlist + merged intelligence |
| `About.tsx` | KEEP | Mission and advisor story |
| `Profile.tsx` | KEEP | Curate Matches intake |
| `Contact.tsx` | KEEP | Concierge contact |
| `NewYorkMarket.tsx` | KEEP | Secondary market brief |
| `ReverseBuyerOrigination.tsx` | KEEP | Buyer funnel |
| `ReverseSellerOrigination.tsx` | KEEP | Seller funnel |
| `Strategy.tsx` | ARCHIVE | Redirects to Buy / Sell |
| `RealEstate.tsx` | ARCHIVE | Redirects to Buildings |
| `not-found.tsx` | KEEP | Fallback route |

---

## Global Components

| Component | Role |
| --- | --- |
| `Header.tsx` | Sticky nav + Curate Matches CTA |
| `Footer.tsx` | Brand, links, compliance, legal |
| `FloatingChatAssistant` | Chat widget (lazy-loaded) |

---

## Voice & IA Rules

- Building name before price on watchlist cards
- No standalone Intelligence or Strategy nav items
- Observer / interpreter tone — not promoter
- Luxury test: does this page make the brand feel more focused? If not, cut it.

---

## Full Copy Reference

See `SITE_COPY_AUDIT.md` for word-for-word copy on every live page.
