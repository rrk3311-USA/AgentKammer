import type { BiBuyerProfile, BiPreferenceEvent, BiBuyerAversion, BiProperty } from "@shared/schema-buyer-intel";

export const MATCH_MODEL = "rules-v1";

export type MatchInput = {
  profile: Pick<
    BiBuyerProfile,
    "budgetMinCents" | "budgetMaxCents" | "propertyType" | "bedsMin" | "bathsMin" | "sqftMin"
  >;
  neighborhoods: string[];
  preferences: Pick<
    BiPreferenceEvent,
    "origin" | "category" | "preference" | "importance" | "hardRequirement" | "polarity"
  >[];
  aversions: Pick<BiBuyerAversion, "issue" | "severity" | "category">[];
  property: Pick<
    BiProperty,
    "askPriceCents" | "beds" | "baths" | "sqft" | "floor" | "address"
  > & {
    neighborhoodSlug?: string | null;
    ownershipForm?: string | null;
    attributes: Record<string, string>;
  };
};

export type MatchResult = {
  matchScore: number;
  recommendation: "show" | "maybe" | "hold" | "do_not_show";
  reasoning: string;
};

function num(v: string | number | null | undefined): number | null {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function textBlob(property: MatchInput["property"]): string {
  return [
    property.address,
    property.neighborhoodSlug,
    ...Object.values(property.attributes),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function scoreBuyerPropertyMatch(input: MatchInput): MatchResult {
  const reasons: string[] = [];
  let score = 55;
  const blob = textBlob(input.property);
  const ask = input.property.askPriceCents ?? null;
  const min = input.profile.budgetMinCents;
  const max = input.profile.budgetMaxCents;

  if (ask != null && min != null && ask < min * 0.7) {
    reasons.push("Ask is far below stated budget (possible mismatch).");
    score -= 8;
  }
  if (ask != null && max != null && ask > max * 1.12) {
    reasons.push("Ask is above budget.");
    return { matchScore: 12, recommendation: "do_not_show", reasoning: reasons.join(" ") };
  }

  const form = input.property.ownershipForm || "unknown";
  if (input.profile.propertyType !== "unknown" && form !== "unknown" && form !== input.profile.propertyType) {
    reasons.push(`Ownership form ${form} vs profile ${input.profile.propertyType}.`);
    score -= 18;
  }

  const hood = (input.property.neighborhoodSlug || "").toLowerCase();
  if (hood && input.neighborhoods.some((n) => n.toLowerCase() === hood || hood.includes(n.toLowerCase()))) {
    score += 12;
    reasons.push(`In preferred neighborhood (${input.property.neighborhoodSlug}).`);
  } else if (input.neighborhoods.length && hood) {
    score -= 6;
    reasons.push("Outside named neighborhoods.");
  }

  const beds = num(input.property.beds);
  const bedsMin = num(input.profile.bedsMin);
  if (beds != null && bedsMin != null && beds + 0.01 < bedsMin) {
    reasons.push("Below minimum beds.");
    score -= 14;
  }
  const baths = num(input.property.baths);
  const bathsMin = num(input.profile.bathsMin);
  if (baths != null && bathsMin != null && baths + 0.01 < bathsMin) {
    reasons.push("Below minimum baths.");
    score -= 10;
  }
  if (input.profile.sqftMin && input.property.sqft && input.property.sqft < input.profile.sqftMin) {
    reasons.push("Below minimum square footage.");
    score -= 10;
  }

  for (const a of input.aversions) {
    const needle = a.issue.toLowerCase();
    if (needle.length > 3 && blob.includes(needle)) {
      if (a.severity === "dealbreaker") {
        return {
          matchScore: 5,
          recommendation: "do_not_show",
          reasoning: `Dealbreaker hit: ${a.issue}.`,
        };
      }
      score -= a.severity === "strong" ? 16 : 8;
      reasons.push(`Aversion: ${a.issue}.`);
    }
  }

  const currentPref = latestByKey(input.preferences);
  for (const p of currentPref) {
    if (p.polarity === "avoid") continue;
    const hit = preferenceHits(p.preference, p.category, input.property, blob);
    if (p.hardRequirement && !hit) {
      return {
        matchScore: 8,
        recommendation: "do_not_show",
        reasoning: `Missing must-have: ${p.preference}.`,
      };
    }
    if (hit) {
      score += p.hardRequirement ? 8 : 4;
      reasons.push(`Hits ${p.origin} want: ${p.preference}.`);
    }
  }

  const statedView = currentPref.find((p) => p.category === "view" && p.origin === "stated");
  const observedView = currentPref.find(
    (p) => p.category === "view" && (p.origin === "observed" || p.origin === "inferred"),
  );
  const highFloor = (input.property.floor ?? 0) >= 15 || /high.?floor|view/.test(blob);
  if (statedView && Number(statedView.importance ?? 0) <= 2 && highFloor && observedView) {
    score += 10;
    reasons.push("Observed/inferred view importance despite stated low interest.");
  } else if (highFloor && observedView) {
    score += 6;
    reasons.push("High floor / view aligns with observed preference.");
  }

  score = Math.max(0, Math.min(100, score));
  const recommendation =
    score >= 72 ? "show" : score >= 48 ? "maybe" : score >= 28 ? "hold" : "do_not_show";
  if (!reasons.length) reasons.push("Neutral fit on available facts.");
  return { matchScore: Math.round(score * 100) / 100, recommendation, reasoning: reasons.join(" ") };
}

function latestByKey(prefs: MatchInput["preferences"]): MatchInput["preferences"] {
  const map = new Map<string, MatchInput["preferences"][number]>();
  for (const p of prefs) {
    const key = `${p.origin}|${p.category}|${p.preference.toLowerCase()}`;
    map.set(key, p);
  }
  return Array.from(map.values());
}

function preferenceHits(
  preference: string,
  category: string,
  property: MatchInput["property"],
  blob: string,
): boolean {
  const p = preference.toLowerCase();
  if (category === "floor" || /high floor/.test(p)) {
    if ((property.floor ?? 0) >= 12) return true;
  }
  if (category === "size" || /1,?800|1800|sqft/.test(p)) {
    if ((property.sqft ?? 0) >= 1800) return true;
  }
  if (category === "building" && /doorman|modern/.test(p) && blob.includes(p.split(" ")[0] || p)) return true;
  return blob.includes(p) || Object.values(property.attributes).some((v) => v.toLowerCase().includes(p));
}
