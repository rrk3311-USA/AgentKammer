/**
 * Page-aware Decision Guide (Raphi) engagement.
 * Compact dock copy, starters, and soft nudges keyed to the current route.
 */

export type EngagementStarter = {
  label: string;
  text: string;
  path?: string;
};

export type PageEngagement = {
  /** Compact dock headline under Guidance Advisor */
  headline: string;
  /** Placeholder / rotating prompt flavor */
  prompts: string[];
  /** Soft nudge after dwell time */
  nudge: string;
  /** First-message greeting when conversation is still cold */
  greeting: string;
  /** Quick chips for early conversation */
  starters: EngagementStarter[];
  /** One-line page helper when visitor navigates mid-session */
  pageHelper: string;
};

const defaultEngagement: PageEngagement = {
  headline: "What's changing?",
  prompts: [
    "Tell me what's changing...",
    "I'm relocating to Manhattan...",
    "We need more space...",
    "I'm not sure if I should sell...",
    "I'm just exploring...",
  ],
  nudge: "Still deciding? I can help you figure out whether anything should change.",
  greeting:
    "Hi, I'm Raphi - your Guidance Advisor. Before you spend time on listings, let's decide whether anything should change at all. Sometimes doing nothing is right. What's changing?",
  starters: [
    { label: "Relocation", text: "We're relocating.", path: "/situations/executive-relocation-nyc" },
    { label: "Growing family", text: "Our family is growing.", path: "/situations/new-baby-growing-family-nyc" },
    { label: "First home", text: "I'm buying my first home.", path: "/situations/first-home-buyers-nyc" },
    { label: "Just exploring", text: "I'm just exploring.", path: "/buyer-advisory" },
  ],
  pageHelper: "I'm with you on this page. Tell me what you're trying to decide and I'll point you to the next useful move.",
};

const byPath: Record<string, Partial<PageEngagement>> = {
  "/": {
    headline: "Start with the decision, not the listings",
    nudge: "Most visitors start here unsure. I can help you decide whether to move, wait, or stay put.",
    greeting:
      "Hi, I'm Raphi. I'll stay with you across the site. Before you browse buildings, tell me what's changing - relocation, space, family, investment, or just exploring.",
    pageHelper: "You're on the homepage. If you tell me the life change, I'll open the right brief.",
    starters: [
      { label: "Relocating", text: "We're relocating to Manhattan.", path: "/situations/executive-relocation-nyc" },
      { label: "Buy or wait?", text: "Should I buy now or wait?", path: "/buyer-advisory" },
      { label: "International", text: "I'm buying from abroad.", path: "/international" },
      { label: "Just exploring", text: "I'm just exploring for now." },
    ],
  },
  "/buyer-advisory": {
    headline: "Buyer decisions before tours",
    nudge: "Want a clear buy / wait / rent path before you look at apartments?",
    greeting:
      "You're in Buyer Advisory. I help decide buy, wait, rent, or stay - then which neighborhoods and building types fit. What's driving the search?",
    pageHelper: "On Buyer Advisory I'll keep you focused on fit, not inventory. What's the main pressure - timing, budget, or lifestyle?",
    starters: [
      { label: "Buy now?", text: "Should I buy now or wait?" },
      { label: "First purchase", text: "This would be my first home in NYC." },
      { label: "Upgrade", text: "We're considering an upgrade." },
      { label: "Budget unclear", text: "I'm not sure what budget makes sense." },
    ],
  },
  "/situations": {
    headline: "Which life change fits?",
    nudge: "Pick a situation and I'll help you choose the right advisory path.",
    greeting: "You're looking at services. Tell me the life change and I'll recommend which brief matters first.",
    pageHelper: "Services covers many situations. Name yours and I'll narrow it.",
  },
  "/situations/executive-relocation-nyc": {
    headline: "Relocation timing & fit",
    prompts: ["Start date is...", "Office is near...", "Family is relocating with me...", "Rent first or buy?"],
    nudge: "Relocating? I can help you decide rent-first vs buy, and which neighborhoods match your commute.",
    greeting:
      "Executive relocation is where timing and commute decide almost everything. When do you need to be settled, and where will you work?",
    pageHelper: "On the relocation brief - share start date and office area and I'll recommend rent vs buy next.",
    starters: [
      { label: "Start soon", text: "I need to be settled within 60-90 days." },
      { label: "Rent first?", text: "Should I rent first or buy on arrival?" },
      { label: "Family move", text: "We're relocating with kids." },
      { label: "Solo / pied-à-terre", text: "I need a weekday pied-à-terre." },
    ],
  },
  "/situations/corporate-relocation-buyers-nyc": {
    headline: "Company move - start here",
    nudge: "For the main relocation path, use Executive Relocation. I can still map timeline and rent vs buy here.",
    greeting:
      "Company moves still start with operating rhythm. For the fuller brief, open Executive Relocation - or tell me your start window and whether rent or buy is on the table.",
    starters: [
      { label: "Executive path", text: "Show me the executive relocation brief.", path: "/situations/executive-relocation-nyc" },
      { label: "Rent vs buy", text: "Should I rent first or buy after relocating?", path: "/situations/rent-vs-buy-manhattan-relocation" },
      { label: "Start window", text: "My report date is..." },
      { label: "Family move", text: "We're relocating with kids." },
    ],
  },
  "/situations/foreign-buyers-new-york": {
    headline: "International buyer path",
    nudge: "Buying from abroad? I can walk banking, building rules, and remote ownership risks.",
    greeting:
      "International purchases fail on process more than taste. Where are you buying from, and is this primary, pied-à-terre, or investment?",
    starters: [
      { label: "Pied-à-terre", text: "I want a pied-à-terre in Manhattan." },
      { label: "Investment", text: "This is an investment purchase." },
      { label: "Primary home", text: "We're moving to New York full-time." },
      { label: "Country guide", text: "Show me guidance for my country.", path: "/international" },
    ],
  },
  "/situations/rent-vs-buy-manhattan-relocation": {
    headline: "Rent vs buy - honestly",
    nudge: "I can tell you when renting is smarter than buying for your timeline.",
    greeting: "Rent vs buy in Manhattan is mostly a timeline and liquidity decision. How long do you expect to stay?",
  },
  "/situations/school-district-planning-nyc": {
    headline: "Schools, space, commute",
    nudge: "Family move? Let's align schools, bedrooms, and commute before you tour.",
    greeting: "School planning is really a three-way trade-off: schools, space, and commute. Which would disappoint you most if it went wrong?",
  },
  "/situations/condo-vs-coop": {
    headline: "Condo vs co-op, plainly",
    nudge: "I can help you choose structure before you fall for a listing.",
    greeting:
      "Condo vs co-op is really about what you own, who can say no, and how you leave. Are you comparing a specific building, or still choosing the form?",
    pageHelper: "You're in the Condo vs Co-op brief. Tell me how you'll use the home and I'll pressure-test structure.",
    starters: [
      { label: "Foreign buyer", text: "I'm buying from overseas.", path: "/situations/condo-vs-coop-foreign-buyers-nyc" },
      { label: "Pied-à-terre", text: "It would be a part-time New York base.", path: "/situations/pied-a-terre-buyers-nyc" },
      { label: "Terms", text: "I keep seeing words like condop and board package.", path: "/situations/coop-condo-condop-terms" },
      { label: "Ownership guide", text: "Show me how ownership works more broadly.", path: "/guides/real-estate-ownership" },
    ],
  },
  "/situations/coop-condo-condop-terms": {
    headline: "The words listings use",
    nudge: "I can tell you which terms belong to a co-op, a condo, or a condop portion.",
    greeting:
      "Listings mix co-op, condo, and condop language. Which word is confusing you — board package, maintenance, offering plan, or condop?",
    pageHelper: "You're in the terms brief. Name a listing phrase and I'll map it to the structure it actually belongs to.",
    starters: [
      { label: "Condo vs co-op", text: "Start with the ownership difference.", path: "/situations/condo-vs-coop" },
      { label: "What is a condop?", text: "What does condop actually mean in New York?" },
      { label: "Maintenance", text: "Why is co-op maintenance different from condo common charges?" },
    ],
  },
  "/situations/pied-a-terre-buyers-nyc": {
    headline: "Pied-à-terre rules & fit",
    nudge: "Pied-à-terre purchases live or die on building rules. Want me to pressure-test yours?",
  },
  "/situations/1031-exchange-new-york": {
    headline: "1031 timing pressure",
    nudge: "Exchange clocks are unforgiving. Share your deadline and I'll prioritize the next move.",
  },
  "/building-reports": {
    headline: "Building intelligence first",
    nudge: "Looking at buildings? Tell me what you're optimizing for and I'll steer you to the right report type.",
    greeting:
      "Building Intelligence is for deciding fit and risk before emotional tours. Are you comparing neighborhoods, a shortlist of buildings, or ownership type?",
    pageHelper: "You're in Building Intelligence. Tell me condo vs co-op preference or a neighborhood and I'll narrow what to read.",
    starters: [
      { label: "Neighborhoods", text: "Help me choose a neighborhood.", path: "/building-reports/neighborhood-guides" },
      { label: "One building", text: "I want to pressure-test a specific building." },
      { label: "Condo vs co-op", text: "Should I focus on condos or co-ops?" },
      { label: "Resale risk", text: "I'm worried about resale and assessments." },
    ],
  },
  "/building-reports/neighborhood-guides": {
    headline: "Neighborhood fit",
    nudge: "Neighborhoods are lifestyle decisions. Tell me commute and household and I'll narrow the map.",
    greeting: "Neighborhood briefs work best with commute and household context. Where do you need to be during the week?",
  },
  "/building-reports/individual-buildings": {
    headline: "Pressure-test a building",
    nudge: "Have a building in mind? Tell me the name and what you're worried about.",
  },
  "/building-reports/market-briefs": {
    headline: "Market context, not noise",
    nudge: "Market briefs are useful after you know your decision. What's the decision you're trying to make?",
  },
  "/international": {
    headline: "Choose your country guide",
    prompts: ["I'm buying from...", "I need Mandarin guidance...", "Pied-à-terre from abroad...", "Remote ownership concerns..."],
    nudge: "Pick your country - or tell me where you're buying from and I'll open the right guide.",
    greeting:
      "I'm Raphi. For international buyers I stay with you in your language. Which country are you buying from, and is this primary home, pied-à-terre, or investment?",
    pageHelper: "You're on the International Hub. Name your country and I'll take you to the localized guide.",
    starters: [
      { label: "China", text: "I'm buying from China.", path: "/international/china" },
      { label: "Germany", text: "I'm buying from Germany.", path: "/international/germany" },
      { label: "Japan", text: "I'm buying from Japan.", path: "/international/japan" },
      { label: "Other country", text: "I'm buying from another country." },
    ],
  },
  "/belonging": {
    headline: "Belonging Assessment",
    nudge: "The assessment helps clarify fit. Want me to interpret what your answers mean for next steps?",
    greeting: "Belonging is about whether Manhattan - and which part - will actually work for your life. What's prompting the assessment?",
  },
  "/advisory": {
    headline: "Advisory, not inventory",
    nudge: "I can help you decide if a Housing Strategy Session is the right next step.",
    greeting: "Residential advisory here is for judgment, not a listing tour. What decision are you stuck on?",
  },
  "/contact": {
    headline: "Ready for a human review?",
    nudge: "If you want Raphael to review your situation, I can prepare a clean brief first.",
    greeting:
      "Before you book time, I can capture the decision so the call is useful. What's the one question you want answered?",
    pageHelper: "On Contact - if you share the core question, I'll shape a short brief for the team.",
  },
  "/insights": {
    headline: "Read, then decide",
    nudge: "Insights are useful when tied to your situation. Tell me what you're deciding and I'll point to the right piece.",
    greeting: "Perspectives are sharper when applied to your case. Are you deciding buy/wait, relocation, or building risk?",
  },
  "/about": {
    headline: "How we advise",
    nudge: "Curious how we work? I can explain the Decision Guide approach in plain terms.",
  },
  "/account": {
    headline: "Resume your decision",
    nudge: "I can pick up where you left off - what should we refine next?",
  },
  "/hub": {
    headline: "Your Decision Hub",
    nudge: "Want help interpreting your roadmap or briefs?",
  },
};

function normalizePath(path: string): string {
  const bare = path.split("?")[0].split("#")[0] || "/";
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare;
}

function mergeEngagement(partial?: Partial<PageEngagement>): PageEngagement {
  return {
    ...defaultEngagement,
    ...partial,
    prompts: partial?.prompts?.length ? partial.prompts : defaultEngagement.prompts,
    starters: partial?.starters?.length ? partial.starters : defaultEngagement.starters,
  };
}

/** Resolve engagement for any site path, including dynamic international country pages. */
export function getPageEngagement(path: string): PageEngagement {
  const normalized = normalizePath(path);

  if (byPath[normalized]) {
    return mergeEngagement(byPath[normalized]);
  }

  if (normalized.startsWith("/international/")) {
    const country = normalized.replace("/international/", "").replace(/-/g, " ");
    const label = country.replace(/\b\w/g, (c) => c.toUpperCase());
    return mergeEngagement({
      headline: `${label} buyer decisions`,
      nudge: `Questions about buying from ${label}? Ask me in your language - banking, buildings, or timeline.`,
      greeting: `You're on the ${label} buyer guide. I'm Raphi - ask in your language about process, buildings, or whether buying makes sense for you.`,
      pageHelper: `On the ${label} guide. Tell me primary home, pied-à-terre, or investment and I'll focus the next step.`,
      prompts: [
        "Is condo or co-op better for me?",
        "How does financing work from abroad?",
        "I need a pied-à-terre...",
        "What should I decide before touring?",
      ],
      starters: [
        { label: "Process", text: "Walk me through the buying process from abroad." },
        { label: "Pied-à-terre", text: "I want a pied-à-terre." },
        { label: "Investment", text: "This is an investment purchase." },
        { label: "Strategy call", text: "I want a strategy conversation with a specialist." },
      ],
    });
  }

  if (normalized.startsWith("/situations/")) {
    return mergeEngagement({
      headline: "Decide the path for this situation",
      nudge: "I can help you apply this brief to your actual timeline and constraints.",
      greeting: "You're on a situation brief. Tell me what changed and I'll apply this page to your decision.",
      pageHelper: "I'm reading this brief with you. What's the constraint that worries you most?",
    });
  }

  if (normalized.startsWith("/building-reports/")) {
    return mergeEngagement({
      headline: "Building fit & risk",
      nudge: "Have a concern about this building or area? Ask me before you fall for the lobby.",
      greeting: "Building reports are for pressure-testing fit. What are you trying to confirm or rule out?",
      pageHelper: "Looking at a building report - tell me what would make you walk away.",
    });
  }

  if (normalized.startsWith("/insights/")) {
    return mergeEngagement({
      headline: "Apply this insight to your case",
      nudge: "Want me to translate this article into a decision for your situation?",
      greeting: "Insights matter when applied. Tell me your situation and I'll connect this piece to a next move.",
      pageHelper: "Reading an insight - should I help you decide what it means for buy, wait, or relocate?",
    });
  }

  if (normalized.startsWith("/hub")) {
    return mergeEngagement(byPath["/hub"]);
  }

  return mergeEngagement();
}

export function isColdConversation(messages: { role: string; text: string }[]): boolean {
  const userCount = messages.filter((m) => m.role === "user").length;
  return userCount === 0;
}
