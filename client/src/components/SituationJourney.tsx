import React, { useState } from "react";
import { Link } from "wouter";
import { HomeCloseCtas } from "@/components/HomeCloseCtas";
import { quietChipClass } from "@/components/Footer";
import {
  decisionFacingItems,
  decisionNavigationGroups,
  type DecisionNavItem,
} from "@/data/decision-navigation";
import { grammar } from "@/components/visual-grammar";
import { cn } from "@/lib/utils";

const changeItems =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];
const understandItems =
  decisionNavigationGroups.find((group) => group.title === "What Are You Trying to Understand?")?.items ?? [];

const tapChipClass = cn(quietChipClass, "min-h-11 px-3.5 py-2.5 text-[11px] tracking-[0.1em]");

function StepLabel({ step, title }: { step: string; title: string }) {
  return (
    <h2 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-ivory/56">
      <span className="mr-2 text-brand-ivory/40">{step}</span>
      {title}
    </h2>
  );
}

function PillRow({
  items,
  selected,
  onSelect,
  label,
  testId,
}: {
  items: readonly DecisionNavItem[];
  selected: DecisionNavItem | null;
  onSelect: (item: DecisionNavItem) => void;
  label: string;
  testId?: string;
}) {
  return (
    <div
      className="mt-4 flex flex-wrap items-center justify-start gap-2"
      role="group"
      aria-label={label}
      data-ak-situations-pills={testId === "change" ? true : undefined}
      data-ak-whats-changing={testId === "change" ? true : undefined}
    >
      {items.map((item) => {
        const on = selected?.label === item.label;
        return (
          <button
            key={item.label}
            type="button"
            className={cn(tapChipClass, on && "ak-quiet-chip--on")}
            aria-pressed={on}
            onClick={() => onSelect(item)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function SituationJourney({
  eyebrow,
  title = "Start from what changed.",
  description,
  heading = "h2",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  heading?: "h1" | "h2";
} = {}) {
  const [change, setChange] = useState<DecisionNavItem | null>(null);
  const [decision, setDecision] = useState<DecisionNavItem | null>(null);
  const [understand, setUnderstand] = useState<DecisionNavItem | null>(null);
  const Heading = heading;

  return (
    <section
      id="whats-changing"
      data-ak-situation-journey
      className="bg-brand-navy text-brand-ivory"
    >
      <div className="mx-auto flex w-full max-w-site flex-col items-start px-5 py-10 text-left sm:px-6 lg:px-10 lg:py-14">
        {eyebrow ? <p className={grammar.eyebrowOnDark}>{eyebrow}</p> : null}
        <Heading className={cn(eyebrow ? "mt-3" : "", "max-w-[16ch]", heading === "h1" ? grammar.displayOnDark : grammar.sectionOnDark)}>
          {title}
        </Heading>
        {description ? <p className={cn("mt-4 max-w-xl", grammar.bodyOnDark)}>{description}</p> : null}

        <StepLabel step="01" title="What's changing?" />
        <PillRow
          items={changeItems}
          selected={change}
          onSelect={(item) => {
            setChange(item);
            setDecision(null);
            setUnderstand(null);
          }}
          label="What's Changing"
          testId="change"
        />
        {change ? (
          <Link href={change.href} className="mt-4 text-[12px] uppercase tracking-[0.16em] text-brand-ivory/70 underline-offset-4 hover:text-brand-ivory">
            Read more
          </Link>
        ) : null}

        {change ? (
          <>
            <StepLabel step="02" title="What decision are you facing?" />
            <p className="mt-3 max-w-xl text-[14px] leading-6 text-brand-ivory/68">
              Stay on this page. Name the decision. Guidance is optional.
            </p>
            <PillRow
              items={decisionFacingItems}
              selected={decision}
              onSelect={(item) => {
                setDecision(item);
                setUnderstand(null);
              }}
              label="What decision are you facing?"
            />
          </>
        ) : null}

        {decision ? (
          <>
            <StepLabel step="03" title="What are you trying to understand?" />
            <PillRow
              items={understandItems}
              selected={understand}
              onSelect={setUnderstand}
              label="What are you trying to understand?"
            />
            {understand ? (
              <Link href={understand.href} className="mt-4 text-[12px] uppercase tracking-[0.16em] text-brand-ivory/70 underline-offset-4 hover:text-brand-ivory">
                Read more
              </Link>
            ) : null}
          </>
        ) : null}

        {change ? (
          <div className="mt-10 w-full max-w-[20rem]">
            <HomeCloseCtas />
          </div>
        ) : null}
      </div>
    </section>
  );
}
