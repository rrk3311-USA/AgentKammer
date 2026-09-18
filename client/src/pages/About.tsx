import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ArchitecturalHeroDrawing, CTA, PageHero } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

function SketchDivider({ variant }: { variant: "private-advisory" | "decision-framework" | "building" }) {
  return (
    <div className="flex justify-center border-y border-brand-border bg-brand-ivory py-10" aria-hidden>
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
      "About Agent Kammer: housing decisions guided by building intelligence, life-change diagnosis, and private advisory judgment.",
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
        <p className="ak-kicker">Practice</p>
        <h2 className="ak-title mt-4">
          Manhattan decisions need more than a listing feed.
        </h2>
        <p className="ak-lede mt-8">
          Agent Kammer is an independent housing advisory practice. The work starts with life change, uncertainty, and trade-offs, then building-level literacy, before apartments or urgency take over.
        </p>
        <p className="ak-copy mt-6">
          First purchase, relocation, a stay-or-go question, or a portfolio of homes: the process begins with clarity, not listings.
        </p>
        <p className="ak-copy mt-6">
          A recommendation can be to wait, rent first, renovate, sell, buy, or do nothing. When a transaction is right, Agent Kammer remains the advisory layer and introduces the right local professionals for execution.
        </p>
        <p className="ak-copy mt-6">
          Some clients work together for weeks. Others for years. Decisions evolve, and the guidance evolves with them.
        </p>
        <p className="ak-copy mt-6">
          Buildings before listings. Helping people make better housing decisions throughout life, not just real estate transactions. Live Where You Belong, whether that means stay or move.
        </p>
      </article>

      <SketchDivider variant="building" />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="ak-kicker">Credentials That Matter</p>
        <h2 className="ak-title mt-4">
          Building literacy changes the quality of advice.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          We read buildings as assets: structure, operations, and how they actually work for the people who live in them. That literacy informs judgment. It is not a pitch for inspections.
        </p>
        <p className="ak-copy mt-6">
          That literacy sits behind Decision Briefs and Building Reports, used after the decision frame is clear, never as a substitute for asking whether anything should change.
        </p>
      </article>

      <SketchDivider variant="decision-framework" />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="ak-kicker">Principles</p>
        <h2 className="ak-title mt-4">
          Three ideas organize the work.
        </h2>
        <ol className="mt-10 space-y-10">
          <li>
            <p className="ak-heading">Advisory first</p>
            <p className="ak-copy mt-3">
              Judgment and positioning before volume or velocity. Doing nothing can be the win.
            </p>
          </li>
          <li>
            <p className="ak-heading">Building-led perspective</p>
            <p className="ak-copy mt-3">
              Building, block, and buyer brief together, before floor plans dominate attention.
            </p>
          </li>
          <li>
            <p className="ak-heading">Quiet execution</p>
            <p className="ak-copy mt-3">
              Measured, private, precise. Urgency is never manufactured.
            </p>
          </li>
        </ol>
        <Link
          href="/belonging"
          className="ak-nav-link mt-12 inline-flex items-center gap-3 border-b border-brand-border pb-1 text-brand-navy transition-colors hover:text-brand-navy-secondary"
        >
          Find out if you’re living where you belong
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </article>

      <CTA
        title="Find out if you’re living where you belong."
        description="The Situation Assessment is how most relationships begin. A profile first. A Strategy Session only when it adds judgment."
        href="/belonging"
        label="Situation Assessment"
        eyebrow="Start Here"
      />
    </main>
  );
}
