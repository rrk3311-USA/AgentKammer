import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CalculatorCosts } from "@/components/CalculatorCosts";
import { PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  DEPOSIT_EXPLAINER,
  DEPOSIT_HINT,
  cashToClose,
  depositAmount,
  dueAtClosing,
  emptyCostDraft,
  hasEnteredCosts,
  monthlyWithCosts,
  totalCostGroups,
  type DepositMode,
} from "@/lib/calculator-costs";
import {
  DEFAULT_CARRY,
  boundDownPercent,
  computeCarry,
  formatUsd,
  holdDownPercent,
  parseMoney,
  type CarryInput,
} from "@/lib/monthly-carry";
import { cn } from "@/lib/utils";

const PRINT_SLUG = "interactive-tools/calculator";
const NOTES_RULES = Array.from({ length: 17 }, (_, index) => index);

function sheetDate(date = new Date()) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function Field({
  label,
  suffix,
  value,
  onChange,
  wide,
}: {
  label: string;
  suffix?: string;
  value: string;
  onChange: (value: string) => void;
  wide?: boolean;
}) {
  return (
    <label className="grid items-center gap-3 border-b border-brand-navy/15 px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
      <span className="text-lg text-brand-navy sm:text-xl">{label}</span>
      <span className="flex items-baseline justify-end gap-3 font-mono text-[1.7rem] tabular-nums leading-none text-brand-navy sm:text-[2.05rem]">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "bg-transparent text-right outline-none placeholder:text-brand-graphite/35",
            wide ? "w-44 sm:w-60" : "w-28 sm:w-36",
          )}
        />
        {suffix ? <span className="font-sans text-lg text-brand-graphite sm:text-xl">{suffix}</span> : null}
      </span>
    </label>
  );
}

export default function Calculator() {
  usePageMetadata({
    title: "Calculator",
    description: "A quiet monthly-carry calculator. Price, down payment, rate, tax, and common charges, before the listing takes over.",
    path: "/calculator",
  });

  const [price, setPrice] = useState("3,500,000");
  const [downPercent, setDownPercent] = useState(String(DEFAULT_CARRY.downPercent));
  const [downHeld, setDownHeld] = useState(false);
  const [ratePercent, setRatePercent] = useState(String(DEFAULT_CARRY.ratePercent));
  const [years, setYears] = useState(String(DEFAULT_CARRY.years));
  const [taxMonthly, setTaxMonthly] = useState("2,800");
  const [commonMonthly, setCommonMonthly] = useState("3,200");
  const [costDraft, setCostDraft] = useState(emptyCostDraft);
  const [costsOpen, setCostsOpen] = useState(false);
  const [depositMode, setDepositMode] = useState<DepositMode>("percent");
  const [depositRaw, setDepositRaw] = useState("");

  const input: CarryInput = useMemo(
    () => ({
      price: parseMoney(price),
      downPercent: boundDownPercent(parseMoney(downPercent)),
      ratePercent: parseMoney(ratePercent),
      years: parseMoney(years) || 30,
      taxMonthly: parseMoney(taxMonthly),
      commonMonthly: parseMoney(commonMonthly),
    }),
    [price, downPercent, ratePercent, years, taxMonthly, commonMonthly],
  );

  const result = useMemo(() => computeCarry(input), [input]);
  const costTotals = useMemo(() => totalCostGroups(input.price, costDraft), [input.price, costDraft]);
  const monthTotal = monthlyWithCosts(result.monthly, costTotals.monthly);
  const cashTotal = cashToClose(result.down, costTotals.closing);
  const deposit = depositAmount(input.price, depositMode, depositRaw);
  const dueClosing = dueAtClosing(cashTotal, deposit);
  const showCosts = hasEnteredCosts(costTotals);
  const showDeposit = deposit > 0;

  const inputRows = [
    ["Purchase price", price],
    ["Down payment", `${downPercent}%`],
    ["Rate", `${ratePercent}%`],
    ["Term", `${years} years`],
    ["Property tax", `${taxMonthly} / mo`],
    ["Common charges", `${commonMonthly} / mo`],
  ] as const;

  const resultRows = [
    ["Mortgage", formatUsd(result.mortgage)],
    ["Property tax", formatUsd(result.tax)],
    ["Common charges", formatUsd(result.common)],
    ...(costTotals.monthly > 0 ? [["Other monthly", formatUsd(costTotals.monthly)] as const] : []),
    ["Monthly carry", formatUsd(monthTotal)],
  ] as const;
  const costPrintRows = [
    ...(costTotals.closing > 0 ? [["Purchase closing", formatUsd(costTotals.closing)] as const] : []),
    ...(costTotals.monthly > 0 ? [["Ongoing monthly", formatUsd(costTotals.monthly)] as const] : []),
    ...(costTotals.selling > 0 ? [["Selling costs", formatUsd(costTotals.selling)] as const] : []),
    ["Cash to close", formatUsd(cashTotal)],
    ...(showDeposit
      ? ([
          ["Deposit paid at contract", formatUsd(deposit)],
          ["Due at closing", formatUsd(dueClosing)],
        ] as const)
      : []),
  ] as const;
  const showPrintCosts = showCosts || showDeposit;
  const cashCopy = showDeposit
    ? `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close is ${formatUsd(cashTotal)}. A ${formatUsd(deposit)} deposit at contract leaves ${formatUsd(dueClosing)} due at closing.`
    : showCosts
      ? `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close begins near ${formatUsd(cashTotal)}, including the closing costs you entered.`
      : `On a ${formatUsd(input.price)} purchase with ${input.downPercent}% down. Cash to close begins near ${formatUsd(result.down)}.`;
  const sheetNote = showCosts
    ? "Educational only. Optional costs are estimates you entered. Commission rates vary and are negotiable. Confirm taxes, fees, and insurance for the property."
    : "Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still comes after the number.";

  return (
    <main className="calculator-sheet bg-brand-ivory text-brand-ink">
      <article className="calculator-print-doc ak-pp-page" aria-hidden="true">
        <div className="ak-pp-frame" aria-hidden="true">
          <i className="rule-out" />
          <i className="rule-in" />
        </div>
        <header className="ak-pp-mast">
          <img className="ak-pp-mark" src="/brand/ak-monogram-midnight.png" alt="" />
          <i className="ak-pp-rule" />
          <p className="ak-pp-kicker">Calculator</p>
        </header>
        <div className="ak-pp-body">
          <section className="ak-pp-sec">
            <p className="ak-pp-sec-head">
              <span className="ak-pp-num">01</span>
              <span className="ak-pp-sec-label">The month</span>
            </p>
            <p className="ak-pp-figure">{formatUsd(monthTotal)}</p>
            <p className="ak-pp-lead">What does this home cost each month?</p>
            <p className="ak-pp-copy">{cashCopy}</p>
          </section>
          <div className="ak-pp-inlay calculator-print-inlay">
            <section className="ak-pp-sec">
              <p className="ak-pp-sec-head">
                <span className="ak-pp-num">02</span>
                <span className="ak-pp-sec-label">The inputs</span>
              </p>
              <dl className="ak-pp-rows">
                {inputRows.map(([label, value]) => (
                  <div className="ak-pp-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <hr className="ak-pp-hairline" />
            <section className="ak-pp-sec">
              <p className="ak-pp-sec-head">
                <span className="ak-pp-num">03</span>
                <span className="ak-pp-sec-label">The breakdown</span>
              </p>
              <dl className="ak-pp-rows">
                {resultRows.map(([label, value]) => (
                  <div className="ak-pp-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
          {showPrintCosts ? (
            <section className="ak-pp-sec calculator-print-costs">
              <p className="ak-pp-sec-head">
                <span className="ak-pp-num">04</span>
                <span className="ak-pp-sec-label">Costs entered</span>
              </p>
              <dl className="ak-pp-rows">
                {costPrintRows.map(([label, value]) => (
                  <div className="ak-pp-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {showDeposit ? <p className="ak-pp-copy">{DEPOSIT_EXPLAINER}</p> : null}
            </section>
          ) : null}
          <p className="ak-pp-note calculator-note">{sheetNote}</p>
          <div className="ak-pp-notes">
            <p className="ak-pp-notes-label">Notes</p>
            <div className="ak-pp-notes-rules" aria-hidden="true">
              {NOTES_RULES.map((index) => (
                <i key={index} />
              ))}
            </div>
          </div>
        </div>
        <footer className="ak-pp-foot">
          <p className="ak-pp-slug">{PRINT_SLUG}</p>
          <p className="ak-pp-word">
            <i className="ak-pp-ticks" />
            AGENTKAMMER.COM
            <i className="ak-pp-ticks" />
          </p>
          <p className="ak-pp-foot-end">{sheetDate()}</p>
        </footer>
      </article>
      <div className="calculator-screen">
      <section className="calculator-month border-b border-brand-border bg-brand-navy text-brand-ivory">
        <PageSection className="calculator-month-inner grid gap-10 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-16">
          <div>
            <h1 className="text-lg uppercase tracking-[0.14em] text-brand-ivory sm:text-xl">Calculator</h1>
            <p className="mt-4 font-mono text-[clamp(3.25rem,8vw,5.5rem)] tabular-nums leading-[0.9] tracking-[-0.03em]">
              {formatUsd(monthTotal)}
            </p>
            <p className="mt-4 font-display text-[clamp(1.55rem,3vw,2.15rem)] leading-[1.12] text-brand-ivory">
              What does this home cost each month?
            </p>
          </div>
          <div className="border border-brand-ivory/30 px-5 py-5 lg:px-6">
            <p className="text-lg leading-snug text-brand-ivory sm:text-xl">
              {cashCopy}
            </p>
            <p className="mt-4 text-lg leading-snug text-brand-ivory sm:text-xl">
              Carry first. Listings later. Mortgage, tax, and common charges. Educational, not a pre-approval.
            </p>
          </div>
        </PageSection>
      </section>

      <PageSection className="calculator-body">
        <div className="calculator-work grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">
              Change one number. The month moves.
            </h2>
            <div className="mt-6 border border-brand-navy bg-white">
              <Field label="Purchase price" value={price} onChange={setPrice} wide />
              <Field
                label="Down payment"
                suffix="%"
                value={downPercent}
                onChange={(raw) => {
                  const next = holdDownPercent(raw);
                  setDownPercent(next.value);
                  setDownHeld(next.held);
                }}
              />
              {downHeld ? (
                <p className="border-b border-brand-navy/15 px-5 py-3 text-base leading-snug text-brand-navy sm:px-6">
                  It stays between 0 and 100.
                </p>
              ) : null}
              <Field label="Rate" suffix="%" value={ratePercent} onChange={setRatePercent} />
              <Field label="Term" suffix="years" value={years} onChange={setYears} />
              <Field label="Property tax" suffix="/ mo" value={taxMonthly} onChange={setTaxMonthly} />
              <Field label="Common charges" suffix="/ mo" value={commonMonthly} onChange={setCommonMonthly} />
              <div className="border-b border-brand-navy/15 px-5 py-4 last:border-b-0 sm:px-6">
                <div className="grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div>
                    <p className="text-lg text-brand-navy sm:text-xl">Earnest money deposit</p>
                    <p className="mt-1 text-base leading-snug text-brand-graphite">{DEPOSIT_HINT}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-1" role="group" aria-label="Deposit unit">
                      <button
                        type="button"
                        aria-pressed={depositMode === "percent"}
                        onClick={() => setDepositMode("percent")}
                        className={cn(
                          "border px-2.5 py-1 text-sm",
                          depositMode === "percent"
                            ? "border-brand-navy bg-brand-navy text-brand-ivory"
                            : "border-brand-navy/30 text-brand-navy",
                        )}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        aria-pressed={depositMode === "amount"}
                        onClick={() => setDepositMode("amount")}
                        className={cn(
                          "border px-2.5 py-1 text-sm",
                          depositMode === "amount"
                            ? "border-brand-navy bg-brand-navy text-brand-ivory"
                            : "border-brand-navy/30 text-brand-navy",
                        )}
                      >
                        $
                      </button>
                    </div>
                    <span className="flex items-baseline justify-end gap-3 font-mono text-[1.7rem] tabular-nums leading-none text-brand-navy sm:text-[2.05rem]">
                      <input
                        inputMode="decimal"
                        value={depositRaw}
                        onChange={(event) => setDepositRaw(event.target.value)}
                        aria-label="Earnest money deposit"
                        className="w-28 bg-transparent text-right outline-none placeholder:text-brand-graphite/35 sm:w-36"
                      />
                      {depositMode === "percent" ? (
                        <span className="font-sans text-lg text-brand-graphite sm:text-xl">%</span>
                      ) : null}
                    </span>
                    {showDeposit && depositMode === "percent" ? (
                      <p className="font-mono text-base tabular-nums text-brand-navy">{formatUsd(deposit)}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <CalculatorCosts
              price={input.price}
              draft={costDraft}
              onChange={setCostDraft}
              open={costsOpen}
              onOpenChange={setCostsOpen}
            />
          </div>

          <aside>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">The month</h2>
            <div className="mt-6 border border-brand-navy bg-white">
              {(
                [
                  ["Mortgage", result.mortgage],
                  ["Property tax", result.tax],
                  ["Common charges", result.common],
                  ...(costTotals.monthly > 0 ? [["Other monthly", costTotals.monthly] as const] : []),
                ] as Array<readonly [string, number]>
              ).map(([label, amount]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-brand-navy/15 px-5 py-4 sm:px-6">
                  <p className="text-lg text-brand-navy sm:text-xl">{label}</p>
                  <p className="font-mono text-[1.7rem] tabular-nums leading-none text-brand-navy sm:text-[2.05rem]">
                    {formatUsd(amount)}
                  </p>
                </div>
              ))}
              <div className="calculator-total flex items-baseline justify-between gap-6 bg-brand-navy px-5 py-5 text-brand-ivory sm:px-6">
                <p className="text-lg text-brand-ivory sm:text-xl">Monthly carry</p>
                <p className="font-mono text-[clamp(1.9rem,3vw,2.5rem)] tabular-nums leading-none text-brand-ivory">
                  {formatUsd(monthTotal)}
                </p>
              </div>
            </div>
            <div className="calculator-cash mt-6 border border-brand-navy bg-white">
              {(
                [
                  ["Cash to close", cashTotal],
                  ...(showDeposit ? ([["Deposit paid at contract", deposit], ["Due at closing", dueClosing]] as const) : []),
                  ...(costTotals.closing > 0 ? [["Purchase closing", costTotals.closing] as const] : []),
                  ...(costTotals.selling > 0 ? [["Selling costs", costTotals.selling] as const] : []),
                ] as Array<readonly [string, number]>
              ).map(([label, amount]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-brand-navy/15 px-5 py-4 last:border-b-0 sm:px-6">
                  <p className="text-lg text-brand-navy sm:text-xl">{label}</p>
                  <p className="font-mono text-[1.7rem] tabular-nums leading-none text-brand-navy sm:text-[2.05rem]">
                    {formatUsd(amount)}
                  </p>
                </div>
              ))}
              {showDeposit ? (
                <p className="px-5 py-3 text-base leading-snug text-brand-navy sm:px-6">{DEPOSIT_EXPLAINER}</p>
              ) : null}
            </div>
            <div className="calculator-omit mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center border border-brand-navy bg-white px-5 py-4 text-lg font-semibold text-brand-navy"
              >
                Save as PDF
              </button>
              <Link
                href="/situations"
                className="ak-call-button group inline-flex w-full items-center justify-between gap-4 px-5 py-4 text-base font-semibold uppercase tracking-[0.08em] text-brand-ivory sm:w-auto sm:text-lg"
              >
                What's changing
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-2 py-4 text-lg text-brand-navy">
                Contact
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </div>
          </aside>
        </div>
        <p className="calculator-note mt-5 text-lg leading-snug text-brand-navy">{sheetNote}</p>
      </PageSection>
      </div>
    </main>
  );
}
