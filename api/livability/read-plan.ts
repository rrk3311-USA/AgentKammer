import { boostFloorPlanLabels } from "../../server/lib/livability-vision";

type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

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
    const tiles = Array.isArray(body.tiles) ? body.tiles : [];
    const result = await boostFloorPlanLabels({
      overview: typeof body.overview === "string" ? body.overview : undefined,
      image: typeof body.image === "string" ? body.image : undefined,
      tiles: tiles as Array<{ dataUrl?: string }>,
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      ok: false,
      available: true,
      boost: true,
      labels: [],
      doors: [],
      error: error instanceof Error ? error.message : "Vision boost failed.",
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};
