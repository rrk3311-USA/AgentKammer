export type CarryInput = {
  price: number;
  downPercent: number;
  ratePercent: number;
  years: number;
  taxMonthly: number;
  commonMonthly: number;
};

export type CarryResult = {
  down: number;
  principal: number;
  mortgage: number;
  tax: number;
  common: number;
  monthly: number;
};

export const DEFAULT_CARRY: CarryInput = {
  price: 3_500_000,
  downPercent: 40,
  ratePercent: 6.5,
  years: 30,
  taxMonthly: 2_800,
  commonMonthly: 3_200,
};

export function mortgagePayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / n;
  const factor = (1 + r) ** n;
  return (principal * (r * factor)) / (factor - 1);
}

export function computeCarry(input: CarryInput): CarryResult {
  const price = Math.max(0, input.price);
  const downPercent = Math.min(100, Math.max(0, input.downPercent));
  const down = price * (downPercent / 100);
  const principal = Math.max(0, price - down);
  const mortgage = mortgagePayment(principal, Math.max(0, input.ratePercent), Math.max(1, input.years));
  const tax = Math.max(0, input.taxMonthly);
  const common = Math.max(0, input.commonMonthly);
  return {
    down,
    principal,
    mortgage,
    tax,
    common,
    monthly: mortgage + tax + common,
  };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function parseMoney(raw: string): number {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
