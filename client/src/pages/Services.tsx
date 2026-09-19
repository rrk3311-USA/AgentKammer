import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA, PageHero } from "@/components/site-shell";
import { DecisionFramework } from "@/components/DecisionFramework";
import { grammar } from "@/components/visual-grammar";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
const decisions = decisionNavigationGroups.find((group) => group.title === "What Decision Are You Facing?");
const understand = decisionNavigationGroups.find((group) => group.title === "What Are You Trying to Understand?");

const journey = [
  { step: "01", title: "What's Changing?", text: "Name the life change.", href: "#whats-changing", cta: "Open life changes" },
  { step: "02", title: "Situation Assessment", text: "Build your situation profile.", href: "/belonging", cta: "Start assessment" },
  { step: "03", title: "Situation", text: "Read the situation that fits.", href: "#whats-changing", cta: "Browse situations" },
  { step: "04", title: "Strategy Session", text: "A live hour when you want judgment, not a listing tour.", href: "/contact?intent=strategy", cta: "Request the hour" },
] as const;

function BriefList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="border-t border-brand-border">
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="group flex items-baseline justify-between gap-6 border-b border-brand-border py-6"
        >
          <span className={`${grammar.rowTitle} transition-colors group-hover:text-brand-navy-secondary`}>
            {item.label}
          </span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-brand-navy/35 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-navy-secondary"
            strokeWidth={1.5}
          />
        </Link>
      ))}
    </div>
  );
}

function OsSection({
  id,
  eyebrow,
  title,
  description,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: { label: string; href: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-brand-border">
      <div className={grammar.pad}>
        <p className={grammar.eyebrow}>{eyebrow}</p>
        <h2 className={`mt-4 max-w-2xl ${grammar.section}`}>{title}</h2>
        <p className={`mt-5 ${grammar.body}`}>{description}</p>
        <div className="mt-10">
          <BriefList items={items} />
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  usePageMetadata({
    title: "Situations",
    description:
      "Explore your housing situation: what changed, what decision you face, and what you need to understand, before listings.",
    path: "/situations",
  });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const aliases: Record<string, string> = {
      "life-changes": "whats-changing",
      "property-decisions": "understand",
    };
    const targetId = aliases[hash] ?? hash;
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Situations"
        title="Explore your situation, not a property search."
        description="Decision Intelligence starts here: what changed in your life, what decision you face, and what you still need to understand. Each page is a Situation: research, not a product."
        art="situations"
      />

      <DecisionFramework
        eyebrow="Start Here"
        title="A clear path through the decision."
        description="Four steps. No overlap. Name what changed, then diagnose, then read, then a live hour only if you want judgment."
        items={journey}
      />

      <OsSection
        id="whats-changing"
        eyebrow="01 · Life Changes"
        title="What's Changing?"
        description="Start with the situation that sounds most like yours. The life change comes before the listing."
        items={whatsChanging?.items ?? []}
      />

      <OsSection
        id="decisions"
        eyebrow="02 · Paths"
        title="What Decision Are You Facing?"
        description="Once the situation is clear, name the path, including stay put, wait, or do nothing yet."
        items={decisions?.items ?? []}
      />

      <OsSection
        id="understand"
        eyebrow="03 · Research"
        title="What Are You Trying to Understand?"
        description="Ownership structure, building evidence, and market questions, after the life change and decision path are named."
        items={understand?.items ?? []}
      />

      <CTA
        title="Start with the Situation Assessment."
        description="If the situation is still open, begin the diagnostic. If an address is already in play, request a Property Assessment."
        href="/belonging"
        label="Situation Assessment"
        eyebrow="Start Here"
      />
    </main>
  );
}
