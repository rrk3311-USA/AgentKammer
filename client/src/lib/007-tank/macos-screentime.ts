/**
 * Later hook for native macOS Screen Time.
 * Unwired until a self-hosted worker (or equivalent) runs on Raphi's laptop.
 * Do not invent OS-level totals while this is disconnected.
 */
export const MACOS_SCREEN_TIME_HOOK = {
  id: "macos-screentime" as const,
  status: "unwired" as const,
  workerRequired: "cursor-self-hosted-worker",
  measures: "OS Screen Time / laptop-wide app usage via Apple Screen Time APIs",
  reason: "No self-hosted worker is connected to this laptop.",
};

export type NativeScreenTimeSnapshot = {
  source: typeof MACOS_SCREEN_TIME_HOOK.id;
  available: false;
  reason: string;
};

export function readNativeScreenTime(): NativeScreenTimeSnapshot {
  return {
    source: MACOS_SCREEN_TIME_HOOK.id,
    available: false,
    reason: MACOS_SCREEN_TIME_HOOK.reason,
  };
}

export function isNativeScreenTimeWired(): boolean {
  return MACOS_SCREEN_TIME_HOOK.status !== "unwired";
}
