import { Link, useLocation } from "wouter";
import { grammar } from "@/components/visual-grammar";

const researchPaths = [
  {
    label: "Luxury Intelligence",
    description: "The public channel. Read the brief or save a PDF copy.",
    href: "/intelligence/luxury",
  },
  {
    label: "Resource Hub",
    description: "Field guides and Property Assessments.",
    href: "/resources",
  },
  {
    label: "International Buyer Guide",
    description: "Research sequence for clients arriving from abroad.",
    href: "/international",
  },
  {
    label: "Request a written next step",
    description: "Judgment on the decision, before listings take over.",
    href: "/contact",
  },
];

export function ContinueYourResearch() {
  const [location] = useLocation();
  const current = location.split(/[?#]/)[0] ?? location;
  const items = researchPaths.filter((item) => item.href !== current);

  return (
    <section className="border-t border-brand-midnight/10 bg-white px-6 py-14 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">Continue Your Research</p>
        <ul className="mt-8 space-y-6">
          {items.map((item) => (
            <li key={item.label} className="border-b border-brand-midnight/8 pb-6 last:border-0 last:pb-0">
              {item.href.startsWith("/resources") ? (
                <a href={item.href} className="group block">
                  <p className={`${grammar.rowTitle} transition group-hover:text-brand-navy-secondary`}>
                    {item.label} →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/68">{item.description}</p>
                </a>
              ) : (
                <Link href={item.href} className="group block">
                  <p className={`${grammar.rowTitle} transition group-hover:text-brand-navy-secondary`}>
                    {item.label} →
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-graphite/68">{item.description}</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
