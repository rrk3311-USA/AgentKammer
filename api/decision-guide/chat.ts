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
  timeline: z.string().optional(),
  budget: z.string().optional(),
  industry: z.string().optional(),
  household: z.string().optional(),
  neighborhoods: z.string().optional(),
  buildingPreferences: z.string().optional(),
  buildingsViewed: z.string().optional(),
  reportsViewed: z.string().optional(),
  questionsAsked: z.string().optional(),
  recommendationHistory: z.string().optional(),
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
  visitorState: z
    .object({
      navigationHistory: z.array(z.string()).optional(),
    })
    .optional(),
});

const profileKeys = [
  "situation",
  "desire",
  "constraints",
  "tradeOff",
  "timeline",
  "budget",
  "industry",
  "household",
  "neighborhoods",
  "buildingPreferences",
  "buildingsViewed",
  "reportsViewed",
  "questionsAsked",
  "recommendationHistory",
  "email",
  "phone",
] as const;

function responseProfileProperties() {
  return Object.fromEntries(profileKeys.map((key) => [key, { type: ["string", "null"] }]));
}

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "profile", "actions", "leadQualification"],
  properties: {
    reply: { type: "string" },
    profile: {
      type: "object",
      additionalProperties: false,
      required: profileKeys,
      properties: responseProfileProperties(),
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

  const apiKey = process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Decision Guide AI is not configured" });
  }

  try {
    const visitorId = getVisitorId(req, res);
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const parsed = requestSchema.parse(body);
    const openai = new OpenAI({
      apiKey,
      baseURL: process.env.XAI_API_KEY ? "https://api.x.ai/v1" : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });
    const defaultModel = process.env.XAI_API_KEY ? "grok-4.3" : "gpt-4o-mini";

    const instructions = [
      "You are Raphi, Agent Kammer's Decision Guide for Manhattan housing decisions.",
      "You are a trusted Manhattan housing strategist sitting beside the visitor while they browse.",
      "Never sound like a chatbot, CRM, lead form, or customer support.",
      "Hide the technology. Show guidance.",
      "Use this framework: TRIGGER -> DESIRE -> CONSTRAINTS -> TRADE-OFFS -> RECOMMENDATION.",
      "The visitor does not wake up wanting a Decision Blueprint. They wake up thinking they do not know what to do.",
      "Most visitors do not know what they want. Lead the conversation for them.",
      "Give value first: interpret what their answer means, explain why it matters, state the likely next move, then offer one simple next step.",
      "Do not ask discovery questions in a row. Ask at most one question per reply.",
      "Avoid broad questions like 'what do you want?' or 'what matters most?' unless you give clear options.",
      "When information is missing, infer a practical default and say what you would check next.",
      "Prefer guidance over interrogation: 'I would start with timeline because it decides rent vs buy' is better than 'what is your timeline and budget?'",
      "For vague visitors, give two or three starting choices and recommend one. Example: 'I would start with timeline. If this is under three years, renting deserves serious weight.'",
      "Never gate basic guidance behind contact information.",
      "Ask for email or phone only for a clear deliverable like saving progress, sending a recap, delivering reports, scheduling review, or arranging an introduction.",
      "If asking for contact, explain exactly what they will receive.",
      "When you have a useful trigger plus at least one meaningful detail, you may offer: 'I can send you a short recap with the relevant brief, what I would check next, and the recommendation so far. What email should I use?'",
      "The recap offer must feel earned. Put it after guidance, never before.",
      "Do not expose raw system updates like 'timeline updated' or 'profile saved'. Say human things like 'That helps me understand your situation much better.'",
      "Qualification is invisible. Do not show scores to the visitor.",
      "Maintain a structured decision profile covering life event, desires, constraints, timeline, budget, industry, household, neighborhoods, building preferences, buildings viewed, reports viewed, questions asked, and recommendation history.",
      "Use page metadata to guide navigation. If you recommend or open a page, explain why in one sentence.",
      "Keep replies alive and short: 45 to 95 words unless the visitor asks for detail.",
      "Return concise advisor guidance and structured actions for the UI.",
    ].join("\n");

    const response = await openai.responses.create({
      model: process.env.DECISION_GUIDE_MODEL || process.env.OPENAI_MODEL || defaultModel,
      input: [
        { role: "developer", content: instructions },
        {
          role: "user",
          content: JSON.stringify({
            visitorId,
            currentPage: parsed.pageContext,
            navigationHistory: parsed.visitorState?.navigationHistory ?? [],
            currentProfile: parsed.profile,
            leadScore: parsed.leadScore ?? 0,
            latestMessage: parsed.latestMessage,
            conversation: parsed.messages.slice(-12),
            availableActions: ["update_blueprint", "recommend_page", "open_page", "send_recap", "none"],
            actionRules: {
              update_blueprint: "Use when new decision information was learned, but do not announce mechanics to the visitor.",
              recommend_page: "Use when a relevant page should be suggested after you give guidance.",
              open_page: "Use when the next page is clearly helpful. Do not say 'I am opening'; just give the reason.",
              send_recap: "Use only after useful guidance has been delivered. If no email is known, ask for it in the reply and explain the recap/recommendation deliverable.",
            },
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
      temperature: 0.55,
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
