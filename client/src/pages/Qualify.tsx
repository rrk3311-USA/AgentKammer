import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  BUDGET_LANE_LABELS,
  CALL_PURPOSE_LABELS,
  PROCESS_PDF_FOOTER,
  PROCESS_PDF_PATH,
  PROCESS_PDF_TITLE,
  PROCESS_STEPS,
  parseQualifySource,
  type QualifyBudgetLane,
  type QualifyCallPurpose,
  type QualifyRoute,
  type QualifySource,
} from "@shared/get-qualified";

type FormState = {
  name: string;
  email: string;
  phone: string;
  budgetLane: QualifyBudgetLane | "";
  callPurpose: QualifyCallPurpose | "";
  notes: string;
};

type QualifyResponse = {
  ok: boolean;
  route: QualifyRoute;
  nextStep: string;
  hubPath: string;
  calendarUrl: string | null;
  diegoUrl: string | null;
  processPdfSent: boolean;
  hubCreated: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  budgetLane: "",
  callPurpose: "",
  notes: "",
};

function readQuery() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function Qualify() {
  const source = useMemo<QualifySource>(() => parseQualifySource(readQuery().get("source")), []);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);

  usePageMetadata({
    title: "Get Qualified",
    description:
      "A couple of details so we use the call well. Get Qualified is a briefing, not a test.",
    path: "/qualify",
  });

  useEffect(() => {
    const params = readQuery();
    if (params.get("booked") === "1" && form.email) {
      void fetch("/api/qualify/session", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
    }
  }, [form.email]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.budgetLane || !form.callPurpose) {
      toast({
        title: "Two choices still needed",
        description: "Please choose a budget lane and what the call is for.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const res = await apiRequest("POST", "/api/qualify", {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        budgetLane: form.budgetLane,
        callPurpose: form.callPurpose,
        notes: form.notes || undefined,
        source,
      });
      const body = (await res.json()) as QualifyResponse;
      const params = new URLSearchParams({ from: "qualify", route: body.route });
      setLocation(`/hub?${params.toString()}`);
    } catch {
      toast({
        title: "Could not save those details",
        description: "Please try again in a moment. Nothing was rushed.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <PageHero
        eyebrow="Get Qualified"
        title="A couple of details so we use the call well."
        description="A short briefing. Not a test, and not a listing pitch."
        art="decision-framework"
      />

      <PageSection className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <SectionHeading
            eyebrow="What this is"
            title="Get Qualified is how we decide whether a live hour is useful."
          />
          <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-brand-graphite">
            <p>
              Get Qualified is a short briefing so we use a live hour well. It is not an application,
              and it is not a score.
            </p>
            <p>
              A Strategy Session is for one real decision: buy, wait, stay, or search. It is a
              conversation with a written next step — not a tour booking.
            </p>
            <p>
              Ready buyers under $5 million are warmly introduced to Diego Micheo at Douglas Elliman.
              That is the right lane for local execution, not a lesser one.
            </p>
            <p>
              If you are still forming the question, stay with Guidance and the Decision Hub. No
              calendar pressure.
            </p>
            <p className="text-sm leading-7 text-brand-graphite/75">{PROCESS_PDF_FOOTER}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-brand-border bg-white p-8 shadow-soft lg:p-10"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-cocoa">
            {source === "phone" ? "From the phone line" : "A few details"}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] text-brand-navy">
            So the next hour is useful.
          </h2>

          <div className="mt-8 grid gap-5">
            <div>
              <label htmlFor="qualify-name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="qualify-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
              />
            </div>
            <div>
              <label htmlFor="qualify-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="qualify-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
              />
            </div>
            <div>
              <label htmlFor="qualify-phone" className="mb-2 block text-sm font-medium">
                Phone <span className="text-brand-graphite/55">(optional)</span>
              </label>
              <input
                id="qualify-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
              />
            </div>
            <div>
              <label htmlFor="qualify-budget" className="mb-2 block text-sm font-medium">
                Budget lane
              </label>
              <select
                id="qualify-budget"
                required
                value={form.budgetLane}
                onChange={(e) => setForm({ ...form, budgetLane: e.target.value as QualifyBudgetLane })}
                className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
              >
                <option value="">Choose one</option>
                {(Object.keys(BUDGET_LANE_LABELS) as QualifyBudgetLane[]).map((key) => (
                  <option key={key} value={key}>
                    {BUDGET_LANE_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="qualify-purpose" className="mb-2 block text-sm font-medium">
                What the call is for
              </label>
              <select
                id="qualify-purpose"
                required
                value={form.callPurpose}
                onChange={(e) =>
                  setForm({ ...form, callPurpose: e.target.value as QualifyCallPurpose })
                }
                className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
              >
                <option value="">Choose one</option>
                {(Object.keys(CALL_PURPOSE_LABELS) as QualifyCallPurpose[]).map((key) => (
                  <option key={key} value={key}>
                    {CALL_PURPOSE_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="qualify-notes" className="mb-2 block text-sm font-medium">
                Notes <span className="text-brand-graphite/55">(optional)</span>
              </label>
              <textarea
                id="qualify-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-brand-border bg-white px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-brass"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="ak-call-button w-full bg-brand-navy px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory disabled:opacity-60"
            >
              {sending ? "Saving…" : "Continue to your plan"}
            </button>
          </div>
        </form>
      </PageSection>

      <section className="border-t border-brand-border bg-white">
        <PageSection>
          <SectionHeading
            eyebrow="How the process works"
            title={PROCESS_PDF_TITLE}
            description="Six public steps. Get Qualified is a sub-status on the path to the Strategy Session — not a seventh trophy."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {PROCESS_STEPS.map((step) => (
              <li key={step.n} className="border border-brand-border bg-brand-ivory/70 px-5 py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">
                  {String(step.n).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display text-2xl text-brand-navy">{step.title}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-brand-graphite/75">{PROCESS_PDF_FOOTER}</p>
          <a
            href={PROCESS_PDF_PATH}
            download="agent-kammer-how-the-process-works.pdf"
            className="mt-6 inline-flex border border-brand-navy px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy"
          >
            Download PDF
          </a>
          <p className="mt-8 text-sm text-brand-graphite/70">
            Prefer to keep reading first?{" "}
            <Link href="/buyer-advisory" className="underline decoration-brand-brass/50 underline-offset-4">
              Stay in Guidance
            </Link>
            .
          </p>
        </PageSection>
      </section>
    </main>
  );
}
