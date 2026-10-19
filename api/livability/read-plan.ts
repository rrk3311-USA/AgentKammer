import { readFloorPlanImage } from "../../server/lib/livability-vision";

type ApiRequest = { method?: string; body?: { image?: string } };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const image = typeof req.body?.image === "string" ? req.body.image : "";
  if (!image.startsWith("data:image/") || image.length > 6_000_000) {
    return res.status(400).json({
      ok: false,
      available: true,
      error: "Send one floor-plan image as a data URL, under about 4 MB.",
      rooms: [],
      doors: [],
    });
  }
  try {
    const result = await readFloorPlanImage(image);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      ok: false,
      available: true,
      error: error instanceof Error ? error.message : "Vision reading failed.",
      rooms: [],
      doors: [],
    });
  }
}
