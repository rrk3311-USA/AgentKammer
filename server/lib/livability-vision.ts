import OpenAI from "openai";

export type VisionRoom = {
  name: string;
  type: string;
  sf: number;
};

export type VisionDoor = {
  a: string;
  b: string;
};

export function livabilityVisionConfigured() {
  return Boolean(
    process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
  );
}

export function livabilityVisionStatus() {
  const available = livabilityVisionConfigured();
  return {
    available,
    provider: available ? (process.env.XAI_API_KEY ? "xai" : "openai") : null,
    note: available
      ? "A vision key is configured. An uploaded floor-plan image can be read."
      : "No vision key is configured on this deploy. Use the labeled sample or the room editor.",
  };
}

function client() {
  const apiKey =
    process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.XAI_API_KEY ? "https://api.x.ai/v1" : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

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

function slug(name: string, index: number) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 18);
  return `${base || "room"}${index}`;
}

export async function readFloorPlanImage(image: string) {
  const status = livabilityVisionStatus();
  if (!status.available) {
    return { ok: false as const, available: false, error: status.note, rooms: [], doors: [] };
  }
  const openai = client();
  if (!openai) {
    return { ok: false as const, available: false, error: status.note, rooms: [], doors: [] };
  }

  const model = process.env.XAI_API_KEY
    ? process.env.DECISION_GUIDE_MODEL || "grok-4.3"
    : process.env.OPENAI_MODEL || process.env.DECISION_GUIDE_MODEL || "gpt-4o-mini";

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "Extract a floor-plan room graph from the image. Return JSON only: {rooms:[{name,type,sf}], doors:[{a,b}]}. type must be one of entry,hallway,living,dining,kitchen,bedroom,bath,study,closet,terrace,other. sf is estimated square feet. doors.a and doors.b are room names that connect. If the image is not a floor plan, return {rooms:[],doors:[],error:'not a floor plan'}. Never invent rooms you cannot see.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Read this floor plan. Layout only. No neighborhood or value judgments." },
          { type: "image_url", image_url: { url: image } },
        ],
      },
    ],
  });

  const text = completion.choices[0]?.message?.content || "";
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart < 0 || jsonEnd <= jsonStart) {
    return { ok: false as const, available: true, error: "The vision model did not return a plan.", rooms: [], doors: [] };
  }
  let parsed: { rooms?: unknown; doors?: unknown; error?: string };
  try {
    parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  } catch {
    return { ok: false as const, available: true, error: "The vision model returned unreadable JSON.", rooms: [], doors: [] };
  }
  if (parsed.error || !Array.isArray(parsed.rooms) || parsed.rooms.length === 0) {
    return {
      ok: false as const,
      available: true,
      error: parsed.error || "No rooms could be read from that image.",
      rooms: [],
      doors: [],
    };
  }

  const rooms: VisionRoom[] = [];
  const names = new Map<string, string>();
  parsed.rooms.forEach((raw, index) => {
    if (!raw || typeof raw !== "object") return;
    const row = raw as { name?: unknown; type?: unknown; sf?: unknown };
    const name = typeof row.name === "string" && row.name.trim() ? row.name.trim().slice(0, 32) : `Room ${index + 1}`;
    const type = typeof row.type === "string" && ALLOWED_TYPES.has(row.type) ? row.type : "other";
    const sf = Math.max(20, Math.min(800, Math.round(Number(row.sf) || 80)));
    const id = slug(name, index);
    names.set(name.toLowerCase(), id);
    rooms.push({ name, type, sf });
    (rooms[rooms.length - 1] as VisionRoom & { id: string }).id = id;
  });

  const doors: VisionDoor[] = [];
  if (Array.isArray(parsed.doors)) {
    for (const raw of parsed.doors) {
      if (!raw || typeof raw !== "object") continue;
      const row = raw as { a?: unknown; b?: unknown };
      const a = typeof row.a === "string" ? names.get(row.a.toLowerCase()) : undefined;
      const b = typeof row.b === "string" ? names.get(row.b.toLowerCase()) : undefined;
      if (a && b && a !== b) doors.push({ a, b });
    }
  }

  return { ok: true as const, available: true, rooms, doors, error: null };
}
