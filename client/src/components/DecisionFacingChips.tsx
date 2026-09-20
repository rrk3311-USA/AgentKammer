import React from "react";
import { decisionFacingItems } from "@/data/decision-navigation";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { cn } from "@/lib/utils";

const chipClass =
  "rounded-full border border-brand-border bg-white px-5 py-2.5 text-left text-[11px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:border-brand-brass hover:text-brand-brass";

export function DecisionFacingChips({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm leading-6 text-brand-graphite">
        Opens Guidance — a conversation on this page, not a new page.
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="What Decision Are You Facing? Opens Guidance">
        {decisionFacingItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={chipClass}
            aria-label={`Open Guidance: ${item.starter}`}
            onClick={() => openDecisionAssistant(item.starter)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
