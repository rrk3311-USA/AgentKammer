# International Manhattan Buyer Hub

**Status:** Product system — live (English hub + 43 country pages)  
**Position:** Multilingual educational funnel for international buyers considering Manhattan residential real estate. Educate first; strategy request second.

**Related**

- Public hub: `/international` (grouped by Asia / Europe / Middle East / Americas / Oceania)
- Country pages: `/international/:country` (see `client/src/data/international-hub.ts`)
- Premium localized: China, Germany, Japan; other markets use the shared template with language-matched form copy
- Decision Brief: `/services/foreign-buyers-new-york`
- Internal HTML guide: `/guides/international-buyer-hub.html`
- Advisor practice guide: `/guides/advisor-practice-guide.html`

---

## Objective

Build a **reusable content system** — not one-off translations. Every language/country page follows the same premium structure while feeling naturally written for that audience.

Agent Kammer remains a **Manhattan residential advisory** practice: decision clarity before inventory.

---

## Brand rules

- Educate first, sell second
- Manhattan / NYC focus only — no generic “USA real estate”
- Avoid aggressive sales language
- Do not center pages on “you holding a flag”; use Raphael/Manhattan as brand identity with a country accent
- Public name for paid first session remains **Housing Strategy Session** (not “discovery call”)

---

## Page structure (every country page)

1. Hero (localized)
2. Introduction
3. FAQ (accordion)
4. Neighborhood guide
5. Buying process
6. Common mistakes
7. Professional team
8. Resources
9. **Strategy request form** (bottom)

English hub at `/international` lists countries by region + shared FAQ/process + the same form.

---

## Strategy request form

**Internal name:** Request Your Manhattan Strategy  
**Not:** “Contact form”

### Promise (required on form + confirmation)

> After you submit, a specialist who speaks your language will get in touch to review your goals and recommend the right next step.

Country pages localize this promise (full localization for CN / DE / JA; language-matched specialist copy for other markets).

### Fields

- Full name, email, country, preferred language
- Contact method (+ optional WhatsApp / WeChat / phone)
- Buying goal, budget, timeline, financing
- Neighborhoods (multi-select)
- Free-text: what they want help understanding

## Where submissions go

**System of record:** Advisor OS `client_profiles` → Attio (People + Housing Advisory + Lead Pipeline).

```
International page form
  → POST /api/international-strategy
  → client_profiles (contact + buying + marketing + AI summary)
  → Attio sync queue
  → Email notify (ops alert only — not the CRM)
```

**Work the lead in:** `/admin/clients` and Attio Lead Pipeline — not the generic contact inbox.

Each submission stores:

- Contact (name, email, WhatsApp/WeChat/phone, country, preferred language)
- Buying profile (goal, budget, timeline, financing, neighborhoods, biggest question)
- Marketing (landing page, country slug, language, referrer, UTMs)
- Auto AI summary paragraph
- Lead status + suggested next action (in `score_breakdown` + `next_recommended_action`)
- Optional: **Want Manhattan Buying Roadmap?** (lower-friction for 6–18 month buyers)

### Lead status → lifecycle

| Status | Lifecycle | Typical next action |
|--------|-----------|---------------------|
| Ready for Call | `call_ready` | Schedule Housing Strategy Session |
| Qualified Nurture | `qualified` | Language-match follow-up / roadmap |
| Early Research | `engaged` | Roadmap, condo guide, or 30-day follow-up |
| Needs Referral | `profiled` | Introduce lender or attorney |
| Spam / Low Intent | `inactive` | No action |

Email still fires so you see the alert, but the profile is what you work.

---

## Countries

**Premium localized (full native content):** `china`, `germany`, `japan`

**Shared template + language-matched form copy:** Korea, Hong Kong, Taiwan, Singapore, India, Vietnam, Thailand, Indonesia, Malaysia, France, Spain, Italy, Netherlands, Switzerland, UK, Ireland, Sweden, Norway, Denmark, Finland, Poland, Czechia, Romania, Hungary, Greece, Portugal, Russia, Ukraine, Turkey, UAE, Saudi Arabia, Israel, Canada, Mexico, Brazil, Argentina, Colombia, Chile, Australia, New Zealand

Add further countries with `COUNTRY_SEEDS` + `buildCountry()` in `client/src/data/international-hub.ts` — do not invent a new page layout.

---

## SEO / URLs

```
/international
/international/:country
```

Hub groups countries by region. Sitemap lists all live country URLs. The old redirect `/international` → foreign-buyers brief was removed so the hub can live at `/international`. The Decision Brief remains linked from the hub.

---

## Build prompt (for future AI expansion)

When adding a new country:

1. Add a seed to `COUNTRY_SEEDS` (or a full custom seed for premium localization)
2. Localize hero, intro, FAQs, neighborhoods, process, mistakes, team, form strings as needed
3. Keep factual claims conservative and Manhattan-specific
4. Keep `specialistPromise` explicit about language-matched follow-up
5. Do not change the section order
6. Add the URL to `client/public/sitemap.xml`