# Agent Kammer Cleanup Report

Generated for Phase 1 cleanup and consolidation.

## Pages

### Active Pages
- `client/src/pages/Home.tsx` - production homepage.
- `client/src/pages/BuySell.tsx` - production buy/sell advisory page.
- `client/src/pages/RealEstate.tsx` - production Building Intelligence page.
- `client/src/pages/NewYorkMarket.tsx` - production Manhattan market brief.
- `client/src/pages/About.tsx` - production strategy/about page.
- `client/src/pages/Contact.tsx` - production contact and seller first-read page.
- `client/src/pages/Profile.tsx` - production private profile/intake page.
- `client/src/pages/ReverseBuyerOrigination.tsx` - buyer strategy detail page.
- `client/src/pages/ReverseSellerOrigination.tsx` - seller architecture detail page.
- `client/src/pages/not-found.tsx` - fallback route.

### Unused Pages
- `client/src/pages/ContentDetail.tsx`
- `client/src/pages/MediaCenter.tsx`
- `client/src/pages/WellnessShop.tsx`

### Duplicate Pages
- `client/src/pages/RealEstateLight.tsx`
- `client/src/pages/RealEstateLightV2.tsx`
- `client/src/pages/RealEstateLightV3.tsx`
- `client/src/pages/ReverseByerOriginationGuide.tsx` - typo/legacy guide alongside the production buyer page.

### Legacy Pages
- `client/src/pages/AdminRBO.tsx`
- `client/src/pages/AffiliateProgram.tsx`
- `client/src/pages/ArtGallery.tsx`
- `client/src/pages/Audiobooks.tsx`
- `client/src/pages/BrokerRegistration.tsx`
- `client/src/pages/CaliforniaMarket.tsx`
- `client/src/pages/CategoryPage.tsx`
- `client/src/pages/Coaching.tsx`
- `client/src/pages/CommercialInvestment.tsx`
- `client/src/pages/ContentStudio.tsx`
- `client/src/pages/Dashboard.tsx`
- `client/src/pages/DocumentPortal.tsx`
- `client/src/pages/Downloads.tsx`
- `client/src/pages/EShop.tsx`
- `client/src/pages/Ecourses.tsx`
- `client/src/pages/FreeTools.tsx`
- `client/src/pages/GetHomeValue.tsx`
- `client/src/pages/GetPreapproved.tsx`
- `client/src/pages/InternationalBuyers.tsx`
- `client/src/pages/LiveDealMap.tsx`
- `client/src/pages/LuxuryTravel.tsx`
- `client/src/pages/NevadaMarket.tsx`
- `client/src/pages/Refinancing.tsx`
- `client/src/pages/SavedSearches.tsx`

## Components

### Unused Components
- `ActivateAgentMode.tsx`
- `AgentModeToggle.tsx`
- `AgenticActionsInfographic.tsx`
- `AgenticEngineVisual.tsx`
- `AppDownload.tsx`
- `CreditCardShowcase.tsx`
- `EmailDigestPreview.tsx`
- `FilterSidebar.tsx`
- `GlobalMarketTicker.tsx`
- `HeroSearch.tsx`
- `HorizontalPropertyScroll.tsx`
- `ListingReportSection.tsx`
- `LiveInterestRate.tsx`
- `LuxuryBackground.tsx`
- `LuxuryMoodBoard.tsx`
- `MarketBanner.tsx`
- `MascotWelcome.tsx`
- `MorningEmailIcon.tsx`
- `ProcessFlowSection.tsx`
- `PropertyGrid.tsx`
- `TopHatIcon.tsx`

### Duplicate Components
- Property/listing UI appears split across `PropertyCard.tsx`, `PropertyGrid.tsx`, `SavedSearchCard.tsx`, `FilterSidebar.tsx`, and `HeroSearch.tsx`.
- Brand/visual story components appear split across `LuxuryBackground.tsx`, `LuxuryMoodBoard.tsx`, `MarketBanner.tsx`, and page-level hero sections.
- Agent-mode/prototype visuals appear split across `ActivateAgentMode.tsx`, `AgentModeToggle.tsx`, `AgenticActionsInfographic.tsx`, and `AgenticEngineVisual.tsx`.

### Hero Variants
- Production: page-level hero in `Home.tsx`.
- Production: page-level hero in `BuySell.tsx`.
- Production: page-level hero in `RealEstate.tsx`.
- Legacy/experimental: `HeroSearch.tsx`, `LuxuryBackground.tsx`, `MarketBanner.tsx`.

### Navigation Variants
- Production: `Header.tsx`.
- Production: `Footer.tsx`.
- No alternate full navigation component found, but legacy pages contain their own CTA/navigation patterns.

### Card Variants
- Production base: `client/src/components/ui/card.tsx`.
- Legacy real estate cards: `PropertyCard.tsx`, `SavedSearchCard.tsx`, `PropertyGrid.tsx`.
- Legacy product cards: `DigitalProducts.tsx`, `CreditCardShowcase.tsx`.

## Assets

### Unused Images
- Most `attached_assets/generated_images/*` files are tied to legacy concepts or experiments.
- Active generated image exceptions currently used by production:
  - `attached_assets/generated_images/manhattan/rooftop-terrace-lifestyle-hero.png`
  - `attached_assets/generated_images/manhattan/rooftop-pool-wtc.png`
- Active brand asset:
  - `attached_assets/agent-kammer-logo-emblem-gold-wreath.png`
- Production building imagery is in `client/public/buildings`.

### Large Images / Files
- `Archive 2.zip` - 208MB.
- `client/public/buildings/tribeca-green.jpg` - 6.9MB.
- `client/public/buildings/the-cortland.jpg` - 3.2MB.
- Several legacy generated images are 1MB-2.4MB each.
- `client/public/favicon.png` - 1.6MB, unusually large for a favicon.

### Duplicate Images
- `attached_assets/agent-kammer-logo-emblem-gold-wreath.png`
- `attached_assets/agent-kammer-logo-emblem-uploaded-header.png`
- `client/public/buildings/*.jpg` and `client/public/buildings/thumbs/*.webp` intentionally overlap as full/thumbnail versions.

## Dependencies

### Possibly Unused NPM Packages
These need confirmation with a dependency tool before removal:
- `@jridgewell/trace-mapping`
- `@types/node-telegram-bot-api`
- `node-telegram-bot-api`
- `passport`
- `passport-local`
- `puppeteer`
- `react-icons`
- `recharts`
- `next-themes`
- `framer-motion`
- `libphonenumber-js`
- `connect-pg-simple`
- `memorystore`

### Duplicate Libraries
- Icon libraries: `lucide-react`, `@phosphor-icons/react`, `react-icons`.
- Animation libraries: `tailwindcss-animate`, `tw-animate-css`, `framer-motion`.
- Email/notification possibilities: `nodemailer`, `resend`, `node-telegram-bot-api`.

### Packages No Longer Referenced By Production Direction
- Product/shop/course dashboard dependencies should be reconsidered after legacy pages are archived.
- Full Radix UI set may be more than the production site needs, but many are included by shadcn/ui components and should not be removed until unused UI components are also consolidated.
