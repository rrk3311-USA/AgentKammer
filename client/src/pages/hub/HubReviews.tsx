import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";

export default function HubReviews() {
  usePageMetadata({
    title: "Reviews",
    description: "Client-visible advisor review summaries.",
    path: "/hub/reviews",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    void fetchHubSnapshot().then(setHub);
  }, []);

  return (
    <HubShell title="Reviews" description="Quarterly strategy notes written for you — not internal team commentary.">
      <div className="space-y-8 max-w-2xl">
        {(hub?.reviews || []).map((review) => (
          <article key={review.id} className="border-t border-[#D8D1C7] pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3136]/85">
              {review.summary}
            </p>
            {review.nextReviewDate && (
              <p className="mt-3 text-xs text-[#2F3136]/55">
                Next review: {new Date(review.nextReviewDate).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}
        {!hub?.reviews?.length && (
          <p className="text-sm text-[#2F3136]/70">
            When an advisor completes a review, the client-facing summary will appear here.
          </p>
        )}
      </div>
    </HubShell>
  );
}
