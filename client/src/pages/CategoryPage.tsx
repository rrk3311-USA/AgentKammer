import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wifi
} from "lucide-react";
import { SUBCATEGORIES, SAMPLE_OFFERS, type ProductOffer, calculateMatchScore, getMatchExplanation } from "@shared/productOffers";
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

function ProductCard({ offer }: { offer: ProductOffer }) {
  const matchScore = calculateMatchScore(offer);
  const explanation = getMatchExplanation(offer, matchScore);
  const isCreditCard = offer.category === 'credit-cards';
  const isBanking = offer.category === 'banking';
  const hasVisual = isCreditCard || isBanking;
  
  return (
    <Card className="p-6 hover-elevate" data-testid={`card-offer-${offer.id}`}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Visual */}
        {hasVisual && (
          <div className="lg:w-48 flex-shrink-0">
            {isCreditCard && <CreditCardVisual offer={offer} />}
            {isBanking && <BankAccountVisual offer={offer} />}
          </div>
        )}
        
        {/* Center: Product Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <h3 className="font-serif text-xl font-semibold mb-1">{offer.name}</h3>
              <Badge variant="outline" className="text-xs">{offer.subcategory}</Badge>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-2xl font-bold ${matchScore >= 90 ? 'text-green-600 dark:text-green-400' : matchScore >= 80 ? 'text-[#d4af37]' : 'text-muted-foreground'}`}>
                {matchScore}%
              </div>
              <span className="text-xs text-muted-foreground">Match</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">{offer.description}</p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {offer.apr && (
              <div>
                <p className="text-xs text-muted-foreground">APR</p>
                <p className="font-semibold text-sm">{offer.apr}</p>
              </div>
            )}
            {offer.annualFee && (
              <div>
                <p className="text-xs text-muted-foreground">Annual Fee</p>
                <p className="font-semibold text-sm">{offer.annualFee}</p>
              </div>
            )}
            {offer.signupBonus && (
              <div>
                <p className="text-xs text-muted-foreground">Bonus</p>
                <p className="font-semibold text-sm text-[#d4af37]">{offer.signupBonus}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                <span className="font-semibold text-sm">{offer.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-2">
            {offer.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right: AI Match Explanation */}
        <div className="lg:w-56 flex flex-col">
          <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg p-4 mb-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-[#d4af37]" />
              <span className="text-sm font-semibold text-[#d4af37]">AI Analysis</span>
            </div>
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
            data-testid={`button-apply-${offer.id}`}
          >
            Apply Now <ExternalLink className="h-4 w-4 ml-2" />
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className={`relative pt-16 pb-32 lg:pt-20 lg:pb-40 flex items-start justify-center`}
        style={config.heroImage ? {
          backgroundImage: `url(${config.heroImage})`,
          backgroundSize: '60%',
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
        <div className="max-w-sm mx-auto px-6 relative z-10 text-center">
          <h1 className="font-serif text-xl lg:text-2xl font-bold text-white mb-1">{config.name}</h1>
          <p className="text-white/80 text-xs lg:text-sm">{config.description}</p>
        </div>
      </section>

      {/* Agentic Profile CTA */}
      <section className="bg-[#0a1628] py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                <Brain className="h-8 w-8 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-white font-serif text-2xl font-bold mb-2">Ready to find your perfect card?</h3>
                <p className="text-white/70">Start Your Agentic Profile</p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90 h-12 px-8 text-base"
              data-testid="button-build-profile"
            >
              Build Your Profile <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-[#0a1628] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Credit Cards Button Style */}
          {categoryId === 'credit-cards' && offers.length > 0 ? (
            <div className="space-y-6">
              {subcategories.map((subcategory) => {
                const subcategoryOffers = offers.filter(o => o.subcategory === subcategory);
                if (subcategoryOffers.length === 0) return null;
                
                return (
                  <div key={subcategory}>
                    <h2 className="text-xs font-bold tracking-wider uppercase text-white/70 mb-3">{subcategory}</h2>
                    <div className="flex flex-wrap gap-2">
                      {subcategoryOffers.map((offer) => (
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
                );
              })}
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
              
              {/* Products Grid */}
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
            </>
          )}
          
          {/* Bottom CTA */}
          {filteredOffers.length > 0 && (
            <div className="mt-12 text-center">
              <Card className="inline-block p-8 bg-[#d4af37]/5 border-[#d4af37]/20">
                <h3 className="font-serif text-xl font-semibold mb-2">Need Help Choosing?</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI can analyze your profile and recommend the best option for you
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a1628] font-semibold hover:opacity-90"
                  data-testid="button-get-recommendation"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Get AI Recommendation
                </Button>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
