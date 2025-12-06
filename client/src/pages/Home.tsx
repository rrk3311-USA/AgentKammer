import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Landmark, 
  Shield, 
  TrendingUp,
  Target,
  GraduationCap,
  Calculator,
  Lock,
  PieChart,
  Gift,
  Home as HomeIcon,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  CheckCircle2,
  Users,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";
import { ActivateAgentMode } from "@/components/ActivateAgentMode";
import heroImage from '@assets/generated_images/ps5_hero_-_agent_kammer_concierge_gestures_into_luxury_apartment.png';
import conciergeImage from '@assets/generated_images/concierge_agent_top_hat_luxury_interior.png';
import agentCameraImage from '@assets/generated_images/financial_agent_with_camera.png';
import dataVizImage from '@assets/generated_images/financial_data_visualization.png';
import airportLoungeImage from '@assets/generated_images/luxury_airport_lounge.png';
import dinningImage from '@assets/generated_images/fine_dining_experience.png';
import travelImage from '@assets/generated_images/luxury_travel_destination.png';

const categoryIcons: Record<string, any> = {
  'CreditCard': CreditCard,
  'Wallet': Wallet,
  'Building2': Building2,
  'Landmark': Landmark,
  'Shield': Shield,
  'TrendingUp': TrendingUp,
  'Target': Target,
  'GraduationCap': GraduationCap,
  'Calculator': Calculator,
  'Lock': Lock,
  'PieChart': PieChart,
  'Gift': Gift,
  'Home': HomeIcon,
};

const PRIMARY_CATEGORIES = [
  { id: 'credit-cards', name: 'Credit Cards', icon: 'CreditCard', description: 'AI-matched cards based on your profile and goals', color: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'investing', name: 'Investment Accounts', icon: 'TrendingUp', description: 'Brokerages, robo-advisors, and investment platforms', color: 'from-green-500/20 to-emerald-500/20' },
];

const SECONDARY_CATEGORIES = [
  { id: 'credit-builder', name: 'Credit Builder', icon: 'Target', description: 'Build or rebuild your credit score' },
  { id: 'student-finance', name: 'Student Finance', icon: 'GraduationCap', description: 'Student loans, refinancing, and banking' },
];

const SUPPORTING_CATEGORIES = [
  { id: 'tax-tools', name: 'Tax Tools', icon: 'Calculator', description: 'Free and paid tax filing solutions' },
  { id: 'identity-security', name: 'Identity & Security', icon: 'Lock', description: 'Identity protection and credit monitoring' },
  { id: 'budgeting-apps', name: 'Budgeting Apps', icon: 'PieChart', description: 'Budgeting and money management' },
  { id: 'rewards-cashback', name: 'Rewards & Cashback', icon: 'Gift', description: 'Cashback apps and rewards platforms' },
];

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628] py-10 lg:py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#d4af37]/5 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-6" data-testid="badge-hero">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by Agentic AI
              </Badge>
              
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                Your AI Agent for Better{" "}
                <span className="text-[#d4af37]">Financial Outcomes</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/80 mb-4 leading-relaxed">
                One profile. Our Agentic Comparison Engine uses LLMs + compute to analyze offers and force banks, lenders, credit cards, and financial products to{" "}
                <span className="text-[#d4af37] font-semibold">compete for you</span>.
              </p>
            </div>

            {/* Right: Animated AI Engine Visual */}
            <div className="relative">
              <AgenticEngineVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Services Hero - PS5 Style */}
      <section id="categories" className="relative py-10 lg:py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'right center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Content & Offers */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Apply Your Agentic Advantage</Badge>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Flagship Services
                </h2>
                <p className="text-white/70 text-lg">
                  Choose a service to see AI-ranked products matched to your profile
                </p>
              </div>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {/* Credit Cards Offer */}
                {PRIMARY_CATEGORIES.map((category) => {
                  const IconComponent = categoryIcons[category.icon];
                  return (
                    <Link key={category.id} href={`/${category.id}`}>
                      <Card 
                        className="p-6 bg-[#0f1d32]/95 border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer h-full group backdrop-blur-sm"
                        data-testid={`card-category-${category.id}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                            style={{
                              background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                            }}
                          >
                            <IconComponent 
                              className="h-6 w-6 relative z-10" 
                              style={{
                                color: '#d4af37',
                                filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                                textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                              }}
                            />
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-white mb-1">{category.name}</h3>
                        <p className="text-white/60 text-sm">{category.description}</p>
                      </Card>
                    </Link>
                  );
                })}

                {/* Real Estate Concierge Card */}
                <Link href="/reverse-buyer-origination">
                  <Card 
                    className="p-6 bg-[#0f1d32]/95 border-[#1a2a42] hover:border-[#d4af37]/50 transition-all cursor-pointer h-full group backdrop-blur-sm"
                    data-testid="card-category-real-estate"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                          boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                        }}
                      >
                        <Building2 
                          className="h-6 w-6 relative z-10" 
                          style={{
                            color: '#d4af37',
                            filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                            textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                          }}
                        />
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-1">Real Estate Concierge</h3>
                    <p className="text-white/60 text-sm">Premium home buying, selling, and mortgage intelligence services</p>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image (shown via background) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* How the Agentic Engine Works */}
      <section className="py-6 lg:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-1">
              The Agentic Advantage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Three simple steps to unlock personalized financial recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-1">
              <div className="absolute top-2 right-2 text-5xl font-bold text-muted/10">1</div>
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Users 
                  className="h-7 w-7 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Build Your Agentic Profile</h3>
              <p className="text-muted-foreground text-sm">
                Income, credit band, location, goals - one time. Your profile powers recommendations across all categories.
              </p>
            </Card>

            <Card className="p-4 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-2">
              <div className="absolute top-2 right-2 text-5xl font-bold text-muted/10">2</div>
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Brain 
                  className="h-7 w-7 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">AI + Compute Analyze the Field</h3>
              <p className="text-muted-foreground text-sm">
                We use LLM agents to screen hundreds of partner offers across categories, ranking them by your fit.
              </p>
            </Card>

            <Card className="p-4 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-3">
              <div className="absolute top-2 right-2 text-5xl font-bold text-muted/10">3</div>
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Zap 
                  className="h-7 w-7 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">You Choose - We Route You</h3>
              <p className="text-muted-foreground text-sm">
                Launch a module and go straight to the best matched lender, card, or tool. No guesswork.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Credit Card Comparison Module */}
      <section className="py-8 lg:py-12 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                    boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                  }}
                >
                  <CreditCard 
                    className="h-8 w-8 relative z-10" 
                    style={{
                      color: '#d4af37',
                      filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                      textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                    }}
                  />
                </div>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
                Compare 100+ Credit Cards
                <br />
                <span className="text-[#d4af37]">Not Just the Usual 12</span>
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our AI-powered engine analyzes 100+ card options—including fintech, crypto, and startup cards that legacy sites don't show.
              </p>
            </div>

            {/* Lifestyle Benefits Collage */}
            <div className="mb-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <img 
                  src={airportLoungeImage} 
                  alt="Luxury airport lounge"
                  className="w-full h-40 object-cover rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
                  data-testid="img-airport-lounge"
                />
                <img 
                  src={dinningImage} 
                  alt="Fine dining experience"
                  className="w-full h-40 object-cover rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
                  data-testid="img-dining"
                />
                <img 
                  src={travelImage} 
                  alt="Luxury travel destination"
                  className="w-full h-40 object-cover rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
                  data-testid="img-travel"
                />
              </div>
              <p className="text-center text-white/60 text-sm">Premium lifestyle benefits: Airport lounges • Fine dining • Luxury travel experiences</p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-3 text-white/80 font-semibold text-sm">Feature</th>
                    <th className="text-center py-3 px-3 text-white/60 font-medium text-sm">NerdWallet</th>
                    <th className="text-center py-3 px-3 text-white/60 font-medium text-sm">Bankrate</th>
                    <th className="text-center py-3 px-3 text-white/60 font-medium text-sm">Credit Karma</th>
                    <th 
                      className="text-center py-3 px-3 text-[#d4af37] font-semibold relative text-sm"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        boxShadow: 'inset 0 0 20px rgba(212, 175, 55, 0.15), 0 0 20px rgba(212, 175, 55, 0.1)'
                      }}
                    >
                      Agent Kammer
                    </th>
                    <th className="text-center py-3 px-3 text-white/60 font-medium text-sm">Chase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white text-sm">Total Cards</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">12–20</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">10–25</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">8–15</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.05)'}}>100+</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">25–40</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white text-sm">Fintech Cards</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">Limited</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.05)'}}>✓</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white text-sm">Crypto Rewards Cards</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.05)'}}>✓</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">Limited</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white text-sm">AI-Based Matching</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.05)'}}>✓</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 text-white text-sm">Independent Ranking</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">Partial</td>
                    <td className="py-3 px-3 text-center text-[#d4af37] font-semibold text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.05)'}}>✓</td>
                    <td className="py-3 px-3 text-center text-white/60 text-sm">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Why We're Different */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-[#d4af37]/5 border-[#d4af37]/20">
                <h4 className="font-semibold text-lg text-[#d4af37] mb-4">Why Legacy Sites Show Fewer Cards</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Limited affiliate partnerships with banks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Crypto cards excluded due to compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Fintech startups can't afford placement fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>New beta cards excluded from networks</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-white/5 border-white/10">
                <h4 className="font-semibold text-lg text-white mb-4">Our Advantage</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Direct partnerships with 100+ card issuers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Full access to fintech & crypto programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>AI evaluates for YOUR fit, not commission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>Pre-launch & invite-only cards included</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center mt-6">
              <p className="text-white/70 mb-4">Ready to find your perfect card?</p>
              <Link href="/profile">
                <Button 
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
                  data-testid="button-compare-cards"
                >
                  <Brain className="h-5 w-5 mr-2 animate-brain-breathe" />
                  Start Your Agentic Profile
                </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* Real Estate Concierge */}
      <section className="relative py-10 lg:py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${conciergeImage})`,
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Building2 
                  className="h-8 w-8 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-white">
              Real Estate Concierge
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Premium home buying, selling, and mortgage intelligence for high-net-worth clients across the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* RBO - Reverse Buyer Origination */}
            <div className="space-y-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Building2 
                  className="h-6 w-6 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Reverse Buyer Origination</h3>
              <p className="text-white/70">
                Put the power in your hands. Sellers and their agents compete to win your business with better terms, faster closing, and more favorable conditions.
              </p>
              <Link href="/reverse-buyer-origination">
                <Button size="sm" className="bg-[#d3af37] text-[#000000]" data-testid="button-rbo">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* RSA - Reverse Seller Architecture */}
            <div className="space-y-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <Users 
                  className="h-6 w-6 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Reverse Seller Architecture</h3>
              <p className="text-white/70">
                Selling your home? Multiple qualified buyer agents compete to represent you, driving up demand and getting you the best possible sale price and terms.
              </p>
              <Link href="/reverse-seller-architecture">
                <Button size="sm" className="bg-[#d2b038] text-[#000000]" data-testid="button-rsa">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* RRW - Refinancing Rate Watch */}
            <div className="space-y-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <RefreshCw 
                  className="h-6 w-6 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Refinancing Rate Watch</h3>
              <p className="text-white/70">
                Never miss a refinancing opportunity. AI-powered rate monitoring alerts you instantly when rates drop, showing exact savings and break-even timelines.
              </p>
              <Link href="/refinancing">
                <Button size="sm" className="bg-[#d2b038] text-[#000000]" data-testid="button-rrw">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Accounts Section */}
      <section className="py-10 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000)',
                  boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.1)'
                }}
              >
                <TrendingUp 
                  className="h-8 w-8 relative z-10" 
                  style={{
                    color: '#d4af37',
                    filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))',
                    textShadow: '0 0 2px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </div>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Investment Accounts
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access the best brokerages, robo-advisors, and investment platforms tailored to your financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <Landmark className="h-6 w-6 text-[#d4af37]" />
                <h3 className="font-semibold text-lg text-foreground">Traditional Brokers</h3>
              </div>
              <p className="text-muted-foreground text-sm">Full-service brokerages with professional advisors and comprehensive tools</p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-[#d4af37]" />
                <h3 className="font-semibold text-lg text-foreground">Robo-Advisors</h3>
              </div>
              <p className="text-muted-foreground text-sm">Automated portfolio management with low fees and algorithmic investing</p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-[#d4af37]" />
                <h3 className="font-semibold text-lg text-foreground">Crypto Platforms</h3>
              </div>
              <p className="text-muted-foreground text-sm">Digital asset trading and decentralized finance opportunities</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/investing">
              <Button 
                size="lg" 
                className="px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
                data-testid="button-investment-accounts"
              >
                <Brain className="h-5 w-5 mr-2" />
                Explore Investment Accounts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Financial Dashboard CTA */}
      <section className="py-10 lg:py-14 bg-[#0a1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Financial Dashboard
          </h2>
          <p className="text-white/70 text-lg mb-6">
            Explore all categories and find the perfect products matched to your profile
          </p>
          
          <div className="space-y-4">
            <Link href="/profile">
              <Button 
                size="lg"
                className="px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90 animate-button-pulse-glow"
                data-testid="button-dashboard"
              >
                <Brain className="h-5 w-5 mr-2 animate-brain-breathe" />
                Start Your Agentic Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
