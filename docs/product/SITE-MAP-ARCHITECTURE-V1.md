# Agent Kammer — Site Map & Architecture

**Version:** 1.0  
**Status:** Locked — stop renaming; start building  
**Site:** https://www.agentkammer.com  
**Updated:** 2026-07-21  
**Sources:** Live codebase + [Building Intelligence Report](https://chatgpt.com/share/6a5ff67e-3fac-83e8-9526-8d130fd47415)

**Principle:** Choice overload is the risk — not missing content. Biggest gains now come from exceptional content (Intelligence page, Building Profiles, Property Intelligence Reports), not further sitemap restructuring.

**Freeze rule:** No more structural / sitemap changes until **100 real users** have used the site. Refine from analytics, conversations, and client feedback — not speculation.

---

## Brand sentence

> **Helping you make better real estate decisions through intelligence.**

Every product delivers that sentence at increasing depth.

---

## Universal CTA

**Request Intelligence**

Use sitewide instead of Contact / Get Started / Schedule. Reinforces the brand on every page. (Contact form / session booking can sit behind this label.)

---

## Version 1.0 summary

| Element | Locked |
|---------|--------|
| Core idea | Intelligence |
| Flagship page | `/intelligence` |
| Customer journey | One flow |
| Public offers | Four |
| Premium ladder | Clear |
| Differentiation | Intelligence practice ≠ typical brokerage |

---

## 1. Top navigation (5)

Philosophy before building-specific content:

| Order | Label | URL |
|------:|-------|-----|
| 1 | **Home** | `/` |
| 2 | **Situations** | `/situations` |
| 3 | **Intelligence** | `/intelligence` |
| 4 | **Buildings** | `/building-reports` |
| 5 | **About** | `/about` |

*`/services` → `/situations` (permanent redirect).*

**Not in top nav:** Insights · Contact · Account · International  

- **Insights** → folded into the Intelligence page; keep `/insights` for SEO  
- **Contact / Account / International** → icons or footer  
- **Universal CTA button:** Request Intelligence  

**Remove from nav:** Understand · What's Changing? · Decisions (as separate items) · Insights as primary item  

“What's Changing?” stays homepage hero only.

---

## 2. Flagship page: Intelligence

```
INTELLIGENCE                          (/intelligence)
────────────────────────────────────
Decision Intelligence
        ↓
Building Intelligence
        ↓
Property Intelligence
        ↓
Executive Intelligence
```

| Level | Meaning | Delivered by |
|-------|---------|--------------|
| **Decision Intelligence** | Clarify the decision before the search | Decision Assessment · Situations |
| **Building Intelligence** | Study the address before the apartment | Building Profiles |
| **Property Intelligence** | Diligence on a specific property | Property Snapshot → Property Intelligence Report |
| **Executive Intelligence** | Full acquisition judgment + continuity | Executive Acquisition Dossier · Executive Intelligence Retainer |

Also on this page: brief Insights highlights (linking to `/insights/*` for SEO depth) + **Request Intelligence**.

Elevates the practice from selling reports to operating an **intelligence practice**.

---

## 3. One customer flow

```
Assessment
      ↓
Situation
      ↓
Building Profile
      ↓
Property Snapshot (Free)
      ↓
Property Strategy Session
      ↓
Property Intelligence Report ($399)
      ↓
Executive Acquisition Dossier ($1,500)
      ↓
Executive Intelligence Retainer
      ↓
Private Residential Office
```

---

## 4. Naming (locked — V1.0)

| Use | Name |
|-----|------|
| Flagship page | **Intelligence** |
| Hub / section | **Building Intelligence** |
| Editorial | **Building Profiles** |
| Free product | **Property Snapshot** |
| $399 product | **Property Intelligence Report** |
| $1,500 product | **Executive Acquisition Dossier** |
| Session door | **Property Strategy Session** |
| Continuity | **Executive Intelligence Retainer** |
| Sitewide CTA | **Request Intelligence** |

**Button / UI shortening for the dossier** (page title can stay long):

| Context | Label |
|---------|-------|
| Page title / formal | Executive Acquisition Dossier |
| Buttons / cards | **Acquisition Dossier** or **Executive Dossier** |

**Retired:** Property Brief · Building Library · Building Reports (as product language) · Building Intelligence Report · unqualified “Strategy Session” · Executive Membership · Essentials · Contact/Get Started/Schedule as primary CTA copy

---

## 5. Public offers (only 4)

| # | Offer | Price | Role |
|---|-------|------:|------|
| 1 | **Decision Assessment** | Free | Decision Intelligence |
| 2 | **Property Snapshot** | Free | Property Intelligence — lead magnet (&lt;$3M) |
| 3 | **Property Intelligence Report** | **$399** | Diligence before offer |
| 4 | **Executive Acquisition Dossier** | **$1,500** | Executive Intelligence — flagship |

Everything else = service or feature, not another product.

### Paid report framework (not extra SKUs)

1. Building · 2. Location · 3. Risk · 4. Acquisition Strategy  

Other modules (Neighborhood, Investment, Relocation, etc.) live **inside the Dossier**.

---

## 6. Full product ladder

| Step | Offer | When |
|------|-------|------|
| 1 | Decision Assessment | Public |
| 2 | Property Snapshot | Public |
| 3 | **Property Strategy Session** | After engagement |
| 4 | Property Intelligence Report ($399) | Prescribed in session |
| 5 | Executive Acquisition Dossier ($1,500) | Flagship |
| 6 | Executive Intelligence Retainer | Continuity |
| 7 | Private Residential Office | Continuity |

---

## 7. Property Strategy Session (hide until engaged)

**One session door:** Property Strategy Session  

Prescribe report or retainer on the call. Second Opinion / Portfolio Review = delivery features, not shelf products.

| Keep | Cut |
|------|-----|
| Property Strategy Session | Second Opinion / Portfolio Review as listed products |
| Executive Intelligence Retainer | Essentials · “Membership” naming |
| Private Residential Office | — |

**Guide pricing (internal):** Session ~$250–500 · Retainer ~$750–1,500/mo · Private Residential Office ~$2,500–5,000+/mo  

Soft-gate until Assessment, Snapshot, Situation, or Request Intelligence engagement.

---

## 8. Public site map

| URL | Purpose | CTA |
|-----|---------|-----|
| `/` | Home — brand + What's Changing? (hero) | Request Intelligence · Assessment |
| `/intelligence` | ★ Flagship — philosophy + ladder + Insights highlights | Request Intelligence |
| `/situations` | Situation index | Open situation |
| `/situations/:slug` | Situation depth | Assessment · Snapshot · Request Intelligence |
| `/belonging` | Decision Assessment | Profile → next step |
| `/building-reports` | Building Intelligence hub | Building Profiles |
| `/building-reports/:slug` | Building Profile | Property Snapshot · Request Intelligence |
| `/insights` · `/insights/:slug` | SEO / depth (not primary nav) | Soft → Intelligence |
| `/insights/reports/:slug` | Flagship editorial | Request Intelligence |
| `/about` | Practice | Request Intelligence |
| `/contact` | Form behind Request Intelligence | Intake |
| `/account` · `/hub/*` | Decision Map (icon) | Continuity |
| `/international` · `/:country` | Country guides (footer/icon) | Localized lead |

---

## 9. Building Intelligence → Building Profiles

```
Building Intelligence          (/building-reports)
    ↓
Building Profiles              (editorial)
    ├── individual profiles
    ├── neighborhood guides
    ├── market briefs
    └── :slug
```

**Published:** Lantern House · One High Line  
**Coming soon:** 111 West 57th · 15 Hudson Yards  

---

## 10. Situations & Insights

- **Situations (35):** Decision Intelligence content — not products. Redirect `/services` → `/situations`.  
- **Insights:** Keep URLs for SEO; surface from `/intelligence`; do not put Insights in primary nav.

---

## 11. How products fit the sentence

> Helping you make better real estate decisions through intelligence.

| Product | Role |
|---------|------|
| Decision Assessment | Start |
| Building Intelligence / Profiles | Address |
| Property Snapshot | Quick read |
| Property Intelligence Report | Diligence |
| Executive Acquisition Dossier | Full judgment |
| Executive Intelligence Retainer | Ongoing |
| **Request Intelligence** | Universal ask |

---

## 12. Implementation priorities (build next)

1. Ship **`/intelligence`** (philosophy + four levels + Insights highlights)  
2. Nav: Home · Situations · Intelligence · Buildings · About  
3. Sitewide CTA → **Request Intelligence**  
4. Relabel products / profiles / session / retainer (dossier short labels on buttons)  
5. Market only the **4 public offers**  
6. Soft-gate Property Strategy Session  
7. Redirect `/services` → `/situations`  
8. **Content:** Building Profiles · Property Intelligence Report template · Intelligence page copy  

Stop renaming. Ship content.

---

## 13. Counts

| Surface | Count | Product? |
|---------|------:|----------|
| Top nav | 5 | — |
| Flagship | 1 (`/intelligence`) | Brand |
| Public offers | **4** | Yes |
| Ladder | **7** | Yes (gated) |
| Situations | 35 | Content |
| Insights | 16 + 1 | SEO content (under Intelligence) |
| Building Profiles published | 2 | Content |

---

*Desktop: `~/Desktop/Agent-Kammer-Site-Map-Architecture.md` — **Version 1.0***
