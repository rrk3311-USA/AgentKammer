import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, DollarSign, Lock, Zap, CheckCircle, Phone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ReverseBuyerOrigination() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedYear, setSelectedYear] = useState(5);
  const [purchasePrice, setPurchasePrice] = useState(1);
  const { toast } = useToast();

  // Calculate savings based on selected year and purchase price
  const calculateSavings = (years: number, priceInMillions: number) => {
    const baseSavingsPerMillion = 42800; // 5-year baseline per $1M
    const multipliers: { [key: number]: number } = {
      5: 1,
      10: 2,
      15: 3,
      30: 6,
    };
    return Math.round(baseSavingsPerMillion * (multipliers[years] || 1) * priceInMillions);
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
        description: "We'll analyze lender & broker options and send your savings estimate within 24 hours.",
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

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      createProfileMutation.mutate(phone);
    }
  };

  const scenarios = [
    {
      tag: "Scenario 1",
      title: "Highest cost — traditional route",
      apr: "~7.25%",
      commission: "2.5%",
      credits: "none",
      monthly: "~$6,814",
      note: "Paying full freight. No competition. No concierge.",
      highlight: false,
    },
    {
      tag: "Scenario 2",
      title: "Medium-high cost — some rate shopping",
      apr: "6.9–7.1%",
      commission: "2.5%",
      credits: "minimal",
      monthly: "~$6,650",
      note: "Better than nothing, but still $20k+ more over 5 years.",
      highlight: false,
    },
    {
      tag: "Scenario 3",
      title: "Moderate cost — discount broker, one lender",
      apr: "6.75–6.9%",
      commission: "~2%",
      credits: "small",
      monthly: "~$6,575",
      note: "Good progress, but still $12k–$18k more.",
      highlight: false,
    },
    {
      tag: "Scenario 4",
      title: "Low cost — 2–3 lenders + lean broker",
      apr: "6.50–6.70%",
      commission: "1.5–2%",
      credits: "$5k–$10k",
      monthly: "~$6,450",
      note: "Now saving $20k–$30k over 5 years.",
      highlight: false,
    },
    {
      tag: "Scenario 5",
      title: "Agent Kammer Reverse Buyer Origination™",
      apr: "6.10–6.40%",
      commission: "~1%",
      credits: "$5k–$20k+",
      monthly: "~$6,200",
      note: "Typical savings: $35k–$55k in 5 years with luxury concierge.",
      highlight: true,
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Luxury Buyer Profile",
      description:
        "You share your ideal price range, down payment, credit band (self-reported), monthly comfort, and target cities. No hard pulls. No pressure.",
    },
    {
      number: 2,
      title: "Lenders quietly compete",
      description:
        "We send your profile to multiple trusted lenders for APR bands, estimated payments, credits, and closing-cost ranges.",
    },
    {
      number: 3,
      title: "Brokerages quietly compete",
      description:
        "We compare traditional brands, 100% models, and boutique luxury shops for the leanest fee structure.",
    },
    {
      number: 4,
      title: "One clean summary",
      description:
        "You get a simple RBO report: APR ranges, estimated monthly payment, credits, and savings vs traditional path.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* HERO SECTION */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Copy + CTA */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
                <span className="text-sm font-semibold text-[#d4af37] tracking-wide">REVERSE BUYER ORIGINATION™</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Reverse Buyer Origination™
              </h1>
              <p className="text-lg text-white/90 mb-2 font-semibold">
                Luxury real estate concierge
              </p>
              <p className="text-base text-white/70 mb-6 leading-relaxed">
                Agent Kammer Reverse Buyer Origination™ builds your buyer profile once, then quietly shops multiple lenders and brokerages to find the smartest combination of APR, credits, and fees — before you ever write an offer.
              </p>

              {!submitted ? (
                <form onSubmit={handleHeroSubmit} className="flex gap-3 mb-6" data-testid="form-rbo-hero">
                  <div className="flex-1 flex items-center rounded-lg border border-white/20 px-3 backdrop-blur-sm" style={{ background: 'rgba(15, 32, 55, 0.8)' }}>
                    <Phone className="h-4 w-4 text-white/70 mr-2" />
                    <Input
                      type="tel"
                      id="rbo-hero-phone"
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus:outline-none"
                      data-testid="input-rbo-phone"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#d4af37] text-[#0a1628] hover:bg-[#e5bd4a] font-semibold px-6"
                    disabled={createProfileMutation.isPending}
                    data-testid="button-rbo-submit"
                  >
                    {createProfileMutation.isPending ? "Creating..." : "Get estimate"}
                    <span className="ml-2">→</span>
                  </Button>
                </form>
              ) : (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="h-5 w-5" />
                    <span>Profile created! We'll send your savings estimate within 24 hours.</span>
                  </div>
                </div>
              )}

              <p className="text-sm text-white/60 italic">
                Typical clients save <strong className="text-[#d4af37]">$35,000–$55,000</strong> in the first 5 years.*
              </p>
            </div>

            {/* Right: Hero Card */}
            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-[#d4af37]/40 p-6 backdrop-blur-lg">
              <div className="mb-6">
                <Badge className="bg-[#d4af37] text-[#0a1628] border-[#d4af37] mb-2 font-semibold">
                  Example • ${purchasePrice}M Buyer
                </Badge>
                <h3 className="text-white font-semibold text-lg">Traditional vs Reverse Buyer Origination™</h3>
              </div>

              <div className="mb-6 p-5 bg-gradient-to-r from-teal-600/40 to-emerald-600/40 rounded-lg border border-emerald-400/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-emerald-200 text-xs font-medium">Estimated {selectedYear}-year advantage</p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-200 text-xs">$</span>
                    <Input
                      type="number"
                      min="0.5"
                      max="50"
                      step="0.5"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 1)}
                      className="w-16 h-7 bg-slate-800/50 border-emerald-400/30 text-white text-xs text-center px-2"
                      data-testid="input-purchase-price"
                    />
                    <span className="text-emerald-200 text-xs">M</span>
                  </div>
                </div>
                <p className="text-6xl font-bold text-[#d4af37] mb-3 leading-tight">${calculateSavings(selectedYear, purchasePrice).toLocaleString()}</p>
                <p className="text-sm text-emerald-200/90 font-medium">From lower APR, credits & smarter broker fees.</p>
                
                <div className="mt-4 flex gap-2 flex-wrap">
                  {[5, 10, 15, 30].map((year) => (
                    <Button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      size="sm"
                      className={`text-xs font-semibold px-3 py-1 h-auto ${
                        selectedYear === year
                          ? "bg-[#d4af37] text-[#0a1628]"
                          : "bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/50"
                      }`}
                      data-testid={`button-savings-${year}year`}
                    >
                      {year}yr
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className="text-xs text-slate-300 mb-1 font-medium">Traditional path</p>
                    <p className="text-sm text-white font-semibold">7.25% APR · 2.5% buyer commission</p>
                    <p className="text-xs text-slate-300 mt-1">Single lender • Single brokerage</p>
                  </div>
                  <div className="p-3 bg-[#d4af37]/25 rounded-lg border border-[#d4af37]/50">
                    <p className="text-xs text-[#ffd977] mb-1 font-medium">With Agent Kammer</p>
                    <p className="text-sm text-white font-semibold">6.25–6.40% APR band</p>
                    <p className="text-xs text-slate-200 mt-1">Credits + lean broker structure</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>3–7 lenders quietly compared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Multiple brokerages evaluated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>You see it all in one simple view</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#d4af37] tracking-wide mb-2 uppercase">How it works</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Reverse the flow. Start with intelligence.</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Instead of picking one agent and one lender at random, we treat your purchase like private banking:
              build your profile once, then make the ecosystem compete for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <Card key={step.number} className="p-6 hover-elevate" data-testid={`card-rbo-step-${step.number}`}>
                <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#d4af37]">{step.number}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="py-12 lg:py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#d4af37] tracking-wide mb-2 uppercase">Savings scenarios</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">From "most expensive" to "most intelligent."</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Sample scenarios on a $1,000,000 purchase show how total cost shifts when you move into a modern, luxury, data-driven approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {scenarios.map((scenario, idx) => (
              <Card
                key={idx}
                className={`p-5 ${
                  scenario.highlight
                    ? "bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-transparent hover-elevate md:col-span-2 lg:col-span-2 mx-auto w-full"
                    : "bg-slate-950/90 border border-slate-800 hover-elevate"
                }`}
                style={scenario.highlight ? {
                  backgroundImage: "linear-gradient(to bottom right, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)), linear-gradient(135deg, #d4af37, #f4d76d)",
                  backgroundClip: "padding-box, border-box",
                  backgroundOrigin: "padding-box, border-box",
                  border: "2px solid transparent",
                  boxShadow: "0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.15)"
                } : undefined}
                data-testid={`card-scenario-${idx + 1}`}
              >
                <Badge className={`mb-3 ${scenario.highlight ? "bg-[#d4af37] text-[#0a1628] font-semibold" : "bg-slate-800 text-slate-100"}`}>
                  {scenario.tag}
                </Badge>
                <h3 className={`font-semibold mb-3 text-base ${scenario.highlight ? "text-[#d4af37]" : "text-white"}`}>
                  {scenario.title}
                </h3>
                <div className="space-y-2 mb-3 text-sm">
                  <div>
                    <span className={scenario.highlight ? "text-slate-300" : "text-slate-400"}>APR: </span>
                    <span className="font-semibold text-white">{scenario.apr}</span>
                  </div>
                  <div>
                    <span className={scenario.highlight ? "text-slate-300" : "text-slate-400"}>Commission: </span>
                    <span className="font-semibold text-white">{scenario.commission}</span>
                  </div>
                  <div>
                    <span className={scenario.highlight ? "text-slate-300" : "text-slate-400"}>Credits: </span>
                    <span className="font-semibold text-white">{scenario.credits}</span>
                  </div>
                  <div>
                    <span className={scenario.highlight ? "text-slate-300" : "text-slate-400"}>Monthly: </span>
                    <span className="font-semibold text-white">{scenario.monthly}</span>
                  </div>
                </div>
                <p className={`text-xs ${scenario.highlight ? "text-slate-200" : "text-slate-300"}`}>
                  {scenario.note}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#d4af37] tracking-wide mb-2 uppercase">Why it's different</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Innovative private‑banking approach applied to the real‑estate domain</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-why-profile">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Luxury Buyer Profile</h3>
              <p className="text-sm text-muted-foreground">
                Share your ideal price range, down payment, self‑reported credit band, monthly comfort and target cities. No hard credit pulls; no pressure.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-why-lenders">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lenders Quietly Compete</h3>
              <p className="text-sm text-muted-foreground">
                With your permission, we invite multiple trusted lenders to provide ranges for APR, estimated payments, potential credits and closing‑cost bands.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-why-brokerages">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Brokerages Quietly Compete</h3>
              <p className="text-sm text-muted-foreground">
                We compare traditional brands, 100%‑commission models and boutique luxury shops to find lean fee structures that best fit your numbers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Ready to reverse the process?</h2>
          <p className="text-lg text-white/70 mb-8">
            Share your mobile number and we'll analyze your options — completely free.
          </p>
          {!submitted ? (
            <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 justify-center" data-testid="form-rbo-cta">
              <div className="flex-1 max-w-xs flex items-center rounded-lg border border-white/20 px-3 backdrop-blur-sm" style={{ background: 'rgba(15, 32, 55, 0.8)' }}>
                <Phone className="h-4 w-4 text-white/70 mr-2" />
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus:outline-none"
                  data-testid="input-rbo-phone-cta"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-[#d4af37] text-[#0a1628] hover:bg-[#e5bd4a] font-semibold px-8"
                disabled={createProfileMutation.isPending}
                data-testid="button-rbo-cta-submit"
              >
                {createProfileMutation.isPending ? "Creating..." : "Get my estimate"}
              </Button>
            </form>
          ) : (
            <div className="inline-block p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle className="h-5 w-5" />
                <span>Profile created! Check your email for next steps.</span>
              </div>
            </div>
          )}
          <p className="text-xs text-white/50 mt-4">*Based on comparative market analysis. Results vary by market, profile, and timing.</p>
        </div>
      </section>
    </div>
  );
}
