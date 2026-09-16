import { RUN_COST_CREDITS, type ToolSlug } from "@shared/tools";
import type { ToolWalletRow } from "@shared/schema-tools";
import type { ToolsRepository } from "./repository";

export type ChargeDecision =
  | { ok: true; chargedCredits: number; wallet: ToolWalletRow; reason: "first_free" | "credit" }
  | { ok: false; error: string; code: "INSUFFICIENT_CREDITS"; credits: number };

export async function authorizeAndChargeRun(
  repo: ToolsRepository,
  wallet: ToolWalletRow,
  toolSlug: string,
): Promise<ChargeDecision> {
  const fresh = (await repo.getWalletById(wallet.id)) || wallet;
  const firstFree = toolSlug === "livability" && !fresh.freeLivabilityUsed;

  if (firstFree) {
    const updated = await repo.updateWallet(fresh.id, { freeLivabilityUsed: true });
    await repo.addLedger(fresh.id, {
      type: "grant",
      credits: 0,
      reason: "First Livability Score run is free",
    });
    return { ok: true, chargedCredits: 0, wallet: updated, reason: "first_free" };
  }

  if (fresh.credits < RUN_COST_CREDITS) {
    return {
      ok: false,
      code: "INSUFFICIENT_CREDITS",
      error: "This run costs 1 credit ($1). Top up to continue.",
      credits: fresh.credits,
    };
  }

  const updated = await repo.updateWallet(fresh.id, { credits: fresh.credits - RUN_COST_CREDITS });
  return { ok: true, chargedCredits: RUN_COST_CREDITS, wallet: updated, reason: "credit" };
}

export async function refundRunCredits(
  repo: ToolsRepository,
  walletId: string,
  credits: number,
  runId: string,
) {
  if (credits <= 0) return;
  const wallet = await repo.getWalletById(walletId);
  if (!wallet) return;
  await repo.updateWallet(walletId, { credits: wallet.credits + credits });
  await repo.addLedger(walletId, {
    type: "refund",
    credits,
    reason: "Run failed — credit returned",
    runId,
  });
}

export async function creditTopUp(
  repo: ToolsRepository,
  wallet: ToolWalletRow,
  input: {
    credits: number;
    amountCents: number;
    stripeSessionId?: string | null;
    stripePaymentIntentId?: string | null;
    stub?: boolean;
  },
) {
  if (input.stripeSessionId) {
    const existing = await repo.getLedgerByStripeSession(input.stripeSessionId);
    if (existing) {
      const current = await repo.getWalletById(wallet.id);
      return { wallet: current || wallet, duplicate: true };
    }
  }

  const updated = await repo.updateWallet(wallet.id, { credits: wallet.credits + input.credits });
  await repo.addLedger(wallet.id, {
    type: "topup",
    credits: input.credits,
    reason: input.stub ? `Stub top-up · ${input.credits} credits` : `Stripe top-up · ${input.credits} credits`,
    stripeSessionId: input.stripeSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId,
  });
  await repo.savePayment({
    walletId: wallet.id,
    stripeSessionId: input.stripeSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId,
    amountCents: input.amountCents,
    credits: input.credits,
    status: "completed",
  });
  return { wallet: updated, duplicate: false };
}

export function canAffordNextRun(wallet: ToolWalletRow, toolSlug: string | ToolSlug) {
  if (toolSlug === "livability" && !wallet.freeLivabilityUsed) return true;
  return wallet.credits >= RUN_COST_CREDITS;
}
