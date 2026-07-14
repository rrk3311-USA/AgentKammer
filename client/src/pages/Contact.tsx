import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const decisionTypes = [
  "Buy",
  "Sell",
  "Rent",
  "Wait / stay put",
  "Renew lease",
  "Renovate",
  "Refinance",
  "Rent current home",
  "Not sure yet",
];

const timelines = ["Now / 30 days", "1-3 months", "3-6 months", "6+ months", "Just exploring"];
const budgetRanges = ["Under $1M", "$1M-$2M", "$2M-$4M", "$4M+", "Rental", "Not sure / private"];
const nextSteps = ["Private call", "Email recap first", "Building or neighborhood brief", "Seller strategy", "Not sure"];

export default function Contact() {
  usePageMetadata({
    title: "Contact",
    description:
      "Request a private call with Agent Kammer.",
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
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const structuredMessage = [
        "Lead Qualification Profile",
        `What changed: ${data.whatChanged}`,
        `Decision type: ${data.decisionType}`,
        `Timeline: ${data.timeline}`,
        `Budget / readiness: ${data.budgetRange}`,
        `Preferred next step: ${data.nextStep}`,
        "",
        "Additional context:",
        data.message || "No additional context provided.",
      ].join("\n");

      return await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        message: structuredMessage,
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
        eyebrow="Contact"
        title="Request a private call."
        description="Share what is changing, what decision you are weighing, and where the conversation should begin. The response should help clarify the next step before listings or showings take over."
      />

      <PageSection className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHeading
            eyebrow="Reach Out"
            title="Use the request form when there is enough context to respond well."
            description="A few filters keep the first reply useful: what changed, what decision is on the table, timing, budget or readiness, and the best next step."
          />
          <div className="mt-8 grid gap-4">
            <a href="#request-call" className="rounded-card border border-brand-border bg-white p-6">
              <div className="inline-flex items-center gap-3 text-brand-navy">
                <Mail className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.16em]">Send a Filtered Request</span>
              </div>
            </a>
            <div className="rounded-card border border-brand-border bg-white p-6">
              <div className="inline-flex items-center gap-3 text-brand-navy">
                <MapPin className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.16em]">New York, New York</span>
              </div>
            </div>
          </div>
        </div>

        <div id="request-call" className="rounded-card border border-brand-border bg-white p-8 shadow-soft lg:p-10">
          <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">Request a Call</h2>
          <p className="mt-3 text-sm leading-7 text-brand-graphite">
            Answer the minimum filters so the reply can include a useful recommendation, not just a scheduling link.
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
                    Budget / readiness
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
                </div>

                <div>
                  <label htmlFor="nextStep" className="mb-2 block text-sm font-medium">
                    Best next step
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
                {contactMutation.isPending ? "Sending..." : "Request a Call"}
              </Button>
            </form>
        </div>
      </PageSection>
    </main>
  );
}
