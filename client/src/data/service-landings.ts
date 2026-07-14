export type ServiceLanding = {
  slug: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  summary: string;
  searchTerms: string[];
  audience: string[];
  considerations: string[];
  cta: string;
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: "foreign-buyers-new-york",
    title: "Foreign Buyers in New York",
    navLabel: "Foreign Buyers",
    eyebrow: "High-Intent Buyer",
    summary:
      "International and foreign-national buyers need a calm path through New York ownership: cross-border logistics, building rules, financing, advisors, timing, and whether buying now is actually the right move.",
    searchTerms: ["foreign buyers new york real estate", "international property buyers nyc", "foreign national buying condo nyc"],
    audience: [
      "International buyers acquiring a New York residence, pied-a-terre, or long-term investment property.",
      "Clients coordinating legal, banking, tax, and purchase logistics across borders.",
      "Buyers who need building-level clarity before making a distant-market decision.",
    ],
    considerations: [
      "Filter buildings and product types that work well for overseas ownership and remote decision-making.",
      "Coordinate advisors across tax, legal, and financing considerations without losing purchase focus.",
      "Keep the process precise, discreet, and understandable for cross-border buyers.",
    ],
    cta: "Start an international buying brief for New York.",
  },
  {
    slug: "pied-a-terre-buyers-nyc",
    title: "Pied-a-Terre Buyers in NYC",
    navLabel: "Pied-a-Terre Buyers",
    eyebrow: "High-Intent Buyer",
    summary:
      "A pied-a-terre decision should start with how often the home will be used, how easy it is to own remotely, and whether the building supports a low-friction New York base.",
    searchTerms: ["pied a terre buyers nyc", "buy pied a terre new york", "second home apartment nyc"],
    audience: [
      "Buyers seeking a part-time city residence with strong convenience and service quality.",
      "Clients comparing lock-and-leave ownership options across neighborhoods and building types.",
      "People who value ease, access, and minimal operational friction.",
    ],
    considerations: [
      "Prioritize building rules, service consistency, and practical ease of ownership.",
      "Balance prestige and location with how often the apartment will actually be used.",
      "Use building context to avoid buying a property that looks good on paper but underperforms in practice.",
    ],
    cta: "Build a pied-a-terre shortlist for New York City.",
  },
  {
    slug: "widow-home-sales-nyc",
    title: "Widow Home Sales in New York",
    navLabel: "Widow Home Sales",
    eyebrow: "Seller Situation",
    summary:
      "After the loss of a spouse, the right housing decision may be to sell, wait, simplify, or hold. The brief keeps the process private, paced, and organized around what the family actually needs next.",
    searchTerms: ["widow selling home new york", "widow real estate agent nyc", "selling apartment after spouse dies nyc"],
    audience: [
      "Sellers managing a home or apartment transition after a spouse passes away.",
      "Families helping organize timing, repairs, paperwork, and next-step planning.",
      "Clients who need privacy and patience more than pressure.",
    ],
    considerations: [
      "Pace the process around readiness instead of pushing an artificial timeline.",
      "Coordinate pricing, prep, and communications with discretion.",
      "Translate the transaction into manageable decisions when the situation is emotionally heavy.",
    ],
    cta: "Request private guidance for a New York home sale.",
  },
  {
    slug: "1031-exchange-new-york",
    title: "1031 Exchange Buyers in New York",
    navLabel: "1031 Exchange",
    eyebrow: "High-Intent Buyer",
    summary:
      "A 1031 exchange needs speed without panic. The brief narrows replacement options around deadline, asset fit, downside risk, and whether New York is the right place for the capital.",
    searchTerms: ["1031 exchange new york", "1031 exchange broker nyc", "1031 exchange apartment new york"],
    audience: [
      "Exchange buyers working against strict timing windows.",
      "Investors moving capital into New York property with replacement constraints.",
      "Clients who need shortlist discipline and fast coordination.",
    ],
    considerations: [
      "Keep the search tightly filtered so time is spent only on viable assets.",
      "Balance exchange timing with building quality and downside protection.",
      "Coordinate advisors, paperwork, and execution without losing momentum.",
    ],
    cta: "Start a 1031 exchange property brief.",
  },
  {
    slug: "new-development-nyc",
    title: "New Development Buyers in NYC",
    navLabel: "New Development",
    eyebrow: "High-Intent Buyer",
    summary:
      "New development should be tested against resale alternatives, sponsor terms, carrying costs, building identity, and the buyer's real daily-life priorities before the showroom takes over.",
    searchTerms: ["new condo developments nyc", "new york new construction agent", "new development apartments nyc"],
    audience: [
      "Buyers comparing sponsor inventory and new-construction options.",
      "Clients prioritizing finishes, services, and predictable move-in quality.",
      "People weighing product freshness against neighborhood maturity and pricing.",
    ],
    considerations: [
      "Compare sponsor inventory with resale alternatives instead of assuming newer always wins.",
      "Look at service model, carrying costs, and real building identity.",
      "Translate developer messaging into buyer-level decision criteria.",
    ],
    cta: "Get a shortlist of New York development options.",
  },
  {
    slug: "single-women-buying-apartment-nyc",
    title: "Single Women Buying Apartments in NYC",
    navLabel: "Single Women Buyers",
    eyebrow: "Demographic Buyer",
    summary:
      "Independent buyers need a process that protects confidence: building quality, daily safety, neighborhood fit, financing, resale logic, and whether the purchase should happen now or later.",
    searchTerms: ["single woman buying apartment nyc", "single women home buyers new york", "women buying condo nyc"],
    audience: [
      "Women buying independently for a primary residence or long-term base in the city.",
      "Clients who want building-level confidence, daily-life fit, and smart negotiation support.",
      "Buyers who care about both investment discipline and personal comfort.",
    ],
    considerations: [
      "Prioritize building quality, access, and daily experience alongside price.",
      "Use neighborhood and service context to reduce decision fatigue.",
      "Keep the advisory process confident and pressure-free.",
    ],
    cta: "Build a confident NYC buying brief.",
  },
  {
    slug: "female-doctors-professionals-buying-nyc",
    title: "Female Doctors and Professionals Buying in NYC",
    navLabel: "Female Doctors",
    eyebrow: "Demographic Buyer",
    summary:
      "Busy physicians and professionals need a sharper buying path: fewer weak tours, stronger building filters, clear trade-offs, and a recommendation that respects time and long-term fit.",
    searchTerms: ["female doctor buying apartment nyc", "women professionals buying condo new york", "doctor home buyer nyc"],
    audience: [
      "Female physicians and professionals balancing demanding schedules with a major purchase decision.",
      "Buyers who need a tightly managed process and high confidence in the shortlist.",
      "Clients prioritizing convenience, service, and long-term ownership quality.",
    ],
    considerations: [
      "Design the process to respect time constraints without sacrificing rigor.",
      "Use building-level analysis to reduce unnecessary tours and decision fatigue.",
      "Focus on daily-life fit, long-term ownership logic, and negotiation discipline.",
    ],
    cta: "Create a concise NYC purchase brief.",
  },
  {
    slug: "corporate-relocation-buyers-nyc",
    title: "Corporate Relocation Buyers in NYC",
    navLabel: "Corporate Relocation",
    eyebrow: "Demographic Buyer",
    summary:
      "Corporate relocation should not automatically mean rushing into a rental or purchase. The brief weighs timeline, commute, household needs, company support, and whether waiting creates more leverage.",
    searchTerms: ["corporate relocation home buyer nyc", "relocating to new york to buy apartment", "executive home purchase nyc"],
    audience: [
      "Professionals relocating into New York for a longer-term ownership decision.",
      "Households balancing timing, commute, and neighborhood fit while entering a new market.",
      "Buyers who want to purchase confidently instead of defaulting into a temporary move.",
    ],
    considerations: [
      "Keep the process efficient while still giving enough neighborhood and building context.",
      "Use a purchase-first lens rather than treating relocation as automatically rental-oriented.",
      "Align the search with timing, lifestyle, and long-term ownership logic.",
    ],
    cta: "Start a purchase-focused relocation brief.",
  },
  {
    slug: "rent-vs-buy-manhattan-relocation",
    title: "Rent vs Buy After Relocating to Manhattan",
    navLabel: "Rent vs Buy Relocation",
    eyebrow: "Relocation Decision",
    summary:
      "Relocation does not automatically mean buying immediately or renting by default. The brief compares timeline, expected stay, liquidity, commute, building fit, tax exposure, and whether flexibility is worth more than ownership right now.",
    searchTerms: ["rent vs buy manhattan relocation", "should i rent or buy in nyc after relocation", "relocating to manhattan rent or buy"],
    audience: [
      "Executives and professionals relocating to Manhattan who are unsure whether to rent first or buy now.",
      "Households balancing a new job, new commute, unfamiliar neighborhoods, and a major financial decision.",
      "Clients who need a clear first move before tours, leases, or purchase offers start driving the process.",
    ],
    considerations: [
      "Start with expected length of stay, work location, liquidity, and how much uncertainty remains.",
      "Compare the cost of waiting with the risk of buying the wrong building too quickly.",
      "Use renting, buying, or waiting as strategy options instead of treating one as the default answer.",
    ],
    cta: "Compare rent, buy, and wait options after relocating.",
  },
  {
    slug: "executive-relocation-nyc",
    title: "Executive Relocation to NYC",
    navLabel: "Executive Relocation",
    eyebrow: "High-Value Relocation",
    summary:
      "Executive relocation starts with the operating rhythm of the person moving: commute, privacy, service, family logistics, timeline, and whether buying, renting, or waiting is the smarter first step.",
    searchTerms: ["executive relocation nyc", "moving to manhattan executive", "relocating to new york for work"],
    audience: [
      "Executives and senior professionals moving into Manhattan with limited time and high expectations.",
      "Households comparing commute, privacy, services, schools, and neighborhood fit before choosing a building.",
      "Clients whose housing decision has to support career demands, family logistics, and long-term flexibility.",
    ],
    considerations: [
      "Start with work location, commute tolerance, service expectations, and privacy requirements.",
      "Use industry context to shape the shortlist without creating separate niche pages for every profession.",
      "Separate impressive buildings from buildings that actually fit the client's operating rhythm.",
    ],
    cta: "Create an executive relocation Decision Blueprint.",
  },
  {
    slug: "school-district-planning-nyc",
    title: "School District Planning in NYC",
    navLabel: "School Planning",
    eyebrow: "Family Move",
    summary:
      "School planning is really household planning. The brief connects schools, commute, bedroom needs, building rules, budget, and the cost of moving too early or too late.",
    searchTerms: ["best school districts nyc real estate", "nyc school district apartment search", "moving to nyc for schools"],
    audience: [
      "Families weighing public, private, and specialized school logistics alongside housing choices.",
      "Parents who need building and neighborhood guidance before committing to a location.",
      "Households balancing bedrooms, commute, school access, and daily-life convenience.",
    ],
    considerations: [
      "Treat school planning as one part of a broader household operating system.",
      "Compare school access with commute, building rules, space, and long-term resale logic.",
      "Keep the search focused enough to avoid chasing every possible neighborhood.",
    ],
    cta: "Build a school-aware housing brief.",
  },
  {
    slug: "military-relocation-nyc",
    title: "Military Relocation to NYC",
    navLabel: "Military Relocation",
    eyebrow: "Relocation Brief",
    summary:
      "Military moves need clear triage: reporting location, PCS timing, financing, rental-versus-buy logic, household needs, and the situations where staying flexible beats forcing ownership.",
    searchTerms: ["military relocation nyc", "pcs housing new york", "military move new york real estate"],
    audience: [
      "Military households navigating a time-sensitive New York move.",
      "Clients weighing rent versus buy, commute realities, and building practicality.",
      "Families who need a concise decision path rather than a sprawling search.",
    ],
    considerations: [
      "Clarify reporting location, move window, household needs, and financing constraints early.",
      "Filter buildings and neighborhoods around practical daily-life fit, not only listing appeal.",
      "Use the Decision Blueprint to preserve context if the timeline or duty location changes.",
    ],
    cta: "Start a military relocation housing brief.",
  },
  {
    slug: "physician-relocation-nyc",
    title: "Physician Relocation to NYC",
    navLabel: "Physician Relocation",
    eyebrow: "High-Value Niche",
    summary:
      "Physician relocation decisions revolve around hospital commute, call schedule, recovery time, financing structure, parking, service reliability, and whether the home supports the work.",
    searchTerms: ["physician relocation nyc", "doctor relocating to new york", "hospital commute apartment nyc"],
    audience: [
      "Physicians and medical professionals moving to New York for hospital, fellowship, private-practice, or academic roles.",
      "Buyers and renters balancing demanding schedules with a major housing decision.",
      "Households that need commute discipline and building convenience more than generic neighborhood advice.",
    ],
    considerations: [
      "Start with hospital locations, call schedule, commute tolerance, and financing structure.",
      "Evaluate parking, elevators, staffing, package flow, and service reliability where they affect daily life.",
      "Keep the process efficient enough for limited availability without skipping building-level diligence.",
    ],
    cta: "Create a physician relocation Decision Blueprint.",
  },
  {
    slug: "finance-hedge-fund-relocation-nyc",
    title: "Finance and Hedge Fund Relocation to NYC",
    navLabel: "Finance Relocation",
    eyebrow: "Manhattan-Specific",
    summary:
      "Finance and hedge fund relocation requires asset discipline as much as lifestyle fit: commute, privacy, service quality, resale risk, carrying costs, and whether the first move should be temporary.",
    searchTerms: ["finance relocation manhattan", "hedge fund relocation nyc", "moving to manhattan finance professional"],
    audience: [
      "Finance professionals relocating for Midtown, Downtown, Hudson Yards, or hybrid office patterns.",
      "Clients comparing pied-a-terre, primary residence, luxury rental, and ownership options.",
      "Buyers who care about discretion, staff quality, building reputation, and resale discipline.",
    ],
    considerations: [
      "Map work patterns against commute friction, privacy, service model, and neighborhood rhythm.",
      "Prioritize buildings that fit ownership goals and exit risk, not just prestige.",
      "Use the assistant to personalize the same relocation path for finance-specific constraints.",
    ],
    cta: "Build a finance-focused Manhattan housing brief.",
  },
  {
    slug: "condo-vs-coop-foreign-buyers-nyc",
    title: "Condo vs Co-op for Foreign Buyers in NYC",
    navLabel: "Condo vs Co-op",
    eyebrow: "Foreign Buyer Decision",
    summary:
      "Foreign buyers should compare condos and co-ops before falling in love with a listing. The brief explains approval risk, financing, remote ownership, subletting, liquidity, privacy, and resale fit.",
    searchTerms: ["condo vs coop foreign buyer nyc", "foreign buyer co-op rules nyc", "can foreign buyers buy coops in new york"],
    audience: [
      "Foreign-national and international buyers comparing Manhattan condos, co-ops, and pied-a-terre options.",
      "Buyers who need to understand board approval, financing friction, and building rules before shortlisting properties.",
      "Clients coordinating advisors across countries who need a simple decision framework.",
    ],
    considerations: [
      "Clarify whether the buyer needs remote ownership, rental flexibility, speed, or maximum long-term value.",
      "Compare board approval risk, financing limits, sublet rules, and resale liquidity before tours.",
      "Use building rules and ownership structure as first filters, not afterthoughts.",
    ],
    cta: "Clarify condo versus co-op fit before shortlisting buildings.",
  },
  {
    slug: "pet-friendly-moves-nyc",
    title: "Pet-Friendly Moves in NYC",
    navLabel: "Pet-Friendly Moves",
    eyebrow: "Supporting Brief",
    summary:
      "Pet-friendly moves should be filtered before anyone falls in love with a listing. The brief checks building rules, elevators, outdoor access, staff culture, and daily logistics early.",
    searchTerms: ["pet friendly apartments nyc buying", "dog friendly buildings manhattan", "nyc co-op pet rules"],
    audience: [
      "Households where pet rules can determine which buildings are viable.",
      "Buyers and renters comparing outdoor access, elevator convenience, and building policies.",
      "Clients who need pet fit handled early so it does not derail the shortlist later.",
    ],
    considerations: [
      "Check building pet policies before emotional attachment to a listing.",
      "Evaluate elevator logistics, nearby outdoor space, staff culture, and board restrictions.",
      "Fold pet requirements into the broader Decision Blueprint rather than treating them as an afterthought.",
    ],
    cta: "Add pet requirements to the Decision Blueprint.",
  },
  {
    slug: "divorce-property-sales-nyc",
    title: "Divorce Property Sales in NYC",
    navLabel: "Divorce Sales",
    eyebrow: "Seller Situation",
    summary:
      "Co-owned property transitions require privacy, process control, and clear options. The brief helps decide whether to sell, hold, buy out, wait, or create a cleaner timeline.",
    searchTerms: ["divorce property sales nyc", "selling apartment during divorce new york", "divorce real estate agent nyc"],
    audience: [
      "Owners navigating sale decisions during divorce or separation.",
      "Clients who need a measured process, firm communication, and reduced friction.",
      "People coordinating legal, financial, and timing considerations alongside the sale.",
    ],
    considerations: [
      "Create a clean process with minimal ambiguity around pricing, prep, and next steps.",
      "Maintain professionalism and discretion in a situation where emotions can raise friction.",
      "Keep the sale strategy aligned with practical resolution rather than added stress.",
    ],
    cta: "Request guidance for a New York divorce property sale.",
  },
  {
    slug: "probate-estate-sales-nyc",
    title: "Probate and Estate Sales in NYC",
    navLabel: "Probate Sales",
    eyebrow: "Seller Situation",
    summary:
      "Estate and probate sales need steady sequencing: authority, valuation, preparation, stakeholder communication, timing, and whether the property should be sold now or held.",
    searchTerms: ["probate estate sales nyc", "inherited apartment sale new york", "estate sale real estate agent nyc"],
    audience: [
      "Executors, heirs, and family members managing an inherited property sale.",
      "Clients coordinating paperwork, timeline, valuation, and market preparation.",
      "People who need a steady, organized sale process during an administratively heavy period.",
    ],
    considerations: [
      "Simplify the sale process into clear steps around valuation, preparation, and timing.",
      "Balance legal/estate logistics with market realities and pricing discipline.",
      "Keep communications steady and practical when multiple stakeholders are involved.",
    ],
    cta: "Plan an estate or probate property sale in New York.",
  },
  {
    slug: "pre-foreclosure-financial-distress-sales-nyc",
    title: "Pre-Foreclosure and Financial Distress Sales in NYC",
    navLabel: "Pre-Foreclosure",
    eyebrow: "Seller Situation",
    summary:
      "Financial pressure calls for fast, realistic options without shame or panic. The brief tests sale, refinance, rental, negotiation, timing, and privacy before the window narrows.",
    searchTerms: ["pre foreclosure sale nyc", "financial distress home sale new york", "sell apartment before foreclosure nyc"],
    audience: [
      "Owners needing to understand sale options before pressure becomes a forced outcome.",
      "Clients who need a realistic, urgent assessment without dramatization.",
      "People balancing equity preservation, timing, and privacy under stress.",
    ],
    considerations: [
      "Move quickly enough to preserve options while staying clear-eyed about value and timing.",
      "Keep communications discreet and focused on practical choices.",
      "Turn an urgent situation into an organized decision framework rather than reactive chaos.",
    ],
    cta: "Request a fast, private sale assessment.",
  },
  {
    slug: "empty-nester-downsizing-nyc",
    title: "Empty Nester Downsizing in New York",
    navLabel: "Empty Nesters",
    eyebrow: "Life-Stage Move",
    summary:
      "Downsizing should protect quality of life, not just reduce square footage. The brief weighs service, simplicity, sale timing, location, storage, and what would actually feel better.",
    searchTerms: ["downsizing apartment new york", "empty nester real estate agent nyc", "downsizing condo nyc"],
    audience: [
      "Clients moving from larger homes into a more efficient New York footprint.",
      "Couples and individuals refining location, service needs, and maintenance priorities.",
      "Sellers-buyers managing both a transition out and a transition into the right next property.",
    ],
    considerations: [
      "Treat the move as a quality-of-life shift, not only a square-footage reduction.",
      "Balance lock-and-leave convenience with character, service, and location.",
      "Coordinate timing across sale, purchase, and move logistics carefully.",
    ],
    cta: "Plan a downsizing move with more clarity.",
  },
  {
    slug: "retiree-senior-home-buyers-nyc",
    title: "Retiree and Senior Home Buyers in NYC",
    navLabel: "Retiree Buyers",
    eyebrow: "Life-Stage Buyer",
    summary:
      "Retiree and senior buyers need comfort, service, access, layout, carrying-cost clarity, and long-term usability before prestige or inventory volume enters the conversation.",
    searchTerms: ["retiree home buyers nyc", "senior buying apartment new york", "retirement condo buyer nyc"],
    audience: [
      "Retirees and senior buyers seeking a more manageable New York residence.",
      "Clients prioritizing service, access, convenience, and ease of ownership.",
      "Households making a quality-of-life move rather than a speculative purchase.",
    ],
    considerations: [
      "Focus on usability, service, layout, and long-term comfort rather than only prestige.",
      "Use neighborhood and building context to simplify the field.",
      "Treat the purchase as a lifestyle decision supported by smart ownership logic.",
    ],
    cta: "Create a retirement-focused New York buying brief.",
  },
  {
    slug: "townhouse-buyers-nyc",
    title: "Townhouse Buyers in NYC",
    navLabel: "Townhouse Buyers",
    eyebrow: "High-Intent Buyer",
    summary:
      "Townhouse buyers need to compare privacy and character against maintenance, block quality, renovation exposure, security, service trade-offs, and long-term resale fit.",
    searchTerms: ["townhouse buyers nyc", "buy townhouse new york city", "brownstone buyer nyc"],
    audience: [
      "Buyers seeking townhouse, brownstone, or privacy-oriented ownership in the city.",
      "Clients comparing boutique scale and control against full-service condominium living.",
      "People who need help balancing charm, maintenance, and long-term fit.",
    ],
    considerations: [
      "Weigh privacy and individuality against maintenance burden and service tradeoffs.",
      "Use block, neighborhood, and building-form context to avoid false comparisons.",
      "Frame the purchase around lifestyle fit as much as asset class.",
    ],
    cta: "Start a townhouse search brief in New York City.",
  },
];

export const serviceLandingMap = Object.fromEntries(serviceLandings.map((item) => [item.slug, item])) as Record<string, ServiceLanding>;
