import { useState, type FormEvent } from "react";
import {
  BUDGET_BANDS,
  BUYING_GOALS,
  CONTACT_METHODS,
  FINANCING_OPTIONS,
  MANHATTAN_NEIGHBORHOOD_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/data/international-hub";

export type StrategyFormLabels = {
  headline: string;
  subhead: string;
  specialistPromise: string;
  submitLabel?: string;
};

const defaultLabels: StrategyFormLabels = {
  headline: "Request Your Manhattan Strategy",
  subhead:
    "Tell us about your situation. We'll review your goals and recommend the most appropriate next step.",
  specialistPromise:
    "After you submit, a specialist who speaks your language will get in touch to review your goals and recommend the right next step — the beginning of a consultation, not an automated sales pitch.",
  submitLabel: "Submit strategy request",
};

type Props = {
  labels?: Partial<StrategyFormLabels>;
  defaultCountry?: string;
  defaultLanguage?: string;
  sourcePage: string;
  countrySlug?: string;
};

export function InternationalStrategyForm({
  labels,
  defaultCountry = "",
  defaultLanguage = "English",
  sourcePage,
  countrySlug,
}: Props) {
  const copy = { ...defaultLabels, ...labels };
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [wantRoadmap, setWantRoadmap] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    country: defaultCountry,
    city: "",
    preferredLanguage: defaultLanguage,
    contactMethod: "Email",
    contactDetail: "",
    buyingGoal: "",
    budget: "",
    timeline: "",
    financing: "",
    helpUnderstanding: "",
    howFound: "",
  });

  function toggleNeighborhood(name: string) {
    setNeighborhoods((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  }

  function marketingPayload() {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    return {
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      landingLanguage: defaultLanguage,
    };
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/international-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          neighborhoods,
          wantRoadmap,
          sourcePage,
          countrySlug: countrySlug || undefined,
          ...marketingPayload(),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || "Submission failed");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-brand-border bg-white p-8 sm:p-10">
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">Request received</p>
        <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.4rem)] leading-[0.96] text-brand-navy">
          A specialist who speaks your language will get in touch.
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-brand-graphite">
          {copy.specialistPromise}
        </p>
        <p className="mt-4 text-sm leading-7 text-brand-graphite/80">
          Typical review time is within one to two business days. While you wait, you can continue with the{" "}
          <a href="/belonging" className="underline underline-offset-4">
            Belonging Assessment
          </a>{" "}
          or the{" "}
          <a href="/services/foreign-buyers-new-york" className="underline underline-offset-4">
            International Buyer Decision Brief
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-brand-border bg-brand-ivory px-4 py-3 text-sm text-brand-navy outline-none focus:border-brand-navy";
  const label = "mb-2 block text-[11px] uppercase tracking-[0.14em] text-brand-cocoa";

  return (
    <form onSubmit={onSubmit} className="border border-brand-border bg-white p-8 sm:p-10">
      <p className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">Strategy request</p>
      <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.96] text-brand-navy">
        {copy.headline}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-brand-graphite">{copy.subhead}</p>
      <p className="mt-4 max-w-2xl border-l-2 border-brand-brass pl-4 text-sm leading-7 text-brand-graphite">
        {copy.specialistPromise}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="fullName">
            Full name
          </label>
          <input
            id="fullName"
            required
            className={field}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="country">
            Country of residence
          </label>
          <input
            id="country"
            required
            className={field}
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="preferredLanguage">
            Preferred language
          </label>
          <input
            id="preferredLanguage"
            required
            className={field}
            value={form.preferredLanguage}
            onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="contactMethod">
            Preferred contact method
          </label>
          <select
            id="contactMethod"
            className={field}
            value={form.contactMethod}
            onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="contactDetail">
            WhatsApp / WeChat / Phone (optional)
          </label>
          <input
            id="contactDetail"
            className={field}
            value={form.contactDetail}
            onChange={(e) => setForm({ ...form, contactDetail: e.target.value })}
          />
        </div>
        <div>
          <label className={label} htmlFor="buyingGoal">
            Buying goal
          </label>
          <select
            id="buyingGoal"
            required
            className={field}
            value={form.buyingGoal}
            onChange={(e) => setForm({ ...form, buyingGoal: e.target.value })}
          >
            <option value="">Select…</option>
            {BUYING_GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="budget">
            Budget
          </label>
          <select
            id="budget"
            required
            className={field}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value="">Select…</option>
            {BUDGET_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="timeline">
            Timeline
          </label>
          <select
            id="timeline"
            required
            className={field}
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          >
            <option value="">Select…</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="financing">
            Financing
          </label>
          <select
            id="financing"
            required
            className={field}
            value={form.financing}
            onChange={(e) => setForm({ ...form, financing: e.target.value })}
          >
            <option value="">Select…</option>
            {FINANCING_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <p className={label}>Neighborhoods of interest</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {MANHATTAN_NEIGHBORHOOD_OPTIONS.map((n) => {
            const on = neighborhoods.includes(n);
            return (
              <button
                key={n}
                type="button"
                onClick={() => toggleNeighborhood(n)}
                className={`border px-3 py-1.5 text-xs tracking-wide ${
                  on
                    ? "border-brand-navy bg-brand-navy text-brand-ivory"
                    : "border-brand-border bg-brand-ivory text-brand-graphite"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <label className={label} htmlFor="helpUnderstanding">
          What would you like help understanding?
        </label>
        <textarea
          id="helpUnderstanding"
          rows={4}
          className={field}
          value={form.helpUnderstanding}
          onChange={(e) => setForm({ ...form, helpUnderstanding: e.target.value })}
          placeholder="Condo vs co-op, financing, neighborhoods, taxes, remote buying…"
        />
      </div>

      <div className="mt-8">
        <label className={label} htmlFor="howFound">
          How did you find us? (optional)
        </label>
        <input
          id="howFound"
          className={field}
          value={form.howFound}
          onChange={(e) => setForm({ ...form, howFound: e.target.value })}
          placeholder="Google, YouTube, Instagram, LinkedIn, referral…"
        />
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 border border-brand-border bg-brand-ivory p-4">
        <input
          type="checkbox"
          className="mt-1"
          checked={wantRoadmap}
          onChange={(e) => setWantRoadmap(e.target.checked)}
        />
        <span>
          <span className="block text-sm font-medium text-brand-navy">
            Would you like a personalized Manhattan Buying Roadmap?
          </span>
          <span className="mt-1 block text-sm leading-6 text-brand-graphite">
            Ideal if you are 6–18 months from buying — tailored next steps without requiring a call today.
          </span>
        </span>
      </label>

      {(error || status === "error") && (
        <p className="mt-4 text-sm text-red-700">{error || "Please try again."}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 bg-brand-navy px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : copy.submitLabel || "Submit strategy request"}
      </button>
    </form>
  );
}
