/**
 * Host-flag for unpublished Preview drafts.
 * Keep in sync with shared/preview-draft.ts — this file stays plain JS so Vercel Edge can load it.
 */
const PRODUCTION_HOSTS = new Set(["agentkammer.com", "www.agentkammer.com"]);
const UNPUBLISHED = ["/tools/livability", "/tools/communication-map", "/api/livability"];

function hostnameOf(request) {
  const url = new URL(request.url);
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded || request.headers.get("host") || url.hostname || "")
    .split(",")[0]
    .split(":")[0]
    .replace(/\.$/, "")
    .trim()
    .toLowerCase();
  return raw;
}

function isUnpublished(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return UNPUBLISHED.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

const NOT_FOUND = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Page Not Found | Agent Kammer</title>
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;background:#F5F2EB;color:#202735;font:400 18px/1.6 Georgia,serif}
  main{max-width:36rem;margin:0 auto;padding:18vh 1.5rem 4rem}
  p.eyebrow{letter-spacing:.18em;text-transform:uppercase;font:600 11px/1 system-ui,sans-serif;color:#6B5844}
  h1{font-size:clamp(2rem,5vw,3.1rem);line-height:1.05;font-weight:500;margin:.8rem 0 1rem}
  a{color:#0D182B}
</style>
</head>
<body>
<main>
<p class="eyebrow">Page Not Found</p>
<h1>This path does not have a Situation yet.</h1>
<p>Start Here names what changed, or write if the question is specific to a building, neighborhood, timeline, or life change.</p>
<p><a href="/situations">Start Here</a> · <a href="/contact">Contact</a></p>
</main>
</body>
</html>`;

export const config = {
  matcher: [
    "/tools/livability",
    "/tools/livability/:path*",
    "/tools/communication-map",
    "/tools/communication-map/:path*",
    "/api/livability",
    "/api/livability/:path*",
  ],
};

export default function middleware(request) {
  const url = new URL(request.url);
  if (!PRODUCTION_HOSTS.has(hostnameOf(request))) return;
  if (!isUnpublished(url.pathname)) return;
  const isApi = url.pathname.startsWith("/api/");
  return new Response(isApi ? JSON.stringify({ error: "Not found" }) : NOT_FOUND, {
    status: 404,
    headers: {
      "content-type": isApi ? "application/json; charset=utf-8" : "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}
