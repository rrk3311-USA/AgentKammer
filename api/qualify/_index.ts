import { submitGetQualified } from "../../server/lib/get-qualified.js";
import { buildProgressCookieHeader } from "../../server/lib/hub-progress-cookie.js";

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers: { cookie?: string };
  query?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
  status: (code: number) => { json: (body: unknown) => void };
};

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
    const outcome = await submitGetQualified({
      body,
      visitorId: typeof body.visitorId === "string" ? body.visitorId : null,
      querySource: body.source ?? req.query?.source,
    });
    if (!outcome.ok) {
      return res.status(outcome.status).json({ ok: false, error: outcome.error });
    }

    res.setHeader("Set-Cookie", buildProgressCookieHeader(outcome.result.cookie));
    return res.status(200).json({
      ok: true,
      id: outcome.result.id,
      persisted: outcome.result.persisted,
      processPdfSent: outcome.result.processPdfSent,
      hubCreated: outcome.result.hubCreated,
      route: outcome.result.route,
      status: outcome.result.status,
      progress: outcome.result.progress,
      nextStep: outcome.result.nextStep,
      hubPath: outcome.result.hubPath,
      calendarUrl: outcome.result.calendarUrl,
      diegoUrl: outcome.result.diegoUrl,
      processPdfPath: outcome.result.processPdfPath,
    });
  } catch (error) {
    console.error("[qualify] submit failed", error);
    return res.status(500).json({ ok: false, error: "Could not save those details. Please try again." });
  }
}
