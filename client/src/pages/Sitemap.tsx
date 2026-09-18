import { Link } from "wouter";
import { PageHero, PageSection } from "@/components/site-shell";
import { getSiteMapGroups } from "@/data/site-map";
import { PUBLIC_PRODUCTS } from "@/data/public-menu";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const groups = getSiteMapGroups();

export default function Sitemap() {
  usePageMetadata({
    title: "Sitemap",
    description:
      "A map of Agent Kammer: situations, guides, and quiet practice doors. Judgment first — buildings stay a library.",
    path: "/sitemap",
  });

  return (
    <main className="bg-brand-field" data-testid="page-sitemap">
      <PageHero
        eyebrow="Index"
        title="Site map"
        description="Find the path by the decision, not by the building. Start with what changed, then the quiet doors for judgment."
        art="decision-framework"
      />

      <PageSection className="py-14 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa">Guidance</p>
          <p className="mt-3 text-base leading-8 text-brand-graphite">
            {PUBLIC_PRODUCTS.guidance.text} The sticky Guidance band under the footer stays where it is.
          </p>
          <button
            type="button"
            onClick={openDecisionAssistant}
            className="mt-5 inline-flex min-h-11 items-center border border-brand-navy bg-brand-navy px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:border-brand-brass hover:bg-brand-charcoal"
            data-testid="button-sitemap-guidance"
          >
            Open Guidance
          </button>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-labelledby={`sitemap-${group.title}`}>
              <h2
                id={`sitemap-${group.title}`}
                className="font-display text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[0.95] text-brand-navy"
              >
                {group.title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-brand-graphite">{group.description}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.href}-${item.label}`}>
                    {item.href.endsWith(".html") ? (
                      <a
                        href={item.href}
                        className="text-[12px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:text-brand-brass"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[12px] uppercase tracking-[0.1em] text-brand-navy transition-colors hover:text-brand-brass"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </PageSection>
    </main>
  );
}
