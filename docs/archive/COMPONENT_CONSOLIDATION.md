# Component Consolidation

## Production Components To Keep

- `Header.tsx`
- `Footer.tsx`
- `AgentKammerHorizontalLogo.tsx`
- `FloatingChatAssistant.tsx`
- `MarketReportDownload.tsx`
- `ThemeProvider.tsx`
- `client/src/components/ui/*` currently required by active pages and app shell.

## Hero Sections

### Recommendation
Use page-level heroes for now, then extract a single `EditorialHero` only after the visual language stabilizes.

### Archive Candidates
- `HeroSearch.tsx`
- `LuxuryBackground.tsx`
- `MarketBanner.tsx`

Reason: these belong to older search/listing/market-dashboard concepts, not the current luxury advisory direction.

## CTA Sections

### Recommendation
Keep CTAs page-level during Phase 1. Consolidate later into:
- `PrivateProfileCTA`
- `SellerFirstReadCTA`
- `BuildingIntelligenceCTA`

### Archive Candidates
- `AppDownload.tsx`
- `ActivateAgentMode.tsx`
- `AgentModeToggle.tsx`
- `MascotWelcome.tsx`

Reason: app/prototype/agent-mode CTAs distract from the Manhattan advisory brand.

## Feature Grids

### Recommendation
Use simple page-level grids backed by `Card` until a clear repeated pattern emerges.

### Archive Candidates
- `AgenticActionsInfographic.tsx`
- `AgenticEngineVisual.tsx`
- `CreditCardShowcase.tsx`
- `DigitalProducts.tsx`
- `ProcessFlowSection.tsx`

Reason: these support abandoned product, agentic, or e-commerce concepts.

## Navigation Systems

### Recommendation
Single production navigation:
- `Header.tsx`
- `Footer.tsx`

No additional navigation systems should remain.

## Card Systems

### Recommendation
Single base:
- `client/src/components/ui/card.tsx`

Archive or merge legacy card systems:
- `PropertyCard.tsx`
- `PropertyGrid.tsx`
- `SavedSearchCard.tsx`
- `FilterSidebar.tsx`
- `HorizontalPropertyScroll.tsx`
- `ListingReportSection.tsx`

Reason: those components pull the site back toward Zillow/search portal behavior.

## Brand/Decorative Components

Archive candidates:
- `HappyDocIcon.tsx`
- `MorningEmailIcon.tsx`
- `TopHatIcon.tsx`
- `LuxuryMoodBoard.tsx`
- `GlobalMarketTicker.tsx`
- `LiveInterestRate.tsx`
- `EmailDigestPreview.tsx`

Reason: either decorative legacy concepts or market-widget patterns outside the current advisory platform.
