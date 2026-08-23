# Agent Kammer — Brand Operating Manual

**Canonical brand reference.** Hand this to Claude, ChatGPT, Grok, Figma, developers, and future teammates.

| Layer | Where it lives |
|-------|----------------|
| **This document** | Mission, philosophy, Brand DNA, visual inspiration, voice, vocabulary, visual system, UI principles, writing, platform vision |
| **Code tokens (implementation)** | `client/src/index.css` · `tailwind.config.ts` · `client/src/lib/design-system.ts` |
| **Public IA / URLs** | https://www.agentkammer.com/llms.txt · sitemap.xml |
| **Product architecture** | `docs/architecture/SYSTEM-DESIGN.md` · `docs/product/DECISION-BLUEPRINT.md` · `docs/product/BELONGING-ASSESSMENT.md` · `docs/product/RESIDENTIAL-ADVISORY.md` · `docs/product/DECISION-CASES.md` |

If this doc and code disagree on colors/type, **code wins** — then update this file.

Live site: https://www.agentkammer.com  
Contact: info@agentkammer.com · United States (Phase 1 nationwide · Phase 2 Manhattan specialization)

### Repo / deploy firewall (do not confuse brands)

**Fresh1** = Success Chemistry ecom — separate GitHub (`rrk3311-USA/Fresh1`) + separate Vercel project (`scv2-success-chemistry`).  
**AgentKammer** = this repo only (`rrk3311-USA/AgentKammer`) → Vercel project `agentkammer`.

Never deploy Fresh1 / Success Chemistry into the `agentkammer` Vercel project. Never point Agent Kammer production contact (`CONTACT_INBOX`, public mailto, email defaults) at Success Chemistry. Archive docs that mention `info@successchemistry.com` are historical only.

---

## 1. Mission

Help people make better real estate decisions — including the decision to do nothing — before listings, showings, or urgency take over.

Agent Kammer is a **Residential Advisory** practice: ongoing strategic guidance for life’s biggest residential decisions, clarity on complex choices, and connection to the right local professionals when transaction expertise is needed. The recommendation can legitimately be “stay put.”

The internal system that powers the product may be called a Decision OS; that name is **not** the public brand.

---

## 1b. Brand stack (memorize this)

```txt
Agent Kammer
Residential Advisory

Buildings before listings.     ← core philosophy (permanent)
Better real estate decisions.  ← customer promise
Live Where You Belong.         ← outcome (not a move slogan)
What’s changing?               ← conversation opener

Ongoing strategic guidance for life’s biggest residential decisions.
                               ← practice positioning line
```

**Permanent foundation:** *Buildings before listings* is not a Manhattan slogan and not an inspector credential. It means: **the quality of the asset matters more than the marketing of the listing.** That is true in New York, Miami, Dallas, Seattle — anywhere.

**Outcome line:** *Live Where You Belong* is not “you should move.” It is the result of good judgment — stay, renovate, rent, buy, sell, or wait — whichever best aligns with the life someone is trying to live.

---

## 2. Decision Philosophy

These principles are the foundation for every feature, page, and recommendation.

- **Decisions before emotions.**
- **Buildings before listings.** (permanent — geography-independent)
- **Clarity before commitment.**
- **Diagnose before prescribing.** Ask questions before recommending. The method is primary-care judgment, not transaction closing.
- **The highest-value recommendation may be to do nothing.**
- **Doing nothing is not the same as belonging.** Someone can stay and still be poorly served by their environment.
- **Intelligence reduces regret.**
- **Advice should remain valuable even if no transaction occurs.**
- **Judgment before access.** Clients hire Agent Kammer for judgment — not for access to listings.
- **Independent advice first; execution through the right team second.**
- **Help-worthiness over close-likelihood.** Score how much we can genuinely help — not only how likely someone is to buy or sell.

If a feature only works when someone buys or sells, it fails this philosophy.

### Two questions (decision spine)

Housing decisions are deeper than “Should I buy or sell?” They resolve into two separate questions, in order:

1. **Should anything change?** — Sometimes the answer is no.
2. **Are you living where you belong?** — Even if nothing changes, is this environment still serving who you want to become?

“Live Where You Belong” is the **outcome** of that process — not a sales slogan. Valid answers include stay, renovate, rent, buy, sell, wait, or do nothing yet.

**Analogy (explain the method; do not brand as this):** Primary-care physician for housing decisions — diagnose the fit between person and home, then prescribe. Do **not** call the brand “House Doctor” publicly; it reads as inspector/repair. Preferred framing: *I diagnose housing decisions before recommending solutions.*

---

## 3. Positioning

**Core line:** Clients hire Agent Kammer for judgment, not access to listings.

**Practice / category:** Residential Advisory  
**Practice line:** Ongoing strategic guidance for life’s biggest residential decisions.  
**Promise:** Better real estate decisions.  
**Philosophy:** Buildings before listings.  
**Outcome:** Live Where You Belong.  
**Wedge:** What’s changing?  
**Spine:** Should I do anything at all?  
**Diagnostic:** Are you living where you belong?

| Layer | Line | Role |
|-------|------|------|
| Practice | Residential Advisory | Public category — consulting / wealth-management peer set |
| Practice line | Ongoing strategic guidance for life’s biggest residential decisions. | What the practice is |
| Philosophy | Buildings before listings. | Permanent — asset quality over listing marketing |
| Promise | Better real estate decisions. | What clients hire us for |
| Outcome | Live Where You Belong. | Tagline — applies whether they move or not |
| Diagnostic | Are you living where you belong? | Assessment question — not the tagline |
| Opener | What’s changing? / Should anything change? | Conversation and homepage spine |

**Public explanation:**

> Agent Kammer Residential Advisory provides ongoing strategic guidance for life’s biggest residential decisions — and connects clients with the right local professionals when transaction expertise is needed.

That works in New York, California, Florida, Texas — anywhere in the U.S.

**Perception shift:**

| Instead of | Say |
|------------|-----|
| I’m looking for clients | I’m building a residential advisory practice |
| Discovery Call | Housing Strategy Session |
| Close / convert | Solve a real problem; membership if guidance should continue |
| Bundle of monthly calls | Ongoing advisory relationship |

**Public advisory journey (unmistakable sequence):**

```txt
1. What's Changing?          → /services (life-change Decision Briefs)
2. Decision Assessment       → /belonging (Decision Profile)
3. Relevant Decision Brief   → situation / path / research page
4. Strategy                  → Housing Strategy Session + written summary / Decision Blueprint™
                             → membership if guidance should continue
```

Do **not** collapse Start Here and Decision Assessment into the same step. Start Here (`/buyer-advisory`) is the journey map. The Assessment is the diagnostic. Decision Briefs are the research layer. Strategy is the paid advisory relationship.

**Commercial journey:**

```txt
Insights / Decision Briefs
  → Paid Housing Strategy Session
  → Written strategy summary / Decision Blueprint™
  → Soft invite to advisory membership (when decisions will evolve)
```

**OS browse surface (`/services`) — three questions:**

```txt
What's Changing?
What Decision Are You Facing?
What Are You Trying to Understand?
```

**Long-term product frame (internal):** Housing Decision OS — decision intelligence, building intelligence, research library, personal decision profile, long-term planning, professional referrals when execution is needed. Do **not** lead marketing with “Decision OS”; lead with Residential Advisory and the four-step journey.

You’re creating a **decision profile**, not collecting a lead. You’re selling judgment, not local market access. The product is the **ongoing advisory relationship**; sessions are one way clients access expertise — do not center everything on “calls.”

Offerings, pricing bands, and membership tiers: [`docs/product/RESIDENTIAL-ADVISORY.md`](../product/RESIDENTIAL-ADVISORY.md).

**Primary lead magnet (not a home valuation):**

> Find out if you’re living where you belong.

Spec: [`docs/product/BELONGING-ASSESSMENT.md`](../product/BELONGING-ASSESSMENT.md)

**Not:** Buy | Sell | Rent as the first frame.  
**Not:** Another listing portal, CMA mill, or “luxury brokerage” brochure.  
**Not:** A casual referral / “matchmaker” story.  
**Not:** “Get a home valuation” as the front door.  
**Not (Phase 1):** Leading as an NYC-only specialist.

We diagnose life change and belonging, map options and trade-offs, then use building-quality judgment. A valid recommendation can be stay put, renovate, refinance, wait, lease, rent elsewhere, buy, sell, or relocate — then, when needed, assemble the right local team.

### Category lock: Residential Advisory + Decision Intelligence for Housing

**Residential Advisory** is the public practice category — Raphael-led, editorial voice, peer set with consulting and executive advisory. Underneath that, whenever we describe the *product* (Decision Hub, saved Cases, the Guidance Advisor, AI-assisted intake) rather than the practice, the category to own is:

**Decision Intelligence for Housing.**

Not:

- **“AI Real Estate Advisor”** — reads like a chatbot with a name tag.
- **A chatbot** — the Guidance Advisor is a tool inside a decision practice, not the product itself.
- **Zillow-style agent tools** — listings-first, transaction-first.
- **“Discovery Call”** — sales-process language; use Housing Strategy Session.
- **Call packages** — memberships are ongoing advisory relationships, not bundled meetings.

**Competitor frame to hold when writing product copy:** wealth advisors, executive coaches, McKinsey-style consultants, concierge relocation firms — not Zillow agents. Those categories keep **client files** and **engagements**, not “user accounts.” Agent Kammer’s product language should read the same way.

### Cases, not users

The mental model behind the Decision Hub is a **Case** — one housing decision, tracked over time — not a “user” with a login. A Case looks like:

```txt
Executive Relocation · Status · Research · Decision Confidence · Primary Goal · Tradeoffs · Buildings · Last Recommendation
```

Full model, and how this maps to today’s schema vs. a future rename: [`docs/product/DECISION-CASES.md`](../product/DECISION-CASES.md).

**Private advisor remembers you.** The save/return flow (email + PIN, no password) should always read as a private advisor remembering a client’s Case — never as SaaS account creation:

```txt
No account required → chat freely → save by email → PIN → resume anywhere
```

What a client receives back is a **Decision Recap**, not a raw transcript. Full auth model: [`docs/product/ACCOUNT-AUTH.md`](../product/ACCOUNT-AUTH.md).

### When a transaction is appropriate

Agent Kammer remains the **continuity and advisory layer**. Transaction work is handled by the right professional for that client’s specific market and needs.

1. Curate / assemble / coordinate the right brokerage and specialists.
2. Stay with the client as the trusted advisory layer throughout.
3. The client experiences **one trusted advisor**; licensed local execution is handled by the appropriate partner.

### Phase 1 vs Phase 2 (do not rebuild the brand)

| | Phase 1 (now · next 3–5 months) | Phase 2 (after NY salesperson license + ICC depth) |
|--|--------------------------------|-----------------------------------------------------|
| **Market** | Nationwide decision guidance | Manhattan specialization layered on |
| **Public category** | Residential Advisory | Manhattan Residential Advisory *or* Building Intelligence for Manhattan |
| **Emphasis** | Strategy sessions, memberships, referral network, audience | Building reports, executive relocation, high-end NYC advisory |
| **Philosophy** | Buildings before listings | Same — unchanged |
| **Promise** | Better real estate decisions | Same — unchanged |

Phase 2 adds credentials and geography proof. It does **not** change identity.

**Proof categories (ecosystem):** Belonging Assessment · Decision Brief · Timeline · Vision Board · Building Report · AI Advisor (Guidance Advisor). Show the system working together — not philosophy alone, and not a property grid.

---

## 4. Website today vs platform tomorrow

Do not optimize only for a marketing site. Today’s surfaces are the front door; tomorrow’s moat is returning-user intelligence.

### Website (today)

- Education
- Belonging Assessment (free diagnostic — planned / front door)
- Decision Briefs
- Building Reports
- Contact / Housing Strategy Session intake
- À la carte advisory (Strategy Session · Building Second Opinion · Portfolio Review)
- Guidance Advisor (early clarity)

### Platform (tomorrow)

- Accounts
- AI memory (decision profiles from assessments)
- Timeline
- Vision Board
- Building projects
- Remodel planner (including from uploaded photos)
- Saved buildings
- Goal tracking
- Advisory memberships (Essentials · Executive · Private Residential Office)
- Ongoing advisory / returning-user dashboards
- Opportunity routing (help-worthiness + follow-up cadence)

When building new work, ask: does this only improve the brochure, or does it advance the platform loop?

---

## 5. Success metrics

We are **not** optimizing for:

- Page views
- Time on site
- Listing clicks

We **optimize** for:

- Better decisions
- Reduced uncertainty
- Qualified advisory relationships
- Long-term trust
- Returning users

Product, content, and UX choices should be judged against this list — not vanity traffic.

---

## 6. Voice

| Attribute | Meaning |
|-----------|---------|
| Measured | No manufactured urgency |
| Private | Advisory, not performative |
| Precise | Specific buildings, trade-offs, constraints |
| Adult | Respect the client’s uncertainty |
| Protective | Highest expected-value recommendation — even “do nothing” |
| Independent | Willing to recommend no deal |
| Continuity | Stays the trusted advisor when a transaction team is curated |

**Tone:** Quiet confidence. Editorial, not hype. Think private counsel, not portal marketing.

**Avoid:** Hustle language, “dream home,” emoji decoration, purple/glow AI aesthetics, newspaper-broadsheet density, cream-and-terracotta cliché stacks used as lazy luxury defaults.

---

## 7. Brand DNA

How the brand should **feel** — not only how it should look. Use this when briefing AIs, designers, or new pages.

### Feeling

- Intelligent
- Calm
- Architectural
- Editorial
- Timeless
- Premium
- Private

### Avoid

- Tech startup
- Luxury cliché
- Corporate
- Flashy
- Salesy
- AI-looking

If a layout could belong to a SaaS landing page, a gold-and-marble “luxury” template, or a neon AI demo, it fails Brand DNA.

---

## 8. Visual Inspiration

Reference the *discipline* of these brands — not pastiche or logo borrowing.

**Inspired by**

- Aman — quiet hospitality, restraint, privacy
- Monocle — editorial intelligence, global calm
- Kinfolk — paced, considered lifestyle
- Apple — clarity, hierarchy, product as proof
- Dieter Rams — less, but better; honest structure
- Architectural Digest — building and space literacy
- Foster + Partners — architectural rigor, material honesty
- The Financial Times — clarity of information (not FT layout pastiche)

When someone asks an AI to “design a new page,” point here first, then to Colors and Typography.

---

## 9. Messaging hierarchy

1. **Brand** — Agent Kammer (hero-level; never demote to nav-only)
2. **Category** — Residential Advisory
3. **Practice line** — Ongoing strategic guidance for life’s biggest residential decisions.
4. **Philosophy** — Buildings before listings.
5. **Promise** — Better real estate decisions.
6. **Outcome** — Live Where You Belong. (tagline — move or not)
7. **Wedge** — What’s changing? / Should anything change?
8. **Diagnostic** — Are you living where you belong? (assessment, not slogan)
9. **Proof** — Ecosystem artifacts (assessment report, briefs, reports, advisor)
10. **Paid entry** — Housing Strategy Session (not “Discovery Call”)
11. **Ongoing** — Advisory membership when decisions evolve (relationship, not call bundle)
12. **Execution (when needed)** — Curate / assemble / coordinate the right local transaction team; Agent Kammer remains continuity
13. **CTA** — Find out if you’re living where you belong · Begin the decision · Book a Housing Strategy Session

One job per section. One headline. One short supporting sentence. Cards only when they hold an interaction.

---

## 10. Vocabulary

### Approved (public)

| Term | Use |
|------|-----|
| Agent Kammer | Brand name |
| Residential Advisory | Preferred public practice / category |
| Agent Kammer Residential Advisory | Full practice name when space allows |
| Ongoing strategic guidance for life’s biggest residential decisions. | Practice positioning line |
| Buildings before listings | Permanent core philosophy — not geography-bound |
| Better real estate decisions | Customer promise |
| Live Where You Belong | Outcome / tagline — stay or move can both be correct |
| Judgment, not access to listings | Positioning line |
| What’s changing? | Primary wedge / dock prompt |
| Should I do anything at all? / Should anything change? | Homepage spine / first decision question |
| Are you living where you belong? | Diagnostic question — assessment lead magnet, not the tagline |
| Find out if you’re living where you belong | Assessment CTA (preferred over “get a valuation”) |
| Belonging Assessment | Free life-fit diagnostic (product name) |
| Decision Profile | Personalized assessment report + internal profile |
| Housing Strategy Session | Canonical first paid session — replaces Discovery Call |
| Building Second Opinion | À la carte review of one building / property |
| Residential Portfolio Review | À la carte review of every property owned |
| Advisory membership | Ongoing relationship (Essentials · Executive Advisory · Private Residential Office) |
| Housing Advisory | Preferred entry hub name (evolving from Buyer Advisory) |
| Decision Brief | Content unit for situation landings |
| Research Library | Footer brand surface — searchable browse layer, complementary to the Guidance Advisor (Think). Preferred over “Decision Library” |
| Building Report / Building Intelligence | Asset- and market-level evidence (Phase 2 deepens Manhattan) |
| Guidance Advisor | Chat persona (one name only) |
| Begin the decision | Primary CTA (alongside assessment CTA where appropriate) |
| Book a Housing Strategy Session | Paid-entry CTA (preferred over “Request a call”) |
| Decision Blueprint™ | Post–Housing Strategy Session deliverable (not a “proposal”) |
| Raphael Kammer | Principal — introduce early on branded surfaces |
| Curate the right transaction team | When a deal is appropriate |
| Assemble the right professionals | Same idea — intentional, high-end |
| Coordinate the right brokerage partner | Partner language |
| Recommend the right transaction specialist | Specialist language |
| Build the right advisory team | Continuity + partners |
| Continuity and advisory layer | Agent Kammer’s role during a transaction |
| Manhattan Residential Advisory | Phase 2 category option |
| Building Intelligence for Manhattan | Phase 2 emphasis option |
| Decision Intelligence for Housing | Product-layer category — pair with Residential Advisory whenever describing the Decision Hub / AI-assisted layer specifically |
| Case / Decision Case | Mental model for a saved visitor and their decision — not “user” or “account” (see [`docs/product/DECISION-CASES.md`](../product/DECISION-CASES.md)) |
| Resume My Decision | Primary CTA for returning to a saved Case (replaces “Create my account” / “Sign in”) |
| My Decision | Preferred page/section label for the Decision Hub (replaces “Dashboard” / “My Account”) |
| Continue Planning | Alternate CTA for resuming a Case |
| Decision History | Preferred label for saved briefs/recaps over time (replaces “login history”) |
| Decision Hub | Neutral product noun — fine to keep as a URL and section label |
| Private advisor remembers you | Framing for the save/return flow — email + PIN reads as memory, not account creation |

### Internal only (do not lead public UI)

| Term | Use |
|------|-----|
| Decision OS / Housing Decision Operating System | Architecture docs, engineering, admin |
| Blueprint Begin | Retire as public header CTA label; prefer Begin the decision |
| Decision Assistant | Prefer Guidance Advisor publicly |
| Decision Quality Score / Opportunity Score | Internal — help-worthiness and follow-up routing |
| Lead score | Ops only; never frame the visitor experience as “lead capture” |
| House Doctor | Method analogy only — never public brand or headline |
| “Account” / “member profile” | Backend/schema terms (`member_profiles` table) — fine in code and internal docs, not as a public UI label |

### Retired / avoid

| Term | Why |
|------|-----|
| Discovery Call | Sales-process language; use Housing Strategy Session |
| Real Estate Strategist | Superseded by Residential Advisory as the public category |
| “I’m looking for clients” | Undersells the practice; say residential advisory practice |
| Call package / “X calls per month” as the product | Product is the advisory relationship; sessions are one access method |
| Matchmaker / matchmaking | Sounds informal; use curate / assemble / coordinate |
| “I just refer people” | Undersells continuity and judgment |
| Leading as NYC-only specialist (Phase 1) | Premature; broaden first, specialize in Phase 2 |
| Proposal (for Blueprint) | Sounds salesy; use Decision Blueprint™ |
| Buy \| Sell \| Rent as primary nav | Erases differentiation |
| Listing-first language | Portal behavior |
| Home valuation / CMA as primary lead magnet | Transaction funnel; prefer Belonging Assessment |
| “House Doctor” as brand or headline | Sounds like inspector/repair; keep as private analogy |
| Success Chemistry / SC contact defaults | Wrong brand — production inbox is `info@agentkammer.com` only |
| Transaction-only success | Conflicts with Decision Philosophy |
| Treating “Buildings before listings” as inspector marketing | It’s asset-quality philosophy, not a credential flex |
| Treating “Live Where You Belong” as “you should move” | Outcome includes stay, renovate, wait |
| “Account” as a primary UI label | Sounds like software signup; use Resume My Decision / My Decision |
| “Dashboard” | SaaS-feeling; use My Decision / Decision Hub |
| “Login” / “Sign in” | Use Resume My Decision |
| “Profile” as a UI label | Use My Decision / Decision Map (note: “Decision Profile” the diagnostic product name is still approved) |
| “AI Real Estate Advisor” | Sounds like a chatbot; category is Decision Intelligence for Housing |
| Leading with chatbot framing | Guidance Advisor is a tool inside the practice, not the product |

---

## 11. Colors

Implementation: CSS variables in `client/src/index.css` and `brand.*` in `tailwind.config.ts`.

| Token | Hex | Role |
|-------|-----|------|
| Ink | `#20242B` | Primary text |
| Navy | `#2A3447` | Heroes, header, dark UI |
| Midnight | `#202735` | Deeper navy |
| Charcoal / Graphite | `#2C3138` | Shell, secondary text |
| Ivory / Surface | `#F5F2EB` | Page canvas |
| Border / Stone | `#D8D1C7` | Hairlines, dividers |
| Gold / Brass / Champagne | `#B08D57` | Accent — **sparingly** (eyebrows, active states, one accent per view max) |
| Cocoa | `#7A5A3A` | Eyebrows on light surfaces |
| Success | `#2F6B4F` | Positive status |
| Error | `#B42318` | Errors |

**Palette feel:** Navy + ivory + restrained brass. Private practice, not portal chrome. Do not default to purple gradients, neon glow, or warm-cream + terracotta “AI luxury” kits.

---

## 12. Typography

| Role | Family | Notes |
|------|--------|-------|
| Display / headlines | **Cormorant Garamond** | Expressive serif; large, tight leading |
| Body / UI | **Inter** | Sans for nav, forms, captions |
| Script (rare) | **Allura** | Signatures only |

Licensed ideals (when available): Canela / Noe Display / Neue Haas Grotesk — see `design-system.ts` comments. Until then, Cormorant + Inter are production.

**Patterns**

- Eyebrows: small caps / uppercase, wide tracking (`~0.14–0.3em`), cocoa or brass
- H1: display clamp, leading ~0.88–0.95, navy or ivory on dark
- Body: graphite, comfortable line length (`max-w-reading` ~680px)

---

## 13. Logo usage

**Production files:** `client/public/brand/`

| File | Use |
|------|-----|
| `ak-monogram.png` | Default monogram |
| `ak-monogram-ivory.png` | On dark / navy |
| `ak-monogram-midnight.png` | On light |
| `ak-monogram-source.png` | Source |

**Horizontal lockup:** `AgentKammerHorizontalLogo` component (header).

**Rules**

- Brand is a hero-level signal on branded pages — not only nav text
- Clear space: keep the mark readable; don’t trap it in dense chrome
- Don’t stretch, recolor ad hoc, or place on busy photo without a navy/ivory scrim
- Drop-zone folder `brand/` at repo root is for asset intake; **shipped** logos live under `client/public/brand/`

---

## 14. Photography style

| Do | Don’t |
|----|-------|
| Real Manhattan context: terrace, skyline, building fabric | Stock “happy couple with keys” |
| Atmosphere with restrained saturation / contrast | Neon overlays, sticker badges on heroes |
| Full-bleed or dominant plane on landing heroes | Inset rounded media cards as the main idea |
| Product proof: report UI, brief, timeline | Decorative gradient as the only visual |

Live homepage hero asset: `/images/how-we-think-terrace.jpg`  
Advisor portrait: `/images/decision-guide-raphi.png`

---

## 15. UI principles

1. **One composition** per first viewport — not a dashboard
2. **Brand first** — name/mark must survive the “remove the nav” test
3. **Hero budget** — brand, one headline, one short sentence, one CTA group, one dominant visual
4. **No hero overlays** — no floating badges, promo chips, or detached stickers on media
5. **Cards are rare** — default open layout; cards only for interaction
6. **One job per section**
7. **Hairline structure** — borders over heavy shadows
8. **Motion** — intentional presence (2–3), not noise; fade / slight translate
9. **Focus** — visible brass/navy focus rings for accessibility
10. **Mobile and desktop** both load as complete compositions
11. **Continuous editorial story** — pages should feel like one article, not a stack of excellent modules
12. **Three ideas max** in the main narrative below the hero (plus a closing CTA). If a page needs six sections of equal weight, cut.

Layout helpers: `siteContainer`, `sectionY`, type scales in `client/src/lib/design-system.ts`.  
Shell primitives: `PageHero`, `PageSection`, `SectionHeading`, `CTA` in `site-shell.tsx`.

### Page architecture (density rule)

Identity and IA can be excellent while the page still feels dense. Prefer **fewer sections with more air**.

| Surface | Target shape |
|---------|----------------|
| **Home** | Hero → Are you living where you belong? → How we decide → Building Intelligence → Featured Decision Briefs → Private Advisory CTA → Footer |
| **Decision Brief (service landing)** | Title → one dominant image/drawing → three paragraphs → one quote → one recommendation → Belonging CTA → next brief |
| **About** | Editorial article rhythm + architectural sketches between sections — not card grids |
| **Footer** | Brand surface, not a standard footer — **Research Library** (Browse): quiet brand line, rotating-placeholder search, Popular Searches pills, reduced quick-link cluster. Complementary to the Guidance Advisor dock (Think). Do not repeat the full taxonomy on every page as visual noise |
| **Primary CTA** | Find out if you’re living where you belong / Start Decision Assessment — not “Request a Call” as the default offer |

**Anti-pattern:** Hero → hierarchy → scenarios → what you receive → CTA → footer taxonomy. That is six ideas. Cut to three narrative beats plus CTA.

**Browse vs Think:** The site now carries two complementary layers on every page — the footer **Research Library** (Browse: search, Popular Searches pills, curated links) and the **Guidance Advisor** dock (Think: conversational diagnosis, Decision Blueprint progress). The footer should never try to replicate the dock's conversational chips; it stays a quiet, searchable library. A tiny hand-off (e.g. a library search result opening the matching Decision Brief) is enough for this pass — a full "Read the Framework / Guide Me" cross-link between the two layers is a documented next step, not required here.

---

## 16. Homepage hierarchy (target)

**First viewport**

1. Agent Kammer (brand)
2. Residential Advisory (category — not “Decision OS”)
3. Buildings before listings. (philosophy signal)
4. Headline: Live Where You Belong. (outcome)
5. One supporting sentence (practice line or promise)
6. Primary CTA: Find out if you’re living where you belong / Start Decision Assessment → `/belonging`
7. Dominant visual = terrace / building atmosphere (full-bleed plane)

**Below fold (keep lean)**

1. Are you living where you belong? (diagnostic)
2. How we decide (three questions only)
3. Building Intelligence (one beat)
4. Featured Decision Briefs (short list)
5. Residential Advisory → Belonging Assessment or Housing Strategy Session

**Nav language:** Keep life-change framing (Start Here · Decisions · Life Changes · Building Intelligence · About). Do **not** regress to Buy | Sell | Rent as primary IA.  
**Header CTA:** Decision Assessment → `/belonging` (not “Begin the decision” as the default product offer).

---

## 17. Component examples (patterns)

```txt
Eyebrow     → uppercase tracked cocoa/brass label
Headline    → Cormorant, navy, clamp size
Body        → Inter, graphite, max ~2 lines in hero
Primary CTA → navy fill, “Start Decision Assessment” / Find out if you belong → `/belonging`
Secondary   → border only, quieter action
PageHero    → navy band + optional blueprint art (inner pages)
Section     → ivory canvas, hairline borders, generous py-30/40
Dock        → Guidance Advisor; full labels (not LIFES… truncation)
```

Forms (Contact): structured qualification — what changed, decision type, timeline, budget, preferred next step.  
Belonging Assessment: life questions first (not listing filters) — see product brief. `/belonging` is the public front door.

---

## 18. Writing examples

### Strong

> Start with what feels unclear.

> Should anything change? We start with life change, uncertainty, and trade-offs before buildings or listings.

> Are you living where you belong?

> Find out if you’re living where you belong.

> Live Where You Belong — whether that means stay, renovate, rent, buy, sell, or wait.

> I diagnose housing decisions before recommending solutions.

> People do not wake up wanting to tour apartments. They wake up because life changed.

> Start with what changed, not what is for sale.

> The recommendation may be to wait, renew, renovate, or do nothing.

> Doing nothing can be right — and still leave the question: is this where you belong?

> Buildings before listings. Better real estate decisions.

> Clients hire Agent Kammer for judgment, not access to listings.

> I’m building a residential advisory practice.

> Ongoing strategic guidance for life’s biggest residential decisions.

> Book a Housing Strategy Session — one major decision, a written action summary.

> Some clients only need one conversation. Others prefer an ongoing advisory relationship.

> When a transaction is right, we curate the right local team — and remain the advisory layer throughout.

> One trusted advisor. The right professionals for execution.

> Independent advice — including when the best move is to stay put.

### Weak

> Find your dream Manhattan home today!

> Housing Decision Operating System (as the public H1 category)

> Book a Discovery Call

> I’m looking for clients

> X strategy calls per month (as the product definition)

> Buy · Sell · Rent — start searching

> Get your free home valuation

> Limited inventory — act now

> We’re disrupting real estate with AI

> Your House Doctor for Manhattan

> I’m a matchmaker for buyers and brokers

> I just refer you to someone who can help

> NYC’s premier luxury listing specialist (Phase 1)

---

## 19. Do / Don’t

| Do | Don’t |
|----|-------|
| Lead with What’s changing? / Should anything change? | Lead with listings or Buy/Sell/Rent nav |
| Use Live Where You Belong as an outcome (stay or move) | Treat it as a “you should move” slogan |
| Use Are you living where you belong? as the diagnostic | Confuse the diagnostic with the tagline |
| Offer Belonging Assessment before valuation forms | Lead with “get a home valuation” |
| Score help-worthiness internally | Optimize only for close-likelihood |
| Say Residential Advisory | Lead with Decision OS or “Real Estate Strategist” on marketing surfaces |
| Say Housing Strategy Session | Say Discovery Call |
| Frame memberships as ongoing advisory | Sell “call packages” |
| Keep Buildings before listings as permanent philosophy | Treat it as Manhattan-only or inspector marketing |
| Lead with judgment, not listing access | Sell “access” or portal inventory |
| Advise nationwide; curate local experts | Over-claim NYC specialty before Phase 2 |
| Curate / assemble / coordinate the right team | Say “matchmaker” or “I just refer” |
| Remain the continuity layer during a deal | Disappear once a brokerage is introduced |
| Say “building a residential advisory practice” | Say “looking for clients” |
| Match Brand DNA (calm, architectural, private) | Tech-startup, flashy, AI-looking, luxury-cliché surfaces |
| Show ecosystem proof early | Pure philosophy with no artifact |
| Introduce Raphael early | Hide the human until About |
| Allow “do nothing” as a win | Force a transaction narrative |
| Build toward platform loops | Optimize only for page views or listing clicks |
| Use brass sparingly | Gold glow everywhere |
| Keep redirects for old URLs | Leave orphan listing-era pages in the repo |
| Deploy only this repo (`rrk3311-USA/AgentKammer`) to Vercel project `agentkammer` | Deploy Fresh1 / Success Chemistry (`rrk3311-USA/Fresh1` → `scv2-success-chemistry`) into Agent Kammer |
| Say Decision Intelligence for Housing when describing the product/AI layer | Say “AI Real Estate Advisor” or lead with “chatbot” |
| Say Resume My Decision / My Decision / Decision History | Say Account / Dashboard / Login / Profile as primary UI labels |
| Think in Cases (one decision, tracked over time) | Think in “users” with accounts |

---

## 20. Related files (do not replace this manual)

| File | Role |
|------|------|
| `client/src/index.css` | Live CSS variables |
| `tailwind.config.ts` | Tailwind brand tokens |
| `client/src/lib/design-system.ts` | Reusable class patterns |
| `client/public/llms.txt` | Public positioning + URL map for crawlers/LLMs |
| `docs/architecture/SYSTEM-DESIGN.md` | System architecture |
| `docs/product/DECISION-BLUEPRINT.md` | Blueprint deliverable contract |
| `docs/product/BELONGING-ASSESSMENT.md` | Belonging Assessment product brief |
| `docs/product/RESIDENTIAL-ADVISORY.md` | Practice model — Strategy Session, à la carte, memberships |
| `docs/product/ACCOUNT-AUTH.md` | Email + PIN auth (no password) |
| `docs/product/DECISION-CASES.md` | Cases mental model — Decision Intelligence for Housing category |
| `docs/archive/*` | Historical — not authority |

---

*Last updated: July 2026 · Align with: Residential Advisory practice · Housing Strategy Session (retire Discovery Call) · Belonging Assessment front door · memberships as ongoing relationships · Housing Advisory rename → Raphael + sample brief → account/memory/timeline loop.*
