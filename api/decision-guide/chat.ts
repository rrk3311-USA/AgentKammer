import OpenAI from "openai";
import { randomUUID } from "crypto";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["assistant", "user"]),
  text: z.string(),
});

const profileSchema = z.object({
  situation: z.string().optional(),
  desire: z.string().optional(),
  constraints: z.string().optional(),
  tradeOff: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

const requestSchema = z.object({
  latestMessage: z.string().min(1),
  messages: z.array(messageSchema).default([]),
  profile: profileSchema.default({}),
  leadScore: z.number().optional(),
  pageContext: z
    .object({
      path: z.string().optional(),
      title: z.string().optional(),
      topics: z.array(z.string()).optional(),
      prerequisites: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
    })
    .optional(),
});

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "profile", "actions", "leadQualification"],
  properties: {
    reply: { type: "string" },
    profile: {
      type: "object",
      additionalProperties: false,
      required: ["situation", "desire", "constraints", "tradeOff", "email", "phone"],
      properties: {
        situation: { type: ["string", "null"] },
        desire: { type: ["string", "null"] },
        constraints: { type: ["string", "null"] },
        tradeOff: { type: ["string", "null"] },
        email: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
      },
    },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "label", "path", "reason"],
        properties: {
          type: { type: "string", enum: ["open_page", "update_blueprint", "send_recap", "recommend_page", "none"] },
          label: { type: "string" },
          path: { type: ["string", "null"] },
          reason: { type: "string" },
        },
      },
    },
    leadQualification: {
      type: "object",
      additionalProperties: false,
      required: ["score", "quality", "summary", "missing"],
      properties: {
        score: { type: "number" },
        quality: { type: "string", enum: ["exploratory", "qualified", "high-intent"] },
        summary: { type: "string" },
        missing: { type: "array", items: { type: "string" } },
      },
    },
  },
};

type ApiRequest = {
  method?: string;
  headers: { cookie?: string };
  body?: unknown;
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

function getVisitorId(req: ApiRequest, res: ApiResponse) {
  const existing = readCookie(req.headers.cookie, "ak_visitor_id");
  if (existing && /^akv_[a-f0-9-]{36}$/i.test(existing)) return existing;

  const visitorId = `akv_${randomUUID()}`;
  res.setHeader(
    "Set-Cookie",
    `ak_visitor_id=${encodeURIComponent(visitorId)}; Path=/; Max-Age=34560000; HttpOnly; Secure; SameSite=Lax`,
  );
  return visitorId;
}

function extractText(response: any) {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text.trim();
  }

  const parts: string[] = [];
  for (const item of response.output ?? []) {
    if (item.type !== "message") continue;
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n").trim();
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Decision Guide AI is not configured" });
  }

  try {
    const visitorId = getVisitorId(req, res);
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = requestSchema.parse(body);
    const openai = new OpenAI({
      apiKey,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });

    const instructions = [
      "You are Raphi, Agent Kammer's Decision Guide for Manhattan housing decisions.",
      "You are a senior advisor, not a chatbot and not a lead form.",
      "Use this framework: TRIGGER -> DESIRE -> CONSTRAINTS -> TRADE-OFFS -> RECOMMENDATION.",
      "Never gate basic guidance behind contact information.",
      "Ask for email or phone only for a clear deliverable like saving progress, sending a recap, delivering reports, scheduling review, or arranging an introduction.",
      "Qualification is invisible. Do not show scores to the visitor.",
      "Return concise advisor guidance and structured actions for the UI.",
    ].join("\n");

    const response = await openai.responses.create({
      model: process.env.DECISION_GUIDE_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
      input: [
        { role: "developer", content: instructions },
        {
          role: "user",
          content: JSON.stringify({
            visitorId,
            currentPage: parsed.pageContext,
            currentProfile: parsed.profile,
            leadScore: parsed.leadScore ?? 0,
            latestMessage: parsed.latestMessage,
            conversation: parsed.messages.slice(-12),
            availableActions: ["update_blueprint", "recommend_page", "open_page", "send_recap", "none"],
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "decision_guide_turn",
          schema: responseSchema,
          strict: true,
        },
      },
      temperature: 0.4,
      store: false,
    });

    const output = JSON.parse(extractText(response));
    return res.status(200).json({ visitorId, ...output });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid Decision Guide request", details: error.errors });
    }
    console.error("Decision Guide API error:", error);
    return res.status(500).json({ error: "Failed to generate Decision Guide response" });
  }
}
