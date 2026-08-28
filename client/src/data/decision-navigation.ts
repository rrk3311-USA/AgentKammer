export type DecisionNavItem = {
  label: string;
  href: string;
};

export type DecisionNavGroup = {
  title: string;
  description: string;
  items: DecisionNavItem[];
};

const whatsChangingItems: DecisionNavItem[] = [
  { label: "Executive Relocation", href: "/situations/executive-relocation-nyc" },
  { label: "First Home", href: "/situations/first-home-buyers-nyc" },
  { label: "Growing Family", href: "/situations/new-baby-growing-family-nyc" },
  { label: "Marriage", href: "/situations/marriage-housing-nyc" },
  { label: "Divorce", href: "/situations/divorce-property-sales-nyc" },
  { label: "Empty Nest", href: "/situations/empty-nester-downsizing-nyc" },
  { label: "Aging Parents", href: "/situations/aging-parents-housing-nyc" },
  { label: "Inheritance", href: "/situations/inheritance-housing-nyc" },
  { label: "Retirement", href: "/situations/retiree-senior-home-buyers-nyc" },
  { label: "Remote Work", href: "/situations/remote-work-housing-nyc" },
  { label: "Job Change", href: "/situations/job-loss-housing-nyc" },
  { label: "International Move", href: "/international" },
];

const understandItems: DecisionNavItem[] = [
  { label: "Rent vs Buy", href: "/situations/rent-vs-buy-manhattan-relocation" },
  { label: "School Districts", href: "/situations/school-district-planning-nyc" },
  { label: "Condo vs Co-op", href: "/situations/condo-vs-coop" },
  { label: "Co-op · Condo terms", href: "/situations/coop-condo-condop-terms" },
  { label: "New Development", href: "/situations/new-development-nyc" },
  { label: "Pied-à-Terre", href: "/situations/pied-a-terre-buyers-nyc" },
  { label: "Foreign Buyers", href: "/situations/foreign-buyers-new-york" },
  { label: "Investment / 1031", href: "/situations/1031-exchange-new-york" },
  { label: "Building Profiles", href: "/building-reports" },
];

/** Primary OS surface groups - used on /situations and Research Library search. */
export const decisionNavigationGroups: DecisionNavGroup[] = [
  {
    title: "What's Changing?",
    description: "The trigger comes first. These life changes make people question home before they look at listings.",
    items: whatsChangingItems,
  },
  {
    title: "What Decision Are You Facing?",
    description: "The visible path only comes after the diagnosis. Name the decision once the situation is clear.",
    items: [
      { label: "Buy", href: "/buyer-advisory" },
      { label: "Sell", href: "/contact" },
      { label: "Rent", href: "/buyer-advisory" },
      { label: "Renew Lease", href: "/buyer-advisory" },
      { label: "Stay Put", href: "/buyer-advisory" },
      { label: "Wait", href: "/buyer-advisory" },
      { label: "Renovate", href: "/buyer-advisory" },
      { label: "Refinance", href: "/buyer-advisory" },
      { label: "Sell or Keep", href: "/buyer-advisory" },
    ],
  },
  {
    title: "What Are You Trying to Understand?",
    description: "Evidence and structure once the life change and decision path are named - buildings, ownership types, and research.",
    items: understandItems,
  },
  {
    title: "Life Changes",
    description: "Alias of What's Changing? - kept for older links and library search synonyms.",
    items: whatsChangingItems,
  },
  {
    title: "NYC Neighborhoods",
    description: "Manhattan geography should narrow before listings expand.",
    items: [
      { label: "Upper West Side", href: "/situations/upper-west-side-buyers-nyc" },
      { label: "Upper East Side", href: "/situations/upper-east-side-buyers-nyc" },
      { label: "Tribeca", href: "/situations/tribeca-buyers-nyc" },
      { label: "Chelsea", href: "/situations/chelsea-buyers-nyc" },
      { label: "Hudson Yards", href: "/situations/hudson-yards-buyers-nyc" },
      { label: "Financial District", href: "/situations/financial-district-buyers-nyc" },
      { label: "All Neighborhood Guides", href: "/building-reports/neighborhood-guides" },
    ],
  },
  {
    title: "Building Intelligence Library",
    description: "A knowledge resource - buildings, neighborhoods, and market evidence after the decision model is clear.",
    items: [
      { label: "Buildings", href: "/building-reports" },
      { label: "Neighborhoods", href: "/building-reports/neighborhood-guides" },
      { label: "Building Reports", href: "/building-reports/individual-buildings" },
      { label: "Market Briefs", href: "/building-reports/market-briefs" },
      { label: "Life Changes", href: "/situations" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "About",
    description: "Agent Kammer is positioned as a decision guide first. The transaction is the outcome of sound judgment.",
    items: [
      { label: "Philosophy", href: "/about" },
      { label: "Process", href: "/about" },
      { label: "Residential Advisory", href: "/advisory" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
