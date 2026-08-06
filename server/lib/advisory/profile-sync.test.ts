import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./sync-queue", () => ({
  queueProfileSyncBundle: vi.fn(async () => undefined),
  queueAttioSync: vi.fn(async () => undefined),
}));

import { processDecisionGuideTurn } from "./profile-service";
import { getClientProfileByVisitorId, getClientProfileByEmail } from "./repository";
import { queueProfileSyncBundle } from "./sync-queue";

describe("processDecisionGuideTurn profile synchronization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates anonymous profile, then merges on email and queues Attio sync", async () => {
    const visitorId = `akv_${crypto.randomUUID()}`;

    const first = await processDecisionGuideTurn({
      visitorId,
      sessionId: "sess-1",
      latestMessage: "We're relocating to New York and feeling unclear about neighborhoods",
      flatProfile: {
        situation: "Relocating for work",
        desire: "Find the right borough for a young family",
        geography: "NYC",
        timeline: "6-12 months",
      },
      conversationSummary: "Family relocating; exploring borough fit.",
      messageCount: 2,
    });

    expect(first.profile.visitorId).toBe(visitorId);
    expect(first.profile.situation).toContain("Relocating");
    expect(first.leadScore).toBeGreaterThan(0);

    const second = await processDecisionGuideTurn({
      visitorId,
      sessionId: "sess-1",
      latestMessage: "Please save this plan - my email is merge-test@agentkammer.test",
      flatProfile: {
        situation: "Relocating for work",
        desire: "Find the right borough for a young family",
        geography: "NYC",
        timeline: "3-6 months",
        email: "merge-test@agentkammer.test",
        phone: "2125550111",
      },
      conversationSummary: "Contact shared; timeline accelerated.",
      messageCount: 4,
      callRequested: true,
    });

    expect(second.profile.email).toBe("merge-test@agentkammer.test");
    expect(second.shouldSyncToAttio).toBe(true);
    expect(second.shouldCreateAdvisorTask).toBe(true);
    expect(queueProfileSyncBundle).toHaveBeenCalled();

    const byVisitor = await getClientProfileByVisitorId(visitorId);
    const byEmail = await getClientProfileByEmail("merge-test@agentkammer.test");
    expect(byVisitor?.email).toBe("merge-test@agentkammer.test");
    expect(byEmail?.id).toBe(byVisitor?.id);
  });
});
