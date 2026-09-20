import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { Link } from "wouter";
import {
  CONTACT_NEXT_STEPS,
  PUBLIC_PRODUCTS,
  resolvePublicIntent,
  resolveShelvedIntent,
  type PublicProductId,
} from "@/data/public-menu";
import { openDecisionAssistant } from "@/lib/decision-assistant";

const decisionTypes = [
  "Buy",
  "Sell",
  "Rent",
  "Wait / stay put",
  "Renew lease",
  "Renovate",
  "Refinance",
  "Rent current home",
  PUBLIC_PRODUCTS.situation.label,
  "Not sure yet",
];

const timelines = ["Now / 30 days", "1-3 months", "3-6 months", "6+ months", "Just exploring"];
const budgetRanges = [
  "Exploring / not ready",
  "Under $1M",
  "$1M-$2M",
  "$2M-$5M",
  "$5M+",
  "Rental",
  "Not sure / private",
];

function routingNote(budgetRange: string) {
  if (budgetRange.includes("$5M+")) return "This lane is reviewed by Raphi.";
  if (budgetRange === "Exploring / not ready" || budgetRange === "Not sure / private") {
    return "Exploring stays with the Guidance Advisor and Decision Hub until a next step is clear.";
  }
  if (budgetRange) return "Ready buyers under $5M may be introduced to Diego Micheo at Douglas Elliman.";
  return "";
}
const nextSteps = [...CONTACT_NEXT_STEPS, "Not sure"] as const;

const intakeCopy: Record<
  PublicProductId | "strategy" | "default",
  { title: string; eyebrow: string; description: string; nextStep: string; decisionType?: string }
> = {
  default: {
    title: "Tell us the next step.",
    eyebrow: "Begin",
    description:
      "Share what is changing and which public step you want: Guidance, Situation Assessment, Property Assessment, or a Livability Score.",
    nextStep: "",
  },
  guidance: {
    title: "Continue with Guidance.",
    eyebrow: PUBLIC_PRODUCTS.guidance.advisor,
    description: PUBLIC_PRODUCTS.guidance.text,
    nextStep: PUBLIC_PRODUCTS.guidance.label,
  },
  situation: {
    title: "Request your Situation Assessment.",
    eyebrow: PUBLIC_PRODUCTS.situation.label,
    description:
      "Share enough context to prepare a life diagnostic: what changed, what feels off about where you live, and what a good five-year outcome looks like.",
    nextStep: PUBLIC_PRODUCTS.situation.label,
    decisionType: PUBLIC_PRODUCTS.situation.label,
  },
  property: {
    title: "Request a Property Assessment.",
    eyebrow: PUBLIC_PRODUCTS.property.label,
    description: PUBLIC_PRODUCTS.property.text,
    nextStep: PUBLIC_PRODUCTS.property.label,
  },
  livability: {
    title: "Request a Livability Score.",
    eyebrow: `${PUBLIC_PRODUCTS.livability.label} · Tools`,
    description: PUBLIC_PRODUCTS.livability.text,
    nextStep: PUBLIC_PRODUCTS.livability.label,
  },
  strategy: {
    title: "Tell us the next step.",
    eyebrow: "Begin",
    description:
      "Share what is changing and which public step you want: Guidance, Situation Assessment, Property Assessment, or a Livability Score.",
    nextStep: "",
  },
};

function readIntent() {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("intent");
  return resolvePublicIntent(raw) ?? resolveShelvedIntent(raw);
}

export default function Contact() {
  const [intent, setIntent] = useState<PublicProductId | "strategy" | null>(null);
  const copy = intakeCopy[intent ?? "default"];
  const isSituation = intent === "situation";

  useEffect(() => {
    setIntent(readIntent());
  }, []);

  usePageMetadata({
    title: copy.title.replace(/\.$/, ""),
    description: copy.description,
    path: "/contact",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatChanged: "",
    decisionType: "",
    timeline: "",
    budgetRange: "",
    nextStep: "",
    message: "",
  });

  useEffect(() => {
    if (!intent) return;
    setFormData((current) => ({
      ...current,
      decisionType: current.decisionType || copy.decisionType || current.decisionType,
      nextStep: current.nextStep || copy.nextStep,
    }));
  }, [intent, copy.decisionType, copy.nextStep]);

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const structuredMessage = [
        "Advisory Intake Profile",
        `What changed: ${data.whatChanged}`,
        `Decision type: ${data.decisionType}`,
        `Timeline: ${data.timeline}`,
        `Budget / readiness: ${data.budgetRange}`,
        `Routing: ${routingNote(data.budgetRange) || "Unspecified"}`,
        `What the call is for: ${data.nextStep}`,
        "",
        "Additional context:",
        data.message || "No additional context provided.",
      ].join("\n");

      return await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        message: structuredMessage,
        timeline: data.timeline,
        budgetRange: data.budgetRange,
      });
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We will be in touch shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        whatChanged: "",
        decisionType: "",
        timeline: "",
        budgetRange: "",
        nextStep: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        art="contact"
        kicker={
          <div className="space-y-2">
            <button
              type="button"
              onClick={openDecisionAssistant}
              className="block text-left text-sm text-brand-ivory/90 underline decoration-brand-brass/50 underline-offset-4 hover:text-brand-brass"
            >
              Prefer Guidance? Open the Guidance Advisor →
            </button>
            <Link href="/belonging" className="block text-sm text-brand-ivory/90 underline decoration-brand-brass/50 underline-offset-4 hover:text-brand-brass">
              Prefer the Situation Assessment? Request a Situation Assessment →
            </Link>
            <Link href="/advisory" className="block text-sm text-brand-ivory/90 underline decoration-brand-brass/50 underline-offset-4 hover:text-brand-brass">
              See how Residential Advisory works. Memberships follow by invitation →
            </Link>
          </div>
        }
      />

      <PageSection className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHeading
            eyebrow={isSituation ? "Intake" : "Reach Out"}
            title={
              isSituation
                ? "Tell us what belonging would feel like."
                : "Use the request form when there is enough context to respond well."
            }
            description={
              isSituation
                ? "A few filters keep the first profile useful: what changed, what drains you, timing, and what a useful next step would be."
                : "A few filters keep the first reply useful: what changed, what decision is on the table, timing, budget or readiness, and the best next step."
            }
          />
          <div className="mt-8 grid gap-4">
            <a href="#request-call" className="border border-brand-border bg-white p-6">
              <div className="inline-flex items-center gap-3 text-brand-navy">
                <Mail className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.16em]">
                  {isSituation ? "Send Assessment Intake" : "Send the next step"}
                </span>
              </div>
            </a>
            <div className="border border-brand-border bg-white p-6">
              <div className="inline-flex items-center gap-3 text-brand-navy">
                <MapPin className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.16em]">New York, New York</span>
              </div>
            </div>
          </div>
        </div>

        <div id="request-call" className="border border-brand-border bg-white p-8 lg:p-10">
          <h2 className={grammar.section}>
            {isSituation ? "Assessment Intake" : copy.eyebrow}
          </h2>
          <p className="mt-3 text-sm leading-7 text-brand-graphite">
            {isSituation
              ? "This isn’t a quiz. It’s the context we need to assess your situation properly."
              : "Answer the minimum filters so the reply can include a useful recommendation, not just a scheduling link."}
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-11"
                  data-testid="input-contact-name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11"
                  data-testid="input-contact-email"
                />
              </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone <span className="text-brand-graphite/55">(optional)</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11"
                  data-testid="input-contact-phone"
                />
              </div>

              <div>
                <label htmlFor="whatChanged" className="mb-2 block text-sm font-medium">
                  What changed?
                </label>
                <Input
                  id="whatChanged"
                  name="whatChanged"
                  type="text"
                  value={formData.whatChanged}
                  onChange={(e) => setFormData({ ...formData, whatChanged: e.target.value })}
                  placeholder="New job, more space, lease ending, selling question, not sure..."
                  required
                  className="h-11"
                  data-testid="input-contact-what-changed"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="decisionType" className="mb-2 block text-sm font-medium">
                    Decision on the table
                  </label>
                  <select
                    id="decisionType"
                    name="decisionType"
                    value={formData.decisionType}
                    onChange={(e) => setFormData({ ...formData, decisionType: e.target.value })}
                    required
                    className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
                    data-testid="select-contact-decision-type"
                  >
                    <option value="">Choose one</option>
                    {decisionTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="mb-2 block text-sm font-medium">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    required
                    className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
                    data-testid="select-contact-timeline"
                  >
                    <option value="">Choose one</option>
                    {timelines.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="budgetRange" className="mb-2 block text-sm font-medium">
                    Budget lane
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    required
                    className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
                    data-testid="select-contact-budget"
                  >
                    <option value="">Choose one</option>
                    {budgetRanges.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  {formData.budgetRange ? (
                    <p className="mt-2 text-xs leading-5 text-brand-graphite/80">{routingNote(formData.budgetRange)}</p>
                  ) : (
                    <p className="mt-2 text-xs leading-5 text-brand-graphite/70">
                      $5M+ is reviewed by Raphi. Ready under $5M may go to Diego Micheo at Douglas Elliman. Exploring stays in chat and the Decision Hub.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="nextStep" className="mb-2 block text-sm font-medium">
                    What you want next
                  </label>
                  <select
                    id="nextStep"
                    name="nextStep"
                    value={formData.nextStep}
                    onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                    required
                    className="h-11 w-full border border-brand-border bg-white px-3 text-sm text-brand-navy outline-none focus:border-brand-brass"
                    data-testid="select-contact-next-step"
                  >
                    <option value="">Choose one</option>
                    {nextSteps.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Anything else I should know?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Neighborhoods, buildings, household needs, sale pressure, commute, privacy, or risk concerns."
                  rows={4}
                  className="resize-none"
                  data-testid="textarea-contact-message"
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                className="ak-call-button w-full"
                data-testid="button-contact-submit"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : isSituation ? "Send Assessment Intake" : "Send the next step"}
              </Button>
            </form>
        </div>
      </PageSection>
    </main>
  );
}
