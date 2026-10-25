import { describe, expect, it } from "vitest";
import { cashToClose, dueAtClosing, monthlyWithCosts } from "./calculator-costs";
import { DEFAULT_CARRY, computeCarry, formatUsd } from "./monthly-carry";
import { buildCalculatorPdf, calculatorPdfLayout } from "./calculator-pdf";

describe("calculator pdf", () => {
  const fields = {
    price: "3,500,000",
    downPercent: "40",
    ratePercent: "6.5",
    years: "30",
    taxMonthly: "2,800",
    commonMonthly: "3,200",
  };

  it("fits the month, every input, and the breakdown on one paper page", () => {
    const result = computeCarry(DEFAULT_CARRY);
    const { commands, bottom } = calculatorPdfLayout(fields, DEFAULT_CARRY, result);
    expect(bottom).toBeLessThanOrEqual(792 - 54);
    expect(commands).toContain("Purchase price");
    expect(commands).toContain("3,500,000");
    expect(commands).toContain("40%");
    expect(commands).toContain("6.5%");
    expect(commands).toContain("30 years");
    expect(commands).toContain("2,800 / mo");
    expect(commands).toContain("3,200 / mo");
    expect(commands).toContain("Mortgage");
    expect(commands).toContain("Property tax");
    expect(commands).toContain("Common charges");
    expect(commands).toContain("Monthly carry");
    expect(commands).toContain(formatUsd(result.monthly));
    expect(commands).toContain(formatUsd(result.mortgage));

    const pdf = new TextDecoder().decode(buildCalculatorPdf(fields, DEFAULT_CARRY, result));
    expect(pdf).toContain("/Count 1");
    expect(pdf).toContain("/MediaBox [0 0 612 792]");
    expect(pdf).toContain("0.812 0.800 0.776");
    expect(pdf).toContain("0.086 0.110 0.157");
    expect(pdf).toContain("interactive-tools/calculator");
    expect(pdf).toContain("AGENTKAMMER.COM");
    expect(pdf).toContain("NOTES");
    expect(pdf).toContain(formatUsd(result.monthly));
    expect(formatUsd(result.monthly)).toBe("$19,273");
    expect(commands).toMatch(/1 0 0 1 \d+\.\d+ 40\.00 Tm/);
    expect(commands).not.toContain("before closing costs");
    expect(pdf).not.toContain("Manhattan");
    expect(pdf).not.toContain("Jane Street");
    expect(pdf).not.toContain("trophy");
  });

  it("prints group totals when optional costs are entered", () => {
    const result = computeCarry(DEFAULT_CARRY);
    const costs = { closing: 74_550, monthly: 380, selling: 90_500 };
    const { commands, bottom } = calculatorPdfLayout(fields, DEFAULT_CARRY, result, costs);
    expect(bottom).toBeLessThanOrEqual(792 - 54);
    expect(commands).toContain("Purchase closing");
    expect(commands).toContain("Ongoing monthly");
    expect(commands).toContain("Other monthly");
    expect(commands).toContain("Selling costs");
    expect(commands).toContain("Cash to close");
    expect(commands).toContain(formatUsd(monthlyWithCosts(result.monthly, costs.monthly)));
    expect(commands).toContain(formatUsd(cashToClose(result.down, costs.closing)));
    expect(commands).toContain(formatUsd(costs.closing));
    expect(commands).toContain(formatUsd(74_550));
    expect(commands).toContain("Commission rates vary and are negotiable");
    expect(commands).not.toContain("\u2014");
    const pdf = new TextDecoder().decode(buildCalculatorPdf(fields, DEFAULT_CARRY, result, costs));
    expect(pdf).toContain("/Count 1");
  });

  it("prints the deposit and the amount still due at closing", () => {
    const result = computeCarry(DEFAULT_CARRY);
    const costs = { closing: 105_050, monthly: 180, selling: 87_500 };
    const deposit = 350_000;
    const cash = cashToClose(result.down, costs.closing);
    const { commands, bottom } = calculatorPdfLayout(fields, DEFAULT_CARRY, result, costs, deposit);
    expect(bottom).toBeLessThanOrEqual(792 - 54);
    expect(commands).toContain("Deposit paid at contract");
    expect(commands).toContain("Due at closing");
    expect(commands).toContain(formatUsd(deposit));
    expect(commands).toContain(formatUsd(dueAtClosing(cash, deposit)));
    expect(commands).toContain("Your deposit counts toward cash to close.");
    expect(commands).not.toContain("\u2014");
  });
});
