import { Link } from "wouter";
import { ArrowRight, Mail } from "lucide-react";
import { buildingReportsNav, primaryNav } from "@/components/site-shell";
import { serviceLandings } from "@/data/service-landings";

const changingLinks = [
  { label: "Not Sure", href: "/buyer-advisory" },
  { label: "Stay Put", href: "/buyer-advisory" },
  { label: "Renew Lease", href: "/buyer-advisory" },
  { label: "Wait", href: "/buyer-advisory" },
  { label: "Renovate", href: "/buyer-advisory" },
  { label: "Refinance", href: "/buyer-advisory" },
  { label: "Rent Current Home", href: "/buyer-advisory" },
  { label: "Sell or Keep", href: "/buyer-advisory" },
  { label: "Relocation", href: "/services/executive-relocation-nyc" },
  { label: "More Space", href: "/services/school-district-planning-nyc" },
  { label: "First Home", href: "/buyer-advisory" },
  { label: "Upgrade", href: "/buyer-advisory" },
  { label: "Downsize", href: "/services/empty-nester-downsizing-nyc" },
  { label: "International", href: "/services/foreign-buyers-new-york" },
  { label: "1031", href: "/services/1031-exchange-new-york" },
  { label: "Estate", href: "/services/probate-estate-sales-nyc" },
];

const decisionGroups = [
  {
    title: "Should anything change?",
    links: changingLinks.slice(0, 4),
  },
  {
    title: "What are the options?",
    links: changingLinks.slice(4, 8),
  },
  {
    title: "Why is life changing?",
    links: changingLinks.slice(8),
  },
];

const featuredBriefs = serviceLandings.map((item) => ({
  label: item.navLabel,
  href: `/services/${item.slug}`,
}));

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-ivory text-brand-graphite">
      <div className="mx-auto grid w-full max-w-site gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] lg:px-10 lg:py-18">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Agent Kammer</p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
            Is doing nothing smarter?
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-brand-graphite">
            Tell us what is changing. We will help decide whether to buy, sell, rent, wait, renew, renovate, refinance, rent the current home, or stay put before a search takes over.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/contact"
              className="ak-call-button inline-flex items-center justify-between gap-6 px-5 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors"
            >
              Request a Call
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a
              href="/contact#request-call"
              aria-label="Email Agent Kammer"
              className="inline-flex items-center gap-3 border border-brand-border px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
            >
              <Mail className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
              Email
            </a>
          </div>
        </div>

        <div className="grid gap-10">
          <nav aria-label="What is changing" className="border-l border-brand-border pl-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-cocoa">Decision Tree</p>
            <h3 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.95] text-brand-navy">
              Start with what feels unclear.
            </h3>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {decisionGroups.map((group, index) => (
                <div key={group.title} className="relative border-t border-brand-border pt-4">
                  <span className="absolute -top-2 left-0 h-3 w-3 rounded-full border border-brand-brass bg-brand-ivory" aria-hidden />
                  <p className="text-[0.92rem] font-semibold uppercase tracking-[0.12em] text-brand-navy">
                    0{index + 1} · {group.title}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {group.links.map((item) => (
                      <Link key={item.href + item.label} href={item.href} className="text-sm leading-6 text-brand-graphite transition-colors hover:text-brand-brass">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="grid gap-8 sm:grid-cols-3">
            <nav aria-label="Site navigation">
              <p className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-brand-navy">Site</p>
              <div className="mt-4 grid gap-3">
                {primaryNav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-brand-graphite transition-colors hover:text-brand-brass">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Decision briefs">
              <p className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-brand-navy">Decision Briefs</p>
              <div className="mt-4 grid max-h-[24rem] gap-3 overflow-hidden">
                {featuredBriefs.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-brand-graphite transition-colors hover:text-brand-brass">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Reports">
              <p className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-brand-navy">Reports</p>
              <div className="mt-4 grid gap-3">
                {buildingReportsNav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-brand-graphite transition-colors hover:text-brand-brass">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-brass/28 bg-brand-charcoal text-brand-ivory">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-6 py-6 text-[10px] uppercase tracking-[0.18em] text-brand-ivory/78 sm:flex-row sm:items-center sm:justify-between lg:px-10">
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
