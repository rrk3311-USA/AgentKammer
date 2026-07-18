import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";

export default function HubConversations() {
  usePageMetadata({
    title: "Conversations",
    description: "Saved conversation summaries and advisor recaps.",
    path: "/hub/conversations",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    void fetchHubSnapshot().then(setHub);
  }, []);

  return (
    <HubShell title="Conversations" description="What you’ve explored — and what an advisor has shared with you.">
      <div className="space-y-8 max-w-2xl">
        {hub?.conversationSummary ? (
          <article className="border-t border-[#D8D1C7] pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              Latest AI summary
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3136]/85">
              {hub.conversationSummary}
            </p>
          </article>
        ) : (
          <p className="text-sm text-[#2F3136]/70">No conversation summary yet.</p>
        )}

        {hub?.reviews?.map((review) => (
          <article key={review.id} className="border-t border-[#D8D1C7] pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              Advisor recap
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-[#2F3136]/85">
              {review.summary}
            </p>
          </article>
        ))}
      </div>
    </HubShell>
  );
}
