import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";
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
    <label className="ak-felt-rule grid items-baseline gap-3 border-b py-5 sm:grid-cols-[minmax(0,1fr)_auto]">
      <span className={grammar.eyebrow}>{label}</span>
      <span className="flex items-baseline justify-end gap-2 font-display text-[1.45rem] leading-none text-brand-navy md:text-[1.85rem]">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "bg-transparent text-right outline-none placeholder:text-brand-graphite/35",
            wide ? "w-40 sm:w-52" : "w-24 sm:w-28",
          )}
        />
        {suffix ? <span className="text-[0.95rem] text-brand-graphite">{suffix}</span> : null}
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
            <p className={grammar.eyebrowOnDark}>Calculator</p>
            <p className="mt-5 font-display text-[clamp(3.5rem,11vw,6.25rem)] leading-[0.86] tracking-[-0.03em]">
              {formatUsd(result.monthly)}
            </p>
            <p className="mt-5 font-display text-[clamp(1.45rem,3.4vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-brand-ivory/88">
              What does this home cost each month?
            </p>
          </div>
          <div className="max-w-md space-y-5 border-l border-brand-ivory/16 pl-5 lg:pl-8">
            <p className={grammar.bodyOnDark}>
              On a {formatUsd(input.price)} purchase with {input.downPercent}% down. Cash to close begins near{" "}
              {formatUsd(result.down)}, before closing costs.
            </p>
            <p className={grammar.bodyOnDark}>
              Carry first. Listings later. Mortgage, tax, and common charges — educational, not a pre-approval.
            </p>
          </div>
        </PageSection>
      </section>

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div>
            <p className={grammar.eyebrow}>Inputs</p>
            <h2 className={`mt-3 ${grammar.section}`}>Change one number. The month moves.</h2>
            <div className="ak-felt-rule mt-8 border-t">
              <Field label="Purchase price" value={price} onChange={setPrice} wide />
              <Field label="Down payment" suffix="%" value={downPercent} onChange={setDownPercent} />
              <Field label="Rate" suffix="%" value={ratePercent} onChange={setRatePercent} />
              <Field label="Term" suffix="years" value={years} onChange={setYears} />
              <Field label="Property tax" suffix="/ mo" value={taxMonthly} onChange={setTaxMonthly} />
              <Field label="Common charges" suffix="/ mo" value={commonMonthly} onChange={setCommonMonthly} />
            </div>
          </div>

          <aside>
            <p className={grammar.eyebrow}>The month</p>
            <div className="ak-felt-rule mt-8 border-t">
              {(
                [
                  ["Mortgage", result.mortgage],
                  ["Property tax", result.tax],
                  ["Common charges", result.common],
                ] as const
              ).map(([label, amount]) => (
                <div key={label} className="ak-felt-rule flex items-baseline justify-between gap-6 border-b py-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">{label}</p>
                  <p className={grammar.rowTitle}>{formatUsd(amount)}</p>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 py-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-brand-navy">Monthly carry</p>
                <p className="font-display text-[clamp(1.85rem,4vw,2.4rem)] leading-none text-brand-navy">
                  {formatUsd(result.monthly)}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-6 text-brand-graphite">
              Educational only. Insurance, assessments, and closing costs sit outside this page. Judgment still
              comes after the number.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/situations"
                className="ak-call-button group inline-flex w-full items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-ivory sm:w-auto"
              >
                What's changing
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link href="/contact" className={cn(grammar.textLink, "sm:px-2")}>
                Contact
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </aside>
        </div>
      </PageSection>
    </main>
  );
}
