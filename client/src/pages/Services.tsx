import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/site-shell";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const whatsChanging = decisionNavigationGroups.find((group) => group.title === "What's Changing?");
const decisions = decisionNavigationGroups.find((group) => group.title === "What Decision Are You Facing?");
const understand = decisionNavigationGroups.find((group) => group.title === "What Are You Trying to Understand?");

const journey = [
  { step: "01", title: "What's Changing?", href: "#whats-changing", text: "Name the life change." },
  { step: "02", title: "Decision Assessment", href: "/belonging", text: "Build your Decision Profile." },
  { step: "03", title: "Decision Brief", href: "#whats-changing", text: "Read the situation that fits." },
  { step: "04", title: "Strategy", href: "/advisory", text: "Housing Strategy Session or Blueprint." },
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
          <span className="font-display text-2xl leading-none text-brand-navy transition-colors group-hover:text-brand-brass md:text-3xl">
            {item.label}
          </span>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-brand-navy/35 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-brass"
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
      <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-20">
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] text-brand-navy">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-brand-graphite">{description}</p>
        <div className="mt-10">
          <BriefList items={items} />
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  usePageMetadata({
    title: "What's Changing?",
    description:
      "Explore your housing situation like an operating system: what changed, what decision you face, and what you need to understand — before listings.",
    path: "/services",
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
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">What's Changing?</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,5.5vw,5.25rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
            Explore your situation — not a property search.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-graphite">
            This is the decision surface: what changed in your life, what decision you face, and what you still need to understand. Each page you open from here is a Decision Brief.
          </p>

          <ol className="mt-12 grid gap-4 border-t border-brand-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step}>
                <Link href={item.href} className="group block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">{item.step}</p>
                  <p className="mt-2 font-display text-xl leading-tight text-brand-navy transition-colors group-hover:text-brand-brass">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite">{item.text}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
        description="Once the situation is clear, name the path — including stay put, wait, or do nothing yet."
        items={decisions?.items ?? []}
      />

      <OsSection
        id="understand"
        eyebrow="03 · Research"
        title="What Are You Trying to Understand?"
        description="Ownership structure, building evidence, and market questions — after the life change and decision path are named."
        items={understand?.items ?? []}
      />

      <CTA
        title="Take the Decision Assessment."
        description="If the situation is still open, build a Decision Profile first — then return to the Decision Brief that fits."
        href="/belonging"
        label="Start Decision Assessment"
      />
    </main>
  );
}
