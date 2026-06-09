import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, Lock, CheckCircle, Phone, Calculator } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function ReverseBuyerOrigination() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedYear, setSelectedYear] = useState(5);
  const [purchasePrice, setPurchasePrice] = useState(1);
  const { toast } = useToast();

  const calculateSavings = (years: number, priceInMillions: number) => {
    const commissionSavings = priceInMillions * 1000000 * 0.015;
    const monthlySavingsPerMillion = 533;
    const totalMonthlyPayments = years * 12;
    const aprSavings = monthlySavingsPerMillion * priceInMillions * totalMonthlyPayments;
    return Math.round(commissionSavings + aprSavings);
  };

  const createProfileMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await fetch("/api/rbo/profile", {
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
        title: "Profile Created",
        description: "Your savings estimate arrives within 24 hours.",
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

  const scenarios = [
    { tag: "Traditional", apr: "~7.25%", commission: "2.5%", highlight: false },
    { tag: "Optimized", apr: "6.75–7.0%", commission: "1.5–2.0%", highlight: false },
    { tag: "Agent Kammer", apr: "6.10–6.40%", commission: "~1%", highlight: true },
  ];

  const steps = [
    { number: 1, title: "Buyer Profile", description: "Price range, down payment, credit band, target areas. No hard pulls." },
    { number: 2, title: "Lenders Compete", description: "APR bands, payments, credits, and closing costs — side by side." },
    { number: 3, title: "Fee Models Compared", description: "Advisory and transaction fee structures compared across traditional and lean models." },
    { number: 4, title: "One Summary", description: "A single RBO report with recommended path and next actions." },
  ];

  const deliverables = [
    "APR and closing-cost comparison",
    "Advisory fee structure with net impact",
    "Five-year cost delta vs traditional route",
    "Recommended execution path",
  ];

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.78)_45%,rgba(15,23,42,0.5)_100%)]" />
        <div className="relative mx-auto grid min-h-[580px] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:px-10">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">Buy</p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] md:text-7xl">Reverse Buyer Origination™</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-ivory/82">
              Strategy before search. Structure before offers.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-8 flex max-w-md gap-2" data-testid="form-rbo-hero">
                <div className="flex flex-1 items-center rounded-md border border-brand-ivory/25 bg-brand-ivory/8 px-3">
                  <Phone className="mr-2 h-4 w-4 text-brand-ivory/60" />
                  <Input
                    type="tel"
                    id="rbo-hero-phone"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-0 bg-transparent text-brand-ivory placeholder:text-brand-ivory/45 focus-visible:ring-0"
                    data-testid="input-rbo-phone"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="brand"
                  disabled={createProfileMutation.isPending}
                  data-testid="button-rbo-submit"
                >
                  {createProfileMutation.isPending ? "Creating..." : "Get estimate"}
                </Button>
              </form>
            ) : (
              <div className="mt-8 flex items-center gap-2 text-emerald-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Estimate on its way within 24 hours.</span>
              </div>
            )}
          </div>

          <Card className="border border-brand-ivory/14 bg-brand-midnight/70 p-6">
            <p className="mb-2 text-sm text-brand-ivory/70">{selectedYear}-year advantage</p>
            <div className="mb-4 flex items-end gap-3">
              <p className="font-serif text-5xl text-brand-champagne">${calculateSavings(selectedYear, purchasePrice).toLocaleString()}</p>
              <span className="pb-2 text-sm text-brand-ivory/70">${purchasePrice}M purchase</span>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              {[5, 10, 15, 30].map((year) => (
                <Button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  size="sm"
                  className={`h-8 rounded-brand px-3 text-xs ${
                    selectedYear === year
                      ? "border border-brand-champagne bg-brand-champagne text-black"
                      : "bg-brand-ivory/10 text-brand-ivory/80 hover:bg-brand-ivory/20"
                  }`}
                  data-testid={`button-savings-${year}year`}
                >
                  {year}yr
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.tag}
                  className={`rounded border px-3 py-2 ${
                    scenario.highlight
                      ? "border-brand-champagne/60 bg-brand-champagne/12"
                      : "border-brand-ivory/15 bg-brand-ivory/6"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-wide ${scenario.highlight ? "text-brand-ivory" : "text-brand-ivory/60"}`}>
                    {scenario.tag}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-ivory/72">
                    APR {scenario.apr} · Fee {scenario.commission}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">How It Works</p>
          <h2 className="font-serif text-4xl font-semibold text-brand-midnight">Reverse the Flow</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} className="border border-brand-graphite/12 bg-white p-5" data-testid={`card-rbo-step-${step.number}`}>
                <p className="font-mono text-xs text-brand-sapphire">{step.number}</p>
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
              <h2 className="font-serif text-3xl font-semibold">Your RBO Packet</h2>
              <ul className="mt-6 space-y-3">
                {deliverables.map((item) => (
                  <li key={item} className="text-sm leading-6 text-brand-ivory/80">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <Card className="border border-brand-ivory/15 bg-brand-midnight p-5">
                <Lock className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-semibold text-brand-ivory">Single Profile</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Share inputs once. No repeating across parties.</p>
              </Card>
              <Card className="border border-brand-ivory/15 bg-brand-midnight p-5">
                <TrendingUp className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-semibold text-brand-ivory">Competing Offers</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Lender and advisory fee structures compared with clear math.</p>
              </Card>
              <Card className="border border-brand-ivory/15 bg-brand-midnight p-5">
                <Calculator className="mb-2 h-5 w-5 text-brand-champagne" />
                <h3 className="font-semibold text-brand-ivory">Net Outcome</h3>
                <p className="mt-1 text-sm text-brand-ivory/72">Total five-year impact — not just headline APR.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-midnight">Start With Your Number</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-brand-graphite/72">
            Comparative estimate. Outcomes vary by credit, lender, and timing.
          </p>
          {!submitted && (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2" data-testid="form-rbo-cta">
              <Input
                type="tel"
                placeholder="Mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11"
                data-testid="input-rbo-phone-cta"
                required
              />
              <Button
                type="submit"
                variant="brand"
                disabled={createProfileMutation.isPending}
                data-testid="button-rbo-cta-submit"
              >
                {createProfileMutation.isPending ? "Creating..." : "Get estimate"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
