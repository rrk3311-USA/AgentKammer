import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const profileIncludes = [
  "Buyer Strategy Review",
  "Seller Positioning Review",
  "Building Intelligence",
  "Market Updates",
];

const nextSteps = [
  { title: "Buying", href: "/reverse-buyer-origination", text: "Reverse Buyer Origination™" },
  { title: "Selling", href: "/reverse-seller-architecture", text: "Reverse Seller Architecture™" },
  { title: "Intelligence", href: "/real-estate", text: "Market Reports & Research" },
];

export default function Profile() {
  const [step, setStep] = useState<"form" | "results">("form");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    role: "",
    budget: "",
    timeline: "",
    market: "",
    goals: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role || !formData.budget || !formData.timeline || !formData.market) {
      toast({
        title: "Please complete required fields",
        variant: "destructive",
      });
      return;
    }
    setStep("results");
  };

  if (step === "results") {
    return (
      <main className="min-h-screen bg-brand-ivory py-16 text-brand-graphite">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-brand-champagne" />
            <h1 className="font-serif text-4xl font-semibold text-brand-midnight">Private Profile Created</h1>
            <p className="mt-3 text-brand-graphite/78">
              We'll shape strategy, positioning, and intelligence around your inputs.
            </p>
          </div>

          <Card className="mt-10 border border-brand-graphite/12 bg-white p-6">
            <h2 className="font-serif text-xl font-semibold text-brand-midnight">Your Inputs</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-brand-graphite/60">Objective</dt>
                <dd className="font-medium text-brand-midnight">{formData.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-brand-graphite/60">Budget / Price</dt>
                <dd className="font-medium text-brand-midnight">{formData.budget}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-brand-graphite/60">Timeline</dt>
                <dd className="font-medium text-brand-midnight">{formData.timeline}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-brand-graphite/60">Market</dt>
                <dd className="font-medium text-brand-midnight">{formData.market}</dd>
              </div>
              {formData.goals && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-brand-graphite/60">Notes</dt>
                  <dd className="text-brand-midnight">{formData.goals}</dd>
                </div>
              )}
            </dl>
          </Card>

          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">Recommended Next</p>
            <div className="grid gap-3">
              {nextSteps.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Card className="flex items-center justify-between border border-brand-graphite/12 bg-white p-4 transition hover:border-brand-champagne/50">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-brand-sapphire">{item.title}</p>
                      <p className="font-semibold text-brand-midnight">{item.text}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-brand-sapphire" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => setStep("form")}
              variant="outline"
              className="rounded-none border-brand-midnight text-brand-midnight"
              data-testid="button-edit-profile"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-ivory py-16 text-brand-graphite">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-brand-sapphire">Private Advisory</p>
          <h1 className="font-serif text-4xl font-semibold text-brand-midnight lg:text-5xl">Start a Private Profile</h1>
          <p className="mx-auto mt-4 max-w-lg text-brand-graphite/78">
            Share the essentials once. We handle the rest.
          </p>
        </div>

        <ul className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-brand-graphite/76">
          {profileIncludes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <Card className="mt-10 border border-brand-graphite/12 bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="role">Objective *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="role" data-testid="select-role">
                  <SelectValue placeholder="Buy, sell, or research" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                  <SelectItem value="Buy & Sell">Buy & Sell</SelectItem>
                  <SelectItem value="Invest / Research">Invest / Research</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget or List Price *</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger id="budget" data-testid="select-budget">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under $1M">Under $1M</SelectItem>
                  <SelectItem value="$1M – $2M">$1M – $2M</SelectItem>
                  <SelectItem value="$2M – $5M">$2M – $5M</SelectItem>
                  <SelectItem value="$5M – $10M">$5M – $10M</SelectItem>
                  <SelectItem value="$10M+">$10M+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline *</Label>
              <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                <SelectTrigger id="timeline" data-testid="select-timeline">
                  <SelectValue placeholder="When are you deciding?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0–30 days">0–30 days</SelectItem>
                  <SelectItem value="1–3 months">1–3 months</SelectItem>
                  <SelectItem value="3–6 months">3–6 months</SelectItem>
                  <SelectItem value="6+ months">6+ months</SelectItem>
                  <SelectItem value="Exploring">Exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="market">Target Market *</Label>
              <Input
                id="market"
                placeholder="e.g. Upper East Side, Tribeca"
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                data-testid="input-market"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Additional Context</Label>
              <Textarea
                id="goals"
                placeholder="Building preferences, financing, or deal constraints."
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                rows={3}
                className="resize-none"
                data-testid="textarea-goals"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-none border border-brand-champagne bg-brand-champagne font-semibold uppercase tracking-[0.1em] text-brand-midnight hover:bg-brand-champagne/90"
              data-testid="button-create-profile"
            >
              Create Private Profile
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-brand-graphite/60">
            Confidential. Used only to shape your advisory plan.
          </p>
        </Card>
      </div>
    </main>
  );
}
