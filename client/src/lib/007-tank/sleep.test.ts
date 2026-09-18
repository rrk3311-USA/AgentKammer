import { describe, expect, it } from "vitest";
import { durationMs, formatSleepDuration, isValidNight } from "./sleep";

describe("007 tank sleep log", () => {
  it("measures only commander-entered bed to wake", () => {
    expect(durationMs("2026-09-17T23:30", "2026-09-18T06:45")).toBe(7.25 * 60 * 60 * 1000);
    expect(formatSleepDuration(7.25 * 60 * 60 * 1000)).toBe("7h 15m");
  });

  it("rejects inverted or empty clocks", () => {
    expect(isValidNight({ bedAt: "2026-09-18T07:00", wakeAt: "2026-09-18T06:00" })).toBe(false);
    expect(isValidNight({ bedAt: "", wakeAt: "2026-09-18T06:00" })).toBe(false);
  });
});
