export type PageContext = {
  path: string;
  title: string;
  topics: string[];
  prerequisites: string[];
  related: string[];
};

export const pageGraph = [
  {
    path: "/",
    title: "Housing Decision OS",
    topics: ["life event", "building intelligence", "decision blueprint"],
    prerequisites: ["life event", "timeline", "budget"],
    related: ["/buyer-advisory", "/situations/executive-relocation-nyc", "/situations/foreign-buyers-new-york"],
  },
  {
    path: "/buyer-advisory",
    title: "Buyer Advisory",
    topics: ["buying", "budget", "building fit", "trade-offs"],
    prerequisites: ["budget", "timeline", "neighborhood"],
    related: ["/building-reports", "/building-reports/neighborhood-guides", "/situations/new-development-nyc"],
  },
  {
    path: "/situations/corporate-relocation-buyers-nyc",
    title: "Corporate Relocation Brief",
    topics: ["relocation", "commute", "corporate", "luxury", "rentals"],
    prerequisites: ["work location", "timeline", "budget"],
    related: ["/situations/executive-relocation-nyc", "/building-reports/neighborhood-guides", "/contact"],
  },
  {
    path: "/situations/executive-relocation-nyc",
    title: "Executive Relocation Brief",
    topics: ["relocation", "industry", "commute", "privacy", "service quality"],
    prerequisites: ["industry", "work location", "timeline", "budget"],
    related: ["/situations/rent-vs-buy-manhattan-relocation", "/situations/finance-hedge-fund-relocation-nyc", "/situations/physician-relocation-nyc"],
  },
  {
    path: "/situations/rent-vs-buy-manhattan-relocation",
    title: "Rent vs Buy Relocation Brief",
    topics: ["relocation", "rent versus buy", "timeline", "flexibility", "ownership"],
    prerequisites: ["expected stay", "work location", "budget", "liquidity"],
    related: ["/situations/executive-relocation-nyc", "/situations/corporate-relocation-buyers-nyc", "/buyer-advisory"],
  },
  {
    path: "/situations/foreign-buyers-new-york",
    title: "International Buyer Brief",
    topics: ["international", "banking", "legal", "remote ownership", "building rules"],
    prerequisites: ["origin country", "use case", "budget", "financing"],
    related: ["/situations/condo-vs-coop-foreign-buyers-nyc", "/situations/pied-a-terre-buyers-nyc", "/situations/new-development-nyc"],
  },
  {
    path: "/situations/condo-vs-coop",
    title: "Condo vs Co-op Brief",
    topics: ["condo", "co-op", "ownership structure", "building health", "board approval"],
    prerequisites: ["use case", "financing", "timeline", "lifestyle rules"],
    related: [
      "/situations/coop-condo-condop-terms",
      "/situations/condo-vs-coop-foreign-buyers-nyc",
      "/guides/real-estate-ownership",
    ],
  },
  {
    path: "/situations/coop-condo-condop-terms",
    title: "Co-op, Condo & Condop Terms Brief",
    topics: ["condop", "board package", "maintenance", "common charges", "offering plan"],
    prerequisites: ["ownership structure", "listing language", "building type"],
    related: ["/situations/condo-vs-coop", "/guides/real-estate-ownership", "/situations/pied-a-terre-buyers-nyc"],
  },
  {
    path: "/situations/condo-vs-coop-foreign-buyers-nyc",
    title: "Condo vs Co-op Foreign Buyer Brief",
    topics: ["foreign buyer", "condo", "co-op", "board approval", "remote ownership"],
    prerequisites: ["use case", "financing", "rental flexibility", "ownership structure"],
    related: ["/situations/condo-vs-coop", "/situations/coop-condo-condop-terms", "/building-reports"],
  },
  {
    path: "/situations/school-district-planning-nyc",
    title: "School Planning Brief",
    topics: ["schools", "family", "neighborhood", "commute", "bedrooms"],
    prerequisites: ["children", "school type", "timeline", "commute"],
    related: ["/building-reports/neighborhood-guides", "/buyer-advisory", "/situations/executive-relocation-nyc"],
  },
  {
    path: "/situations/military-relocation-nyc",
    title: "Military Relocation Brief",
    topics: ["PCS", "timing", "rent versus buy", "commute", "financing"],
    prerequisites: ["report location", "move window", "household", "financing"],
    related: ["/situations/corporate-relocation-buyers-nyc", "/building-reports/neighborhood-guides", "/contact"],
  },
  {
    path: "/situations/physician-relocation-nyc",
    title: "Physician Relocation Brief",
    topics: ["hospital commute", "call schedule", "parking", "rental flexibility", "service reliability"],
    prerequisites: ["hospital", "schedule", "timeline", "budget"],
    related: ["/building-reports/neighborhood-guides", "/situations/executive-relocation-nyc", "/contact"],
  },
  {
    path: "/situations/finance-hedge-fund-relocation-nyc",
    title: "Finance Relocation Brief",
    topics: ["finance", "hedge fund", "privacy", "pied-a-terre", "resale discipline"],
    prerequisites: ["office pattern", "privacy needs", "budget", "ownership goals"],
    related: ["/situations/pied-a-terre-buyers-nyc", "/situations/executive-relocation-nyc", "/building-reports"],
  },
  {
    path: "/situations/pet-friendly-moves-nyc",
    title: "Pet-Friendly Move Brief",
    topics: ["pets", "building rules", "outdoor access", "elevator logistics"],
    prerequisites: ["pet type", "building type", "neighborhood", "timeline"],
    related: ["/buyer-advisory", "/building-reports", "/building-reports/neighborhood-guides"],
  },
  {
    path: "/situations/divorce-property-sales-nyc",
    title: "Divorce Property Brief",
    topics: ["divorce", "stay vs sell", "ownership", "timeline", "risk"],
    prerequisites: ["ownership", "timeline", "financial constraints"],
    related: ["/situations/probate-estate-sales-nyc", "/building-reports", "/contact"],
  },
  {
    path: "/situations/1031-exchange-new-york",
    title: "1031 Exchange Brief",
    topics: ["investment", "timeline", "replacement property", "risk"],
    prerequisites: ["deadline", "budget", "asset criteria"],
    related: ["/building-reports/individual-buildings", "/situations/new-development-nyc", "/contact"],
  },
  {
    path: "/building-reports",
    title: "Building Intelligence",
    topics: ["building health", "resale", "amenities", "building rules"],
    prerequisites: ["building type", "neighborhood", "risk tolerance"],
    related: ["/building-reports/individual-buildings", "/building-reports/neighborhood-guides", "/buyer-advisory"],
  },
  {
    path: "/building-reports/neighborhood-guides",
    title: "Neighborhood Briefs",
    topics: ["neighborhood", "commute", "lifestyle", "schools"],
    prerequisites: ["work location", "lifestyle", "household"],
    related: ["/building-reports", "/buyer-advisory", "/situations/corporate-relocation-buyers-nyc"],
  },
  {
    path: "/contact",
    title: "Private Review",
    topics: ["schedule", "recap", "advisor review"],
    prerequisites: ["email", "timeline", "decision profile"],
    related: ["/buyer-advisory", "/building-reports", "/situations"],
  },
  {
    path: "/international",
    title: "International Buyer Hub",
    topics: ["international", "country guide", "remote ownership", "language"],
    prerequisites: ["origin country", "use case", "budget"],
    related: ["/situations/foreign-buyers-new-york", "/situations/pied-a-terre-buyers-nyc", "/contact"],
  },
  {
    path: "/situations",
    title: "Advisory Services",
    topics: ["life event", "relocation", "family", "investment"],
    prerequisites: ["life event", "timeline"],
    related: ["/buyer-advisory", "/situations/executive-relocation-nyc", "/international"],
  },
  {
    path: "/advisory",
    title: "Residential Advisory",
    topics: ["strategy", "judgment", "housing decision"],
    prerequisites: ["situation", "timeline"],
    related: ["/buyer-advisory", "/belonging", "/contact"],
  },
  {
    path: "/belonging",
    title: "Belonging Assessment",
    topics: ["fit", "lifestyle", "neighborhood"],
    prerequisites: ["household", "lifestyle"],
    related: ["/buyer-advisory", "/building-reports/neighborhood-guides", "/contact"],
  },
  {
    path: "/insights",
    title: "Insights",
    topics: ["market", "perspective", "decision framing"],
    prerequisites: ["situation"],
    related: ["/buyer-advisory", "/building-reports", "/situations"],
  },
  {
    path: "/about",
    title: "About Agent Kammer",
    topics: ["practice", "advisory approach"],
    prerequisites: ["situation"],
    related: ["/buyer-advisory", "/advisory", "/contact"],
  },
  {
    path: "/situations/pied-a-terre-buyers-nyc",
    title: "Pied-à-Terre Brief",
    topics: ["pied-à-terre", "building rules", "remote use"],
    prerequisites: ["use case", "building type", "budget"],
    related: ["/situations/foreign-buyers-new-york", "/building-reports", "/international"],
  },
] satisfies PageContext[];

export function getPageContext(path: string) {
  const bare = path.split("?")[0].split("#")[0] || "/";
  if (bare.startsWith("/international/") && bare !== "/international") {
    return {
      path: bare,
      title: "International Country Guide",
      topics: ["international", "country guide", "remote ownership", "language"],
      prerequisites: ["origin country", "use case", "budget", "financing"],
      related: ["/international", "/situations/foreign-buyers-new-york", "/contact"],
    } satisfies PageContext;
  }
  return pageGraph.find((page) => bare === page.path || (page.path !== "/" && bare.startsWith(page.path))) ?? pageGraph[0];
}

export function getRelatedPages(path: string) {
  const page = getPageContext(path);
  return page.related.map((relatedPath) => getPageContext(relatedPath));
}
