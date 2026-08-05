import type { HeroArtVariant } from "@/components/site-shell";

export type ServiceLanding = {
  slug: string;
  art: HeroArtVariant;
  /** Optional editorial banner illustration (paper-sketch style). */
  heroImage?: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  summary: string;
  searchTerms: string[];
  audience: string[];
  considerations: string[];
  depthNotes?: string[];
  cta: string;
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: "foreign-buyers-new-york",
    art: "international",
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
    depthNotes: [
      "Confirm whether the target buildings accept international buyers, pied-à-terre use, and remote board or closing logistics before flights are booked.",
      "Separate FIRPTA, financing, and advisor sequencing from the building thesis so tax complexity does not force a weak address.",
      "Prefer condominiums when co-op board timing or sponsorship risk is incompatible with a cross-border calendar.",
    ],
    cta: "Start an international buying brief for New York.",
  },
  {
    slug: "pied-a-terre-buyers-nyc",
    art: "international",
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
    depthNotes: [
      "Prioritize lock-and-leave buildings with stable service culture over maximum square footage you will rarely use.",
      "Check building rules on short stays, sublets, and package handling before falling for a view.",
      "Model carrying costs against actual nights in the city — prestige alone is a weak brief.",
    ],
    cta: "Build a pied-a-terre shortlist for New York City.",
  },
  {
    slug: "widow-home-sales-nyc",
    art: "seller-transition",
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
    depthNotes: [
      "Sequence grief, estate paperwork, and market timing so the sale does not create avoidable pressure.",
      "Decide whether staging, light renovation, or as-is pricing best protects net proceeds.",
      "Clarify who needs to approve the path: executor, attorney, family stakeholders, or all three.",
    ],
    cta: "Request private guidance for a New York home sale.",
  },
  {
    slug: "1031-exchange-new-york",
    art: "capital-strategy",
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
    depthNotes: [
      "Lock identification and closing timelines against Manhattan inventory reality before naming replacement property.",
      "Compare like-kind fit at the building level — not just price band — so the exchange does not force a mismatched address.",
      "Coordinate QI, tax counsel, and building diligence on one calendar.",
    ],
    cta: "Start a 1031 exchange property brief.",
  },
  {
    slug: "new-development-nyc",
    art: "new-development",
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
    depthNotes: [
      "Pressure-test sponsor concessions against common charges, tax abatement cliffs, and five-year resale depth.",
      "Compare the tower to a strong resale alternative in the same neighborhood before treating new as automatically better.",
      "Confirm finish quality, service staffing, and actual weekday use — not amenity brochure language alone.",
    ],
    cta: "Get a shortlist of New York development options.",
  },
  {
    slug: "single-women-buying-apartment-nyc",
    art: "single-women",
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
    depthNotes: [
      "Filter for buildings with strong door culture, lighting, and practical security without over-indexing on marketing language.",
      "Balance autonomy and privacy against co-op board process risk when timing matters.",
      "Keep the brief on daily life fit — commute, storage, guests — before aesthetic preference expands the tour list.",
    ],
    cta: "Build a confident NYC buying brief.",
  },
  {
    slug: "female-doctors-professionals-buying-nyc",
    art: "professional-buyer",
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
    depthNotes: [
      "Map hospital or practice commute against sleep schedule and call nights before choosing a district.",
      "Prefer buildings that support irregular hours: reliable staff, package handling, quiet stacks.",
      "Decide early whether ownership or a flexible lease better protects a demanding first year.",
    ],
    cta: "Create a concise NYC purchase brief.",
  },
  {
    slug: "corporate-relocation-buyers-nyc",
    art: "relocation",
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
    depthNotes: [
      "Align start date, temporary housing, and school or partner needs before committing to a purchase timeline.",
      "Use a two-neighborhood band when the company address and lifestyle preferences conflict.",
      "Default to turnkey condominiums when board timing cannot absorb a compressed move.",
    ],
    cta: "Start a purchase-focused relocation brief.",
  },
  {
    slug: "rent-vs-buy-manhattan-relocation",
    art: "ownership-structure",
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
    depthNotes: [
      "Price the optionality of renting for 6–18 months against the certainty cost of buying under time pressure.",
      "Include common charges, taxes, and exit friction — not just mortgage versus rent.",
      "If residency duration is unclear, rent-first is often the higher expected-value move.",
    ],
    cta: "Compare rent, buy, and wait options after relocating.",
  },
  {
    slug: "executive-relocation-nyc",
    art: "relocation",
    heroImage: "/images/situations/executive-relocation-nyc.png",
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
    depthNotes: [
      "Build a 30 / 60 / 90 day decision tree: temporary stay, short lease, or purchase-ready condominium.",
      "Prioritize service consistency and lock-and-leave operations for travel-heavy weeks.",
      "Keep the first tour week confirmatory — building shortlist prepared before arrival.",
    ],
    cta: "Create an executive relocation Decision Blueprint.",
  },
  {
    slug: "school-district-planning-nyc",
    art: "family-planning",
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
    depthNotes: [
      "Treat school logistics as a geography filter before apartment size becomes the conversation.",
      "Check building rules on renovations, bedrooms, and occupancy that affect family use.",
      "Compare UES / UWS / Tribeca trade-offs explicitly rather than touring all three at once.",
    ],
    cta: "Build a school-aware housing brief.",
  },
  {
    slug: "military-relocation-nyc",
    art: "military",
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
    depthNotes: [
      "Coordinate orders, temporary lodging, and lease or purchase timing against Manhattan lead times.",
      "Prefer buildings that tolerate compressed diligence and clear move-in operations.",
      "Decide early whether a short lease bridge is wiser than forcing a purchase.",
    ],
    cta: "Start a military relocation housing brief.",
  },
  {
    slug: "physician-relocation-nyc",
    art: "professional-buyer",
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
    depthNotes: [
      "Anchor the search on hospital campus commute and overnight call reality.",
      "Filter for quiet exposures and reliable building operations over trophy amenity lists.",
      "When schedule volatility is high, rent-first often protects better than an urgent buy.",
    ],
    cta: "Create a physician relocation Decision Blueprint.",
  },
  {
    slug: "finance-hedge-fund-relocation-nyc",
    art: "capital-strategy",
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
    depthNotes: [
      "Map Midtown, downtown, and west-side commute math against actual office days.",
      "Separate entertaining needs from primary living needs so the brief stays honest.",
      "Compare Tribeca, Chelsea, Hudson Yards, and FiDi as different products — not one downtown blur.",
    ],
    cta: "Build a finance-focused Manhattan housing brief.",
  },
  {
    slug: "condo-vs-coop-foreign-buyers-nyc",
    art: "ownership-structure",
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
    depthNotes: [
      "Co-op board process, financing limits, and pied-à-terre rules can eliminate otherwise perfect apartments.",
      "Condominiums usually win for cross-border timelines; co-ops can win on value when residency is stable.",
      "Make ownership structure a gate before emotional attachment to a specific unit.",
    ],
    cta: "Clarify condo versus co-op fit before shortlisting buildings.",
  },
  {
    slug: "pet-friendly-moves-nyc",
    art: "pet-friendly",
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
    depthNotes: [
      "Verify weight, breed, and number limits in offering plans and house rules — not broker verbal assurances.",
      "Factor elevator culture, outdoor access, and deposit policy into building fit.",
      "A pet-friendly claim without operational clarity is not a green light.",
    ],
    cta: "Add pet requirements to the Decision Blueprint.",
  },
  {
    slug: "divorce-property-sales-nyc",
    art: "seller-transition",
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
    depthNotes: [
      "Align legal milestones with listing strategy so pricing does not absorb avoidable conflict.",
      "Decide whether one party remains in place temporarily and how that affects showings.",
      "Protect net outcome with clear roles among counsel, agent, and both principals.",
    ],
    cta: "Request guidance for a New York divorce property sale.",
  },
  {
    slug: "probate-estate-sales-nyc",
    art: "seller-transition",
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
    depthNotes: [
      "Clarify authority, court timing, and required approvals before marketing begins.",
      "Choose as-is versus light preparation based on net proceeds, not aesthetics alone.",
      "Coordinate beneficiaries early to avoid late objections after a bid arrives.",
    ],
    cta: "Plan an estate or probate property sale in New York.",
  },
  {
    slug: "pre-foreclosure-financial-distress-sales-nyc",
    art: "seller-transition",
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
    depthNotes: [
      "Map hard deadlines against realistic Manhattan marketing and diligence windows.",
      "Prioritize certainty of close when timeline risk exceeds price maximization.",
      "Coordinate counsel and lender communication so the path stays coherent.",
    ],
    cta: "Request a fast, private sale assessment.",
  },
  {
    slug: "empty-nester-downsizing-nyc",
    art: "retirement",
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
    depthNotes: [
      "Define what must improve: fewer stairs, better service, lower carrying cost, or simpler operations.",
      "Compare selling now versus renting the current home if the next purchase is unclear.",
      "Avoid shrinking into the wrong building just to complete a move.",
    ],
    cta: "Plan a downsizing move with more clarity.",
  },
  {
    slug: "retiree-senior-home-buyers-nyc",
    art: "retirement",
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
    depthNotes: [
      "Weight elevator reliability, medical access, and daily services above speculative resale narratives.",
      "Test whether a full-service condominium beats a large classic apartment that no longer fits.",
      "Keep the brief on livability for the next decade, not peak entertaining capacity.",
    ],
    cta: "Create a retirement-focused New York buying brief.",
  },
  {
    slug: "townhouse-buyers-nyc",
    art: "townhouse-buyer",
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
    depthNotes: [
      "Price maintenance, facade work, and systems risk honestly against privacy and character.",
      "Read the block as carefully as the house — noise, light, and neighboring stock matter.",
      "Compare boutique control against full-service condominium ease before committing.",
    ],
    cta: "Start a townhouse search brief in New York City.",
  },
  {
    slug: "upper-west-side-buyers-nyc",
    art: "neighborhood-guides",
    title: "Upper West Side Buyers in NYC",
    navLabel: "Upper West Side",
    eyebrow: "NYC Neighborhood",
    summary:
      "Upper West Side decisions hinge on school convenience, park adjacency, co-op culture, building age, and whether the neighborhood supports the reason for moving—not just apartment size.",
    searchTerms: [
      "upper west side real estate agent",
      "buy apartment upper west side nyc",
      "uws condo vs coop",
      "upper west side buyer guide",
    ],
    audience: [
      "Families and professionals comparing UWS buildings around schools, parks, and daily rhythm.",
      "Buyers weighing classic co-ops against full-service condominiums west of Central Park.",
      "Relocating clients who want neighborhood fit before a long listing tour.",
    ],
    considerations: [
      "Start with lifestyle and school logistics before comparing every listing.",
      "Separate cosmetic apartment issues from building and board constraints.",
      "Use building intelligence to avoid false comparisons across different eras of stock.",
    ],
    depthNotes: [
      "Use school and park logistics to narrow micro-neighborhoods before touring every classic co-op.",
      "Separate cosmetic apartment issues from board and building constraints early.",
      "Compare co-op value against condominium ease with a clear residency horizon.",
    ],
    cta: "Start an Upper West Side decision brief.",
  },
  {
    slug: "upper-east-side-buyers-nyc",
    art: "neighborhood-guides",
    title: "Upper East Side Buyers in NYC",
    navLabel: "Upper East Side",
    eyebrow: "NYC Neighborhood",
    summary:
      "Upper East Side buying needs a clear filter for co-op boards, service buildings, quiet side streets, and whether the neighborhood matches commute, family, or pied-a-terre use.",
    searchTerms: [
      "upper east side real estate agent",
      "buy apartment upper east side nyc",
      "ues coop board prep",
      "upper east side condo buyer",
    ],
    audience: [
      "Buyers comparing UES co-ops, condominiums, and service-oriented buildings.",
      "Families prioritizing schools, museums, and established residential blocks.",
      "Clients who need board, financing, and building-rule clarity early.",
    ],
    considerations: [
      "Decide ownership structure before falling for a specific apartment.",
      "Map commute and daily life against the right micro-neighborhood.",
      "Use building reports to understand service quality and long-term fit.",
    ],
    depthNotes: [
      "Treat board readiness as part of the brief — financing, references, and timeline.",
      "Choose avenue versus side-street living deliberately; they solve different problems.",
      "Do not let museum-mile prestige override commute and daily service reality.",
    ],
    cta: "Start an Upper East Side decision brief.",
  },
  {
    slug: "tribeca-buyers-nyc",
    art: "neighborhood-guides",
    title: "Tribeca Buyers in NYC",
    navLabel: "Tribeca",
    eyebrow: "NYC Neighborhood",
    summary:
      "Tribeca is low-volume and high-conviction: loft scale, privacy, family floor plans, and boutique buildings matter more than browsing every downtown listing.",
    searchTerms: [
      "tribeca real estate agent",
      "buy loft tribeca nyc",
      "tribeca condo buyer guide",
      "family apartment tribeca",
    ],
    audience: [
      "Buyers seeking loft-scale living, privacy, and downtown family-oriented stock.",
      "Clients comparing Tribeca against SoHo, Battery Park City, and West Village alternatives.",
      "People who need help separating architecture appeal from ownership practicality.",
    ],
    considerations: [
      "Filter for true loft usability versus cosmetic industrial look.",
      "Weigh privacy and scale against price, carrying costs, and resale depth.",
      "Confirm building operations before committing to a remote or low-frequency ownership plan.",
    ],
    depthNotes: [
      "Filter for true loft usability — light, layout, and quiet — versus industrial cosmetics.",
      "Accept lower inventory velocity as a trade-off for scale and privacy.",
      "Compare Tribeca against Battery Park City and West Village only after the brief is clear.",
    ],
    cta: "Start a Tribeca decision brief.",
  },
  {
    slug: "chelsea-buyers-nyc",
    art: "neighborhood-guides",
    title: "Chelsea Buyers in NYC",
    navLabel: "Chelsea",
    eyebrow: "NYC Neighborhood",
    summary:
      "Chelsea and West Chelsea decisions turn on gallery adjacency, newer product, High Line access, and whether architecture-led inventory fits the buyer’s real lifestyle.",
    searchTerms: [
      "chelsea real estate agent nyc",
      "west chelsea condo buyer",
      "buy apartment chelsea manhattan",
      "high line real estate buyer",
    ],
    audience: [
      "Buyers comparing Chelsea classic stock with West Chelsea new development.",
      "Clients who want design-forward buildings without losing practical ownership logic.",
      "Relocating professionals prioritizing transit, culture, and walkability.",
    ],
    considerations: [
      "Separate architectural prestige from day-to-day livability and noise.",
      "Compare new development carrying costs against older full-service options.",
      "Use neighborhood fit to narrow the building shortlist early.",
    ],
    depthNotes: [
      "Separate classic Chelsea texture from West Chelsea tower living before mixing tours.",
      "Pressure-test design prestige against noise, tourists, and weekday practicality.",
      "Use High Line adjacency as a lifestyle filter, not an automatic premium justification.",
    ],
    cta: "Start a Chelsea decision brief.",
  },
  {
    slug: "hudson-yards-buyers-nyc",
    art: "neighborhood-guides",
    title: "Hudson Yards Buyers in NYC",
    navLabel: "Hudson Yards",
    eyebrow: "NYC Neighborhood",
    summary:
      "Hudson Yards buying should start with commute, amenities, new-development trade-offs, and whether the district’s lifestyle actually matches how the home will be used.",
    searchTerms: [
      "hudson yards real estate agent",
      "buy condo hudson yards nyc",
      "hudson yards new development buyer",
      "west side condo hudson yards",
    ],
    audience: [
      "Buyers considering Hudson Yards condominiums and amenity-heavy towers.",
      "Corporate relocators comparing Hudson Yards with Chelsea, Midtown West, and Tribeca.",
      "Clients evaluating new development value versus established neighborhoods.",
    ],
    considerations: [
      "Pressure-test amenity value against common charges and resale depth.",
      "Clarify commute and weekday use before chasing skyline views.",
      "Compare Hudson Yards product against nearby alternatives with different ownership profiles.",
    ],
    depthNotes: [
      "Model amenities and common charges against how many days the home is actually used.",
      "Compare Hudson Yards to Chelsea and Tribeca on neighborhood feel, not only finish quality.",
      "Corporate relocators should confirm office gravity before paying for skyline theater.",
    ],
    cta: "Start a Hudson Yards decision brief.",
  },
  {
    slug: "financial-district-buyers-nyc",
    art: "neighborhood-guides",
    title: "Financial District Buyers in NYC",
    navLabel: "Financial District",
    eyebrow: "NYC Neighborhood",
    summary:
      "Financial District decisions depend on commute convenience, building conversion quality, weekend lifestyle, and whether FiDi living supports the buyer’s actual week—not just the office address.",
    searchTerms: [
      "financial district real estate agent",
      "buy apartment financial district nyc",
      "fidi condo buyer guide",
      "downtown manhattan buyer agent",
    ],
    audience: [
      "Finance professionals and relocators prioritizing a short downtown commute.",
      "Buyers comparing FiDi conversions, waterfront stock, and Battery Park City options.",
      "Clients who need clarity on weekend livability versus weekday convenience.",
    ],
    considerations: [
      "Separate office-adjacent convenience from full residential quality of life.",
      "Inspect conversion buildings carefully for layout, light, and service standards.",
      "Decide whether FiDi is a primary home, pied-a-terre, or temporary base.",
    ],
    depthNotes: [
      "Separate weekday commute wins from weekend livability before choosing a conversion.",
      "Inspect service standards carefully — FiDi quality varies more than brochure language suggests.",
      "Decide primary home versus pied-à-terre use; the right building changes with that answer.",
    ],
    cta: "Start a Financial District decision brief.",
  },
  {
    slug: "first-home-buyers-nyc",
    art: "professional-buyer",
    title: "First Home Buyers in NYC",
    navLabel: "First Home",
    eyebrow: "Life Change",
    summary:
      "A first purchase should start with whether buying now is actually right — not with open houses. The brief clarifies readiness, trade-offs, and what a good first home needs to do.",
    searchTerms: ["first home buyers nyc", "first time home buyer manhattan", "should I buy my first apartment nyc"],
    audience: [
      "People considering a first purchase in New York within the next few years — or sooner.",
      "Renters unsure whether to keep renting, wait, or buy a smaller foothold.",
      "Clients who want clarity before they get pulled into inventory.",
    ],
    considerations: [
      "Separate emotional readiness from financial readiness and timeline pressure.",
      "Decide what the first home must solve versus what can wait for a later move.",
      "Compare buy vs. wait vs. rent-another-year before touring.",
    ],
    depthNotes: [
      "Name the life change driving the purchase — marriage, job, family, or simply wanting roots.",
      "Model carrying costs and exit optionality; a first home that is hard to sell becomes a trap.",
      "Prefer a clear Decision Profile over a rushed offer on the first building that feels exciting.",
    ],
    cta: "Start a first-home Decision Brief.",
  },
  {
    slug: "marriage-housing-nyc",
    art: "seller-transition",
    title: "Marriage and Housing Decisions in NYC",
    navLabel: "Marriage",
    eyebrow: "Life Change",
    summary:
      "Marriage often forces a housing question: whose place, a new place, rent first, or buy together. The brief starts with how you want to live — not with listings.",
    searchTerms: ["marriage housing decisions nyc", "buying apartment after marriage nyc", "combining households new york"],
    audience: [
      "Couples merging households or deciding whether to buy after marriage.",
      "Partners comparing whose lease, whose building, or a clean start.",
      "Clients who want a shared decision frame before capital is committed.",
    ],
    considerations: [
      "Map lifestyle, commute, and space needs for both people — not one person’s default.",
      "Decide rent-first vs. buy now based on timeline certainty, not wedding momentum.",
      "Clarify ownership structure, contribution, and exit assumptions early.",
    ],
    depthNotes: [
      "Separate the celebration timeline from the housing timeline; they rarely match.",
      "Name non-negotiables for each partner before comparing buildings.",
      "If one person already owns, weigh keep / sell / rent against starting fresh.",
    ],
    cta: "Start a marriage and housing Decision Brief.",
  },
  {
    slug: "new-baby-growing-family-nyc",
    art: "professional-buyer",
    title: "New Baby and Growing Family Housing in NYC",
    navLabel: "New Baby",
    eyebrow: "Life Change",
    summary:
      "A new child changes sleep, space, schools, and patience for friction. The brief asks whether anything should change now — or whether the current home can stretch a little longer.",
    searchTerms: ["new baby apartment nyc", "growing family housing manhattan", "need more space after baby nyc"],
    audience: [
      "Parents expecting a child or newly navigating life with a baby in the city.",
      "Households deciding whether to expand, relocate for schools, or stay put.",
      "Clients who feel urgency but want a decision that still works in three years.",
    ],
    considerations: [
      "Weigh space, light, elevator access, and neighborhood fit against timing pressure.",
      "Separate “we need more space someday” from “we need a different home this year.”",
      "Factor school planning early without letting district panic force a weak purchase.",
    ],
    depthNotes: [
      "List what currently fails: bedroom count, storage, noise, commute, outdoor access.",
      "Compare renovate / reconfigure vs. move before touring larger apartments.",
      "If schools matter, read the school-district brief after the life-change frame is clear.",
    ],
    cta: "Start a growing-family Decision Brief.",
  },
  {
    slug: "aging-parents-housing-nyc",
    art: "seller-transition",
    title: "Aging Parents and Housing Decisions in NYC",
    navLabel: "Aging Parents",
    eyebrow: "Life Change",
    summary:
      "Helping parents age in place, downsize, or relocate is a family decision — not a listing problem. The brief keeps dignity, logistics, and building fit ahead of urgency.",
    searchTerms: ["aging parents housing nyc", "helping parents downsize manhattan", "senior housing decisions new york"],
    audience: [
      "Adult children coordinating housing for aging parents in or near New York.",
      "Families comparing stay-put adaptations, downsizing, or a move closer to caregivers.",
      "Clients who need a calm process across siblings, attorneys, and buildings.",
    ],
    considerations: [
      "Prioritize accessibility, building service, medical access, and social continuity.",
      "Decide whether the parent’s home should be sold, rented, or held — separately from where they live next.",
      "Pace decisions around capacity and consent, not market FOMO.",
    ],
    depthNotes: [
      "Separate the parent’s daily-life needs from the estate or sale strategy.",
      "Inspect elevator buildings, bathroom access, and doorman support before aesthetics.",
      "Clarify who decides, who pays, and who lives with the outcome.",
    ],
    cta: "Start an aging-parents Decision Brief.",
  },
  {
    slug: "job-loss-housing-nyc",
    art: "capital-strategy",
    title: "Job Loss and Housing Decisions in NYC",
    navLabel: "Job Loss",
    eyebrow: "Life Change",
    summary:
      "Income disruption changes what housing should do next: protect runway, reduce burn, or hold steady. The brief prioritizes options before panic moves.",
    searchTerms: ["job loss housing decisions nyc", "should I sell after layoff nyc", "rent after job loss manhattan"],
    audience: [
      "Homeowners or renters facing layoff, career transition, or sudden income change.",
      "Households deciding whether to sell, rent, downsize, or wait.",
      "Clients who need a clear priority order: liquidity, housing stability, then market timing.",
    ],
    considerations: [
      "Protect decision quality — avoid selling or breaking a lease solely from short-term fear.",
      "Model runway, carrying costs, and realistic re-employment timelines.",
      "Compare stay / sell / rent / downsize as strategies, not moral judgments.",
    ],
    depthNotes: [
      "List fixed housing costs against liquid reserves before choosing a path.",
      "If selling, decide whether speed or net proceeds matters more right now.",
      "Separate career narrative from building thesis; a temporary income gap is not always a permanent location change.",
    ],
    cta: "Start a job-loss housing Decision Brief.",
  },
  {
    slug: "remote-work-housing-nyc",
    art: "professional-buyer",
    title: "Remote Work and Housing Decisions in NYC",
    navLabel: "Remote Work",
    eyebrow: "Life Change",
    summary:
      "Remote or hybrid work rewrites commute math, space needs, and whether Manhattan still fits. The brief asks what the home must support now — not what it supported in 2019.",
    searchTerms: ["remote work housing nyc", "hybrid work apartment manhattan", "should I leave nyc remote work"],
    audience: [
      "People whose work pattern changed and whose home no longer matches the week.",
      "Households comparing stay in NYC, leave, or redesign space for deep work.",
      "Clients deciding whether a move is necessary or whether the current home can adapt.",
    ],
    considerations: [
      "Map office days, quiet hours, and guest patterns before chasing square footage.",
      "Decide whether the problem is location, layout, noise, or simply missing a dedicated work room.",
      "Compare renovate / reconfigure vs. relocate vs. second workspace elsewhere.",
    ],
    depthNotes: [
      "Count real office days per month — hybrid myths break many purchase briefs.",
      "Prioritize light, acoustics, and a closable work door over prestige address.",
      "If leaving the city is on the table, treat it as a life-fit decision, not only a cost decision.",
    ],
    cta: "Start a remote-work Decision Brief.",
  },
  {
    slug: "inheritance-housing-nyc",
    art: "seller-transition",
    title: "Inheritance and Housing Decisions in NYC",
    navLabel: "Inheritance",
    eyebrow: "Life Change",
    summary:
      "Inheriting a home raises keep, sell, rent, and family questions at once. The brief organizes the decision before emotions and paperwork collide.",
    searchTerms: ["inherited apartment nyc", "inheritance housing decisions new york", "should I keep inherited property nyc"],
    audience: [
      "Heirs deciding what to do with an inherited apartment, townhouse, or share of a property.",
      "Families coordinating siblings, executors, and next-step housing for themselves.",
      "Clients who need a private, paced process more than a quick listing.",
    ],
    considerations: [
      "Separate estate administration from the housing strategy for the property itself.",
      "Compare keep / sell / rent against carrying costs, family use, and tax advice.",
      "Decide whether anyone should live there — and on what terms — before marketing.",
    ],
    depthNotes: [
      "Confirm authority to decide: executor, co-heirs, or court timeline.",
      "Inspect the building and condition with a cool eye; sentimental value is real and still not a renovation plan.",
      "If selling, sequence repairs and pricing against family readiness, not only broker urgency.",
    ],
    cta: "Start an inheritance Decision Brief.",
  },
];

export const serviceLandingMap = Object.fromEntries(serviceLandings.map((item) => [item.slug, item])) as Record<string, ServiceLanding>;
