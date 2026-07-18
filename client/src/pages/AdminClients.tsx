import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocation, useParams } from "wouter";
import { AdminLoginForm, AdminShell, SectionLabel } from "@/admin/AdminShell";
import { formatRelativeActivity, LIFECYCLE_FILTER_OPTIONS, toCrmStage } from "@/admin/status";

type ClientListItem = {
  id: string;
  visitorId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  situation?: string;
  desiredOutcome?: string;
  timeline?: string;
  leadScore?: number;
  lifecycleStage: string;
  assignedAdvisor?: string | null;
  attioPersonId?: string;
  attioRecordId?: string;
  attioUrl?: string | null;
  lastConversationSummary?: string;
  nextRecommendedAction?: string;
  lastActiveAt: string;
};

type ClientDetail = {
  client: ClientListItem & {
    internalAdvisorSummary?: string;
    scoreBreakdown?: Record<string, number> | null;
  };
  conversations: Array<{ id: string; role: string; content: string; createdAt: string }>;
  syncLogs: Array<{ id: string; action: string; level: string; message: string; createdAt: string }>;
  goals: Array<{ id: string; goal: string; status: string }>;
};

function authHeaders(token: string): HeadersInit {
  const value = token.startsWith("Basic ") ? token : `Basic ${token}`;
  return { Authorization: value, "Content-Type": "application/json" };
}

function displayName(c: Pick<ClientListItem, "firstName" | "lastName" | "email" | "visitorId">) {
  const name = [c.firstName, c.lastName].filter(Boolean).join(" ");
  return name || c.email || `Visitor ${c.visitorId.slice(4, 12)}`;
}

function StatusDot({ status }: { status: string }) {
  const tone =
    status === "Ready Soon" || status === "Active Search"
      ? "bg-[var(--ak-brass)]"
      : status === "Closed"
        ? "bg-[var(--ak-success)]"
        : status === "Negotiating"
          ? "bg-[var(--ak-warning)]"
          : "bg-[var(--ak-muted)]";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${tone}`} />;
}

export default function AdminClients() {
  const params = useParams<{ id?: string }>();
  const [, setLocation] = useLocation();
  const selectedId = params.id;

  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("ak_admin_basic"));
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [note, setNote] = useState("");
  const [advisor, setAdvisor] = useState("");

  const loadList = useCallback(
    async (auth: string) => {
      const search = new URLSearchParams();
      if (q) search.set("q", q);
      if (stageFilter) search.set("stage", stageFilter);
      const res = await fetch(`/api/admin/clients?${search}`, { headers: authHeaders(auth) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Failed to load clients");
      setClients(body.clients || []);
    },
    [q, stageFilter],
  );

  const loadDetail = useCallback(async (auth: string, id: string) => {
    const res = await fetch(`/api/admin/clients/${id}`, { headers: authHeaders(auth) });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Failed to load client");
    setDetail(body as ClientDetail);
    setAdvisor(body.client?.assignedAdvisor || "");
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    loadList(token)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, loadList]);

  useEffect(() => {
    if (!token || !selectedId) {
      setDetail(null);
      return;
    }
    loadDetail(token, selectedId).catch((e) => setError(e.message));
  }, [token, selectedId, loadDetail]);

  const selected = useMemo(
    () => clients.find((c) => c.id === selectedId) || detail?.client || null,
    [clients, selectedId, detail],
  );

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    const next = `Basic ${btoa(`${user}:${pass}`)}`;
    try {
      setLoading(true);
      setError(null);
      await loadList(next);
      sessionStorage.setItem("ak_admin_basic", next);
      setToken(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AdminLoginForm
        title="Clients"
        subtitle="Private advisory records. Not a CRM inbox."
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

  const c = detail?.client;

  return (
    <AdminShell
      search={q}
      onSearchChange={setQ}
      onSignOut={() => {
        sessionStorage.removeItem("ak_admin_basic");
        setToken(null);
        setDetail(null);
      }}
      topActions={
        <button
          type="button"
          className="ak-admin-btn ak-admin-btn-ghost !normal-case !tracking-normal !text-[13px]"
          onClick={async () => {
            await fetch("/api/admin/clients/seed", {
              method: "POST",
              headers: authHeaders(token!),
            });
            await loadList(token!);
          }}
        >
          Load samples
        </button>
      }
    >
      <div className="flex min-h-[calc(100vh-88px)] flex-col lg:flex-row">
        {/* Apple Mail–style list */}
        <section className="flex w-full flex-col border-b border-[var(--ak-border)] bg-[var(--ak-card)] lg:w-[360px] lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="space-y-3 border-b border-[var(--ak-border)] px-4 py-4">
            <select
              className="ak-admin-input"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="">All stages</option>
              {LIFECYCLE_FILTER_OPTIONS.filter(
                (opt, i, arr) => arr.findIndex((o) => o.label === opt.label) === i,
              ).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && (
              <p className="px-5 py-8 text-[13px] text-[var(--ak-muted)]">Loading records…</p>
            )}
            {error && <p className="px-5 py-4 text-[13px] text-[var(--ak-danger)]">{error}</p>}
            {!loading && clients.length === 0 && (
              <p className="px-5 py-8 text-[13px] leading-relaxed text-[var(--ak-secondary)]">
                No client charts yet. Begin a Decision Guide conversation, or load samples.
              </p>
            )}
            <ul>
              {clients.map((client) => {
                const active = selectedId === client.id;
                const status = toCrmStage(client.lifecycleStage);
                return (
                  <li key={client.id}>
                    <button
                      type="button"
                      onClick={() => setLocation(`/admin/clients/${client.id}`)}
                      className={`w-full border-l-2 px-4 py-4 text-left transition ${
                        active
                          ? "border-[var(--ak-brass)] bg-[var(--ak-stone)] text-[var(--ak-ivory)]"
                          : "border-transparent hover:bg-[var(--ak-card-alt)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p
                            className={`truncate text-[15px] font-medium ${
                              active ? "text-[var(--ak-ivory)]" : "text-[var(--ak-ink)]"
                            }`}
                          >
                            {displayName(client)}
                          </p>
                          <p
                            className={`mt-1 flex items-center gap-2 text-[12px] ${
                              active ? "text-white/65" : "text-[var(--ak-secondary)]"
                            }`}
                          >
                            <StatusDot status={status} />
                            {status}
                            <span className={active ? "text-white/35" : "text-[var(--ak-muted)]"}>·</span>
                            {client.timeline || "Timeline open"}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p
                            className={`text-[12px] tabular-nums ${
                              active ? "text-[var(--ak-brass)]" : "text-[var(--ak-muted)]"
                            }`}
                          >
                            {client.leadScore ?? 0}
                          </p>
                          <p
                            className={`mt-1 text-[11px] ${
                              active ? "text-white/45" : "text-[var(--ak-muted)]"
                            }`}
                          >
                            {formatRelativeActivity(client.lastActiveAt)}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`mt-2 line-clamp-2 text-[12px] leading-relaxed ${
                          active ? "text-white/55" : "text-[var(--ak-muted)]"
                        }`}
                      >
                        {client.desiredOutcome || client.situation || "Objective forming"}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Editorial detail */}
        <section className="min-w-0 flex-1 overflow-y-auto bg-[var(--ak-card-alt)]">
          {!selectedId || !c ? (
            <div className="flex h-full min-h-[420px] items-center justify-center px-8">
              <div className="max-w-md text-center">
                <p className="ak-admin-display text-[28px] text-[var(--ak-ink)]">Select a client</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--ak-secondary)]">
                  Open a chart to review situation, plan, conversation, and next recommendation —
                  privately, without CRM noise.
                </p>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-10 px-5 py-8 sm:px-10 sm:py-12">
              <header className="space-y-3">
                <h2 className="ak-admin-display text-[40px] leading-none text-[var(--ak-ink)] sm:text-[48px]">
                  {displayName(c)}
                </h2>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--ak-secondary)]">
                  <span className="inline-flex items-center gap-2">
                    <StatusDot status={toCrmStage(c.lifecycleStage)} />
                    {toCrmStage(c.lifecycleStage)}
                  </span>
                  <span className="text-[var(--ak-border)]">|</span>
                  <span>{c.timeline || "Timeline open"}</span>
                  <span className="text-[var(--ak-border)]">|</span>
                  <span>Readiness {c.leadScore ?? 0}</span>
                  {c.email && (
                    <>
                      <span className="text-[var(--ak-border)]">|</span>
                      <span>{c.email}</span>
                    </>
                  )}
                </p>
              </header>

              <div className="grid gap-8 sm:grid-cols-2">
                <EditorialBlock label="Situation" body={c.situation} />
                <EditorialBlock label="Desired outcome" body={c.desiredOutcome} />
              </div>

              <hr className="ak-admin-divider" />

              <div className="grid gap-8 sm:grid-cols-2">
                <EditorialBlock
                  label="Current plan"
                  body={c.nextRecommendedAction || "Clarify next step together"}
                />
                <EditorialBlock label="Timeline" body={c.timeline || "Still forming"} />
              </div>

              <EditorialBlock
                label="Advisor summary"
                body={c.lastConversationSummary}
                large
              />

              <EditorialBlock
                label="Next recommendation"
                body={c.nextRecommendedAction}
              />

              <EditorialBlock
                label="Internal notes"
                body={c.internalAdvisorSummary}
                muted
              />

              <hr className="ak-admin-divider" />

              <section className="space-y-4">
                <SectionLabel>Conversation</SectionLabel>
                <div className="ak-admin-card space-y-0 overflow-hidden">
                  {(detail?.conversations || []).length === 0 ? (
                    <p className="px-5 py-6 text-[13px] text-[var(--ak-muted)]">No messages stored yet.</p>
                  ) : (
                    detail?.conversations.map((m) => (
                      <div
                        key={m.id}
                        className="border-b border-[var(--ak-border)] px-5 py-4 last:border-0"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ak-muted)]">
                          {m.role === "assistant" ? "Guide" : "Client"} ·{" "}
                          {formatRelativeActivity(m.createdAt)}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-[var(--ak-ink)]">
                          {m.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <SectionLabel>Actions</SectionLabel>
                <div className="ak-admin-card space-y-4 p-5">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      className="ak-admin-input"
                      placeholder="Assigned advisor"
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                    />
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-ghost"
                      onClick={async () => {
                        await fetch(`/api/admin/clients/${c.id}/assign`, {
                          method: "POST",
                          headers: authHeaders(token!),
                          body: JSON.stringify({ advisor }),
                        });
                      }}
                    >
                      Assign
                    </button>
                  </div>
                  <textarea
                    className="ak-admin-input min-h-[100px] resize-y"
                    placeholder="Add an internal note…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-primary"
                      onClick={async () => {
                        if (!note.trim()) return;
                        await fetch(`/api/admin/clients/${c.id}/note`, {
                          method: "POST",
                          headers: authHeaders(token!),
                          body: JSON.stringify({ note, internal: true }),
                        });
                        setNote("");
                        await loadDetail(token!, c.id);
                      }}
                    >
                      Save note
                    </button>
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-ghost"
                      onClick={async () => {
                        await fetch(`/api/admin/clients/${c.id}/resync`, {
                          method: "POST",
                          headers: authHeaders(token!),
                        });
                      }}
                    >
                      Resync Attio
                    </button>
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-success"
                      onClick={async () => {
                        await fetch(`/api/admin/clients/${c.id}/lifecycle`, {
                          method: "POST",
                          headers: authHeaders(token!),
                          body: JSON.stringify({ stage: "qualified" }),
                        });
                        await loadDetail(token!, c.id);
                        await loadList(token!);
                      }}
                    >
                      Mark Qualified
                    </button>
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-danger"
                      onClick={async () => {
                        await fetch(`/api/admin/clients/${c.id}/lifecycle`, {
                          method: "POST",
                          headers: authHeaders(token!),
                          body: JSON.stringify({ stage: "advisory_client" }),
                        });
                        await loadDetail(token!, c.id);
                        await loadList(token!);
                      }}
                    >
                      Mark Advisory Client
                    </button>
                    {c.attioUrl && (
                      <a
                        href={c.attioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ak-admin-btn ak-admin-btn-ghost"
                      >
                        Open in Attio
                      </a>
                    )}
                  </div>
                </div>
              </section>

              {(detail?.syncLogs?.length ?? 0) > 0 && (
                <section className="space-y-3 pb-8">
                  <SectionLabel>Sync quiet log</SectionLabel>
                  <ul className="space-y-1 text-[12px] text-[var(--ak-muted)]">
                    {detail!.syncLogs.slice(0, 8).map((log) => (
                      <li key={log.id}>
                        {log.action}: {log.message}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}

function EditorialBlock({
  label,
  body,
  large,
  muted,
}: {
  label: string;
  body?: string | null;
  large?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="space-y-2">
      <SectionLabel>{label}</SectionLabel>
      <p
        className={`whitespace-pre-wrap leading-relaxed ${
          large ? "text-[16px]" : "text-[14px]"
        } ${muted ? "text-[var(--ak-secondary)]" : "text-[var(--ak-ink)]"}`}
      >
        {body?.trim() || "—"}
      </p>
    </div>
  );
}
