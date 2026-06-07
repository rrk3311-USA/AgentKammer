import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Coins,
  Sparkles,
  ArrowRight,
  Zap,
  Star
} from "lucide-react";
import { CATEGORIES, SAMPLE_OFFERS } from "@shared/productOffers";

const iconMap: Record<string, any> = {
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
  FileText,
  Coins,
};

const categoryColors: Record<string, string> = {
  'credit-cards': 'bg-primary/10 text-primary border-primary/20',
  'personal-loans': 'bg-primary/10 text-primary border-primary/20',
  'business-funding': 'bg-primary/10 text-primary border-primary/20',
  'banking': 'bg-primary/10 text-primary border-primary/20',
  'insurance': 'bg-primary/10 text-primary border-primary/20',
  'investing': 'bg-primary/10 text-primary border-primary/20',
  'credit-builder': 'bg-primary/10 text-primary border-primary/20',
  'student-finance': 'bg-primary/10 text-primary border-primary/20',
  'renters-insurance': 'bg-primary/10 text-primary border-primary/20',
  'estate-planning': 'bg-primary/10 text-primary border-primary/20',
  'tax-tools': 'bg-primary/10 text-primary border-primary/20',
  'identity-security': 'bg-primary/10 text-primary border-primary/20',
  'budgeting-apps': 'bg-primary/10 text-primary border-primary/20',
  'rewards-cashback': 'bg-primary/10 text-primary border-primary/20',
  'micro-investing': 'bg-primary/10 text-primary border-primary/20',
  'real-estate': 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20',
};

const quickWins = [
  {
    id: 'cashback',
    title: 'Free Cashback Apps',
    description: 'Earn money back on every purchase',
    apps: ['Rakuten', 'Honey', 'Upside'],
    benefit: 'Instant rewards',
    icon: Gift,
    color: 'text-[#d4af37]',
    link: '/rewards-cashback',
  },
  {
    id: 'credit-build',
    title: 'Build Your Credit',
    description: 'No credit check required',
    apps: ['Self', 'Kikoff', 'Chime'],
    benefit: 'Fix score fast',
    icon: Target,
    color: 'text-[#d4af37]',
    link: '/credit-builder',
  },
  {
    id: 'renters',
    title: 'Renters Insurance',
    description: 'Protection from $5/month',
    apps: ['Lemonade', 'Policygenius'],
    benefit: '90-sec signup',
    icon: Shield,
    color: 'text-[#d4af37]',
    link: '/renters-insurance',
  },
  {
    id: 'micro',
    title: 'Start Investing',
    description: 'Begin with just $1',
    apps: ['Acorns', 'Stash', 'Webull'],
    benefit: 'Free stocks',
    icon: Coins,
    color: 'text-[#d4af37]',
    link: '/micro-investing',
  },
];

export default function Dashboard() {
  const allCategories = [
    ...CATEGORIES.PRIMARY,
    ...CATEGORIES.SECONDARY,
    ...CATEGORIES.SUPPORTING,
    ...CATEGORIES.FLAGSHIP,
  ];

  const getOfferCount = (categoryId: string) => {
    return SAMPLE_OFFERS.filter(o => o.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-[#d4af37]" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Financial Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore all categories and find the perfect products matched to your profile
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-xl font-semibold">Quick Wins - Start Here</h2>
            <Badge variant="secondary" className="ml-2">Free & Easy</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickWins.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.id} href={item.link}>
                  <Card className="h-full cursor-pointer hover-elevate transition-all border-2 hover:border-[#d4af37]/50" data-testid={`card-quick-win-${item.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <IconComponent className={`h-8 w-8 ${item.color}`} />
                        <Badge variant="outline" className="text-xs">
                          {item.benefit}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.apps.map((app) => (
                          <Badge key={app} variant="secondary" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-xl font-semibold">All Categories</h2>
            <Badge variant="outline" className="ml-2">{allCategories.length} Categories</Badge>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Primary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.PRIMARY.map((category) => {
                const IconComponent = iconMap[category.icon] || CreditCard;
                const colorClass = categoryColors[category.id] || 'bg-muted text-foreground';
                const offerCount = getOfferCount(category.id);
                return (
                  <Link key={category.id} href={`/${category.id}`}>
                    <Card className="h-full cursor-pointer hover-elevate transition-all" data-testid={`card-category-${category.id}`}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${colorClass}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{category.name}</h3>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
                            {offerCount > 0 && (
                              <Badge variant="secondary" className="mt-2 text-xs">{offerCount} offers</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">High Conversion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORIES.SECONDARY.map((category) => {
                const IconComponent = iconMap[category.icon] || CreditCard;
                const colorClass = categoryColors[category.id] || 'bg-muted text-foreground';
                const offerCount = getOfferCount(category.id);
                return (
                  <Link key={category.id} href={`/${category.id}`}>
                    <Card className="h-full cursor-pointer hover-elevate transition-all" data-testid={`card-category-${category.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold text-sm">{category.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                        {offerCount > 0 && (
                          <Badge variant="secondary" className="mt-2 text-xs">{offerCount} offers</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Supporting Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {CATEGORIES.SUPPORTING.map((category) => {
                const IconComponent = iconMap[category.icon] || CreditCard;
                const colorClass = categoryColors[category.id] || 'bg-muted text-foreground';
                const offerCount = getOfferCount(category.id);
                return (
                  <Link key={category.id} href={`/${category.id}`}>
                    <Card className="h-full cursor-pointer hover-elevate transition-all" data-testid={`card-category-${category.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                        {offerCount > 0 && (
                          <Badge variant="secondary" className="mt-2 text-xs">{offerCount}</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#d4af37] uppercase tracking-wide mb-3">Flagship Service</h3>
            <div className="grid grid-cols-1 gap-4">
              {CATEGORIES.FLAGSHIP.map((category) => {
                const IconComponent = iconMap[category.icon] || Home;
                return (
                  <Link key={category.id} href={`/${category.id}`}>
                    <Card className="cursor-pointer hover-elevate transition-all border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/5 to-transparent" data-testid={`card-category-${category.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg">{category.name}</h3>
                              <Badge className="bg-[#d4af37] text-black">Premium</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-[#d4af37]" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground mb-4">Need help choosing? Chat with our AI assistant</p>
          <Button 
            size="lg"
            className="bg-[#d4af37] hover:bg-[#c19b2f] text-black"
            onClick={() => {
              const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLElement;
              if (chatButton) chatButton.click();
            }}
            data-testid="button-dashboard-chat"
          >
            Talk to Agent Kammer
          </Button>
        </div>
      </div>
    </div>
  );
}
