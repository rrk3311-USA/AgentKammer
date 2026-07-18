import type { FormEvent, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import "./admin-theme.css";

type NavItem = {
  href: string;
  label: string;
  match: (path: string) => boolean;
  badge?: number;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", match: (p) => p === "/admin" || p === "/admin/" },
  { href: "/admin/pipeline", label: "Pipeline", match: (p) => p.startsWith("/admin/pipeline") },
  { href: "/admin/clients", label: "Clients", match: (p) => p.startsWith("/admin/clients") },
  {
    href: "/admin/conversations",
    label: "Conversations",
    match: (p) => p.startsWith("/admin/conversations"),
  },
  { href: "/admin/reviews", label: "Reviews", match: (p) => p.startsWith("/admin/reviews") },
  { href: "/admin/tasks", label: "Tasks", match: (p) => p.startsWith("/admin/tasks"), badge: 0 },
  { href: "/admin/reports", label: "Reports", match: (p) => p.startsWith("/admin/reports") },
  { href: "/admin/calendar", label: "Calendar", match: (p) => p.startsWith("/admin/calendar") },
  { href: "/admin/team", label: "Team", match: (p) => p.startsWith("/admin/team") },
  { href: "/admin/settings", label: "Settings", match: (p) => p.startsWith("/admin/settings") },
];

function NavIcon({ name }: { name: string }) {
  const c = "stroke-current fill-none";
  const icons: Record<string, ReactNode> = {
    Overview: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    Pipeline: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M4 6h16M4 12h10M4 18h14" />
      </svg>
    ),
    Clients: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    Conversations: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    Reviews: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
    Tasks: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    Reports: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 3 5-7" />
      </svg>
    ),
    Calendar: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    Team: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 20v-1a3 3 0 0 0-1.5-2.6" />
      </svg>
    ),
    Settings: (
      <svg width="18" height="18" viewBox="0 0 24 24" className={c} strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    ),
  };
  return <>{icons[name] ?? icons.Settings}</>;
}

export function AdminShell({
  children,
  onSignOut,
  search,
  onSearchChange,
  taskBadge = 0,
  topActions,
}: {
  children: ReactNode;
  onSignOut?: () => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  taskBadge?: number;
  topActions?: ReactNode;
}) {
  const [location, setLocation] = useLocation();

  const nav = NAV.map((item) =>
    item.label === "Tasks" && taskBadge > 0 ? { ...item, badge: taskBadge } : item,
  );

  return (
    <div className="ak-admin flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col bg-[var(--ak-navy)] md:flex">
        <div className="flex items-center gap-3 px-5 pt-7 pb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--ak-brass)]/40 ak-admin-display text-[18px] text-[var(--ak-brass)]">
            AK
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
              Agent Kammer
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Advisory
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {nav.map((item) => {
            const active = item.match(location);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] transition ${
                  active
                    ? "bg-white/[0.1] text-white"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/85"
                }`}
              >
                <span className={active ? "text-[var(--ak-brass)]" : "text-white/30"}>
                  <NavIcon name={item.label} />
                </span>
                <span className="flex-1">{item.label}</span>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className="rounded-full bg-[var(--ak-brass)]/20 px-1.5 py-0.5 text-[10px] tabular-nums text-[var(--ak-brass)]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ak-stone)] text-[11px] font-semibold text-[var(--ak-ivory)]">
              RK
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] text-white/90">Raphael Kammer</p>
              <p className="text-[11px] text-white/35">Administrator</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="/guides/advisor-practice-guide.html"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[var(--ak-brass)]/80 hover:text-[var(--ak-brass)]"
            >
              Advisor guide
            </a>
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="text-[11px] text-white/35 hover:text-white/65"
            >
              Site
            </button>
            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="text-[11px] text-white/35 hover:text-white/65"
              >
                Sign out
              </button>
            )}
          </div>
          <p className="ak-admin-display mt-4 text-[9px] uppercase tracking-[0.14em] leading-relaxed text-white/25">
            Buildings before listings.
            <br />
            Decisions before emotions.
          </p>
        </div>
      </aside>

      {/* Mobile */}
      <div className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[var(--ak-navy)] md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="ak-admin-display text-[var(--ak-brass)]">AK</span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">Advisory</span>
          </div>
          {onSignOut && (
            <button type="button" onClick={onSignOut} className="text-[11px] text-white/45">
              Sign out
            </button>
          )}
        </div>
        <div className="flex gap-1 overflow-x-auto px-3 pb-3">
          {nav.slice(0, 6).map((item) => {
            const active = item.match(location);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] ${
                  active ? "bg-white/10 text-white" : "text-white/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-screen w-full flex-col bg-[#F4F1EB] md:pl-[248px]">
        <header className="sticky top-[96px] z-20 border-b border-[var(--ak-border)] bg-[var(--ak-card)]/95 backdrop-blur md:top-0">
          <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6">
            <div className="relative min-w-[200px] flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ak-muted)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3-3" />
                </svg>
              </span>
              <input
                className="ak-admin-input !pl-10"
                placeholder="Search clients, email, phone, or situation…"
                value={search ?? ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--ak-border)] text-[var(--ak-secondary)]"
                aria-label="Notifications"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
              </button>
              <a
                href="/guides/advisor-practice-guide.html"
                target="_blank"
                rel="noreferrer"
                className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[13px] !font-medium"
              >
                Practice guide
              </a>
              <a
                href="/guides/advisor-os-onboarding.html"
                target="_blank"
                rel="noreferrer"
                className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[13px] !font-medium"
              >
                Systems guide
              </a>
              {topActions}
              <Link
                href="/admin/clients"
                className="ak-admin-btn ak-admin-btn-primary !normal-case !tracking-normal !text-[13px] !font-medium"
              >
                + New Lead
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-[96px] md:pt-0">{children}</main>
      </div>
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-start px-6 py-20 sm:px-10">
      <h2 className="ak-admin-display text-[28px] text-[var(--ak-ink)]">{title}</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--ak-secondary)]">{description}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ak-muted)]">
      {children}
    </p>
  );
}

export function AdminLoginForm({
  title,
  subtitle,
  onSubmit,
  error,
  loading,
  user,
  pass,
  setUser,
  setPass,
}: {
  title: string;
  subtitle: string;
  onSubmit: (e: FormEvent) => void;
  error: string | null;
  loading: boolean;
  user: string;
  pass: string;
  setUser: (v: string) => void;
  setPass: (v: string) => void;
}) {
  return (
    <div className="ak-admin flex min-h-screen items-center justify-center px-4 py-12">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[400px] space-y-5 rounded-[12px] border border-[var(--ak-border)] bg-[var(--ak-card)] p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--ak-brass)]/50 ak-admin-display text-[var(--ak-brass)]">
            AK
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ak-muted)]">
              Confidential
            </p>
            <h1 className="ak-admin-display text-[28px] leading-none text-[var(--ak-stone)]">{title}</h1>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--ak-secondary)]">{subtitle}</p>
        <input
          className="ak-admin-input"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Admin user"
          autoComplete="username"
        />
        <input
          type="password"
          className="ak-admin-input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-[var(--ak-danger)]">{error}</p>}
        <button type="submit" className="ak-admin-btn ak-admin-btn-primary w-full" disabled={loading}>
          {loading ? "Opening…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
