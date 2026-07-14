import { useEffect, useState } from "react";
import { Link } from "wouter";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const MEMBER_TOKEN_KEY = "ak_member_token";

type RecommendationBrief = {
  id: string;
  title: string;
  body: string;
  source: string;
  score?: number | null;
  createdAt: string;
};

type HubSnapshot = {
  id: string;
  email: string;
  displayName: string | null;
  goals: string | null;
  vision: string | null;
  priorities: string | null;
  progressStage: string;
  conversationCount: number;
  visitorCount: number;
  briefs?: RecommendationBrief[];
  decisionMap: {
    situation?: string | null;
    desire?: string | null;
    constraints?: string | null;
    tradeOff?: string | null;
    recommendation?: string | null;
    missing?: string[];
  } | null;
};

export default function DecisionHub() {
  usePageMetadata({
    title: "Decision Hub",
    description: "Your Agent Kammer member space for goals, Decision Map, and recommendation briefs.",
    path: "/hub",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openBriefId, setOpenBriefId] = useState<string | null>(null);

  useEffect(() => {
    const token = (() => {
      try {
        return window.localStorage.getItem(MEMBER_TOKEN_KEY);
      } catch {
        return null;
      }
    })();

    if (!token) {
      setLoading(false);
      setError("Create an account to open your Decision Hub.");
      return;
    }

    void fetch("/api/account/hub", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(body.error || "Could not load your hub");
          return;
        }
        const nextHub = body.hub as HubSnapshot;
        setHub(nextHub);
        if (nextHub.briefs?.[0]?.id) setOpenBriefId(nextHub.briefs[0].id);
      })
      .catch(() => setError("Could not load your hub"))
      .finally(() => setLoading(false));
  }, []);

  const briefs = hub?.briefs || [];

  return (
    <>
      <PageHero
        eyebrow="Decision Hub"
        title="My Real Estate Life"
        description="Goals, vision, Decision Map, and recommendation briefs Raphi sends you — saved in your account."
        art="decision-framework"
      />

      <div className="border-b border-brand-border bg-brand-ivory text-brand-ink">
        <PageSection>
          {loading ? (
            <p className="text-sm text-brand-graphite">Loading your hub…</p>
          ) : error || !hub ? (
            <div className="max-w-xl">
              <SectionHeading
                eyebrow="Member access"
                title="Save your Decision Map first"
                description={error || "No member session found."}
              />
              <Link
                href="/account"
                className="mt-8 inline-flex bg-brand-navy px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory"
              >
                Create my account
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
              <div>
                <SectionHeading
                  eyebrow={hub.progressStage || "Exploring"}
                  title={hub.displayName || "Your Decision Hub"}
                  description={`${hub.email} · ${hub.conversationCount} conversation${hub.conversationCount === 1 ? "" : "s"} · ${briefs.length} brief${briefs.length === 1 ? "" : "s"}`}
                />

                <div className="mt-10 grid gap-6">
                  <div className="border border-brand-border bg-white p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">My Direction</p>
                    <dl className="mt-4 grid gap-4 text-sm leading-6 text-brand-graphite">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-brand-navy">Vision</dt>
                        <dd className="mt-1">{hub.vision || "Still forming — keep talking with Raphi."}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-brand-navy">Goals</dt>
                        <dd className="mt-1">{hub.goals || "No goal captured yet."}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.14em] text-brand-navy">Priorities</dt>
                        <dd className="mt-1">{hub.priorities || "Trade-offs not set yet."}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border border-brand-border bg-white p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">My Decision Map</p>
                    <dl className="mt-4 grid gap-3 text-sm leading-6 text-brand-graphite">
                      <div>
                        <span className="text-brand-navy">Situation — </span>
                        {hub.decisionMap?.situation || "—"}
                      </div>
                      <div>
                        <span className="text-brand-navy">Desire — </span>
                        {hub.decisionMap?.desire || "—"}
                      </div>
                      <div>
                        <span className="text-brand-navy">Constraints — </span>
                        {hub.decisionMap?.constraints || "—"}
                      </div>
                      <div>
                        <span className="text-brand-navy">Trade-off — </span>
                        {hub.decisionMap?.tradeOff || "—"}
                      </div>
                      <div>
                        <span className="text-brand-navy">Recommendation so far — </span>
                        {hub.decisionMap?.recommendation || "Still exploring."}
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="border border-brand-border bg-white p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">My Decisions</p>
                  <h2 className="mt-3 font-display text-3xl leading-none text-brand-navy">Recommendation briefs</h2>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite/75">
                    When Raphi sends a recommendation or recap, it lands here in your account — not only in email.
                  </p>

                  {briefs.length === 0 ? (
                    <p className="mt-6 border border-dashed border-brand-border px-4 py-5 text-sm leading-6 text-brand-graphite">
                      No briefs yet. Continue with the Guidance Advisor, then ask for a recommendation or recap — it will appear in this section.
                    </p>
                  ) : (
                    <div className="mt-6 grid gap-3">
                      {briefs.map((brief) => {
                        const open = openBriefId === brief.id;
                        return (
                          <article key={brief.id} className="border border-brand-border">
                            <button
                              type="button"
                              className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left"
                              onClick={() => setOpenBriefId(open ? null : brief.id)}
                            >
                              <span>
                                <span className="block text-[11px] uppercase tracking-[0.14em] text-brand-cocoa">
                                  {new Date(brief.createdAt).toLocaleDateString()} · {brief.source}
                                  {typeof brief.score === "number" ? ` · score ${brief.score}` : ""}
                                </span>
                                <span className="mt-1 block text-sm font-medium text-brand-navy">{brief.title}</span>
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.16em] text-brand-graphite">
                                {open ? "Hide" : "Open"}
                              </span>
                            </button>
                            {open ? (
                              <div className="border-t border-brand-border bg-brand-ivory/60 px-4 py-4 text-sm leading-6 whitespace-pre-wrap text-brand-graphite">
                                {brief.body}
                              </div>
                            ) : null}
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="border border-brand-border bg-white p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">Next</p>
                  <h2 className="mt-3 font-display text-2xl leading-none text-brand-navy">Keep building with Raphi</h2>
                  <p className="mt-3 text-sm leading-6 text-brand-graphite/75">
                    New recommendation briefs stay linked to this member profile.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <Link
                      href="/buyer-advisory"
                      className="inline-flex justify-center bg-brand-navy px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory"
                    >
                      Continue Decision Guide
                    </Link>
                    <Link
                      href="/account"
                      className="inline-flex justify-center border border-brand-border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy"
                    >
                      Account settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageSection>
      </div>
    </>
  );
}
