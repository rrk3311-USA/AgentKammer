import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CreditCard, 
  Building2, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Brain,
  Users,
  RefreshCw,
  BarChart3,
  Briefcase,
  LineChart
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";
import heroImage from '@assets/generated_images/ps5_hero_-_agent_kammer_concierge_gestures_into_luxury_apartment.png';
import conciergeImage from '@assets/generated_images/concierge_agent_top_hat_luxury_interior.png';
import conciergeGestureImage from '@assets/image_1763360901241.png';
import airportLoungeImage from '@assets/generated_images/luxury_airport_lounge.png';
import dinningImage from '@assets/generated_images/fine_dining_experience.png';
import travelImage from '@assets/generated_images/luxury_travel_destination.png';

const ICON_WRAPPER_STYLE = {
  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
};

const GOLD_ICON_STYLE = {
  color: '#d4af37',
  filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))'
};

const GOLD_NUMBER_STYLE = {
  background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)'
};

const CTA_BUTTON_CLASS = "px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* SECTION 1: Hero - Dark Navy - Stacked Layout */}
      <section className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628] py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Text Content - Centered Above */}
          <div className="text-center mb-10">
            <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-6 inline-flex" data-testid="badge-hero">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Agentic AI
            </Badge>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Your AI Agent for Better{" "}
              <span className="text-[#d4af37]">Financial Outcomes</span>
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              One profile. Our Agentic Comparison Engine uses LLMs + compute to analyze offers and force banks, lenders, and financial products to{" "}
              <span className="text-[#d4af37] font-semibold">compete for you</span>.
            </p>
          </div>

          {/* AI Brain Visual - Large and Centered */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-2xl">
              <AgenticEngineVisual />
            </div>
          </div>

          {/* CTA Button - Below Brain Visual */}
          <div className="text-center">
            <Link href="/profile">
              <Button size="lg" className={CTA_BUTTON_CLASS} data-testid="button-hero-cta">
                <Brain className="h-5 w-5 mr-2" />
                Build Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

      {/* SECTION 2: Flagship Services - Comparison Card Layout */}
      <section id="categories" className="relative py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-teal-800/80 to-emerald-700/80">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-white/90 text-sm font-semibold mb-3">Flagship Services</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2">
              Choose Your Category
            </h2>
            <p className="text-white/70 text-base">
              AI-ranked products matched to your profile
            </p>
          </div>

          {/* Main Comparison Card */}
          <Card className="bg-gradient-to-br from-yellow-600/40 to-amber-700/40 border-yellow-500/50 p-6 backdrop-blur-lg">
            {/* Grid Cards for the 3 main categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {[
                { id: 'credit-cards', name: 'Credit Cards', icon: CreditCard, desc: 'AI-matched cards for your goals' },
                { id: 'investing', name: 'Investing', icon: TrendingUp, desc: 'Brokerages & robo-advisors' },
                { id: 'reverse-buyer-origination', name: 'Real Estate', icon: Building2, desc: 'Premium concierge services' }
              ].map((cat) => (
                <Link key={cat.id} href={`/${cat.id}`}>
                  <Card 
                    className="p-3 bg-slate-800/50 border-slate-700 hover:border-[#d4af37]/50 transition-all cursor-pointer h-full group"
                    data-testid={`card-category-${cat.id}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                        <cat.icon className="h-4 w-4" style={GOLD_ICON_STYLE} />
                      </div>
                      <ArrowRight className="h-3 w-3 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="font-serif text-xs font-semibold text-white mb-0.5">{cat.name}</h3>
                    <p className="text-white/60 text-xs">{cat.desc}</p>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Bottom Benefits */}
            <div className="space-y-2 border-t border-yellow-500/30 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                <span className="text-white/80 text-xs">100+ AI-analyzed products across all categories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                <span className="text-white/80 text-xs">Personalized ranking based on your Agentic Profile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                <span className="text-white/80 text-xs">One-click routing to your best matches</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

      {/* SECTION 3: Real Estate Concierge - Image Background */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${conciergeImage})` }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <Building2 className="h-7 w-7" style={GOLD_ICON_STYLE} />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3 text-white">
              Real Estate Concierge
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Premium home buying, selling, and mortgage intelligence worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Building2, title: 'Reverse Buyer Origination', desc: 'Sellers compete to win your business with better terms and faster closing.', link: '/reverse-buyer-origination', testId: 'button-rbo' },
              { icon: Users, title: 'Reverse Seller Architecture', desc: 'Multiple qualified buyer agents compete, driving up demand for your home.', link: '/reverse-seller-architecture', testId: 'button-rsa' },
              { icon: RefreshCw, title: 'Refinancing Rate Watch', desc: 'AI-powered monitoring alerts you when rates drop with exact savings.', link: '/refinancing', testId: 'button-rrw' }
            ].map((service) => (
              <Card key={service.title} className="p-5 bg-white/5 border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <service.icon className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="font-serif text-lg font-semibold text-white">{service.title}</h3>
                </div>
                <p className="text-white/70 text-sm mb-4">{service.desc}</p>
                <Link href={service.link}>
                  <Button size="sm" className="bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90" data-testid={service.testId}>
                    Learn More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Investment Accounts - Light Background */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <TrendingUp className="h-7 w-7" style={GOLD_ICON_STYLE} />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              Investment Accounts
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Compare brokerages, robo-advisors, and investment platforms matched to your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {[
              { icon: BarChart3, title: 'Brokerages', desc: 'Full-service and discount brokers for active traders' },
              { icon: Briefcase, title: 'Robo-Advisors', desc: 'Automated investing with low fees and smart rebalancing' },
              { icon: LineChart, title: 'Crypto Platforms', desc: 'Digital asset trading and DeFi opportunities' }
            ].map((item) => (
              <Card key={item.title} className="p-5 border-border">
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/investing">
              <Button size="lg" className={CTA_BUTTON_CLASS} data-testid="button-investment-accounts">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Investment Accounts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Credit Cards Comparison - Dark Navy */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <CreditCard className="h-7 w-7" style={GOLD_ICON_STYLE} />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">
              Compare 100+ Credit Cards
            </h2>
            <p className="text-[#d4af37] text-xl font-semibold mb-2">Not Just the Usual 12</p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our AI analyzes 100+ options including fintech, crypto, and startup cards that legacy sites don't show.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <img 
              src={airportLoungeImage} 
              alt="Luxury airport lounge"
              className="w-full h-36 object-cover rounded-lg border border-[#d4af37]/30"
              data-testid="img-airport-lounge"
            />
            <img 
              src={dinningImage} 
              alt="Fine dining experience"
              className="w-full h-36 object-cover rounded-lg border border-[#d4af37]/30"
              data-testid="img-dining"
            />
            <img 
              src={travelImage} 
              alt="Luxury travel destination"
              className="w-full h-36 object-cover rounded-lg border border-[#d4af37]/30"
              data-testid="img-travel"
            />
          </div>
          <p className="text-center text-white/50 text-sm mb-8">Airport lounges • Fine dining • Luxury travel</p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full max-w-5xl mx-auto text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-3 text-white/80 font-semibold">Feature</th>
                  <th className="text-center py-3 px-3 text-white/60">NerdWallet</th>
                  <th className="text-center py-3 px-3 text-white/60">Bankrate</th>
                  <th 
                    className="text-center py-3 px-3 text-[#d4af37] font-semibold"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.08)',
                      boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.15)'
                    }}
                  >
                    Agent Kammer
                  </th>
                  <th className="text-center py-3 px-3 text-white/60">Credit Karma</th>
                  <th className="text-center py-3 px-3 text-white/60">Chase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Total Cards', nw: '12–20', br: '10–25', ak: '100+', ck: '8–15', ch: '25–40' },
                  { feature: 'Fintech Cards', nw: 'No', br: 'No', ak: 'Yes', ck: 'Limited', ch: 'No' },
                  { feature: 'Crypto Cards', nw: 'No', br: 'No', ak: 'Yes', ck: 'No', ch: 'Limited' },
                  { feature: 'AI Matching', nw: 'No', br: 'No', ak: 'Yes', ck: 'No', ch: 'No' },
                  { feature: 'Independent Ranking', nw: 'No', br: 'No', ak: 'Yes', ck: 'Partial', ch: 'No' }
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white">{row.feature}</td>
                    <td className="py-3 px-3 text-center text-white/60">{row.nw}</td>
                    <td className="py-3 px-3 text-center text-white/60">{row.br}</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)' }}>{row.ak}</td>
                    <td className="py-3 px-3 text-center text-white/60">{row.ck}</td>
                    <td className="py-3 px-3 text-center text-white/60">{row.ch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <Link href="/credit-cards">
              <Button size="lg" className={CTA_BUTTON_CLASS} data-testid="button-compare-cards">
                <CreditCard className="h-5 w-5 mr-2" />
                Compare Credit Cards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: The Agentic Advantage - Light Background */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              The Agentic Advantage
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to unlock personalized financial recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Build Your Profile', desc: 'Income, credit band, location, goals - one time. Your profile powers all recommendations.' },
              { num: '2', title: 'AI Analyzes the Field', desc: 'We screen hundreds of partner offers across categories, ranking them by your fit.' },
              { num: '3', title: 'You Choose - We Route', desc: 'Go straight to the best matched lender, card, or tool. No guesswork.' }
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center" data-testid={`card-step-${step.num}`}>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl font-bold text-[#0a1628] font-serif"
                  style={GOLD_NUMBER_STYLE}
                >
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA - Dark Navy */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Build your Agentic Profile and unlock personalized recommendations across all categories
          </p>
          
          <Link href="/profile">
            <Button 
              size="lg"
              className={`${CTA_BUTTON_CLASS} animate-button-pulse-glow`}
              data-testid="button-dashboard"
            >
              <Brain className="h-5 w-5 mr-2 animate-brain-breathe" />
              Start Your Agentic Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
