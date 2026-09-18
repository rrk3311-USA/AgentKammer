/**
 * Later hook for Apple Health / Watch / OS sleep.
 * Unwired. Do not invent device sleep stages or scores.
 */
export const APPLE_HEALTH_SLEEP_HOOK = {
  id: "apple-health-sleep" as const,
  status: "unwired" as const,
  measures: "Apple Health / Apple Watch sleep samples",
  reason: "No HealthKit or Watch pipeline is connected.",
};

export function readNativeSleep() {
  return {
    source: APPLE_HEALTH_SLEEP_HOOK.id,
    available: false as const,
    reason: APPLE_HEALTH_SLEEP_HOOK.reason,
  };
}
