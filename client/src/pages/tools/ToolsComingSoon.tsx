import { PageHero, PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function ToolsComingSoon() {
  usePageMetadata({
    title: "Tools",
    description: "A private analysis desk is being prepared.",
    path: "/tools",
    robots: "noindex, nofollow",
  });

  return (
    <main className="bg-brand-field">
      <PageHero
        eyebrow="Tools"
        title="A private desk is being prepared."
        description="This surface stays unlisted until it is flipped live. If you were given a preview, add ?preview=1 to the URL."
        art="brief"
      />
      <PageSection>
        <p className="max-w-xl text-base leading-8 text-brand-graphite">
          Nothing here is part of the six primary destinations. When it opens, the first analysis is free, then one credit per run.
        </p>
      </PageSection>
    </main>
  );
}
