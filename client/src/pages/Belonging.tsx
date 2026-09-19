import { Link } from "wouter";
import { MoveRight } from "lucide-react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { KAMMER_VERDICTS, PUBLIC_PRODUCTS } from "@/data/public-menu";
import { DecisionFramework } from "@/components/DecisionFramework";
import { DarkStatement, EditorialHero } from "@/components/visual-grammar";

const profileDimensions = [
  {
    step: "01",
    title: "Fit verdict",
    text: `${KAMMER_VERDICTS.join(", ")}. How well this life and place still fit. A verdict, not a /100 score.`,
  },
  {
    step: "02",
    title: "WHO",
    text: "Who the home is for now: household, rhythm, privacy, and the life that has to work here.",
  },
  {
    step: "03",
    title: "Decision Readiness",
    text: "Whether you have enough clarity to act, or whether more diagnosis still protects you.",
  },
  {
    step: "04",
    title: "Lifestyle Fit",
    text: "Routine, space, privacy, commute, and environment: what serves you and what drains you.",
  },
  {
    step: "05",
    title: "Financial Flexibility",
    text: "How much room you have to wait, renovate, relocate, or hold, without a hard sell frame.",
  },
  {
    step: "06",
    title: "Recommended Next Step",
    text: "A personalized recommendation, including whether to stay, wait, renovate, rent, buy, or sell, with the reasoning behind it.",
  },
];

export default function Belonging() {
  usePageMetadata({
    title: `${PUBLIC_PRODUCTS.situation.label} | Are You Living Where You Belong?`,
    description:
      "Take the Situation Assessment. Receive an Agent Kammer profile: fit verdict, WHO, readiness, lifestyle fit, timing, and a reasoned next step.",
    path: "/belonging",
  });

  return (
    <main className="bg-brand-ivory text-brand-ink">
      <EditorialHero
        eyebrow={PUBLIC_PRODUCTS.situation.label}
        title="Find out if you’re living where you belong."
        description="A guided life diagnostic about your life, priorities, and housing, not listings. Your responses help tailor your profile and the next step that would actually help."
      >
        <Link
          href="/contact?intent=situation"
          className="ak-call-button group inline-flex min-w-[19rem] items-center justify-between gap-6 rounded-button px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-ivory transition-colors"
        >
          Begin assessment
          <MoveRight className="h-4 w-4 text-brand-stone transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
        <p className="mt-6 max-w-xl text-base leading-7 text-brand-graphite">
          Prefer to write first?{" "}
          <Link href="/contact" className="text-brand-navy underline underline-offset-4">
            Send the next step
          </Link>
          . The scored profile is in active build. Requesting the assessment today opens a private intake so your Agent Kammer profile can be prepared manually. Same diagnostic, human-paced. Public language stays Pick, Consider, Wait, Pass, and WHO. Not a /100 score.
        </p>
      </EditorialHero>

      <DecisionFramework
        eyebrow="What You Receive"
        title="Your situation profile"
        description="Fit verdict and WHO are the show language: something you can revisit as life changes, not a one-time quiz result."
        items={profileDimensions}
      />

      <DarkStatement
        eyebrow="Not a valuation"
        title="Diagnose before you decide."
        description="Live Where You Belong is the outcome: stay or move. This Situation Assessment is the diagnostic that gets you there. People don’t take a real estate quiz; they receive an Agent Kammer profile."
        href="/contact?intent=situation"
        label="Start Assessment"
      />
    </main>
  );
}
