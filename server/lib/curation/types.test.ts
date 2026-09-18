import { describe, expect, it } from "vitest";
import {
  currentCurationPeriod,
  looksLikeRentalUrl,
  nextCurationPeriod,
  parsePeriodDate,
  periodKey,
} from "./types";

describe("curation cadence", () => {
  it("uses the 1st before the 15th, then the 15th", () => {
    expect(periodKey(currentCurationPeriod(new Date("2026-09-08T12:00:00Z")))).toBe("2026-09-01");
    expect(periodKey(currentCurationPeriod(new Date("2026-09-15T00:00:00Z")))).toBe("2026-09-15");
    expect(periodKey(nextCurationPeriod(new Date("2026-09-08T12:00:00Z")))).toBe("2026-09-15");
    expect(periodKey(nextCurationPeriod(new Date("2026-09-20T12:00:00Z")))).toBe("2026-10-01");
  });

  it("only accepts 1st / 15th period dates", () => {
    expect(parsePeriodDate("2026-09-15")?.toISOString()).toBe("2026-09-15T00:00:00.000Z");
    expect(parsePeriodDate("2026-09-16")).toBeNull();
  });

  it("detects rental URLs", () => {
    expect(looksLikeRentalUrl("https://streeteasy.com/for-rent/manhattan")).toBe(true);
    expect(looksLikeRentalUrl("https://streeteasy.com/building/15-hudson-yards-new_york")).toBe(false);
  });
});
