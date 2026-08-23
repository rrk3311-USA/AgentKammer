ARCHIVE ONLY — Success Chemistry / Fresh1 is a separate repo (rrk3311-USA/Fresh1). Do not deploy into agentkammer Vercel.

# International SEO Strategy — Agent Kammer

**Status:** Phase 1 live (English content + market targeting)  
**Canonical site:** https://www.agentkammer.com  
**Last updated:** June 7, 2026

---

## Strategic Angle

Agent Kammer is not competing on listing volume. International SEO wins through **building intelligence** and **relocation judgment** — the questions global buyers ask before their first Manhattan visit.

**Core positioning for international search:**
- Building-first research (not apartment browsing)
- Pre-visit shortlist discipline
- Advisory for UK, UAE, Singapore, Hong Kong, and European executives

---

## Priority Markets (Phase 1)

| Market | Search intent | Live assets |
|--------|---------------|-------------|
| **UK / London** | NYC relocation from London, Manhattan luxury UK buyers | `/international`, UK perspective |
| **UAE / Dubai** | Manhattan property UAE investors, pied-à-terre NYC | `/international`, pre-visit perspective |
| **Singapore / Hong Kong** | Manhattan condo Asia buyers, executive relocation | `/international`, pre-visit perspective |
| **Europe** | Manhattan luxury European buyers, advisory-led search | `/international` |

---

## What Shipped (Phase 1)

1. **`/intelligence/2026-executive-housing-report`** — 2026 Executive Housing Report with UK/UAE/APAC/EU syndication blocks
2. **`/international` hub** — market overview, advisory CTA, international perspectives
2. **International content type** on Perspectives (`international` tag + Globe filter)
3. **Two international perspectives** with `markets[]` metadata for SEO keywords
4. **hreflang baseline** — `en` + `x-default` on homepage (sitemap + `index.html`)
5. **Geo meta** — `US-NY`, Manhattan placename
6. **Sitemap** — 31 URLs including all perspectives + `/international`
7. **Footer link** — International in site navigation (footer, Intelligence cross-link)

---

## Long-Tail Pipeline (Perspectives — NOT building reports)

Write next (international angle):

| Title | Slug | Market |
|-------|------|--------|
| Manhattan Pied-À-Terre Decisions For Gulf Principals | `manhattan-pied-a-terre-gulf-principals` | UAE |
| Singapore Finance Executives: Hudson Yards Vs Midtown | `singapore-executives-hudson-yards-midtown` | APAC |
| What European Buyers Misread About Manhattan Co-Ops | `european-buyers-manhattan-co-op-reality` | EU |

Write next (English local long-tail):

| Title | Slug |
|-------|------|
| The Difference Between Prestige And Convenience | `the-difference-between-prestige-and-convenience` |
| The First 90 Days In A Manhattan Luxury Building | `the-first-90-days-manhattan-luxury-building` |
| When Pied-À-Terre Concentration Changes How A Building Feels | `pied-a-terre-concentration-building-feel` |

---

## Phase 2 — Translations (planned)

Do **not** machine-translate building reports (user voice). Translate:

1. `/international` hub summaries
2. International-tagged perspectives
3. Contact + About key paragraphs

**Suggested locale routes (future):**

| Locale | Path prefix | Priority |
|--------|-------------|----------|
| `en` | `/` (default) | Live |
| `en-GB` | `/uk/` or query `?lang=en-GB` | Q3 2026 |
| `ar-AE` | `/ae/` | Q4 2026 |
| `zh-Hans` | `/cn/` | Q4 2026 |

**hreflang expansion:** Add `en-GB`, `ar-AE`, `zh-Hans` alternates when translated pages ship — never point hreflang to non-existent URLs.

---

## Technical SEO Checklist

- [x] `robots.txt` allows crawl + sitemap reference
- [x] `sitemap.xml` includes all live perspectives
- [x] `usePageMetadata` on Contact, About, Buildings, Lease, International
- [x] Contact form emails `info@successchemistry.com` (via `CONTACT_INBOX` env)
- [ ] JSON-LD `Organization` + `Article` schema (Phase 2)
- [ ] Per-page `og:image` (Phase 2)
- [ ] Google Search Console — submit updated sitemap after deploy
- [ ] Bing Webmaster — submit sitemap after deploy

---

## Contact Backend (temporary)

```
CONTACT_INBOX=info@successchemistry.com  # default if unset
RESEND_API_KEY=...                        # preferred delivery
EMAIL_USER / EMAIL_PASS                   # Gmail fallback
```

Switch to `info@agentkammer.com` when mailbox is live — one env change, no code change.
