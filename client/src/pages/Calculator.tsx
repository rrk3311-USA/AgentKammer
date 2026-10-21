import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  DEFAULT_CARRY,
  computeCarry,
  formatUsd,
  parseMoney,
  type CarryInput,
} from "@/lib/monthly-carry";
import { cn } from "@/lib/utils";

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
    description: "A quiet monthly-carry calculator. Price, down payment, rate, tax, and common charges — before the listing takes over.",
    path: "/calculator",
  });

  const [price, setPrice] = useState("3,500,000");
  const [downPercent, setDownPercent] = useState(String(DEFAULT_CARRY.downPercent));
  const [ratePercent, setRatePercent] = useState(String(DEFAULT_CARRY.ratePercent));
  const [years, setYears] = useState(String(DEFAULT_CARRY.years));
  const [taxMonthly, setTaxMonthly] = useState("2,800");
  const [commonMonthly, setCommonMonthly] = useState("3,200");

  const input: CarryInput = useMemo(
    () => ({
      price: parseMoney(price),
      downPercent: parseMoney(downPercent),
      ratePercent: parseMoney(ratePercent),
      years: parseMoney(years) || 30,
      taxMonthly: parseMoney(taxMonthly),
      commonMonthly: parseMoney(commonMonthly),
    }),
    [price, downPercent, ratePercent, years, taxMonthly, commonMonthly],
  );

  const result = useMemo(() => computeCarry(input), [input]);

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <PageSection className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-16">
          <div>
            <h1 className="text-lg uppercase tracking-[0.14em] text-brand-ivory sm:text-xl">Calculator</h1>
            <p className="mt-4 font-mono text-[clamp(3.25rem,8vw,5.5rem)] tabular-nums leading-[0.9] tracking-[-0.03em]">
              {formatUsd(result.monthly)}
            </p>
            <p className="mt-4 font-display text-[clamp(1.55rem,3vw,2.15rem)] leading-[1.12] text-brand-ivory">
              What does this home cost each month?
            </p>
          </div>
          <div className="border border-brand-ivory/30 px-5 py-5 lg:px-6">
            <p className="text-lg leading-snug text-brand-ivory sm:text-xl">
              On a {formatUsd(input.price)} purchase with {input.downPercent}% down. Cash to close begins near{" "}
              {formatUsd(result.down)}, before closing costs.
            </p>
            <p className="mt-4 text-lg leading-snug text-brand-ivory sm:text-xl">
              Carry first. Listings later. Mortgage, tax, and common charges — educational, not a pre-approval.
            </p>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">
              Change one number. The month moves.
            </h2>
            <div className="mt-6 border border-brand-navy bg-white">
              <Field label="Purchase price" value={price} onChange={setPrice} wide />
              <Field label="Down payment" suffix="%" value={downPercent} onChange={setDownPercent} />
              <Field label="Rate" suffix="%" value={ratePercent} onChange={setRatePercent} />
              <Field label="Term" suffix="years" value={years} onChange={setYears} />
              <Field label="Property tax" suffix="/ mo" value={taxMonthly} onChange={setTaxMonthly} />
              <Field label="Common charges" suffix="/ mo" value={commonMonthly} onChange={setCommonMonthly} />
            </div>
          </div>

          <aside>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">The month</h2>
            <div className="mt-6 border border-brand-navy bg-white">
              {(
                [
                  ["Mortgage", result.mortgage],
                  ["Property tax", result.tax],
                  ["Common charges", result.common],
                ] as const
              ).map(([label, amount]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-brand-navy/15 px-5 py-4 sm:px-6">
                  <p className="text-lg text-brand-navy sm:text-xl">{label}</p>
                  <p className="font-mono text-[1.7rem] tabular-nums leading-none text-brand-navy sm:text-[2.05rem]">
                    {formatUsd(amount)}
                  </p>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 px-5 py-5 sm:px-6">
                <p className="text-lg text-brand-navy sm:text-xl">Monthly carry</p>
                <p className="font-mono text-[clamp(1.9rem,3vw,2.5rem)] tabular-nums leading-none text-brand-navy">
                  {formatUsd(result.monthly)}
                </p>
              </div>
            </div>
            <p className="mt-5 text-lg leading-snug text-brand-navy">
              Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still
              comes after the number.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
      </PageSection>
    </main>
  );
}
