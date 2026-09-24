export type GuideAudience = "public" | "practice";

export type GuideEntry = {
  title: string;
  description: string;
  href: string;
  audience: GuideAudience;
  kind: "page" | "html";
  category: string;
  tags: string[];
};

/** Public educational guides - React pages and portable HTML artifacts. */
export const publicGuides: GuideEntry[] = [
  {
    title: "How Real Estate Ownership Works",
    description:
      "Entities, estates, NYC condo/co-op/house, title holding, and how ownership rights fit together.",
    href: "/guides/real-estate-ownership",
    audience: "public",
    kind: "page",
    category: "Ownership",
    tags: ["ownership", "entities", "estates", "title", "condo", "co-op", "house", "nyc"],
  },
  {
    title: "Condo vs Co-op",
    description:
      "What you own, what you pay, and what to check in the building before an offer.",
    href: "/situations/condo-vs-coop",
    audience: "public",
    kind: "page",
    category: "Building types",
    tags: ["condo", "co-op", "coop", "board", "common charges", "maintenance", "offer"],
  },
  {
    title: "Co-op, Condo & Condop Terms",
    description:
      "Where board packages, maintenance, bylaws, and offering plans actually apply.",
    href: "/situations/coop-condo-condop-terms",
    audience: "public",
    kind: "page",
    category: "Building types",
    tags: ["co-op", "coop", "condo", "condop", "board package", "bylaws", "offering plan", "maintenance"],
  },
  {
    title: "How Real Estate Deeds Work",
    description:
      "Deed types, essential parts, delivery & recording, and New York transfer nuances.",
    href: "/guides/real-estate-deeds",
    audience: "public",
    kind: "page",
    category: "Deeds",
    tags: ["deed", "title", "recording", "transfer", "new york", "warranty", "quitclaim"],
  },
  {
    title: "How Mortgages Work",
    description:
      "Mortgage family tree. 15 types in five groups, with links to fixed, ARM, and clauses.",
    href: "/guides/how-mortgages-work",
    audience: "public",
    kind: "page",
    category: "Mortgages",
    tags: ["mortgage", "loan", "fixed", "arm", "clauses", "financing"],
  },
  {
    title: "Fixed-Rate Mortgage",
    description:
      "Same rate, same P&I. Terms, amortization, pros & cons, and when fixed wins.",
    href: "/guides/fixed-rate-mortgage",
    audience: "public",
    kind: "page",
    category: "Mortgages",
    tags: ["mortgage", "fixed-rate", "amortization", "p&i", "rate"],
  },
  {
    title: "ARM & Fixed vs ARM",
    description:
      "How ARMs adjust, caps, common 5/1 structures, and a Fixed vs ARM decision guide.",
    href: "/guides/adjustable-rate-mortgage",
    audience: "public",
    kind: "page",
    category: "Mortgages",
    tags: ["arm", "adjustable", "caps", "5/1", "fixed vs arm", "mortgage"],
  },
  {
    title: "Mortgage Clauses & Key Terms",
    description:
      "Acceleration, due-on-sale, defeasance, prepayment penalty, plus a quick glossary.",
    href: "/guides/mortgage-clauses",
    audience: "public",
    kind: "page",
    category: "Mortgages",
    tags: ["acceleration", "due-on-sale", "defeasance", "prepayment", "glossary", "clauses"],
  },
  {
    title: "Manhattan Explained",
    description:
      "Neighborhood name origins. Dutch roots, forts, people & institutions, and street-map portmanteaus.",
    href: "/guides/manhattan-explained",
    audience: "public",
    kind: "page",
    category: "Neighborhoods",
    tags: ["manhattan", "neighborhoods", "nyc", "streets", "dutch", "history"],
  },
  {
    title: "Liens, Easements & Related Concepts",
    description:
      "Voluntary vs involuntary liens, easement types, easement vs license, lis pendens, and encumbrances.",
    href: "/guides/liens-easements",
    audience: "public",
    kind: "page",
    category: "Encumbrances",
    tags: ["lien", "easement", "license", "lis pendens", "encumbrance"],
  },
  {
    title: "How to buy in NYC",
    description:
      "Twelve attorney-driven steps, condo vs co-op costs, tracks & boosters (cash, sponsor incentives, 1031, assumption).",
    href: "/guides/how-to-buy-in-nyc.html",
    audience: "public",
    kind: "html",
    category: "Buying in New York",
    tags: [
      "nyc",
      "buy",
      "closing costs",
      "co-op",
      "coop",
      "condo",
      "attorney",
      "1031",
      "sponsor",
      "assumption",
      "cash",
    ],
  },
  {
    title: "How wealth is held",
    description:
      "Holding companies, family offices, trusts, and LLCs, and where Manhattan property fits in the stack.",
    href: "/guides/how-wealth-is-held.html",
    audience: "public",
    kind: "html",
    category: "Wealth",
    tags: [
      "wealth",
      "trust",
      "llc",
      "family office",
      "holding company",
      "title",
      "manhattan",
      "entities",
    ],
  },
  {
    title: "International Buyer Hub Guide",
    description:
      "How the multilingual Manhattan buyer funnel is structured for decision-first inbound.",
    href: "/guides/international-buyer-hub.html",
    audience: "public",
    kind: "html",
    category: "International buyers",
    tags: ["international", "buyer", "manhattan", "multilingual", "inbound", "funnel"],
  },
];

/** Internal practice docs - admin Settings; not listed on public /guides. */
export const practiceGuides: GuideEntry[] = [
  {
    title: "Advisor Practice Guide",
    description: "Operating model for the residential advisory practice.",
    href: "/guides/advisor-practice-guide.html",
    audience: "practice",
    kind: "html",
    category: "Practice",
    tags: ["advisor", "practice", "operating model"],
  },
  {
    title: "Advisor OS Onboarding",
    description: "Systems and workflow orientation for Advisor OS.",
    href: "/guides/advisor-os-onboarding.html",
    audience: "practice",
    kind: "html",
    category: "Practice",
    tags: ["advisor os", "onboarding", "workflow"],
  },
  {
    title: "Real Estate Marketing Funnel",
    description:
      "From awareness to advocacy. The relationship-driven journey behind Agent Kammer.",
    href: "/admin/real-estate-marketing-funnel.html",
    audience: "practice",
    kind: "html",
    category: "Practice",
    tags: ["marketing", "funnel", "advocacy"],
  },
  {
    title: "NY Real Estate Exam Hierarchy Map",
    description:
      "Eleven-branch study map with decision trees for agency, liens, deeds, and ownership.",
    href: "/admin/ny-real-estate-exam-hierarchy.html",
    audience: "practice",
    kind: "html",
    category: "Exam",
    tags: ["exam", "agency", "liens", "deeds", "ownership"],
  },
  {
    title: "Pass the NY Salesperson Exam",
    description:
      "Full internal study book. 10 volumes, 70 practice questions, 21-day plan, and trap dictionary.",
    href: "/admin/ny-salesperson-exam-pass.html",
    audience: "practice",
    kind: "html",
    category: "Exam",
    tags: ["exam", "salesperson", "practice questions"],
  },
];

export const allGuides = [...publicGuides, ...practiceGuides];
