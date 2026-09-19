import { Link } from "wouter";
import { PageHero } from "@/components/site-shell";
import { LibraryList, grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { publicGuides } from "@/data/guides";

export default function Guides() {
  usePageMetadata({
    title: "Guides",
    description:
      "Educational guides from Agent Kammer: ownership structures and international buyer decision frameworks.",
    path: "/guides",
  });

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Guides"
        title="Clear frameworks before listings."
        description="Educational pages and shareable HTML guides: ownership, condo vs co-op, condop terms, and related decision frameworks."
        art="decision-framework"
      />

      <section className="border-b border-brand-border bg-brand-ivory">
        <div className={grammar.pad}>
          <p className={grammar.eyebrow}>Library</p>
          <h2 className={`mt-4 ${grammar.section}`}>Start with structure.</h2>
          <p className={`mt-5 ${grammar.body}`}>
            These live on the site so you can return to them, share them, and use them before browsing buildings.
          </p>
          <LibraryList
            columns={2}
            items={publicGuides.map((guide) => ({
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
      </section>
    </main>
  );
}
