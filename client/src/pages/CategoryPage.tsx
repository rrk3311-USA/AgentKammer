import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import * as LucideIcons from "lucide-react";
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
  Home,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
  ExternalLink,
  Brain,
  Zap,
  Wifi,
  Plane,
  UtensilsCrossed,
  Briefcase,
  ShieldCheck,
  Clock,
  Award,
  Crown
} from "lucide-react";
import { SUBCATEGORIES, SAMPLE_OFFERS, type ProductOffer, calculateMatchScore, getMatchExplanation } from "@shared/productOffers";
import { StrategicCardMatching } from "@/components/StrategicCardMatching";
import investingHeroImage from "@assets/generated_images/golden_sunrise_over_financial_district_skyline.png";
import creditCardsHeroImage from "@assets/generated_images/tropical_resort_infinity_pool_at_golden_hour.png";

function CreditCardVisual({ offer }: { offer: ProductOffer }) {
  const IconComponent = offer.issuerIcon ? (LucideIcons as any)[offer.issuerIcon] : CreditCard;
  const gradientClasses = offer.cardColor || 'from-slate-700 via-slate-600 to-slate-800';
  
  return (
    <div className={`relative w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br ${gradientClasses} p-4 shadow-xl overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded" />
          <Wifi className="h-5 w-5 text-white/60 rotate-90" />
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wider mb-0.5">Cardholder</p>
            <p className="text-white text-xs font-medium truncate max-w-[120px]">{offer.name.split(' ')[0]}</p>
          </div>
          {IconComponent && (
            <div className="flex items-center gap-1">
              <IconComponent className="h-6 w-6 text-white/80" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BankAccountVisual({ offer }: { offer: ProductOffer }) {
  const IconComponent = offer.issuerIcon ? (LucideIcons as any)[offer.issuerIcon] : Landmark;
  const gradientClasses = offer.cardColor || 'from-emerald-600 via-emerald-500 to-teal-600';
  
  return (
    <div className={`relative w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br ${gradientClasses} p-4 shadow-xl overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-2 right-2 h-px bg-white/30" />
        <div className="absolute top-4 left-2 right-2 h-px bg-white/20" />
        <div className="absolute top-6 left-2 right-2 h-px bg-white/10" />
      </div>
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {IconComponent && (
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-white" />
            </div>
          )}
          <div className="text-right">
            <p className="text-white/60 text-[10px] uppercase tracking-wider">APY</p>
            <p className="text-white text-sm font-bold">{offer.apr || 'High Yield'}</p>
          </div>
        </div>
        
        <div>
          <p className="text-white/60 text-[10px] uppercase tracking-wider mb-0.5">Account</p>
          <p className="text-white text-xs font-medium truncate">{offer.name.split(' ').slice(0, 2).join(' ')}</p>
        </div>
      </div>
    </div>
  );
}

function BonusCardVisual({ offer }: { offer: ProductOffer }) {
  const IconComponent = offer.issuerIcon ? (LucideIcons as any)[offer.issuerIcon] : Gift;
  const gradientClasses = offer.cardColor || 'from-blue-700 via-blue-600 to-cyan-600';
  const bonusAmount = offer.signupBonus?.replace(/[^0-9]/g, '') || '300';
  
  return (
    <div className={`relative w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br ${gradientClasses} p-6 shadow-xl overflow-hidden`}>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div className="relative h-full flex flex-col justify-between">
        {/* Top: Icon */}
        <div className="flex justify-end">
          {IconComponent && (
            <IconComponent className="h-8 w-8 text-white/70" />
          )}
        </div>
        
        {/* Center-Bottom: Large Bonus Amount */}
        <div className="flex flex-col items-start">
          <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Get a bonus</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white leading-none">${bonusAmount}</span>
          </div>
          <p className="text-white/80 text-xs mt-2 max-w-[85%] leading-tight pb-1">{offer.name}</p>
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  categoryId: string;
}

const CATEGORY_CONFIG: Record<string, {
  name: string;
  icon: any;
  description: string;
  heroGradient: string;
  heroImage?: string;
}> = {
  'credit-cards': {
    name: 'Credit Cards',
    icon: CreditCard,
    description: 'AI-matched credit cards based on your profile, spending habits, and financial goals',
    heroGradient: 'from-blue-600 to-indigo-700',
    heroImage: creditCardsHeroImage,
  },
  'personal-loans': {
    name: 'Personal Loans',
    icon: Wallet,
    description: 'Compare lenders for debt consolidation, emergency funds, and lower APRs',
    heroGradient: 'from-green-600 to-emerald-700',
  },
  'business-funding': {
    name: 'Business Funding',
    icon: Building2,
    description: 'Business loans, lines of credit, merchant funding, and startup capital',
    heroGradient: 'from-purple-600 to-violet-700',
  },
  'banking': {
    name: 'Banking',
    icon: Landmark,
    description: 'High-yield savings, checking accounts, and cash management tools',
    heroGradient: 'from-cyan-600 to-teal-700',
  },
  'insurance': {
    name: 'Insurance',
    icon: Shield,
    description: 'Compare auto, home, life, and other insurance quotes',
    heroGradient: 'from-orange-600 to-amber-700',
  },
  'investing': {
    name: 'Investing',
    icon: TrendingUp,
    description: 'Brokerages, robo-advisors, and long-term wealth building tools',
    heroGradient: 'from-rose-600 to-pink-700',
    heroImage: investingHeroImage,
  },
  'credit-builder': {
    name: 'Credit Builder',
    icon: Target,
    description: 'Build or rebuild your credit score with specialized products',
    heroGradient: 'from-yellow-600 to-orange-700',
  },
  'student-finance': {
    name: 'Student Finance',
    icon: GraduationCap,
    description: 'Student loans, refinancing, and banking for students',
    heroGradient: 'from-indigo-600 to-purple-700',
  },
  'tax-tools': {
    name: 'Tax Tools',
    icon: Calculator,
    description: 'Free and paid tax filing solutions',
    heroGradient: 'from-slate-600 to-gray-700',
  },
  'identity-security': {
    name: 'Identity & Security',
    icon: Lock,
    description: 'Identity protection and credit monitoring services',
    heroGradient: 'from-red-600 to-rose-700',
  },
  'budgeting-apps': {
    name: 'Budgeting Apps',
    icon: PieChart,
    description: 'Budgeting, bill negotiation, and money management tools',
    heroGradient: 'from-teal-600 to-cyan-700',
  },
  'rewards-cashback': {
    name: 'Rewards & Cashback',
    icon: Gift,
    description: 'Cashback apps, rewards programs, and survey earnings',
    heroGradient: 'from-pink-600 to-fuchsia-700',
  },
};

const REAL_ESTATE_ACCORDION_CONTENT: Record<string, Array<{ title: string; points: string[] }>> = {
  buying: [
    {
      title: "1) Buy-Side Strategy Session",
      points: [
        "Define budget range, timing, neighborhoods, and property type.",
        "Build a purchase plan with financing checkpoints and offer rules.",
        "Set clear non-negotiables so decisions stay fast and objective.",
      ],
    },
    {
      title: "2) Pre-Approval and Financing Setup",
      points: [
        "Compare lender options and rate structures before touring heavily.",
        "Stress-test monthly payment, reserves, and closing-cost scenarios.",
        "Align loan type to your hold period and risk profile.",
      ],
    },
    {
      title: "3) Property Search and Opportunity Filter",
      points: [
        "Prioritize listings by upside, downside risk, and resale liquidity.",
        "Track price changes and time-on-market to spot leverage.",
        "Focus tours on high-conviction targets only.",
      ],
    },
    {
      title: "4) Offer Positioning and Negotiation",
      points: [
        "Structure offer terms to improve acceptance odds without overpaying.",
        "Use comps, inspection posture, and timeline to gain leverage.",
        "Negotiate credits/repairs where they improve long-term economics.",
      ],
    },
    {
      title: "5) Contract-to-Close Execution",
      points: [
        "Coordinate inspections, attorney review, lender conditions, and appraisal.",
        "Keep all milestones on schedule to protect terms and close date.",
        "Final walk-through and settlement checks before funding.",
      ],
    },
  ],
  selling: [
    {
      title: "1) Pricing and Positioning Blueprint",
      points: [
        "Set list-price strategy from comps, demand pockets, and timing.",
        "Balance speed vs. premium outcome with scenario planning.",
        "Define the ideal buyer profile and message upfront.",
      ],
    },
    {
      title: "2) Pre-List Preparation",
      points: [
        "Prioritize repairs, staging, and presentation upgrades by ROI.",
        "Prepare photography/video package and launch assets.",
        "Remove friction points that weaken offers later.",
      ],
    },
    {
      title: "3) Launch and Demand Generation",
      points: [
        "Coordinate listing release timing for maximum early momentum.",
        "Drive qualified traffic through agent network and targeted exposure.",
        "Monitor showing feedback and adjust quickly.",
      ],
    },
    {
      title: "4) Offer Management and Negotiation",
      points: [
        "Compare offers by certainty, net proceeds, and timeline risk.",
        "Use counter strategy to improve both price and terms.",
        "Control contingency risk before accepting.",
      ],
    },
    {
      title: "5) Contract-to-Close Risk Control",
      points: [
        "Manage inspections, appraisal risk, and buyer financing milestones.",
        "Coordinate attorney/title/closing logistics to avoid slippage.",
        "Protect net outcome through final settlement review.",
      ],
    },
  ],
};

function ProductCard({ offer }: { offer: ProductOffer }) {
  const matchScore = calculateMatchScore(offer);
  const explanation = getMatchExplanation(offer, matchScore);
  const isCreditCard = offer.category === 'credit-cards';
  const isBanking = offer.category === 'banking';
  const isInstantRewards = offer.category === 'investing' && offer.subcategory === 'Instant Rewards';
  const hasVisual = isCreditCard || isBanking || isInstantRewards;
  
  return (
    <Card className="p-4 hover-elevate" data-testid={`card-offer-${offer.id}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Product Visual */}
        {hasVisual && (
          <div className="lg:w-40 flex-shrink-0">
            {isCreditCard && <CreditCardVisual offer={offer} />}
            {isBanking && <BankAccountVisual offer={offer} />}
            {isInstantRewards && <BonusCardVisual offer={offer} />}
          </div>
        )}
        
        {/* Center: Product Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3 gap-4">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-0.5">{offer.name}</h3>
              <Badge variant="outline" className="text-xs">{offer.subcategory}</Badge>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-xl font-bold ${matchScore >= 90 ? 'text-green-600 dark:text-green-400' : matchScore >= 80 ? 'text-[#d4af37]' : 'text-muted-foreground'}`}>
                {matchScore}%
              </div>
              <span className="text-xs text-muted-foreground">Match</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{offer.description}</p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {offer.apr && (
              <div>
                <p className="text-xs text-muted-foreground">APR</p>
                <p className="font-semibold text-xs">{offer.apr}</p>
              </div>
            )}
            {offer.annualFee && (
              <div>
                <p className="text-xs text-muted-foreground">Annual Fee</p>
                <p className="font-semibold text-xs">{offer.annualFee}</p>
              </div>
            )}
            {offer.signupBonus && (
              <div>
                <p className="text-xs text-muted-foreground">Bonus</p>
                <p className="font-semibold text-xs text-[#d4af37]">{offer.signupBonus}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#d4af37] text-[#d4af37]" />
                <span className="font-semibold text-xs">{offer.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-1">
            {offer.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: AI Match Explanation */}
        <div className="lg:w-48 flex flex-col">
          <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg p-3 mb-3 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="h-3 w-3 text-[#d4af37]" />
              <span className="text-xs font-semibold text-[#d4af37]">AI Analysis</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-3">{explanation}</p>
          </div>
          
          <Button 
            size="sm"
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
            data-testid={`button-apply-${offer.id}`}
          >
            Apply Now <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function CategoryPage({ categoryId }: CategoryPageProps) {
  const config = CATEGORY_CONFIG[categoryId];
  const subcategories = SUBCATEGORIES[categoryId] || [];
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCreditCategory, setSelectedCreditCategory] = useState<string | null>(null);
  
  const creditCategories = [
    { id: 'credit-enhancement', label: 'Credit Enhancement', icon: Star },
    { id: 'credit-repair', label: 'Credit Repair', icon: Target },
    { id: 'credit-consolidation', label: 'Credit Consolidation', icon: TrendingUp },
    { id: 'cash-back', label: 'Cash Back Cards', icon: Gift },
    { id: 'travel-rewards', label: 'Travel Rewards', icon: Plane },
    { id: 'business', label: 'Business Cards', icon: Briefcase },
    { id: 'secured', label: 'Secured Cards', icon: Lock },
    { id: 'balance-transfer', label: 'Balance Transfer', icon: ArrowRight },
    { id: 'no-fee', label: 'No Annual Fee', icon: Zap },
    { id: 'airline', label: 'Airline Cards', icon: Plane },
    { id: 'student', label: 'Student Cards', icon: GraduationCap },
    { id: 'premium', label: 'Premium Cards', icon: Crown }
  ];

  const getCreditsCategory = (offerName: string): string | null => {
    const name = offerName.toLowerCase();
    if (name.includes('no annual') || name.includes('premium') || name.includes('elite') || name.includes('signature')) {
      return 'credit-enhancement';
    }
    if (name.includes('secured') || name.includes('starter') || name.includes('fresh')) {
      return 'credit-repair';
    }
    if (name.includes('consolidation') || name.includes('balance') || name.includes('transfer')) {
      return 'credit-consolidation';
    }
    return null;
  };
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const IconComponent = config.icon;
  
  const offers = SAMPLE_OFFERS.filter(offer => offer.category === categoryId);
  const filteredOffers = activeTab === 'All' 
    ? offers 
    : offers.filter(offer => offer.subcategory === activeTab);
  const accordionContent = REAL_ESTATE_ACCORDION_CONTENT[categoryId] || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className={`relative pt-16 pb-32 lg:pt-20 lg:pb-40 flex items-start justify-center`}
        style={config.heroImage ? {
          backgroundImage: `url(${config.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '320px'
        } : { minHeight: '320px' }}
      >
        {config.heroImage ? (
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/35 to-black/40" />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${config.heroGradient}`} />
        )}
        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{config.name}</h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">{config.description}</p>
        </div>
      </section>

      {/* Credit Cards Strategy Recap Section */}
      {categoryId === 'credit-cards' && (
        <section className="bg-gradient-to-b from-slate-950 to-[#0a1628] py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
              {/* Header */}
              <div className="text-center mb-10">
                <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-4">
                  The Agent Kammer Advantage
                </Badge>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  <span className="block">We Did the Research.</span>
                  <span className="block" style={{ color: "#d4af37" }}>You Get the Rewards.</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Stop spending hours comparing fine print. We analyze 100+ cards so you can focus on booking your next adventure.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <Plane className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Airport Lounge Access</h3>
                  <p className="text-white/60 text-sm">
                    Skip the crowds. Priority Pass, Centurion Lounges, Delta Sky Clubs—we match cards with the lounges that matter to YOU.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                    <UtensilsCrossed className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Dining & Hotel Credits</h3>
                  <p className="text-white/60 text-sm">
                    $200 airline credits. $300 dining credits. Elite hotel status. Hidden perks that pay for annual fees—automatically surfaced.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Travel Protections</h3>
                  <p className="text-white/60 text-sm">
                    Trip delay insurance. Lost baggage coverage. Rental car protection. We break down which cards actually protect you.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Perfect Timing Strategy</h3>
                  <p className="text-white/60 text-sm">
                    Apply for the right card before your big trip. Hit minimum spend naturally. Maximize bonus categories when they matter.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-rose-500/20 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-rose-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Points Maximization</h3>
                  <p className="text-white/60 text-sm">
                    Transfer partners. Redemption sweet spots. Turn 85K points into a $7K flight. We show you the playbook.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Research Masked for You</h3>
                  <p className="text-white/60 text-sm">
                    No more spreadsheets. No more blogs. Our AI distills thousands of data points into one clear recommendation.
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 rounded-xl p-6 border border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-[#d4af37] font-semibold text-lg">Ready for your personalized card strategy?</p>
                  <p className="text-white/60 text-sm">Tell us your goals. We'll do the rest.</p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90 h-11 px-6 flex-shrink-0"
                  data-testid="button-get-card-strategy"
                >
                  Get My Card Strategy <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Strategic Card Matching - for credit cards */}
      {categoryId === 'credit-cards' && <StrategicCardMatching />}

      {/* Divider */}
      <div className="bg-[#0a1628] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
        </div>
      </div>
      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Credit Cards Category Grid with Gold Radial Icons */}
          {categoryId === 'credit-cards' && offers.length > 0 && (
            <div className="mb-16">
              <div className="mb-8">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">Find your card</p>
                <h3 className="text-white text-xl lg:text-2xl font-semibold">Filter by your needs</h3>
              </div>
              
              {/* Subcategory Icons with Gold Radial Gradient (Matching Category Design) */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {[
                  { id: 'travel', label: 'Travel Rewards', icon: Plane },
                  { id: 'cashback', label: 'Cash Back', icon: Wallet },
                  { id: 'business', label: 'Business', icon: Briefcase }
                ].map((subcat) => {
                  const SubIcon = subcat.icon;
                  const isSelected = selectedCreditCategory === subcat.id;
                  
                  return (
                    <button
                      key={subcat.id}
                      onClick={() => setSelectedCreditCategory(
                        isSelected ? null : subcat.id
                      )}
                      className={`group flex flex-col items-center gap-3 transition-all ${
                        isSelected ? 'scale-105' : 'hover:scale-105'
                      }`}
                      data-testid={`button-subcategory-${subcat.id}`}
                    >
                      <div 
                        className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0a1628]' 
                            : 'group-hover:ring-1 group-hover:ring-[#d4af37]/50'
                        }`}
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
                          border: '2px solid rgba(212,175,55,0.3)'
                        }}
                      >
                        <SubIcon 
                          className="h-8 w-8"
                          style={{
                            color: '#d4af37',
                            filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))'
                          }}
                        />
                      </div>
                      <span className={`text-sm font-semibold text-center leading-tight transition-colors ${
                        isSelected ? 'text-[#d4af37]' : 'text-white/80 group-hover:text-[#d4af37]'
                      }`}>
                        {subcat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Credit Cards Consolidated View */}
          {categoryId === 'credit-cards' && offers.length > 0 ? (
            <div>
              {selectedCreditCategory && (
                <div className="mb-8">
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-4">
                    Matching Cards in this Category:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {offers.filter(o => getCreditsCategory(o.name) === selectedCreditCategory).map((offer) => (
                      <button 
                        key={offer.id}
                        className="px-3 py-1.5 rounded-md bg-[#d4af37] text-[#0a1628] font-semibold text-xs hover-elevate active-elevate-2 transition-all"
                        data-testid={`button-card-${offer.id}`}
                      >
                        {offer.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sign Up CTA */}
              <div className="text-center">
                <Card className="inline-block p-8 bg-[#d4af37]/5 border-[#d4af37]/20">
                  <h3 className="font-serif text-xl font-semibold mb-2 text-[#ffffff]">Ready to Apply?</h3>
                  <p className="mb-6 text-[#ffffff] max-w-md">
                    Get matched with the best credit cards for your needs
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
                    data-testid="button-signup-credit-cards"
                  >
                    Sign Up Now
                  </Button>
                </Card>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs for other categories */}
              {subcategories.length > 0 && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
                    <TabsTrigger 
                      value="All"
                      className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#0a1628] rounded-full px-4 py-2"
                      data-testid="tab-all"
                    >
                      All
                    </TabsTrigger>
                    {subcategories.map((sub) => (
                      <TabsTrigger 
                        key={sub}
                        value={sub}
                        className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#0a1628] rounded-full px-4 py-2"
                        data-testid={`tab-${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {sub}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              )}
              
              {/* Buying/Selling detailed accordion content */}
              {accordionContent.length > 0 ? (
                <Card className="border-white/10 bg-white/[0.03] p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {categoryId === "buying" ? "Buying Process, Simplified" : "Selling Process, Simplified"}
                    </h3>
                    <p className="text-white/70 text-sm">
                      A structured step-by-step framework so you can move with clarity and control.
                    </p>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {accordionContent.map((section, idx) => (
                      <AccordionItem
                        key={section.title}
                        value={`section-${idx}`}
                        className="border-b border-white/10"
                      >
                        <AccordionTrigger className="text-left text-white hover:text-[#d4af37]">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {section.points.map((point) => (
                              <li key={point} className="flex items-start gap-2 text-sm text-white/80">
                                <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#d4af37] shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              ) : (
                /* Products Grid */
                <div className="space-y-6">
                  {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                      <ProductCard key={offer.id} offer={offer} />
                    ))
                  ) : (
                    <Card className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">No Offers Found</h3>
                      <p className="text-muted-foreground mb-6">
                        We're adding more {config.name.toLowerCase()} offers soon. Check back later or explore other categories.
                      </p>
                      <Link href="/">
                        <Button variant="outline">Browse All Categories</Button>
                      </Link>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
