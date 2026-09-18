import { describe, expect, it } from "vitest";
import { applyTick, emptyDay, formatDuration, isIdle, localDayKey } from "./time-tracking";

describe("007 tank in-app time", () => {
  it("does not count without consent", () => {
    const day = applyTick({
      consent: false,
      visible: true,
      idle: false,
      dtMs: 5000,
      day: emptyDay(),
    });
    expect(day).toEqual(emptyDay());
  });

  it("counts HUD visible when the tab is in the foreground", () => {
    const day = applyTick({
      consent: true,
      visible: true,
      idle: true,
      dtMs: 2000,
      day: emptyDay(),
    });
    expect(day.hudVisibleMs).toBe(2000);
    expect(day.laptopActiveMs).toBe(0);
  });

  it("counts laptop-active only when visible and not idle", () => {
    const day = applyTick({
      consent: true,
      visible: true,
      idle: false,
      dtMs: 1000,
      day: emptyDay(),
    });
    expect(day.hudVisibleMs).toBe(1000);
    expect(day.laptopActiveMs).toBe(1000);
  });

  it("does not count a hidden tab", () => {
    const day = applyTick({
      consent: true,
      visible: false,
      idle: false,
      dtMs: 4000,
      day: emptyDay(),
    });
    expect(day).toEqual(emptyDay());
  });

  it("treats a minute without input as idle", () => {
    expect(isIdle(0, 59_999)).toBe(false);
    expect(isIdle(0, 60_000)).toBe(true);
  });

  it("formats durations for the HUD clock", () => {
    expect(formatDuration(0)).toBe("0m 00s");
    expect(formatDuration(65_000)).toBe("1m 05s");
    expect(formatDuration(3_661_000)).toBe("1h 01m 01s");
  });

  it("keys days in America/New_York", () => {
    expect(localDayKey(new Date("2026-09-18T08:00:00.000Z"))).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
