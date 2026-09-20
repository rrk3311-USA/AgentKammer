import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <PageSection className="flex min-h-[62vh] items-center">
        <div className="max-w-3xl">
          <p className={grammar.eyebrow}>Page Not Found</p>
          <h1 className={`mt-4 ${grammar.display}`}>This path does not have a Situation yet.</h1>
          <p className={`mt-6 ${grammar.body}`}>
            Start Here names what changed, or write if the question is specific to a building, neighborhood, timeline, or life change.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link href="/situations" className={grammar.textLink}>
              Start Here
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/contact" className={grammar.textLink}>
              Contact
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </PageSection>
    </main>
  );
}
