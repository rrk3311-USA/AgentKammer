# Agent Kammer — Design System

**Version:** 1.1 (June 2026)  
**Status:** Production reference for [agentkammer.com](https://www.agentkammer.com)  
**Supersedes:** `design_guidelines.md` (legacy listing-portal spec — do not use for new work)  
**Companion:** `EDITORIAL_CALENDAR.md` (content pipeline — not UX)

---

## 1. Design Intent

**Positioning line (use everywhere):**  
*Agent Kammer is a Manhattan advisory practice focused on modern residential buildings.*

Never describe the brand as a "building intelligence platform," "advisory platform," or startup product. The site is not a listing portal, CRM dashboard, or content farm.

The interface should feel like:

| Yes | No |
|-----|-----|
| Boutique advisory firm | Generic luxury agent |
| Observer → Interpreter → Advisor | Methodology coach |
| Curated, intentional | High-volume, searchable |
| Editorial restraint | Promotional urgency |
| Navy / ivory / champagne | Bright whites, neon CTAs, portal blues |

**UX success test:** A visitor leaves believing Agent Kammer *studies Manhattan more carefully* — not that it *published more pages*.

---

## 2. Color System

### Brand palette (primary)

| Token | Hex | Role |
|-------|-----|------|
| `brand-midnight` | `#0F172A` | Primary dark — heroes, header, footer, dark sections |
| `brand-sapphire` | `#18366B` | Secondary dark — accents, links on hover, profile highlights |
| `brand-ivory` | `#F6F3EB` | Primary light — page background, body on dark |
| `brand-ivory-logo` | `#FBF2E9` | Logo treatment only |
| `brand-graphite` | `#222730` | Body text on light backgrounds |
| `brand-champagne` | `#D6B45F` | Accent — eyebrows, borders, CTAs, hover states |
| `brand-steel` | `#5E718D` | Muted secondary text, supporting UI |

### Section alternates

| Value | Usage |
|-------|-------|
| `bg-brand-ivory` | Default page canvas |
| `bg-white` | Contrast strip within ivory pages (e.g. Recent Observations) |
| `bg-[#f7f3ea]` | Warm secondary section — cards, pathways, continue-reading |
| `bg-[#f3f2ee]` | Buildings page neutral strip |
| `bg-brand-midnight` | Hero, comparison tables, newsletter blocks, relocation |

### Opacity conventions

Text on dark backgrounds uses stepped ivory opacity:

- Primary copy: `text-brand-ivory/84` – `/92`
- Supporting copy: `text-brand-ivory/72` – `/78`
- Metadata: `text-brand-ivory/55` – `/62`

Text on light backgrounds:

- Body: `text-brand-graphite/72` – `/82`
- Metadata: `text-brand-graphite/48` – `/68`

Borders:

- Light sections: `border-brand-champagne/30` – `/40`
- Dark sections: `border-brand-ivory/12` – `/20`
- Section dividers: `border-brand-midnight/10`

### Rules

- **Champagne is precious.** Use for eyebrows, primary buttons, key borders — not large fills.
- **Never** introduce new accent colors (no portal blue, no success green in marketing UI).
- **shadcn semantic tokens** (`primary`, `muted`, `destructive`) exist for form primitives only — marketing pages use `brand-*` tokens.

---

## 3. Typography

### Font stack (3 families only)

| Role | Family | Weights loaded | Tailwind class |
|------|--------|----------------|----------------|
| UI / body | **Inter** | 400, 500, 600, 700 | `font-sans` |
| Headlines | **Cormorant Garamond** | 600, 700 | `font-serif` |
| Signature accent | **Allura** | 400 (Google) | `.bespoke-signature` |

Inter and Cormorant are self-hosted via `@fontsource`. Allura loads from Google Fonts (single request).

**Do not add** Poppins, Roboto, Playfair, Montserrat, or other families.

### Hierarchy

| Element | Classes | Notes |
|---------|---------|-------|
| Page H1 (hero) | `font-serif text-5xl … md:text-6xl lg:text-7xl font-semibold leading-[0.98]` | Navy hero only |
| Section H2 | `font-serif text-3xl md:text-4xl lg:text-[2.65rem] font-semibold` | Home uses `sectionHeadline` constant |
| Card H3 | `font-serif text-xl` – `text-2xl font-semibold` | Building names, step titles |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.24em]` – `tracking-[0.28em] text-brand-champagne` | Always uppercase, wide tracking |
| Body | `text-base leading-7` | `leading-8` in hero intros |
| Small / meta | `text-sm leading-6` or `text-[0.62rem]–[0.68rem] uppercase tracking-[0.14em]–[0.18em]` | Category pills, dates |
| Signature moment | `.bespoke-signature` | **One per page max** — Bespoke Matches CTA only |

### CTA button type

```
text-[0.72rem] font-semibold uppercase tracking-[0.12em]
```

Navigation uses slightly tighter tracking: `tracking-[0.12em]` at `text-[0.74rem]`.

---

## 4. Layout & Spacing

### Container

```
mx-auto max-w-7xl px-6 lg:px-10
```

Narrow prose (philosophy, article body): `max-w-3xl`  
Hero supporting copy: `max-w-2xl`  
Final CTA blocks: `max-w-2xl` centered

### Section padding

| Pattern | Classes |
|---------|---------|
| Standard section | `py-14 lg:py-16` |
| Page hero | `py-16 lg:py-20` |
| Home hero | `min-h-[calc(85vh-96px)]` with `pt-16 lg:pt-[4.5rem]` |
| Compact CTA | `py-12 lg:py-14` |

### Grid patterns

| Use | Grid |
|-----|------|
| 3-up cards | `grid gap-4 md:grid-cols-3` or `gap-5` |
| 2-up advisory paths | `grid gap-4 md:grid-cols-2` |
| Hero + sidebar card | `lg:grid-cols-[0.9fr_0.75fr]` or `[0.95fr_0.8fr]` |
| Split content + image | `lg:grid-cols-[1fr_420px]` – `[1fr_520px]` |

### Vertical rhythm

- Section intro block → content: `mt-6` – `mt-10`
- Eyebrow → headline: `mb-3` – `mb-4`
- Headline → body: `mt-4` – `mt-7`
- Card internal: `p-5` – `p-6`, `lg:p-8` for featured

---

## 5. Page Architecture

Every marketing page follows the same skeleton:

```
1. Navy hero       — eyebrow + H1 + 1–2 paragraphs [+ optional sidebar card]
2. Content sections — alternating ivory / warm / white / navy
3. Comparison or proof — often navy background with 2-column table
4. CTA block       — bordered ivory card or newsletter strip
```

### Hero pattern

- Background: `bg-brand-midnight text-brand-ivory`
- Eyebrow: champagne, uppercase
- H1: serif, large
- Body: `text-lg leading-8 text-brand-ivory/84`
- Optional **Primary Question** card: `rounded-none border border-brand-ivory/14 bg-brand-ivory/[0.04] shadow-none`

### Section pattern

```
eyebrow (champagne)
H2 (serif, midnight or ivory depending on bg)
body paragraph(s)
content grid / cards / table
```

### Background alternation (typical)

`midnight → ivory → white/warm → ivory → midnight → ivory CTA`

Avoid more than two consecutive sections with the same background.

---

## 6. Components

### 6.1 Buttons

**Marketing CTAs use brand variants only.**

| Variant | When |
|---------|------|
| `brand` | Primary action — champagne fill, midnight text |
| `brandOutline` | Secondary on light backgrounds |
| `brandGhost` | Secondary on navy heroes |
| `brandSapphire` | Profile / form contexts on light bg |
| `brandSapphireGhost` | Secondary on navy in form contexts |

Default shadcn variants (`default`, `outline`, `ghost`) are for internal UI — not homepage CTAs.

**Rules:**
- Always `rounded-brand` (6px) — never pill buttons in marketing
- Uppercase label with `tracking-[0.12em]`
- One primary CTA per viewport section

### 6.2 Cards

Marketing cards override the default shadcn card:

```
rounded-none border border-brand-champagne/35 bg-white/76 shadow-none
```

Dark context:

```
border-brand-ivory/14 bg-brand-ivory/[0.04] shadow-none
```

**Hover (interactive cards):**

```
transition hover:-translate-y-0.5 hover:border-brand-champagne
```

Do not use `rounded-xl`, heavy shadows, or `shadow-lg` on editorial cards.

### 6.3 Comparison tables

Used on Lease, Buy/Sell, About — navy section:

```
overflow-hidden border border-brand-ivory/20
2-column grid with champagne header row
left column: text-brand-ivory/78
right column: text-brand-ivory/92
```

Header cells: `text-xs font-bold uppercase tracking-[0.16em] text-brand-champagne`

Tone: professional contrast, never combative. No words like "bias."

### 6.4 Category / filter pills

```
border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em]
Active: border-brand-champagne bg-brand-midnight text-brand-ivory
Inactive: border-brand-champagne/35 bg-white/70 text-brand-graphite/72
```

### 6.5 Forms & inputs

**Marketing forms** (Manhattan Brief, market report):

- Navy context: `border-brand-ivory/20 bg-brand-ivory/[0.08] text-brand-ivory`
- Light context: `border-brand-champagne/35 bg-white`
- Height: `h-12` for email + submit pairs
- Focus ring: champagne

**Profile / app forms** use standard shadcn Input with `rounded-md`.

### 6.6 Navigation (Header)

- Sticky `bg-brand-midnight`
- Logo left, nav center-right, **Curate Matches** CTA right
- Nav links: uppercase Inter, ivory → champagne on hover
- Underline animation: champagne bar `h-[1.5px]` expands to 86% width
- Bottom rule: `h-[2px]` champagne gradient
- Mobile: full-width stack, same CTA at bottom

**Nav order:** Lease · Buy / Sell · Buildings · Perspectives · About · [Curate Matches]

### 6.7 Footer

- `bg-brand-midnight`, champagne top border `border-brand-champagne/35`
- 3-column: emblem + tagline | nav links | contact
- Links: `text-xs uppercase tracking-[0.14em] text-brand-ivory/72` → champagne hover
- Legal: collapsible `<details>` — never prominent

### 6.8 Building watchlist card

Canonical layout (16:9):

```
┌─────────────────────────────────────────┐
│ NAVY PANEL (44%)  │  PHOTO (56%)       │
│ name, area, price │  object-cover      │
├─────────────────────────────────────────┤
│ AMENITY FOOTER — 4 icons, dark navy     │
└─────────────────────────────────────────┘
```

- `aspect-video` horizontal card
- Left panel: solid `bg-brand-midnight`, serif name, champagne neighborhood
- Price hierarchy: label (small caps) → value (serif)
- Photo: local `/buildings/thumbs/{slug}.webp`, `saturate-[0.92]`
- Footer: 4 amenity icons, `strokeWidth={1.5}`, labels at `text-[0.5rem]`

### 6.9 Perspective / article card

- Standard: white card, **content type tag**, serif title, excerpt, date + read time
- Featured: larger padding, "Featured" label, `text-3xl md:text-4xl` title
- Every perspective displays a `PerspectiveContentTag` — never a generic category label

### 6.10 Article body (Perspectives)

Five labeled sections — always in order:

1. Observation  
2. Context  
3. Interpretation  
4. Implication  
5. Conclusion  

Section label: `text-xs uppercase tracking-[0.22em] text-brand-champagne`  
Body: `text-base leading-7 text-brand-graphite/78`

### 6.11 Step / flow indicators

Horizontal sequence with numbered steps:

```
border border-brand-champagne/35 bg-white px-5 py-4
font-mono text-xs text-brand-champagne (step number)
font-serif text-lg font-semibold text-brand-midnight (step name)
ArrowRight icon between steps on lg+
```

### 6.12 Manhattan Brief block

- Full-width navy section, centered `max-w-3xl`
- Email + Subscribe inline on sm+
- Closing line: *"No spam. No listing blasts. Just thoughtful observations from Manhattan."*

### 6.13 Signature element

`.bespoke-signature` — Allura script with subtle underline gradient.  
**Reserved for:** Home "Bespoke Matches" closing CTA only. Do not reuse elsewhere.

---

## 7. Iconography

- Library: **Lucide React** only — no custom icon sets, no emoji in UI chrome (emoji allowed only in Perspective content type tags)
- Stroke: `strokeWidth={1.5}` – `1.6` (never filled icons in marketing)
- Size: `h-4 w-4` (inline), `h-5 w-5` (cards), `h-6 w-6` (section icons)
- Color: `text-brand-champagne` on light, `text-brand-ivory/95` on dark amenity bars

### Preferred icons

Use these for marketing UI — they read as place, movement, and judgment:

| Icon | Use for |
|------|---------|
| `Building2` | Buildings, towers, watchlist |
| `MapPin` | Neighborhood, location, approach steps |
| `Compass` | Interpretation, advisory paths, orientation |
| `ArrowRight` | Flow steps, next actions |
| `Landmark` | Manhattan context, notable addresses |
| `Briefcase` | Finance, professional relocation |
| `TrainFront` | Commute, transit, access |
| `Trees` | Parks, Hudson River Greenway, outdoor amenity |
| `Users` | Resident profile, who lives here |
| `Clock3` | Timing, market windows, patience |

### Avoid (startup-bro drift)

Never use in marketing sections:

`Brain` · `Rocket` · `Zap` · `Target` · `Lightbulb` · `Sparkles` · `Trophy` · `Bullseye` · `Megaphone`

These signal tech product, hustle culture, or promotional energy — incompatible with luxury restraint.

*Note:* `Sparkles` may appear in legacy/archived components — do not add to new marketing pages.

---

## 8. Imagery

### Photography mix (target allocation)

| Share | Subject | Examples |
|-------|---------|----------|
| **40%** | Buildings | Exteriors, façade detail, lobby architecture, rooftop context |
| **30%** | Interior architecture | Light, materials, views — not staged furniture catalogs |
| **20%** | Neighborhood texture | Streets, parks, waterfront, commute paths, skyline context |
| **10%** | People | Lifestyle atmosphere — never stock corporate scenes |

### Never use

- Handshake photos
- Business meetings around conference tables
- Stock office workers at laptops
- People pointing at screens
- Smiling sales teams
- Generic "diverse professionals" corporate stock

Luxury reads through **place and material**, not through staged human enthusiasm.

### Treatment

- Hero photos: gradient overlay from midnight left → transparent right
- StylizedPhoto component: `saturate-[0.88] contrast-[1.04]` + tone overlay
- Building photos: `saturate-[0.92]`, no aggressive zoom-on-hover
- Edge fades into section background (ivory or white) — never hard clip

### Sources

- Building images: **local only** — `/buildings/` and `/buildings/thumbs/`
- Hero / lifestyle: bundled `@assets` imports
- Never hotlink stock URLs or use AI-generated building substitutes

### Alt text

Descriptive: `"{Building name} in {area}, Manhattan"` — not keyword-stuffed.

---

## 9. Motion & Interaction

| Interaction | Treatment |
|-------------|-----------|
| Card hover | `-translate-y-0.5`, border brightens — no scale |
| Nav hover | Color shift + underline grow (200ms) |
| Buttons | `hover-elevate` (subtle brightness) — no bounce |
| Page transitions | None — instant route change, scroll to top |
| Scroll strips | Horizontal snap for building carousel |

**Avoid:** parallax, auto-playing video, countdown timers, pop-ups, chat that blocks content.

---

## 10. Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `rounded-brand` | 6px | Buttons, cards, inputs in marketing |
| `rounded-none` | 0 | Editorial cards, tables, building cards |
| `rounded-md` | shadcn default | Form fields in Profile |

**Never** use `rounded-full` pills or `rounded-2xl` in marketing sections.

---

## 11. Copy & UX Alignment

Design and copy follow the same rules:

| Principle | UX expression |
|-----------|---------------|
| Observer | Eyebrows name the lens ("Perspectives", "Private Watchlist") — not the product |
| Interpreter | Comparison tables, step flows, labeled article sections |
| Advisor | Single primary CTA per section, no urgency language |
| Humanization | Sparse — relocation and philosophy sections only |
| Luxury | Space, serif headlines, restrained color |

**Banned in UI labels:** "Building Intelligence", "Building-First", "building intelligence platform", "advisory platform", framework jargon, "vs" combative headers.

---

## 12. Page-Specific Notes

| Page | Distinctive pattern |
|------|---------------------|
| Home | Full-bleed hero, philosophy center column, building scroll strip |
| Lease | Direct inquiry comparison table before CTA |
| Buy / Sell | Preparation flow + buyer steps + seller discreet read |
| Buildings | 16:9 watchlist cards, research deliverables grid |
| Perspectives | Featured article + category filters + Manhattan Brief |
| About | Observer / Interpreter / Advisor cards, "A Different Lens" table |
| Profile | Sapphire accents, form-heavy — only page with multi-step UI |

---

## 13. shadcn / Component Library Map

Located in `client/src/components/ui/`.  

**Use in marketing pages:**

- `Button` (brand variants)
- `Card` (with overrides)
- `Input` (newsletter, profile)

**Internal / admin only** — do not surface in marketing:

- `Dialog`, `Sheet`, `Drawer`, `Tabs`, `Chart`, `Table`, `Sidebar`

**Brand-specific components** (`client/src/components/`):

| Component | Purpose |
|-----------|---------|
| `Header` | Global nav |
| `Footer` | Global footer |
| `AgentKammerHorizontalLogo` | Logo |
| `PerspectiveCard` | Perspectives listing |
| `ManhattanBriefSubscribe` | Newsletter capture |
| `MarketReportDownload` | NYC market PDF gate |
| `FloatingChatAssistant` | Advisory chat (lazy-loaded) |

---

## 14. Do / Don't Checklist

### Do

- [ ] Use `max-w-7xl` container on every section
- [ ] Alternate section backgrounds
- [ ] Keep eyebrows champagne + uppercase
- [ ] Use serif for headlines, sans for everything else
- [ ] Override cards to `rounded-none shadow-none`
- [ ] Write comparison tables in professional tone
- [ ] Load only Inter, Cormorant Garamond, Allura

### Don't

- [ ] Add listing-search UI (filters, map pins, save-heart)
- [ ] Use bright primary blue or green success states in marketing
- [ ] Add rounded-xl property cards or portal-style grids
- [ ] Stack multiple primary champagne buttons in one viewport
- [ ] Use script font outside Bespoke Matches
- [ ] Introduce new pages without navy hero + section rhythm
- [ ] Add blog-style dates, author photos, or comment sections to Perspectives

---

## 15. Accessibility Baseline

- Header menu: `aria-label="Toggle menu"`
- Footer nav: `aria-label="Footer"`
- Form inputs: `aria-label` on email fields
- Color contrast: ivory on midnight and graphite on ivory meet WCAG AA for body text
- Focus: `focus-visible:ring` on interactive elements — champagne ring in brand contexts

---

## 16. File Reference

| Concern | Location |
|---------|----------|
| Color tokens | `tailwind.config.ts` → `theme.extend.colors.brand` |
| CSS variables | `client/src/index.css` → `:root` |
| Fonts | `client/src/index.css` `@import @fontsource/*` + `index.html` (Allura) |
| Button variants | `client/src/components/ui/button.tsx` |
| Page patterns | `client/src/pages/*.tsx` |
| Building card | `client/src/pages/Buildings.tsx` → `BuildingWatchlistCard` |
| Home constants | `client/src/pages/Home.tsx` → `sectionHeadline`, `eyebrow` |
| Perspective types | `client/src/data/perspectives.ts` → `perspectiveContentTypes` |
| Content type tag | `client/src/components/PerspectiveContentTag.tsx` |
| Editorial pipeline | `EDITORIAL_CALENDAR.md` |

---

## 17. Content Ecosystem

### Site IA (current)

| Nav item | Role |
|----------|------|
| Lease | Entry path — relocation, luxury leasing |
| Buy / Sell | Transactions — preparation, buyer/seller judgment |
| Buildings | Curated watchlist — which towers to study |
| Perspectives | Long-form observations — the content hub |
| About | Identity — Observer → Interpreter → Advisor |

**Perspectives is the long-term content umbrella.** Eventually: Market Briefs, Neighborhood notes, Client Stories, Development commentary, and Relocation guides all live here — not as separate blog verticals.

### Perspective content types (required on every article)

| Tag | Emoji | Use for |
|-----|-------|---------|
| Building | 🏢 | Tower-specific interpretation, resident profile, building behavior |
| Neighborhood | 📍 | Micro-market rhythm, placement, block-level context |
| Market Note | 📊 | Pricing, liquidity, timing, inventory behavior |
| Relocation | 🚕 | Career moves, commute, entering Manhattan |
| Development | 🏙 | Urban development, office/residential construction, city trajectory |
| Lifestyle | 🥂 | Luxury living, proximity, lease-to-buy arcs, daily life |

Component: `PerspectiveContentTag` — champagne border pill, emoji + uppercase label.  
Data: `client/src/data/perspectives.ts` → `contentType` field.

Filter pills on `/perspectives` use the same six types — not open-ended category lists.

### Perspective vs blog (non-negotiable)

**Every Perspective must answer one question.** If it does not, it is a blog post — do not publish.

| Bad (blog) | Good (perspective) |
|------------|-------------------|
| The Complete Guide To Manhattan Luxury Apartments | Why Manhattan Keeps Building Offices |
| 10 Best Buildings In Chelsea | Why Some Luxury Buildings Feel Empty |
| Top 10 Luxury Buildings | The Hidden Cost Of A Bad Commute |
| Best Apartments In NYC | Luxury Is Often Proximity |
| How To Rent In Manhattan | Leasing Today, Buying Tomorrow |

Additional rules:

- Headlines are **theses or questions** — never guides, rankings, or "complete" promises
- One idea per article — Observation → Conclusion structure
- No SEO volume play — authority over frequency
- Tag with exactly one content type (§17)

**Success test:** Visitor thinks *"Agent Kammer studies Manhattan more carefully"* — not *"Agent Kammer publishes a lot of content."*

See `EDITORIAL_CALENDAR.md` for the publishing pipeline.

### Building Reports (the moat — not yet shipped)

Watchlist cards are the entry point. **Building Reports** are the differentiated product.

Example: **Lantern House Report** — full structure in `BUILDING_REPORT_TEMPLATE.md` (8 sections: Overview → Who It Doesn't).

**Not Zillow. Not listing data. Interpretation.**

Future route pattern: `/buildings/{slug}/report` or linked PDF from watchlist card.  
Visual system: same navy/ivory/champagne, serif headlines, no portal UI.

Until reports ship, Buildings page lists research deliverables as placeholders — do not fake data.

---

## 18. Pre-License Public Positioning

Until exam, brokerage affiliation, and brokerage advertising rules are confirmed:

**Do not show on public pages:**
- Licensed Real Estate Salesperson
- Equal Housing Opportunity
- Agency disclosure / fair housing language
- Brokerage name or MLS attribution
- Google Business Profile (wait until licensed and brokerage guidance is clear)

**Footer (current — sufficient):**

```
Agent Kammer
Modern Manhattan Luxury

New York, NY
info@agentkammer.com

Copyright · Privacy · Terms
```

**Position publicly as:** Manhattan observer and advisor-in-development — not an active licensed agent.

**Google Business Profile:** Launch only after (1) exam passed, (2) brokerage affiliation, (3) brokerage-approved disclosures and branding.

---

## 19. Evolution Path

Design consistency at this stage comes from **restraint**, not more components.

Priority order:

1. **Building Reports** — first real moat (Lantern House or similar)  
2. **Perspectives** — one strong note at a time, tagged by content type  
3. **Manhattan Brief** — monthly digest tying reports + observations  
4. **Real photography** — building exteriors, neighborhood texture  
5. **Who We Work With** — client-type recognition (Lease or About)  

Do not expand the component library until a pattern repeats three times across pages.

---

*Agent Kammer design system — advisory first, portal never.*
