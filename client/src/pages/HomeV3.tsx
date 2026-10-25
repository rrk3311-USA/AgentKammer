import { useEffect, useState } from "react";
import { Link } from "wouter";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { isBrandHomeProductionHost } from "@shared/brand-home-gate";

const EMAIL = "info@agentkammer.com";
const HERO_PHOTO = "/images/how-we-think-terrace.jpg";

const NAV = [
  { label: "Start Here", href: "/situations" },
  { label: "Approach", href: "#approach" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const QUESTIONS = [
  {
    step: "01",
    title: "What's changing?",
    text: "Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later.",
  },
  {
    step: "02",
    title: "Should anything change?",
    text: "Sometimes the highest-value recommendation is to do nothing.",
  },
  {
    step: "03",
    title: "Where do you belong?",
    text: "Even if you stay, is the environment still serving the life you want?",
  },
] as const;

const whatsChanging =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

const label = "font-sans text-[11px] font-medium uppercase tracking-[0.18em]";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A3447]";
const stoneButton =
  "h-auto w-full whitespace-normal rounded-none border-0 bg-[#2A3447] px-5 py-3 text-center font-sans text-[13px] font-medium normal-case tracking-normal text-[#F5F2EB] hover:bg-[#0D182B] sm:w-auto";

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

function ChangingButton() {
  return (
    <Button asChild className={stoneButton}>
      <Link href="/situations">What's changing</Link>
    </Button>
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

export function HomeV3Gate() {
  if (isBrandHomeProductionHost(typeof window === "undefined" ? null : window.location.hostname)) {
    return <NotFound />;
  }
  return <HomeV3 />;
}

export default function HomeV3() {
  const [menuOpen, setMenuOpen] = useState(false);

  usePageMetadata({
    title: "Agent Kammer | Private Housing Advisory",
    description:
      "Private housing guidance before the market gets loud. Local execution when needed. Stay, renovate, rent, buy, sell, or wait.",
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
    <div id="top" data-testid="page-home-v3" className="min-h-screen overflow-x-hidden bg-[#F5F2EB] text-[#2F3136]">
      <header className="border-b border-[#D8D1C7] bg-[#F5F2EB]">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/home-v3" aria-label="Agent Kammer" className={`${focus} inline-flex shrink-0`}>
            <BrandMonogram tone="stone" className="block h-11 w-11" />
          </Link>
          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            <NavLinks className="flex items-center gap-7 xl:gap-9" />
            <ChangingButton />
          </div>
          <button
            type="button"
            className={`${label} ${focus} text-[#2A3447] lg:hidden`}
            aria-expanded={menuOpen}
            aria-controls="home-v3-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {menuOpen ? (
          <div id="home-v3-menu" className="border-t border-[#D8D1C7] px-5 py-6 sm:px-8 lg:hidden">
            <NavLinks onNavigate={() => setMenuOpen(false)} className="flex flex-col items-start gap-5" />
            <div className="mt-6">
              <ChangingButton />
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="bg-[#F5F2EB]">
          <div className="mx-auto grid max-w-[90rem] lg:min-h-[40rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
              <p className={`${label} text-[#2A3447]/70`}>Agent Kammer · Private Housing Advisory</p>
              <h1 className="mt-4 max-w-[12ch] font-serif text-[2.7rem] font-medium leading-[0.96] tracking-[-0.02em] text-[#2A3447] sm:text-6xl lg:text-[4.35rem]">
                Live where
                <br />
                you belong
              </h1>
              <p className="mt-6 max-w-md font-sans text-[16px] leading-7 text-[#2F3136] sm:text-[17px]">
                Private housing guidance before the market gets loud.
              </p>
              <blockquote className="mt-6 max-w-xl border-l border-[#D8D1C7] pl-5">
                <p className="font-serif text-[1.35rem] font-medium leading-snug text-[#2A3447] sm:text-[1.6rem]">
                  People do not wake up wanting to tour apartments. They wake up because life changed.
                </p>
              </blockquote>
              <div className="mt-8">
                <ChangingButton />
              </div>
            </div>
            <div className="relative min-h-[22rem] sm:min-h-[28rem] lg:min-h-full">
              <img
                src={HERO_PHOTO}
                alt="Manhattan skyline viewed from a high terrace at dusk"
                width={1519}
                height={1600}
                className="absolute inset-0 h-full w-full object-cover object-[70%_58%]"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[#2A3447] px-5 py-4 text-[#F5F2EB] sm:px-6">
                <p className={label}>How We Think</p>
                <p className="mt-2 font-serif text-[1.45rem] leading-none sm:text-[1.85rem]">Buildings, context, strategy.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[#2A3447] text-[#F5F2EB]">
          <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <p className={`${label} text-[#F5F2EB]/70`}>How We Decide</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-[2.15rem] font-medium leading-tight sm:text-5xl">
              Three questions. Then judgment.
            </h2>
            <Separator className="mt-6 w-10 bg-[#F5F2EB]/55" />
            <ul className="mt-12 grid lg:mt-14 lg:grid-cols-3">
              {QUESTIONS.map((item, index) => (
                <li
                  key={item.step}
                  className={`border-[#F5F2EB]/15 px-1 py-8 sm:px-6 lg:px-8 ${index > 0 ? "border-t lg:border-l lg:border-t-0" : ""}`}
                >
                  <p className={`${label} text-[#F5F2EB]/60`}>{item.step}</p>
                  <h3 className="mt-4 font-serif text-[1.65rem] font-medium leading-tight">{item.title}</h3>
                  <p className="mt-3 max-w-sm font-sans text-[15px] leading-7 text-[#F5F2EB]/80">{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-xl font-sans text-[15px] leading-7 text-[#F5F2EB]/75">
              Guidance is a conversation when you are not sure what you should do. It is not a page. Assessment is the analysis you ask for.
            </p>
          </div>
        </section>

        <section className="bg-[#F5F2EB]">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:px-12 lg:py-24">
            <div className="min-w-0">
              <h2 className="max-w-[14ch] font-serif text-[2.35rem] font-medium leading-[1.05] text-[#2A3447] sm:text-5xl">
                Start from what changed.
              </h2>
              <p className="mt-5 max-w-xl font-sans text-[16px] leading-7 text-[#2F3136]">
                The trigger comes first. These life changes make people question home before they look at listings.
              </p>
              <ul className="mt-8">
                <li>
                  <Separator className="bg-[#D8D1C7]" />
                </li>
                {whatsChanging.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${focus} group flex items-center justify-between gap-4 py-4 font-sans text-[15px] text-[#2A3447] hover:text-[#0D182B]`}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden className="shrink-0 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                    <Separator className="bg-[#D8D1C7]" />
                  </li>
                ))}
              </ul>
            </div>
            <Card className="h-fit rounded-none border-[#D8D1C7] bg-[#F5F2EB] shadow-none">
              <CardHeader className="p-0">
                <p className={`${label} text-[#2A3447]/65`}>Assessment</p>
                <CardTitle className="mt-4 font-serif text-[2rem] font-medium leading-tight tracking-[-0.02em] text-[#2A3447]">
                  Figure out your situation.
                </CardTitle>
                <CardDescription className="max-w-md font-sans text-[16px] leading-7 text-[#2F3136]">
                  The Situation Assessment is how most relationships begin. A profile first. A written next step when the picture is clear.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <p className="font-sans text-[15px] leading-7 text-[#2F3136]">
                  This isn’t a quiz. It’s the context we need to assess your situation properly.
                </p>
                <Button asChild className={`${stoneButton} mt-8`}>
                  <Link href="/belonging">Request a Situation Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-[#D8D1C7] bg-[#F5F2EB]">
          <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <blockquote className="max-w-3xl">
              <p className="font-serif text-[1.85rem] font-medium leading-snug text-[#2A3447] sm:text-[2.15rem]">
                Raphael Kammer built Agent Kammer for clients who want judgment, not a louder search.
              </p>
            </blockquote>
            <p className="mt-6 max-w-xl font-sans text-[16px] leading-7 text-[#2F3136]">
              Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="h-auto w-full whitespace-normal rounded-none border-[#2A3447] bg-transparent px-5 py-3 font-sans text-[13px] font-medium normal-case tracking-normal text-[#2A3447] hover:bg-[#2A3447] hover:text-[#F5F2EB] sm:w-auto">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="outline" className="h-auto w-full whitespace-normal rounded-none border-[#2A3447] bg-transparent px-5 py-3 font-sans text-[13px] font-medium normal-case tracking-normal text-[#2A3447] hover:bg-[#2A3447] hover:text-[#F5F2EB] sm:w-auto">
                <Link href="/calculator">Calculate</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0D182B] text-[#F5F2EB]">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 lg:px-12 lg:py-16">
          <div>
            <BrandMonogram tone="ivory" className="block h-16 w-16" />
            <p className={`${label} mt-4 text-[#F5F2EB]/75`}>Private Housing Advisory</p>
          </div>
          <address className="font-sans text-[14px] not-italic leading-7 text-[#F5F2EB]/88">
            <a href={`mailto:${EMAIL}`} className={`${focus} hover:text-[#F5F2EB]`}>
              {EMAIL}
            </a>
            <p className="mt-2">New York, New York</p>
          </address>
          <div className="lg:border-l lg:border-[#F5F2EB]/15 lg:pl-10">
            <p className="max-w-xs font-sans text-[14px] leading-6 text-[#F5F2EB]/78">
              Private housing guidance before the market gets loud. Local execution when needed. Stay, renovate, rent, buy, sell, or wait.
            </p>
            <p className={`${label} mt-8 text-[#F5F2EB]/55`}>© 2026 Agent Kammer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
