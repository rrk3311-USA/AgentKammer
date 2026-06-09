export const perspectiveCategories = [
  "Buildings",
  "Neighborhoods",
  "Market Notes",
  "Relocation",
  "Luxury Living",
  "Architecture",
  "Resident Experience",
  "Buyer Psychology",
  "Decision Quality",
  "Urban Development",
] as const;

export type PerspectiveCategory = (typeof perspectiveCategories)[number];

export type PerspectiveSections = {
  observation: string;
  context: string;
  interpretation: string;
  implication: string;
  conclusion: string;
};

export type Perspective = {
  slug: string;
  title: string;
  excerpt: string;
  category: PerspectiveCategory;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  sections: PerspectiveSections;
};

export const perspectives: Perspective[] = [
  {
    slug: "why-the-building-matters-more-than-the-residence",
    title: "Why The Building Matters More Than The Residence",
    excerpt:
      "Floor plans change. Views shift. But the building sets commute, neighbors, service, and resale context for years.",
    category: "Buildings",
    publishedAt: "2026-05-15",
    readMinutes: 6,
    featured: true,
    sections: {
      observation:
        "Most Manhattan searches begin inside an apartment — square footage, light, layout. Clients rarely ask first about doorman quality, resident turnover, or how the building actually feels at 7 a.m. on a Tuesday.",
      context:
        "In luxury Manhattan, two residences can look nearly identical on a listing sheet while delivering entirely different daily experiences. The building governs elevator reliability, amenity culture, neighbor profile, and how the address is perceived five years from now.",
      interpretation:
        "The residence is a room inside a larger system. When that system is wrong — distant from transit, thin on service, misaligned with how a client works — no floor plan rescues the decision.",
      implication:
        "Serious searches should sequence building research before unit comparison. Neighborhood rhythm, resident fit, and building analysis narrow the field faster than scrolling inventory.",
      conclusion:
        "Choose the building carefully. Then choose the residence inside it. That order is not academic — it is how experienced Manhattan clients avoid expensive regret.",
    },
  },
  {
    slug: "the-hidden-cost-of-a-bad-commute",
    title: "The Hidden Cost Of A Bad Commute",
    excerpt:
      "A beautiful apartment with a draining daily route quietly taxes energy, judgment, and willingness to stay in the city.",
    category: "Relocation",
    publishedAt: "2026-05-08",
    readMinutes: 5,
    sections: {
      observation:
        "Relocation clients often accept a longer commute to secure a larger residence or a lower monthly number. The trade feels rational in a spreadsheet and expensive in real life.",
      context:
        "Manhattan luxury is as much about proximity as it is about finishes. Finance, law, and founder schedules reward short, predictable movement between home, office, and the parts of the city that matter socially and professionally.",
      interpretation:
        "Commute friction compounds. It erodes evenings, narrows restaurant and gym habits, and makes a lease feel temporary long before the term ends.",
      implication:
        "Neighborhood selection should be tested against actual weekly rhythms — not idealized weekend walks. A building five blocks in the wrong direction can cost more than a higher rent in the right one.",
      conclusion:
        "Before comparing floor plans, map the week. The best residence is often the one that gives time back.",
    },
  },
  {
    slug: "why-manhattan-keeps-building-offices",
    title: "Why Manhattan Keeps Building Offices",
    excerpt:
        "Residential demand and office construction move on different clocks. Understanding both clarifies where neighborhoods are heading.",
    category: "Urban Development",
    publishedAt: "2026-04-28",
    readMinutes: 7,
    sections: {
      observation:
        "Clients sometimes ask why new office towers continue to rise while remote work dominates headlines. The skyline suggests confidence the daily narrative does not.",
      context:
        "Manhattan's commercial core still concentrates talent, capital, and deal flow. Hudson Yards, Midtown reinvestment, and selective trophy assets reflect long-duration bets — not quarterly sentiment.",
      interpretation:
        "Office construction signals where institutions expect people to gather. That expectation reshapes transit, retail, and the residential character of surrounding blocks over a decade.",
      implication:
        "For buyers and renters, office investment is a neighborhood clue. Proximity to durable employment centers often supports liquidity and rental depth even when headlines feel uncertain.",
      conclusion:
        "Watch where serious capital places offices. Residential opportunity often follows — not immediately, but reliably.",
    },
  },
  {
    slug: "luxury-is-often-proximity",
    title: "Luxury Is Often Proximity",
    excerpt:
      "The most desirable Manhattan addresses are less about ornament than about being exactly where a client needs to be.",
    category: "Luxury Living",
    publishedAt: "2026-04-18",
    readMinutes: 5,
    sections: {
      observation:
        "Luxury marketing emphasizes marble, views, and amenities. Clients describe satisfaction differently — they mention walking to the office, meeting friends without a car, or reaching the airport with minimal friction.",
      context:
        "Manhattan compresses work, culture, and social life into a few miles. That compression makes location a lifestyle product — especially for executives and founders establishing a New York base.",
      interpretation:
        "Proximity reduces decision fatigue. It turns the city from a logistical project into a lived rhythm. That is often what clients mean when they say a building feels right.",
      implication:
        "When comparing buildings, weigh access before aesthetics. A slightly smaller residence in the right micro-location frequently outperforms a larger one that requires a daily negotiation with the city.",
      conclusion:
        "Luxury in Manhattan is frequently the absence of unnecessary distance. Study maps as carefully as floor plans.",
    },
  },
  {
    slug: "why-some-luxury-buildings-feel-empty",
    title: "Why Some Luxury Buildings Feel Empty",
    excerpt:
      "High price and low presence are not contradictory in Manhattan. Resident profile and usage patterns explain the difference.",
    category: "Resident Experience",
    publishedAt: "2026-04-02",
    readMinutes: 6,
    sections: {
      observation:
        "Clients walk into certain towers and notice silence — sparse lobbies, unused amenities, little sense of community. Others at similar price points feel alive. The discrepancy is rarely about marketing photos.",
      context:
        "Investor ownership, pied-à-terre concentration, and short-term rental exposure change how a building operates day to day. Staffing, elevator pressure, and neighbor recognition all shift with occupancy patterns.",
      interpretation:
        "Emptiness is information. It can signal flexible investment ownership, seasonal usage, or a mismatch between building positioning and who actually lives there.",
      implication:
        "Ask how a building is used — not only what it offers. Resident experience predicts service quality, resale narrative, and whether a client will feel at home after the first month.",
      conclusion:
        "A luxury building without a resident culture can still be a fine address. But clients should enter with eyes open, not with assumptions drawn from price alone.",
    },
  },
  {
    slug: "leasing-today-buying-tomorrow",
    title: "Leasing Today, Buying Tomorrow",
    excerpt:
      "Many Manhattan clients enter through a lease and later acquire. The two decisions are best understood as one arc.",
    category: "Buyer Psychology",
    publishedAt: "2026-03-22",
    readMinutes: 5,
    sections: {
      observation:
        "First-time Manhattan clients often treat leasing as temporary and buying as a separate future event. In practice, the first lease teaches what they value — block, light, building culture, commute.",
      context:
        "Luxury leasing in premier modern buildings is frequently the lowest-risk way to study a neighborhood before capital commitment. The same watchlist that supports leasing can inform acquisition later.",
      interpretation:
        "A thoughtful lease is reconnaissance, not delay. Clients who choose the right building early reduce rework when they are ready to purchase.",
      implication:
        "Structure the lease with tomorrow in mind: building quality, resale depth, and whether the address fits a five-year arc — not only a twelve-month contract.",
      conclusion:
        "Leasing and buying are not opposing paths. Used well, leasing is how discerning clients earn conviction before they write a much larger check.",
    },
  },
  {
    slug: "the-building-before-the-apartment",
    title: "The Building Before The Apartment",
    excerpt:
      "Inventory-first searches feel efficient. Building-first searches produce fewer mistakes.",
    category: "Decision Quality",
    publishedAt: "2026-03-10",
    readMinutes: 5,
    sections: {
      observation:
        "Listing portals reward apartment browsing. Clients arrive with saved units before they can explain why a neighborhood fits their week.",
      context:
        "Manhattan luxury decisions fail quietly — not because a client chose the wrong layout, but because the building and address never matched how they actually live.",
      interpretation:
        "Building research creates a filter. It reduces noise, clarifies tradeoffs, and makes later unit comparisons smaller and more precise.",
      implication:
        "Start with a curated watchlist, contextual review, and resident fit. Let apartments arrive after the building question is largely answered.",
      conclusion:
        "Efficiency in search is not scrolling faster. It is studying the right objects first.",
    },
  },
];

export const featuredPerspective = perspectives.find((p) => p.featured) ?? perspectives[0];

export function getPerspectiveBySlug(slug: string): Perspective | undefined {
  return perspectives.find((p) => p.slug === slug);
}

export function getRecentPerspectives(count = 3): Perspective[] {
  return [...perspectives]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count);
}

export function formatPerspectiveDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
