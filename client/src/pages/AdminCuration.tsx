import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { AdminLoginForm, AdminShell, SectionLabel } from "@/admin/AdminShell";

type Band = "5-10" | "10-15" | "15-20";
type Status = "on_sale" | "reserved_pinned" | "pending" | "escrow" | "price_drop" | "sold";
type ReportStatus = "queued" | "draft" | "ready" | "published" | "held";

type Batch = {
  id: string;
  periodDate: string;
  notes: string | null;
};

type Suggestion = {
  id: string;
  batchId: string;
  address: string;
  askPrice: string | null;
  band: Band;
  persona: string | null;
  notes: string | null;
  sourceUrl: string;
  rank: number;
  capturedAt: string;
};

type Selection = {
  id: string;
  suggestionId: string | null;
  address: string;
  askPrice: string | null;
  band: Band;
  persona: string | null;
  notes: string | null;
  sourceUrl: string;
  onSale: boolean;
  status: Status;
  raphiReplaced: boolean;
  replacedSuggestionId: string | null;
  reportStatus: ReportStatus;
  updatedAt: string;
};

type Desk = {
  storageMode: "database" | "memory";
  batches: Batch[];
  suggestions: Suggestion[];
  selections: Selection[];
  onSaleCount: number;
};

const AUTH_KEY = "ak_admin_basic";

const BANDS: Array<{ value: Band; label: string }> = [
  { value: "5-10", label: "$5–10M" },
  { value: "10-15", label: "$10–15M" },
  { value: "15-20", label: "$15–20M · trophy" },
];

const STATUSES: Array<{ value: Status; label: string }> = [
  { value: "on_sale", label: "On sale" },
  { value: "reserved_pinned", label: "Reserved / pinned" },
  { value: "pending", label: "Pending" },
  { value: "escrow", label: "Escrow" },
  { value: "price_drop", label: "Price drop" },
  { value: "sold", label: "Sold" },
];

const REPORTS: Array<{ value: ReportStatus; label: string }> = [
  { value: "queued", label: "Queued" },
  { value: "draft", label: "Draft" },
  { value: "ready", label: "Ready" },
  { value: "published", label: "Published" },
  { value: "held", label: "Held" },
];

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: token.startsWith("Basic ") ? token : `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

function bandLabel(band: string) {
  return BANDS.find((item) => item.value === band)?.label || band;
}

function formatPeriod(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function nextPeriodValue() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  const next = day < 15 ? new Date(Date.UTC(year, month, 15)) : new Date(Date.UTC(year, month + 1, 1));
  return next.toISOString().slice(0, 10);
}

function StatusChip({ status }: { status: Status }) {
  const tone: Record<Status, string> = {
    on_sale: "border-[var(--ak-success)]/40 bg-[var(--ak-success)]/10 text-[var(--ak-success)]",
    reserved_pinned: "border-[var(--ak-brass)]/40 bg-[var(--ak-brass)]/10 text-[var(--ak-brass)]",
    pending: "border-[var(--ak-border)] bg-white/50 text-[var(--ak-secondary)]",
    escrow: "border-[#6B8F9E]/40 bg-[#6B8F9E]/10 text-[#4F7382]",
    price_drop: "border-[var(--ak-warning)]/40 bg-[var(--ak-warning)]/10 text-[var(--ak-warning)]",
    sold: "border-[var(--ak-muted)] bg-[var(--ak-card-alt)] text-[var(--ak-muted)]",
  };
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${tone[status]}`}>
      {STATUSES.find((item) => item.value === status)?.label || status}
    </span>
  );
}

export default function AdminCuration() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(AUTH_KEY));
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [desk, setDesk] = useState<Desk | null>(null);
  const [batchId, setBatchId] = useState<string>("");
  const [replacedOnly, setReplacedOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Selection | null>(null);
  const [replacing, setReplacing] = useState<Selection | null>(null);
  const [paste, setPaste] = useState({
    sourceUrl: "",
    address: "",
    askPrice: "",
    band: "5-10" as Band,
    persona: "",
    notes: "",
  });
  const [newPeriod, setNewPeriod] = useState(nextPeriodValue());

  const applyNoIndex = useCallback(() => {
    document.title = "Curation IQ | Agent Kammer";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow, noarchive");
  }, []);

  useEffect(() => {
    applyNoIndex();
  }, [applyNoIndex]);

  const load = useCallback(
    async (auth: string, nextBatch = batchId, nextReplaced = replacedOnly) => {
      const params = new URLSearchParams();
      if (nextBatch) params.set("batchId", nextBatch);
      if (nextReplaced) params.set("raphiReplaced", "true");
      const res = await fetch(`/api/admin/curation?${params.toString()}`, {
        headers: authHeaders(auth),
        credentials: "include",
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Unable to open Curation IQ");
      const next = body as Desk;
      setDesk(next);
      if (!nextBatch && next.batches[0]) setBatchId(next.batches[0].id);
    },
    [batchId, replacedOnly],
  );

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    load(token)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, load]);

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
      await load(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const act = async (path: string, init: RequestInit) => {
    if (!token) return;
    setError(null);
    setNotice(null);
    const res = await fetch(path, { ...init, headers: { ...authHeaders(token), ...(init.headers || {}) } });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Request failed");
    await load(token);
    return body;
  };

  const selectedBatch = desk?.batches.find((batch) => batch.id === batchId) || desk?.batches[0];
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (desk?.suggestions || []).filter((row) => {
      if (!q) return true;
      return [row.address, row.askPrice, row.band, row.persona, row.sourceUrl, row.notes]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q));
    });
  }, [desk?.suggestions, search]);

  const selections = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (desk?.selections || []).filter((row) => {
      if (!q) return true;
      return [row.address, row.askPrice, row.band, row.status, row.notes]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q));
    });
  }, [desk?.selections, search]);

  if (!token) {
    return (
      <AdminLoginForm
        title="Curation IQ"
        subtitle="Suggested shortlist and Selected report queue. Unlisted operator desk."
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ak-brass)]">
              Unlisted · Kammer Report queue
            </p>
            <h1 className="ak-admin-display mt-1 text-[32px] text-[var(--ak-ink)]">Curation IQ</h1>
            <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[var(--ak-secondary)]">
              Twice-monthly Suggested shortlist (1st &amp; 15th). You edit freely. Suggested is reference
              only. Selected is what gets a Report — and what can go on sale.
            </p>
          </div>
          <div className="text-right text-[12px] text-[var(--ak-muted)]">
            <p>Storage: {desk?.storageMode || "…"}</p>
            <p>On sale: {desk?.onSaleCount ?? 0} / 5</p>
          </div>
        </div>

        <div className="ak-admin-card px-5 py-4 text-[13px] leading-relaxed text-[var(--ak-secondary)]">
          <SectionLabel>v1 capture — paste, do not scrape</SectionLabel>
          <p className="mt-2">
            Until the brokerage MLS / RESO feed is live, operators capture StreetEasy{" "}
            <em>Most Popular</em> per band (Weekly OS style) and paste sale URLs here. Universe:
            Manhattan condos, for sale, research $5–20M. Primary publish $5–15M. $15–20M is
            trophy-only. Sale listings only — no rentals. Suggested history stays for learning even
            when you replace a slot. The public never sees the replacement mark.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[220px] flex-1">
            <SectionLabel>Suggested batch</SectionLabel>
            <select
              className="ak-admin-input mt-2"
              value={selectedBatch?.id || ""}
              onChange={(e) => {
                setBatchId(e.target.value);
              }}
            >
              {(desk?.batches || []).map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {formatPeriod(batch.periodDate)}
                </option>
              ))}
            </select>
          </label>
          <label className="w-[160px]">
            <SectionLabel>New 1st / 15th</SectionLabel>
            <input
              className="ak-admin-input mt-2"
              type="date"
              value={newPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="ak-admin-btn ak-admin-btn-ghost"
            onClick={async () => {
              try {
                const body = await act("/api/admin/curation/batches", {
                  method: "POST",
                  body: JSON.stringify({ periodDate: newPeriod }),
                });
                if (body?.batch?.id) setBatchId(body.batch.id);
                setNotice("Batch ready.");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Could not create batch");
              }
            }}
          >
            Open batch
          </button>
          <button
            type="button"
            className="ak-admin-btn ak-admin-btn-ghost"
            onClick={async () => {
              try {
                await act("/api/admin/curation/seed", { method: "POST", body: JSON.stringify({}) });
                setNotice("Sample shortlist is in place.");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Seed failed");
              }
            }}
          >
            Seed sample
          </button>
        </div>

        {error && <p className="text-sm text-[var(--ak-danger)]">{error}</p>}
        {notice && <p className="text-sm text-[var(--ak-success)]">{notice}</p>}
        {loading && !desk && <p className="text-[13px] text-[var(--ak-muted)]">Opening the desk…</p>}

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="ak-admin-card overflow-hidden">
            <div className="border-b border-[var(--ak-border)] px-5 py-4">
              <SectionLabel>Layer 1 · Suggested (IQ)</SectionLabel>
              <h2 className="ak-admin-display mt-1 text-[24px] text-[var(--ak-ink)]">Reference shortlist</h2>
              <p className="mt-1 text-[12px] text-[var(--ak-secondary)]">
                System / operator paste. Never publishes on its own.
              </p>
            </div>

            <form
              className="space-y-3 border-b border-[var(--ak-border)] px-5 py-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedBatch) return;
                try {
                  await act("/api/admin/curation/suggestions", {
                    method: "POST",
                    body: JSON.stringify({ ...paste, batchId: selectedBatch.id }),
                  });
                  setPaste({ sourceUrl: "", address: "", askPrice: "", band: "5-10", persona: "", notes: "" });
                  setNotice("Added to Suggested.");
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Paste failed");
                }
              }}
            >
              <input
                className="ak-admin-input"
                required
                placeholder="StreetEasy or listing URL"
                value={paste.sourceUrl}
                onChange={(e) => setPaste((prev) => ({ ...prev, sourceUrl: e.target.value }))}
              />
              <input
                className="ak-admin-input"
                required
                placeholder="Address (label SAMPLE if it is a stand-in)"
                value={paste.address}
                onChange={(e) => setPaste((prev) => ({ ...prev, address: e.target.value }))}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  className="ak-admin-input"
                  placeholder="Ask price"
                  value={paste.askPrice}
                  onChange={(e) => setPaste((prev) => ({ ...prev, askPrice: e.target.value }))}
                />
                <select
                  className="ak-admin-input"
                  value={paste.band}
                  onChange={(e) => setPaste((prev) => ({ ...prev, band: e.target.value as Band }))}
                >
                  {BANDS.map((band) => (
                    <option key={band.value} value={band.value}>
                      {band.label}
                    </option>
                  ))}
                </select>
                <input
                  className="ak-admin-input"
                  placeholder="Persona (optional)"
                  value={paste.persona}
                  onChange={(e) => setPaste((prev) => ({ ...prev, persona: e.target.value }))}
                />
              </div>
              <textarea
                className="ak-admin-input min-h-[72px]"
                placeholder="Notes — capture, not a write-up"
                value={paste.notes}
                onChange={(e) => setPaste((prev) => ({ ...prev, notes: e.target.value }))}
              />
              <button type="submit" className="ak-admin-btn ak-admin-btn-primary">
                Paste into Suggested
              </button>
            </form>

            <ul className="divide-y divide-[var(--ak-border)]">
              {suggestions.length === 0 && (
                <li className="px-5 py-8 text-[13px] text-[var(--ak-muted)]">No Suggested rows in this batch.</li>
              )}
              {suggestions.map((row) => (
                <li key={row.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] text-[var(--ak-ink)]">{row.address}</p>
                      <p className="mt-1 text-[12px] text-[var(--ak-secondary)]">
                        {row.askPrice || "Ask TBD"} · {bandLabel(row.band)}
                        {row.persona ? ` · ${row.persona}` : ""}
                      </p>
                      {row.notes && <p className="mt-2 text-[12px] leading-relaxed text-[var(--ak-muted)]">{row.notes}</p>}
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block break-all text-[11px] text-[var(--ak-brass)]"
                      >
                        {row.sourceUrl}
                      </a>
                    </div>
                    <button
                      type="button"
                      className="ak-admin-btn ak-admin-btn-primary"
                      onClick={async () => {
                        try {
                          await act(`/api/admin/curation/suggestions/${row.id}/promote`, { method: "POST" });
                          setNotice("Promoted to Selected.");
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Promote failed");
                        }
                      }}
                    >
                      Promote
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="ak-admin-card overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--ak-border)] px-5 py-4">
              <div>
                <SectionLabel>Layer 2 · Selected (Raphi)</SectionLabel>
                <h2 className="ak-admin-display mt-1 text-[24px] text-[var(--ak-ink)]">Report queue</h2>
                <p className="mt-1 text-[12px] text-[var(--ak-secondary)]">
                  On sale appears in a public drop (max 5). Off keeps the pin and history.
                </p>
              </div>
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[var(--ak-secondary)]">
                <input
                  type="checkbox"
                  checked={replacedOnly}
                  onChange={(e) => setReplacedOnly(e.target.checked)}
                />
                Secret: raphi_replaced
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-[13px]">
                <thead className="border-b border-[var(--ak-border)] text-[10px] uppercase tracking-[0.14em] text-[var(--ak-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Listing</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Sale</th>
                    <th className="px-4 py-3 font-semibold">Replaced</th>
                    <th className="px-4 py-3 font-semibold"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--ak-border)]">
                  {selections.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-[var(--ak-muted)]">
                        Nothing Selected yet. Promote from Suggested.
                      </td>
                    </tr>
                  )}
                  {selections.map((row) => (
                    <tr key={row.id} className="align-top">
                      <td className="px-4 py-4">
                        <p className="text-[var(--ak-ink)]">{row.address}</p>
                        <p className="mt-1 text-[12px] text-[var(--ak-secondary)]">
                          {row.askPrice || "Ask TBD"} · {bandLabel(row.band)} · Report {row.reportStatus}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <StatusChip status={row.status} />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          className={`ak-admin-btn ${row.onSale ? "ak-admin-btn-success" : "ak-admin-btn-ghost"}`}
                          onClick={async () => {
                            try {
                              await act(`/api/admin/curation/selections/${row.id}/on-sale`, {
                                method: "POST",
                                body: JSON.stringify({ onSale: !row.onSale }),
                              });
                              setNotice(row.onSale ? "Taken off the live drop." : "On sale.");
                            } catch (err) {
                              setError(err instanceof Error ? err.message : "Sale toggle failed");
                            }
                          }}
                        >
                          {row.onSale ? "On sale" : "Off"}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        {row.raphiReplaced ? (
                          <span className="rounded-full border border-[var(--ak-danger)]/30 bg-[var(--ak-danger)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ak-danger)]">
                            raphi_replaced
                          </span>
                        ) : (
                          <span className="text-[12px] text-[var(--ak-muted)]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            className="ak-admin-btn ak-admin-btn-ghost"
                            onClick={() => setEditing(row)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="ak-admin-btn ak-admin-btn-ghost"
                            onClick={() => setReplacing(row)}
                          >
                            Replace
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {editing && (
          <SelectionForm
            title="Edit Selected"
            selection={editing}
            onClose={() => setEditing(null)}
            onSave={async (patch) => {
              await act(`/api/admin/curation/selections/${editing.id}`, {
                method: "PATCH",
                body: JSON.stringify(patch),
              });
              setEditing(null);
              setNotice("Selected updated.");
            }}
          />
        )}

        {replacing && (
          <SelectionForm
            title="Replace listing"
            hint="This keeps the original Suggested row and secretly marks the slot raphi_replaced. The public never sees that mark."
            selection={{ ...replacing, address: "", sourceUrl: "", askPrice: "" }}
            replaceMode
            onClose={() => setReplacing(null)}
            onSave={async (patch) => {
              await act(`/api/admin/curation/selections/${replacing.id}`, {
                method: "PATCH",
                body: JSON.stringify({ ...patch, replaceAsRaphi: true }),
              });
              setReplacing(null);
              setNotice("Replacement stored. Suggested history kept.");
            }}
          />
        )}
      </div>
    </AdminShell>
  );
}

function SelectionForm({
  title,
  hint,
  selection,
  replaceMode,
  onClose,
  onSave,
}: {
  title: string;
  hint?: string;
  selection: Selection;
  replaceMode?: boolean;
  onClose: () => void;
  onSave: (patch: Record<string, unknown>) => Promise<void>;
}) {
  const [form, setForm] = useState({
    address: selection.address,
    sourceUrl: selection.sourceUrl,
    askPrice: selection.askPrice || "",
    band: selection.band,
    persona: selection.persona || "",
    notes: selection.notes || "",
    status: selection.status,
    reportStatus: selection.reportStatus,
  });
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--ak-navy)]/40 p-4 sm:items-center">
      <form
        className="ak-admin-card w-full max-w-lg space-y-3 p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setLocalError(null);
          try {
            await onSave(form);
          } catch (err) {
            setLocalError(err instanceof Error ? err.message : "Save failed");
          } finally {
            setBusy(false);
          }
        }}
      >
        <h3 className="ak-admin-display text-[26px] text-[var(--ak-ink)]">{title}</h3>
        {hint && <p className="text-[13px] leading-relaxed text-[var(--ak-secondary)]">{hint}</p>}
        <input
          className="ak-admin-input"
          required
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
        />
        <input
          className="ak-admin-input"
          required
          placeholder="Listing URL"
          value={form.sourceUrl}
          onChange={(e) => setForm((prev) => ({ ...prev, sourceUrl: e.target.value }))}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="ak-admin-input"
            placeholder="Ask price"
            value={form.askPrice}
            onChange={(e) => setForm((prev) => ({ ...prev, askPrice: e.target.value }))}
          />
          <select
            className="ak-admin-input"
            value={form.band}
            onChange={(e) => setForm((prev) => ({ ...prev, band: e.target.value as Band }))}
          >
            {BANDS.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </div>
        {!replaceMode && (
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className="ak-admin-input"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as Status }))}
            >
              {STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              className="ak-admin-input"
              value={form.reportStatus}
              onChange={(e) => setForm((prev) => ({ ...prev, reportStatus: e.target.value as ReportStatus }))}
            >
              {REPORTS.map((status) => (
                <option key={status.value} value={status.value}>
                  Report · {status.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          className="ak-admin-input"
          placeholder="Persona (optional)"
          value={form.persona}
          onChange={(e) => setForm((prev) => ({ ...prev, persona: e.target.value }))}
        />
        <textarea
          className="ak-admin-input min-h-[80px]"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
        />
        {localError && <p className="text-sm text-[var(--ak-danger)]">{localError}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" className="ak-admin-btn ak-admin-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="ak-admin-btn ak-admin-btn-primary" disabled={busy}>
            {busy ? "Saving…" : replaceMode ? "Replace & mark" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
