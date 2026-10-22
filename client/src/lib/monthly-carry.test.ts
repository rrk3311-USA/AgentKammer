import { describe, expect, it } from "vitest";
import { boundDownPercent, computeCarry, formatUsd, holdDownPercent, mortgagePayment, parseMoney } from "./monthly-carry";

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

  it("holds a down payment outside 0–100 at the nearest bound", () => {
    expect(holdDownPercent("101")).toEqual({ value: "100", held: true });
    expect(holdDownPercent("100.5")).toEqual({ value: "100", held: true });
    expect(holdDownPercent("-4")).toEqual({ value: "0", held: true });
    expect(holdDownPercent("40")).toEqual({ value: "40", held: false });
    expect(holdDownPercent("0")).toEqual({ value: "0", held: false });
    expect(holdDownPercent("100")).toEqual({ value: "100", held: false });
    expect(holdDownPercent("")).toEqual({ value: "", held: false });
    expect(boundDownPercent(101)).toBe(100);
    expect(boundDownPercent(-3)).toBe(0);

    const over = computeCarry({
      price: 3_500_000,
      downPercent: 101,
      ratePercent: 6.5,
      years: 30,
      taxMonthly: 2_800,
      commonMonthly: 3_200,
    });
    expect(over.down).toBe(3_500_000);
    expect(over.principal).toBe(0);
    expect(over.mortgage).toBe(0);
    expect(over.monthly).toBe(6_000);
  });

  it("formats and parses money without cents", () => {
    expect(formatUsd(18420)).toBe("$18,420");
    expect(parseMoney("$3,500,000")).toBe(3_500_000);
  });
});
