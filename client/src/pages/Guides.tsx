import { Link } from "wouter";
import { PageHero } from "@/components/site-shell";
import { LibraryList, ModuleIntro, ModuleSection, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicGuides } from "@/data/guides";

const featuredTitles = [
  "How Real Estate Ownership Works",
  "Condo vs Co-op",
  "How Mortgages Work",
  "International Buyer Hub Guide",
];

export default function Guides() {
  usePageMetadata({
    title: "Guides",
    description:
      "Educational guides from Agent Kammer: ownership structures and international buyer decision frameworks.",
    path: "/guides",
  });

  const featured = publicGuides.filter((guide) => featuredTitles.includes(guide.title));
  const reference = publicGuides.filter((guide) => !featuredTitles.includes(guide.title));

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Guides"
        title="Clear frameworks before listings."
        description="Educational pages and shareable HTML guides: ownership, condo vs co-op, condop terms, and related decision frameworks."
        art="guides"
      />

      <ModuleSection surface="ivory">
        <div className={grammar.pad}>
          <ModuleIntro
            eyebrow="Library"
            title="Start with structure."
            description="These live on the site so you can return to them, share them, and use them before browsing buildings."
          />
        </div>
      </ModuleSection>

      <ModuleSection surface="white">
        <div className={grammar.padLoose}>
          <ModuleIntro eyebrow="Foundational" title="Begin with the frameworks." />
          <LibraryList
            columns={2}
            items={featured.map((guide) => ({
              title: guide.title,
              text: guide.description,
              href: guide.href,
              cta: "Open guide",
            }))}
          />
        </div>
      </ModuleSection>

      <ModuleSection surface="mist">
        <div className={grammar.padLoose}>
          <ModuleIntro eyebrow="Reference" title="Return here for terms and detail." />
          <LibraryList
            columns={3}
            items={reference.map((guide) => ({
              title: guide.title,
              text: guide.description,
              href: guide.href,
              cta: "Open guide",
            }))}
          />
          <p className="mt-12 text-base leading-7 text-brand-graphite">
            Looking for situations or building research?{" "}
            <Link href="/situations" className="text-brand-navy underline underline-offset-4">
              What's Changing
            </Link>
            {" · "}
            <Link href="/intelligence" className="text-brand-navy underline underline-offset-4">
              Intelligence
            </Link>
            {" · "}
            <Link href="/building-reports" className="text-brand-navy underline underline-offset-4">
              Building Profiles
            </Link>
          </p>
        </div>
      </ModuleSection>
    </main>
  );
}
