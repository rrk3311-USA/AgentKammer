import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
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
  CheckSquare,
  UtensilsCrossed,
  ShoppingBag,
  Wallet,
  Shield,
  TrendingUp as InvestIcon,
  Zap,
  Lightbulb,
  Home as HomeIcon,
  DollarSign
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";
import conciergeImage from '@assets/generated_images/concierge_agent_top_hat_luxury_interior.png';
import robotHeroImage from '@assets/generated_images/robot_looking_at_button_presenting.png';

const ICON_WRAPPER_STYLE = {
  background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
  border: '2px solid rgba(212,175,55,0.3)'
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
      {/* SECTION 1: Hero - Premium Style with Featured Card */}
      <section className="relative py-6 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center pt-[7px] pb-[7px] mt-[23px] mb-[23px]">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">
              Your AI Agent for Better{" "}
              <span style={{ color: '#d4af37' }}>Financial Outcomes</span>
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              One profile. Our Agentic Comparison Engine uses LLMs + compute to analyze offers and force banks, lenders, and financial products to{" "}
              <span className="text-[#d4af37] font-semibold">compete for you</span>.
            </p>
          </div>

          {/* Featured Hero Card with Brain Visual & Animated Words */}
          <Card 
            className="overflow-hidden border-0 relative" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
              backdropFilter: 'blur(20px)'
            }}
            data-testid="card-hero-featured"
          >
            <div className="relative z-10">
              {/* Brain Visual - Full Width */}
              <div className="flex justify-center">
                <div className="w-full">
                  <AgenticEngineVisual />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* SECTION 2: Choose Your Category - Combined */}
      <section id="categories" className="relative py-6 px-4 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-8" />

          {/* Choose Your Category Header */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              Choose Your Category
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              AI-powered real estate intelligence across Buying, Selling, and Refinancing
            </p>
          </div>

          {/* Featured Category Cards - Grid of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                id: 'buying', 
                name: 'Buying', 
                icon: HomeIcon, 
                desc: 'Find your perfect home',
                highlights: ['Mortgage pre-approval', 'Buyer agent matching', 'Neighborhood insights']
              },
              { 
                id: 'selling', 
                name: 'Selling', 
                icon: DollarSign, 
                desc: 'Maximize your sale price',
                highlights: ['Home valuation', 'Listing optimization', 'Agent competition']
              },
              { 
                id: 'refinancing', 
                name: 'Refinancing', 
                icon: RefreshCw, 
                desc: 'Lower your monthly payments',
                highlights: ['Rate watch alerts', 'Savings calculator', 'Lender comparison']
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
      {/* SECTION 5: Real Estate Concierge - Image Background */}
      <section className="relative py-6 lg:py-8 overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${conciergeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <Building2 className="h-10 w-10" style={GOLD_ICON_STYLE} />
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
      {/* SECTION 6: What You'll Unlock - Category Benefits */}
      <section className="relative py-6 px-4 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Choose Your Category Header */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              What You'll Unlock
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Premium real estate services—buying, selling, and refinancing with AI-powered competition
            </p>
          </div>

          {/* Three Category Cards - Grid of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                id: 'buying', 
                name: 'Buying', 
                icon: Building2,
                desc: 'Find your dream property',
                highlights: ['Reverse Buyer Origination', 'Pre-approval guidance', 'Luxury property access']
              },
              { 
                id: 'selling', 
                name: 'Selling', 
                icon: Briefcase,
                desc: 'Maximize your home value',
                highlights: ['Reverse Seller Architecture', 'Market analysis tools', 'Agent competition for your listing']
              },
              { 
                id: 'refinancing', 
                name: 'Refinancing', 
                icon: LineChart,
                desc: 'Lower your rate & save',
                highlights: ['Rate Watch technology', 'Cash-out options', 'AI-matched lenders']
              }
            ].map((cat) => (
              <Card 
                key={cat.id}
                className="overflow-hidden border-0 h-full transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
                data-testid={`card-benefits-${cat.id}`}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={ICON_WRAPPER_STYLE}
                  >
                    <cat.icon className="h-10 w-10" style={GOLD_ICON_STYLE} />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-base text-white/70 mb-6">
                    {cat.desc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {cat.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckSquare className="h-4 w-4 mt-0.5 shrink-0 flex-shrink-0" style={{ color: '#d4af37' }} />
                        <span className="text-sm text-white/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: NYC Price Reduction Alerts */}
      <section className="py-12 lg:py-16 bg-[#0a1628] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Lightning Instant Alerts
            </h2>
            <p className="text-[#00d4ff] text-lg font-medium mb-4">NYC listing price reductions, delivered as they happen</p>
            <p className="text-white/80 text-lg leading-relaxed">
              Track your target neighborhoods and get immediate alerts when qualifying NYC listings cut price.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 border-[#d4af37]/30 p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Get Instant NYC Price Drop Alerts</h3>
                <p className="text-white/60 text-sm">Enter your email to receive real-time listing reduction notifications.</p>
              </div>
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                  const email = emailInput.value;
                  if (email) {
                    try {
                      const response = await fetch('/api/travel-deals/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, segment: 'nyc-price-reductions' })
                      });
                      if (response.ok) {
                        emailInput.value = '';
                        alert('Subscribed. You will receive instant NYC price reduction alerts.');
                      } else {
                        const data = await response.json();
                        alert(data.message || 'Failed to subscribe');
                      }
                    } catch {
                      alert('Failed to subscribe. Please try again.');
                    }
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#d4af37]"
                  data-testid="input-nyc-price-alerts-email"
                />
                <Button
                  type="submit"
                  className="bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90 px-6"
                  data-testid="button-subscribe-nyc-price-alerts"
                >
                  Subscribe
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 8: Robot Hero CTA */}
      <section className="relative min-h-[500px] lg:min-h-[600px] text-white overflow-hidden">
        {/* Background gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1e36] to-[#1a1a2e]" />
        
        {/* Robot image - spans across section with arm gesture */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-3/4 flex items-end justify-end"
        >
          <img 
            src={robotHeroImage} 
            alt="AI Deal Maker" 
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain object-right-bottom opacity-95"
            style={{ mixBlendMode: 'lighten', maxHeight: '100%' }}
          />
        </div>
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-transparent" />
        
        {/* Decorative overlays */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#d4af37]/15 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-[#d4af37]/20 rounded-full" style={{ animation: 'float 8s ease-in-out infinite reverse' }} />
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col justify-center min-h-[500px] lg:min-h-[600px]">
          <div className="max-w-2xl">
            {/* Big headline */}
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Your NYC Deal Intelligence <span style={{ color: '#d4af37' }}>Awaits</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-lg">
              Activate instant listing and rate alerts, then move when the numbers work in your favor.
            </p>
            
            {/* CTA Button */}
            <Link href="/profile">
              <Button
                size="lg"
                className="h-14 rounded-xl px-10 text-[#0a1628] font-semibold text-lg hover:scale-[1.02] transition-transform shadow-2xl border border-[#f4d03f]/60"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                  boxShadow: '0 14px 38px rgba(212, 175, 55, 0.35)',
                }}
                data-testid="button-start-profile"
              >
                <Zap className="h-6 w-6 mr-3" />
                Get Instant Alerts
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Animation keyframes */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </section>
    </div>
  );
}
