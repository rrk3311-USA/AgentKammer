import { describe, expect, it } from "vitest";
import { isNetworkDraftVisible, isProductionPublicHost, NETWORK_DRAFT_PATH } from "./network-draft";

describe("network draft gate", () => {
  it("stays on the unpublished /network route", () => {
    expect(NETWORK_DRAFT_PATH).toBe("/network");
  });

  it("hides the draft on the production public hosts", () => {
    expect(isProductionPublicHost("agentkammer.com")).toBe(true);
    expect(isProductionPublicHost("www.agentkammer.com")).toBe(true);
    expect(isProductionPublicHost("www.agentkammer.com:443")).toBe(true);
    expect(isNetworkDraftVisible("agentkammer.com")).toBe(false);
    expect(isNetworkDraftVisible("www.agentkammer.com")).toBe(false);
  });

  it("shows the draft on localhost and Preview hosts", () => {
    expect(isNetworkDraftVisible("localhost")).toBe(true);
    expect(isNetworkDraftVisible("127.0.0.1")).toBe(true);
    expect(isNetworkDraftVisible("agentkammer-git-cursor-agent-intelligence-network-18c4-rrk3311-usas-projects.vercel.app")).toBe(true);
  });
});
