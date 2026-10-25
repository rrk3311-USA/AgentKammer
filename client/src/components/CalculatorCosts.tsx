import { ChevronDown } from "lucide-react";
import {
  COST_GROUPS,
  addCustomCostRow,
  catalogItemsFor,
  catalogLineAmount,
  removeCustomCostRow,
  setCatalogAmount,
  setCatalogPercent,
  toggleCatalogItem,
  updateCustomCostRow,
  type CostCatalogItem,
  type CostDraft,
  type CostGroupId,
} from "@/lib/calculator-costs";
import { formatUsd } from "@/lib/monthly-carry";
import { cn } from "@/lib/utils";

function MoneyInput({
  value,
  onChange,
  suffix,
  labelledBy,
}: {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  labelledBy: string;
}) {
  return (
    <span className="flex items-baseline justify-end gap-2 font-mono text-[1.45rem] tabular-nums leading-none text-brand-navy sm:text-[1.7rem]">
      <input
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-labelledby={labelledBy}
        className="w-28 bg-transparent text-right outline-none placeholder:text-brand-graphite/35 sm:w-36"
      />
      {suffix ? <span className="font-sans text-base text-brand-graphite sm:text-lg">{suffix}</span> : null}
    </span>
  );
}

function CatalogRow({
  item,
  price,
  draft,
  onChange,
}: {
  item: CostCatalogItem;
  price: number;
  draft: CostDraft;
  onChange: (next: CostDraft) => void;
}) {
  const on = Boolean(draft.on[item.id]);
  const labelId = `cost-label-${item.id}`;
  const computed = catalogLineAmount(item, price, draft);

  return (
    <div className="border-b border-brand-navy/15 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <input
          id={`cost-on-${item.id}`}
          type="checkbox"
          checked={on}
          onChange={(event) => onChange(toggleCatalogItem(draft, item, event.target.checked, price))}
          className="mt-1 h-5 w-5 shrink-0 accent-brand-navy"
          aria-labelledby={labelId}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <label htmlFor={`cost-on-${item.id}`} id={labelId} className="text-lg text-brand-navy sm:text-xl">
                {item.label}
              </label>
              <p className="mt-1 text-base leading-snug text-brand-graphite">{item.hint}</p>
            </div>
            {on ? (
              <div className="shrink-0 sm:pt-0.5">
                {item.kind === "percent" ? (
                  <MoneyInput
                    value={draft.percents[item.id] ?? ""}
                    onChange={(value) => onChange(setCatalogPercent(draft, item.id, value))}
                    suffix="%"
                    labelledBy={labelId}
                  />
                ) : (
                  <MoneyInput
                    value={draft.amounts[item.id] ?? ""}
                    onChange={(value) => onChange(setCatalogAmount(draft, item.id, value))}
                    labelledBy={labelId}
                  />
                )}
              </div>
            ) : null}
          </div>
          {on && item.kind === "percent" && computed > 0 ? (
            <p className="mt-2 font-mono text-base tabular-nums text-brand-navy">{formatUsd(computed)}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CustomRows({
  group,
  draft,
  onChange,
}: {
  group: CostGroupId;
  draft: CostDraft;
  onChange: (next: CostDraft) => void;
}) {
  const rows = draft.custom[group];
  return (
    <div className="mt-2">
      {rows.map((row, index) => {
        const nameId = `cost-custom-name-${row.id}`;
        return (
          <div
            key={row.id}
            className="flex flex-col gap-3 border-b border-brand-navy/15 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <input
              id={nameId}
              value={row.name}
              onChange={(event) => onChange(updateCustomCostRow(draft, group, row.id, { name: event.target.value }))}
              placeholder={`Another cost ${index + 1}`}
              className="min-w-0 flex-1 bg-transparent text-lg text-brand-navy outline-none placeholder:text-brand-graphite/40 sm:text-xl"
            />
            <div className="flex items-center justify-between gap-4">
              <MoneyInput
                value={row.amount}
                onChange={(value) => onChange(updateCustomCostRow(draft, group, row.id, { amount: value }))}
                labelledBy={nameId}
              />
              <button
                type="button"
                onClick={() => onChange(removeCustomCostRow(draft, group, row.id))}
                className="text-base text-brand-navy underline-offset-4 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(addCustomCostRow(draft, group))}
        className="mt-3 text-lg text-brand-navy underline-offset-4 hover:underline"
      >
        Add another cost
      </button>
    </div>
  );
}

export function CalculatorCosts({
  price,
  draft,
  onChange,
  open,
  onOpenChange,
}: {
  price: number;
  draft: CostDraft;
  onChange: (next: CostDraft) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <section className="calculator-costs mt-12" data-testid="calculator-costs">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className="flex w-full items-center justify-between gap-4 border border-brand-navy bg-white px-5 py-4 text-left sm:px-6"
      >
        <span className="font-display text-[clamp(1.55rem,3vw,2.1rem)] leading-[1.1] text-brand-navy">
          Costs people often miss
        </span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-brand-navy transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="border border-t-0 border-brand-navy bg-white px-5 py-5 sm:px-6">
          <p className="text-lg leading-snug text-brand-navy">
            Optional. Toggle a line and enter an amount, or a commission percent. Rates vary and are negotiable.
            Totals are estimates you typed, not a quote.
          </p>
          <div className="mt-8 grid gap-10">
            {COST_GROUPS.map((group) => (
              <fieldset key={group.id} data-testid={`calculator-costs-${group.id}`}>
                <legend className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] text-brand-navy">
                  {group.label}
                </legend>
                <p className="mt-2 text-base leading-snug text-brand-graphite">{group.blurb}</p>
                <div className="mt-3">
                  {catalogItemsFor(group.id).map((item) => (
                    <CatalogRow key={item.id} item={item} price={price} draft={draft} onChange={onChange} />
                  ))}
                </div>
                <CustomRows group={group.id} draft={draft} onChange={onChange} />
              </fieldset>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
