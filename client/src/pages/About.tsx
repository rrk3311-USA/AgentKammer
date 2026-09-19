import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { EditorialHero, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export default function About() {
  usePageMetadata({
    title: "About",
    description:
      "About Agent Kammer: housing decisions guided by building intelligence, life-change diagnosis, and private advisory judgment.",
    path: "/about",
  });

  return (
    <main className="bg-brand-ivory">
      <EditorialHero
        eyebrow="About"
        title="Private housing guidance before the market gets loud."
        description="Raphael Kammer built Agent Kammer for clients who want judgment, not a louder search. The practice diagnoses what changed, whether anything should change, and whether this is still where you belong."
      />

      <article className="mx-auto max-w-[42rem] px-6 py-20 lg:px-10 lg:py-24">
        <p className={grammar.eyebrow}>Practice</p>
        <h2 className={`mt-4 ${grammar.section}`}>Manhattan decisions need more than a listing feed.</h2>
        <p className={`mt-8 ${grammar.bodyWide}`}>
          Agent Kammer is an independent housing advisory practice. The work starts with life change, uncertainty, and trade-offs, then building-level literacy, before apartments or urgency take over.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          First purchase, relocation, a stay-or-go question, or a portfolio of homes: the process begins with clarity, not listings.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          A recommendation can be to wait, rent first, renovate, sell, buy, or do nothing. When a transaction is right, Agent Kammer remains the advisory layer and introduces the right local professionals for execution.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          Some clients work together for weeks. Others for years. Decisions evolve, and the guidance evolves with them.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          Buildings before listings. Helping people make better housing decisions throughout life, not just real estate transactions. Live Where You Belong, whether that means stay or move.
        </p>
      </article>

      <article className="mx-auto max-w-[42rem] border-t border-brand-border px-6 py-20 lg:px-10 lg:py-24">
        <p className={grammar.eyebrow}>Credentials That Matter</p>
        <h2 className={`mt-4 ${grammar.section}`}>Building literacy changes the quality of advice.</h2>
        <p className={`mt-8 ${grammar.bodyWide}`}>
          We read buildings as assets: structure, operations, and how they actually work for the people who live in them. That literacy informs judgment. It is not a pitch for inspections.
        </p>
        <p className={`mt-6 ${grammar.bodyWide}`}>
          That literacy sits behind Decision Briefs and Building Reports, used after the decision frame is clear, never as a substitute for asking whether anything should change.
        </p>
      </article>

      <DecisionFramework
        eyebrow="Principles"
        title="Three ideas organize the work."
        description="Judgment first. Buildings next. Quiet execution throughout."
        items={[
          {
            step: "01",
            title: "Advisory first",
            text: "Judgment and positioning before volume or velocity. Doing nothing can be the win.",
          },
          {
            step: "02",
            title: "Building-led perspective",
            text: "Building, block, and buyer brief together, before floor plans dominate attention.",
          },
          {
            step: "03",
            title: "Quiet execution",
            text: "Measured, private, precise. Urgency is never manufactured.",
          },
        ]}
        action={
          <Link href="/belonging" className={grammar.textLink}>
            Find out if you’re living where you belong
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        }
      />

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
