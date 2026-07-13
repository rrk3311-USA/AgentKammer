type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  return res.status(200).json({
    ok: true,
    persisted: false,
    reason: "Production database is not configured.",
    sessionId: (body as { sessionId?: string } | undefined)?.sessionId ?? null,
  });
}
