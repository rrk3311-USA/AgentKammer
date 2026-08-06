import { z } from "zod";
import type { LifecycleStage } from "@shared/client-profile";
import {
  createClientProfile,
  ensureVisitor,
  getClientProfileByEmail,
  updateClientProfile,
} from "./repository";
import { queueProfileSyncBundle } from "./sync-queue";
import { notifyContactSubmission } from "../../contact-notify";

/**
 * International strategy forms feed Advisor OS (client_profiles → Attio),
 * not a generic contact inbox. Email notify is a side-channel for ops.
 */

export const internationalStrategySchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(320),
  country: z.string().min(1).max(120),
  city: z.string().max(120).optional().nullable(),
  preferredLanguage: z.string().min(1).max(80),
  contactMethod: z.string().min(1).max(40),
  contactDetail: z.string().max(200).optional().nullable(),
  buyingGoal: z.string().min(1).max(120),
  budget: z.string().min(1).max(80),
  timeline: z.string().min(1).max(80),
  financing: z.string().min(1).max(80),
  neighborhoods: z.array(z.string().max(80)).max(20).optional().default([]),
  helpUnderstanding: z.string().max(4000).optional().nullable(),
  howFound: z.string().max(200).optional().nullable(),
  /** Lower-friction ask - many 6-18 month buyers want a roadmap, not a call. */
  wantRoadmap: z.boolean().optional().default(false),
  sourcePage: z.string().max(200).optional().nullable(),
  countrySlug: z.string().max(40).optional().nullable(),
  referrer: z.string().max(500).optional().nullable(),
  utmSource: z.string().max(120).optional().nullable(),
  utmMedium: z.string().max(120).optional().nullable(),
  utmCampaign: z.string().max(120).optional().nullable(),
  landingLanguage: z.string().max(40).optional().nullable(),
});

export type InternationalStrategyInput = z.infer<typeof internationalStrategySchema>;

export type IntlLeadStatus =
  | "Ready for Call"
  | "Qualified Nurture"
  | "Early Research"
  | "Needs Referral"
  | "Spam / Low Intent";

export type IntlNextAction =
  | "Schedule Housing Strategy Session"
  | "Send Manhattan Buying Roadmap"
  | "Send condo vs. co-op guide"
  | "Introduce lender"
  | "Introduce attorney"
  | "Follow up in 30 days"
  | "Language-match specialist follow-up"
  | "No action";

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function budgetPoints(budget: string): number {
  if (budget.includes("10M")) return 25;
  if (budget.includes("5M")) return 22;
  if (budget.includes("3M")) return 18;
  if (budget.includes("1M")) return 12;
  return 4;
}

function timelinePoints(timeline: string): number {
  const t = timeline.toLowerCase();
  if (t.includes("ready now") || t.includes("within 3")) return 25;
  if (t.includes("3-6") || t.includes("3-6")) return 18;
  if (t.includes("6-12") || t.includes("6-12")) return 10;
  if (t.includes("more than") || t.includes("researching")) return 4;
  return 8;
}

function classifyLead(data: InternationalStrategyInput): {
  status: IntlLeadStatus;
  leadScore: number;
  lifecycleStage: LifecycleStage;
  nextAction: IntlNextAction;
  aiSummary: string;
} {
  let score = 20;
  score += budgetPoints(data.budget);
  score += timelinePoints(data.timeline);
  if (data.neighborhoods?.length && !data.neighborhoods.includes("Not sure yet")) score += 8;
  if ((data.helpUnderstanding || "").trim().length > 40) score += 10;
  if (data.financing === "Cash purchase" || data.financing === "Both options") score += 6;
  if (data.wantRoadmap) score += 4;
  if ((data.helpUnderstanding || "").toLowerCase().includes("http") && (data.helpUnderstanding || "").length < 30) {
    score -= 40;
  }
  score = Math.max(0, Math.min(100, score));

  const urgent =
    /ready now|within 3/i.test(data.timeline) &&
    (data.budget.includes("3M") || data.budget.includes("5M") || data.budget.includes("10M"));

  let status: IntlLeadStatus;
  let lifecycleStage: LifecycleStage;
  let nextAction: IntlNextAction;

  if (score < 20) {
    status = "Spam / Low Intent";
    lifecycleStage = "inactive";
    nextAction = "No action";
  } else if (urgent && score >= 70) {
    status = "Ready for Call";
    lifecycleStage = "call_ready";
    nextAction = "Schedule Housing Strategy Session";
  } else if (data.wantRoadmap && /6-12|6-12|more than|researching/i.test(data.timeline)) {
    status = "Early Research";
    lifecycleStage = "engaged";
    nextAction = "Send Manhattan Buying Roadmap";
  } else if (score >= 55) {
    status = "Qualified Nurture";
    lifecycleStage = "qualified";
    nextAction = data.wantRoadmap
      ? "Send Manhattan Buying Roadmap"
      : "Language-match specialist follow-up";
  } else if (/financing|mortgage|lender/i.test(data.helpUnderstanding || "")) {
    status = "Needs Referral";
    lifecycleStage = "profiled";
    nextAction = "Introduce lender";
  } else if (/attorney|lawyer|tax|llc/i.test(data.helpUnderstanding || "")) {
    status = "Needs Referral";
    lifecycleStage = "profiled";
    nextAction = "Introduce attorney";
  } else if (/condo|co-op|coop/i.test(data.helpUnderstanding || "")) {
    status = "Early Research";
    lifecycleStage = "engaged";
    nextAction = "Send condo vs. co-op guide";
  } else {
    status = "Early Research";
    lifecycleStage = "engaged";
    nextAction = data.wantRoadmap ? "Send Manhattan Buying Roadmap" : "Follow up in 30 days";
  }

  const neighborhoods =
    data.neighborhoods?.filter((n) => n !== "Not sure yet").join(" and ") || "Manhattan broadly";
  const concern = (data.helpUnderstanding || "").trim() || "general process clarity";
  const aiSummary = [
    `Buyer from ${data.country} researching a ${data.budget} Manhattan purchase (${data.buyingGoal}).`,
    `Timeline: ${data.timeline}. Financing: ${data.financing}.`,
    `Neighborhood focus: ${neighborhoods}.`,
    `Primary concern: ${concern.slice(0, 180)}.`,
    data.wantRoadmap ? "Requested a personalized Manhattan Buying Roadmap." : null,
    `Preferred language: ${data.preferredLanguage}. Status: ${status}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return { status, leadScore: score, lifecycleStage, nextAction, aiSummary };
}

function buildOpsMessage(
  data: InternationalStrategyInput,
  classified: ReturnType<typeof classifyLead>,
): string {
  return [
    "International Manhattan Strategy Request → Advisor OS profile",
    `Status: ${classified.status} · Score: ${classified.leadScore}`,
    `Next action: ${classified.nextAction}`,
    `Language: ${data.preferredLanguage} - assign matching specialist`,
    "",
    classified.aiSummary,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    data.city ? `City: ${data.city}` : null,
    `Contact: ${data.contactMethod}${data.contactDetail ? ` · ${data.contactDetail}` : ""}`,
    `Goal: ${data.buyingGoal}`,
    `Budget: ${data.budget} · Timeline: ${data.timeline} · Financing: ${data.financing}`,
    data.neighborhoods?.length ? `Neighborhoods: ${data.neighborhoods.join(", ")}` : null,
    data.helpUnderstanding ? `Biggest question: ${data.helpUnderstanding}` : null,
    `Want roadmap: ${data.wantRoadmap ? "Yes" : "No"}`,
    data.howFound ? `How found: ${data.howFound}` : null,
    data.sourcePage ? `Landing page: ${data.sourcePage}` : null,
    data.countrySlug ? `Country page: ${data.countrySlug}` : null,
    data.landingLanguage ? `Language version: ${data.landingLanguage}` : null,
    data.referrer ? `Referrer: ${data.referrer}` : null,
    [data.utmSource, data.utmMedium, data.utmCampaign].some(Boolean)
      ? `UTM: ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(" / ")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Persist to client_profiles + Attio queue; email is notify-only. */
export async function ingestInternationalStrategyRequest(raw: unknown) {
  const data = internationalStrategySchema.parse(raw);
  const email = data.email.trim().toLowerCase();
  const { firstName, lastName } = splitName(data.fullName);
  const classified = classifyLead(data);
  const message = buildOpsMessage(data, classified);
  const visitorId = `intl_${email.replace(/[^a-z0-9]/gi, "_").slice(0, 48)}`;

  await ensureVisitor({ visitorId, email, path: data.sourcePage || "/international" });

  const situation = `International buyer · ${data.country} · ${data.buyingGoal}`;
  const scoreBreakdown = JSON.stringify({
    channel: "international_strategy_form",
    leadStatus: classified.status,
    nextAction: classified.nextAction,
    preferredLanguage: data.preferredLanguage,
    contactMethod: data.contactMethod,
    wantRoadmap: Boolean(data.wantRoadmap),
    howFound: data.howFound || null,
    sourcePage: data.sourcePage || null,
    countrySlug: data.countrySlug || null,
    landingLanguage: data.landingLanguage || data.preferredLanguage,
    referrer: data.referrer || null,
    utm: {
      source: data.utmSource || null,
      medium: data.utmMedium || null,
      campaign: data.utmCampaign || null,
    },
    leadScore: classified.leadScore,
    submittedAt: new Date().toISOString(),
  });

  let profile = await getClientProfileByEmail(email);
  const payload = {
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    phone: data.contactDetail || null,
    situation,
    desiredOutcome: data.wantRoadmap
      ? `${data.buyingGoal} · Requested Manhattan Buying Roadmap`
      : data.buyingGoal,
    budgetRange: data.budget,
    timeline: data.timeline,
    financingStatus: data.financing,
    currentLocation: data.country,
    targetLocations: data.neighborhoods?.length ? data.neighborhoods : null,
    nextRecommendedAction: `${classified.nextAction} · Speak ${data.preferredLanguage}`,
    lastConversationSummary: classified.aiSummary,
    internalAdvisorSummary: message.slice(0, 4000),
    lifecycleStage: classified.lifecycleStage,
    leadScore: classified.leadScore,
    scoreBreakdown,
  };

  if (!profile) {
    profile = await createClientProfile({
      visitorId,
      email,
      ...payload,
    });
  } else {
    profile = await updateClientProfile(profile.id, payload);
  }

  const taskContent =
    classified.nextAction === "No action"
      ? null
      : `Intl lead (${classified.status}): ${classified.nextAction} - ${data.fullName} [${data.preferredLanguage}]`;

  await queueProfileSyncBundle(profile!.id, {
    updateStage: true,
    note: message.slice(0, 2000),
    taskContent: taskContent || undefined,
    taskDedupeKey: taskContent ? `intl_strategy:${profile!.id}` : undefined,
  });

  await notifyContactSubmission({
    name: data.fullName,
    email,
    phone: data.contactDetail || undefined,
    message,
  });

  return {
    ok: true as const,
    profileId: profile!.id,
    leadStatus: classified.status,
    nextAction: classified.nextAction,
    message:
      "A specialist who speaks your language will get in touch to review your goals and recommend the next step.",
  };
}
