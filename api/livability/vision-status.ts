type ApiRequest = { method?: string };
type ApiResponse = { status: (code: number) => { json: (body: unknown) => void } };

function status() {
  const available = Boolean(
    process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  );
  return {
    available,
    provider: available ? (process.env.XAI_API_KEY ? "xai" : "openai") : null,
    note: available
      ? "A vision key is configured. An uploaded floor-plan image can be read."
      : "No vision key is configured on this deploy. Use the labeled sample or the room editor.",
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  return res.status(200).json(status());
}
