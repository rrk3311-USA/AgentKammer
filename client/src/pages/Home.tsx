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
  CheckSquare,
  Plane,
  UtensilsCrossed,
  ShoppingBag,
  Wallet,
  Shield,
  TrendingUp as InvestIcon
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";
import { CreditCardShowcase } from "@/components/CreditCardShowcase";
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
      <section className="relative py-12 md:py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
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
      <section id="categories" className="relative py-8 px-4 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-16" />

          {/* Choose Your Category Header */}
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
              },
              { 
                id: 'credit-cards', 
                name: 'Credit Cards', 
                icon: CreditCard, 
                desc: 'AI-matched cards for your goals',
                highlights: ['100+ cards analyzed', 'Fintech & crypto included', 'Personalized scoring']
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

      {/* SECTION 3: How It Works */}
      <section className="relative py-12 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* Top Gradient Divider */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 mb-12" />

          {/* How It Works Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 text-white">
                How It Works
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Three simple steps to unlock personalized recommendations
              </p>
            </div>

            {/* How It Works Cards - Grid of 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  num: '1', 
                  title: 'One Profile', 
                  desc: 'Share your financial profile once - it powers all recommendations',
                  highlights: []
                },
                { 
                  num: '2', 
                  title: '100+ Products Analyzed', 
                  desc: 'AI screens hundreds of offers across 14 financial categories',
                  highlights: []
                },
                { 
                  num: '3', 
                  title: 'Personalized Rankings', 
                  desc: 'Get AI-matched recommendations ranked specifically for you',
                  highlights: []
                }
              ].map((item) => (
                <Card 
                  key={item.num}
                  className="overflow-hidden border-0 h-full hover-elevate transition-all cursor-pointer"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)',
                    backdropFilter: 'blur(20px)'
                  }}
                  data-testid={`card-step-${item.num}`}
                >
                  <div className="p-8 flex flex-col h-full">
                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-white/70 mb-6">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Investment Accounts */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <TrendingUp className="h-7 w-7" style={GOLD_ICON_STYLE} />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3 text-white">
              Investment Accounts
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Compare brokerages, robo-advisors, and investment platforms matched to your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: BarChart3, title: 'Brokerages', desc: 'Full-service and discount brokers for active traders' },
              { icon: Briefcase, title: 'Robo-Advisors', desc: 'Automated investing with low fees and smart rebalancing' },
              { icon: LineChart, title: 'Crypto Platforms', desc: 'Digital asset trading and DeFi opportunities' }
            ].map((item) => (
              <Card key={item.title} className="p-5 bg-white/5 border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 5: Real Estate Concierge - Image Background */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${conciergeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-slate-900/60" />
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
      {/* SECTION 6: Credit Cards Comparison - Dark Navy */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
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
          <p className="text-center text-white/50 text-sm mb-12">Airport lounges • Fine dining • Luxury travel</p>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-12 max-w-5xl mx-auto">
            <table className="w-full text-sm border-collapse" data-testid="credit-cards-comparison-table">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-white font-semibold">Card Type</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">APR Range</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Welcome Bonus</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Rewards Rate</th>
                  <th className="text-center py-4 px-4 text-white font-semibold">Annual Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors" data-testid="card-row-travel">
                  <td className="py-4 px-4 text-white font-medium">Travel Rewards</td>
                  <td className="text-center py-4 px-4 text-white/70">17-24%</td>
                  <td className="text-center py-4 px-4 text-[#00ff88]">50K-150K pts</td>
                  <td className="text-center py-4 px-4 text-white/70">3-5x</td>
                  <td className="text-center py-4 px-4 text-white/70">$95-$450</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors" data-testid="card-row-cashback">
                  <td className="py-4 px-4 text-white font-medium">Cashback</td>
                  <td className="text-center py-4 px-4 text-white/70">15-22%</td>
                  <td className="text-center py-4 px-4 text-[#00ff88]">$200-$500</td>
                  <td className="text-center py-4 px-4 text-white/70">1.5-5%</td>
                  <td className="text-center py-4 px-4 text-white/70">$0-$95</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors" data-testid="card-row-business">
                  <td className="py-4 px-4 text-white font-medium">Business</td>
                  <td className="text-center py-4 px-4 text-white/70">16-25%</td>
                  <td className="text-center py-4 px-4 text-[#00ff88]">75K-200K pts</td>
                  <td className="text-center py-4 px-4 text-white/70">2-5x</td>
                  <td className="text-center py-4 px-4 text-white/70">$95-$595</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors" data-testid="card-row-balance">
                  <td className="py-4 px-4 text-white font-medium">Balance Transfer</td>
                  <td className="text-center py-4 px-4 text-[#00d4ff]">0% for 12-21mo</td>
                  <td className="text-center py-4 px-4 text-white/70">None</td>
                  <td className="text-center py-4 px-4 text-white/70">1-2%</td>
                  <td className="text-center py-4 px-4 text-white/70">$0-$99</td>
                </tr>
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
      {/* SECTION 7: Credit Card Showcase */}
      <CreditCardShowcase />
      {/* SECTION 8: Final CTA - Dark Navy */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
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
