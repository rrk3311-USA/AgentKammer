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
  LineChart,
  CheckSquare
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

const financialWords = [
  'Credit Cards',
  'Refinancing',
  'Mortgages',
  'Investing',
  'Insurance',
  'Loans',
  'Banking',
  'Wealth',
  'Savings',
  'Trading',
  'Retirement',
  'Financial Freedom'
];

export default function Home() {
  const animatedWords = financialWords.slice(0, 6).map((word, idx) => ({
    word,
    delay: 0.3 + idx * 0.2,
    left: 10 + (idx % 3) * 30 + Math.random() * 10,
    top: 30 + Math.floor(idx / 3) * 25 + Math.random() * 5
  }));

  return (
    <div className="min-h-screen">
      {/* SECTION 1: Hero - Premium Style with Featured Card */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge 
              className="mb-6 border-0" 
              style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Agentic AI
            </Badge>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">
              Your AI Agent for Better{" "}
              <span style={{ color: '#d4af37' }}>Financial Outcomes</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              One profile. Our Agentic Comparison Engine uses LLMs + compute to analyze offers and force banks, lenders, and financial products to{" "}
              <span className="text-[#d4af37] font-semibold">compete for you</span>.
            </p>
          </div>

          {/* Featured Hero Card with Brain Visual & Animated Words */}
          <Card 
            className="overflow-hidden border-0 mb-12 relative" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
            data-testid="card-hero-featured"
          >
            <div className="p-8 md:p-12 relative z-10">
              {/* Brain Visual - Full Width */}
              <div className="flex justify-center mb-12">
                <div className="w-full">
                  <AgenticEngineVisual />
                </div>
              </div>

              {/* Value Proposition */}
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl font-bold text-white mb-6 text-center">
                  How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { title: 'One Profile', desc: 'Share your financial profile once - it powers all recommendations' },
                    { title: '100+ Products Analyzed', desc: 'AI screens hundreds of offers across 14 financial categories' },
                    { title: 'Personalized Rankings', desc: 'Get AI-matched recommendations ranked specifically for you' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3 text-sm font-bold text-[#0a1628] flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)' }}
                      >
                        {idx + 1}
                      </div>
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <Link href="/profile">
                    <Button 
                      size="lg"
                      className="gap-2 border-0"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                        color: '#000',
                        fontWeight: 600,
                        fontSize: '1rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem'
                      }}
                      data-testid="button-hero-cta"
                    >
                      <Brain className="h-5 w-5" />
                      Build Your Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Gradient Divider */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
      {/* SECTION 2: Flagship Services - Digital Downloads Style */}
      <section id="categories" className="relative py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              Choose Your Category
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              AI-ranked products matched to your profile across 100+ financial products
            </p>
          </div>

          {/* Featured Category Cards - Grid of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                id: 'credit-cards', 
                name: 'Credit Cards', 
                icon: CreditCard, 
                desc: 'AI-matched cards for your goals',
                highlights: ['100+ cards analyzed', 'Fintech & crypto included', 'Personalized scoring']
              },
              { 
                id: 'investing', 
                name: 'Investing', 
                icon: TrendingUp, 
                desc: 'Brokerages & robo-advisors',
                highlights: ['Brokerages vs robo-advisors', 'Fee analysis included', 'Retirement planning']
              },
              { 
                id: 'reverse-buyer-origination', 
                name: 'Real Estate', 
                icon: Building2, 
                desc: 'Premium concierge services',
                highlights: ['Mortgage optimization', 'Lender comparison', 'Rate watch alerts']
              }
            ].map((cat) => (
              <Link key={cat.id} href={`/${cat.id}`}>
                <Card 
                  className="overflow-hidden border-0 h-full hover-elevate transition-all cursor-pointer"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
                    backdropFilter: 'blur(20px)'
                  }}
                  data-testid={`card-category-${cat.id}`}
                >
                  <div className="p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
                        border: '2px solid rgba(212,175,55,0.3)'
                      }}
                    >
                      <cat.icon className="h-10 w-10" style={{ color: '#d4af37' }} />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-base text-white/70 mb-6">
                      {cat.desc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-6 flex-1">
                      {cat.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckSquare className="h-4 w-4 mt-0.5 shrink-0 flex-shrink-0" style={{ color: '#d4af37' }} />
                          <span className="text-sm text-white/80">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button 
                      size="sm"
                      className="gap-2 border-0 w-full"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                        color: '#000',
                        fontWeight: 600
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                      Explore {cat.name}
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
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
      <section className="py-12 lg:py-16 bg-background pl-[0px] pr-[0px] pt-[0px] pb-[0px] mt-[13px] mb-[13px]">
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
      {/* SECTION 6: The Agentic Advantage - Dark Slate Background */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 border-0" 
              style={{ 
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem'
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              How It Works
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              The Agentic Advantage
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Three simple steps to unlock personalized financial recommendations
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                num: '1', 
                title: 'Build Your Profile', 
                desc: 'Income, credit band, location, goals - one time. Your profile powers all recommendations.',
                icon: Brain
              },
              { 
                num: '2', 
                title: 'AI Analyzes the Field', 
                desc: 'We screen hundreds of partner offers across categories, ranking them by your fit.',
                icon: BarChart3
              },
              { 
                num: '3', 
                title: 'You Choose - We Route', 
                desc: 'Go straight to the best matched lender, card, or tool. No guesswork.',
                icon: ArrowRight
              }
            ].map((step) => (
              <Card 
                key={step.num} 
                className="overflow-hidden border-0 h-full"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
                data-testid={`card-step-${step.num}`}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Number Badge */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-3xl font-bold text-[#0a1628] font-serif flex-shrink-0"
                    style={GOLD_NUMBER_STYLE}
                  >
                    {step.num}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-white/70 mb-6 flex-1">
                    {step.desc}
                  </p>

                  {/* Icon Accent */}
                  <div className="flex justify-end">
                    <step.icon className="h-8 w-8 text-[#d4af37]/40" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 7: Final CTA - Dark Navy */}
      <section className="py-8 lg:py-12 bg-[#0a1628] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4 relative inline-block">
              <span className="relative">
                Ready to Get Started?
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
              Build your Agentic Profile and unlock personalized recommendations across all financial categories
            </p>
            
            <Link href="/profile">
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:opacity-90"
                data-testid="button-dashboard"
              >
                <Brain className="h-5 w-5 mr-2" />
                Start Your Agentic Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
