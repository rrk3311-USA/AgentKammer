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
      "About Agent Kammer: housing decisions guided by building intelligence, life-change diagnosis, and private advisory judgment.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="About"
        title="Private housing guidance before the market gets loud."
        description="Raphael Kammer built Agent Kammer for clients who want judgment — not a louder search. The practice diagnoses what changed, whether anything should change, and whether this is still where you belong."
        art="private-advisory"
      />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Practice</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          Manhattan decisions need more than a listing feed.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          Agent Kammer is an independent housing advisory practice. The work starts with life change, uncertainty, and trade-offs — then building-level literacy — before apartments or urgency take over.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Whether you’re planning your first purchase in five years, relocating, deciding whether to stay, or managing multiple properties, the process begins with clarity—not listings.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          A recommendation can be to wait, rent first, renovate, sell, buy, or do nothing. When a transaction is right, Agent Kammer remains the advisory layer and curates the right local professionals for execution.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Some clients work together for weeks. Others for years. Decisions evolve, and the guidance evolves with them.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          Buildings before listings. Helping people make better housing decisions throughout life—not just real estate transactions. Live Where You Belong — whether that means stay or move.
        </p>
      </article>

      <SketchDivider variant="building" />

      <article className="mx-auto max-w-[42rem] px-6 py-16 lg:px-10 lg:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Credentials That Matter</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[0.94] text-brand-navy">
          Building literacy changes the quality of advice.
        </h2>
        <p className="mt-8 text-lg leading-9 text-brand-graphite">
          ICC Commercial Building Inspector training, blueprint reading, OSHA 30, and New York State licensed real estate practice are not marketing props. They help separate cosmetic issues from functional and building-related risk before a client commits capital or time.
        </p>
        <p className="mt-6 text-lg leading-9 text-brand-graphite">
          That literacy sits behind Decision Briefs and Building Reports — used after the decision frame is clear, never as a substitute for asking whether anything should change.
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
            <p className="font-display text-2xl text-brand-navy">Building-led perspective</p>
            <p className="mt-3 text-base leading-8 text-brand-graphite">
              Building, block, and buyer brief together — before floor plans dominate attention.
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
        description="The Decision Assessment is how most relationships begin — a profile first, a Housing Strategy Session only when it adds judgment."
      />
    </main>
  );
}
