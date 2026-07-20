import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminEmptyState, AdminShell } from "@/admin/AdminShell";

const COPY: Record<
  string,
  { title: string; emptyTitle: string; emptyDescription: string }
> = {
  conversations: {
    title: "Conversations",
    emptyTitle: "Conversation archive",
    emptyDescription:
      "Decision Guide threads and advisor recaps will collect here. Open a client chart for the live thread.",
  },
  reviews: {
    title: "Reviews",
    emptyTitle: "No reviews due",
    emptyDescription:
      "Quarterly strategy reviews appear when a client reaches a planning milestone or a check-in is scheduled.",
  },
  tasks: {
    title: "Tasks",
    emptyTitle: "Inbox clear",
    emptyDescription:
      "Attio remains the operational task system. High-signal follow-ups from the website will mirror here.",
  },
  reports: {
    title: "Reports",
    emptyTitle: "No reports drafted",
    emptyDescription:
      "Housing strategy briefs and consultation notes will collect here—editorial documents, not dashboards.",
  },
  calendar: {
    title: "Calendar",
    emptyTitle: "Calendar coming soon",
    emptyDescription: "Consultations and quarterly reviews will surface here once calendar sync is enabled.",
  },
  team: {
    title: "Team",
    emptyTitle: "Advisor roster",
    emptyDescription: "Assign advisors and partners to client charts. Roles: admin, advisor, partner, assistant.",
  },
  settings: {
    title: "Settings",
    emptyTitle: "Workspace controls",
    emptyDescription:
      "Attio credentials and access roles stay in environment variables for now. Expand this surface in Phase 3.",
  },
};

const PRACTICE_GUIDE_HREF = "/guides/advisor-practice-guide.html";
const SYSTEMS_GUIDE_HREF = "/guides/advisor-os-onboarding.html";
const INTL_GUIDE_HREF = "/guides/international-buyer-hub.html";
const INTL_HUB_HREF = "/international";

export default function AdminSection({ section }: { section: keyof typeof COPY }) {
  const [, setLocation] = useLocation();
  const [token] = useState(() => sessionStorage.getItem("ak_admin_basic"));
  const [search, setSearch] = useState("");
  const meta = COPY[section];

  useEffect(() => {
    if (!token) setLocation("/admin");
  }, [token, setLocation]);

  if (!token || !meta) return null;

  return (
    <AdminShell
      search={search}
      onSearchChange={setSearch}
      onSignOut={() => {
        sessionStorage.removeItem("ak_admin_basic");
        setLocation("/admin");
      }}
    >
      <div className="px-4 py-6 sm:px-6">
        <h1 className="ak-admin-display text-[32px] text-[var(--ak-ink)]">{meta.title}</h1>
        {section === "settings" && (
          <div className="mb-5 space-y-3">
            <a
              href={PRACTICE_GUIDE_HREF}
              target="_blank"
              rel="noreferrer"
              className="ak-admin-card flex items-center justify-between gap-4 px-5 py-4 no-underline transition hover:bg-[var(--ak-card)]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-brass)]">
                  Recruiting &amp; practice
                </p>
                <p className="mt-1 text-[16px] text-[var(--ak-ink)]">Advisor practice guide</p>
                <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
                  Business model, offers, how we earn, and what to pitch after a Housing Strategy Session.
                </p>
              </div>
              <span className="shrink-0 text-[13px] text-[var(--ak-brass)]">Open →</span>
            </a>
            <a
              href={INTL_HUB_HREF}
              target="_blank"
              rel="noreferrer"
              className="ak-admin-card flex items-center justify-between gap-4 px-5 py-4 no-underline transition hover:bg-[var(--ak-card)]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-brass)]">
                  International
                </p>
                <p className="mt-1 text-[16px] text-[var(--ak-ink)]">Live International Buyer Hub</p>
                <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
                  Public hub + 43 country pages. Forms land in Clients / Attio Lead Pipeline.
                </p>
              </div>
              <span className="shrink-0 text-[13px] text-[var(--ak-brass)]">Open hub →</span>
            </a>
            <a
              href={INTL_GUIDE_HREF}
              target="_blank"
              rel="noreferrer"
              className="ak-admin-card flex items-center justify-between gap-4 px-5 py-4 no-underline transition hover:bg-[var(--ak-card)]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-brass)]">
                  International
                </p>
                <p className="mt-1 text-[16px] text-[var(--ak-ink)]">International Buyer Hub guide</p>
                <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
                  Country pages, strategy form, and language-matched specialist follow-up.
                </p>
              </div>
              <span className="shrink-0 text-[13px] text-[var(--ak-brass)]">Open →</span>
            </a>
            <a
              href={SYSTEMS_GUIDE_HREF}
              target="_blank"
              rel="noreferrer"
              className="ak-admin-card flex items-center justify-between gap-4 px-5 py-4 no-underline transition hover:bg-[var(--ak-card)]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-muted)]">
                  Systems
                </p>
                <p className="mt-1 text-[16px] text-[var(--ak-ink)]">Advisor OS / Attio guide</p>
                <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
                  People vs Housing vs Deals, lifecycle stages, and list verification.
                </p>
              </div>
              <span className="shrink-0 text-[13px] text-[var(--ak-brass)]">Open →</span>
            </a>
          </div>
        )}
        <AdminEmptyState title={meta.emptyTitle} description={meta.emptyDescription} />
      </div>
    </AdminShell>
  );
}
