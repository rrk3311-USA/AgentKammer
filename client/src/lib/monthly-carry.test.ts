import { describe, expect, it } from "vitest";
import { computeCarry, formatUsd, mortgagePayment, parseMoney } from "./monthly-carry";

describe("monthly carry", () => {
  it("computes a standard 30-year payment", () => {
    const payment = mortgagePayment(2_100_000, 6.5, 30);
    expect(payment).toBeGreaterThan(12_000);
    expect(payment).toBeLessThan(14_000);
  });

  it("returns principal only when the rate is zero", () => {
    expect(mortgagePayment(1_200_000, 0, 30)).toBe(1_200_000 / 360);
  });

  it("adds tax and common charges to the monthly carry", () => {
    const result = computeCarry({
      price: 3_500_000,
      downPercent: 40,
      ratePercent: 6.5,
      years: 30,
      taxMonthly: 2_800,
      commonMonthly: 3_200,
    });
    expect(result.down).toBe(1_400_000);
    expect(result.principal).toBe(2_100_000);
    expect(result.monthly).toBeCloseTo(result.mortgage + 2_800 + 3_200, 5);
  });

  it("formats and parses money without cents", () => {
    expect(formatUsd(18420)).toBe("$18,420");
    expect(parseMoney("$3,500,000")).toBe(3_500_000);
  });
});
