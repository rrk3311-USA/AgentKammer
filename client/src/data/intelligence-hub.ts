export type IntelligenceHubLink = {
  label: string;
  description: string;
  href: string;
  status?: "live" | "coming-soon";
};

export const intelligenceHubCategories = [
  {
    id: "executive-housing",
    label: "Executive Housing Report 2026",
    featured: true,
    href: "/perspectives/reports/2026-executive-housing-report",
  },
  {
    id: "rental-index",
    label: "Manhattan Luxury Rental Index",
    featured: false,
    href: "/perspectives",
    status: "coming-soon" as const,
  },
  {
    id: "building",
    label: "Building Intelligence",
    featured: false,
    href: "/buildings",
  },
  {
    id: "neighborhood",
    label: "Neighborhood Intelligence",
    featured: false,
    href: "/perspectives?type=neighborhood",
  },
  {
    id: "relocation",
    label: "Relocation Guides",
    featured: false,
    href: "/perspectives?type=relocation",
  },
];

/** Hub spokes from the 2026 Executive Housing Report */
export const executiveHousingHubLinks: IntelligenceHubLink[] = [
  {
    label: "Finance Executive Guide",
    description: "Tribeca vs Hudson Yards for finance professionals — commute, rhythm, and building fit.",
    href: "/perspectives/tribeca-vs-hudson-yards-for-finance-professionals",
    status: "live",
  },
  {
    label: "International Buyer Guide",
    description: "Pre-visit building research for clients arriving from London, Dubai, and Asia-Pacific.",
    href: "/perspectives/studying-manhattan-buildings-before-your-first-visit",
    status: "live",
  },
  {
    label: "UK Executive Relocation",
    description: "What British finance leaders should know before choosing a Manhattan building.",
    href: "/perspectives/what-a-uk-executive-should-know-about-manhattan-relocation",
    status: "live",
  },
  {
    label: "Founder Relocation Guide",
    description: "Establishing a New York base — leasing before ownership, building conviction first.",
    href: "/perspectives/leasing-today-buying-tomorrow",
    status: "live",
  },
  {
    label: "Lantern House Report",
    description: "West Chelsea design-led luxury — resident profile, tradeoffs, and neighborhood context.",
    href: "/buildings/lantern-house/report",
    status: "live",
  },
  {
    label: "One High Line Report",
    description: "West Chelsea amenity-forward living at the High Line corridor.",
    href: "/buildings/one-high-line/report",
    status: "live",
  },
  {
    label: "Family Office Guide",
    description: "Quiet luxury, resident culture, and long-horizon ownership in Manhattan towers.",
    href: "/perspectives/the-quiet-luxury-buildings-of-manhattan",
    status: "live",
  },
  {
    label: "Manhattan Luxury Rental Index",
    description: "Quarterly read on executive rental depth across premier modern buildings.",
    href: "/lease",
    status: "coming-soon",
  },
];

export const continueReadingDefaults: IntelligenceHubLink[] = [
  {
    label: "2026 Executive Housing Report",
    description: "Quarterly briefing on Manhattan housing trends, building intelligence, and executive relocation.",
    href: "/perspectives/reports/2026-executive-housing-report",
    status: "live",
  },
  {
    label: "Finance Executives In Manhattan",
    description: "Tribeca vs Hudson Yards — two contracts with the city for finance professionals.",
    href: "/perspectives/tribeca-vs-hudson-yards-for-finance-professionals",
    status: "live",
  },
  {
    label: "International Relocation Guide",
    description: "Study buildings before the first visit — Manhattan rewards pre-visit discipline.",
    href: "/perspectives/studying-manhattan-buildings-before-your-first-visit",
    status: "live",
  },
];
