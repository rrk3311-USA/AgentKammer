import OpenAI from "openai";

export type BoostLabel = {
  x: number;
  y: number;
  name: string;
  type: string;
  sf?: number;
};

const ALLOWED_TYPES = new Set([
  "entry",
  "hallway",
  "living",
  "dining",
  "kitchen",
  "bedroom",
  "bath",
  "study",
  "closet",
  "terrace",
  "other",
]);

function grokKey() {
  return process.env.XAI_API_KEY || "";
}

function openaiKey() {
  return process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY || "";
}

function geminiKey() {
  return process.env.GEMINI_API_KEY || "";
}

export function livabilityBoostProvider(): "xai" | "gemini" | "openai" | null {
  const forced = String(process.env.LIVABILITY_VISION_PROVIDER || "")
    .toLowerCase()
    .trim();
  if (forced === "off" || forced === "none" || forced === "cv") return null;
  if (forced === "gemini" || forced === "google") return geminiKey() ? "gemini" : null;
  if (forced === "xai" || forced === "grok") return grokKey() ? "xai" : null;
  if (forced === "openai") return openaiKey() ? "openai" : null;
  if (grokKey()) return "xai";
  if (geminiKey()) return "gemini";
  if (openaiKey()) return "openai";
  return null;
}

export function livabilityVisionConfigured() {
  return livabilityBoostProvider() !== null;
}

export function livabilityVisionStatus() {
  const provider = livabilityBoostProvider();
  return {
    available: Boolean(provider),
    boost: Boolean(provider),
    cv: true,
    provider,
    note: provider
      ? "Plans are read on this device. An optional vision boost can refine labels when you leave it on."
      : "Plans are read on this device. No vision key is set, so labels stay with the on-device reading.",
  };
}

function openaiClient(provider: "xai" | "openai") {
  if (provider === "xai") {
    return new OpenAI({ apiKey: grokKey(), baseURL: "https://api.x.ai/v1" });
  }
  return new OpenAI({
    apiKey: openaiKey(),
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

const BOOST_PROMPT =
  "You refine labels on a floor plan that was already read by computer vision. Return JSON only: {labels:[{x,y,name,type,sf}]}. x and y are pixel coordinates in the overview image, at the center of the room. type must be one of entry,hallway,living,dining,kitchen,bedroom,bath,study,closet,terrace,other. sf is printed or estimated square feet. Only label rooms you can read. Do not list doors. Do not say which rooms connect. Do not invent rooms you cannot see. Layout only. No neighborhood or value judgments.";

function parseBoost(text: string) {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart < 0 || jsonEnd <= jsonStart) return [];
  let parsed: { labels?: unknown };
  try {
    parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(parsed.labels)) return [];
  const labels: BoostLabel[] = [];
  for (const raw of parsed.labels) {
    if (!raw || typeof raw !== "object") continue;
    const row = raw as { x?: unknown; y?: unknown; name?: unknown; type?: unknown; sf?: unknown };
    const name = typeof row.name === "string" && row.name.trim() ? row.name.trim().slice(0, 36) : "";
    if (!name) continue;
    const type = typeof row.type === "string" && ALLOWED_TYPES.has(row.type) ? row.type : "other";
    const sf = Number(row.sf);
    labels.push({
      x: Math.round(Number(row.x) || 0),
      y: Math.round(Number(row.y) || 0),
      name,
      type,
      sf: Number.isFinite(sf) && sf > 20 ? Math.round(sf) : undefined,
    });
  }
  return labels;
}

function dataUrlParts(image: string) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(image);
  if (!match) return null;
  return { mime: match[1], data: match[2] };
}

async function boostWithOpenAI(provider: "xai" | "openai", overview: string, tiles: { dataUrl: string }[]) {
  const openai = openaiClient(provider);
  const model =
    provider === "xai"
      ? process.env.DECISION_GUIDE_MODEL || "grok-4.3"
      : process.env.OPENAI_MODEL || process.env.DECISION_GUIDE_MODEL || "gpt-4o-mini";
  const images = [overview, ...tiles.map((tile) => tile.dataUrl)].filter((item) => item.startsWith("data:image/"));
  const content: OpenAI.Chat.ChatCompletionContentPart[] = [
    { type: "text", text: "Overview first, then overlapping tiles of the same plan. Coordinates refer to the overview." },
    ...images.map((url) => ({ type: "image_url" as const, image_url: { url } })),
  ];
  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: BOOST_PROMPT },
      { role: "user", content },
    ],
  });
  return parseBoost(completion.choices[0]?.message?.content || "");
}

async function boostWithGemini(overview: string, tiles: { dataUrl: string }[]) {
  const key = geminiKey();
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const parts: Array<{ text: string } | { inline_data: { mime_type: string; data: string } }> = [
    { text: BOOST_PROMPT },
    { text: "Overview first, then overlapping tiles. Coordinates refer to the overview." },
  ];
  for (const image of [overview, ...tiles.map((tile) => tile.dataUrl)]) {
    const parsed = dataUrlParts(image);
    if (!parsed) continue;
    parts.push({ inline_data: { mime_type: parsed.mime, data: parsed.data } });
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { temperature: 0, responseMimeType: "application/json" },
      }),
    },
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err.slice(0, 180) || "Gemini boost failed.");
  }
  const body = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = body.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
  return parseBoost(text);
}

export async function boostFloorPlanLabels(input: {
  overview?: string;
  image?: string;
  tiles?: Array<{ x?: number; y?: number; w?: number; h?: number; dataUrl?: string }>;
}) {
  const status = livabilityVisionStatus();
  const overview = input.overview || input.image || "";
  if (!status.boost) {
    return { ok: false as const, available: false, boost: false, labels: [], error: status.note, engine: null };
  }
  if (!overview.startsWith("data:image/")) {
    return {
      ok: false as const,
      available: true,
      boost: true,
      labels: [],
      error: "Send an overview image as a data URL.",
      engine: status.provider,
    };
  }
  const tiles = (input.tiles || [])
    .filter((tile) => typeof tile?.dataUrl === "string" && tile.dataUrl.startsWith("data:image/"))
    .slice(0, 4)
    .map((tile) => ({ dataUrl: String(tile.dataUrl) }));
  const payloadBytes = [overview, ...tiles.map((tile) => tile.dataUrl)].reduce((sum, item) => sum + item.length, 0);
  if (payloadBytes > 4_500_000) {
    return {
      ok: false as const,
      available: true,
      boost: true,
      labels: [],
      error: "Boost images are too large. The on-device reading still stands.",
      engine: status.provider,
    };
  }

  try {
    const labels =
      status.provider === "gemini"
        ? await boostWithGemini(overview, tiles)
        : await boostWithOpenAI(status.provider === "openai" ? "openai" : "xai", overview, tiles);
    return {
      ok: labels.length > 0,
      available: true,
      boost: true,
      labels,
      error: labels.length ? null : "The boost did not return labels. The on-device reading still stands.",
      engine: status.provider,
    };
  } catch (error) {
    return {
      ok: false as const,
      available: true,
      boost: true,
      labels: [],
      error: error instanceof Error ? error.message : "Vision boost failed.",
      engine: status.provider,
    };
  }
}

/** @deprecated Boost only. Kept so old callers do not crash. Connections are never returned. */
export async function readFloorPlanImage(image: string) {
  const boosted = await boostFloorPlanLabels({ overview: image });
  return {
    ok: boosted.ok,
    available: boosted.available,
    rooms: [],
    doors: [],
    labels: boosted.labels,
    error: boosted.error,
  };
}
