# AGENTS.md: Agent Kammer house rules

These rules apply to every agent working in this repo. Detailed rules live in `.cursor/rules/`. When a rule here and a file disagree, this file and Raphi win; ask before guessing.

## Who we are
Agent Kammer is Raphael (Raphi) Kammer's Manhattan luxury real estate publication. Judgment is the product: traditional agents try to make you want the property; Agent Kammer helps you understand whether you should want it.

## Voice
- Suave and quietly affluent: a sharp, well-traveled Manhattan advisor talking to one smart client over coffee. Calm, specific, never theatrical.
- Judgment over inventory. Say what matters and why, not everything that exists.
- Advisory register: "I'd be inclined to...", "Given what you've told me, the better question is...". Never "You need to...", "Trust me", "This is definitely the one".
- A light philosophical touch (belonging, patience, price vs value) at most once per piece or section, and only when earned.
- About 5% dry humor, aimed at the object, the price or the decision. Never at a person (not the buyer, seller, agent, developer or reader).

## Anti-AI copy rules (every visible string, including alt text, titles and captions)
- No em dashes and no en dashes. Use periods, commas or parentheses. Write ranges with "to" ("$5M to $10M"). Hyphens only inside compounds (co-op, pied-a-terre style words).
- No cliches or AI tells: "it's not X, it's Y", neat groups of three, delve, navigate, journey, landscape, seamless, unlock, crucial, robust, "in today's market", "whether you're", slogan closers, fake-drama colon setups, excessive bold.
- Vary sentence length. Contractions are fine. End on a fact or a quiet implication, not a rally cry.

## Sourcing
- Official and public records first: ACRIS, NYC DOF Rolling Sales (and DOF tax bills), DOB (BIS / DOB NOW), NY Attorney General condo offering plan filings, and Freddie Mac (mortgage rates).
- Trade press, Olshan reports, Corcoran reports and X posts are leads only. Verify every lead against a primary source before it appears anywhere.
- Never name Olshan in published copy.
- Never invent a statistic, price, listing, credential, quote or call. If a fact is not verified, leave it out or mark the piece SAMPLE and keep it unpublished. "Unknown from public records" is an acceptable answer.
- Keep the source and date for every number and every negative claim.

## Compliance (Raphi is not licensed)
- Everything is educational commentary. No implied brokerage services, no offers to represent, list, show or negotiate, no guarantees, no promised discounts or outcomes, no appraisal, inspection, legal, tax or investment claims.
- Fair housing: describe the property, never the people. Never steer by any protected class. WHO lines describe a lifestyle fit (pied-a-terre, entertaining, a family layout need), never demographics. Schools only through objective third-party sources and never in WHO.
- Criticism targets the property, the price or the market, never a person.
- Disclaimer, exactly: `Educational commentary. Not advice. Opinions of Raphael Kammer.`
- Mandatory compliance review (see `.cursor/rules/compliance-review.mdc`) plus Raphi's explicit approval before anything is published, posted, sent or merged. Agents open pull requests and drafts; they never merge, publish, post or send.

## Files
- Deliverables are named `Agent-Kammer-<Product>-YYYY-MM-DD` plus a suffix, for example `Agent-Kammer-Manhattan-Minute-2026-09-29-cover.png` or `Agent-Kammer-Manhattan-Minute-2026-09-29.pdf`.

## Design
- End cards are restrained and read like a publication sign-off. No "thank you", no contact block, no "follow", no phone number, no email, no big logo.
- Low-compute HTML: live text set in HTML/CSS over reused backgrounds and art layers, rendered to PNG with Playwright. Never bake text into art or regenerate backgrounds per post.
- Shared property row signature across products: band, address, area and price, one italic read, a FOR/WHO line, and a Pick / Consider / Wait / Pass chip. Every product keeps its own palette and skin around that row.
- Text must pass contrast (4.5:1 under 24px, 3:1 at or above), measured against the rendered background.
- No QR codes.

## Repo and build
This is a Vite + React + Express monorepo (not Next.js). Production branch is `luxury-homepage`. Feature work branches off that and opens a PR into it. Agents do not merge.

| Path | Purpose |
|------|---------|
| `client/` | Vite + React public site and admin UI |
| `server/` | Express APIs |
| `api/` | Vercel serverless shims |
| `shared/` | Schema and CRM pipeline |
| `content/` | Building-report markdown |
| `docs/` | Architecture and product docs (`docs/archive/` is historical) |
| `docs/brand/AGENT-KAMMER-BRAND.md` | Older site product / brand operating manual |
| `brand/` | Non-site brand assets, including the Manhattan Minute story kit |

```bash
npm run dev        # local site (Express + Vite)
npm run build      # client + server production build
npm run check      # TypeScript
npm test           # Vitest
```

Shipped UI logos live in `client/public/brand/`. Implementation tokens live in `client/src/index.css`, `client/src/lib/design-system.ts` and `tailwind.config.ts`. Do not deploy Fresh1 / Success Chemistry into this repo or the `agentkammer` Vercel project. Public contact default is `info@agentkammer.com`.

For publication copy, Instagram, plates, Story cards and listing reviews, this file and `.cursor/rules/` win if they disagree with `docs/brand/AGENT-KAMMER-BRAND.md`. That older manual still describes the live site product until Raphi reconciles the two. Ask before guessing.

The story kit is not part of the site build. Render it from `brand/story-kit/` with Playwright when asked. Do not commit `node_modules`, `out/` renders, audio or video.

## Where to look
- `.cursor/rules/agent-kammer-core.mdc`: the always-on summary of the above.
- `.cursor/rules/house-style.mdc`: voice, tokens and formats.
- `.cursor/rules/property-assessment.mdc`: the listing review process and verdicts.
- `.cursor/rules/manhattan-minute-story-kit.mdc`: the daily Instagram Story kit.
- `.cursor/rules/compliance-review.mdc`: the pre-publish review.
- `brand/story-kit/` and `brand/stone-platinum-story-kit.md`: the Story kit and its full spec.
