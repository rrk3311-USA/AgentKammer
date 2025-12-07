import { HeroSearch } from "@/components/HeroSearch";
import { LuxuryBackground } from "@/components/LuxuryBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "wouter";
import { 
  Home, 
  TrendingUp, 
  Shield, 
  Sparkles, 
  MapPin, 
  FileText, 
  Users,
  ArrowRight,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2
} from "lucide-react";
import agentKammerWelcoming from "@assets/image_1763360901241.png";

export default function RealEstate() {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");

  const rboMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await apiRequest("POST", "/api/rbo/profile", { phone: phoneNumber });
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We'll be in touch soon to help you find your dream home.",
      });
      setPhone("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen relative pt-[33px] pb-[33px]">
      <LuxuryBackground />
      <div className="relative z-10">
        <HeroSearch />

        <section className="py-12 lg:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-[#d4af37] text-[#0a1628] mb-4">Our Signature Programs</Badge>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">
                Exclusive Real Estate Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Proprietary systems designed to give you the ultimate advantage in competitive markets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/reverse-buyer-origination">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-rbo">
                  <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Reverse Buyer Origination</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Make brokers compete for your business. Build your buyer profile once and let qualified agents come to you.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/reverse-seller-origination">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-rso">
                  <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Reverse Seller Origination</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    List smarter. Let agents compete for your listing with transparent commission structures.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/document-portal">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-document-portal">
                  <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Strategic Document Portal</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Zero-knowledge encrypted document management for competitive bidding with military-grade security.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-[#0a1628]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-4">
                Live Market Intelligence
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Real-time market data and AI-powered insights for premier luxury markets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/california-market">
                <Card className="p-6 bg-white/5 border-white/10 hover-elevate cursor-pointer" data-testid="card-california-market">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-[#d4af37]" />
                    <h3 className="font-serif text-xl font-semibold text-white">California</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    San Francisco, Los Angeles, San Diego luxury markets with live pricing and trend analysis.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    View Market Data <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/new-york-market">
                <Card className="p-6 bg-white/5 border-white/10 hover-elevate cursor-pointer" data-testid="card-nyc-market">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-6 w-6 text-[#d4af37]" />
                    <h3 className="font-serif text-xl font-semibold text-white">New York City</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Manhattan, Brooklyn, and premier NYC neighborhoods with co-op and condo insights.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    View Market Data <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/nevada-market">
                <Card className="p-6 bg-white/5 border-white/10 hover-elevate cursor-pointer" data-testid="card-nevada-market">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="h-6 w-6 text-[#d4af37]" />
                    <h3 className="font-serif text-xl font-semibold text-white">Nevada</h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">
                    Las Vegas, Reno luxury markets with investment property analytics and rental yields.
                  </p>
                  <div className="flex items-center text-[#d4af37] text-sm font-medium">
                    View Market Data <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">
                Additional Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/services/get-preapproved">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-preapproval">
                  <DollarSign className="h-8 w-8 text-[#d4af37] mb-4" />
                  <h3 className="font-semibold mb-2">Mortgage Pre-Approval</h3>
                  <p className="text-muted-foreground text-sm">Get pre-approved in minutes with competitive rates</p>
                </Card>
              </Link>

              <Link href="/services/get-home-value">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-home-value">
                  <TrendingUp className="h-8 w-8 text-[#d4af37] mb-4" />
                  <h3 className="font-semibold mb-2">Home Valuation</h3>
                  <p className="text-muted-foreground text-sm">AI-powered instant property valuations</p>
                </Card>
              </Link>

              <Link href="/broker-registration">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-broker-reg">
                  <Users className="h-8 w-8 text-[#d4af37] mb-4" />
                  <h3 className="font-semibold mb-2">Broker Registration</h3>
                  <p className="text-muted-foreground text-sm">Join our network of competing brokers</p>
                </Card>
              </Link>

              <Link href="/live-deal-map">
                <Card className="p-6 hover-elevate cursor-pointer h-full" data-testid="card-deal-map">
                  <MapPin className="h-8 w-8 text-[#d4af37] mb-4" />
                  <h3 className="font-semibold mb-2">Live Deal Map</h3>
                  <p className="text-muted-foreground text-sm">Interactive map with Deal IQ scores</p>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-12 bg-[#0a1628] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 relative inline-block">
                  <span className="relative">
                    Ready to Find Your Dream Home?
                    <div 
                      className="absolute inset-0 overflow-visible pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(244,208,63,0.3) 30%, transparent 70%)',
                        animation: 'sonarPulse 8s ease-in-out infinite',
                        mixBlendMode: 'screen',
                        filter: 'blur(1px)',
                      }}
                    />
                    <div 
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 45%, rgba(244,208,63,0.5) 50%, rgba(212,175,55,0.2) 55%, transparent 100%)',
                        animation: 'slowScan 10s ease-in-out infinite',
                        mixBlendMode: 'screen',
                      }}
                    />
                  </span>
                </h2>
                <style>{`
                  @keyframes slowScan {
                    0%, 100% { transform: translateX(-120%); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translateX(120%); opacity: 1; }
                    60% { opacity: 0; }
                  }
                  @keyframes sonarPulse {
                    0%, 100% { transform: scale(0.5); opacity: 0; }
                    25% { transform: scale(1.5); opacity: 0.6; }
                    50% { transform: scale(2.5); opacity: 0; }
                    75% { transform: scale(1.2); opacity: 0.4; }
                  }
                `}</style>
                <p className="text-lg mb-8 opacity-90">
                  Join thousands of buyers who trust Agent Kammer to find their perfect property in NYC, California, and Nevada
                </p>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (phone) {
                    rboMutation.mutate(phone);
                  }
                }} className="max-w-md mx-auto lg:mx-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your cell number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      data-testid="input-real-estate-phone"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:opacity-90"
                      data-testid="button-real-estate-submit"
                      disabled={rboMutation.isPending}
                    >
                      {rboMutation.isPending ? "Submitting..." : "Get Started"}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center bg-[#0a1628] rounded-lg overflow-hidden order-1 lg:order-2">
                <img 
                  src={agentKammerWelcoming} 
                  alt="Agent Kammer in top hat welcoming clients into luxury apartment" 
                  className="w-full h-full object-cover shadow-2xl"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
