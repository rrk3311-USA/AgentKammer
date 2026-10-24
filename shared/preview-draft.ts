/** Host-flag for unpublished Preview drafts. Same idea as /network on PR 64, written here so this branch does not depend on that PR. */

export const PUBLIC_PRODUCTION_HOSTS = ["agentkammer.com", "www.agentkammer.com"] as const;

export const UNPUBLISHED_DRAFT_PREFIXES = ["/tools/livability", "/tools/communication-map", "/api/livability"] as const;

export function normalizeHostname(host: string | null | undefined): string {
  return String(host ?? "")
    .split(",")[0]
    .split(":")[0]
    .replace(/\.$/, "")
    .trim()
    .toLowerCase();
}

export function isPublicProductionHost(host?: string | null): boolean {
  const hostname = normalizeHostname(host);
  return hostname === "agentkammer.com" || hostname === "www.agentkammer.com";
}

export function isLocalDraftHost(host?: string | null): boolean {
  const hostname = normalizeHostname(host);
  return !hostname || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]" || hostname === "::1";
}

/** Visible on localhost and Vercel Preview. Hidden on agentkammer.com / www. */
export function isPreviewDraftVisible(host?: string | null): boolean {
  if (isLocalDraftHost(host)) return true;
  return !isPublicProductionHost(host);
}

export function normalizePathname(pathname: string | null | undefined): string {
  const raw = String(pathname ?? "").split("?")[0].split("#")[0];
  if (!raw || raw === "/") return "/";
  return raw.replace(/\/+$/, "") || "/";
}

export function isUnpublishedDraftPath(pathname: string | null | undefined): boolean {
  const path = normalizePathname(pathname);
  return UNPUBLISHED_DRAFT_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/** Hide paid livability backends on the public Production host or any Vercel Production alias. */
export function livabilityApiIsPublic(input: { host?: string | null; vercelEnv?: string | null } = {}): boolean {
  if (isPublicProductionHost(input.host)) return false;
  if ((input.vercelEnv || "").trim().toLowerCase() === "production") return false;
  return true;
}
