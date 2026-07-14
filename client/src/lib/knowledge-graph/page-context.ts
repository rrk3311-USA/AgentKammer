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
    related: ["/buyer-advisory", "/services/executive-relocation-nyc", "/services/foreign-buyers-new-york"],
  },
  {
    path: "/buyer-advisory",
    title: "Buyer Advisory",
    topics: ["buying", "budget", "building fit", "trade-offs"],
    prerequisites: ["budget", "timeline", "neighborhood"],
    related: ["/building-reports", "/building-reports/neighborhood-guides", "/services/new-development-nyc"],
  },
  {
    path: "/services/corporate-relocation-buyers-nyc",
    title: "Corporate Relocation Brief",
    topics: ["relocation", "commute", "corporate", "luxury", "rentals"],
    prerequisites: ["work location", "timeline", "budget"],
    related: ["/services/executive-relocation-nyc", "/building-reports/neighborhood-guides", "/contact"],
  },
  {
    path: "/services/executive-relocation-nyc",
    title: "Executive Relocation Brief",
    topics: ["relocation", "industry", "commute", "privacy", "service quality"],
    prerequisites: ["industry", "work location", "timeline", "budget"],
    related: ["/services/rent-vs-buy-manhattan-relocation", "/services/finance-hedge-fund-relocation-nyc", "/services/physician-relocation-nyc"],
  },
  {
    path: "/services/rent-vs-buy-manhattan-relocation",
    title: "Rent vs Buy Relocation Brief",
    topics: ["relocation", "rent versus buy", "timeline", "flexibility", "ownership"],
    prerequisites: ["expected stay", "work location", "budget", "liquidity"],
    related: ["/services/executive-relocation-nyc", "/services/corporate-relocation-buyers-nyc", "/buyer-advisory"],
  },
  {
    path: "/services/foreign-buyers-new-york",
    title: "International Buyer Brief",
    topics: ["international", "banking", "legal", "remote ownership", "building rules"],
    prerequisites: ["origin country", "use case", "budget", "financing"],
    related: ["/services/condo-vs-coop-foreign-buyers-nyc", "/services/pied-a-terre-buyers-nyc", "/services/new-development-nyc"],
  },
  {
    path: "/services/condo-vs-coop-foreign-buyers-nyc",
    title: "Condo vs Co-op Foreign Buyer Brief",
    topics: ["foreign buyer", "condo", "co-op", "board approval", "remote ownership"],
    prerequisites: ["use case", "financing", "rental flexibility", "ownership structure"],
    related: ["/services/foreign-buyers-new-york", "/services/pied-a-terre-buyers-nyc", "/building-reports"],
  },
  {
    path: "/services/school-district-planning-nyc",
    title: "School Planning Brief",
    topics: ["schools", "family", "neighborhood", "commute", "bedrooms"],
    prerequisites: ["children", "school type", "timeline", "commute"],
    related: ["/building-reports/neighborhood-guides", "/buyer-advisory", "/services/executive-relocation-nyc"],
  },
  {
    path: "/services/military-relocation-nyc",
    title: "Military Relocation Brief",
    topics: ["PCS", "timing", "rent versus buy", "commute", "financing"],
    prerequisites: ["report location", "move window", "household", "financing"],
    related: ["/services/corporate-relocation-buyers-nyc", "/building-reports/neighborhood-guides", "/contact"],
  },
  {
    path: "/services/physician-relocation-nyc",
    title: "Physician Relocation Brief",
    topics: ["hospital commute", "call schedule", "parking", "rental flexibility", "service reliability"],
    prerequisites: ["hospital", "schedule", "timeline", "budget"],
    related: ["/building-reports/neighborhood-guides", "/services/executive-relocation-nyc", "/contact"],
  },
  {
    path: "/services/finance-hedge-fund-relocation-nyc",
    title: "Finance Relocation Brief",
    topics: ["finance", "hedge fund", "privacy", "pied-a-terre", "resale discipline"],
    prerequisites: ["office pattern", "privacy needs", "budget", "ownership goals"],
    related: ["/services/pied-a-terre-buyers-nyc", "/services/executive-relocation-nyc", "/building-reports"],
  },
  {
    path: "/services/pet-friendly-moves-nyc",
    title: "Pet-Friendly Move Brief",
    topics: ["pets", "building rules", "outdoor access", "elevator logistics"],
    prerequisites: ["pet type", "building type", "neighborhood", "timeline"],
    related: ["/buyer-advisory", "/building-reports", "/building-reports/neighborhood-guides"],
  },
  {
    path: "/services/divorce-property-sales-nyc",
    title: "Divorce Property Brief",
    topics: ["divorce", "stay vs sell", "ownership", "timeline", "risk"],
    prerequisites: ["ownership", "timeline", "financial constraints"],
    related: ["/services/probate-estate-sales-nyc", "/building-reports", "/contact"],
  },
  {
    path: "/services/1031-exchange-new-york",
    title: "1031 Exchange Brief",
    topics: ["investment", "timeline", "replacement property", "risk"],
    prerequisites: ["deadline", "budget", "asset criteria"],
    related: ["/building-reports/individual-buildings", "/services/new-development-nyc", "/contact"],
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
    related: ["/building-reports", "/buyer-advisory", "/services/corporate-relocation-buyers-nyc"],
  },
  {
    path: "/contact",
    title: "Private Review",
    topics: ["schedule", "recap", "advisor review"],
    prerequisites: ["email", "timeline", "decision profile"],
    related: ["/buyer-advisory", "/building-reports", "/services"],
  },
] satisfies PageContext[];

export function getPageContext(path: string) {
  return pageGraph.find((page) => path === page.path || (page.path !== "/" && path.startsWith(page.path))) ?? pageGraph[0];
}

export function getRelatedPages(path: string) {
  const page = getPageContext(path);
  return page.related.map((relatedPath) => getPageContext(relatedPath));
}
