import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, DollarSign, Lock, TrendingUp, Zap } from "lucide-react";

export default function ReverseSellerOrigination() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const createProfileMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await fetch("/api/rso/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      if (!response.ok) throw new Error("Failed to create profile");
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setPhone("");
      toast({
        title: "Seller Profile Created",
        description: "Your diagnostic arrives within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) createProfileMutation.mutate(phone);
  };

  const steps = [
    { title: "Diagnostic", description: "Net proceeds, timeline, and cost assumptions before listing." },
    { title: "Fee Comparison", description: "Listing models with clear net impact." },
    { title: "Quiet Testing", description: "Private buyer feedback before broad exposure." },
    { title: "Execution", description: "One recommendation matched to your timeline." },
  ];

  const deliverables = [
    "Net-sheet with pricing and timing scenarios",
    "Listing fee options with tradeoffs",
    "Pre-market demand from private channels",
    "Go-to-market plan and milestone timeline",
  ];

  const benefits = [
    { icon: DollarSign, title: "Maximize Net", description: "Scored by net outcome, not pitch quality." },
    { icon: Zap, title: "Control Timeline", description: "Fast, balanced, and max-net paths mapped up front." },
    { icon: Lock, title: "Protect Privacy", description: "Test demand without full public exposure." },
    { icon: TrendingUp, title: "Market Signals", description: "Pricing tied to demand velocity and comps." },
  ];

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.78)_45%,rgba(15,23,42,0.5)_100%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center lg:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Sell</p>
          <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-7xl">Reverse Seller Architecture™</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-ivory/82">
            Positioning, pricing, and buyer competition before exposure.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-2">
            <Input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={createProfileMutation.isPending || submitted}
              className="h-12 border-brand-ivory/20 bg-brand-ivory/10 text-brand-ivory placeholder:text-brand-ivory/55"
              data-testid="input-rso-phone"
            />
            <Button
              type="submit"
              disabled={createProfileMutation.isPending || submitted}
              variant="brand"
              data-testid="button-rso-submit"
            >
              {createProfileMutation.isPending ? "Sending..." : "Get Diagnostic"}
            </Button>
          </form>
          {submitted && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-brand-ivory/80">
              <CheckCircle className="h-4 w-4" /> Diagnostic request received.
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">How It Works</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Diagnose First</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <Card key={step.title} className="border border-brand-graphite/12 bg-white p-5">
                <p className="font-mono text-xs text-brand-sapphire">{idx + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-brand-midnight">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/72">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Deliverables</p>
              <h2 className="font-serif text-3xl font-semibold">Your Seller Packet</h2>
              <ul className="mt-6 space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="text-sm leading-6 text-brand-ivory/80">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border border-brand-ivory/14 bg-brand-midnight p-5">
                    <Icon className="mb-2 h-5 w-5 text-brand-champagne" />
                    <h3 className="font-semibold text-brand-champagne">{item.title}</h3>
                    <p className="mt-1 text-sm text-brand-ivory/72">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
