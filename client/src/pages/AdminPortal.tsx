import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { AdminLoginForm, AdminShell } from "@/admin/AdminShell";
import { formatRelativeActivity, toCrmStage } from "@/admin/status";

type PipelinePerson = {
  id: string;
  displayName: string;
  email: string | null;
  source: string | null;
  stage: string;
  score: number;
  summary: string | null;
  lastActivityAt: string;
};

type AdminDashboard = {
  generatedAt: string;
  pipeline: {
    stages: Array<{
      id: string;
      label: string;
      count: number;
      people: PipelinePerson[];
    }>;
  };
};

const AUTH_KEY = "ak_admin_basic";

const STAGE_META: Record<string, { label: string; dot: string }> = {
  new_signals: { label: "New Signal", dot: "bg-[#7A8FA6]" },
  engaged: { label: "Engaged", dot: "bg-[#5B8A7A]" },
  profiled: { label: "Profiled", dot: "bg-[#6B8F9E]" },
  qualified: { label: "Qualified", dot: "bg-[var(--ak-brass)]" },
  call_ready: { label: "Call Ready", dot: "bg-[var(--ak-warning)]" },
  active: { label: "Active Search", dot: "bg-[#8B7BA8]" },
};

export default function AdminPortal() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(AUTH_KEY));
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PipelinePerson | null>(null);

  const loadDashboard = useCallback(async (auth: string) => {
    const res = await fetch("/api/admin/dashboard", {
      headers: { Authorization: auth },
      credentials: "include",
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Unable to open pipeline");
    setDashboard(body.dashboard as AdminDashboard);
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    loadDashboard(token)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, loadDashboard]);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const next = `Basic ${btoa(`${user.trim()}:${pass}`)}`;
      const session = await fetch("/api/admin/session", { headers: { Authorization: next } });
      if (!session.ok) {
        const body = await session.json().catch(() => ({}));
        throw new Error(body.error || "Invalid credentials");
      }
      sessionStorage.setItem(AUTH_KEY, next);
      setToken(next);
      await loadDashboard(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AdminLoginForm
        title="Pipeline"
        subtitle="Stage board for housing advisory relationships."
        onSubmit={signIn}
        error={error}
        loading={loading}
        user={user}
        pass={pass}
        setUser={setUser}
        setPass={setPass}
      />
    );
  }

  return (
    <AdminShell
      search={search}
      onSearchChange={setSearch}
      onSignOut={() => {
        sessionStorage.removeItem(AUTH_KEY);
        setToken(null);
      }}
    >
      <div className="space-y-6 px-4 py-6 sm:px-6">
        <div>
          <h1 className="ak-admin-display text-[32px] text-[var(--ak-ink)]">Pipeline</h1>
          <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
            New Signal → Engaged → Profiled → Qualified → Call Ready → Active Search
          </p>
        </div>

        {error && <p className="text-sm text-[var(--ak-danger)]">{error}</p>}
        {loading && !dashboard && (
          <p className="text-[13px] text-[var(--ak-muted)]">Loading board…</p>
        )}

        <div className="flex gap-3 overflow-x-auto pb-2">
          {(dashboard?.pipeline.stages || []).map((stage) => {
            const meta = STAGE_META[stage.id] || { label: stage.label, dot: "bg-[var(--ak-muted)]" };
            const people = stage.people.filter((p) => {
              if (!search.trim()) return true;
              const q = search.toLowerCase();
              return [p.displayName, p.email, p.source, p.summary]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q));
            });
            return (
              <div key={stage.id} className="ak-admin-card min-w-[220px] max-w-[240px] shrink-0">
                <div className="flex items-center gap-2 border-b border-[var(--ak-border)] px-4 py-3">
                  <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                  <span className="flex-1 text-[13px] font-medium text-[var(--ak-ink)]">{meta.label}</span>
                  <span className="text-[12px] text-[var(--ak-muted)]">{people.length}</span>
                </div>
                <ul className="max-h-[560px] space-y-2 overflow-y-auto p-2">
                  {people.length === 0 && (
                    <li className="px-2 py-8 text-center text-[12px] text-[var(--ak-muted)]">Quiet</li>
                  )}
                  {people.map((person) => (
                    <li key={person.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(person)}
                        className={`w-full rounded-[10px] border px-3 py-2.5 text-left transition ${
                          selected?.id === person.id
                            ? "border-[var(--ak-brass)] bg-[var(--ak-stone)] text-[var(--ak-ivory)]"
                            : "border-[var(--ak-border)] bg-white hover:bg-[var(--ak-card-alt)]"
                        }`}
                      >
                        <div className="flex justify-between gap-2">
                          <span className="truncate text-[13px] font-medium">{person.displayName}</span>
                          <span
                            className={`text-[11px] tabular-nums ${
                              selected?.id === person.id ? "text-[var(--ak-brass)]" : "text-[var(--ak-muted)]"
                            }`}
                          >
                            {person.score}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-[11px] ${
                            selected?.id === person.id ? "text-white/50" : "text-[var(--ak-muted)]"
                          }`}
                        >
                          {toCrmStage(person.stage)} · {formatRelativeActivity(person.lastActivityAt)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {selected && (
          <div className="ak-admin-card max-w-2xl p-6">
            <h2 className="ak-admin-display text-[28px] text-[var(--ak-ink)]">{selected.displayName}</h2>
            <p className="mt-1 text-[13px] text-[var(--ak-secondary)]">
              {toCrmStage(selected.stage)} · readiness {selected.score}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--ak-ink)]">
              {selected.summary || "No summary yet."}
            </p>
            <button
              type="button"
              className="ak-admin-btn ak-admin-btn-primary mt-5"
              onClick={() => setLocation("/admin/clients")}
            >
              Open client charts
            </button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
