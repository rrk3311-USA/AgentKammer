import { updateQualifyFlags } from "../../server/lib/get-qualified.js";
import { buildProgressCookieHeader, unsignProgress } from "../../server/lib/hub-progress-cookie.js";

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: { cookie?: string };
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  status: (code: number) => { json: (body: unknown) => void };
};

function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

function parseBody(body: unknown): Record<string, unknown> {
  const parsed = typeof body === "string" ? JSON.parse(body || "{}") : body;
  return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = parseBody(req.body);
    const cookie = unsignProgress(readCookie(req.headers.cookie, "ak_hub_progress"));
    const email = (typeof body.email === "string" && body.email.trim()) || cookie?.e || "";
    if (!email) {
      return res.status(400).json({ ok: false, error: "Email is required to record a booking." });
    }

    const updated = await updateQualifyFlags({
      email,
      sessionBooked: true,
      status: "booked",
    });
    const progress = {
      getQualifiedComplete: true,
      sessionBooked: true,
      strategySessionHeld: updated?.strategySessionHeld ?? Boolean(cookie?.ssh),
      qualifyRoute: updated?.route ?? cookie?.qr ?? null,
    };

    res.setHeader(
      "Set-Cookie",
      buildProgressCookieHeader({
        e: email.trim().toLowerCase(),
        n: cookie?.n,
        gq: true,
        sb: true,
        ssh: progress.strategySessionHeld,
        qr: progress.qualifyRoute,
        at: new Date().toISOString(),
      }),
    );

    return res.status(200).json({ ok: true, progress });
  } catch (error) {
    console.error("[qualify] session hook failed", error);
    return res.status(500).json({ ok: false, error: "Could not record the booking hook." });
  }
}
