import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  COST_CATALOG,
  COST_GROUPS,
  addCustomCostRow,
  cashToClose,
  catalogLineAmount,
  emptyCostDraft,
  mansionTaxEstimate,
  monthlyWithCosts,
  setCatalogAmount,
  setCatalogPercent,
  toggleCatalogItem,
  totalCostGroups,
} from "./calculator-costs";

const source = readFileSync(new URL("./calculator-costs.ts", import.meta.url), "utf8");
const ui = readFileSync(new URL("../components/CalculatorCosts.tsx", import.meta.url), "utf8");

describe("calculator costs catalog", () => {
  it("groups purchase closing, ongoing monthly, and selling costs", () => {
    expect(COST_GROUPS.map((group) => group.label)).toEqual([
      "Purchase closing costs",
      "Ongoing monthly",
      "Selling costs",
    ]);
    const ids = COST_CATALOG.map((item) => item.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "buyerCommission",
        "sellerCommission",
        "buyerAttorney",
        "sellerAttorney",
        "transferTaxes",
        "coopFlipTax",
        "mortgageRecordingTax",
        "lenderOrigination",
        "appraisal",
        "inspection",
        "titleInsurance",
        "prepaidEscrow",
        "mansionTax",
        "floodInsurance",
        "pmi",
        "maintenanceReserve",
        "extraHoa",
        "movingCosts",
      ]),
    );
  });

  it("leaves commission percents empty and does not imply a brokerage rate", () => {
    const draft = emptyCostDraft();
    expect(draft.percents).toEqual({});
    expect(draft.on.buyerCommission).toBeFalsy();
    expect(draft.on.sellerCommission).toBeFalsy();
    const commissions = COST_CATALOG.filter((item) => item.kind === "percent");
    expect(commissions).toHaveLength(2);
    for (const item of commissions) {
      expect(item.hint).toContain("Varies and is negotiable");
      expect(item).not.toHaveProperty("defaultPercent");
      expect(item).not.toHaveProperty("defaultRate");
      const amount = catalogLineAmount(item, 3_500_000, { ...draft, on: { [item.id]: true } });
      expect(amount).toBe(0);
    }
    expect(source).not.toContain("\u2014");
    expect(ui).not.toContain("\u2014");
    expect(`${source}\n${ui}`).not.toMatch(/our commission|we charge|Agent Kammer commission|brokerage|standard rate|typically 6|6%/i);
  });

  it("estimates mansion tax at one percent only at or above one million", () => {
    expect(mansionTaxEstimate(999_999)).toBe(0);
    expect(mansionTaxEstimate(1_000_000)).toBe(10_000);
    expect(mansionTaxEstimate(3_500_000)).toBe(35_000);
    const item = COST_CATALOG.find((row) => row.id === "mansionTax");
    if (!item) throw new Error("missing mansion tax");
    const emptyOn = toggleCatalogItem(emptyCostDraft(), item, true, 3_500_000);
    expect(emptyOn.amounts.mansionTax).toBe("35,000");
    expect(catalogLineAmount(item, 3_500_000, emptyOn)).toBe(35_000);
    const edited = setCatalogAmount(emptyOn, "mansionTax", "40,000");
    expect(catalogLineAmount(item, 3_500_000, edited)).toBe(40_000);
  });

  it("totals commissions, catalog amounts, and custom rows into the three groups", () => {
    const buyer = COST_CATALOG.find((row) => row.id === "buyerCommission");
    const seller = COST_CATALOG.find((row) => row.id === "sellerCommission");
    const attorney = COST_CATALOG.find((row) => row.id === "buyerAttorney");
    const flood = COST_CATALOG.find((row) => row.id === "floodInsurance");
    if (!buyer || !seller || !attorney || !flood) throw new Error("missing catalog item");

    let draft = toggleCatalogItem(emptyCostDraft(), buyer, true, 3_500_000);
    draft = setCatalogPercent(draft, "buyerCommission", "2");
    draft = toggleCatalogItem(draft, attorney, true, 3_500_000);
    draft = setCatalogAmount(draft, "buyerAttorney", "4,500");
    draft = toggleCatalogItem(draft, flood, true, 3_500_000);
    draft = setCatalogAmount(draft, "floodInsurance", "180");
    draft = toggleCatalogItem(draft, seller, true, 3_500_000);
    draft = setCatalogPercent(draft, "sellerCommission", "2.5");
    draft = addCustomCostRow(draft, "closing", { id: "c1", name: "Bank wire", amount: "50" });
    draft = addCustomCostRow(draft, "monthly", { id: "m1", name: "Storage", amount: "200" });
    draft = addCustomCostRow(draft, "selling", { id: "s1", name: "Staging", amount: "3,000" });

    const totals = totalCostGroups(3_500_000, draft);
    expect(totals.closing).toBe(70_000 + 4_500 + 50);
    expect(totals.monthly).toBe(380);
    expect(totals.selling).toBe(87_500 + 3_000);
    expect(cashToClose(1_400_000, totals.closing)).toBe(1_474_550);
    expect(monthlyWithCosts(19_273, totals.monthly)).toBe(19_653);
  });

  it("ignores catalog amounts until the line is on", () => {
    const item = COST_CATALOG.find((row) => row.id === "inspection");
    if (!item) throw new Error("missing inspection");
    const draft = setCatalogAmount(emptyCostDraft(), "inspection", "1,200");
    expect(catalogLineAmount(item, 3_500_000, draft)).toBe(0);
    expect(catalogLineAmount(item, 3_500_000, { ...draft, on: { inspection: true } })).toBe(1_200);
  });
});
