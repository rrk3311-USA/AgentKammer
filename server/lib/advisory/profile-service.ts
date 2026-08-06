import type { ClientProfile, DecisionAction, LifecycleStage } from "@shared/client-profile";
import {
  deriveLifecycle,
  scoreClientProfile,
  shouldSyncOnScoreChange,
  timelineIsUnderSixMonths,
  type ScoringContext,
} from "./lead-scoring";
import {
  appendChatMessage,
  createClientProfile,
  createGoal,
  ensureChatSession,
  ensureVisitor,
  getClientProfileByEmail,
  getClientProfileByVisitorId,
  mergeAnonymousIntoEmailProfile,
  recordProfileEvent,
  rowToClientProfile,
  updateClientProfile,
  writeAuditLog,
} from "./repository";
import { queueProfileSyncBundle } from "./sync-queue";

function asArray(value: string | string[] | null | undefined): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map((v) => v.trim()).filter(Boolean);
  return value
    .split(/[;|]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Map Decision Guide flat profile keys → ClientProfile fields (only when supported). */
export function mapDecisionGuideFlatToProfileUpdates(
  flat: Record<string, string | null | undefined>,
): Partial<ClientProfile> {
  const updates: Partial<ClientProfile> = {};

  if (flat.email?.trim()) updates.email = flat.email.trim().toLowerCase();
  if (flat.phone?.trim()) updates.phone = flat.phone.trim();
  if (flat.situation?.trim()) updates.situation = flat.situation.trim();
  if (flat.desire?.trim()) updates.desiredOutcome = flat.desire.trim();
  if (flat.budget?.trim()) updates.budgetRange = flat.budget.trim();
  if (flat.timeline?.trim()) updates.timeline = flat.timeline.trim();
  if (flat.financingStatus?.trim()) updates.financingStatus = flat.financingStatus.trim();
  if (flat.geography?.trim()) updates.currentLocation = flat.geography.trim();
  if (flat.neighborhoods?.trim()) updates.targetLocations = asArray(flat.neighborhoods);
  if (flat.buildingPreferences?.trim()) updates.propertyTypes = asArray(flat.buildingPreferences);
  if (flat.constraints?.trim()) updates.constraints = asArray(flat.constraints);
  if (flat.tradeOff?.trim()) updates.tradeOffs = asArray(flat.tradeOff);
  if (flat.dealBreakers?.trim()) updates.dealBreakers = asArray(flat.dealBreakers);
  if (flat.decisionMakers?.trim()) updates.decisionMakers = asArray(flat.decisionMakers);
  if (flat.buildingsViewed?.trim()) updates.buildingsViewed = asArray(flat.buildingsViewed);
  if (flat.confidenceReadiness?.trim()) updates.creditReadiness = flat.confidenceReadiness.trim();

  return updates;
}

function applyUpdates(
  current: ReturnType<typeof rowToClientProfile>,
  updates: Partial<ClientProfile>,
): Partial<ClientProfile> {
  const next: Partial<ClientProfile> = {};
  for (const [key, value] of Object.entries(updates) as Array<[keyof ClientProfile, unknown]>) {
    if (value == null) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    const prev = current[key as keyof typeof current];
    if (JSON.stringify(prev) === JSON.stringify(value)) continue;
    (next as Record<string, unknown>)[key] = value;
  }
  return next;
}

export type DecisionGuideTurnResult = {
  profile: ReturnType<typeof rowToClientProfile>;
  profileUpdates: Partial<ClientProfile>;
  leadScore: number;
  lifecycleStage: LifecycleStage;
  shouldSyncToAttio: boolean;
  shouldCreateAdvisorTask: boolean;
  actions: DecisionAction[];
};

export async function processDecisionGuideTurn(input: {
  visitorId: string;
  sessionId?: string;
  pagePath?: string;
  latestMessage: string;
  flatProfile: Record<string, string | null | undefined>;
  conversationSummary?: string;
  messageCount?: number;
  guideActions?: Array<{ type?: string; path?: string | null; reason?: string; label?: string }>;
  callRequested?: boolean;
  assessmentCompleted?: boolean;
  goalToSave?: string;
}): Promise<DecisionGuideTurnResult> {
  await ensureVisitor({
    visitorId: input.visitorId,
    sessionId: input.sessionId,
    email: input.flatProfile.email || undefined,
    phone: input.flatProfile.phone || undefined,
    path: input.pagePath,
  });

  let row = await getClientProfileByVisitorId(input.visitorId);
  if (!row) {
    row = await createClientProfile({
      visitorId: input.visitorId,
      lifecycleStage: "anonymous",
      leadScore: 0,
    });
    await recordProfileEvent(row.id, "profile_created", "Anonymous visitor started Decision Guide");
  }

  // Merge into existing email identity when contact is provided
  const email = input.flatProfile.email?.trim().toLowerCase();
  if (email) {
    const byEmail = await getClientProfileByEmail(email);
    if (byEmail && byEmail.id !== row.id) {
      const merged = await mergeAnonymousIntoEmailProfile(row.id, byEmail.id);
      if (merged) row = merged;
    }
  }

  const current = rowToClientProfile(row);
  const mapped = mapDecisionGuideFlatToProfileUpdates(input.flatProfile);
  if (input.conversationSummary) {
    mapped.lastConversationSummary = input.conversationSummary.slice(0, 4000);
  }

  const callRequested =
    Boolean(input.callRequested) ||
    (input.guideActions ?? []).some((a) => a.type === "request_call") ||
    /request( a | )call|schedule a call|speak with|talk to (an )?advisor/i.test(input.latestMessage);

  const goalAction = (input.guideActions ?? []).find((a) => a.type === "save_goal");
  const goalText = input.goalToSave || (goalAction as { goal?: string } | undefined)?.goal;

  const profileUpdates = applyUpdates(current, mapped);

  const scoringCtx: ScoringContext = {
    visitCount: undefined,
    messageCount: input.messageCount ?? 1,
    assessmentCompleted: input.assessmentCompleted,
    goalSaved: Boolean(goalText),
    callRequested,
    latestMessage: input.latestMessage,
  };

  const tentative = { ...current, ...profileUpdates };
  const breakdown = scoreClientProfile(tentative, scoringCtx);
  const lifecycleStage = deriveLifecycle(tentative, breakdown.leadScore, { callRequested });

  const previousScore = row.leadScore ?? 0;
  const previousTimeline = row.timeline;
  const becameProfiled =
    lifecycleStage === "profiled" ||
    lifecycleStage === "qualified" ||
    lifecycleStage === "call_ready";

  const {
    createdAt: _c,
    updatedAt: _u,
    lastActiveAt: _l,
    visitorId: _v,
    lifecycleStage: _stage,
    leadScore: _score,
    ...safeUpdates
  } = profileUpdates;

  const updated = await updateClientProfile(row.id, {
    ...safeUpdates,
    leadScore: breakdown.leadScore,
    lifecycleStage,
    scoreBreakdown: JSON.stringify(breakdown),
    nextRecommendedAction:
      profileUpdates.nextRecommendedAction ||
      (callRequested
        ? "Advisor consultation"
        : becameProfiled
          ? "Review housing plan"
          : current.nextRecommendedAction),
  });

  const profile = rowToClientProfile(updated ?? row);

  const session = await ensureChatSession({
    clientProfileId: profile.id!,
    visitorId: input.visitorId,
    sessionId: input.sessionId || input.visitorId,
    pagePath: input.pagePath,
  });

  await appendChatMessage({
    sessionId: session.id,
    clientProfileId: profile.id!,
    role: "user",
    content: input.latestMessage,
  });

  if (Object.keys(profileUpdates).length) {
    await recordProfileEvent(
      profile.id!,
      "profile_updated",
      JSON.stringify({ fields: Object.keys(profileUpdates) }),
    );
  }

  if (goalText) {
    await createGoal(profile.id!, goalText);
    await recordProfileEvent(profile.id!, "goal_saved", goalText);
  }

  if (callRequested) {
    await recordProfileEvent(profile.id!, "call_requested", input.latestMessage.slice(0, 500));
  }

  const emailOrPhoneProvided = Boolean(profileUpdates.email || profileUpdates.phone);
  const scoreMaterial = shouldSyncOnScoreChange(previousScore, breakdown.leadScore);
  const timelineChanged =
    Boolean(profileUpdates.timeline) && profileUpdates.timeline !== previousTimeline;
  const shouldSyncToAttio =
    emailOrPhoneProvided ||
    becameProfiled ||
    scoreMaterial ||
    timelineChanged ||
    callRequested ||
    Boolean(input.assessmentCompleted) ||
    Boolean(input.conversationSummary && (emailOrPhoneProvided || becameProfiled));

  const crossedCallReady = previousScore < 80 && breakdown.leadScore >= 80;
  const timelineNowUrgent =
    timelineIsUnderSixMonths(profile.timeline) && !timelineIsUnderSixMonths(previousTimeline);

  const shouldCreateAdvisorTask =
    callRequested || crossedCallReady || timelineNowUrgent || /ready to (act|move|buy|list)/i.test(input.latestMessage);

  if (shouldSyncToAttio) {
    await queueProfileSyncBundle(profile.id!, {
      note: profile.lastConversationSummary
        ? `Decision Guide summary:\n${profile.lastConversationSummary.slice(0, 1500)}`
        : undefined,
      taskContent: shouldCreateAdvisorTask
        ? callRequested
          ? "Call requested lead"
          : crossedCallReady
            ? "Review new qualified profile"
            : timelineNowUrgent
              ? "Follow up - timeline under six months"
              : "Review updated housing goals"
        : undefined,
      taskDedupeKey: shouldCreateAdvisorTask
        ? `task:${profile.id}:${callRequested ? "call" : crossedCallReady ? "score80" : "timeline"}`
        : undefined,
      updateStage: true,
    });
  }

  const actions: DecisionAction[] = [];
  for (const action of input.guideActions ?? []) {
    if (action.type === "open_page" && action.path) {
      actions.push({ type: "open_page", path: action.path });
    } else if (action.type === "recommend_page" && action.path) {
      actions.push({ type: "recommend_page", path: action.path, reason: action.reason || "" });
    } else if (action.type === "send_recap") {
      actions.push({ type: "send_recap" });
    } else if (action.type === "request_call") {
      actions.push({ type: "request_call", reason: action.reason || "Visitor requested a call" });
    } else if (action.type === "request_contact") {
      actions.push({ type: "request_contact", reason: action.reason || "Save progress" });
    } else if (action.type === "save_goal" && goalText) {
      actions.push({ type: "save_goal", goal: goalText });
    } else if (action.type === "schedule_review") {
      actions.push({ type: "schedule_review" });
    }
  }

  if (Object.keys(profileUpdates).length) {
    actions.push({ type: "update_profile", fields: profileUpdates });
  }

  await writeAuditLog({
    actorRole: "system",
    action: "decision_guide_turn",
    resourceType: "client_profile",
    resourceId: profile.id,
    detail: JSON.stringify({ leadScore: breakdown.leadScore, lifecycleStage }),
  });

  return {
    profile,
    profileUpdates,
    leadScore: breakdown.leadScore,
    lifecycleStage,
    shouldSyncToAttio,
    shouldCreateAdvisorTask,
    actions,
  };
}

export async function adminForceResync(profileId: string): Promise<void> {
  await queueProfileSyncBundle(profileId, {
    note: "Manual Attio resync from admin",
    updateStage: true,
  });
  await writeAuditLog({
    actorRole: "admin",
    action: "attio_resync",
    resourceType: "client_profile",
    resourceId: profileId,
  });
}

export async function adminSetLifecycle(
  profileId: string,
  stage: LifecycleStage,
  actorId?: string,
): Promise<ReturnType<typeof rowToClientProfile> | null> {
  const updated = await updateClientProfile(profileId, { lifecycleStage: stage });
  if (!updated) return null;
  await recordProfileEvent(profileId, "lifecycle_manual", stage, "admin", actorId);
  await queueProfileSyncBundle(profileId, { updateStage: true });
  return rowToClientProfile(updated);
}
