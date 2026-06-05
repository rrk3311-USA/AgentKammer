import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "buying",
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
        service: "buying",
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
      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Contact</p>
          <h1 className="font-serif text-5xl font-semibold md:text-6xl">Concierge</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-brand-ivory/82">
            Serious inquiries. Clear response. Fast next steps.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Email</h3>
                  <a href="mailto:info@AgentKammer.com" className="text-sm text-brand-graphite/78 hover:text-brand-sapphire">
                    info@AgentKammer.com
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
                  <h3 className="font-semibold text-brand-midnight">Markets</h3>
                  <p className="text-sm text-brand-graphite/78">New York City · California · Nevada</p>
                </div>
              </div>
            </Card>

            <Card className="border border-brand-graphite/12 bg-white p-5">
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-champagne" />
                <div>
                  <h3 className="font-semibold text-brand-midnight">Hours</h3>
                  <p className="text-sm text-brand-graphite/78">Mon–Fri 8am–8pm · Sat–Sun 9am–6pm</p>
                  <p className="mt-1 text-xs text-brand-champagne">By appointment 24/7</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border border-brand-graphite/12 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-brand-midnight">Send a Message</h2>
            <p className="mt-2 text-sm text-brand-graphite/72">Response within 24 hours.</p>

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
                  <option value="buying">Buying</option>
                  <option value="selling">Selling</option>
                  <option value="intelligence">Intelligence / Research</option>
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
                  placeholder="What you're trying to accomplish and any constraints."
                  required
                  rows={5}
                  className="resize-none"
                  data-testid="textarea-contact-message"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-none border border-brand-champagne bg-brand-champagne font-semibold uppercase tracking-[0.1em] text-brand-midnight hover:bg-brand-champagne/90"
                data-testid="button-contact-submit"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
