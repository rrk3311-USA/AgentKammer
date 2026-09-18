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
  { step: "02", title: "Situation Assessment", href: "/belonging", text: "Build your situation profile." },
  { step: "03", title: "Situation", href: "#whats-changing", text: "Read the situation that fits." },
  { step: "04", title: "Strategy Session", href: "/contact?intent=strategy", text: "A live hour when you want judgment, not a listing tour." },
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
          <span className="ak-heading transition-colors group-hover:text-brand-navy-secondary">
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
        <p className="ak-kicker">{eyebrow}</p>
        <div className="ak-title-band mt-4">
          <h2 className="ak-title max-w-2xl">{title}</h2>
        </div>
        <p className="ak-lede mt-4 max-w-xl">{description}</p>
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
    <main className="bg-brand-paper">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-site px-6 py-16 lg:px-10 lg:py-24">
          <p className="ak-kicker">Situations</p>
          <div className="ak-title-band mt-4">
            <h1 className="ak-display max-w-4xl">
              Explore your situation, not a property search.
            </h1>
          </div>
          <p className="ak-lede mt-6 max-w-2xl">
            Decision Intelligence starts here: what changed in your life, what decision you face, and what you still need to understand. Each page is a Situation: research, not a product.
          </p>

          <ol className="mt-12 grid gap-4 border-t border-brand-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step}>
                <Link href={item.href} className="group block">
                  <p className="ak-kicker">{item.step}</p>
                  <p className="ak-heading mt-2 transition-colors group-hover:text-brand-navy-secondary">
                    {item.title}
                  </p>
                  <p className="ak-meta mt-2">{item.text}</p>
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
