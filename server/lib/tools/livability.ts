import OpenAI from "openai";
import {
  listingLooksResidential,
  validateLivabilityInput,
  type LivabilityDimensions,
  type LivabilityInput,
  type LivabilityResult,
} from "@shared/tools";

const DIMENSION_KEYS: Array<keyof LivabilityDimensions> = [
  "walkability",
  "quiet",
  "light",
  "amenities",
  "belonging",
  "transit",
];

function clamp(value: number, min = 42, max = 96) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function dimFromSeed(seed: number, salt: number, base: number): number {
  const swing = ((seed + salt * 997) % 23) - 11;
  return clamp(base + swing);
}

const WALKABLE = /west village|east village|soho|tribeca|chelsea|park slope|brooklyn heights|cobble hill|greenwich village|upper west|ues|nolita|battery park|hudson yards|williamsburg|fort greene/i;
const QUIETER = /sutton|beekman|carnegie hill|riverdale|forest hills|park slope|brooklyn heights|gramercy|murray hill|yorkville/i;
const TRANSIT_RICH = /union square|times square|herald square|fulton|atlantic|columbus circle|grand central|34th|42nd|lexington/i;

export function computeHeuristicLivability(input: LivabilityInput): LivabilityResult {
  const address = (input.address || "").trim();
  const listingUrl = (input.listingUrl || "").trim();
  const imageCount = input.images?.length || 0;
  const seed = hashSeed(`${address}|${listingUrl}|${imageCount}|${input.notes || ""}`);

  let walk = 68;
  let quiet = 64;
  let light = 66;
  let amenities = 63;
  let belonging = 70;
  let transit = 67;

  if (WALKABLE.test(address) || WALKABLE.test(listingUrl)) {
    walk += 12;
    transit += 8;
    belonging += 6;
  }
  if (QUIETER.test(address)) {
    quiet += 14;
    light += 6;
  }
  if (TRANSIT_RICH.test(address) || TRANSIT_RICH.test(listingUrl)) {
    transit += 14;
    quiet -= 8;
  }
  if (listingLooksResidential(listingUrl)) {
    amenities += 5;
    belonging += 3;
  }
  if (imageCount > 0) {
    light += 4;
    amenities += 3;
  }
  if (/studio|1br|one bedroom/i.test(`${address} ${input.notes || ""}`)) {
    light += 2;
    amenities -= 2;
  }

  const dimensions: LivabilityDimensions = {
    walkability: dimFromSeed(seed, 1, walk),
    quiet: dimFromSeed(seed, 2, quiet),
    light: dimFromSeed(seed, 3, light),
    amenities: dimFromSeed(seed, 4, amenities),
    belonging: dimFromSeed(seed, 5, belonging),
    transit: dimFromSeed(seed, 6, transit),
  };

  const score = clamp(
    Math.round(
      dimensions.walkability * 0.18 +
        dimensions.quiet * 0.16 +
        dimensions.light * 0.14 +
        dimensions.amenities * 0.14 +
        dimensions.belonging * 0.22 +
        dimensions.transit * 0.16,
    ),
  );

  const notes = [
    address
      ? `Read from the address as given: ${address}.`
      : "No street address — score leans on the listing and/or photos.",
    listingUrl
      ? "Listing link used as context only. Marketing copy is discounted."
      : "No listing link. Neighborhood texture is inferred from the address or photos.",
    imageCount
      ? `${imageCount} photo${imageCount === 1 ? "" : "s"} received. Light and finish are weighted a little more.`
      : "No photos. Light and finish stay conservative.",
  ];

  const caveats = [
    "This is a livability read, not a condition report and not a transaction recommendation.",
    "The highest-value next step may still be to stay put.",
  ];

  let summary: string;
  if (score >= 82) {
    summary =
      "This place looks easy to live in day to day — movement, quiet, and a sense of fit are in range. Confirm the household’s actual hours and noise tolerance before treating the number as settled.";
  } else if (score >= 70) {
    summary =
      "A workable home with a few trade-offs. The question is not whether it is ‘nice,’ but whether the weaker dimensions (quiet, light, or transit) match how this household actually lives.";
  } else {
    summary =
      "The listing may photograph well and still live harder than it looks. Pause on the weaker dimensions before spending more attention on price or finishes.";
  }

  return {
    mode: "demo",
    score,
    summary,
    dimensions,
    notes,
    caveats,
    inputsUsed: {
      address: Boolean(address),
      listing: Boolean(listingUrl),
      images: imageCount,
    },
  };
}

function parseModelResult(raw: string, fallback: LivabilityResult): LivabilityResult {
  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd <= jsonStart) return fallback;
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as Partial<LivabilityResult> & {
      dimensions?: Partial<LivabilityDimensions>;
    };
    const dimensions = { ...fallback.dimensions };
    for (const key of DIMENSION_KEYS) {
      const value = parsed.dimensions?.[key];
      if (typeof value === "number") dimensions[key] = clamp(value);
    }
    const score =
      typeof parsed.score === "number"
        ? clamp(parsed.score)
        : clamp(Math.round(Object.values(dimensions).reduce((sum, n) => sum + n, 0) / 6));
    return {
      mode: "model",
      score,
      summary:
        typeof parsed.summary === "string" && parsed.summary.trim()
          ? parsed.summary.trim().slice(0, 600)
          : fallback.summary,
      dimensions,
      notes: Array.isArray(parsed.notes)
        ? parsed.notes.filter((item): item is string => typeof item === "string").slice(0, 5)
        : fallback.notes,
      caveats: Array.isArray(parsed.caveats)
        ? parsed.caveats.filter((item): item is string => typeof item === "string").slice(0, 4)
        : fallback.caveats,
      inputsUsed: fallback.inputsUsed,
    };
  } catch {
    return fallback;
  }
}

function createModelClient(): OpenAI | null {
  const apiKey =
    process.env.XAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.XAI_API_KEY ? "https://api.x.ai/v1" : process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  });
}

export async function runLivabilityPipeline(input: LivabilityInput): Promise<LivabilityResult> {
  const validated = validateLivabilityInput(input);
  if (!validated.ok) {
    throw new Error(validated.errors[0] || "Invalid livability input");
  }

  const heuristic = computeHeuristicLivability(validated.input);
  const client = createModelClient();
  if (!client) return heuristic;

  try {
    const model = process.env.XAI_API_KEY
      ? process.env.DECISION_GUIDE_MODEL || "grok-4.3"
      : process.env.OPENAI_MODEL || process.env.DECISION_GUIDE_MODEL || "gpt-4o-mini";

    const imageNote = validated.input.images
      .map((image, index) => `Photo ${index + 1}: ${image.name} (${image.mime}, ${image.size} bytes)`)
      .join("\n");

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a housing livability analyst for Agent Kammer. Diagnose how a residence lives — walkability, quiet, light, amenities, belonging, transit. Never pitch inspections, IBCC, contractors, or repairs. Never urge a purchase. The recommendation may be to stay put. Return JSON only: {score, summary, dimensions:{walkability,quiet,light,amenities,belonging,transit}, notes[], caveats[]}. Scores 0-100.",
        },
        {
          role: "user",
          content: [
            `Address: ${validated.input.address || "(none)"}`,
            `Listing: ${validated.input.listingUrl || "(none)"}`,
            `Notes: ${validated.input.notes || "(none)"}`,
            imageNote || "Photos: none",
            `Heuristic baseline: ${JSON.stringify(heuristic.dimensions)} overall ${heuristic.score}`,
          ].join("\n"),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    return parseModelResult(text, { ...heuristic, mode: "model" });
  } catch (error) {
    console.error("[livability] model path failed, using demo result", error);
    return heuristic;
  }
}
