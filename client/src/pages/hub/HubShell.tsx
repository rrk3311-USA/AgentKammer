import { Link, useLocation } from "wouter";
import type { ReactNode } from "react";

const NAV = [
  { href: "/hub", label: "Home" },
  { href: "/hub/roadmap", label: "Roadmap" },
  { href: "/hub/conversations", label: "Conversations" },
  { href: "/hub/saved", label: "Saved" },
  { href: "/hub/reviews", label: "Reviews" },
  { href: "/hub/profile", label: "Profile" },
];

export function HubShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      <div className="border-b border-brand-border bg-[#F5F2EB]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2A3447]/70">
            Decision Hub
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#2A3447]">{title}</h1>
          {description && (
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#2F3136]/75 leading-relaxed">
              {description}
            </p>
          )}
          <nav className="mt-6 flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => {
              const active =
                item.href === "/hub" ? location === "/hub" : location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                    active
                      ? "bg-[#2A3447] text-[#F5F2EB]"
                      : "text-[#2A3447]/65 hover:bg-[#D8D1C7]/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">{children}</div>
    </div>
  );
}

export type HubSnapshot = {
  visitorId: string;
  currentObjective: string;
  timeline: string | null;
  nextRecommendedStep: string;
  conversationSummary: string | null;
  upcomingReview: { date: string; summary: string } | null;
  roadmapMilestone: string;
  goals: Array<{ id: string; goal: string; status: string }>;
  saved: Array<{ id: string; type: string; title: string; path: string | null }>;
  reviews: Array<{
    id: string;
    reviewDate: string;
    summary: string;
    nextReviewDate: string | null;
  }>;
};

export async function fetchHubSnapshot(): Promise<HubSnapshot | null> {
  const res = await fetch("/api/hub/snapshot", { credentials: "include" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) return null;
  return body.hub as HubSnapshot;
}
