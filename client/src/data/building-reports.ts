export type BuildingReportDifferentiator = {
  title: string;
  body: string;
};

export type BuildingReportComparable = {
  slug?: string;
  name: string;
  lines: [string, string];
};

export type BuildingReportFitTier = {
  label: string;
  items: string[];
};

export type ResidentProfileBar = {
  label: string;
  filled: number;
  total?: number;
};

export type BuildingReport = {
  slug: string;
  buildingName: string;
  series: string;
  location: string;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  buildingProfile: {
    neighborhood: string;
    buildingType: string;
    design: string;
    positioning: string;
  };
  executiveSummary: string[];
  observation: string[];
  residentProfile: {
    likely: string[];
    lessCommon: string[];
  };
  residentProfileMix?: ResidentProfileBar[];
  differentiators: BuildingReportDifferentiator[];
  strengths: string[];
  tradeoffs: string[];
  tradeoffsNote: string;
  neighborhoodContext: {
    intro: string;
    combines: string[];
    closing: string;
  };
  comparablesIntro: string;
  comparables: BuildingReportComparable[];
  fit: BuildingReportFitTier[];
  commute: {
    destinations: string[];
    closing: string;
  };
  agentKammerPerspective: string[];
  bottomLine: string[];
  relatedPerspectiveSlug?: string;
};

export const buildingReports: BuildingReport[] = [
  {
    slug: "lantern-house",
    buildingName: "Lantern House",
    series: "Agent Kammer Building Report Series",
    location: "West Chelsea, Manhattan",
    publishedAt: "2026-06-07",
    readMinutes: 14,
    featured: true,
    buildingProfile: {
      neighborhood: "West Chelsea",
      buildingType: "Luxury Condominium",
      design: "Thomas Heatherwick",
      positioning: "Design-forward luxury living connected to the High Line corridor.",
    },
    executiveSummary: [
      "Lantern House is one of the rare Manhattan buildings that feels residential before it feels luxurious.",
      "Many modern towers compete through height, amenity count, or spectacle. Lantern House competes through character.",
      "Designed by Thomas Heatherwick, the building is immediately recognizable by its sculptural façade and distinctive bay windows. The result is a residence that feels more connected to the neighborhood than many newer luxury developments.",
      "This is not the most efficient luxury building. It may be one of the most memorable.",
    ],
    observation: [
      "Most luxury buildings attempt to separate residents from the city. Lantern House does the opposite.",
      "The building intentionally creates visual interaction with the neighborhood, the High Line, and the surrounding streetscape.",
      "For some residents this creates charm. For others it creates exposure. That distinction matters.",
    ],
    residentProfile: {
      likely: [
        "Creative executives",
        "Founders",
        "Media professionals",
        "Design-conscious buyers",
        "Part-time Manhattan residents",
        "Individuals prioritizing architecture over maximum square footage",
      ],
      lessCommon: [
        "Traditional finance buyers",
        "Value-maximization investors",
        "Residents seeking complete privacy",
      ],
    },
    residentProfileMix: [
      { label: "Creative", filled: 4 },
      { label: "Finance", filled: 2 },
      { label: "Family", filled: 3 },
      { label: "Investor", filled: 1 },
    ],
    differentiators: [
      {
        title: "Architecture",
        body: "Most Manhattan towers disappear into a skyline. Lantern House remains recognizable. The curved façade creates an identity few buildings achieve.",
      },
      {
        title: "Windows",
        body: "The projecting windows become part of daily living. They are functional experiences, not decorative features.",
      },
      {
        title: "Scale",
        body: "The building feels more intimate than many modern supertowers.",
      },
      {
        title: "Neighborhood Relationship",
        body: "Residents experience Chelsea rather than simply overlooking it.",
      },
    ],
    strengths: [
      "Distinctive architecture",
      "Strong neighborhood integration",
      "High Line proximity",
      "Memorable identity",
      "Boutique feel relative to larger developments",
      "Design pedigree",
    ],
    tradeoffs: [
      "Not the tallest tower",
      "Less privacy than some trophy buildings",
      "Architecture can be polarizing",
      "Some buyers prioritize efficiency over design",
    ],
    tradeoffsNote:
      "A building should not be judged solely by strengths. The tradeoffs are often what determine fit.",
    neighborhoodContext: {
      intro: "West Chelsea continues to occupy a unique position within Manhattan. It combines:",
      combines: [
        "Art galleries",
        "Waterfront access",
        "High Line connectivity",
        "Luxury residential development",
        "Downtown accessibility",
      ],
      closing:
        "Residents gain access to both neighborhood character and modern infrastructure.",
    },
    comparablesIntro: "When evaluating Lantern House, buyers often compare:",
    comparables: [
      { slug: "one-high-line", name: "One High Line", lines: ["More amenity-driven.", "More resort-like."] },
      { slug: "565-broome", name: "565 Broome", lines: ["More minimalist.", "More private."] },
      { slug: "35-hudson-yards", name: "35 Hudson Yards", lines: ["More corporate luxury.", "More service-heavy."] },
      { slug: "the-cortland", name: "The Cortland", lines: ["Waterfront-focused.", "Family-oriented."] },
    ],
    fit: [
      {
        label: "Excellent fit",
        items: [
          "Design-conscious professionals",
          "Creative industries",
          "Founders",
          "Buyers seeking personality",
          "Residents wanting a memorable home",
        ],
      },
      {
        label: "Moderate fit",
        items: ["Finance professionals", "International buyers", "Pied-à-terre owners"],
      },
      {
        label: "Poor fit",
        items: [
          "Pure value investors",
          "Buyers seeking anonymity",
          "Residents prioritizing maximum amenities above all else",
        ],
      },
    ],
    commute: {
      destinations: ["Hudson Yards", "Flatiron", "Midtown", "Financial District"],
      closing:
        "The location provides strong connectivity while maintaining a more residential atmosphere than Midtown.",
    },
    agentKammerPerspective: [
      "The interesting thing about Lantern House is not that it is luxurious. Many Manhattan buildings are luxurious.",
      "The interesting thing is that it has a point of view.",
      "Most buildings solve for efficiency. Lantern House solves for experience.",
      "That makes it one of the more distinctive residential buildings currently worth studying in Manhattan.",
    ],
    bottomLine: [
      "Lantern House is not for everyone. That is precisely why it succeeds.",
      "For the right resident, it offers something increasingly rare in modern luxury real estate: a building with a personality.",
    ],
    relatedPerspectiveSlug: "why-some-luxury-buildings-have-more-personality-than-others",
  },
];

export const featuredBuildingReport = buildingReports.find((r) => r.featured) ?? buildingReports[0];

export function getBuildingReportBySlug(slug: string): BuildingReport | undefined {
  return buildingReports.find((r) => r.slug === slug);
}

export function hasBuildingReport(slug: string): boolean {
  return buildingReports.some((r) => r.slug === slug);
}

export function formatBuildingReportDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
