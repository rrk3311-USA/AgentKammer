import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, DollarSign, Lock, Zap, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ReverseBuyerOrigination() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

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
      commission: "~1–1.5%",
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
                A modern, luxury way to buy a home.
              </h1>
              <p className="text-lg text-white/90 mb-2 font-semibold">
                When lenders & brokers compete, you win.
              </p>
              <p className="text-base text-white/70 mb-6 leading-relaxed">
                Agent Kammer Reverse Buyer Origination™ builds your buyer profile once, then quietly shops multiple lenders and brokerages to find the smartest combination of APR, credits, and fees — before you ever write an offer.
              </p>

              {!submitted ? (
                <form onSubmit={handleHeroSubmit} className="flex gap-3 mb-6" data-testid="form-rbo-hero">
                  <div className="flex-1 flex items-center rounded-lg border border-white/20 px-3 backdrop-blur-sm" style={{ background: 'rgba(15, 32, 55, 0.8)' }}>
                    <span className="text-white/70 mr-2">📱</span>
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
                <Badge className="bg-[#d4af37] text-[#0a1628] border-[#d4af37] mb-2 font-semibold">Example • $1M Buyer</Badge>
                <h3 className="text-white font-semibold text-lg">Traditional vs Reverse Buyer Origination™</h3>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-teal-600/40 to-emerald-600/40 rounded-lg border border-emerald-400/50">
                <p className="text-emerald-200 text-xs mb-1 font-medium">Estimated 5-year advantage</p>
                <p className="text-4xl font-bold text-[#d4af37] mb-1">$42,800</p>
                <p className="text-xs text-emerald-200/80">From lower APR, credits & smarter broker fees.</p>
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
                    : "bg-slate-900/70 border border-slate-700/50 hover-elevate"
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
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Private banking energy. Real estate domain.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-why-neutral">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Agent & Brokerage Neutral</h3>
              <p className="text-sm text-muted-foreground">
                We're not forcing you into one lender or broker. We work with traditional brands, lean 100% models, or boutique luxury—whatever serves your numbers.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-why-multiple">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Multiple Lenders, One View</h3>
              <p className="text-sm text-muted-foreground">
                See intelligent comparison: APR ranges, payments, credits, and cash-to-close bands — all in normal language.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-why-concierge">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">White-Glove Concierge</h3>
              <p className="text-sm text-muted-foreground">
                We handle lender coordination, broker negotiations, and compliance so you stay focused on finding the perfect home.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW OUR PROCESS IS DIFFERENT */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">How Our Process is Different</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Traditional real estate puts you at a disadvantage. Our encrypted platform flips the power dynamic—brokers compete for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Step 1 */}
            <Card className="p-6 bg-slate-900/70 border border-slate-700/50 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#d4af37]">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">You</h3>
                  <p className="text-sm text-muted-foreground">Start your luxury property search with complete privacy and control</p>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-6 bg-slate-900/70 border border-slate-700/50 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#d4af37]">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Encrypted Trust Layer</h3>
                  <p className="text-sm text-muted-foreground mb-2">Your identity protected through Anonymous LLC structure</p>
                  <p className="text-xs text-slate-400">Blockchain Privacy</p>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-6 bg-slate-900/70 border border-slate-700/50 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#d4af37]">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Bidding Profile</h3>
                  <p className="text-sm text-muted-foreground mb-2">We create your leverage profile with all buying power</p>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>Cash Available: <span className="text-white">$2.5M</span></p>
                    <p>Buying Power: <span className="text-white">$8.5M</span></p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 4 */}
            <Card className="p-6 bg-slate-900/70 border border-slate-700/50 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#d4af37]">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Brokers Compete</h3>
                  <p className="text-sm text-muted-foreground mb-2">Agents submit their best funding options and compete for you</p>
                  <p className="text-xs text-slate-400">Reverse Auction</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Step 5 - Full Width */}
          <Card
            className="p-6 bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-transparent hover-elevate"
            style={{
              backgroundImage: "linear-gradient(to bottom right, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)), linear-gradient(135deg, #d4af37, #f4d76d)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "padding-box, border-box",
              border: "2px solid transparent",
              boxShadow: "0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.15)"
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#d4af37]">5</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-3 text-[#d4af37]">The Power is Yours</h3>
                <p className="text-base text-slate-200 mb-4">
                  Stop chasing brokers. Let them compete for the privilege of representing you. Your privacy protected, your leverage maximized, your options unlimited.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-slate-300 mb-1">Complete Privacy</p>
                    <p className="text-sm font-semibold text-white">Anonymous LLC</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 mb-1">Maximum Leverage</p>
                    <p className="text-sm font-semibold text-white">$2.5M–$8.5M</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 mb-1">Best Funding</p>
                    <p className="text-sm font-semibold text-white">Competitive Rates</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
                <span className="text-white/70 mr-2">📱</span>
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
