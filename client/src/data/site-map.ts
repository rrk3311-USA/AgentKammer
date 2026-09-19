import { primaryNav } from "@/components/site-shell";
import { publicGuides } from "@/data/guides";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { FOOTER_SITEMAP_QUIET, PUBLIC_PRODUCTS } from "@/data/public-menu";

export type SiteMapItem = {
  label: string;
  href: string;
};

export type SiteMapGroup = {
  title: string;
  description: string;
  items: readonly SiteMapItem[];
};

/** Charcoal-bar tail: Terms, Contact, then one Sitemap. Licenses stays off this bar. */
export const FOOTER_DARK_TAIL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/sitemap" },
] as const;

/** Dark-grey footer utilities. Licenses stay off this list. */
export const FOOTER_DARK_LINKS = [
  { label: PUBLIC_PRODUCTS.situation.label, href: PUBLIC_PRODUCTS.situation.href },
  { label: PUBLIC_PRODUCTS.property.label, href: PUBLIC_PRODUCTS.property.href },
  { label: PUBLIC_PRODUCTS.strategy.label, href: PUBLIC_PRODUCTS.strategy.href },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Decision Hub", href: "/account" },
  { label: "Privacy", href: "/privacy" },
  { label: "Guides", href: "/guides" },
  ...FOOTER_DARK_TAIL_LINKS,
] as const;

export const SITE_MAP_LEGAL: SiteMapItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Licenses", href: "/licenses" },
];

function groupItems(title: string): SiteMapItem[] {
  return decisionNavigationGroups.find((group) => group.title === title)?.items ?? [];
}

export function getSiteMapGroups(): SiteMapGroup[] {
  return [
    {
      title: "Primary",
      description: "The six locked doors in the header. Start Here is the judgment path, not a listing feed.",
      items: primaryNav,
    },
    {
      title: "Practice doors",
      description: "Quiet ways in. Guidance is the chat. The rest stay off the six-item header.",
      items: [
        { label: PUBLIC_PRODUCTS.guidance.label, href: PUBLIC_PRODUCTS.guidance.href },
        ...FOOTER_SITEMAP_QUIET,
      ],
    },
    {
      title: "Advisory",
      description: "Name the situation, then choose the next hour of judgment.",
      items: [
        { label: PUBLIC_PRODUCTS.situation.label, href: PUBLIC_PRODUCTS.situation.href },
        { label: PUBLIC_PRODUCTS.property.label, href: PUBLIC_PRODUCTS.property.href },
        { label: PUBLIC_PRODUCTS.livability.label, href: PUBLIC_PRODUCTS.livability.href },
        { label: PUBLIC_PRODUCTS.strategy.label, href: PUBLIC_PRODUCTS.strategy.href },
        { label: "Intelligence", href: "/intelligence" },
        { label: "Decision Hub", href: "/account" },
        { label: "International", href: "/international" },
        { label: "Insights", href: "/insights" },
      ],
    },
    {
      title: "What's Changing?",
      description: "Life change first. Listings later.",
      items: groupItems("What's Changing?"),
    },
    {
      title: "What Are You Trying to Understand?",
      description: "Structure and evidence after the decision is named.",
      items: groupItems("What Are You Trying to Understand?"),
    },
    {
      title: "Neighborhoods",
      description: "Geography as a diagnostic, not a buildings hero.",
      items: groupItems("NYC Neighborhoods"),
    },
    {
      title: "Building library",
      description: "A side tool after the life question is clear. Not the public pitch.",
      items: [
        { label: "Overview", href: "/building-reports" },
        { label: "Building Profiles", href: "/building-reports/individual-buildings" },
        { label: "Neighborhood Guides", href: "/building-reports/neighborhood-guides" },
        { label: "Market Briefs", href: "/building-reports/market-briefs" },
      ],
    },
    {
      title: "Guides",
      description: "Educational frameworks before anyone looks at a listing.",
      items: publicGuides.map((guide) => ({ label: guide.title, href: guide.href })),
    },
    {
      title: "Legal",
      description: "Credentials live here, not as a footer merchandising link.",
      items: SITE_MAP_LEGAL,
    },
  ];
}
