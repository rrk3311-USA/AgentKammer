import { afterEach, describe, expect, it } from "vitest";
import { validateLivabilityInput } from "@shared/tools";
import { resetToolsMemory, ToolsRepository } from "./repository";
import { authorizeAndChargeRun, canAffordNextRun, creditTopUp } from "./wallet";
import { computeHeuristicLivability } from "./livability";
import { canAccessTools, paymentsAreStubbed, toolsArePublic } from "./access";

afterEach(() => {
  resetToolsMemory();
});

describe("tools access", () => {
  it("stays unlisted unless TOOLS_PUBLIC or preview", () => {
    expect(toolsArePublic({ TOOLS_PUBLIC: "" } as NodeJS.ProcessEnv)).toBe(false);
    expect(canAccessTools({ headers: {}, env: { TOOLS_PUBLIC: "" } as NodeJS.ProcessEnv })).toBe(false);
    expect(
      canAccessTools({
        query: { preview: "1" },
        env: { TOOLS_PUBLIC: "" } as NodeJS.ProcessEnv,
      }),
    ).toBe(true);
    expect(
      canAccessTools({
        headers: { "x-tools-preview": "1" },
        env: { TOOLS_PUBLIC: "" } as NodeJS.ProcessEnv,
      }),
    ).toBe(true);
    expect(toolsArePublic({ TOOLS_PUBLIC: "1" } as NodeJS.ProcessEnv)).toBe(true);
  });

  it("stubs payments outside production when Stripe is unset", () => {
    expect(paymentsAreStubbed({ NODE_ENV: "development" } as NodeJS.ProcessEnv)).toBe(true);
    expect(paymentsAreStubbed({ NODE_ENV: "production" } as NodeJS.ProcessEnv)).toBe(false);
    expect(
      paymentsAreStubbed({ NODE_ENV: "production", TOOLS_ALLOW_STUB_PAYMENTS: "1" } as NodeJS.ProcessEnv),
    ).toBe(true);
  });
});

describe("livability validation", () => {
  it("requires address, listing, or photos", () => {
    const empty = validateLivabilityInput({});
    expect(empty.ok).toBe(false);
    if (!empty.ok) expect(empty.errors[0]).toMatch(/address/i);
  });

  it("accepts a listing URL alone", () => {
    const result = validateLivabilityInput({ listingUrl: "https://streeteasy.com/building/15-central-park-west" });
    expect(result.ok).toBe(true);
  });

  it("rejects a short address and a non-url listing", () => {
    const result = validateLivabilityInput({ address: "NY", listingUrl: "not-a-url" });
    expect(result.ok).toBe(false);
  });
});

describe("livability heuristic", () => {
  it("returns a deterministic demo score for the same address", () => {
    const a = computeHeuristicLivability({ address: "15 Central Park West, New York, NY" });
    const b = computeHeuristicLivability({ address: "15 Central Park West, New York, NY" });
    expect(a.mode).toBe("demo");
    expect(a.score).toBe(b.score);
    expect(a.score).toBeGreaterThanOrEqual(42);
    expect(a.score).toBeLessThanOrEqual(96);
    expect(a.summary.toLowerCase()).not.toMatch(/ibcc|inspector|house doctor/);
  });
});

describe("credits wallet", () => {
  it("gives the first Livability run free, then charges 1 credit", async () => {
    const repo = new ToolsRepository();
    const wallet = await repo.getOrCreateWallet({ visitorId: "akv_11111111-1111-1111-1111-111111111111" });
    expect(wallet.credits).toBe(0);
    expect(canAffordNextRun(wallet, "livability")).toBe(true);

    const first = await authorizeAndChargeRun(repo, wallet, "livability");
    expect(first.ok).toBe(true);
    if (first.ok) {
      expect(first.chargedCredits).toBe(0);
      expect(first.reason).toBe("first_free");
      expect(first.wallet.freeLivabilityUsed).toBe(true);
    }

    const second = await authorizeAndChargeRun(repo, first.ok ? first.wallet : wallet, "livability");
    expect(second.ok).toBe(false);
    if (!second.ok) expect(second.code).toBe("INSUFFICIENT_CREDITS");

    await creditTopUp(repo, (await repo.getWalletById(wallet.id))!, {
      credits: 5,
      amountCents: 500,
      stripeSessionId: "cs_test_1",
    });
    const funded = await repo.getWalletById(wallet.id);
    expect(funded?.credits).toBe(5);

    const third = await authorizeAndChargeRun(repo, funded!, "livability");
    expect(third.ok).toBe(true);
    if (third.ok) {
      expect(third.chargedCredits).toBe(1);
      expect(third.wallet.credits).toBe(4);
    }
  });

  it("is idempotent on the same Stripe session", async () => {
    const repo = new ToolsRepository();
    const wallet = await repo.getOrCreateWallet({ visitorId: "akv_22222222-2222-2222-2222-222222222222" });
    await creditTopUp(repo, wallet, { credits: 10, amountCents: 1000, stripeSessionId: "cs_dup" });
    const again = await creditTopUp(repo, (await repo.getWalletById(wallet.id))!, {
      credits: 10,
      amountCents: 1000,
      stripeSessionId: "cs_dup",
    });
    expect(again.duplicate).toBe(true);
    expect((await repo.getWalletById(wallet.id))?.credits).toBe(10);
  });
});
