import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";

type ToolCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  hard?: boolean;
};

const PUBLIC_TOOLS: readonly ToolCard[] = [
  {
    eyebrow: "Monthly carry",
    title: "Calculator",
    description: "Price, down payment, rate, tax, and common charges before the listing takes over.",
    href: "/calculator",
  },
  {
    eyebrow: "Personal check-in",
    title: "Wheel of Life",
    description: "Score eight parts of how a week actually feels, then pick one small move.",
    href: "/tools/wheel-of-life/",
    hard: true,
  },
  {
    eyebrow: "Floor-plan day",
    title: "Livability",
    description: "Walk a floor plan the way a day moves through it, then read a layout score.",
    href: "/tools/livability/",
    hard: true,
  },
];

function CardBody({ card }: { card: ToolCard }) {
  return (
    <>
      <p className={grammar.eyebrow}>{card.eyebrow}</p>
      <h2 className={`mt-4 ${grammar.rowTitle}`}>{card.title}</h2>
      <p className="mt-4 text-base leading-7 text-brand-graphite">{card.description}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-navy">
        Open tool
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </>
  );
}

export default function ToolsHome() {
  usePageMetadata({
    title: "Interactive Tools",
    description: "Monthly carry, a personal check-in, and a floor-plan day you can walk.",
    path: "/tools",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Desk"
        title="Interactive Tools"
        description="A quiet monthly-carry calculator, a personal check-in, and a floor plan walked as a day."
        art="decision-framework"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Desk"
          title="Start with the month, the week, or the rooms."
          description="The calculator is already on the site. The Wheel of Life and Livability sit beside it."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PUBLIC_TOOLS.map((card) => {
            const className =
              "group block border border-brand-border bg-white p-7 transition-colors hover:border-brand-navy/30";
            if (card.hard) {
              return (
                <a key={card.href} href={card.href} className={className}>
                  <CardBody card={card} />
                </a>
              );
            }
            return (
              <Link key={card.href} href={card.href} className={className}>
                <CardBody card={card} />
              </Link>
            );
          })}
        </div>
      </PageSection>
    </main>
  );
}
