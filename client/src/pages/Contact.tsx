import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, ClipboardCheck, Clock, Home, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const sellerAssessment = [
  {
    title: "Private Value Assessment",
    text: "A free first read on likely range, buyer pool, and timing before you commit to a listing process.",
    icon: Home,
  },
  {
    title: "Comparable Positioning",
    text: "Relevant building and neighborhood comps translated into pricing context, not generic estimates.",
    icon: Building2,
  },
  {
    title: "Preparation Checklist",
    text: "A concise view of what to fix, stage, disclose, or hold before exposure.",
    icon: ClipboardCheck,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "buy-sell",
    market: "",
    timeframe: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const composedMessage = [
        `Service: ${data.service}`,
        data.market ? `Market: ${data.market}` : null,
        data.timeframe ? `Timeline: ${data.timeframe}` : null,
        "",
        data.message,
      ]
        .filter(Boolean)
        .join("\n");

      return await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: composedMessage,
      });
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We'll respond within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "buy-sell",
        market: "",
        timeframe: "",
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
      <section className="relative overflow-hidden bg-brand-midnight px-6 py-20 text-brand-ivory lg:px-10 lg:py-24">
        <img
          src="/images/leasing-today-terrace.png"
          alt="Manhattan terrace overlooking the skyline at sunset"
          className="absolute inset-0 h-full w-full object-cover opacity-55 saturate-[0.88]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.98)_0%,rgba(15,23,42,0.9)_42%,rgba(15,23,42,0.68)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-champagne">Private Advisory</p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">Buy / Sell Concierge</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/82">
              Serious inquiries, confidential context, and clear next steps for Manhattan leasing, acquisition, and seller positioning.
            </p>
          </div>
          <div className="border border-brand-ivory/14 bg-brand-midnight/72 p-5 backdrop-blur-sm">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-brand-champagne">
              Complimentary Seller First Read
            </p>
            <p className="mt-3 font-serif text-2xl leading-tight text-brand-ivory">Know whether the move is worth exploring before you expose the property.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Email</h3>
                  <a href="mailto:info@agentkammer.com" className="text-sm text-brand-graphite/78 hover:text-brand-sapphire">
                    info@agentkammer.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Phone</h3>
                  <a href="tel:+12121234567" className="text-sm text-brand-graphite/78 hover:text-brand-sapphire">
                    (212) 123-4567
                  </a>
                  <p className="mt-1 text-xs text-brand-graphite/60">Active transactions and urgent timelines.</p>
                </div>
              </div>
            </Card>

            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Market Focus</h3>
                  <p className="text-sm text-brand-graphite/78">Manhattan luxury buildings, with emphasis on building fit and transaction timing.</p>
                </div>
              </div>
            </Card>

            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Discretion</h3>
                  <p className="text-sm text-brand-graphite/78">Seller, buyer, and relocation conversations are handled privately before any public exposure.</p>
                </div>
              </div>
            </Card>

            <div className="border border-brand-champagne/35 bg-[#f7f3ea] p-5">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand-champagne">For Sellers</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-brand-midnight">Free Value Assessment</h2>
              <div className="mt-5 grid gap-4">
                {sellerAssessment.map((item) => (
                  <div key={item.title} className="flex gap-3 border-t border-brand-midnight/10 pt-4 first:border-t-0 first:pt-0">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-champagne" strokeWidth={1.6} />
                    <div>
                      <p className="font-semibold text-brand-midnight">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-brand-graphite/70">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="border border-brand-graphite/12 bg-white p-8 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="font-serif text-2xl font-semibold text-brand-midnight">Request Private Guidance</h2>
            <p className="mt-2 text-sm leading-6 text-brand-graphite/72">Buy, sell, lease, or simply understand what your building may be worth before making a move.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full Name *
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
                  Email *
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
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11"
                  data-testid="input-contact-phone"
                />
              </div>

              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium">
                  Service *
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  required
                  data-testid="select-contact-service"
                >
                  <option value="buy-sell">Buy / Sell</option>
                  <option value="selling">Selling / Free Value Assessment</option>
                  <option value="buying">Buying</option>
                  <option value="building-research">Building Research</option>
                  <option value="investment">Investment</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="market" className="mb-2 block text-sm font-medium">
                    Market
                  </label>
                  <Input
                    id="market"
                    type="text"
                    value={formData.market}
                    onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                    placeholder="e.g. Manhattan"
                    className="h-11"
                    data-testid="input-contact-market"
                  />
                </div>
                <div>
                  <label htmlFor="timeframe" className="mb-2 block text-sm font-medium">
                    Timeline
                  </label>
                  <Input
                    id="timeframe"
                    type="text"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    placeholder="e.g. 60 days"
                    className="h-11"
                    data-testid="input-contact-timeframe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Context *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you are considering: buying, selling, leasing, timing, building, target value, or any constraints."
                  required
                  rows={5}
                  className="resize-none"
                  data-testid="textarea-contact-message"
                />
              </div>

              <Button
                type="submit"
                variant="brand"
                className="w-full"
                data-testid="button-contact-submit"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Request Private Guidance"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
