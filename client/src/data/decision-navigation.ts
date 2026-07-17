export type DecisionNavItem = {
  label: string;
  href: string;
};

export type DecisionNavGroup = {
  title: string;
  description: string;
  items: DecisionNavItem[];
};

/** Primary OS surface groups — used on /services and Research Library search. */
export const decisionNavigationGroups: DecisionNavGroup[] = [
  {
    title: "What's Changing?",
    description: "The trigger comes first. These life changes make people question home before they look at listings.",
    items: [
      { label: "Executive Relocation", href: "/services/executive-relocation-nyc" },
      { label: "Corporate Relocation", href: "/services/corporate-relocation-buyers-nyc" },
      { label: "International Move", href: "/services/foreign-buyers-new-york" },
      { label: "First Home", href: "/services/first-home-buyers-nyc" },
      { label: "Growing Family", href: "/services/new-baby-growing-family-nyc" },
      { label: "Empty Nest", href: "/services/empty-nester-downsizing-nyc" },
      { label: "Retirement", href: "/services/retiree-senior-home-buyers-nyc" },
      { label: "Divorce", href: "/services/divorce-property-sales-nyc" },
      { label: "Inheritance", href: "/services/inheritance-housing-nyc" },
      { label: "Remote Work", href: "/services/remote-work-housing-nyc" },
    ],
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
    description: "Evidence and structure once the life change and decision path are named — buildings, ownership types, and research.",
    items: [
      { label: "Condo vs Co-op", href: "/services/condo-vs-coop-foreign-buyers-nyc" },
      { label: "New Development", href: "/services/new-development-nyc" },
      { label: "Pied-à-Terre", href: "/services/pied-a-terre-buyers-nyc" },
      { label: "Foreign Buyers", href: "/services/foreign-buyers-new-york" },
      { label: "Building Reports", href: "/building-reports" },
      { label: "Luxury Buildings", href: "/insights/the-quiet-luxury-buildings-of-manhattan" },
      { label: "Investment", href: "/services/1031-exchange-new-york" },
      { label: "School Districts", href: "/services/school-district-planning-nyc" },
    ],
  },
  {
    title: "Life Changes",
    description: "Alias of What's Changing? — kept for older links and library search synonyms.",
    items: [
      { label: "Executive Relocation", href: "/services/executive-relocation-nyc" },
      { label: "Corporate Relocation", href: "/services/corporate-relocation-buyers-nyc" },
      { label: "International Move", href: "/services/foreign-buyers-new-york" },
      { label: "First Home", href: "/services/first-home-buyers-nyc" },
      { label: "Marriage", href: "/services/marriage-housing-nyc" },
      { label: "Growing Family", href: "/services/new-baby-growing-family-nyc" },
      { label: "Empty Nest", href: "/services/empty-nester-downsizing-nyc" },
      { label: "Retirement", href: "/services/retiree-senior-home-buyers-nyc" },
      { label: "Aging Parents", href: "/services/aging-parents-housing-nyc" },
      { label: "Divorce", href: "/services/divorce-property-sales-nyc" },
      { label: "Job Loss", href: "/services/job-loss-housing-nyc" },
      { label: "Remote Work", href: "/services/remote-work-housing-nyc" },
      { label: "Estate Planning", href: "/services/probate-estate-sales-nyc" },
      { label: "Inheritance", href: "/services/inheritance-housing-nyc" },
      { label: "Downsizing", href: "/services/empty-nester-downsizing-nyc" },
      { label: "Second Home", href: "/services/pied-a-terre-buyers-nyc" },
    ],
  },
  {
    title: "NYC Neighborhoods",
    description: "Manhattan geography should narrow before listings expand.",
    items: [
      { label: "Upper West Side", href: "/services/upper-west-side-buyers-nyc" },
      { label: "Upper East Side", href: "/services/upper-east-side-buyers-nyc" },
      { label: "Tribeca", href: "/services/tribeca-buyers-nyc" },
      { label: "Chelsea", href: "/services/chelsea-buyers-nyc" },
      { label: "Hudson Yards", href: "/services/hudson-yards-buyers-nyc" },
      { label: "Financial District", href: "/services/financial-district-buyers-nyc" },
      { label: "All Neighborhood Guides", href: "/building-reports/neighborhood-guides" },
    ],
  },
  {
    title: "Building Intelligence Library",
    description: "A knowledge resource — buildings, neighborhoods, and market evidence after the decision model is clear.",
    items: [
      { label: "Buildings", href: "/building-reports" },
      { label: "Neighborhoods", href: "/building-reports/neighborhood-guides" },
      { label: "Building Reports", href: "/building-reports/individual-buildings" },
      { label: "Market Briefs", href: "/building-reports/market-briefs" },
      { label: "Life Changes", href: "/services" },
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
