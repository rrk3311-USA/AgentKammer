import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";
import { WhereThingsStand } from "./HubStanding";

function readSearch() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function HubHome() {
  usePageMetadata({
    title: "Decision Hub",
    description: "Your housing plan, next step, and advisor reviews. Private and ready when you return.",
    path: "/hub",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const fromQualify = useMemo(() => readSearch().get("from") === "qualify", []);

  useEffect(() => {
    void fetchHubSnapshot()
      .then(setHub)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (readSearch().get("booked") !== "1") return;
    void fetch("/api/qualify/session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).then(() => fetchHubSnapshot().then(setHub));
  }, []);

  const showPlan = Boolean(hub || fromQualify);

  return (
    <HubShell
      title="Your plan"
      description="A calm place to continue your housing decision. Without pressure, and without starting over."
    >
      {loading ? (
        <p className="text-sm text-brand-graphite">Loading your hub…</p>
      ) : !showPlan ? (
        <div className="max-w-xl space-y-6">
          <p className="text-sm leading-relaxed text-[#2F3136]/80">
            Start a conversation in the Decision Guide. When you are ready, you can save your plan with an
            email and return here anytime.
          </p>
          <WhereThingsStand hub={hub} />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/belonging"
              className="inline-flex bg-[#2A3447] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]"
            >
              Ask a question
            </Link>
            <Link
              href="/account"
              className="inline-flex border border-[#2A3447] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]"
            >
              Claim your profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            {fromQualify ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                Get Qualified · complete
              </p>
            ) : null}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                Current objective
              </p>
              <p className="mt-2 font-serif text-2xl text-[#2A3447]">
                {hub?.currentObjective || "Your plan is waiting"}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                  Timeline
                </p>
                <p className="mt-2 text-sm text-[#2F3136]/85">{hub?.timeline || "Still forming"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                  Next step
                </p>
                <p className="mt-2 text-sm text-[#2F3136]/85">
                  {hub?.nextRecommendedStep || "Stay with Guidance until a live hour is useful."}
                </p>
              </div>
            </div>
            {hub?.conversationSummary && (
              <div className="border-t border-[#D8D1C7] pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                  Conversation summary
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3136]/80 whitespace-pre-wrap">
                  {hub.conversationSummary}
                </p>
              </div>
            )}
            {hub?.upcomingReview && (
              <div className="border-t border-[#D8D1C7] pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
                  Upcoming advisor review
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3136]/80">
                  {hub.upcomingReview.summary}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <WhereThingsStand hub={hub} fromQualify={fromQualify} />
            <Link
              href="/belonging"
              className="block bg-[#2A3447] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]"
            >
              Ask another question
            </Link>
            <Link
              href="/qualify"
              className="block border border-[#2A3447] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]"
            >
              Review Get Qualified
            </Link>
            <p className="text-xs leading-relaxed text-[#2F3136]/55">
              Your lead score and internal notes stay private. This hub only shows what helps you decide.
            </p>
          </aside>
        </div>
      )}
    </HubShell>
  );
}
