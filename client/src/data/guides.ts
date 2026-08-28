export type GuideAudience = "public" | "practice";

export type GuideEntry = {
  title: string;
  description: string;
  href: string;
  audience: GuideAudience;
  kind: "page" | "html";
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
  },
  {
    title: "Condo vs Co-op",
    description:
      "Decision Brief — what you own, what you pay, and what to check in the building before an offer.",
    href: "/situations/condo-vs-coop",
    audience: "public",
    kind: "page",
  },
  {
    title: "Co-op, Condo & Condop Terms",
    description:
      "Decision Brief — where board packages, maintenance, bylaws, and offering plans actually apply.",
    href: "/situations/coop-condo-condop-terms",
    audience: "public",
    kind: "page",
  },
  {
    title: "How Real Estate Deeds Work",
    description:
      "Deed types, essential parts, delivery & recording, and New York transfer nuances.",
    href: "/guides/real-estate-deeds",
    audience: "public",
    kind: "page",
  },
  {
    title: "How Mortgages Work",
    description:
      "Mortgage family tree - 15 types in five groups, with links to fixed, ARM, and clauses.",
    href: "/guides/how-mortgages-work",
    audience: "public",
    kind: "page",
  },
  {
    title: "Fixed-Rate Mortgage",
    description:
      "Same rate, same P&I - terms, amortization, pros & cons, and when fixed wins.",
    href: "/guides/fixed-rate-mortgage",
    audience: "public",
    kind: "page",
  },
  {
    title: "ARM & Fixed vs ARM",
    description:
      "How ARMs adjust, caps, common 5/1 structures, and a Fixed vs ARM decision guide.",
    href: "/guides/adjustable-rate-mortgage",
    audience: "public",
    kind: "page",
  },
  {
    title: "Mortgage Clauses & Key Terms",
    description:
      "Acceleration, due-on-sale, defeasance, prepayment penalty, plus a quick glossary.",
    href: "/guides/mortgage-clauses",
    audience: "public",
    kind: "page",
  },
  {
    title: "Manhattan Explained",
    description:
      "Neighborhood name origins - Dutch roots, forts, people & institutions, and street-map portmanteaus.",
    href: "/guides/manhattan-explained",
    audience: "public",
    kind: "page",
  },
  {
    title: "Liens, Easements & Related Concepts",
    description:
      "Voluntary vs involuntary liens, easement types, easement vs license, lis pendens, and encumbrances.",
    href: "/guides/liens-easements",
    audience: "public",
    kind: "page",
  },
  {
    title: "International Buyer Hub Guide",
    description:
      "How the multilingual Manhattan buyer funnel is structured for decision-first inbound.",
    href: "/guides/international-buyer-hub.html",
    audience: "public",
    kind: "html",
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
  },
  {
    title: "Advisor OS Onboarding",
    description: "Systems and workflow orientation for Advisor OS.",
    href: "/guides/advisor-os-onboarding.html",
    audience: "practice",
    kind: "html",
  },
  {
    title: "Real Estate Marketing Funnel",
    description:
      "From awareness to advocacy - the relationship-driven journey behind Agent Kammer.",
    href: "/admin/real-estate-marketing-funnel.html",
    audience: "practice",
    kind: "html",
  },
  {
    title: "NY Real Estate Exam Hierarchy Map",
    description:
      "Eleven-branch study map with decision trees for agency, liens, deeds, and ownership.",
    href: "/admin/ny-real-estate-exam-hierarchy.html",
    audience: "practice",
    kind: "html",
  },
  {
    title: "Pass the NY Salesperson Exam",
    description:
      "Full internal study book - 10 volumes, 70 practice questions, 21-day plan, and trap dictionary.",
    href: "/admin/ny-salesperson-exam-pass.html",
    audience: "practice",
    kind: "html",
  },
];

export const allGuides = [...publicGuides, ...practiceGuides];
