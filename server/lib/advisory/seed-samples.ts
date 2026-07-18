import {
  appendChatMessage,
  createClientProfile,
  createGoal,
  ensureChatSession,
  ensureVisitor,
  getClientProfileByVisitorId,
  listClientProfiles,
  recordProfileEvent,
  updateClientProfile,
} from "./repository";
import { deriveLifecycle, scoreClientProfile } from "./lead-scoring";

const samples = [
  {
    visitorId: "akv_seed_relocating_001",
    email: "jordan.lee@example.com",
    firstName: "Jordan",
    lastName: "Lee",
    situation: "Corporate relocation to NYC this fall",
    desiredOutcome: "Find a calm family neighborhood with school options",
    timeline: "3-6 months",
    currentLocation: "Austin, TX",
    targetLocations: ["Upper West Side", "Park Slope"],
    budgetRange: "$1.6–2.1M",
    financingStatus: "Pre-approval in progress",
    message: "We're relocating for work and unsure where we'll feel at home.",
  },
  {
    visitorId: "akv_seed_downsizing_002",
    email: "morgan.chen@example.com",
    firstName: "Morgan",
    lastName: "Chen",
    situation: "Considering downsizing after adult children moved out",
    desiredOutcome: "Simpler primary home without rushing a sale",
    timeline: "6-12 months",
    currentLocation: "Westchester",
    targetLocations: ["Brooklyn Heights", "Tribeca"],
    budgetRange: "Flexible",
    financingStatus: "Cash / portfolio",
    message: "We may do nothing this year — want a clear plan either way.",
  },
  {
    visitorId: "akv_seed_callready_003",
    email: "sam.rivera@example.com",
    firstName: "Sam",
    lastName: "Rivera",
    phone: "2125550144",
    situation: "Need to sell current co-op and buy in the same season",
    desiredOutcome: "Coordinated sale + purchase with clear next steps",
    timeline: "1-3 months",
    currentLocation: "Upper East Side",
    targetLocations: ["Tribeca", "West Village"],
    budgetRange: "$2.5–3.5M",
    financingStatus: "Pre-approved",
    message: "I'd like to request a call — we're ready to move this quarter.",
    callRequested: true,
  },
  {
    visitorId: "akv_seed_anonymous_004",
    situation: "Exploring whether to rent or buy",
    desiredOutcome: "Understand tradeoffs before committing",
    timeline: "Exploring",
    message: "What's changing is my lease is up next year.",
  },
];

export async function seedAdvisorySamples(): Promise<{
  created: number;
  updated: number;
  total: number;
  clients: Array<{ id: string; visitorId: string; email?: string | null; leadScore: number; lifecycleStage: string }>;
}> {
  let created = 0;
  let updated = 0;
  const clients: Array<{
    id: string;
    visitorId: string;
    email?: string | null;
    leadScore: number;
    lifecycleStage: string;
  }> = [];

  for (const sample of samples) {
    await ensureVisitor({
      visitorId: sample.visitorId,
      path: "/belonging",
      email: sample.email,
    });
    let row = await getClientProfileByVisitorId(sample.visitorId);
    if (!row) {
      row = await createClientProfile({
        visitorId: sample.visitorId,
        email: sample.email,
        phone: sample.phone,
        firstName: sample.firstName,
        lastName: sample.lastName,
        situation: sample.situation,
        desiredOutcome: sample.desiredOutcome,
        timeline: sample.timeline,
        currentLocation: sample.currentLocation,
        targetLocations: sample.targetLocations,
        budgetRange: sample.budgetRange,
        financingStatus: sample.financingStatus,
        lifecycleStage: "anonymous",
        leadScore: 0,
        lastConversationSummary: sample.message,
      });
      created += 1;
    } else {
      updated += 1;
    }

    const breakdown = scoreClientProfile(
      {
        visitorId: sample.visitorId,
        email: sample.email,
        phone: sample.phone,
        firstName: sample.firstName,
        lastName: sample.lastName,
        situation: sample.situation,
        desiredOutcome: sample.desiredOutcome,
        timeline: sample.timeline,
        currentLocation: sample.currentLocation,
        targetLocations: sample.targetLocations,
        budgetRange: sample.budgetRange,
        financingStatus: sample.financingStatus,
        lifecycleStage: "anonymous",
      },
      {
        messageCount: 4,
        visitCount: 3,
        latestMessage: sample.message,
        callRequested: Boolean(sample.callRequested),
        assessmentCompleted: Boolean(sample.email),
        goalSaved: true,
      },
    );
    const stage = deriveLifecycle(
      {
        email: sample.email,
        lifecycleStage: "anonymous",
      },
      breakdown.leadScore,
      { callRequested: Boolean(sample.callRequested) },
    );

    row =
      (await updateClientProfile(row.id, {
        email: sample.email,
        phone: sample.phone,
        firstName: sample.firstName,
        lastName: sample.lastName,
        situation: sample.situation,
        desiredOutcome: sample.desiredOutcome,
        timeline: sample.timeline,
        currentLocation: sample.currentLocation,
        targetLocations: sample.targetLocations,
        budgetRange: sample.budgetRange,
        financingStatus: sample.financingStatus,
        leadScore: breakdown.leadScore,
        lifecycleStage: stage,
        scoreBreakdown: JSON.stringify(breakdown),
        lastConversationSummary: sample.message,
        nextRecommendedAction: sample.callRequested
          ? "Call requested lead"
          : sample.email
            ? "Prepare consultation brief"
            : "Continue Decision Guide",
        internalAdvisorSummary: "Seed sample — safe for local demo.",
      })) ?? row;

    const session = await ensureChatSession({
      clientProfileId: row.id,
      visitorId: sample.visitorId,
      sessionId: `${sample.visitorId}-seed`,
      pagePath: "/belonging",
    });
    await appendChatMessage({
      sessionId: session.id,
      clientProfileId: row.id,
      role: "user",
      content: sample.message,
    });
    await appendChatMessage({
      sessionId: session.id,
      clientProfileId: row.id,
      role: "assistant",
      content: "Thank you for sharing what's changing. Let's clarify what feels unclear next.",
    });
    await createGoal(row.id, sample.desiredOutcome || "Clarify housing direction");
    await recordProfileEvent(row.id, "seeded", "sample data");

    clients.push({
      id: row.id,
      visitorId: row.visitorId,
      email: row.email,
      leadScore: row.leadScore ?? breakdown.leadScore,
      lifecycleStage: row.lifecycleStage,
    });
  }

  const all = await listClientProfiles({ limit: 200 });
  return { created, updated, total: all.length, clients };
}
