# Site Architecture V2

Agent Kammer is a Manhattan Building Intelligence Platform specializing in Luxury Leasing and Strategic Acquisition.

Agent Kammer is not Zillow, Airbnb, e-commerce, coaching, wellness, travel, or courses.

## Core Positioning

- Building Intelligence
- Luxury Leasing
- Strategic Acquisition
- Manhattan Residential Buildings

## Proposed Navigation

- Lease -> `/profile` initially, future dedicated lease page
- Buy / Sell -> `/buy-sell`
- Buildings -> `/buildings`
- Intelligence -> `/real-estate`
- Strategy -> `/strategy`
- Curate Matches -> `/profile`

## Production Route Map

- `/` -> `Home.tsx`
- `/buildings` -> `Buildings.tsx`
- `/profile` -> `Profile.tsx`
- `/buy-sell` -> `BuySell.tsx`
- `/real-estate` -> `RealEstate.tsx`
- `/new-york-market` -> `NewYorkMarket.tsx`
- `/strategy` -> `Strategy.tsx`
- `/contact` -> `Contact.tsx`
- `/reverse-buyer-origination` -> `ReverseBuyerOrigination.tsx`
- `/reverse-seller-architecture` -> `ReverseSellerOrigination.tsx`

## Existing Page Map

| Page | Recommendation | Notes |
| --- | --- | --- |
| `About.tsx` | ARCHIVE | Absorbed into `Strategy.tsx`. |
| `AdminRBO.tsx` | ARCHIVE | Admin/dashboard artifact. |
| `AffiliateProgram.tsx` | ARCHIVE | Not part of Manhattan advisory focus. |
| `ArtGallery.tsx` | ARCHIVE | Abandoned concept. |
| `Audiobooks.tsx` | ARCHIVE | Courses/media concept. |
| `BrokerRegistration.tsx` | ARCHIVE | Marketplace/broker portal concept. |
| `BuySell.tsx` | KEEP | Production advisory page. |
| `Buildings.tsx` | KEEP | Production curated building universe. |
| `CaliforniaMarket.tsx` | ARCHIVE | Non-Manhattan market. |
| `CategoryPage.tsx` | ARCHIVE | Zillow-style category route. |
| `Coaching.tsx` | ARCHIVE | Coaching concept. |
| `CommercialInvestment.tsx` | ARCHIVE | Outside current residential focus. |
| `Contact.tsx` | KEEP | Production contact and seller first-read page. |
| `ContentDetail.tsx` | ARCHIVE | Unused media/content detail. |
| `ContentStudio.tsx` | ARCHIVE | Content studio concept. |
| `Dashboard.tsx` | ARCHIVE | Portal/dashboard concept. |
| `DocumentPortal.tsx` | ARCHIVE | Portal concept. |
| `Downloads.tsx` | ARCHIVE | Digital product/download concept. |
| `EShop.tsx` | ARCHIVE | E-commerce concept. |
| `Ecourses.tsx` | ARCHIVE | Course concept. |
| `FreeTools.tsx` | ARCHIVE | Lead magnet/tool concept. |
| `GetHomeValue.tsx` | MERGE | Seller first-read idea belongs in `Contact.tsx` or future Sell page. |
| `GetPreapproved.tsx` | ARCHIVE | Mortgage/preapproval service concept. |
| `Home.tsx` | KEEP | Production homepage. |
| `InternationalBuyers.tsx` | MERGE | Useful audience notes can merge into buyer strategy later. |
| `LiveDealMap.tsx` | ARCHIVE | Portal/map concept. |
| `LuxuryTravel.tsx` | ARCHIVE | Travel concept. |
| `MediaCenter.tsx` | ARCHIVE | Unused media concept. |
| `NevadaMarket.tsx` | ARCHIVE | Non-Manhattan market. |
| `NewYorkMarket.tsx` | KEEP | Manhattan market/intelligence brief. |
| `Profile.tsx` | KEEP | Intake/private profile. |
| `RealEstate.tsx` | KEEP | Building Intelligence page. |
| `RealEstateLight.tsx` | ARCHIVE | Duplicate version. |
| `RealEstateLightV2.tsx` | ARCHIVE | Duplicate version. |
| `RealEstateLightV3.tsx` | ARCHIVE | Duplicate version. |
| `Refinancing.tsx` | ARCHIVE | Mortgage/refinance concept. |
| `ReverseBuyerOrigination.tsx` | KEEP | Buyer detail page. |
| `ReverseByerOriginationGuide.tsx` | ARCHIVE | Typo/legacy duplicate. |
| `ReverseSellerOrigination.tsx` | KEEP | Seller detail page. |
| `SavedSearches.tsx` | ARCHIVE | Search portal behavior. |
| `Strategy.tsx` | KEEP | Production methodology and trust page. |
| `WellnessShop.tsx` | ARCHIVE | Wellness/e-commerce concept. |
| `not-found.tsx` | KEEP | Fallback route. |

## Delete Later After Confirmation

- Archived legacy pages that are not needed for reference.
- Archived legacy components tied only to removed pages.
- Duplicate generated images not referenced by production.
- `Archive 2.zip` if the user confirms it is not needed.
