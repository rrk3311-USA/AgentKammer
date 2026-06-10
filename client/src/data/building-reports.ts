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
  {
    slug: "one-high-line",
    buildingName: "One High Line",
    series: "Agent Kammer Building Report Series",
    location: "West Chelsea, Manhattan",
    publishedAt: "2026-06-07",
    readMinutes: 13,
    buildingProfile: {
      neighborhood: "West Chelsea",
      buildingType: "Luxury Condominium & Rental",
      design: "Bjarke Ingels Group (BIG)",
      positioning:
        "Amenity-forward luxury living directly adjacent to the High Line and Hudson River corridor.",
    },
    executiveSummary: [
      "One High Line is what happens when a luxury building decides to compete as a destination rather than an address.",
      "Many Manhattan towers add amenities because the market expects them. One High Line organizes daily life around them.",
      "Designed by Bjarke Ingels Group for Related, the development pairs two towers with a shared amenity campus that feels closer to a private club than a typical condominium. Pools, fitness, entertainment spaces, and river-facing common areas are not afterthoughts — they are the product.",
      "This is not the most understated building in West Chelsea. It may be the most complete lifestyle package on the High Line corridor.",
    ],
    observation: [
      "West Chelsea now offers two distinct luxury philosophies within blocks of each other. Lantern House competes through architecture and neighborhood connection. One High Line competes through scale, amenities, and resort-like infrastructure.",
      "Both are luxury. They solve for different residents.",
      "That comparison is not academic — it is how serious buyers should evaluate the corridor.",
    ],
    residentProfile: {
      likely: [
        "Finance and private-equity professionals",
        "Entertainment and media executives",
        "Relocation clients seeking turnkey luxury",
        "Families prioritizing on-site wellness and recreation",
        "Buyers who want a full amenity stack without leaving the building",
        "Part-time Manhattan residents who value service density",
      ],
      lessCommon: [
        "Design minimalists seeking quiet anonymity",
        "Buyers who rarely use common amenities",
        "Residents who prefer boutique scale over resort infrastructure",
      ],
    },
    residentProfileMix: [
      { label: "Finance", filled: 4 },
      { label: "Family", filled: 3 },
      { label: "Creative", filled: 2 },
      { label: "Investor", filled: 2 },
    ],
    differentiators: [
      {
        title: "Amenity Architecture",
        body: "The building treats shared spaces as primary design elements, not marketing checkboxes. Daily life can plausibly center on the building — not only the apartment.",
      },
      {
        title: "Two-Tower Scale",
        body: "The paired-tower format creates vertical community within a larger footprint than boutique West Chelsea neighbors. More residents, more infrastructure, more programming potential.",
      },
      {
        title: "High Line Integration",
        body: "Direct adjacency to the High Line places the building inside one of Manhattan's most walked corridors — gallery access, dining, and downtown connectivity without a commute to the neighborhood.",
      },
      {
        title: "Resort Positioning",
        body: "The experience skews resort-like: pools, extensive fitness, entertainment and lounge environments. For the right buyer, that is convenience. For others, it is noise.",
      },
    ],
    strengths: [
      "Comprehensive amenity campus",
      "Strong High Line and river corridor placement",
      "BIG design pedigree with recognizable form",
      "Turnkey luxury for relocation and busy professionals",
      "Service and infrastructure density",
      "West Chelsea cultural access",
    ],
    tradeoffs: [
      "Less intimate than smaller West Chelsea buildings",
      "Amenity value depends on actual usage",
      "Resort atmosphere may feel impersonal to some residents",
      "Premium pricing reflects infrastructure, not only residence size",
      "Higher resident population than boutique alternatives",
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
        "One High Line sits at the intersection of cultural foot traffic and new residential infrastructure — a different daily rhythm than Midtown, with stronger amenity density than many downtown conversions.",
    },
    comparablesIntro: "When evaluating One High Line, buyers often compare:",
    comparables: [
      { slug: "lantern-house", name: "Lantern House", lines: ["More design-forward.", "More character-driven."] },
      { slug: "565-broome", name: "565 Broome", lines: ["More minimalist.", "More SoHo privacy."] },
      { slug: "35-hudson-yards", name: "35 Hudson Yards", lines: ["More corporate district integration.", "More Hudson Yards scale."] },
      { slug: "the-cortland", name: "The Cortland", lines: ["More family-oriented waterfront.", "Less High Line adjacency."] },
    ],
    fit: [
      {
        label: "Excellent fit",
        items: [
          "Relocation executives wanting turnkey luxury",
          "Residents who will use amenities weekly",
          "Families prioritizing wellness and recreation on-site",
          "Buyers seeking High Line proximity with full infrastructure",
          "Professionals who value convenience over architectural minimalism",
        ],
      },
      {
        label: "Moderate fit",
        items: [
          "Creative professionals who want neighborhood character first",
          "Pied-à-terre owners who rarely use common spaces",
          "International buyers comparing trophy addresses",
        ],
      },
      {
        label: "Poor fit",
        items: [
          "Buyers seeking boutique anonymity",
          "Residents who prefer design-led buildings over amenity-led buildings",
          "Value investors who will not utilize the infrastructure they are paying for",
        ],
      },
    ],
    commute: {
      destinations: [
        "Hudson Yards",
        "Meatpacking District",
        "Flatiron",
        "Financial District",
        "Midtown West",
      ],
      closing:
        "The location favors downtown and west-side commutes. Residents gain walkability along the High Line corridor while maintaining car and transit access to broader Manhattan.",
    },
    agentKammerPerspective: [
      "The interesting thing about One High Line is not the finishes. Many Manhattan buildings have strong finishes.",
      "The interesting thing is that the building asks a direct question: will you actually live inside the amenity stack you are buying into?",
      "For residents who answer yes, One High Line can feel extraordinarily efficient — work, wellness, and entertainment compressed into one address.",
      "For residents who answer no, the building can feel like paying for a resort membership attached to an apartment. That is not a flaw in the product. It is the fit question worth studying.",
    ],
    bottomLine: [
      "One High Line is not trying to be quiet luxury. It is trying to be complete luxury.",
      "For the right resident, that completeness is the point — a West Chelsea address with the infrastructure of a private club. For the wrong resident, the same infrastructure is simply overhead.",
      "That distinction is why the building belongs on a serious Manhattan watchlist.",
    ],
    relatedPerspectiveSlug: "what-residents-actually-pay-for-in-luxury-buildings",
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
