/** Standing values that may later unlock Life Plan as a Hub perk. */
export const MEMBER_LIFE_PLAN_STANDINGS = [
  "qualified",
  "call_ready",
  "advisory_client",
  "transaction_ready",
  "active_client",
] as const;

export type MemberLifePlanStanding = (typeof MEMBER_LIFE_PLAN_STANDINGS)[number];

/**
 * Life Plan is never a public-nav product. Future website users only see it
 * after Get Qualified / Hub membership — not on first visit.
 */
export function canAccessMemberLifePlan(standing: string | null | undefined): boolean {
  if (!standing) return false;
  return (MEMBER_LIFE_PLAN_STANDINGS as readonly string[]).includes(standing);
}

export const LIFE_PLAN_PERK_POLICY = {
  publicNav: false,
  dumpOnEveryVisitor: false,
  gate: "get-qualified",
  hubPathWhenLive: "/hub/life-plan",
  product: "judgment",
} as const;
