import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { buildingReportsNav, primaryNav } from "@/components/site-shell";
import { serviceLandings } from "@/data/service-landings";

const changingLinks = [
  { label: "Relocation", href: "/services/executive-relocation-nyc" },
  { label: "More Space", href: "/services/school-district-planning-nyc" },
  { label: "First Home", href: "/buyer-advisory" },
  { label: "Upgrade", href: "/buyer-advisory" },
  { label: "Downsize", href: "/services/empty-nester-downsizing-nyc" },
  { label: "International", href: "/services/foreign-buyers-new-york" },
  { label: "1031", href: "/services/1031-exchange-new-york" },
  { label: "Estate", href: "/services/probate-estate-sales-nyc" },
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
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Agent Kammer</p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-brand-navy">
            Decisions before showings.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-brand-graphite">
            Tell us what is changing. We will help decide whether to buy, sell, rent, wait, renovate, or stay put before a search takes over.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-6 border border-brand-navy bg-brand-navy px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-brass"
            >
              Request a Call
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a
              href="mailto:info@agentkammer.com"
              className="inline-flex items-center border border-brand-border px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
            >
              info@agentkammer.com
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[0.8fr_0.8fr_1.45fr_0.8fr]">
          <nav aria-label="What is changing">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">What's Changing?</p>
            <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
              {changingLinks.map((item) => (
                <Link key={item.href + item.label} href={item.href} className="text-sm text-brand-navy transition-colors hover:text-brand-brass">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Site navigation">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Site</p>
            <div className="mt-4 grid gap-3">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-brand-navy transition-colors hover:text-brand-brass">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Decision briefs">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Decision Briefs</p>
            <div className="mt-4 grid gap-3">
              {featuredBriefs.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-brand-navy transition-colors hover:text-brand-brass">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Reports">
            <p className="text-[10px] uppercase tracking-[0.22em] text-brand-brass">Reports</p>
            <div className="mt-4 grid gap-3">
              {buildingReportsNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-brand-navy transition-colors hover:text-brand-brass">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex w-full max-w-site flex-col gap-3 px-6 py-6 text-[10px] uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between lg:px-10">
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
