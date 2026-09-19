/**
 * Locked public product vocabulary (Simplification brief LOCK).
 * Do not merchandise additional SKUs as equal primary offers.
 *
 * Strategy Session is shelved for later monetization. Route stays; not a public offer.
 * Get Qualified is a footer onboard tool, not a fifth product.
 */

export const KAMMER_VERDICTS = ["Pick", "Consider", "Wait", "Pass"] as const;

export const PUBLIC_PRODUCTS = {
  guidance: {
    id: "guidance",
    label: "Guidance",
    advisor: "Guidance Advisor",
    href: "/",
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
} as const;

/** Shelved — later monetization. Keep the route; do not merchandise as a public offer. */
export const SHELVED_OFFERS = {
  strategy: {
    id: "strategy",
    label: "Strategy Session",
    href: "/contact?intent=strategy",
    text: "A live hour of judgment. Shelved from the public menu. Not a Discovery Call.",
  },
} as const;

/** Footer onboard tool. Not a fifth public product. */
export const GET_QUALIFIED = {
  label: "Get Qualified",
  href: "/qualify",
} as const;

export const CONTACT_NEXT_STEPS = [
  PUBLIC_PRODUCTS.guidance.label,
  PUBLIC_PRODUCTS.situation.label,
  PUBLIC_PRODUCTS.property.label,
  PUBLIC_PRODUCTS.livability.label,
] as const;

export type PublicProductId = keyof typeof PUBLIC_PRODUCTS;
export type ShelvedOfferId = keyof typeof SHELVED_OFFERS;

const INTENT_ALIASES: Record<string, PublicProductId> = {
  guidance: "guidance",
  belonging: "situation",
  situation: "situation",
  property: "property",
  livability: "livability",
};

export function resolvePublicIntent(raw: string | null | undefined): PublicProductId | null {
  if (!raw) return null;
  return INTENT_ALIASES[raw.trim().toLowerCase()] ?? null;
}

/** Deep-link intake only. Strategy Session is not a public offer. */
export function resolveShelvedIntent(raw: string | null | undefined): "strategy" | null {
  if (!raw) return null;
  return raw.trim().toLowerCase() === "strategy" ? "strategy" : null;
}

export function contactHref(id: PublicProductId): string {
  if (id === "situation") return PUBLIC_PRODUCTS.situation.href;
  if (id === "guidance") return PUBLIC_PRODUCTS.guidance.href;
  return `/contact?intent=${id}`;
}

/** Quiet sitemap entries only. Do not add these to the five-item header. */
export const FOOTER_SITEMAP_QUIET = [
  GET_QUALIFIED,
  { label: "Hub", href: "/hub" },
  { label: "Tools", href: "/tools" },
  { label: "Intelligence", href: "/intelligence" },
] as const;
