import React from "react";
import { decisionFacingItems } from "@/data/decision-navigation";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { cn } from "@/lib/utils";

const chipClass =
  "group inline-flex items-center gap-2 rounded-full border border-brand-navy/35 bg-brand-navy-secondary/15 px-6 py-3 text-left text-[12px] uppercase tracking-[0.12em] text-brand-navy transition-colors duration-brand hover:border-brand-navy hover:bg-brand-navy hover:text-brand-ivory";

export function DecisionFacingChips({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm leading-6 text-brand-graphite">
        Explore this decision with Guidance.
      </p>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="What Decision Are You Facing? Opens Guidance">
        {decisionFacingItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={chipClass}
            aria-label={`Open Guidance: ${item.starter}`}
            onClick={() => openDecisionAssistant(item.starter)}
          >
            {item.label}
            <span aria-hidden className="text-[13px] leading-none opacity-70 transition-transform duration-brand group-hover:translate-x-0.5">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
