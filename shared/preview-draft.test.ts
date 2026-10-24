import { describe, expect, it } from "vitest";
import { buildDecisionGuideSystemPrompt } from "../server/prompts/decision-guide";
import {
  isPreviewDraftVisible,
  isPublicProductionHost,
  isUnpublishedDraftPath,
  livabilityApiIsPublic,
} from "./preview-draft";

describe("unpublished decision and livability drafts", () => {
  it("hides drafts on the public Production hosts only", () => {
    expect(isPublicProductionHost("www.agentkammer.com")).toBe(true);
    expect(isPublicProductionHost("agentkammer.com:443")).toBe(true);
    expect(isPreviewDraftVisible("www.agentkammer.com")).toBe(false);
    expect(isPreviewDraftVisible("agentkammer.com")).toBe(false);
    expect(isPreviewDraftVisible("localhost")).toBe(true);
    expect(isPreviewDraftVisible("127.0.0.1")).toBe(true);
    expect(isPreviewDraftVisible("agentkammer-git-cursor-unpublish-decision-livability-304c-rrk3311-usas-projects.vercel.app")).toBe(true);
    expect(isPreviewDraftVisible("")).toBe(true);
  });

  it("matches the Decision Guide and Livability desk, including APIs", () => {
    expect(isUnpublishedDraftPath("/tools/communication-map")).toBe(true);
    expect(isUnpublishedDraftPath("/tools/communication-map/")).toBe(true);
    expect(isUnpublishedDraftPath("/tools/livability")).toBe(true);
    expect(isUnpublishedDraftPath("/tools/livability/index.html")).toBe(true);
    expect(isUnpublishedDraftPath("/api/livability/read-plan")).toBe(true);
    expect(isUnpublishedDraftPath("/tools")).toBe(false);
    expect(isUnpublishedDraftPath("/tools/wheel-of-life/")).toBe(false);
    expect(isUnpublishedDraftPath("/calculator")).toBe(false);
    expect(isUnpublishedDraftPath("/belonging")).toBe(false);
  });

  it("keeps livability vision off Production even on a vercel.app alias", () => {
    expect(livabilityApiIsPublic({ host: "localhost" })).toBe(true);
    expect(livabilityApiIsPublic({ host: "www.agentkammer.com" })).toBe(false);
    expect(livabilityApiIsPublic({ host: "agentkammer.vercel.app", vercelEnv: "production" })).toBe(false);
    expect(livabilityApiIsPublic({ host: "preview.vercel.app", vercelEnv: "preview" })).toBe(true);
  });

  it("stops Guidance from recommending the unpublished tool routes", () => {
    const prompt = buildDecisionGuideSystemPrompt();
    expect(prompt).toContain("/contact?intent=livability");
    expect(prompt).toContain("Never recommend /tools, /tools/livability, /tools/communication-map");
    expect(prompt).not.toMatch(/optional tools lane/i);
  });
});
