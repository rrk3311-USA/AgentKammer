import { Link } from "wouter";
import { CTA } from "@/components/site-shell";
import { quietChipClass } from "@/components/Footer";
import { decisionFacingItems, decisionNavigationGroups } from "@/data/decision-navigation";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { HowWeDecide } from "@/components/HowWeDecide";
import { grammar } from "@/components/visual-grammar";
import { cn } from "@/lib/utils";

const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
const understand = decisionNavigationGroups.find((group) => group.title === "What Are You Trying to Understand?");

const tapChipClass = cn(quietChipClass, "min-h-11 px-3.5 py-2.5 text-[11px] tracking-[0.1em]");

export default function Services() {
  usePageMetadata({
    title: "Situations",
    description: "Start from what changed. Twelve life changes, then a private read if you want one.",
    path: "/situations",
  });

  const changeItems = whatsChanging?.items ?? [];
  const understandItems = understand?.items ?? [];

  return (
    <main className="bg-brand-ivory">
      <section className="bg-brand-navy text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col items-start px-5 py-10 text-left sm:px-6 lg:px-10 lg:py-14">
          <p className={grammar.eyebrowOnDark}>Situations</p>
          <h1 className={`mt-3 max-w-[16ch] ${grammar.displayOnDark}`}>Start from what changed.</h1>
          <p className={`mt-4 max-w-xl ${grammar.bodyOnDark}`}>
            Name the life change. We will sit with that before anything else.
          </p>

          <h2 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-ivory/56">
            What's Changing?
          </h2>
          <nav
            aria-label="What's Changing"
            data-ak-situations-pills
            className="mt-4 flex flex-wrap items-center justify-start gap-2"
          >
            {changeItems.map((item) => (
              <Link key={item.href + item.label} href={item.href} className={tapChipClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <h2 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-ivory/56">
            What decision are you facing?
          </h2>
          <div
            className="mt-4 flex flex-wrap items-center justify-start gap-2"
            role="group"
            aria-label="What decision are you facing? Opens Guidance"
          >
            {decisionFacingItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={tapChipClass}
                aria-label={`Open Guidance: ${item.starter}`}
                onClick={() => openDecisionAssistant(item.starter)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <h2 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-ivory/56">
            What are you trying to understand?
          </h2>
          <nav
            aria-label="What are you trying to understand?"
            className="mt-4 flex flex-wrap items-center justify-start gap-2"
          >
            {understandItems.map((item) => (
              <Link key={item.href + item.label} href={item.href} className={tapChipClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <HowWeDecide />

      <CTA
        title="When you want us to look with you."
        description="If one of these already feels like your week, write to us. We will read the situation before we recommend a next step."
        href="/belonging"
        label="Request a Situation Assessment"
        eyebrow="Request a Situation Assessment"
        showEyebrow={false}
        align="center"
        compact
        tone="ivory"
      />
    </main>
  );
}
