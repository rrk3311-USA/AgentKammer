/**
 * Seed sample advisory client profiles for local admin testing.
 * Usage: npm run seed:advisory
 */
import {
  createClientProfile,
  ensureVisitor,
  getClientProfileByVisitorId,
  recordProfileEvent,
  updateClientProfile,
  appendChatMessage,
  ensureChatSession,
  createGoal,
} from "../server/lib/advisory/repository";
import { scoreClientProfile, deriveLifecycle } from "../server/lib/advisory/lead-scoring";

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
    visitorId: "akv_seed_anonymous_003",
    situation: "Exploring whether to rent or buy",
    desiredOutcome: "Understand tradeoffs before committing",
    timeline: "Exploring",
    message: "What's changing is my lease is up next year.",
  },
];

async function main() {
  for (const sample of samples) {
    await ensureVisitor({ visitorId: sample.visitorId, path: "/belonging" });
    let row = await getClientProfileByVisitorId(sample.visitorId);
    if (!row) {
      row = await createClientProfile({
        visitorId: sample.visitorId,
        email: sample.email,
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
    }

    const breakdown = scoreClientProfile(
      {
        ...sample,
        lifecycleStage: "anonymous",
      },
      { messageCount: 3, visitCount: 2, latestMessage: sample.message },
    );
    const stage = deriveLifecycle(sample, breakdown.leadScore, {
      callRequested: Boolean(sample.email),
    });

    row =
      (await updateClientProfile(row.id, {
        leadScore: breakdown.leadScore,
        lifecycleStage: stage,
        scoreBreakdown: JSON.stringify(breakdown),
        nextRecommendedAction: sample.email
          ? "Prepare consultation brief"
          : "Continue Decision Guide",
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
    await recordProfileEvent(row.id, "seeded", "seed-advisory script");

    console.log(`Seeded ${sample.visitorId} → score ${breakdown.leadScore} (${stage})`);
  }

  console.log("Done. Open /admin/clients to review.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
