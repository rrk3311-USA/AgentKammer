import { livabilityVisionStatus } from "../../server/lib/livability-vision";

type ApiRequest = { method?: string };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method && req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  return res.status(200).json(livabilityVisionStatus());
}
