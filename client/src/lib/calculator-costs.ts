import { parseMoney } from "@/lib/monthly-carry";

export type CostGroupId = "closing" | "monthly" | "selling";
export type CostKind = "amount" | "percent" | "mansion";

export type CostCatalogItem = {
  id: string;
  group: CostGroupId;
  label: string;
  hint: string;
  kind: CostKind;
};

export type CostGroup = {
  id: CostGroupId;
  label: string;
  blurb: string;
};

export type CustomCostRow = {
  id: string;
  name: string;
  amount: string;
};

export type CostDraft = {
  on: Partial<Record<string, boolean>>;
  amounts: Partial<Record<string, string>>;
  percents: Partial<Record<string, string>>;
  custom: Record<CostGroupId, CustomCostRow[]>;
};

export type CostTotals = {
  closing: number;
  monthly: number;
  selling: number;
};

export const COST_GROUPS: readonly CostGroup[] = [
  {
    id: "closing",
    label: "Purchase closing costs",
    blurb: "One-time amounts around a purchase. Enter what you know. Leave the rest off.",
  },
  {
    id: "monthly",
    label: "Ongoing monthly",
    blurb: "Adds to the month above. Use additional HOA or common charges only if they are not already in Common charges.",
  },
  {
    id: "selling",
    label: "Selling costs",
    blurb: "One-time amounts if you are modeling a sale. Leave this group off when you are only reading a purchase.",
  },
];

export const COST_CATALOG: readonly CostCatalogItem[] = [
  {
    id: "buyerCommission",
    group: "closing",
    kind: "percent",
    label: "Buyer agent commission",
    hint: "Varies and is negotiable. Enter a percent of the purchase price. This page does not set a rate.",
  },
  {
    id: "buyerAttorney",
    group: "closing",
    kind: "amount",
    label: "Buyer attorney",
    hint: "Counsel for the purchase. Confirm the engagement letter.",
  },
  {
    id: "mansionTax",
    group: "closing",
    kind: "mansion",
    label: "NYC mansion tax",
    hint: "Estimate. One percent of the purchase price at $1,000,000 and above. Higher brackets can apply. Confirm the current schedule.",
  },
  {
    id: "titleInsurance",
    group: "closing",
    kind: "amount",
    label: "Title insurance",
    hint: "Owner and lender policies, when they apply. Confirm with counsel.",
  },
  {
    id: "mortgageRecordingTax",
    group: "closing",
    kind: "amount",
    label: "Mortgage recording tax",
    hint: "Often charged when a mortgage is recorded. Confirm the current rate for the borough and the loan.",
  },
  {
    id: "lenderOrigination",
    group: "closing",
    kind: "amount",
    label: "Lender and origination",
    hint: "Points, origination, and related lender fees from the loan estimate.",
  },
  {
    id: "appraisal",
    group: "closing",
    kind: "amount",
    label: "Appraisal",
    hint: "Lender-ordered valuation, when a loan is used.",
  },
  {
    id: "inspection",
    group: "closing",
    kind: "amount",
    label: "Inspection",
    hint: "Building, engineer, or other inspections you choose to order.",
  },
  {
    id: "prepaidEscrow",
    group: "closing",
    kind: "amount",
    label: "Prepaid escrow and reserves",
    hint: "Tax, insurance, or maintenance reserves collected at closing.",
  },
  {
    id: "movingCosts",
    group: "closing",
    kind: "amount",
    label: "Moving costs",
    hint: "Movers, storage, and related one-time move costs.",
  },
  {
    id: "floodInsurance",
    group: "monthly",
    kind: "amount",
    label: "Flood insurance",
    hint: "Monthly premium when a flood policy is in place.",
  },
  {
    id: "pmi",
    group: "monthly",
    kind: "amount",
    label: "Private mortgage insurance",
    hint: "Monthly PMI when the loan requires it.",
  },
  {
    id: "maintenanceReserve",
    group: "monthly",
    kind: "amount",
    label: "Maintenance reserve",
    hint: "A monthly set-aside you choose for repairs and replacements.",
  },
  {
    id: "extraHoa",
    group: "monthly",
    kind: "amount",
    label: "Additional HOA or common charges",
    hint: "Use this only if the amount is not already in Common charges above.",
  },
  {
    id: "sellerCommission",
    group: "selling",
    kind: "percent",
    label: "Seller agent commission",
    hint: "Varies and is negotiable. Enter a percent of the purchase price. This page does not set a rate.",
  },
  {
    id: "sellerAttorney",
    group: "selling",
    kind: "amount",
    label: "Seller attorney",
    hint: "Counsel for the sale. Confirm the engagement letter.",
  },
  {
    id: "transferTaxes",
    group: "selling",
    kind: "amount",
    label: "NYC and NYS transfer taxes",
    hint: "City and state transfer taxes. Amount depends on price and property type. Confirm the current schedule.",
  },
  {
    id: "coopFlipTax",
    group: "selling",
    kind: "amount",
    label: "Co-op flip tax",
    hint: "Charged by some co-ops on a sale. Confirm the building rule.",
  },
];

export const MANSION_TAX_THRESHOLD = 1_000_000;
export const MANSION_TAX_RATE = 0.01;

export function emptyCostDraft(): CostDraft {
  return {
    on: {},
    amounts: {},
    percents: {},
    custom: { closing: [], monthly: [], selling: [] },
  };
}

export function mansionTaxEstimate(price: number): number {
  const safe = Math.max(0, price);
  if (safe < MANSION_TAX_THRESHOLD) return 0;
  return safe * MANSION_TAX_RATE;
}

export function formatPlainMoney(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));
}

export function newCustomCostRow(): CustomCostRow {
  return {
    id: `cost-${Math.random().toString(36).slice(2, 10)}`,
    name: "",
    amount: "",
  };
}

export function catalogItemsFor(group: CostGroupId): CostCatalogItem[] {
  return COST_CATALOG.filter((item) => item.group === group);
}

export function catalogLineAmount(item: CostCatalogItem, price: number, draft: CostDraft): number {
  if (!draft.on[item.id]) return 0;
  if (item.kind === "percent") {
    const percent = parseMoney(draft.percents[item.id] ?? "");
    return Math.max(0, price) * (percent / 100);
  }
  if (item.kind === "mansion") {
    const raw = draft.amounts[item.id];
    if (raw == null || String(raw).trim() === "") return mansionTaxEstimate(price);
    return Math.max(0, parseMoney(raw));
  }
  return Math.max(0, parseMoney(draft.amounts[item.id] ?? ""));
}

export function customGroupAmount(rows: readonly CustomCostRow[] | undefined): number {
  return (rows ?? []).reduce((sum, row) => sum + Math.max(0, parseMoney(row.amount)), 0);
}

export function totalCostGroups(price: number, draft: CostDraft): CostTotals {
  const totals: CostTotals = { closing: 0, monthly: 0, selling: 0 };
  for (const item of COST_CATALOG) {
    totals[item.group] += catalogLineAmount(item, price, draft);
  }
  for (const group of COST_GROUPS) {
    totals[group.id] += customGroupAmount(draft.custom[group.id]);
  }
  return totals;
}

export function hasEnteredCosts(totals: CostTotals): boolean {
  return totals.closing > 0 || totals.monthly > 0 || totals.selling > 0;
}

export type CostWriteIn = {
  id: string;
  label: string;
  amount: number | null;
};

export const COST_WRITE_IN_ROWS = 5;
export const BLANK_COST_AMOUNT = "$ ______";

/** Catalog and custom rows the visitor switched on. Used to pre-fill the print ledger. */
export function enteredCostWriteIns(price: number, draft: CostDraft): CostWriteIn[] {
  const rows: CostWriteIn[] = [];
  for (const item of COST_CATALOG) {
    if (!draft.on[item.id]) continue;
    const amount = catalogLineAmount(item, price, draft);
    rows.push({ id: item.id, label: item.label, amount: amount > 0 ? amount : null });
  }
  for (const group of COST_GROUPS) {
    for (const row of draft.custom[group.id] ?? []) {
      const name = row.name.trim();
      const raw = String(row.amount ?? "").trim();
      if (!name && !raw) continue;
      const amount = Math.max(0, parseMoney(raw));
      rows.push({
        id: row.id,
        label: name || "Additional cost",
        amount: amount > 0 ? amount : null,
      });
    }
  }
  return rows;
}

export function paddedCostWriteIns(price: number, draft: CostDraft): CostWriteIn[] {
  const rows = enteredCostWriteIns(price, draft);
  const padded = [...rows];
  while (padded.length < COST_WRITE_IN_ROWS) {
    padded.push({ id: `blank-${padded.length}`, label: "", amount: null });
  }
  return padded;
}

export function cashToClose(down: number, closing: number): number {
  return Math.max(0, down) + Math.max(0, closing);
}

export function monthlyWithCosts(baseMonthly: number, monthlyExtras: number): number {
  return Math.max(0, baseMonthly) + Math.max(0, monthlyExtras);
}

export type DepositMode = "percent" | "amount";

export const DEPOSIT_HINT = "Often around 10% at contract in NYC, varies.";
export const DEPOSIT_EXPLAINER = "Your deposit counts toward cash to close.";

export function depositAmount(price: number, mode: DepositMode, raw: string): number {
  if (String(raw).trim() === "") return 0;
  const entered = Math.max(0, parseMoney(raw));
  if (mode === "percent") return Math.max(0, price) * (entered / 100);
  return entered;
}

export function dueAtClosing(cash: number, deposit: number): number {
  return Math.max(0, cash - Math.max(0, deposit));
}

export function toggleCatalogItem(draft: CostDraft, item: CostCatalogItem, on: boolean, price: number): CostDraft {
  const next: CostDraft = {
    ...draft,
    on: { ...draft.on, [item.id]: on },
    amounts: { ...draft.amounts },
    percents: { ...draft.percents },
    custom: draft.custom,
  };
  if (on && item.kind === "mansion") {
    const current = draft.amounts[item.id];
    if (current == null || String(current).trim() === "") {
      next.amounts[item.id] = formatPlainMoney(mansionTaxEstimate(price));
    }
  }
  return next;
}

export function setCatalogAmount(draft: CostDraft, id: string, amount: string): CostDraft {
  return { ...draft, amounts: { ...draft.amounts, [id]: amount } };
}

export function setCatalogPercent(draft: CostDraft, id: string, percent: string): CostDraft {
  return { ...draft, percents: { ...draft.percents, [id]: percent } };
}

export function addCustomCostRow(draft: CostDraft, group: CostGroupId, row = newCustomCostRow()): CostDraft {
  return {
    ...draft,
    custom: {
      ...draft.custom,
      [group]: [...draft.custom[group], row],
    },
  };
}

export function updateCustomCostRow(
  draft: CostDraft,
  group: CostGroupId,
  id: string,
  patch: Partial<Pick<CustomCostRow, "name" | "amount">>,
): CostDraft {
  return {
    ...draft,
    custom: {
      ...draft.custom,
      [group]: draft.custom[group].map((row) => (row.id === id ? { ...row, ...patch } : row)),
    },
  };
}

export function removeCustomCostRow(draft: CostDraft, group: CostGroupId, id: string): CostDraft {
  return {
    ...draft,
    custom: {
      ...draft.custom,
      [group]: draft.custom[group].filter((row) => row.id !== id),
    },
  };
}
