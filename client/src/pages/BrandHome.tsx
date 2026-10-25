import { useEffect, useState } from "react";
import { Link } from "wouter";
import NotFound from "@/pages/not-found";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { isBrandHomeProductionHost } from "@shared/brand-home-gate";

const EMAIL = "info@agentkammer.com";

/**
 * Stand-ins. The library has no daytime stone-facade street photograph,
 * and no living room with a park window.
 * Hero: Empire State Building skyline. Services: terrace seating and the skyline.
 */
const HERO_PHOTO = "/guides/assets/how-to-buy-in-nyc/nyc-hero-web.jpg";
const SERVICES_PHOTO = "/images/how-we-think-terrace.jpg";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const SERVICES = [
  { label: "Buyer representation", href: "/situations" },
  { label: "Seller representation", href: "/contact" },
  { label: "Relocation strategy", href: "/situations/executive-relocation-nyc" },
  { label: "Portfolio advisory", href: "/contact" },
  { label: "Development consulting", href: "/situations/new-development-nyc" },
] as const;

const APPROACH = [
  {
    title: "Clarity",
    text: "We cut through noise to identify what truly matters.",
    icon: IconGrid,
  },
  {
    title: "Intelligence",
    text: "Deep market knowledge and off-market insight.",
    icon: IconFrame,
  },
  {
    title: "Strategy",
    text: "Every move is intentional. Every detail considered.",
    icon: IconBars,
  },
  {
    title: "Discretion",
    text: "Your goals are personal. Your process should be too.",
    icon: IconLock,
  },
] as const;

const label =
  "font-sans text-[11px] font-medium uppercase tracking-[0.18em]";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A3447]";

function BrandMonogram({ tone, className }: { tone: "stone" | "ivory"; className: string }) {
  const color = tone === "stone" ? "#2A3447" : "#F5F2EB";
  return (
    <span
      aria-hidden
      className={className}
      style={{
        backgroundColor: color,
        WebkitMaskImage: "url(/brand/ak-monogram-ivory.png)",
        maskImage: "url(/brand/ak-monogram-ivory.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function WorkButton({ testId, withArrow = false }: { testId: string; withArrow?: boolean }) {
  return (
    <Link
      href="/contact"
      data-testid={testId}
      className={`${label} ${focus} inline-flex items-center justify-center gap-3 bg-[#2A3447] px-5 py-3 text-[#F5F2EB] transition-colors hover:bg-[#0D182B]`}
    >
      Work with AK
      {withArrow ? <span aria-hidden>→</span> : null}
    </Link>
  );
}

function NavLinks({ onNavigate, className }: { onNavigate?: () => void; className: string }) {
  return (
    <nav aria-label="Primary" className={className}>
      {NAV.map((item) =>
        item.href.startsWith("#") ? (
          <a key={item.href} href={item.href} onClick={onNavigate} className={`${label} ${focus} text-[#2A3447] hover:text-[#0D182B]`}>
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} onClick={onNavigate} className={`${label} ${focus} text-[#2A3447] hover:text-[#0D182B]`}>
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

export function BrandHomeGate() {
  if (isBrandHomeProductionHost(typeof window === "undefined" ? null : window.location.hostname)) {
    return <NotFound />;
  }
  return <BrandHome />;
}

export default function BrandHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  usePageMetadata({
    title: "Real Estate Strategy for a Life in Manhattan",
    description: "Intelligence. Discretion. Perspective. Guiding clients to the right decisions in the right places.",
    path: "/",
    robots: "noindex, nofollow",
  });

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div id="top" data-testid="page-brand-home" className="min-h-screen bg-[#F5F2EB] text-[#2F3136]">
      <header className="border-b border-[#D8D1C7] bg-[#F5F2EB]">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/home-brand" aria-label="Agent Kammer" className={`${focus} inline-flex`}>
            <BrandMonogram tone="stone" className="block h-11 w-11" />
          </Link>
          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            <NavLinks className="flex items-center gap-7 xl:gap-9" />
            <WorkButton testId="link-brand-work-nav" />
          </div>
          <button
            type="button"
            className={`${label} ${focus} text-[#2A3447] lg:hidden`}
            aria-expanded={menuOpen}
            aria-controls="brand-home-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {menuOpen ? (
          <div id="brand-home-menu" className="border-t border-[#D8D1C7] px-5 py-6 sm:px-8 lg:hidden">
            <NavLinks onNavigate={() => setMenuOpen(false)} className="flex flex-col items-start gap-5" />
            <div className="mt-6">
              <WorkButton testId="link-brand-work-menu" />
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="bg-[#F5F2EB]">
          <div className="mx-auto grid max-w-[90rem] lg:min-h-[40rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
              <h1 className="max-w-[12ch] font-serif text-[2.7rem] font-medium leading-[0.96] tracking-[-0.02em] text-[#2A3447] sm:text-6xl lg:text-[4.35rem]">
                Real Estate
                <br />
                Strategy for a
                <br />
                Life in Manhattan.
              </h1>
              <p className="mt-8 max-w-sm border-l border-[#D8D1C7] pl-5 font-sans text-[16px] leading-7 text-[#2F3136] sm:text-[17px]">
                Intelligence. Discretion. Perspective.
                <br />
                Guiding clients to the right decisions
                <br />
                in the right places.
              </p>
              <div className="mt-9">
                <WorkButton testId="link-brand-work-hero" withArrow />
              </div>
            </div>
            <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-full">
              <img
                src={HERO_PHOTO}
                alt="The Empire State Building in the Manhattan skyline"
                width={1916}
                height={1440}
                className="absolute inset-0 h-full w-full object-cover object-center"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[#2A3447] text-[#F5F2EB]">
          <div className="mx-auto max-w-[90rem] px-5 py-16 text-center sm:px-8 lg:px-12 lg:py-20">
            <p className={`${label} text-[#F5F2EB]/70`}>The Agent Kammer Approach</p>
            <h2 className="mt-4 font-serif text-[2.15rem] font-medium leading-tight text-[#F5F2EB] sm:text-5xl">
              Strategy over transactions.
            </h2>
            <div className="mx-auto mt-6 h-px w-10 bg-[#F5F2EB]/55" />
            <ul className="mt-12 grid sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {APPROACH.map((item, index) => (
                <li
                  key={item.title}
                  className={`border-[#F5F2EB]/15 px-4 py-8 sm:px-6 lg:px-8 ${
                    index % 2 === 1 ? "sm:border-l" : ""
                  } ${index > 0 ? "lg:border-l" : ""}`}
                >
                  <item.icon />
                  <h3 className={`${label} mt-5 text-[#F5F2EB]`}>{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-[16rem] font-sans text-[14px] leading-6 text-[#F5F2EB]/78">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="bg-[#F5F2EB]">
          <div className="mx-auto grid max-w-[90rem] lg:grid-cols-2">
            <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
              <p className={`${label} text-[#2A3447]/65`}>Services</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-[2.35rem] font-medium leading-[1.05] text-[#2A3447] sm:text-5xl">
                Tailored guidance.
                <br />
                Exceptional results.
              </h2>
              <ul className="mt-10 border-t border-[#D8D1C7]">
                {SERVICES.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className={`${label} ${focus} group flex items-center justify-between gap-4 border-b border-[#D8D1C7] py-4 text-[#2A3447] transition-colors hover:text-[#0D182B]`}
                    >
                      <span>{service.label}</span>
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[22rem] lg:min-h-full">
              <img
                src={SERVICES_PHOTO}
                alt="Terrace seating looking across the Manhattan skyline, including the Empire State Building"
                width={1519}
                height={1600}
                className="absolute inset-0 h-full w-full object-cover object-[70%_58%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-[#D8D1C7] bg-[#F5F2EB]">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-0 lg:px-12 lg:py-20">
            <blockquote className="lg:pr-16">
              <p className="font-serif text-[1.85rem] font-medium leading-snug text-[#2A3447] sm:text-[2.15rem]">
                <span aria-hidden className="mr-2 font-serif text-4xl leading-none text-[#2A3447]">
                  “
                </span>
                Raphael brings rare perspective, relentless preparation, and the highest level of integrity to every decision.
              </p>
              <footer className={`${label} mt-8 text-[#2F3136]/70`}>— Private client</footer>
            </blockquote>
            <div className="lg:border-l lg:border-[#D8D1C7] lg:pl-16">
              <p className={`${label} text-[#2A3447]/65`}>Insights</p>
              <h2 className="mt-4 font-serif text-[2.15rem] font-medium leading-tight text-[#2A3447] sm:text-4xl">
                Analysis. Perspective. Advantage.
              </h2>
              <p className="mt-5 max-w-md font-sans text-[16px] leading-7 text-[#2F3136]">
                Weekly insights on Manhattan real estate, market trends, and strategic opportunities.
              </p>
              <Link href="/insights" className={`${label} ${focus} mt-8 inline-flex items-center gap-3 text-[#2A3447] hover:text-[#0D182B]`}>
                View insights
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0D182B] text-[#F5F2EB]">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 lg:px-12 lg:py-16">
          <div>
            <BrandMonogram tone="ivory" className="block h-16 w-16" />
            <p className={`${label} mt-4 text-[#F5F2EB]/75`}>Real estate strategist</p>
          </div>
          <address className="font-sans text-[14px] not-italic leading-7 text-[#F5F2EB]/88">
            <a href={`mailto:${EMAIL}`} className={`${focus} hover:text-[#F5F2EB]`}>
              {EMAIL}
            </a>
            <p className="mt-2">New York, New York</p>
          </address>
          <div className="lg:border-l lg:border-[#F5F2EB]/15 lg:pl-10">
            <p className="max-w-xs font-sans text-[14px] leading-6 text-[#F5F2EB]/78">
              Strategic real estate guidance for those who value discretion, intelligence, and results.
            </p>
            <p className={`${label} mt-8 text-[#F5F2EB]/55`}>© 2026 Agent Kammer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IconGrid() {
  return (
    <svg viewBox="0 0 32 32" className="mx-auto h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" />
      <rect x="18.5" y="5.5" width="8" height="8" />
      <rect x="5.5" y="18.5" width="8" height="8" />
      <rect x="18.5" y="18.5" width="8" height="8" />
    </svg>
  );
}

function IconFrame() {
  return (
    <svg viewBox="0 0 32 32" className="mx-auto h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d="M8 12V8h4M20 8h4v4M24 20v4h-4M12 24H8v-4" />
      <rect x="12" y="12" width="8" height="8" />
    </svg>
  );
}

function IconBars() {
  return (
    <svg viewBox="0 0 32 32" className="mx-auto h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d="M9 23V15M16 23V9M23 23V13" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 32 32" className="mx-auto h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="8" y="14" width="16" height="11" />
      <path d="M12 14v-3.5a4 4 0 0 1 8 0V14" />
    </svg>
  );
}
