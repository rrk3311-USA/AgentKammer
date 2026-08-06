import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { AdminLoginForm, AdminShell, SectionLabel } from "@/admin/AdminShell";
import { formatRelativeActivity, toCrmStage } from "@/admin/status";

type ClientRow = {
  id: string;
  visitorId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  situation?: string;
  desiredOutcome?: string;
  timeline?: string;
  budgetRange?: string;
  targetLocations?: string[];
  leadScore?: number;
  readinessScore?: number;
  lifecycleStage: string;
  assignedAdvisor?: string | null;
  attioUrl?: string | null;
  lastConversationSummary?: string;
  nextRecommendedAction?: string;
  lastActiveAt: string;
  internalAdvisorSummary?: string;
};

type Dashboard = {
  generatedAt: string;
  pipeline: {
    stages: Array<{
      id: string;
      label: string;
      count: number;
      people: Array<{
        id: string;
        displayName: string;
        source: string | null;
        stage: string;
        score: number;
        lastActivityAt: string;
        summary: string | null;
      }>;
    }>;
    totalPeople: number;
  };
  today: {
    highIntent: Array<{ id: string; label: string; detail: string; score?: number }>;
    callsRequested: Array<{ id: string; label: string; detail: string }>;
    needsFollowUp: Array<{ id: string; label: string; detail: string }>;
  };
  scoring: { avgScore: number };
  counts: { conversations: number; leads: number };
  recentSignals: Array<{
    id: string;
    type: string;
    detail: string | null;
    at: string;
  }>;
};

const AUTH_KEY = "ak_admin_basic";

const STAGE_META: Record<string, { label: string; dot: string }> = {
  new_signals: { label: "New Signal", dot: "bg-[#7A8FA6]" },
  engaged: { label: "Engaged", dot: "bg-[#5B8A7A]" },
  profiled: { label: "Profiled", dot: "bg-[#6B8F9E]" },
  qualified: { label: "Qualified", dot: "bg-[var(--ak-brass)]" },
  call_ready: { label: "Call Ready", dot: "bg-[var(--ak-warning)]" },
  active: { label: "Advisory Client", dot: "bg-[#8B7BA8]" },
};

function authHeaders(token: string): HeadersInit {
  return { Authorization: token.startsWith("Basic ") ? token : `Basic ${token}`, "Content-Type": "application/json" };
}

function displayName(c: ClientRow) {
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ");
  return name || c.email || `Visitor ${c.visitorId.slice(4, 12)}`;
}

export default function AdminOverview() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(AUTH_KEY));
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [search, setSearch] = useState("");
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<"overview" | "profile" | "conversations" | "notes" | "activity">(
    "overview",
  );
  const [conversations, setConversations] = useState<
    Array<{ id: string; role: string; content: string; createdAt: string }>
  >([]);
  const [note, setNote] = useState("");

  const load = useCallback(async (auth: string) => {
    const headers = authHeaders(auth);
    const [dashRes, clientsRes] = await Promise.all([
      fetch("/api/admin/dashboard", { headers, credentials: "include" }),
      fetch("/api/admin/clients?limit=100", { headers }),
    ]);
    const dashBody = await dashRes.json().catch(() => ({}));
    const clientsBody = await clientsRes.json().catch(() => ({}));
    if (!dashRes.ok) throw new Error(dashBody.error || "Failed to load overview");
    if (!clientsRes.ok) throw new Error(clientsBody.error || "Failed to load clients");
    setDashboard(dashBody.dashboard as Dashboard);
    const list = (clientsBody.clients || []) as ClientRow[];
    setClients(list);
    setSelectedId((prev) => prev || list[0]?.id || null);
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    load(token)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, load]);

  useEffect(() => {
    if (!token || !selectedId) return;
    fetch(`/api/admin/clients/${selectedId}`, { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((body) => {
        if (body.client) {
          setClients((prev) => {
            const others = prev.filter((c) => c.id !== body.client.id);
            return [body.client, ...others];
          });
        }
        setConversations(body.conversations || []);
      })
      .catch(() => undefined);
  }, [token, selectedId]);

  const selected = useMemo(
    () => clients.find((c) => c.id === selectedId) || null,
    [clients, selectedId],
  );

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) =>
      [displayName(c), c.email, c.phone, c.situation, c.desiredOutcome, c.timeline]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [clients, search]);

  const callReadyCount = clients.filter((c) => c.lifecycleStage === "call_ready").length;
  const advisoryCount = clients.filter((c) =>
    ["advisory_client", "long_term_nurture", "active_client"].includes(c.lifecycleStage),
  ).length;

  const tasks = useMemo(() => {
    const items: Array<{ id: string; label: string; when: string }> = [];
    for (const c of clients) {
      if (c.lifecycleStage === "call_ready") {
        items.push({
          id: `call-${c.id}`,
          label: `Call requested lead - ${displayName(c)}`,
          when: "Today",
        });
      } else if ((c.leadScore ?? 0) >= 65) {
        items.push({
          id: `review-${c.id}`,
          label: `Review profile - ${displayName(c)}`,
          when: "Tomorrow",
        });
      }
    }
    for (const item of dashboard?.today.needsFollowUp || []) {
      items.push({ id: item.id, label: item.label, when: "This week" });
    }
    return items.slice(0, 6);
  }, [clients, dashboard]);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const next = `Basic ${btoa(`${user}:${pass}`)}`;
      const session = await fetch("/api/admin/session", { headers: { Authorization: next } });
      if (!session.ok) {
        const body = await session.json().catch(() => ({}));
        throw new Error(body.error || "Invalid credentials");
      }
      sessionStorage.setItem(AUTH_KEY, next);
      setToken(next);
      await load(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AdminLoginForm
        title="Overview"
        subtitle="Confidential client charts and housing advisory pipeline."
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
      taskBadge={tasks.length}
      onSignOut={() => {
        sessionStorage.removeItem(AUTH_KEY);
        setToken(null);
      }}
      topActions={
        <button
          type="button"
          className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[13px] !font-medium"
          onClick={() => token && load(token)}
        >
          Filter
        </button>
      }
    >
      <div className="space-y-6 px-4 py-6 sm:px-6">
        {error && <p className="text-sm text-[var(--ak-danger)]">{error}</p>}

        <section className="ak-admin-card flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ak-brass)]">
              International Buyer Hub
            </p>
            <p className="mt-1 text-[15px] text-[var(--ak-ink)]">
              Public hub + country pages - strategy forms land in Clients / Lead Pipeline.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/international"
              target="_blank"
              rel="noreferrer"
              className="ak-admin-btn ak-admin-btn-primary !normal-case !tracking-normal !text-[13px] !font-medium"
            >
              Open hub
            </a>
            <Link
              href="/admin/clients"
              className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[13px] !font-medium"
            >
              View leads
            </Link>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          <MetricCard label="People" value={dashboard?.pipeline.totalPeople ?? clients.length} hint="+ this week" />
          <MetricCard label="Call Ready" value={callReadyCount} hint="Ready for counsel" />
          <MetricCard label="Upcoming Reviews" value={0} hint="Next 7 days" />
          <MetricCard label="Advisory Clients" value={advisoryCount} hint="Active plans" />
          <MetricCard
            label="Avg Lead Score"
            value={dashboard?.scoring.avgScore ?? 0}
            hint="Internal only"
          />
        </section>

        {/* Pipeline board */}
        <section className="ak-admin-card p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[var(--ak-ink)]">Pipeline</h2>
            <Link href="/admin/pipeline" className="text-[12px] text-[var(--ak-secondary)] hover:text-[var(--ak-ink)]">
              Open full board
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {(dashboard?.pipeline.stages || []).map((stage) => {
              const meta = STAGE_META[stage.id] || { label: stage.label, dot: "bg-[var(--ak-muted)]" };
              return (
                <div key={stage.id} className="min-w-[160px] max-w-[180px] flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                    <span className="text-[12px] font-medium text-[var(--ak-ink)]">{meta.label}</span>
                    <span className="text-[11px] text-[var(--ak-muted)]">{stage.count}</span>
                  </div>
                  <ul className="space-y-2">
                    {stage.people.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => {
                            // Prefer matching advisory client id by name/email when possible
                            const match = clients.find(
                              (c) =>
                                displayName(c) === p.displayName ||
                                c.email === p.displayName ||
                                c.id === p.id,
                            );
                            setSelectedId(match?.id || clients[0]?.id || null);
                          }}
                          className="w-full rounded-[10px] border border-[var(--ak-border)] bg-white px-3 py-2.5 text-left hover:border-[var(--ak-stone)]/30"
                        >
                          <p className="truncate text-[13px] font-medium text-[var(--ak-ink)]">
                            {p.displayName}
                          </p>
                          <p className="mt-1 flex items-center justify-between gap-2 text-[11px] text-[var(--ak-muted)]">
                            <span>{toCrmStage(p.stage)}</span>
                            <span>{formatRelativeActivity(p.lastActivityAt)}</span>
                          </p>
                        </button>
                      </li>
                    ))}
                    {stage.people.length === 0 && (
                      <li className="rounded-[10px] border border-dashed border-[var(--ak-border)] px-3 py-4 text-center text-[11px] text-[var(--ak-muted)]">
                        Quiet
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom: Tasks | Activity | Detail */}
        <section className="grid gap-4 xl:grid-cols-[0.9fr_0.9fr_1.2fr]">
          <div className="ak-admin-card p-5">
            <SectionLabel>Tasks due</SectionLabel>
            <ul className="mt-4 space-y-3">
              {tasks.length === 0 && (
                <li className="text-[13px] text-[var(--ak-muted)]">Nothing urgent.</li>
              )}
              {tasks.map((t) => (
                <li key={t.id} className="flex items-start gap-3 border-t border-[var(--ak-border)] pt-3 first:border-0 first:pt-0">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[var(--ak-border)]" />
                  <div className="min-w-0">
                    <p className="text-[13px] text-[var(--ak-ink)]">{t.label}</p>
                    <p className="mt-0.5 text-[11px] text-[var(--ak-muted)]">{t.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ak-admin-card p-5">
            <SectionLabel>Recent activity</SectionLabel>
            <ul className="mt-4 space-y-3">
              {(dashboard?.recentSignals || []).slice(0, 6).map((s) => (
                <li key={s.id} className="flex gap-3 border-t border-[var(--ak-border)] pt-3 first:border-0 first:pt-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ak-card-alt)] text-[10px] font-semibold text-[var(--ak-secondary)]">
                    AK
                  </div>
                  <div>
                    <p className="text-[13px] text-[var(--ak-ink)]">
                      {s.detail || s.type.replace(/_/g, " ")}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--ak-muted)]">
                      {formatRelativeActivity(s.at)}
                    </p>
                  </div>
                </li>
              ))}
              {(dashboard?.recentSignals || []).length === 0 && (
                <li className="text-[13px] text-[var(--ak-muted)]">Activity will appear as visitors engage.</li>
              )}
            </ul>
          </div>

          {/* Client detail card */}
          <div className="overflow-hidden rounded-[12px] border border-[var(--ak-border)] bg-[var(--ak-card)]">
            {!selected ? (
              <div className="p-8 text-[13px] text-[var(--ak-muted)]">Select a client from the pipeline.</div>
            ) : (
              <>
                <div className="bg-[var(--ak-navy)] px-5 py-4 text-[var(--ak-ivory)]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="ak-admin-display text-[28px] leading-none">{displayName(selected)}</h3>
                      <p className="mt-2 text-[12px] text-white/50">
                        {[selected.email, selected.phone].filter(Boolean).join(" · ") || "No contact yet"}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--ak-brass)]/20 px-3 py-1 text-[11px] font-medium text-[var(--ak-brass)]">
                      {toCrmStage(selected.lifecycleStage)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 overflow-x-auto border-b border-[var(--ak-border)] px-3 pt-2">
                  {(
                    [
                      ["overview", "Overview"],
                      ["profile", "Profile"],
                      ["conversations", "Conversations"],
                      ["notes", "Notes"],
                      ["activity", "Activity"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDetailTab(id)}
                      className={`shrink-0 border-b-2 px-3 py-2 text-[12px] ${
                        detailTab === id
                          ? "border-[var(--ak-stone)] text-[var(--ak-ink)]"
                          : "border-transparent text-[var(--ak-muted)]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 p-5">
                  {(detailTab === "overview" || detailTab === "profile") && (
                    <>
                      <Field label="Situation" value={selected.situation} />
                      <Field label="Desired outcome" value={selected.desiredOutcome} />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Timeline" value={selected.timeline} />
                        <Field label="Budget range" value={selected.budgetRange} />
                      </div>
                      <Field
                        label="Target locations"
                        value={selected.targetLocations?.join(", ")}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Lead score" value={String(selected.leadScore ?? 0)} />
                        <Field
                          label="Readiness"
                          value={String(selected.readinessScore ?? selected.leadScore ?? 0)}
                        />
                      </div>
                      <Field
                        label="Next recommendation"
                        value={selected.nextRecommendedAction}
                      />
                    </>
                  )}

                  {detailTab === "conversations" && (
                    <div className="max-h-64 space-y-3 overflow-y-auto">
                      {conversations.length === 0 && (
                        <p className="text-[13px] text-[var(--ak-muted)]">No conversation yet.</p>
                      )}
                      {conversations.map((m) => (
                        <div key={m.id}>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--ak-muted)]">
                            {m.role}
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-[var(--ak-ink)]">{m.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {detailTab === "notes" && (
                    <div className="space-y-3">
                      <p className="text-[13px] leading-relaxed text-[var(--ak-secondary)]">
                        {selected.internalAdvisorSummary || "No internal notes."}
                      </p>
                      <textarea
                        className="ak-admin-input min-h-[80px]"
                        placeholder="Add note…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <button
                        type="button"
                        className="ak-admin-btn ak-admin-btn-primary"
                        onClick={async () => {
                          if (!note.trim() || !token) return;
                          await fetch(`/api/admin/clients/${selected.id}/note`, {
                            method: "POST",
                            headers: authHeaders(token),
                            body: JSON.stringify({ note, internal: true }),
                          });
                          setNote("");
                          await load(token);
                        }}
                      >
                        Save note
                      </button>
                    </div>
                  )}

                  {detailTab === "activity" && (
                    <p className="text-[13px] text-[var(--ak-secondary)]">
                      Last active {formatRelativeActivity(selected.lastActiveAt)}.
                      {selected.lastConversationSummary
                        ? ` ${selected.lastConversationSummary}`
                        : ""}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 border-t border-[var(--ak-border)] pt-4">
                    {selected.attioUrl && (
                      <a
                        href={selected.attioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ak-admin-btn ak-admin-btn-primary !normal-case !tracking-normal !text-[12px]"
                      >
                        Open in Attio
                      </a>
                    )}
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[12px]"
                      onClick={async () => {
                        if (!token) return;
                        await fetch(`/api/admin/clients/${selected.id}/task`, {
                          method: "POST",
                          headers: authHeaders(token),
                          body: JSON.stringify({ content: `Follow up - ${displayName(selected)}` }),
                        });
                      }}
                    >
                      Create Task
                    </button>
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[12px]"
                      onClick={() => setLocation(`/admin/clients/${selected.id}`)}
                    >
                      Full chart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {search && filteredClients.length > 0 && (
          <section className="ak-admin-card p-4">
            <SectionLabel>Search results</SectionLabel>
            <ul className="mt-3 divide-y divide-[var(--ak-border)]">
              {filteredClients.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2.5 text-left"
                    onClick={() => setSelectedId(c.id)}
                  >
                    <span className="text-[13px] text-[var(--ak-ink)]">{displayName(c)}</span>
                    <span className="text-[11px] text-[var(--ak-muted)]">
                      {toCrmStage(c.lifecycleStage)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </AdminShell>
  );
}

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <div className="ak-admin-card px-4 py-4">
      <p className="text-[11px] font-medium text-[var(--ak-secondary)]">{label}</p>
      <p className="mt-1 text-[26px] font-semibold tabular-nums tracking-tight text-[var(--ak-ink)]">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-[var(--ak-muted)]">{hint}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ak-muted)]">
        {label}
      </p>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--ak-ink)]">{value?.trim() || " - "}</p>
    </div>
  );
}
