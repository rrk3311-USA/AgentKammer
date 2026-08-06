import { useState, type FormEvent } from "react";
import {
  BUDGET_BANDS,
  BUYING_GOALS,
  CONTACT_METHODS,
  FINANCING_OPTIONS,
  MANHATTAN_NEIGHBORHOOD_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/data/international-hub";
import { ENGLISH_UI } from "@/data/international-locales";

export type StrategyFormLabels = {
  headline: string;
  subhead: string;
  specialistPromise: string;
  submitLabel?: string;
  formEyebrow?: string;
  successEyebrow?: string;
  successTitle?: string;
  successWait?: string;
  roadmapLabel?: string;
  fieldFullName?: string;
  fieldEmail?: string;
  fieldCountry?: string;
  fieldLanguage?: string;
  fieldContactMethod?: string;
  fieldContactDetail?: string;
  fieldGoal?: string;
  fieldBudget?: string;
  fieldTimeline?: string;
  fieldFinancing?: string;
  fieldNeighborhoods?: string;
  fieldHelp?: string;
  fieldHowFound?: string;
};

const defaultLabels: Required<StrategyFormLabels> = {
  headline: "Request Your Manhattan Strategy",
  subhead:
    "Tell us about your situation. We'll review your goals and recommend the most appropriate next step.",
  specialistPromise:
    "After you submit, a specialist who speaks your language will get in touch to review your goals and recommend the right next step - the beginning of a consultation, not an automated sales pitch.",
  submitLabel: ENGLISH_UI.submitLabel,
  formEyebrow: ENGLISH_UI.formEyebrow,
  successEyebrow: ENGLISH_UI.successEyebrow,
  successTitle: ENGLISH_UI.successTitle,
  successWait: ENGLISH_UI.successWait,
  roadmapLabel: ENGLISH_UI.roadmapLabel,
  fieldFullName: ENGLISH_UI.fieldFullName,
  fieldEmail: ENGLISH_UI.fieldEmail,
  fieldCountry: ENGLISH_UI.fieldCountry,
  fieldLanguage: ENGLISH_UI.fieldLanguage,
  fieldContactMethod: ENGLISH_UI.fieldContactMethod,
  fieldContactDetail: ENGLISH_UI.fieldContactDetail,
  fieldGoal: ENGLISH_UI.fieldGoal,
  fieldBudget: ENGLISH_UI.fieldBudget,
  fieldTimeline: ENGLISH_UI.fieldTimeline,
  fieldFinancing: ENGLISH_UI.fieldFinancing,
  fieldNeighborhoods: ENGLISH_UI.fieldNeighborhoods,
  fieldHelp: ENGLISH_UI.fieldHelp,
  fieldHowFound: ENGLISH_UI.fieldHowFound,
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
        <p className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">
          {copy.successEyebrow}
        </p>
        <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.4rem)] leading-[0.96] text-brand-navy">
          {copy.successTitle}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-brand-graphite">
          {copy.specialistPromise}
        </p>
        <p className="mt-4 text-sm leading-7 text-brand-graphite/80">{copy.successWait}</p>
        <p className="mt-4 text-sm leading-7 text-brand-graphite/80">
          <a href="/belonging" className="underline underline-offset-4">
            Belonging Assessment
          </a>
          {" · "}
          <a href="/situations/foreign-buyers-new-york" className="underline underline-offset-4">
            International Buyer Decision Brief
          </a>
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-brand-border bg-brand-ivory px-4 py-3 text-sm text-brand-navy outline-none focus:border-brand-navy";
  const label = "mb-2 block text-[11px] uppercase tracking-[0.14em] text-brand-cocoa";

  return (
    <form onSubmit={onSubmit} className="border border-brand-border bg-white p-8 sm:p-10">
      <p className="text-[10px] uppercase tracking-[0.24em] text-brand-brass">{copy.formEyebrow}</p>
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
            {copy.fieldFullName}
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
            {copy.fieldEmail}
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
            {copy.fieldCountry}
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
            {copy.fieldLanguage}
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
            {copy.fieldContactMethod}
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
            {copy.fieldContactDetail}
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
            {copy.fieldGoal}
          </label>
          <select
            id="buyingGoal"
            required
            className={field}
            value={form.buyingGoal}
            onChange={(e) => setForm({ ...form, buyingGoal: e.target.value })}
          >
            <option value=""> - </option>
            {BUYING_GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="budget">
            {copy.fieldBudget}
          </label>
          <select
            id="budget"
            required
            className={field}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            <option value=""> - </option>
            {BUDGET_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="timeline">
            {copy.fieldTimeline}
          </label>
          <select
            id="timeline"
            required
            className={field}
            value={form.timeline}
            onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          >
            <option value=""> - </option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="financing">
            {copy.fieldFinancing}
          </label>
          <select
            id="financing"
            required
            className={field}
            value={form.financing}
            onChange={(e) => setForm({ ...form, financing: e.target.value })}
          >
            <option value=""> - </option>
            {FINANCING_OPTIONS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <p className={label}>{copy.fieldNeighborhoods}</p>
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
          {copy.fieldHelp}
        </label>
        <textarea
          id="helpUnderstanding"
          rows={4}
          className={field}
          value={form.helpUnderstanding}
          onChange={(e) => setForm({ ...form, helpUnderstanding: e.target.value })}
        />
      </div>

      <div className="mt-8">
        <label className={label} htmlFor="howFound">
          {copy.fieldHowFound}
        </label>
        <input
          id="howFound"
          className={field}
          value={form.howFound}
          onChange={(e) => setForm({ ...form, howFound: e.target.value })}
        />
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 border border-brand-border bg-brand-ivory p-4">
        <input
          type="checkbox"
          className="mt-1"
          checked={wantRoadmap}
          onChange={(e) => setWantRoadmap(e.target.checked)}
        />
        <span className="block text-sm font-medium text-brand-navy">{copy.roadmapLabel}</span>
      </label>

      {(error || status === "error") && (
        <p className="mt-4 text-sm text-red-700">{error || "Please try again."}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 bg-brand-navy px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory disabled:opacity-60"
      >
        {status === "loading" ? "…" : copy.submitLabel}
      </button>
    </form>
  );
}
