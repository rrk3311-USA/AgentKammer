import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "wouter";
import { Brain, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    income: '',
    creditBand: '',
    location: '',
    goals: '',
  });

  const incomeRanges = [
    '$0 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $75,000',
    '$75,000 - $100,000',
    '$100,000 - $150,000',
    '$150,000+',
  ];

  const creditRanges = [
    'Poor (300-579)',
    'Fair (580-669)',
    'Good (670-739)',
    'Very Good (740-799)',
    'Excellent (800+)',
    'Not Sure',
  ];

  const locations = [
    'New York City',
    'California - Bay Area',
    'California - Los Angeles',
    'California - San Diego',
    'Nevada - Las Vegas',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.income || !formData.creditBand || !formData.location || !formData.goals) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to build your Agentic Profile",
        variant: "destructive",
      });
      return;
    }
    setStep('results');
  };

  if (step === 'results') {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-[#d4af37]" />
              </div>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Your Agentic Profile is Ready
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI engine is now analyzing 100+ offers across financial categories to find your best matches
            </p>
          </div>

          {/* Profile Summary */}
          <Card className="p-8 mb-8 bg-[#0f1d32] border-[#1a2a42]">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-white">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm">Annual Income</p>
                <p className="font-semibold text-white text-lg">{formData.income}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Credit Band</p>
                <p className="font-semibold text-white text-lg">{formData.creditBand}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Location</p>
                <p className="font-semibold text-white text-lg">{formData.location}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Financial Goals</p>
                <p className="font-semibold text-white text-lg">{formData.goals}</p>
              </div>
            </div>
          </Card>

          {/* Recommended Categories */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-6 text-white">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/credit-cards">
                <Card className="p-6 bg-[#0f1d32] border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer group h-full" data-testid="card-recommended-credit-cards">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Flagship Service</Badge>
                    <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] transition-all" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">Credit Cards</h3>
                  <p className="text-white/70">Compare 100+ cards matched to your income and credit profile</p>
                </Card>
              </Link>

              <Link href="/investing">
                <Card className="p-6 bg-[#0f1d32] border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer group h-full" data-testid="card-recommended-investing">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Flagship Service</Badge>
                    <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] transition-all" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">Investing</h3>
                  <p className="text-white/70">Discover brokerages and investment platforms suited to your goals</p>
                </Card>
              </Link>

              <Link href="/refinancing">
                <Card className="p-6 bg-[#0f1d32] border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer group h-full" data-testid="card-recommended-refinancing">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Flagship Service</Badge>
                    <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] transition-all" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">Refinancing Rate Watch</h3>
                  <p className="text-white/70">Get alerted to refinancing opportunities that match your situation</p>
                </Card>
              </Link>

              <Link href="/">
                <Card className="p-6 bg-[#0f1d32] border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer group h-full" data-testid="card-recommended-explore">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Explore All</Badge>
                    <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] transition-all" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-2">All Financial Categories</h3>
                  <p className="text-white/70">Browse our complete library of AI-powered financial solutions</p>
                </Card>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button
              onClick={() => setStep('form')}
              variant="outline"
              size="lg"
              className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10 h-12"
              data-testid="button-edit-profile"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-6">Build Your Profile</Badge>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Your Agentic Profile
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your financial situation. Our AI engine will analyze 100+ offers and find your best matches across all categories.
          </p>
        </div>

        {/* Form */}
        <Card className="p-8 bg-[#0f1d32] border-[#1a2a42]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Income */}
            <div className="space-y-2">
              <Label htmlFor="income" className="text-white">Annual Income</Label>
              <Select value={formData.income} onValueChange={(value) => setFormData({ ...formData, income: value })}>
                <SelectTrigger id="income" className="bg-white/5 border-white/10 text-white" data-testid="select-income">
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Credit Band */}
            <div className="space-y-2">
              <Label htmlFor="credit" className="text-white">Credit Score Range</Label>
              <Select value={formData.creditBand} onValueChange={(value) => setFormData({ ...formData, creditBand: value })}>
                <SelectTrigger id="credit" className="bg-white/5 border-white/10 text-white" data-testid="select-credit">
                  <SelectValue placeholder="Select your credit range" />
                </SelectTrigger>
                <SelectContent>
                  {creditRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Primary Location</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                <SelectTrigger id="location" className="bg-white/5 border-white/10 text-white" data-testid="select-location">
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Goals */}
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-white">Financial Goals</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Build credit, refinance mortgage, invest for retirement, get cashback rewards..."
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                rows={4}
                data-testid="textarea-goals"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
              data-testid="button-create-profile"
            >
              <Brain className="h-5 w-5 mr-2" />
              Create My Agentic Profile
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">How it works:</span> Your profile is used by our AI engine to analyze financial products and rank them based on YOUR fit, not commissions. Your information is secure and never shared.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
