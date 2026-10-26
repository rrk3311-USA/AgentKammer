import { isBrandHomeProductionHost } from "./shared/brand-home-gate";

export const config = {
  matcher: ["/home-brand", "/home-brand/", "/home-v3", "/home-v3/"],
};

export default function middleware(request: Request): Response | undefined {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!isBrandHomeProductionHost(host)) return;

  return new Response("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "no-store",
    },
  });
}
