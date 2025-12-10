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
  TrendingUp as InvestIcon,
  Zap,
  Lightbulb
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";
import { CreditCardShowcase } from "@/components/CreditCardShowcase";
import heroImage from '@assets/generated_images/ps5_hero_-_agent_kammer_concierge_gestures_into_luxury_apartment.png';
import conciergeImage from '@assets/generated_images/concierge_agent_top_hat_luxury_interior.png';
import conciergeGestureImage from '@assets/image_1763360901241.png';
import airportLoungeImage from '@assets/generated_images/luxury_airport_lounge.png';
import dinningImage from '@assets/generated_images/fine_dining_experience.png';
import travelImage from '@assets/generated_images/luxury_travel_destination.png';
import mascotImage from '@assets/generated_images/sophisticated_gentleman_mascot_with_cane.png';
import robotHeroImage from '@assets/064B7A08-3CBE-49E9-97D1-9EAFC6D20B56_1_102_o_1765329522506.jpeg';
import japanRyokanImage from '@assets/generated_images/japanese_ryokan_hot_spring_inn.png';
import singaporeHotelImage from '@assets/generated_images/singapore_marina_bay_luxury_hotel.png';
import hawaiiResortImage from '@assets/generated_images/hawaii_beach_resort_paradise.png';

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
      {/* SECTION 3: Investment Accounts */}
      <section className="py-6 lg:py-8 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <TrendingUp className="h-10 w-10" style={GOLD_ICON_STYLE} />
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
      {/* SECTION 6: Credit Cards Comparison - Dark Navy */}
      <section className="py-6 lg:py-8 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={ICON_WRAPPER_STYLE}>
                <CreditCard className="h-10 w-10" style={GOLD_ICON_STYLE} />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-3">Competitive Credit Card Procurement </h2>
            <p className="text-[#d4af37] text-xl font-semibold mb-2">Not Just the Usual 12</p>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Our AI analyzes 100+ options including fintech, crypto, and startup cards that legacy sites don't show. Your profile is leverages to create competition for your business. </p>
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

          {/* Competitor Comparison - Scrollable Columns */}
          <div className="mb-12 max-w-6xl mx-auto">
            <div className="relative">
              <div className="overflow-x-scroll scroll-smooth scrollbar-gold" data-testid="competitor-comparison-table">
                <div className="flex gap-4 pb-4">
                  {/* Features Column (Sticky) */}
                  <div className="flex-shrink-0 w-40">
                    <div className="h-16 flex items-end pb-4 px-4 border-b-2 border-white/20">
                      <span className="text-white font-semibold text-sm">Feature</span>
                    </div>
                    {[
                      'AI-Powered Matching',
                      '100+ Card Options',
                      '14 Financial Categories',
                      'Advanced Rate Watch',
                      'Personalized Profile',
                    ].map((feature, idx) => (
                      <div 
                        key={idx}
                        className="h-16 flex items-center px-4 border-b border-white/10 text-white font-medium text-sm"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Competitor Columns */}
                  <div className="flex gap-0">
                    {[
                      { name: 'Agent Kammer', isHighlighted: true, data: [true, true, true, true, true] },
                      { name: 'NerdWallet', data: ['Limited', '~50', '6-8', 'Basic', 'Limited'] },
                      { name: 'Bankrate', data: ['No', '~40', '8-10', 'Basic', 'Limited'] },
                      { name: 'LendingClub', data: ['No', 'N/A', '1-2', 'None', 'Limited'] },
                      { name: 'The Points Guy', data: [true, '~70', '5', 'Premium', true] },
                      { name: 'Credit Karma', data: ['Limited', '~60', '3', 'Basic', 'Limited'] },
                      { name: 'WalletHub', data: ['Limited', '~80', '7-9', 'Advanced', true] },
                      { name: 'Experian', data: ['Limited', '~50', '4-6', 'Basic', 'Limited'] },
                    ].map((competitor, compIdx) => (
                      <div 
                        key={compIdx}
                        className={`flex-shrink-0 w-44 border-l ${competitor.isHighlighted ? 'border-l-[#d4af37] bg-white/5' : 'border-l-white/10'}`}
                      >
                        {/* Header */}
                        <div 
                          className={`h-16 flex items-end pb-4 px-4 border-b-2 ${competitor.isHighlighted ? 'border-b-[#d4af37] bg-gradient-to-b from-white/10 to-transparent' : 'border-b-white/20'}`}
                        >
                          <span 
                            className="font-semibold text-sm text-center w-full"
                            style={{ color: competitor.isHighlighted ? '#d4af37' : 'white' }}
                          >
                            {competitor.name}
                          </span>
                        </div>

                        {/* Rows */}
                        {competitor.data.map((value, rowIdx) => (
                          <div 
                            key={rowIdx}
                            className={`h-16 flex items-center justify-center px-4 border-b ${competitor.isHighlighted ? 'border-b-white/10 bg-white/5' : 'border-b-white/10'}`}
                          >
                            {typeof value === 'boolean' ? (
                              value ? (
                                <span 
                                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold" 
                                  style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)', color: '#0a1628' }}
                                >
                                  Yes
                                </span>
                              ) : (
                                <span className="text-white/50 text-xs">No</span>
                              )
                            ) : (
                              <span className={competitor.isHighlighted ? 'text-white/80 text-sm font-medium' : 'text-white/50 text-sm'}>
                                {value}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-4">
                <div className="text-white/40 text-xs">← Scroll to see all competitors →</div>
              </div>
            </div>
          </div>

          </div>
      </section>
      {/* SECTION 7: Credit Card Showcase */}
      <CreditCardShowcase />
      {/* SECTION 7B: What You'll Unlock - Category Benefits */}
      <section className="relative py-6 px-4 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Choose Your Category Header */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
              What You'll Unlock
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Premium benefits across credit, wealth, and real estate—tailored to your financial goals
            </p>
          </div>

          {/* Three Category Cards - Grid of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                id: 'investing-benefits', 
                name: 'Investment Accounts', 
                icon: TrendingUp,
                desc: 'Brokerages & robo-advisors',
                highlights: ['AI-matched strategies', 'Tax-efficient growth', 'Instant fund matching']
              },
              { 
                id: 'real-estate-benefits', 
                name: 'Real Estate Concierge', 
                icon: Briefcase,
                desc: 'Premium concierge services',
                highlights: ['Luxury property access', 'Mortgage pre-approval', 'White-glove service']
              },
              { 
                id: 'credit-benefits', 
                name: 'Credit Cards', 
                icon: CreditCard,
                desc: 'AI-matched cards for your goals',
                highlights: ['Airport lounges & travel', 'Fine dining credits', 'Premium cashback rewards']
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
      {/* SECTION 8: Explore Now - Travel Offers */}
      <section className="py-12 lg:py-16 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Explore Now
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Exclusive hotel deals through our trusted partner Hotels.com
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Offer 1 - Japan */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-elevate">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={japanRyokanImage} 
                  alt="Japan Ryokan Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">Japan Ryokan Experience</h3>
                <p className="text-white/60 text-sm mb-4">Traditional Japanese inns with hot springs and authentic hospitality.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#d4af37] font-semibold">Up to 15% off</span>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Hotels.com</Badge>
                </div>
                <Button size="sm" className="w-full bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Offer 2 - Singapore */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-elevate">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={singaporeHotelImage} 
                  alt="Singapore Staycations" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">Singapore Staycations</h3>
                <p className="text-white/60 text-sm mb-4">Luxury hotels in Marina Bay and Sentosa with exclusive member rates.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#d4af37] font-semibold">Up to 20% off</span>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Hotels.com</Badge>
                </div>
                <Button size="sm" className="w-full bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Offer 3 - Hawaii */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-elevate">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={hawaiiResortImage} 
                  alt="Hawaii Beach Resorts" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">Hawaii Beach Resorts</h3>
                <p className="text-white/60 text-sm mb-4">Oceanfront properties in Maui, Oahu, and the Big Island.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#d4af37] font-semibold">Up to 25% off</span>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Hotels.com</Badge>
                </div>
                <Button size="sm" className="w-full bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* No Profile Required Note */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">No profile required</p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Robot Hero CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#0a1628] via-[#0f1e36] to-[#1a1a2e] text-white relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-orange-900/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a2e] to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left: Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Meet Your AI Agent
              </h2>
              <p className="text-xl text-white/80 mb-6">
                Ready to find your perfect financial match?
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                  <span className="text-white/70">100+ credit cards analyzed</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-white/70">Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  <span className="text-white/70">No profile required to explore</span>
                </div>
              </div>
            </div>
            
            {/* Right: Robot with Integrated Button */}
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative">
                {/* Robot Image */}
                <img 
                  src={robotHeroImage} 
                  alt="Agent Kammer AI Assistant" 
                  className="h-80 lg:h-96 w-auto object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.3))' }}
                />
                
                {/* Glowing eye effect overlay */}
                <div 
                  className="absolute top-[22%] left-[32%] w-8 h-4 rounded-full pointer-events-none z-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,150,255,0.8) 0%, rgba(0,100,200,0.4) 50%, transparent 70%)',
                    animation: 'eyeGlow 3s ease-in-out infinite',
                    filter: 'blur(2px)',
                  }}
                />
                
                {/* CTA Button - Positioned on robot's chest panel */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                  <Link href="/profile">
                    <Button
                      size="lg"
                      className="h-14 px-10 text-black font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                        boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 255, 136, 0.3)',
                      }}
                      data-testid="button-start-profile"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Start Now
                    </Button>
                  </Link>
                </div>
                
                {/* HUD frame around robot */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '50% 50% 40% 40%',
                    boxShadow: 'inset 0 0 60px rgba(0, 212, 255, 0.1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Animation keyframes */}
        <style>{`
          @keyframes eyeGlow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}</style>
      </section>
    </div>
  );
}
