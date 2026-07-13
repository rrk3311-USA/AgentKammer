# Agent Kammer Product Architecture

Agent Kammer should be organized like a housing decision platform, not a conventional marketing site. The product surface has three permanent systems:

- Decision Navigator: why the visitor is here.
- Decision Brief: what the visitor should understand next.
- Decision Companion: the persistent assistant, profile, memory, and next action layer.

## Target Structure

```txt
agent-kammer/
  app/
  components/
    layout/
    navigation/
    command-center/
    decision-blueprint/
    ai/
    cards/
    reports/
    typography/
    forms/
    ui/
  features/
    decision-navigator/
    decision-briefs/
    building-intelligence/
    building-reports/
    neighborhoods/
    diagnostics/
    recommendations/
    search/
    onboarding/
  content/
    briefs/
    buildings/
    neighborhoods/
    reports/
    glossary/
    knowledge-graph/
  lib/
    ai/
    search/
    analytics/
    blueprint/
    knowledge-graph/
  styles/
  public/
    illustrations/
    buildings/
    icons/
    textures/
  brand/
    logo/
    colors/
    typography/
    icons/
    illustrations/
    photography/
    business-card/
    email/
    social/
    motion/
  docs/
```

The current codebase is a Vite/React app under `client/src`, so migration should be incremental. Avoid moving every component at once. New product systems should land in the target folders, while existing pages migrate only when they are being actively changed.

## Decision Brief Pattern

Each decision brief should eventually have:

```txt
features/decision-briefs/[brief]/
  page.tsx
  content.md
  illustration.tsx
  questions.ts
  recommendations.ts
  metadata.ts
```

Priority briefs:

- first-home
- growing-family
- executive-relocation
- military-relocation
- international-buyer
- investment
- 1031
- downsizing
- empty-nest
- retirement
- estate
- rent-vs-buy
- stay-vs-sell
- condo-vs-coop
- luxury-rental
- luxury-purchase
- divorce
- marriage

## Knowledge Graph

The knowledge graph is the shared source for navigation, AI recommendations, and content relationships.

```txt
content/knowledge-graph/
  life-events.json
  buildings.json
  neighborhoods.json
  decision-paths.json
  relationships.json
```

Example relationship:

```txt
Executive Relocation -> Hudson Yards -> Luxury Rental -> Building Report
Divorce -> Stay vs Sell -> Decision Memo -> Attorney Resources
Growing Family -> Schools -> Upper West Side -> 3BR Buildings
```

The Decision Companion should not guess blindly. It should read page metadata, profile signals, prior conversation, and graph relationships to recommend the next page, ask the next useful question, or open a relevant brief without resetting the conversation.

## Migration Rule

New systems should start in the product architecture:

- `client/src/lib/knowledge-graph` for typed graph utilities used by React.
- `content/knowledge-graph` for portable content data.
- Future UI components should move toward `components/command-center`, `components/decision-blueprint`, and feature folders as touched.

Do not perform a broad mechanical folder move unless routes, imports, and deployment verification are included in the same change.
