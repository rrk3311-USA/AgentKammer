import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocation } from "wouter";

type AdminTodayItem = {
  id: string;
  label: string;
  detail: string;
  score?: number;
  stage?: string;
};

type PipelinePerson = {
  id: string;
  kind: string;
  displayName: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  stage: string;
  score: number;
  scoreBreakdown: {
    total: number;
    identity: number;
    intent: number;
    engagement: number;
    readiness: number;
    signals: Array<{ type: string; points: number; detail?: string }>;
  };
  summary: string | null;
  profileFacts: string[];
  lastActivityAt: string;
};

type AdminDashboard = {
  generatedAt: string;
  storageMode: "memory" | "database";
  pipeline: {
    stages: Array<{
      id: string;
      label: string;
      count: number;
      people: PipelinePerson[];
    }>;
    totalPeople: number;
  };
  today: {
    highIntent: AdminTodayItem[];
    returning: AdminTodayItem[];
    profilesChanged: AdminTodayItem[];
    reportsGenerated: AdminTodayItem[];
    callsRequested: AdminTodayItem[];
    needsFollowUp: AdminTodayItem[];
  };
  funnel: {
    steps: Array<{ id: string; label: string; count: number }>;
    conversionRates: Array<{ from: string; to: string; rate: number }>;
    sources: Array<{ source: string; count: number; avgScore: number }>;
  };
  scoring: {
    distribution: Array<{ band: string; min: number; max: number; count: number }>;
    topSignals: Array<{ type: string; count: number; totalPoints: number }>;
    strategyNotes: string[];
    avgScore: number;
    medianScore: number;
  };
  people: PipelinePerson[];
  recentSignals: Array<{
    id: string;
    type: string;
    source: string | null;
    path: string | null;
    detail: string | null;
    at: string;
  }>;
  counts: {
    leads: number;
    contacts: number;
    conversations: number;
    rboProfiles: number;
    signals: number;
  };
};

const AUTH_KEY = "ak_admin_basic";

function authHeader(): string | null {
  try {
    return window.sessionStorage.getItem(AUTH_KEY);
  } catch {
    return null;
  }
}

function setAuth(user: string, pass: string) {
  const token = `Basic ${btoa(`${user}:${pass}`)}`;
  window.sessionStorage.setItem(AUTH_KEY, token);
  return token;
}

function clearAuth() {
  window.sessionStorage.removeItem(AUTH_KEY);
}

async function adminFetch(path: string, token: string) {
  const res = await fetch(path, {
    headers: { Authorization: token },
    credentials: "include",
  });
  return res;
}

function stageColor(stage: string): string {
  switch (stage) {
    case "new_signals":
      return "bg-white/10 text-white/70 border-white/15";
    case "engaged":
      return "bg-sky-500/15 text-sky-200 border-sky-400/30";
    case "profiled":
      return "bg-violet-500/15 text-violet-200 border-violet-400/30";
    case "qualified":
      return "bg-amber-500/15 text-amber-100 border-amber-400/30";
    case "call_ready":
      return "bg-orange-500/20 text-orange-100 border-orange-400/40";
    case "active":
      return "bg-emerald-500/20 text-emerald-100 border-emerald-400/40";
    default:
      return "bg-white/10 text-white/70 border-white/15";
  }
}

function scoreTone(score: number): string {
  if (score >= 75) return "text-emerald-300";
  if (score >= 50) return "text-amber-200";
  if (score >= 25) return "text-sky-200";
  return "text-white/50";
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function LoginCard({
  onSuccess,
  error,
  setError,
}: {
  onSuccess: (token: string) => void;
  error: string | null;
  setError: (e: string | null) => void;
}) {
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = setAuth(user.trim(), pass);
      const res = await adminFetch("/api/admin/session", token);
      if (!res.ok) {
        clearAuth();
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Invalid credentials");
        return;
      }
      onSuccess(token);
    } catch {
      clearAuth();
      setError("Could not reach admin API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14181f] text-[#f5f2eb] flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1c222c] p-8 shadow-2xl"
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#b08d57]">Internal portal</p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight">Agent Kammer Admin</h1>
        <p className="mt-2 text-sm text-white/55 leading-relaxed">
          Pipeline, marketing funnel, and strategy lead scoring. Visitor site stays public; this surface is private.
        </p>

        <label className="mt-8 block text-xs uppercase tracking-wider text-white/45">Username</label>
        <input
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none focus:border-[#b08d57]/
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoComplete="username"
        />

        <label className="mt-4 block text-xs uppercase tracking-wider text-white/45">Password</label>
        <input
          type="password"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none focus:border-[#b08d57]"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#b08d57] px-4 py-2.5 text-sm font-medium text-[#14181f] hover:bg-[#c4a06a] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Enter pipeline"}
        </button>

        <p className="mt-4 text-[11px] text-white/35 leading-relaxed">
          Local default: <code className="text-white/50">admin</code> / <code className="text-white/50">kammer</code>
          . Production: set <code className="text-white/50">ADMIN_USER</code> and{" "}
          <code className="text-white/50">ADMIN_PASS</code>.
        </p>
      </form>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/40">{label}</div>
      <div className="mt-1 text-xl font-medium tabular-nums text-[#f5f2eb]">{value}</div>
    </div>
  );
}

function TodayList({ title, items }: { title: string; items: AdminTodayItem[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 min-h-[140px]">
      <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-white/35">None yet</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="border-t border-white/5 pt-2 first:border-0 first:pt-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm text-white/90">{item.label}</span>
                {typeof item.score === "number" && (
                  <span className={`text-xs tabular-nums ${scoreTone(item.score)}`}>{item.score}</span>
                )}
              </div>
              <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PersonDetail({ person }: { person: PipelinePerson | null }) {
  if (!person) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/40">
        Select a person from the pipeline or people table.
      </div>
    );
  }

  const b = person.scoreBreakdown;
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl text-[#f5f2eb]">{person.displayName}</h3>
          <p className="mt-1 text-sm text-white/45">
            {[person.email, person.phone, person.source].filter(Boolean).join(" · ") || "No identity yet"}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-medium tabular-nums ${scoreTone(person.score)}`}>{person.score}</div>
          <div className="text-[10px] uppercase tracking-wider text-white/35">strategy score</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] ${stageColor(person.stage)}`}>
          {person.stage.replace(/_/g, " ")}
        </span>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/50">
          {person.kind}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          ["Identity", b.identity],
          ["Intent", b.intent],
          ["Engagement", b.engagement],
          ["Readiness", b.readiness],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-lg bg-black/25 px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-white/35">{label}</div>
            <div className="text-lg tabular-nums text-white/90">{val as number}</div>
          </div>
        ))}
      </div>

      {person.summary && (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/35">Summary</div>
          <p className="mt-1 text-sm text-white/70 leading-relaxed whitespace-pre-wrap line-clamp-6">
            {person.summary}
          </p>
        </div>
      )}

      {person.profileFacts.length > 0 && (
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/35">Profile facts</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {person.profileFacts.map((f) => (
              <span key={f} className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/60">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="text-[10px] uppercase tracking-wider text-white/35">Score signals</div>
        <ul className="mt-2 space-y-1.5 max-h-48 overflow-auto">
          {b.signals.map((s, i) => (
            <li key={`${s.type}-${i}`} className="flex justify-between gap-3 text-xs">
              <span className="text-white/65">
                {s.type}
                {s.detail ? <span className="text-white/35"> — {s.detail}</span> : null}
              </span>
              <span className="tabular-nums text-[#b08d57]">+{s.points}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] text-white/30">Last activity {formatTime(person.lastActivityAt)}</p>
    </div>
  );
}

export default function AdminPortal() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"pipeline" | "funnel" | "signals" | "people">("pipeline");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Admin — Agent Kammer";
    let robots = document.querySelector('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow, noarchive");
    return () => {
      document.title = previousTitle;
      if (created) {
        robots?.remove();
      } else if (previousRobots != null) {
        robots?.setAttribute("content", previousRobots);
      } else {
        robots?.removeAttribute("content");
      }
    };
  }, []);

  const loadDashboard = useCallback(async (auth: string) => {
    setLoadError(null);
    const res = await adminFetch("/api/admin/dashboard", auth);
    if (res.status === 401) {
      clearAuth();
      setToken(null);
      setAuthError("Session expired — sign in again");
      return;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setLoadError(body.error || "Failed to load dashboard");
      return;
    }
    const body = await res.json();
    setDashboard(body.dashboard as AdminDashboard);
  }, []);

  useEffect(() => {
    const existing = authHeader();
    if (!existing) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await adminFetch("/api/admin/session", existing);
        if (!res.ok) {
          clearAuth();
          setToken(null);
        } else {
          setToken(existing);
          await loadDashboard(existing);
        }
      } catch {
        setAuthError("Could not reach admin API");
      } finally {
        setLoading(false);
      }
    })();
  }, [loadDashboard]);

  const selected = useMemo(() => {
    if (!dashboard || !selectedId) return dashboard?.people[0] ?? null;
    return dashboard.people.find((p) => p.id === selectedId) ?? null;
  }, [dashboard, selectedId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14181f] text-white/50 flex items-center justify-center">
        Loading admin…
      </div>
    );
  }

  if (!token) {
    return (
      <LoginCard
        error={authError}
        setError={setAuthError}
        onSuccess={async (t) => {
          setToken(t);
          setLoading(true);
          await loadDashboard(t);
          setLoading(false);
        }}
      />
    );
  }

  const d = dashboard;

  return (
    <div className="min-h-screen bg-[#14181f] text-[#f5f2eb]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#14181f]/95 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#b08d57]">Internal OS</p>
              <h1 className="font-serif text-xl sm:text-2xl tracking-tight">Pipeline</h1>
            </div>
            <nav className="hidden sm:flex gap-1 ml-4">
              {(
                [
                  ["pipeline", "Pipeline"],
                  ["funnel", "Funnel"],
                  ["signals", "Signals"],
                  ["people", "People"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`rounded-lg px-3 py-1.5 text-xs uppercase tracking-wider transition ${
                    tab === id
                      ? "bg-[#b08d57]/20 text-[#b08d57]"
                      : "text-white/45 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => token && loadDashboard(token)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5"
            >
              Visitor site
            </button>
            <button
              type="button"
              onClick={() => {
                clearAuth();
                setToken(null);
                setDashboard(null);
              }}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="sm:hidden border-t border-white/5 px-4 py-2 flex gap-1 overflow-x-auto">
          {(
            [
              ["pipeline", "Pipeline"],
              ["funnel", "Funnel"],
              ["signals", "Signals"],
              ["people", "People"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs ${
                tab === id ? "bg-[#b08d57]/20 text-[#b08d57]" : "text-white/45"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 space-y-6">
        {loadError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {loadError}
          </div>
        )}

        {!d ? (
          <p className="text-white/40">No dashboard data.</p>
        ) : (
          <>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatPill label="People" value={d.pipeline.totalPeople} />
              <StatPill label="Leads" value={d.counts.leads} />
              <StatPill label="Contacts" value={d.counts.contacts} />
              <StatPill label="Conversations" value={d.counts.conversations} />
              <StatPill label="Avg score" value={d.scoring.avgScore} />
              <StatPill label="Storage" value={d.storageMode} />
            </section>

            {tab === "pipeline" && (
              <>
                <section>
                  <div className="flex items-end justify-between gap-3 mb-3">
                    <div>
                      <h2 className="font-serif text-2xl">PIPELINE</h2>
                      <p className="text-sm text-white/40 mt-1">
                        New Signals → Engaged → Profiled → Qualified → Call Ready → Active
                      </p>
                    </div>
                    <p className="text-[11px] text-white/30">
                      Updated {formatTime(d.generatedAt)}
                    </p>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {d.pipeline.stages.map((stage) => (
                      <div
                        key={stage.id}
                        className="min-w-[200px] max-w-[220px] shrink-0 rounded-xl border border-white/10 bg-white/[0.02]"
                      >
                        <div className="border-b border-white/10 px-3 py-2.5 flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-wider text-white/55">
                            {stage.label}
                          </span>
                          <span className="text-sm tabular-nums text-[#b08d57]">{stage.count}</span>
                        </div>
                        <ul className="p-2 space-y-1.5 max-h-[360px] overflow-auto">
                          {stage.people.length === 0 && (
                            <li className="px-2 py-4 text-xs text-white/25 text-center">Empty</li>
                          )}
                          {stage.people.slice(0, 12).map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                onClick={() => setSelectedId(p.id)}
                                className={`w-full rounded-lg border px-2.5 py-2 text-left transition ${
                                  selectedId === p.id
                                    ? "border-[#b08d57]/50 bg-[#b08d57]/10"
                                    : "border-transparent bg-black/20 hover:border-white/10"
                                }`}
                              >
                                <div className="flex justify-between gap-2">
                                  <span className="text-sm text-white/90 truncate">{p.displayName}</span>
                                  <span className={`text-xs tabular-nums ${scoreTone(p.score)}`}>
                                    {p.score}
                                  </span>
                                </div>
                                <p className="text-[11px] text-white/35 truncate mt-0.5">
                                  {p.source || p.email || p.phone || "—"}
                                </p>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl mb-3">TODAY</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <TodayList title="High-intent visitors" items={d.today.highIntent} />
                    <TodayList title="Returning visitors" items={d.today.returning} />
                    <TodayList title="Profiles that changed" items={d.today.profilesChanged} />
                    <TodayList title="Reports generated" items={d.today.reportsGenerated} />
                    <TodayList title="Calls requested" items={d.today.callsRequested} />
                    <TodayList title="Leads needing follow-up" items={d.today.needsFollowUp} />
                  </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <h2 className="font-serif text-xl mb-3">Lead detail</h2>
                    <PersonDetail person={selected} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl mb-3">Strategy notes</h2>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                      {d.scoring.strategyNotes.map((note, i) => (
                        <p key={i} className="text-sm text-white/70 leading-relaxed border-l-2 border-[#b08d57]/60 pl-3">
                          {note}
                        </p>
                      ))}
                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <StatPill label="Median score" value={d.scoring.medianScore} />
                        <StatPill label="Signals tracked" value={d.counts.signals} />
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {tab === "funnel" && (
              <section className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl">FUNNEL</h2>
                  <p className="text-sm text-white/40 mt-1">
                    Source → Page → Conversation → Report → Email → Call → Client
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {d.funnel.steps.map((step, i) => {
                    const max = Math.max(...d.funnel.steps.map((s) => s.count), 1);
                    const pct = Math.round((step.count / max) * 100);
                    return (
                      <div
                        key={step.id}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col"
                      >
                        <div className="text-[10px] uppercase tracking-wider text-white/40">
                          {i + 1}. {step.label}
                        </div>
                        <div className="mt-2 text-2xl tabular-nums font-medium">{step.count}</div>
                        <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#b08d57]/80"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">
                      Step conversion
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {d.funnel.conversionRates.map((c) => (
                        <li key={`${c.from}-${c.to}`} className="flex items-center justify-between gap-3">
                          <span className="text-sm text-white/65">
                            {c.from} → {c.to}
                          </span>
                          <span className="text-sm tabular-nums text-white/90">{c.rate}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">
                      Sources (by people)
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {d.funnel.sources.length === 0 && (
                        <li className="text-sm text-white/35">No sources yet</li>
                      )}
                      {d.funnel.sources.map((s) => (
                        <li key={s.source} className="flex items-center justify-between gap-3">
                          <span className="text-sm text-white/65 truncate">{s.source}</span>
                          <span className="text-sm text-white/90 tabular-nums shrink-0">
                            {s.count} · avg {s.avgScore}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">
                    Score distribution
                  </h3>
                  <div className="mt-4 grid sm:grid-cols-4 gap-3">
                    {d.scoring.distribution.map((band) => (
                      <div key={band.band} className="rounded-lg bg-black/25 px-3 py-3">
                        <div className="text-xs text-white/45">{band.band}</div>
                        <div className="mt-1 text-2xl tabular-nums">{band.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {tab === "signals" && (
              <section className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl">Signals & strategy scoring</h2>
                  <p className="text-sm text-white/40 mt-1">
                    Weighted for decision intent — not vanity traffic. Social referrals, reports, and
                    identity capture outrank raw pageviews.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">
                      Top scoring signals
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {d.scoring.topSignals.length === 0 && (
                        <li className="text-sm text-white/35">No scored people yet</li>
                      )}
                      {d.scoring.topSignals.map((s) => (
                        <li
                          key={s.type}
                          className="flex justify-between gap-3 border-b border-white/5 pb-2 text-sm"
                        >
                          <span className="text-white/70">{s.type}</span>
                          <span className="tabular-nums text-white/45">
                            {s.count}× · {s.totalPoints} pts
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-[#b08d57]">
                      Recent marketing signals
                    </h3>
                    <ul className="mt-4 space-y-2 max-h-[420px] overflow-auto">
                      {d.recentSignals.length === 0 && (
                        <li className="text-sm text-white/35">
                          Visitor beacon posts to <code className="text-white/50">/api/signals</code>
                        </li>
                      )}
                      {d.recentSignals.map((s) => (
                        <li key={s.id} className="border-b border-white/5 pb-2 text-xs">
                          <div className="flex justify-between gap-2">
                            <span className="text-white/80">{s.type}</span>
                            <span className="text-white/30">{formatTime(s.at)}</span>
                          </div>
                          <p className="text-white/40 mt-0.5 truncate">
                            {[s.source, s.path, s.detail].filter(Boolean).join(" · ") || "—"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {tab === "people" && (
              <section className="space-y-4">
                <div>
                  <h2 className="font-serif text-2xl">People</h2>
                  <p className="text-sm text-white/40 mt-1">
                    Unified from leads, contacts, Decision Guide conversations, and RBO profiles.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.04] text-[10px] uppercase tracking-wider text-white/40">
                      <tr>
                        <th className="px-3 py-2.5 font-medium">Name</th>
                        <th className="px-3 py-2.5 font-medium">Stage</th>
                        <th className="px-3 py-2.5 font-medium">Score</th>
                        <th className="px-3 py-2.5 font-medium">Source</th>
                        <th className="px-3 py-2.5 font-medium">Identity</th>
                        <th className="px-3 py-2.5 font-medium">Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.people.map((p) => (
                        <tr
                          key={p.id}
                          className="border-t border-white/5 hover:bg-white/[0.03] cursor-pointer"
                          onClick={() => {
                            setSelectedId(p.id);
                            setTab("pipeline");
                          }}
                        >
                          <td className="px-3 py-2.5 text-white/90">{p.displayName}</td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] ${stageColor(p.stage)}`}
                            >
                              {p.stage.replace(/_/g, " ")}
                            </span>
                          </td>
                          <td className={`px-3 py-2.5 tabular-nums ${scoreTone(p.score)}`}>{p.score}</td>
                          <td className="px-3 py-2.5 text-white/50">{p.source || "—"}</td>
                          <td className="px-3 py-2.5 text-white/50 max-w-[180px] truncate">
                            {p.email || p.phone || "anonymous"}
                          </td>
                          <td className="px-3 py-2.5 text-white/35 whitespace-nowrap">
                            {formatTime(p.lastActivityAt)}
                          </td>
                        </tr>
                      ))}
                      {d.people.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-3 py-8 text-center text-white/35">
                            No people yet — use Decision Guide or contact form on the visitor site.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
