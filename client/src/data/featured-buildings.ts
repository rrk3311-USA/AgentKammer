export type FeaturedBuilding = {
  name: string;
  area: string;
  slug: string;
  architecture: string;
  lifestyle: string;
  ownership: string;
  marketPosition: string;
};

/** Homepage featured collection — architecture and market context, not listings. */
export const featuredBuildings: FeaturedBuilding[] = [
  {
    name: "Lantern House",
    area: "West Chelsea",
    slug: "lantern-house",
    architecture: "Heatherwick bay windows",
    lifestyle: "High Line village rhythm",
    ownership: "Owner-occupier condos",
    marketPosition: "Design-led Chelsea premium",
  },
  {
    name: "One High Line",
    area: "West Chelsea",
    slug: "one-high-line",
    architecture: "BIG twin towers",
    lifestyle: "Faena hospitality layer",
    ownership: "Luxury rental + condo",
    marketPosition: "Resort-forward waterfront",
  },
  {
    name: "Waterline Square",
    area: "Upper West Side",
    slug: "waterline-square",
    architecture: "Three-tower campus",
    lifestyle: "100k SF Waterline Club",
    ownership: "Family-forward rental",
    marketPosition: "Riverside club living",
  },
  {
    name: "53 West 53",
    area: "Midtown",
    slug: "111-west-57",
    architecture: "Jean Nouvel exoskeleton",
    lifestyle: "MoMA adjacency",
    ownership: "Global collector base",
    marketPosition: "Billionaires Row adjacency",
  },
  {
    name: "111 West 57",
    area: "Midtown",
    slug: "111-west-57",
    architecture: "Steinway Hall supertall",
    lifestyle: "Club 111 private world",
    ownership: "Ultra-high-net-worth",
    marketPosition: "Midtown trophy tower",
  },
  {
    name: "35 Hudson Yards",
    area: "Hudson Yards",
    slug: "35-hudson-yards",
    architecture: "SOM limestone landmark",
    lifestyle: "Equinox + Starr dining",
    ownership: "Yards flagship residents",
    marketPosition: "Hudson Yards anchor",
  },
  {
    name: "Central Park Tower",
    area: "Billionaires Row",
    slug: "220-central-park-south",
    architecture: "Adrian Smith height",
    lifestyle: "Private club amenities",
    ownership: "International ownership",
    marketPosition: "Park South record pricing",
  },
  {
    name: "The Greenwich",
    area: "Greenwich Village",
    slug: "one-madison",
    architecture: "Rafael Viñoly curves",
    lifestyle: "Village + downtown access",
    ownership: "Institutional rental",
    marketPosition: "West Village landmark",
  },
];

export const intelligenceReportTopics = [
  "Light",
  "Privacy",
  "Noise",
  "Layout",
  "Amenities",
  "Carrying Cost",
  "Exit Value",
] as const;
