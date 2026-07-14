export type DecisionNavItem = {
  label: string;
  href: string;
};

export type DecisionNavGroup = {
  title: string;
  description: string;
  items: DecisionNavItem[];
};

export const decisionNavigationGroups: DecisionNavGroup[] = [
  {
    title: "Start Here",
    description: "Begin with uncertainty, not inventory. These entry points are for people who know something changed but do not yet know whether anything should happen.",
    items: [
      { label: "What's Changing?", href: "/buyer-advisory" },
      { label: "Should Anything Change?", href: "/buyer-advisory" },
      { label: "Decision Framework", href: "/services" },
    ],
  },
  {
    title: "Decisions",
    description: "The visible outcome only comes after the diagnosis. These are the main paths once the situation becomes clear.",
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
    title: "Life Changes",
    description: "The site should diagnose the trigger first. These are the situations that make people question home in the first place.",
    items: [
      { label: "Executive Relocation", href: "/services/executive-relocation-nyc" },
      { label: "Corporate Relocation", href: "/services/corporate-relocation-buyers-nyc" },
      { label: "International Move", href: "/services/foreign-buyers-new-york" },
      { label: "First Home", href: "/buyer-advisory" },
      { label: "More Space", href: "/services/school-district-planning-nyc" },
      { label: "Upgrade", href: "/buyer-advisory" },
      { label: "Downsize", href: "/services/empty-nester-downsizing-nyc" },
      { label: "Divorce", href: "/services/divorce-property-sales-nyc" },
      { label: "Estate / Probate", href: "/services/probate-estate-sales-nyc" },
      { label: "Retirement", href: "/services/retiree-senior-home-buyers-nyc" },
    ],
  },
  {
    title: "Buyer Guides",
    description: "These explain ownership structure, building type, and buyer-specific complexity once the reason for moving is clear.",
    items: [
      { label: "Condo vs Co-op", href: "/services/condo-vs-coop-foreign-buyers-nyc" },
      { label: "New Development", href: "/services/new-development-nyc" },
      { label: "Pied-a-Terre", href: "/services/pied-a-terre-buyers-nyc" },
      { label: "Foreign Buyers", href: "/services/foreign-buyers-new-york" },
      { label: "1031 Exchange", href: "/services/1031-exchange-new-york" },
      { label: "Townhouses", href: "/services/townhouse-buyers-nyc" },
      { label: "Pet-Friendly Buildings", href: "/services/pet-friendly-moves-nyc" },
    ],
  },
  {
    title: "Seller Guides",
    description: "These are seller-side questions framed as strategy choices, not listing services.",
    items: [
      { label: "Should I Sell?", href: "/contact" },
      { label: "Sell or Wait?", href: "/buyer-advisory" },
      { label: "Sell or Keep as Rental?", href: "/buyer-advisory" },
      { label: "Downsizing", href: "/services/empty-nester-downsizing-nyc" },
      { label: "Leaving NYC", href: "/services/executive-relocation-nyc" },
      { label: "Divorce Sales", href: "/services/divorce-property-sales-nyc" },
      { label: "Probate Sales", href: "/services/probate-estate-sales-nyc" },
      { label: "Empty Nesters", href: "/services/empty-nester-downsizing-nyc" },
      { label: "New Development Trade-Up", href: "/services/new-development-nyc" },
      { label: "Pricing Strategy", href: "/building-reports/market-briefs" },
      { label: "Preparing to Sell", href: "/contact" },
    ],
  },
  {
    title: "Building Intelligence",
    description: "Only after the decision model is clear should the site move into buildings, neighborhoods, and market evidence.",
    items: [
      { label: "Buildings", href: "/building-reports" },
      { label: "Neighborhoods", href: "/building-reports/neighborhood-guides" },
      { label: "Building Reports", href: "/building-reports/individual-buildings" },
      { label: "Market Briefs", href: "/building-reports/market-briefs" },
      { label: "Decision Briefs", href: "/services" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "About",
    description: "Agent Kammer is positioned as a decision guide first. The transaction is the outcome of sound judgment.",
    items: [
      { label: "Philosophy", href: "/about" },
      { label: "Process", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
