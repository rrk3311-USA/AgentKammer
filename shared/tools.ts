/**
 * Pay-to-run Tools — catalog, pricing, and input contracts.
 * 1 credit = $1 = 1 paid analysis run.
 */

export const TOOLS_PREVIEW_QUERY = "preview";
export const TOOLS_PREVIEW_HEADER = "x-tools-preview";
export const TOOLS_PREVIEW_STORAGE_KEY = "ak_tools_preview";
export const TOOLS_WALLET_COOKIE = "ak_tools_wallet";

export const RUN_COST_CREDITS = 1;
export const RUN_COST_USD = 1;

export const TOP_UP_PACKS = [5, 10, 15, 25] as const;
export type TopUpPack = (typeof TOP_UP_PACKS)[number];

export const TOOL_SLUGS = ["livability"] as const;
export type ToolSlug = (typeof TOOL_SLUGS)[number];

export type ToolDefinition = {
  slug: ToolSlug | string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  href: string;
  status: "live" | "scaffold";
  runCostCredits: number;
  firstRunFree: boolean;
};

export const TOOL_CATALOG: ToolDefinition[] = [
  {
    slug: "livability",
    name: "Livability Score",
    eyebrow: "First tool",
    tagline: "How a home lives — not how it lists.",
    description:
      "A calm diagnostic of walkability, quiet, light, amenities, belonging, and transit. Submit an address, a listing link, or photos.",
    href: "/tools/livability",
    status: "live",
    runCostCredits: RUN_COST_CREDITS,
    firstRunFree: true,
  },
  {
    slug: "building-fit",
    name: "Building Fit",
    eyebrow: "Next",
    tagline: "Match a building to a household.",
    description: "Scaffolded for later. Same wallet, same credit.",
    href: "/tools",
    status: "scaffold",
    runCostCredits: RUN_COST_CREDITS,
    firstRunFree: false,
  },
  {
    slug: "decision-brief",
    name: "Decision Brief",
    eyebrow: "Later",
    tagline: "A one-page read on whether anything should change.",
    description: "Scaffolded for later. Same wallet, same credit.",
    href: "/tools",
    status: "scaffold",
    runCostCredits: RUN_COST_CREDITS,
    firstRunFree: false,
  },
];

export function getTool(slug: string): ToolDefinition | undefined {
  return TOOL_CATALOG.find((tool) => tool.slug === slug);
}

export function isTopUpPack(value: unknown): value is TopUpPack {
  return typeof value === "number" && (TOP_UP_PACKS as readonly number[]).includes(value);
}

export type ToolImageInput = {
  name: string;
  mime: string;
  size: number;
  dataUrl?: string;
};

export type LivabilityInput = {
  address?: string;
  listingUrl?: string;
  images?: ToolImageInput[];
  notes?: string;
};

export type LivabilityDimensions = {
  walkability: number;
  quiet: number;
  light: number;
  amenities: number;
  belonging: number;
  transit: number;
};

export type LivabilityResult = {
  mode: "demo" | "model";
  score: number;
  summary: string;
  dimensions: LivabilityDimensions;
  notes: string[];
  caveats: string[];
  inputsUsed: {
    address: boolean;
    listing: boolean;
    images: number;
  };
};

export type ToolRunStatus = "queued" | "processing" | "completed" | "failed";

export const LIVABILITY_MAX_IMAGES = 3;
export const LIVABILITY_MAX_IMAGE_BYTES = 1_500_000;
export const LIVABILITY_ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

const LISTING_HOST_HINT =
  /streeteasy|zillow|realtor|redfin|compass|corcoran|elliman|sothebys|listing|apartments\.com|trulia/i;

export function normalizeAddress(value: string | undefined | null): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

export function normalizeListingUrl(value: string | undefined | null): string {
  return (value || "").trim();
}

export function isPlausibleListingUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function listingLooksResidential(value: string): boolean {
  return LISTING_HOST_HINT.test(value);
}

export type LivabilityValidation =
  | { ok: true; input: Required<Pick<LivabilityInput, "address" | "listingUrl" | "notes">> & { images: ToolImageInput[] } }
  | { ok: false; errors: string[] };

export function validateLivabilityInput(raw: LivabilityInput): LivabilityValidation {
  const errors: string[] = [];
  const address = normalizeAddress(raw.address);
  const listingUrl = normalizeListingUrl(raw.listingUrl);
  const notes = (raw.notes || "").trim().slice(0, 500);
  const images = Array.isArray(raw.images) ? raw.images.slice(0, LIVABILITY_MAX_IMAGES) : [];

  if (address && address.length < 6) {
    errors.push("Address needs a street and city — or leave it blank and use a listing link or photos.");
  }
  if (listingUrl && !isPlausibleListingUrl(listingUrl)) {
    errors.push("Listing link must be a full http(s) URL.");
  }
  if (images.length > LIVABILITY_MAX_IMAGES) {
    errors.push(`Use at most ${LIVABILITY_MAX_IMAGES} photos.`);
  }
  for (const image of images) {
    if (!image?.name || !image.mime) {
      errors.push("Each photo needs a file name and type.");
      break;
    }
    if (!(LIVABILITY_ALLOWED_MIME as readonly string[]).includes(image.mime)) {
      errors.push("Photos must be JPEG, PNG, or WebP.");
      break;
    }
    if (typeof image.size === "number" && image.size > LIVABILITY_MAX_IMAGE_BYTES) {
      errors.push("Each photo must be under 1.5 MB.");
      break;
    }
    if (image.dataUrl && !image.dataUrl.startsWith("data:image/")) {
      errors.push("Photo data is not a valid image.");
      break;
    }
  }

  if (!address && !listingUrl && images.length === 0) {
    errors.push("Add an address, a listing link, or at least one photo.");
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true, input: { address, listingUrl, notes, images } };
}

export function publicWalletView(input: {
  credits: number;
  freeLivabilityUsed: boolean;
  identifiedBy: "visitor" | "member";
  email?: string | null;
  persistence: "database" | "cookie" | "memory";
  stripeConfigured: boolean;
  paymentsStubbed: boolean;
}) {
  const nextRunFree = !input.freeLivabilityUsed;
  return {
    credits: input.credits,
    freeLivabilityUsed: input.freeLivabilityUsed,
    nextRunCredits: nextRunFree ? 0 : RUN_COST_CREDITS,
    nextRunLabel: nextRunFree ? "First Livability run is free" : `${RUN_COST_CREDITS} credit · $${RUN_COST_USD}`,
    identifiedBy: input.identifiedBy,
    email: input.email || null,
    persistence: input.persistence,
    stripeConfigured: input.stripeConfigured,
    paymentsStubbed: input.paymentsStubbed,
    topUps: TOP_UP_PACKS.map((credits) => ({
      credits,
      usd: credits,
      label: `$${credits}`,
    })),
  };
}
