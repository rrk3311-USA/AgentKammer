/** Unpublished Agent Intelligence Network draft. Not a public product. */

export const NETWORK_DRAFT_PATH = "/network";

export const PRODUCTION_PUBLIC_HOSTS = ["agentkammer.com", "www.agentkammer.com"] as const;

export function normalizePublicHost(hostname: string) {
  return hostname.split(":")[0]?.replace(/\.$/, "").toLowerCase() ?? "";
}

export function isProductionPublicHost(hostname: string) {
  const host = normalizePublicHost(hostname);
  return (PRODUCTION_PUBLIC_HOSTS as readonly string[]).includes(host);
}

/** Visible on localhost and Vercel Preview. Hidden on agentkammer.com. */
export function isNetworkDraftVisible(hostname: string) {
  return !isProductionPublicHost(hostname);
}
