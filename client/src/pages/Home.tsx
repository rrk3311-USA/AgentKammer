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
  { id: 'investing', name: 'Investing', icon: 'TrendingUp', description: 'Brokerages, robo-advisors, and investment platforms', color: 'from-green-500/20 to-emerald-500/20' },
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
      <section className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1d32] to-[#0a1628] py-16 lg:py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#d4af37]/5 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-6" data-testid="badge-hero">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by Agentic AI
              </Badge>
              
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Your AI Agent for Better{" "}
                <span className="text-[#d4af37]">Financial Outcomes</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed">
                One profile. Our Agentic Comparison Engine uses LLMs + compute to analyze offers and force banks, lenders, credit cards, and financial products to{" "}
                <span className="text-[#d4af37] font-semibold">compete for you</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-2xl">
                <div className="flex-1">
                  <Link href="/profile">
                    <ActivateAgentMode />
                  </Link>
                </div>
                <div className="flex-1 flex flex-col">
                  <button 
                    className="h-12 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                    data-testid="button-browse-categories"
                    onClick={() => {
                      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Browse Categories
                  </button>
                  {/* Breathing pixel bar - ON state (green) */}
                  <div className="h-2 w-full bg-[#0a1628] rounded-b-lg mt-0 overflow-hidden">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundColor: '#22c55e',
                        animation: 'breathing 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                  <style>{`
                    @keyframes breathing {
                      0%, 100% { opacity: 0.3; }
                      50% { opacity: 1; }
                    }
                  `}</style>
                </div>
              </div>
            </div>

            {/* Right: Animated AI Engine Visual */}
            <div className="relative">
              <AgenticEngineVisual />
            </div>
          </div>
        </div>
      </section>

      {/* How the Agentic Engine Works */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20 mb-4">How It Works</Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              The Agentic Advantage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to unlock personalized financial recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-1">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/10">1</div>
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Build Your Agentic Profile</h3>
              <p className="text-muted-foreground">
                Income, credit band, location, goals - one time. Your profile powers recommendations across all categories.
              </p>
            </Card>

            <Card className="p-8 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-2">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/10">2</div>
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">AI + Compute Analyze the Field</h3>
              <p className="text-muted-foreground">
                We use LLM agents to screen hundreds of partner offers across categories, ranking them by your fit.
              </p>
            </Card>

            <Card className="p-8 text-center relative overflow-hidden group hover-elevate" data-testid="card-step-3">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/10">3</div>
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">You Choose - We Route You</h3>
              <p className="text-muted-foreground">
                Launch a module and go straight to the best matched lender, card, or tool. No guesswork.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Flagship Services Hero - PS5 Style */}
      <section id="categories" className="relative py-16 lg:py-24 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content & Offers */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">Apply Your Agentic Advantage</Badge>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Flagship Services
                </h2>
                <p className="text-white/70 text-lg">
                  Choose a service to see AI-ranked products matched to your profile
                </p>
              </div>

              {/* Offers Stack */}
              <div className="space-y-4 pt-4">
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
                          <div className="w-12 h-12 rounded-lg bg-[#d4af37]/15 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-[#d4af37]" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-white mb-1">{category.name}</h3>
                        <p className="text-white/60 text-sm">{category.description}</p>
                      </Card>
                    </Link>
                  );
                })}

                {/* Refinancing Rate Watch Card */}
                <Link href="/refinancing">
                  <Card 
                    className="p-6 bg-[#0f1d32]/95 border-[#d4af37]/40 hover:border-[#d4af37] transition-all cursor-pointer h-full group backdrop-blur-sm"
                    data-testid="card-category-refinancing"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                        <RefreshCw className="h-6 w-6 text-[#d4af37]" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-1">Refinancing Rate Watch</h3>
                    <p className="text-white/60 text-sm">Monitor mortgage, auto, student, personal, and cash-out refinancing rates 24/7</p>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image (shown via background) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Credit Card Comparison Module */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-3">
                Compare 100+ Credit Cards
                <br />
                <span className="text-[#d4af37]">Not Just the Usual 12</span>
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our AI-powered engine analyzes 100+ card options—including fintech, crypto, and startup cards that legacy sites don't show.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 text-white/80 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-white/60 font-medium">NerdWallet</th>
                    <th className="text-center py-4 px-4 text-white/60 font-medium">Bankrate</th>
                    <th className="text-center py-4 px-4 text-white/60 font-medium">Forbes</th>
                    <th className="text-center py-4 px-4 text-[#d4af37] font-semibold">Agent Kammer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white">Total Cards</td>
                    <td className="py-4 px-4 text-center text-white/60">12–20</td>
                    <td className="py-4 px-4 text-center text-white/60">10–25</td>
                    <td className="py-4 px-4 text-center text-white/60">10–18</td>
                    <td className="py-4 px-4 text-center text-[#d4af37] font-semibold">100+</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white">Fintech Cards</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-[#d4af37] font-semibold">✓</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white">Crypto Rewards Cards</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">Limited</td>
                    <td className="py-4 px-4 text-center text-[#d4af37] font-semibold">✓</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white">AI-Based Matching</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-[#d4af37] font-semibold">✓</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white">Independent Ranking</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">❌</td>
                    <td className="py-4 px-4 text-center text-white/60">Partial</td>
                    <td className="py-4 px-4 text-center text-[#d4af37] font-semibold">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Why We're Different */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="text-center mt-8">
              <p className="text-white/70 mb-4">Ready to find your perfect card?</p>
              <Link href="/profile">
                <Button 
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
                  data-testid="button-compare-cards"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Start Your Agentic Profile
                </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* Real Estate Concierge */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
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
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-white">
              Real Estate Concierge
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Premium home buying, selling, and mortgage intelligence for high-net-worth clients across California, Nevada, and New York
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* RBO - Reverse Buyer Origination */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/15 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Reverse Buyer Origination</h3>
              <p className="text-white/70">
                Put the power in your hands. Sellers and their agents compete to win your business with better terms, faster closing, and more favorable conditions.
              </p>
              <Link href="/reverse-buyer-origination">
                <Button variant="outline" size="sm" className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10" data-testid="button-rbo">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* RSA - Reverse Seller Architecture */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/15 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Reverse Seller Architecture</h3>
              <p className="text-white/70">
                Selling your home? Multiple qualified buyer agents compete to represent you, driving up demand and getting you the best possible sale price and terms.
              </p>
              <Link href="/reverse-seller-architecture">
                <Button variant="outline" size="sm" className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10" data-testid="button-rsa">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* RRW - Refinancing Rate Watch */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#d4af37]/15 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-[#d4af37]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">Refinancing Rate Watch</h3>
              <p className="text-white/70">
                Never miss a refinancing opportunity. AI-powered rate monitoring alerts you instantly when rates drop, showing exact savings and break-even timelines.
              </p>
              <Link href="/refinancing">
                <Button variant="outline" size="sm" className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37]/10" data-testid="button-rrw">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Dashboard */}
      <section className="py-16 lg:py-20 bg-[#0a1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-6">Coming Soon</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Personal Dashboard
          </h2>
          <p className="text-white/70 mb-8">
            Soon you'll be able to log in and access your Agentic Profile, personalized recommendations, saved offers, and click directly into finance modules.
          </p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              data-testid="input-early-access-email"
            />
            <Button 
              type="submit"
              className="h-12 px-6 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
              data-testid="button-early-access"
            >
              Get Early Access
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
