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
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        message: data.message,
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

      <PageSection className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHeading
            eyebrow="Reach Out"
            title="Use the form for buyer, relocation, report, sale, or general advisory questions."
            description="If the request already has a neighborhood, building, timing issue, or ownership question, include it in the message so the first reply can be specific."
          />
          <div className="mt-8 grid gap-4">
            <a href="mailto:info@agentkammer.com" className="rounded-card border border-brand-border bg-white p-6">
              <div className="inline-flex items-center gap-3 text-brand-navy">
                <Mail className="h-4 w-4 text-brand-brass" strokeWidth={1.5} />
                <span className="text-sm uppercase tracking-[0.16em]">Info@agentkammer.com</span>
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

        <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft lg:p-10">
          <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] text-brand-navy">Request a Call</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
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
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11"
                  data-testid="input-contact-email"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share what changed, what decision you are weighing, and the best next step you want help clarifying."
                  required
                  rows={6}
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
