import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  CreditCard, 
  Building2, 
  TrendingUp,
  ArrowRight,
  Brain,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";
import { AgenticEngineVisual } from "@/components/AgenticEngineVisual";

const SECTION_CLASSES = "py-20 px-6";
const CONTAINER_CLASSES = "max-w-5xl mx-auto";
const HEADING_CLASSES = "font-serif text-3xl md:text-4xl font-bold text-white mb-4";
const SUBHEADING_CLASSES = "text-lg text-white/70 max-w-2xl mx-auto";

const CARD_STYLE = {
  background: 'linear-gradient(135deg, rgba(15,25,45,0.9) 0%, rgba(20,35,60,0.9) 100%)',
  border: '1px solid rgba(255,255,255,0.08)'
};

const categories = [
  { 
    id: 'investing', 
    name: 'Investing', 
    icon: TrendingUp, 
    desc: 'Brokerages, robo-advisors & retirement accounts',
    features: ['Fee analysis', 'Portfolio matching', 'Tax optimization']
  },
  { 
    id: 'reverse-buyer-origination', 
    name: 'Real Estate', 
    icon: Building2, 
    desc: 'Mortgage optimization & home buying concierge',
    features: ['Rate comparison', 'Lender competition', 'Closing cost analysis']
  },
  { 
    id: 'credit-cards', 
    name: 'Credit Cards', 
    icon: CreditCard, 
    desc: '100+ cards including fintech & crypto options',
    features: ['Reward maximization', 'APR matching', 'Approval likelihood']
  }
];

const steps = [
  { 
    num: '01', 
    title: 'Build Your Profile', 
    desc: 'Answer a few questions about your financial goals and preferences',
    icon: Brain
  },
  { 
    num: '02', 
    title: 'AI Analyzes Options', 
    desc: 'Our engine compares 100+ products across 14 categories',
    icon: Sparkles
  },
  { 
    num: '03', 
    title: 'Get Matched Results', 
    desc: 'Receive personalized rankings with your best options first',
    icon: Zap
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      
      {/* Hero Section */}
      <section className={SECTION_CLASSES}>
        <div className={CONTAINER_CLASSES}>
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Your AI Agent for Better{" "}
              <span className="text-[#d4af37]">Financial Outcomes</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              One profile powers personalized recommendations across credit cards, investing, real estate, and more. 
              Our AI makes financial products <span className="text-[#00d4ff]">compete for you</span>.
            </p>
          </div>

          {/* AI Engine Visual */}
          <Card 
            className="overflow-hidden border-0 rounded-2xl" 
            style={CARD_STYLE}
            data-testid="card-hero-visual"
          >
            <AgenticEngineVisual />
          </Card>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6" />

      {/* Categories Section */}
      <section className={SECTION_CLASSES} id="categories">
        <div className={CONTAINER_CLASSES}>
          <div className="text-center mb-12">
            <h2 className={HEADING_CLASSES}>Choose Your Category</h2>
            <p className={SUBHEADING_CLASSES}>
              AI-ranked products matched to your unique financial profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/${cat.id}`}>
                <Card 
                  className="h-full rounded-xl hover-elevate transition-all cursor-pointer group"
                  style={CARD_STYLE}
                  data-testid={`card-category-${cat.id}`}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)',
                        border: '1px solid rgba(212,175,55,0.3)'
                      }}
                    >
                      <cat.icon className="h-6 w-6 text-[#d4af37]" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-xl text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-white/60 mb-5">{cat.desc}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-1">
                      {cat.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#00d4ff] shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#d4af37] text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6" />

      {/* How It Works Section */}
      <section className={SECTION_CLASSES}>
        <div className={CONTAINER_CLASSES}>
          <div className="text-center mb-12">
            <h2 className={HEADING_CLASSES}>How It Works</h2>
            <p className={SUBHEADING_CLASSES}>
              Three simple steps to unlock personalized financial recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card 
                key={step.num}
                className="rounded-xl"
                style={CARD_STYLE}
                data-testid={`card-step-${step.num}`}
              >
                <div className="p-6">
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-white/20">{step.num}</span>
                    <step.icon className="h-6 w-6 text-[#00d4ff]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/60">{step.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6" />

      {/* Why Agent Kammer Section */}
      <section className={SECTION_CLASSES}>
        <div className={CONTAINER_CLASSES}>
          <div className="text-center mb-12">
            <h2 className={HEADING_CLASSES}>Why Agent Kammer</h2>
            <p className={SUBHEADING_CLASSES}>
              More options, smarter matching, better outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '100+', label: 'Products Analyzed', icon: Sparkles },
              { value: '14', label: 'Financial Categories', icon: Shield },
              { value: 'AI', label: 'Powered Matching', icon: Brain },
              { value: '24/7', label: 'Rate Monitoring', icon: Zap }
            ].map((stat) => (
              <Card 
                key={stat.label}
                className="rounded-xl text-center"
                style={CARD_STYLE}
              >
                <div className="p-6">
                  <stat.icon className="h-5 w-5 text-[#00d4ff] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison highlights */}
          <Card className="mt-8 rounded-xl" style={CARD_STYLE}>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-[#00ff88] text-sm font-medium mb-2">vs NerdWallet</div>
                  <div className="text-white/70 text-sm">2x more card options including fintech & crypto</div>
                </div>
                <div>
                  <div className="text-[#00ff88] text-sm font-medium mb-2">vs Bankrate</div>
                  <div className="text-white/70 text-sm">AI-powered matching instead of generic lists</div>
                </div>
                <div>
                  <div className="text-[#00ff88] text-sm font-medium mb-2">vs LendingClub</div>
                  <div className="text-white/70 text-sm">14 categories vs single-product focus</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />
        
        <div className={`${CONTAINER_CLASSES} relative`}>
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Build your profile and unlock personalized recommendations across all categories
            </p>
            
            <Link href="/profile">
              <Button
                size="lg"
                className="h-12 px-8 text-black font-semibold rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                }}
                data-testid="button-start-profile"
              >
                <Brain className="h-5 w-5 mr-2" />
                Start Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
