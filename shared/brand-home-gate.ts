/**
 * Side homepages. Render on localhost and Vercel Preview.
 * 404 on the public production hosts.
 */
export const BRAND_HOME_PATH = "/home-brand";
export const HOME_V3_PATH = "/home-v3";

const PRODUCTION_HOSTS = new Set(["agentkammer.com", "www.agentkammer.com"]);

export function isBrandHomeProductionHost(host: string | null | undefined): boolean {
  const first = String(host ?? "").split(",")[0] ?? "";
  const hostname = first.trim().toLowerCase().replace(/\.$/, "").split(":")[0] ?? "";
  return PRODUCTION_HOSTS.has(hostname);
}

function cleanPath(location: string): string {
  return (location.split(/[?#]/)[0] ?? location).replace(/\/+$/, "") || "/";
}

export function isBrandHomePath(location: string): boolean {
  return cleanPath(location) === BRAND_HOME_PATH;
}

export function isSideHomePath(location: string): boolean {
  const path = cleanPath(location);
  return path === BRAND_HOME_PATH || path === HOME_V3_PATH;
}
