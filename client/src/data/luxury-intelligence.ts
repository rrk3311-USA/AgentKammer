export type LuxuryIntelligenceEditionLink = {
  label: string;
  description: string;
  href: string;
  kind: "report" | "building" | "insight";
};

export const luxuryIntelligencePath = "/intelligence/luxury";
export const luxuryIntelligenceAliases = ["/luxury-intelligence"] as const;

export const luxuryIntelligenceEdition = {
  slug: "opening-brief",
  series: "Luxury Intelligence",
  title: "Modern Manhattan Luxury Intelligence",
  subtitle: "Judgment on the buildings and lives worth covering. Not an MLS feed.",
  publishedAt: "2026-09-30",
  readMinutes: 8,
  editionLabel: "Opening Brief",
} as const;

export const luxuryIntelligenceSummary = [
  "Most people think wealth buys views. It doesn’t. Wealth buys options. The real luxury isn’t the terrace. It’s waking up and deciding how you want to spend the day.",
  "Luxury Intelligence is the public channel for that work. We cover the top slice of modern Manhattan housing worth knowing — buildings, neighborhoods, and the life decisions that make an address matter.",
  "People follow this for judgment, not inventory. Missing most listings is the feature.",
] as const;

export const luxuryIntelligenceSections = [
  {
    title: "What this channel is",
    paragraphs: [
      "Agent Kammer is not a listing tour with better lighting. The apartment is evidence. The subject is the next chapter of a life: ambition, time, privacy, belonging, and where that life actually gets lived.",
      "This channel publishes the research that survives a listing. A unit expires. A building’s reputation compounds. A neighborhood’s rhythm stays useful long after the weekend brochure is stale.",
    ],
    bullets: [
      "Cover the opportunities worth knowing, not every new listing",
      "Write calls the market can later prove wrong",
      "Use the building as the stage, not the product",
    ],
  },
  {
    title: "What we cover",
    paragraphs: [
      "The library is building-first. Neighborhoods come second. Units are supporting evidence inside a longer thesis.",
    ],
    bullets: [
      "Building intelligence — who thrives here, what the service actually feels like, which tradeoffs the brochure hides",
      "Neighborhood intelligence — the week, not the weekend. Commute, texture, and who the block is really for",
      "Executive housing — relocation, lease-first entries, and when ownership is earned rather than performed",
      "International and founder reads — pre-visit discipline for people arriving with a life already in motion",
    ],
  },
  {
    title: "What we refuse",
    paragraphs: [
      "If a piece does not help someone make a better decision, it does not ship. Listing spam, motivational fluff, and generic market updates stay off this channel.",
      "Humor is seasoning on a real call. It is not a second product. The take has to be able to miss.",
    ],
    bullets: [
      "No inventory dumps pretending to be research",
      "No roasting the people who would live there",
      "No fifth public product hiding inside a magazine name",
    ],
  },
  {
    title: "How to use it",
    paragraphs: [
      "Read the briefing on the web. Save a copy if you want it offline. Then open the piece that matches the decision in front of you.",
      "If you already have an address, request a Property Assessment. If the life change is still unnamed, start with Guidance or a Situation Assessment. This channel is the public library, not a replacement for those doors.",
    ],
  },
] as const;

export const luxuryIntelligenceLibrary: LuxuryIntelligenceEditionLink[] = [
  {
    label: "2026 Executive Housing Report",
    description: "Quarterly briefing on Manhattan housing, building fit, and executive relocation.",
    href: "/insights/reports/2026-executive-housing-report",
    kind: "report",
  },
  {
    label: "Lantern House",
    description: "West Chelsea design-led luxury. Resident profile, tradeoffs, and neighborhood context.",
    href: "/building-reports/lantern-house",
    kind: "building",
  },
  {
    label: "One High Line",
    description: "Amenity-forward living on the High Line corridor, and what that actually costs in daily life.",
    href: "/building-reports/one-high-line",
    kind: "building",
  },
  {
    label: "Tribeca vs Hudson Yards",
    description: "Two contracts with the city for finance professionals.",
    href: "/insights/tribeca-vs-hudson-yards-for-finance-professionals",
    kind: "insight",
  },
  {
    label: "International buyer research",
    description: "Study the building before the first visit. Manhattan rewards pre-visit discipline.",
    href: "/insights/studying-manhattan-buildings-before-your-first-visit",
    kind: "insight",
  },
  {
    label: "Quiet luxury buildings",
    description: "Resident culture and long-horizon ownership in towers that do not need to announce themselves.",
    href: "/insights/the-quiet-luxury-buildings-of-manhattan",
    kind: "insight",
  },
];

export function formatLuxuryIntelligenceDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
