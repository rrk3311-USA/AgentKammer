export const perspectiveContentTypes = [
  { id: "building", label: "Building" },
  { id: "neighborhood", label: "Neighborhood" },
  { id: "market-note", label: "Market Note" },
  { id: "relocation", label: "Relocation" },
  { id: "development", label: "Development" },
  { id: "lifestyle", label: "Lifestyle" },
] as const;

export type PerspectiveContentType = (typeof perspectiveContentTypes)[number]["id"];

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
  contentType: PerspectiveContentType;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  relatedBuildingReportSlug?: string;
  sections: PerspectiveSections;
};

export const perspectives: Perspective[] = [
  {
    slug: "what-residents-actually-pay-for-in-luxury-buildings",
    title: "What Residents Actually Pay For In Luxury Buildings",
    excerpt:
      "The monthly number on a listing is rarely the full story. In amenity-forward towers, residents often pay for infrastructure they never use — or infrastructure that defines their entire week.",
    contentType: "lifestyle",
    publishedAt: "2026-06-07",
    readMinutes: 6,
    relatedBuildingReportSlug: "one-high-line",
    sections: {
      observation:
        "Luxury listings lead with price per square foot. Residents lead with how a building actually organizes their week — elevator reliability, doorman culture, gym hours, pool access, and whether the amenity deck feels like a second home or a showroom.",
      context:
        "Manhattan's newest towers increasingly compete through shared infrastructure: wellness campuses, entertainment lounges, pools, and service layers that inflate carrying costs whether or not a resident steps inside them. One High Line is a clear example — the product is not only the apartment but the resort-like stack wrapped around it.",
      interpretation:
        "What residents pay for is often a bundle: address, service density, neighbor profile, and optional lifestyle infrastructure. The bundle makes sense when usage is high. When usage is low, the same bundle becomes a tax on square footage the buyer never experiences.",
      implication:
        "Serious searches should separate the residence line item from the infrastructure line item. Ask how many days per month the buyer will realistically live inside the building's common world. That single question separates excellent fit at One High Line from expensive mismatch two blocks away at a design-led alternative.",
      conclusion:
        "Luxury is not one product. It is several products sold as one number. The buildings worth studying are the ones honest enough to show which product they are actually selling.",
    },
  },
  {
    slug: "why-some-luxury-buildings-have-more-personality-than-others",
    title: "Why Some Luxury Buildings Have More Personality Than Others",
    excerpt:
      "Price and amenities converge across Manhattan. Character does not. The buildings worth studying are the ones with a discernible point of view.",
    contentType: "building",
    publishedAt: "2026-06-07",
    readMinutes: 6,
    featured: true,
    relatedBuildingReportSlug: "lantern-house",
    sections: {
      observation:
        "Walk through enough luxury towers and a pattern emerges: similar finishes, similar amenity decks, similar marketing language. Many buildings compete on scale and specification. Few compete on identity.",
      context:
        "Architecture, scale, and neighborhood relationship shape how a building feels day to day — more than a wine room or a second gym. Some developments are designed to disappear into the skyline. Others are designed to be remembered.",
      interpretation:
        "Personality is not ornament. It is a set of choices about how a building relates to the street, the light, and the resident inside it. Buildings with personality often trade efficiency for experience — and attract residents who value that trade.",
      implication:
        "Lantern House is a useful case study: Heatherwick's bay windows and sculptural façade create exposure and charm in equal measure. That is not a flaw in the design — it is the point. Clients who need anonymity will feel friction. Clients who want a memorable home may feel immediately at home.",
      conclusion:
        "When studying Manhattan luxury, ask whether a building has a point of view — not only a price point. The watchlist should include towers worth comparing and towers worth remembering. They are not always the same list.",
    },
  },
  {
    slug: "why-the-building-matters-more-than-the-residence",
    title: "Why The Building Matters More Than The Residence",
    excerpt:
      "Floor plans change. Views shift. But the building sets commute, neighbors, service, and resale context for years.",
    contentType: "building",
    publishedAt: "2026-05-15",
    readMinutes: 6,
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
    contentType: "relocation",
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
    contentType: "development",
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
    contentType: "lifestyle",
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
    contentType: "building",
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
    contentType: "lifestyle",
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
    contentType: "building",
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

export function getPerspectiveContentTypeMeta(contentType: PerspectiveContentType) {
  return perspectiveContentTypes.find((type) => type.id === contentType)!;
}

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
