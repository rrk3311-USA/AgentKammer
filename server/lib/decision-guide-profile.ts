export const decisionGuideStructuredProfileKeys = [
  "situation",
  "desire",
  "constraints",
  "tradeOff",
  "timeline",
  "budget",
  "financingStatus",
  "industry",
  "household",
  "geography",
  "neighborhoods",
  "buildingPreferences",
  "dealBreakers",
  "decisionMakers",
  "confidenceReadiness",
  "buildingsViewed",
  "reportsViewed",
  "questionsAsked",
  "recommendationHistory",
  "email",
  "phone",
] as const;

export type DecisionGuideStructuredProfileKey = (typeof decisionGuideStructuredProfileKeys)[number];

export type DecisionGuideStructuredField = {
  value: string | null;
  confidence: number;
  source: string | null;
  lastUpdated: string | null;
};

export type DecisionGuideStructuredProfile = Record<DecisionGuideStructuredProfileKey, DecisionGuideStructuredField>;

function emptyField(): DecisionGuideStructuredField {
  return {
    value: null,
    confidence: 0,
    source: null,
    lastUpdated: null,
  };
}

export function createEmptyStructuredProfile(): DecisionGuideStructuredProfile {
  return Object.fromEntries(
    decisionGuideStructuredProfileKeys.map((key) => [key, emptyField()]),
  ) as DecisionGuideStructuredProfile;
}

export function normalizeStructuredProfile(
  input: unknown,
): DecisionGuideStructuredProfile {
  const base = createEmptyStructuredProfile();
  if (!input || typeof input !== "object") return base;

  for (const key of decisionGuideStructuredProfileKeys) {
    const value = (input as Record<string, unknown>)[key];
    if (!value || typeof value !== "object") continue;
    const record = value as Record<string, unknown>;
    base[key] = {
      value: typeof record.value === "string" && record.value.trim() ? record.value.trim() : null,
      confidence:
        typeof record.confidence === "number" && Number.isFinite(record.confidence)
          ? Math.max(0, Math.min(1, record.confidence))
          : 0,
      source: typeof record.source === "string" && record.source.trim() ? record.source.trim() : null,
      lastUpdated:
        typeof record.lastUpdated === "string" && record.lastUpdated.trim()
          ? record.lastUpdated.trim()
          : null,
    };
  }

  return base;
}

export function buildFlatProfileFromStructured(
  profile: DecisionGuideStructuredProfile,
) {
  return Object.fromEntries(
    decisionGuideStructuredProfileKeys.map((key) => [key, profile[key].value]),
  );
}

export function updateStructuredProfile(
  current: DecisionGuideStructuredProfile,
  nextFlatProfile: Record<string, string | null | undefined>,
  latestMessage: string,
  nowIso: string,
): DecisionGuideStructuredProfile {
  const next = normalizeStructuredProfile(current);

  for (const key of decisionGuideStructuredProfileKeys) {
    const value = nextFlatProfile[key];
    if (typeof value !== "string" || !value.trim()) continue;
    const trimmed = value.trim();
    const previous = next[key];
    const changed = previous.value !== trimmed;

    next[key] = {
      value: trimmed,
      confidence: changed ? inferConfidenceForField(key, trimmed) : Math.max(previous.confidence, inferConfidenceForField(key, trimmed)),
      source: changed ? latestMessage : previous.source || latestMessage,
      lastUpdated: changed ? nowIso : previous.lastUpdated || nowIso,
    };
  }

  return next;
}

function inferConfidenceForField(
  key: DecisionGuideStructuredProfileKey,
  value: string,
) {
  if (!value.trim()) return 0;
  if (key === "email" || key === "phone") return 0.98;
  if (key === "budget" || key === "timeline" || key === "financingStatus") return 0.86;
  if (key === "situation" || key === "desire" || key === "constraints" || key === "tradeOff") return 0.82;
  return 0.72;
}
