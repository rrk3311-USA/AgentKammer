# Page Consolidation

## Production Survivors

- `Home.tsx` survives as the only production homepage.
- `RealEstate.tsx` survives as the only production intelligence/research page.
- `BuySell.tsx` survives as the production buy/sell advisory page.
- `NewYorkMarket.tsx` survives as the production Manhattan market brief.
- `About.tsx`, `Contact.tsx`, `Profile.tsx`, `ReverseBuyerOrigination.tsx`, and `ReverseSellerOrigination.tsx` remain as supporting production pages.

## Duplicate Page Versions

### Real Estate / Intelligence
- Keep: `RealEstate.tsx`
- Archive:
  - `RealEstateLight.tsx`
  - `RealEstateLightV2.tsx`
  - `RealEstateLightV3.tsx`

Reason: the production strategy is Manhattan Building Intelligence. The light variants are alternate experiments and should not remain routed.

### Buyer Flow
- Keep: `ReverseBuyerOrigination.tsx`
- Archive:
  - `ReverseByerOriginationGuide.tsx`

Reason: typo in filename and duplicate/guide-style buyer concept.

### Market Pages
- Keep: `NewYorkMarket.tsx`
- Archive:
  - `CaliforniaMarket.tsx`
  - `NevadaMarket.tsx`

Reason: Agent Kammer is Manhattan residential, not multi-state market coverage.

## Recommended Production Page Set

- `/` -> `Home.tsx`
- `/profile` -> `Profile.tsx`
- `/buy-sell` -> `BuySell.tsx`
- `/real-estate` -> `RealEstate.tsx`
- `/new-york-market` -> `NewYorkMarket.tsx`
- `/about` -> `About.tsx`
- `/contact` -> `Contact.tsx`
- `/reverse-buyer-origination` -> `ReverseBuyerOrigination.tsx`
- `/reverse-seller-architecture` -> `ReverseSellerOrigination.tsx`

## Archive Destination

Duplicate page versions should move to:

- `archived/pages`
