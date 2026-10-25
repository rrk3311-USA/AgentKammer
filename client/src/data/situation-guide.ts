export type GuideRow = {
  label: string;
  href: string;
  line: string;
};

export type GuideStep = {
  num: string;
  title: string;
  lead: string;
  items: readonly GuideRow[];
};

export const SITUATION_GUIDE: readonly GuideStep[] = [
  {
    num: "01",
    title: "What's changing?",
    lead: "Name the life change first. The rooms come after.",
    items: [
      { label: "Executive Relocation", href: "/situations/executive-relocation-nyc", line: "Work moved. The home has to follow." },
      { label: "First Home", href: "/situations/first-home-buyers-nyc", line: "The first purchase, named before the search." },
      { label: "Growing Family", href: "/situations/new-baby-growing-family-nyc", line: "More people, and the rooms have to hold them." },
      { label: "Marriage", href: "/situations/marriage-housing-nyc", line: "Two lives, one address to decide." },
      { label: "Retirement", href: "/situations/retiree-senior-home-buyers-nyc", line: "The next chapter, and where it lives." },
      { label: "Empty Nest", href: "/situations/empty-nester-downsizing-nyc", line: "The house is quieter. The question is whether to stay." },
      { label: "Aging Parents", href: "/situations/aging-parents-housing-nyc", line: "Care and distance, named before the search." },
      { label: "Inheritance", href: "/situations/inheritance-housing-nyc", line: "A property arrived. The next step is not automatic." },
      { label: "Divorce", href: "/situations/divorce-property-sales-nyc", line: "One home becomes two questions." },
      { label: "Remote Work", href: "/situations/remote-work-housing-nyc", line: "The office left. The rooms did not." },
      { label: "Job Change", href: "/situations/job-loss-housing-nyc", line: "Income or title moved. Housing may follow." },
      { label: "International Move", href: "/international", line: "A new city, before the inventory." },
    ],
  },
  {
    num: "02",
    title: "What decision are you facing?",
    lead: "Once the change is named, name the path.",
    items: [
      { label: "Buy", href: "/situations#decisions", line: "You are weighing a purchase." },
      { label: "Sell", href: "/situations#decisions", line: "You are weighing a sale." },
      { label: "Rent", href: "/situations#decisions", line: "You are weighing a lease." },
      { label: "Renew Lease", href: "/situations#decisions", line: "You are weighing another year." },
      { label: "Stay Put", href: "/situations#decisions", line: "You are weighing staying." },
      { label: "Wait", href: "/situations#decisions", line: "You are weighing a pause." },
      { label: "Renovate", href: "/situations#decisions", line: "You are weighing work on this home." },
      { label: "Refinance", href: "/situations#decisions", line: "You are weighing the loan again." },
      { label: "Sell or Keep", href: "/situations#decisions", line: "You are weighing both sides." },
    ],
  },
  {
    num: "03",
    title: "What are you trying to understand?",
    lead: "Evidence once the change and the path are named.",
    items: [
      { label: "Rent vs Buy", href: "/situations/rent-vs-buy-manhattan-relocation", line: "The tenure question, in numbers." },
      { label: "School Districts", href: "/situations/school-district-planning-nyc", line: "Schools first, then the block." },
      { label: "Condo vs Co-op", href: "/situations/condo-vs-coop", line: "The ownership form, before the offer." },
      { label: "Co-op · Condo terms", href: "/situations/coop-condo-condop-terms", line: "The words the board and the bank use." },
      { label: "New Development", href: "/situations/new-development-nyc", line: "A building that is still becoming one." },
      { label: "Pied-à-Terre", href: "/situations/pied-a-terre-buyers-nyc", line: "A second place, used on your clock." },
      { label: "Foreign Buyers", href: "/situations/foreign-buyers-new-york", line: "Buying from abroad, with local rules." },
      { label: "Investment / 1031", href: "/situations/1031-exchange-new-york", line: "Capital first, then the address." },
      { label: "Building Profiles", href: "/building-reports/individual-buildings", line: "The building, read before the unit." },
    ],
  },
];
