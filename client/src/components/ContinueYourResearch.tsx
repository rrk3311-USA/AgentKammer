import { Link } from "wouter";
import { grammar } from "@/components/visual-grammar";

const researchPaths = [
  {
    label: "Guides",
    description: "Decision frameworks, neighborhoods, and Property Assessment.",
    href: "/guides",
  },
  {
    label: "International Buyer Guide",
    description: "Research sequence for clients arriving from abroad.",
    href: "/international",
  },
  {
    label: "Request a Building Shortlist",
    description: "A building-first shortlist mapped to your timeline.",
    href: "/contact",
  },
];

export function ContinueYourResearch() {
  return (
    <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Continue Your Research</p>
        <ul className="mt-8 space-y-6">
          {researchPaths.map((item) => (
            <li key={item.label} className="border-b border-brand-midnight/8 pb-6 last:border-0 last:pb-0">
              <Link href={item.href} className="group block">
                <p className={`${grammar.rowTitle} transition group-hover:text-brand-navy-secondary`}>
                  {item.label} →
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/68">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
