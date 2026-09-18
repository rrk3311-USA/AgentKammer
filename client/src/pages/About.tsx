import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ArchitecturalHeroDrawing, CTA, PageHero } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function SketchDivider({ variant }: { variant: "private-advisory" | "decision-framework" | "building" }) {
  return (
    <div className="flex justify-center border-y border-brand-border bg-brand-navy py-10" aria-hidden>
      <ArchitecturalHeroDrawing
        eyebrow="About"
        title="Agent Kammer"
        variant={variant}
        className="opacity-90 [&_svg]:max-w-[18rem]"
      />
    </div>
  );
}

export default function About() {
  usePageMetadata({
    title: "About",
    description:
      "About Agent Kammer: private housing advisory that diagnoses life change and recommends the highest-value decision, including doing nothing.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="About"
        title="Private housing guidance before the market gets loud."
        description="Raphael Kammer built Agent Kammer for clients who want judgment, not a louder search. The practice diagnoses what changed, whether anything should change, and whether this is still where you belong."
        art="private-advisory"
      />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Practice</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          Manhattan decisions need more than a listing feed.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          Agent Kammer is an independent housing advisory practice. The work starts with life change, uncertainty, and trade-offs, before apartments or urgency take over.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          First purchase, relocation, a stay-or-go question, or a portfolio of homes: the process begins with clarity, not listings.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          A recommendation can be to wait, rent first, renovate, sell, buy, or do nothing. When a transaction is right, Agent Kammer remains the advisory layer and introduces the right local professionals for execution.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Some clients work together for weeks. Others for years. Decisions evolve, and the guidance evolves with them.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Helping people make better housing decisions throughout life, not just real estate transactions. Live where you belong, whether that means stay or move.
        </p>
      </article>

      <SketchDivider variant="building" />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">The Dapper Analyst</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          Judgment is the product.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          Agent Kammer sells a recommendation you can trust: buy, wait, renovate, rent, sell, or do nothing. The tone is fiduciary and sophisticated — not inspector theater, not a certification costume, not a building-as-hero pitch.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Research exists as a quiet side tool after the decision frame is clear. It never substitutes for asking whether anything should change.
        </p>
      </article>

      <SketchDivider variant="decision-framework" />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Principles</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          Three ideas organize the work.
        </h2>
        <ol className="mt-10 space-y-10">
          <li>
            <p className="font-display text-2xl text-brand-navy">Advisory first</p>
            <p className="mt-3 text-base leading-8 text-brand-graphite">
              Judgment and positioning before volume or velocity. Doing nothing can be the win.
            </p>
          </li>
          <li>
            <p className="font-display text-2xl text-brand-navy">Life first</p>
            <p className="mt-3 text-base leading-8 text-brand-graphite">
              Diagnose what changed, whether anything should change, and whether this is still where you belong — before inventory dominates attention.
            </p>
          </li>
          <li>
            <p className="font-display text-2xl text-brand-navy">Quiet execution</p>
            <p className="mt-3 text-base leading-8 text-brand-graphite">
              Measured, private, precise. Urgency is never manufactured.
            </p>
          </li>
        </ol>
        <Link
          href="/belonging"
          className="mt-12 inline-flex items-center gap-3 border-b border-brand-brass pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy transition-colors hover:text-brand-brass"
        >
          Find out if you’re living where you belong
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </article>

      <CTA
        title="Find out if you’re living where you belong."
        description="The Decision Assessment is how most relationships begin. A profile first. A Housing Strategy Session only when it adds judgment."
      />
    </main>
  );
}
