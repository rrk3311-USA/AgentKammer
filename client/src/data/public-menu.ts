/**
 * Locked public product vocabulary (Simplification brief LOCK).
 * Do not merchandise additional SKUs as equal primary offers.
 *
 * Get Qualified and Curation IQ are separate PRs. Leave hooks only:
 * Get Qualified = gate copy for a Strategy Session, never a product card.
 */

export const KAMMER_VERDICTS = ["Pick", "Consider", "Wait", "Pass"] as const;

export const PUBLIC_PRODUCTS = {
  guidance: {
    id: "guidance",
    label: "Guidance",
    advisor: "Guidance Advisor",
    href: "/buyer-advisory",
    text: "A quiet conversation with the Guidance Advisor. Chat only. Not a call.",
  },
  situation: {
    id: "situation",
    label: "Situation Assessment",
    href: "/belonging",
    text: "A life diagnostic: what changed, whether anything should change, and where you belong.",
  },
  property: {
    id: "property",
    label: "Property Assessment",
    href: "/contact?intent=property",
    text: "An address review. Judgment on a specific building or property. Not a Livability Score.",
  },
  livability: {
    id: "livability",
    label: "Livability Score",
    href: "/contact?intent=livability",
    desk: "Tools",
    text: "A Tools-desk read on daily fit. Kept separate from Property Assessment.",
  },
  strategy: {
    id: "strategy",
    label: "Strategy Session",
    href: "/contact?intent=strategy",
    text: "A live hour of judgment. One session door. Not a Discovery Call.",
  },
} as const;

export const CONTACT_NEXT_STEPS = [
  PUBLIC_PRODUCTS.guidance.label,
  PUBLIC_PRODUCTS.situation.label,
  PUBLIC_PRODUCTS.property.label,
  PUBLIC_PRODUCTS.livability.label,
  PUBLIC_PRODUCTS.strategy.label,
] as const;

export type PublicProductId = keyof typeof PUBLIC_PRODUCTS;

const INTENT_ALIASES: Record<string, PublicProductId> = {
  guidance: "guidance",
  belonging: "situation",
  situation: "situation",
  property: "property",
  livability: "livability",
  strategy: "strategy",
};

export function resolvePublicIntent(raw: string | null | undefined): PublicProductId | null {
  if (!raw) return null;
  return INTENT_ALIASES[raw.trim().toLowerCase()] ?? null;
}

export function contactHref(id: PublicProductId): string {
  if (id === "situation") return PUBLIC_PRODUCTS.situation.href;
  if (id === "guidance") return PUBLIC_PRODUCTS.guidance.href;
  return `/contact?intent=${id}`;
}

/** Footer Site map only. Do not add these to the six-item header. */
export const FOOTER_SITEMAP_QUIET = [
  { label: "Get Qualified", href: "/qualify" },
  { label: "Hub", href: "/hub" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
  { label: "Intelligence", href: "/intelligence" },
] as const;
