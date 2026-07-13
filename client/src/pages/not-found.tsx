import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/site-shell";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <PageSection className="flex min-h-[62vh] items-center">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brass">Page Not Found</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.04em] text-brand-navy">
            This path does not have a decision brief yet.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-brand-graphite lg:text-lg">
            Start with the main Decision Brief library or request a call if the question is specific to a building, neighborhood, timeline, or life change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services">
              <Button variant="brand" className="gap-2 uppercase tracking-nav">
                Open Decision Briefs
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="brandOutline" className="gap-2 uppercase tracking-nav">
                Request a Call
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
