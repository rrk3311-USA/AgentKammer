export const perspectiveContentTypes = [
  { id: "building", label: "Building" },
  { id: "neighborhood", label: "Neighborhood" },
  { id: "market-note", label: "Market Note" },
  { id: "relocation", label: "Relocation" },
  { id: "international", label: "International" },
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
  /** Target markets for international SEO (e.g. UK, UAE, Singapore) */
  markets?: string[];
  sections: PerspectiveSections;
};

export const perspectives: Perspective[] = [
  {
    slug: "2026-executive-housing-report-for-international-buyers",
    title: "The 2026 Executive Housing Report For International Buyers",
    excerpt:
      "Manhattan executive housing is a building decision before it is an apartment decision — especially for clients arriving from London, Dubai, Singapore, Hong Kong, and Europe.",
    contentType: "international",
    publishedAt: "2026-06-11",
    readMinutes: 5,
    markets: ["UK", "UAE", "Singapore", "Hong Kong", "Europe"],
    sections: {
      observation:
        "International executives often request apartment tours before they can name three buildings they would seriously consider. The 2026 market rewards the opposite sequence: building thesis first, unit second.",
      context:
        "Agent Kammer's 2026 Executive Housing Report reads Manhattan through relocation, leasing, and acquisition — with explicit attention to how global clients misread co-op exposure, amenity bundles, and neighborhood micro-rhythms.",
      interpretation:
        "The report is not a market forecast deck. It is a decision framework: who is moving, which building signals matter, when leasing beats buying, and how international timelines should structure pre-visit research.",
      implication:
        "Clients from the UK, UAE, and Asia-Pacific should read the syndicated market angles before booking flights — UK finance commute logic, Gulf pied-à-terre concentration, and APAC comparisons to other financial capitals are indexed separately.",
      conclusion:
        "Start with the full report, then schedule advisory if you want a building shortlist mapped to your actual week. Manhattan punishes inventory-first searches — especially across time zones.",
    },
  },
  {
    slug: "studying-manhattan-buildings-before-your-first-visit",
    title: "Studying Manhattan Buildings Before Your First Visit",
    excerpt:
      "International buyers rarely need to tour twenty apartments. They need to narrow the building field before they land — and Manhattan rewards that discipline.",
    contentType: "international",
    publishedAt: "2026-06-07",
    readMinutes: 7,
    featured: true,
    markets: ["UK", "UAE", "Singapore", "Hong Kong", "Europe"],
    sections: {
      observation:
        "Clients relocating from London, Dubai, or Singapore often arrive in Manhattan with a list of apartments but no building thesis. They spend the first week reacting to floor plans instead of evaluating address, service culture, and resident profile.",
      context:
        "Manhattan luxury is building-differentiated in ways that do not translate from other global cities. Co-op restrictions, amenity bundles, pied-à-terre concentration, and neighborhood micro-rhythms matter as much as square footage — and most of that information is knowable before a first showing.",
      interpretation:
        "Pre-visit building research is not caution. It is efficiency. The clients who study towers remotely — through reports, video walk-throughs, and neighborhood mapping — arrive with fewer variables and better questions.",
      implication:
        "Structure the search as building shortlist first, unit second. For international timelines, that sequence protects jet-lagged decision-making and reduces the temptation to accept a beautiful residence inside the wrong system.",
      conclusion:
        "The first visit should confirm a thesis, not discover one. Manhattan rewards clients who do their building homework before they pack a suitcase.",
    },
  },
  {
    slug: "what-a-uk-executive-should-know-about-manhattan-relocation",
    title: "What A UK Executive Should Know About Manhattan Relocation",
    excerpt:
      "London and Manhattan share a finance culture but not a housing logic. The differences that surprise British executives are rarely about price.",
    contentType: "international",
    publishedAt: "2026-06-07",
    readMinutes: 6,
    markets: ["UK", "London"],
    sections: {
      observation:
        "British executives often assume Manhattan works like Mayfair or Canary Wharf at a larger scale — freehold thinking, predictable commutes, and buildings that function as neutral containers for a good flat.",
      context:
        "Manhattan adds layers: leasehold mechanics in many new developments, co-op boards in established stock, doorman culture as daily infrastructure, and neighborhoods that change character within a few blocks. The city compresses professional life — proximity matters more than in London's distributed zones.",
      interpretation:
        "The adjustment is not cultural in the social sense. It is structural. A UK executive who optimizes for square footage over block and building often buys friction — longer evenings, weaker resale narrative, and a residence that fights the work week.",
      implication:
        "Map the actual weekly rhythm first: office location, school runs if relevant, airport access, and where peers actually gather. Tribeca, Hudson Yards, and West Chelsea solve different versions of the same executive life.",
      conclusion:
        "Manhattan is not a larger London. It is a different housing system with familiar professional gravity. Executives who learn that early make cleaner first decisions.",
    },
  },
  {
    slug: "why-some-buildings-feel-more-expensive-than-they-are",
    title: "Why Some Buildings Feel More Expensive Than They Are",
    excerpt:
      "Carrying cost, service density, and neighbor profile can make a tower feel costly even when the price per foot looks competitive on paper.",
    contentType: "building",
    publishedAt: "2026-06-07",
    readMinutes: 6,
    sections: {
      observation:
        "Clients compare buildings by headline price and common charges. Six months later they describe one tower as feeling expensive and another as fair — often with the numbers inverted from their original spreadsheet.",
      context:
        "The felt cost of a building includes elevator reliability, staff continuity, amenity utilization pressure, and whether the address still reads clearly to future buyers. Some towers carry prestige premiums that do not convert to daily satisfaction.",
      interpretation:
        "Expensive-feeling buildings usually mismatch usage: high infrastructure cost with low personal benefit, or prestige positioning without resident culture. The building charges for a bundle the client never unpacks.",
      implication:
        "Separate the residence invoice from the building invoice before comparing. Ask which line items the client will actually consume — service, amenities, address narrative — and which are vanity carry.",
      conclusion:
        "A building that feels expensive is sending a signal. The research task is to determine whether that signal is quality, overhead, or misalignment — before the lease or purchase is signed.",
    },
  },
  {
    slug: "the-quiet-luxury-buildings-of-manhattan",
    title: "The Quiet Luxury Buildings Of Manhattan",
    excerpt:
      "Not every significant Manhattan tower announces itself. Some of the most durable addresses trade volume for discretion — and attract a specific resident.",
    contentType: "building",
    publishedAt: "2026-06-06",
    readMinutes: 7,
    sections: {
      observation:
        "Marketing-forward towers dominate search attention. Yet some of Manhattan's most stable luxury addresses barely surface on portals — low turnover, restrained branding, and residents who prefer understatement.",
      context:
        "Quiet luxury buildings often sit in established blocks with proven service cultures: consistent staffing, restrained amenity programs, and neighbor profiles that skew toward long-horizon ownership rather than speculative churn.",
      interpretation:
        "Discretion is a product choice, not an accident. These buildings filter for clients who want excellent daily life without spectacle — and who understand that resale depth can come from reputation rather than billboard presence.",
      implication:
        "For buyers who dislike lobby performance and prefer architectural restraint, the quiet list may outperform the famous list. The research challenge is access: these buildings reveal themselves through advisory networks, not infinite scroll.",
      conclusion:
        "Quiet luxury is not hidden luxury for its own sake. It is a positioning decision — and for the right client, it is the most rational one in Manhattan.",
    },
  },
  {
    slug: "why-service-quality-matters-more-than-amenities",
    title: "Why Service Quality Matters More Than Amenities",
    excerpt:
      "Pools and wine rooms photograph well. Doorman judgment, elevator timing, and staff continuity define whether a building actually works.",
    contentType: "building",
    publishedAt: "2026-06-05",
    readMinutes: 6,
    sections: {
      observation:
        "Listing sheets compete on amenity counts — second gyms, golf simulators, entertainment lounges. Residents describe satisfaction through different vocabulary: recognition at the door, package handling, repair responsiveness, and whether the building feels competently run.",
      context:
        "Amenity decks are capital expenses baked into monthly carrying costs whether or not a resident visits them. Service is the operating layer that runs every day — and in full-time Manhattan living, it touches more hours than any pool.",
      interpretation:
        "Service quality is the building's nervous system. When it fails, amenities become irrelevant. When it excels, even a modest amenity program feels sufficient because the residence itself is frictionless.",
      implication:
        "Tour buildings on a Tuesday morning, not only a Saturday open house. Watch elevator behavior, staff interaction, and whether the operation feels staffed for residents or staged for sales.",
      conclusion:
        "Amenities sell the first visit. Service determines the third year. Serious Manhattan research weights the operating culture at least as heavily as the renderings.",
    },
  },
  {
    slug: "tribeca-vs-hudson-yards-for-finance-professionals",
    title: "Tribeca Vs Hudson Yards For Finance Professionals",
    excerpt:
      "Two addresses can both read as executive Manhattan — but they organize the week differently for people tied to Midtown and the west side.",
    contentType: "neighborhood",
    publishedAt: "2026-06-04",
    readMinutes: 7,
    sections: {
      observation:
        "Finance clients often shortlist Tribeca and Hudson Yards in the same conversation — both signal success, both offer modern product, both promise proximity to power centers. The lived experience diverges quickly.",
      context:
        "Tribeca carries established neighborhood texture: restaurant depth, school presence, cobblestone scale, and a quieter residential rhythm. Hudson Yards delivers new-tower infrastructure, corporate adjacency, and a skyline identity still forming its social habits.",
      interpretation:
        "Tribeca trades on earned character. Hudson Yards trades on institutional adjacency and amenity-forward product. Neither is universally correct — the choice is which version of executive life the client is actually buying.",
      implication:
        "Test commute reality to the client's actual office — not a generic Midtown pin. Ask whether they want weekend neighborhood life or weekday campus efficiency. Those answers split the decision faster than comparing floor plans.",
      conclusion:
        "For finance professionals, Tribeca and Hudson Yards are not interchangeable prestige options. They are two different contracts with the city — and the right one depends on how the client uses Manhattan, not how they describe it at dinner.",
    },
  },
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

export function hasRelatedPerspective(buildingSlug: string): boolean {
  return perspectives.some((p) => p.relatedBuildingReportSlug === buildingSlug);
}

export function getInternationalPerspectives(): Perspective[] {
  return perspectives.filter((p) => p.contentType === "international");
}

export function formatPerspectiveDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
