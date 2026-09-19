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

/** Charcoal primary row. Home stays in the header; Guidance stays a floating utility. */
export const FOOTER_DARK_NAV = [
  { label: "Start Here", href: "/buyer-advisory" },
  { label: "Situations", href: "/situations" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
] as const;

/** Charcoal quiet row. Envelope sits with Contact. Sitemap is not a competing item. */
export const FOOTER_DARK_META = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
] as const;

/** Combined charcoal links for lock tests. No products, Intelligence, Decision Hub, Sitemap, or duplicate Guides. */
export const FOOTER_DARK_LINKS = [...FOOTER_DARK_NAV, ...FOOTER_DARK_META] as const;

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
      description: "The five locked doors in the header. Start Here is the judgment path, not a listing feed. Guidance is the floating utility.",
      items: primaryNav,
    },
    {
      title: "Practice doors",
      description: "Quiet ways in. Guidance is the chat. The rest stay off the five-item header.",
      items: [
        { label: PUBLIC_PRODUCTS.guidance.label, href: PUBLIC_PRODUCTS.guidance.href },
        ...FOOTER_SITEMAP_QUIET,
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Advisory",
      description: "Name the situation, then choose the next hour of judgment.",
      items: [
        { label: PUBLIC_PRODUCTS.situation.label, href: PUBLIC_PRODUCTS.situation.href },
        { label: PUBLIC_PRODUCTS.property.label, href: PUBLIC_PRODUCTS.property.href },
        { label: PUBLIC_PRODUCTS.livability.label, href: PUBLIC_PRODUCTS.livability.href },
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
      title: "Guides",
      description: "Educational frameworks, neighborhoods, and the Kammer Report before anyone looks at a listing.",
      items: [
        { label: "Decision Guides", href: "/guides#decision-guides" },
        { label: "Neighborhoods", href: "/guides#neighborhoods" },
        { label: "Kammer Report", href: "/guides#kammer-report" },
        ...publicGuides.map((guide) => ({ label: guide.title, href: guide.href })),
      ],
    },
    {
      title: "Legal",
      description: "Credentials live here, not as a footer merchandising link.",
      items: SITE_MAP_LEGAL,
    },
  ];
}
