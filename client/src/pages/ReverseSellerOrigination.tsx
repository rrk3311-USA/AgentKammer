import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, DollarSign, Lock, Zap, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

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
        description: "We'll analyze listing strategies and send your seller diagnostic within 24 hours.",
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

  const steps = [
    {
      number: 1,
      title: "Pre-Listing Financial Diagnostic™",
      description: "Complete financial mapping of your sale before listing. Three net proceeds scenarios, closing cost forecasts, and price sensitivity analysis—all designed to maximize your outcome.",
      features: [
        "Three Net Proceeds Scenarios (Fast, Hybrid, Maximum Net)",
        "Closing Cost Forecast & Sale Timeline Analysis",
        "Price Sensitivity Overview (Buyer Demand Probability Bands)",
        "Upgrade vs. As-Is Optimization Table",
        "Holding Cost Considerations"
      ]
    },
    {
      number: 2,
      title: "Brokerage-Agnostic Fee Intelligence",
      description: "We compare listing fee structures on your behalf, from full-service luxury brokerages to lean models to creative commission structures—so you choose what maximizes your net, not what benefits the agent.",
      features: [
        "Full-Service Luxury Brokerage Model Analysis",
        "Lean Brokerage Model Comparison",
        "Boutique / Creative Commission Structures",
        "Concierge Model with Staging Credits",
        "Agent Kammer Flexible Listing Strategy"
      ]
    },
    {
      number: 3,
      title: "Off-Market Intelligence Layer™",
      description: "Your home surfaces quietly to financially verified buyers and agent networks before going public. Early feedback and optionality without exposure or risk.",
      features: [
        "Private 'Whisper List' Access",
        "Financially Verified Buyer Groups",
        "Relocation Networks",
        "Agent-Side Compatibility Matching (fully compliant)"
      ]
    },
    {
      number: 4,
      title: "Multi-Scenario Listing Strategy™",
      description: "Three engineered, institutional-style pathways based on your timeline and risk tolerance. Not one rigid marketing plan—your choice.",
      features: [
        "Scenario A: Fastest Exit (minimal prep, lean fee, broad exposure)",
        "Scenario B: Maximum Net (premium staging, high-detail marketing, premium pricing)",
        "Scenario C: Hybrid Optimization (selective enhancements, balanced approach)"
      ]
    },
    {
      number: 5,
      title: "Market Intelligence Report™",
      description: "Your pricing and positioning crafted using real data—not hype. A private-banking style market brief just for you.",
      features: [
        "Supply/Demand Ratio Analysis",
        "Absorption Rate & Velocity",
        "Multiple-Offer Probability Bands",
        "Price-Per-Square-Foot Trend Analysis",
        "Buyer Funnel Forecast"
      ]
    },
    {
      number: 6,
      title: "Strategic Exit Architecture™",
      description: "Your sale integrates into your overall financial trajectory. We map your next move as part of the planning process.",
      features: [
        "Move-Up Strategy Design",
        "Equity Redeployment Pathways",
        "Next-Home Pre-Qualification (no hard pull)",
        "Out-of-State Relocation Options",
        "Portfolio/Investment Mapping (if desired)"
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-32 relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0a1628] via-[#0a1628] to-[#0a1628]/80 py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4af37] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-[#d4af37] border border-[#d4af37] text-[#0a1628]" data-testid="badge-rso">
            A Private Banking Model for Home Sellers
          </Badge>
          
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Reverse Seller Architecture™
          </h1>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Traditional listing agents market homes. Agent Kammer engineers outcomes. Instead of emotional pitches, generic marketing plans, and one-size-fits-all commission structures, you get institutional-grade intelligence, transparent options, and strategic exit architecture.
          </p>

          <form onSubmit={handleHeroSubmit} className="flex gap-2 max-w-md mx-auto mb-8">
            <Input
              type="tel"
              placeholder="Your cell number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={createProfileMutation.isPending || submitted}
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              data-testid="input-rso-phone"
            />
            <Button
              type="submit"
              size="lg"
              disabled={createProfileMutation.isPending || submitted}
              className="h-12 px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:opacity-90"
              data-testid="button-rso-submit"
            >
              {createProfileMutation.isPending ? "Sending..." : "Get Diagnostic"}
            </Button>
          </form>

          {submitted && (
            <p className="text-white/80 text-sm">
              ✓ We'll send your seller diagnostic within 24 hours.
            </p>
          )}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <Card key={idx} className="p-6 lg:p-8 border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-colors" data-testid={`card-step-${step.number}`}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center">
                      <span className="font-serif text-lg font-bold text-[#0a1628]">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            Why Reverse Seller Architecture™
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex gap-4 items-start">
                <DollarSign className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-2">Maximize Net Proceeds</h4>
                  <p className="text-white/70">Transparent, data-driven scenarios show exactly how your decisions impact your bottom line.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex gap-4 items-start">
                <Zap className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-2">Control Your Timeline</h4>
                  <p className="text-white/70">Three scenarios give you full optionality—fast exit, maximum net, or balanced approach.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex gap-4 items-start">
                <Lock className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-2">Institutional-Grade Privacy</h4>
                  <p className="text-white/70">Off-market intelligence layer with whisper-list access and verified buyer networks.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex gap-4 items-start">
                <TrendingUp className="h-6 w-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-2">Leverage Back in Your Hands</h4>
                  <p className="text-white/70">Strategic exit architecture integrates your next move into the entire planning process.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
            Ready to Sell with Intelligence?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your personalized seller diagnostic and discover how much more you could net from your home sale.
          </p>
          <form onSubmit={handleHeroSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="tel"
              placeholder="Your cell number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={createProfileMutation.isPending || submitted}
              className="h-12"
              data-testid="input-rso-phone-cta"
            />
            <Button
              type="submit"
              size="lg"
              disabled={createProfileMutation.isPending || submitted}
              className="h-12 px-8"
              data-testid="button-rso-submit-cta"
            >
              {createProfileMutation.isPending ? "Sending..." : "Request Diagnostic"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
