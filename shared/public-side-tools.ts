/**
 * Livability simulator + Decision Guide / Decision Assistant.
 * Default OFF on the public site. Restore with env + redeploy; do not delete source.
 *
 * Server / Vercel APIs read AK_PUBLIC_SIDE_TOOLS (or VITE_AK_PUBLIC_SIDE_TOOLS).
 * Client nav is baked at build time from VITE_AK_PUBLIC_SIDE_TOOLS.
 */
const TRUTHY = new Set(["1", "true", "on", "yes"]);

export const PUBLIC_SIDE_TOOL_HREFS = [
  "/tools/livability/",
  "/tools/communication-map",
] as const;

export function flagValueIsOn(value: unknown): boolean {
  return TRUTHY.has(String(value ?? "").trim().toLowerCase());
}

export function publicSideToolsEnabledFrom(env: Record<string, string | undefined> | NodeJS.ProcessEnv): boolean {
  return flagValueIsOn(env.AK_PUBLIC_SIDE_TOOLS) || flagValueIsOn(env.VITE_AK_PUBLIC_SIDE_TOOLS);
}

function viteEnvFlag(): boolean {
  try {
    const env = (import.meta as ImportMeta & { env?: { VITE_AK_PUBLIC_SIDE_TOOLS?: string } }).env;
    return flagValueIsOn(env?.VITE_AK_PUBLIC_SIDE_TOOLS);
  } catch {
    return false;
  }
}

export function publicSideToolsEnabled(): boolean {
  if (typeof process !== "undefined" && process.env && publicSideToolsEnabledFrom(process.env)) {
    return true;
  }
  return viteEnvFlag();
}

export function isPublicSideToolPage(pathname: string): boolean {
  const clean = (pathname.split(/[?#]/)[0] ?? pathname).replace(/\/+$/, "") || "/";
  return (
    clean === "/tools/livability" ||
    clean === "/tools/livability/index.html" ||
    clean === "/tools/livability/harness.html" ||
    clean === "/tools/communication-map"
  );
}

export function isPublicSideApiPath(pathname: string): boolean {
  const clean = pathname.replace(/^\/api\/?/, "").replace(/^\/+|\/+$/g, "");
  return (
    clean === "decision-guide/chat" ||
    clean === "decision-assistant/conversation" ||
    clean.startsWith("decision-assistant/conversation/") ||
    clean === "livability/vision-status" ||
    clean === "livability/read-plan"
  );
}
