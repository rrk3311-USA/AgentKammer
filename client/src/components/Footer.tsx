import { Link } from "wouter";
import { decisionNavigationGroups } from "@/data/decision-navigation";

const decisionGroups = [
  {
    title: "What's changing?",
    links: [
      { label: "Relocation", href: "/services/executive-relocation-nyc" },
      { label: "More Space", href: "/services/school-district-planning-nyc" },
      { label: "Divorce", href: "/services/divorce-property-sales-nyc" },
      { label: "Estate / Probate", href: "/services/probate-estate-sales-nyc" },
    ],
  },
  {
    title: "Why does it matter?",
    links: [
      { label: "Timeline", href: "/buyer-advisory" },
      { label: "Budget", href: "/buyer-advisory" },
      { label: "Privacy", href: "/buyer-advisory" },
      { label: "Flexibility", href: "/buyer-advisory" },
    ],
  },
  {
    title: "What options exist?",
    links: [
      { label: "Buy", href: "/buyer-advisory" },
      { label: "Rent", href: "/buyer-advisory" },
      { label: "Wait", href: "/buyer-advisory" },
      { label: "Stay Put", href: "/buyer-advisory" },
    ],
  },
  {
    title: "What are the trade-offs?",
    links: [
      { label: "Condo vs Co-op", href: "/services/condo-vs-coop-foreign-buyers-nyc" },
      { label: "Rent vs Buy", href: "/services/rent-vs-buy-manhattan-relocation" },
      { label: "Sell or Keep", href: "/buyer-advisory" },
      { label: "Renovate or Move", href: "/buyer-advisory" },
    ],
  },
  {
    title: "What is the decision?",
    links: [
      { label: "Decision Frameworks", href: "/services#frameworks" },
      { label: "Decision Briefs", href: "/services" },
      { label: "Building Intelligence", href: "/building-reports" },
      { label: "Request a Call", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-ivory text-brand-graphite">
      <div className="mx-auto w-full max-w-site px-6 py-7 lg:px-10 lg:py-8">
        <nav aria-label="Decision Tree" className="border-b border-brand-border pb-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Decision Tree</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {decisionGroups.map((group, index) => (
              <div key={group.title} className="relative border-t border-brand-border pt-3">
                <span className="absolute -top-1.5 left-0 h-2.5 w-2.5 rounded-full border border-brand-brass bg-brand-ivory" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy">
                  0{index + 1} · {group.title}
                </p>
                <div className="mt-2 grid gap-1">
                  {group.links.map((item) => (
                    <Link key={item.href + item.label} href={item.href} className="text-[13px] leading-5 text-brand-graphite transition-colors hover:text-brand-brass">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-b border-brand-border py-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Explore the Decision Library</p>
          <div className="mt-4 grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
            {decisionNavigationGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy">{group.title}</p>
                <div className="mt-2.5 grid gap-1">
                  {group.items.map((item) => (
                    <Link key={group.title + item.href + item.label} href={item.href} className="text-[13px] leading-5 text-brand-graphite transition-colors hover:text-brand-brass">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-6 py-4 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>Copyright 2026 Agent Kammer</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Licenses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
