import { Link } from "wouter";
import { ArrowRight, BookOpen, Compass, Eye, Lock } from "lucide-react";
import { AkMonogramMark } from "@/components/AkMonogramMark";
import { HomeCloseCtas } from "@/components/HomeCloseCtas";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import { decisionNavigationGroups } from "@/data/decision-navigation";
import { openDecisionAssistant } from "@/lib/decision-assistant";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicSideToolsEnabled } from "@shared/public-side-tools";

const v2Nav = [
  { label: "Start Here", href: "/situations" },
  { label: "Guides", href: "/guides" },
  { label: "Contact", href: "/contact" },
] as const;

const pillars = [
  {
    label: "Clarity",
    text: "We cut through noise to identify what truly matters.",
    Icon: Eye,
  },
  {
    label: "Intelligence",
    text: "Market knowledge and public data, read carefully.",
    Icon: BookOpen,
  },
  {
    label: "Strategy",
    text: "Every move is intentional. Every detail considered.",
    Icon: Compass,
  },
  {
    label: "Discretion",
    text: "Your goals are personal. Your process should be too.",
    Icon: Lock,
  },
] as const;

const situations =
  decisionNavigationGroups.find((group) => group.title === "What's Changing?")?.items ?? [];

function V2Guidance() {
  if (publicSideToolsEnabled()) {
    return (
      <button type="button" className="ak-v2-btn" onClick={() => openDecisionAssistant()} data-testid="button-v2-guidance">
        Guidance
      </button>
    );
  }
  return (
    <Link href={PUBLIC_PRODUCTS.guidance.href} className="ak-v2-btn" data-testid="button-v2-guidance">
      Guidance
    </Link>
  );
}

export default function HomeV2() {
  usePageMetadata({
    title: "Homepage V2 preview",
    description: "Preview-only homepage study. Not indexed. Not linked from the public site.",
    path: "/v2",
    robots: "noindex, nofollow",
  });

  return (
    <div className="ak-v2" data-ak-home-v2>
      <header className="ak-v2-header">
        <Link href="/" className="ak-v2-mark" aria-label="Agent Kammer home">
          <AkMonogramMark variant="midnight" className="h-9 w-auto sm:h-10" />
        </Link>
        <div className="ak-v2-header-end">
          <nav className="ak-v2-nav" aria-label="Preview">
            {v2Nav.map((item) => (
              <Link key={item.href} href={item.href} className="ak-v2-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <V2Guidance />
        </div>
      </header>

      <section className="ak-v2-hero" data-ak-v2-hero>
        <div className="ak-v2-hero-copy">
          <h1 className="ak-v2-hero-title">
            Live where
            <br />
            you belong
          </h1>
          <div className="ak-v2-hero-aside">
            <i className="ak-v2-hero-rule" aria-hidden="true" />
            <p className="ak-v2-hero-sub">
              Private housing guidance before the market gets loud.
              <br />
              People do not wake up wanting to tour apartments.
              <br />
              They wake up because life changed.
            </p>
          </div>
          <Link href="/situations" className="ak-v2-btn ak-v2-btn-arrow">
            What's changing
            <ArrowRight className="h-4 w-4" strokeWidth={1.4} aria-hidden />
          </Link>
        </div>
        <div className="ak-v2-hero-photo">
          <img
            src="/images/v2/hero-esb-limestone.jpg"
            alt="The Empire State Building rising behind a limestone Fifth Avenue cornice."
            className="ak-v2-hero-img"
          />
        </div>
      </section>

      <section className="ak-v2-approach" data-ak-v2-approach>
        <p className="ak-v2-approach-kicker">The Agent Kammer Approach</p>
        <h2 className="ak-v2-approach-title">Strategy over transactions.</h2>
        <i className="ak-v2-silver-rule" aria-hidden="true" />
        <div className="ak-v2-approach-grid">
          {pillars.map(({ label, text, Icon }) => (
            <article key={label} className="ak-v2-approach-col">
              <Icon className="ak-v2-approach-icon" strokeWidth={1.2} aria-hidden />
              <p className="ak-v2-approach-label">{label}</p>
              <p className="ak-v2-approach-copy">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ak-v2-situations" data-ak-v2-situations>
        <div className="ak-v2-situations-copy">
          <p className="ak-v2-kicker">What's Changing</p>
          <h2 className="ak-v2-split-title">
            Start from
            <br />
            what changed.
          </h2>
          <i className="ak-v2-silver-rule ak-v2-silver-rule--ink" aria-hidden="true" />
          <nav aria-label="What's Changing" className="ak-v2-rows">
            {situations.map((item) => (
              <Link key={item.href + item.label} href={item.href} className="ak-v2-row">
                <span>{item.label}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} aria-hidden />
              </Link>
            ))}
          </nav>
        </div>
        <div className="ak-v2-situations-photo">
          <img
            src="/images/v2/interior-manhattan.jpg"
            alt="Manhattan skyline seen from a quiet apartment window."
            className="ak-v2-situations-img"
          />
        </div>
      </section>

      <section className="ak-v2-mid" data-ak-v2-mid>
        <blockquote className="ak-v2-quote">
          <p className="ak-v2-quote-text">Decisions before listings.</p>
          <footer className="ak-v2-quote-attr">Agent Kammer</footer>
        </blockquote>
        <div className="ak-v2-insights">
          <p className="ak-v2-kicker">Insights</p>
          <h2 className="ak-v2-split-title">Notes that connect the market to a next step.</h2>
          <Link href="/insights" className="ak-v2-text-link">
            Read Insights
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="ak-v2-close" data-ak-v2-close>
        <p className="ak-v2-close-copy">
          Work through the steps, starting with your Situation, for a clear recommendation, or write to us directly.
        </p>
        <HomeCloseCtas />
      </section>

      <footer className="ak-v2-footer">
        <AkMonogramMark variant="ivory" className="h-8 w-auto" />
        <a className="ak-v2-footer-link" href="mailto:raphael@agentkammer.com">
          raphael@agentkammer.com
        </a>
        <p className="ak-v2-footer-meta">New York NY</p>
        <p className="ak-v2-footer-copy">© 2026 Agent Kammer</p>
      </footer>
    </div>
  );
}
