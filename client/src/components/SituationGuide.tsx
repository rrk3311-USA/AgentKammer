import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITUATION_GUIDE } from "@/data/situation-guide";
import { cn } from "@/lib/utils";

export function SituationGuide({
  id,
}: {
  id?: string;
} = {}) {
  const [opened, setOpened] = useState(1);

  return (
    <div className="ak-situation-guide" data-ak-situation-guide id={id}>
      {SITUATION_GUIDE.map((step, index) => {
        const stepNum = index + 1;
        const live = opened >= stepNum;
        const next = opened === stepNum;
        return (
          <section
            key={step.num}
            className={cn("ak-guide-step", live && "is-live", next && "is-next")}
            data-ak-guide-step={step.num}
            id={step.num === "02" ? "decisions" : undefined}
          >
            <p className="ak-guide-step-head">
              <span className="ak-guide-num">{step.num}</span>
              <span className="ak-guide-title">{step.title}</span>
            </p>
            <p className="ak-guide-lead">{step.lead}</p>
            <div className="ak-guide-rows">
              {step.items.map((item) => (
                <Link
                  key={item.label + item.href}
                  href={item.href}
                  className="ak-guide-row"
                  onClick={() => setOpened((current) => Math.max(current, stepNum + 1))}
                >
                  <span className="ak-guide-row-copy">
                    <span className="ak-guide-row-label">{item.label}</span>
                    <span className="ak-guide-row-line">{item.line}</span>
                  </span>
                  <ArrowRight className="ak-guide-row-arrow" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
