import { z } from "zod";
import { ROADMAP_MILESTONES } from "./client-profile";

export const QUALIFY_BUDGET_LANES = ["under_5m", "5m_plus", "prefer_not_yet"] as const;
export type QualifyBudgetLane = (typeof QUALIFY_BUDGET_LANES)[number];

export const QUALIFY_CALL_PURPOSES = [
  "clarity_move",
  "second_opinion",
  "ready_to_search",
  "preapproval_next",
] as const;
export type QualifyCallPurpose = (typeof QUALIFY_CALL_PURPOSES)[number];

export const QUALIFY_SOURCES = ["phone", "site", "chat", "other"] as const;
export type QualifySource = (typeof QUALIFY_SOURCES)[number];

export const QUALIFY_ROUTES = ["raphi_calendar", "diego_handoff", "nurture"] as const;
export type QualifyRoute = (typeof QUALIFY_ROUTES)[number];

export const QUALIFY_STATUSES = ["new", "booked", "handed_off", "closed_out"] as const;
export type QualifyStatus = (typeof QUALIFY_STATUSES)[number];

export const READY_CALL_PURPOSES = new Set<QualifyCallPurpose>([
  "clarity_move",
  "second_opinion",
  "ready_to_search",
  "preapproval_next",
]);

export const PROCESS_STEPS = [
  { n: 1, title: "Situation clarified" },
  { n: 2, title: "Strategy Session held" },
  { n: 3, title: "Financing posture set" },
  { n: 4, title: "Target band chosen" },
  { n: 5, title: "Shortlist ready" },
  { n: 6, title: "Search in motion" },
] as const;

export const PROCESS_PDF_TITLE = "Agent Kammer — How the process works";
export const PROCESS_PDF_PATH = "/process/agent-kammer-how-the-process-works.pdf";
export const PROCESS_PDF_FOOTER =
  "You may already be mid-path. Get Qualified only unlocks the live session when that is the right next move.";

export const BUDGET_LANE_LABELS: Record<QualifyBudgetLane, string> = {
  under_5m: "Under $5 million",
  "5m_plus": "$5 million and above",
  prefer_not_yet: "Prefer not to say yet",
};

export const CALL_PURPOSE_LABELS: Record<QualifyCallPurpose, string> = {
  clarity_move: "Clarity on whether to move",
  second_opinion: "A second opinion",
  ready_to_search: "Ready to search",
  preapproval_next: "Pre-approval is the next step",
};

export const ROUTE_LABELS: Record<QualifyRoute, string> = {
  raphi_calendar: "Strategy Session with Raphi",
  diego_handoff: "Diego Micheo · Douglas Elliman",
  nurture: "Stay in Guidance",
};

/** Lifecycle index for the six public trophies. #2 is never derived from this alone. */
export const PUBLIC_STANDING_INDEX: Record<string, number> = {
  anonymous: 0,
  engaged: 0,
  profiled: 0,
  qualified: 0,
  call_ready: 0,
  advisory_client: 3,
  transaction_ready: 4,
  active_client: 5,
  closed: 5,
  long_term_nurture: 0,
};

export type HubPathProgress = {
  getQualifiedComplete: boolean;
  sessionBooked: boolean;
  strategySessionHeld: boolean;
  qualifyRoute: QualifyRoute | null;
};

export const emptyHubPathProgress = (): HubPathProgress => ({
  getQualifiedComplete: false,
  sessionBooked: false,
  strategySessionHeld: false,
  qualifyRoute: null,
});

export const qualifySubmissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(160),
  email: z.string().trim().email("A valid email is required").max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  budgetLane: z.enum(QUALIFY_BUDGET_LANES),
  callPurpose: z.enum(QUALIFY_CALL_PURPOSES),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.enum(QUALIFY_SOURCES).optional(),
});

export type QualifySubmissionInput = z.infer<typeof qualifySubmissionSchema>;

export function parseQualifySource(raw: unknown): QualifySource {
  if (typeof raw !== "string") return "site";
  const value = raw.trim().toLowerCase();
  if (value === "phone" || value === "site" || value === "chat" || value === "other") return value;
  return "site";
}

export function resolveQualifyRoute(
  budgetLane: QualifyBudgetLane,
  callPurpose: QualifyCallPurpose,
): QualifyRoute {
  if (budgetLane === "prefer_not_yet") return "nurture";
  const ready = READY_CALL_PURPOSES.has(callPurpose);
  if (!ready) return "nurture";
  if (budgetLane === "under_5m") return "diego_handoff";
  return "raphi_calendar";
}

export function initialQualifyStatus(route: QualifyRoute): QualifyStatus {
  if (route === "diego_handoff") return "handed_off";
  return "new";
}

export function nextStepForRoute(route: QualifyRoute): string {
  if (route === "raphi_calendar") {
    return "Reserve a Strategy Session when you are ready. No pressure to book from this page.";
  }
  if (route === "diego_handoff") {
    return "A warm introduction to Diego Micheo at Douglas Elliman is the right next lane.";
  }
  return "Stay with Guidance and your Decision Hub. A live session can wait.";
}

/**
 * Six public Hub checkmarks.
 * Get Qualified is a sub-status on the path to #2 — never a seventh trophy.
 * #2 flips only when a Strategy Session was actually held.
 */
export function publicMilestoneChecks(input: {
  roadmapMilestone?: string | null;
  strategySessionHeld?: boolean;
}): boolean[] {
  const stageKey = input.roadmapMilestone || "";
  const stageIndex =
    stageKey && stageKey in PUBLIC_STANDING_INDEX ? PUBLIC_STANDING_INDEX[stageKey] : -1;
  return ROADMAP_MILESTONES.map((_, index) => {
    if (index === 1) return Boolean(input.strategySessionHeld);
    return index <= stageIndex;
  });
}

