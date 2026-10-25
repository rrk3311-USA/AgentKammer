/**
 * Side homepage at /home-brand.
 * Render on localhost and Vercel Preview. 404 on the public production hosts.
 */
export const BRAND_HOME_PATH = "/home-brand";

const PRODUCTION_HOSTS = new Set(["agentkammer.com", "www.agentkammer.com"]);

export function isBrandHomeProductionHost(host: string | null | undefined): boolean {
  const first = String(host ?? "").split(",")[0] ?? "";
  const hostname = first.trim().toLowerCase().replace(/\.$/, "").split(":")[0] ?? "";
  return PRODUCTION_HOSTS.has(hostname);
}

export function isBrandHomePath(location: string): boolean {
  const path = (location.split(/[?#]/)[0] ?? location).replace(/\/+$/, "") || "/";
  return path === BRAND_HOME_PATH;
}
