import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  DollarSign,
  Users,
  TrendingUp,
  Gift,
  CreditCard,
  Wallet,
  Building2,
  Landmark,
  Shield,
  PieChart,
  Target,
  Calculator,
  Lock,
  GraduationCap,
  Home,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  BarChart3,
  Link as LinkIcon,
  Share2,
  Copy
} from "lucide-react";

const affiliateFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  socialHandle: z.string().optional(),
  platform: z.string().min(1, "Select your primary platform"),
  audienceSize: z.string().min(1, "Select your audience size"),
  niche: z.string().min(1, "Select your niche"),
  paypalEmail: z.string().email("Valid PayPal email for payouts").optional().or(z.literal("")),
});

type AffiliateFormData = z.infer<typeof affiliateFormSchema>;

const PAYOUT_TIERS = [
  {
    name: "Starter",
    color: "bg-gray-500",
    referrals: "0-20",
    commission: "30%",
    perks: ["Basic tracking dashboard", "Weekly payouts", "Email support"],
  },
  {
    name: "Growth",
    color: "bg-blue-500",
    referrals: "21-100",
    commission: "40%",
    perks: ["Priority support", "Custom referral links", "Monthly bonus pool", "Early access to new offers"],
  },
  {
    name: "Partner",
    color: "bg-[#d4af37]",
    referrals: "100+",
    commission: "50%",
    perks: ["Dedicated account manager", "Co-branded landing pages", "VIP bonus structure", "Exclusive high-payout offers"],
  },
];

const CATEGORY_PAYOUTS = [
  { category: "Credit Cards", icon: CreditCard, range: "$50 - $200", avg: "$125" },
  { category: "Personal Loans", icon: Wallet, range: "$75 - $300", avg: "$150" },
  { category: "Business Funding", icon: Building2, range: "$150 - $500", avg: "$300" },
  { category: "Banking", icon: Landmark, range: "$25 - $100", avg: "$60" },
  { category: "Insurance", icon: Shield, range: "$15 - $200", avg: "$75" },
  { category: "Investing", icon: TrendingUp, range: "$20 - $100", avg: "$50" },
  { category: "Credit Builder", icon: Target, range: "$20 - $80", avg: "$45" },
  { category: "Student Finance", icon: GraduationCap, range: "$50 - $200", avg: "$100" },
  { category: "Tax Tools", icon: Calculator, range: "$10 - $50", avg: "$25" },
  { category: "Identity Security", icon: Lock, range: "$20 - $75", avg: "$40" },
  { category: "Budgeting Apps", icon: PieChart, range: "$10 - $40", avg: "$20" },
  { category: "Rewards/Cashback", icon: Gift, range: "$5 - $30", avg: "$15" },
  { category: "Real Estate", icon: Home, range: "$200 - $800", avg: "$400" },
];

export default function AffiliateProgram() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      website: "",
      socialHandle: "",
      platform: "",
      audienceSize: "",
      niche: "",
      paypalEmail: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: AffiliateFormData) => {
      const response = await apiRequest("POST", "/api/affiliates", data);
      return response.json();
    },
    onSuccess: (data) => {
      setReferralCode(data.referralCode);
      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Welcome to the Agent Kammer Affiliate Program!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AffiliateFormData) => {
    mutation.mutate(data);
  };

  const copyReferralLink = () => {
    const link = `https://agentkammer.com/?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({ title: "Copied!", description: "Referral link copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Affiliate Program
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Earn Up to <span className="text-[#d4af37]">50% Commission</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of creators, influencers, and financial educators earning passive income 
              by recommending the best financial products to their audience.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <DollarSign className="h-5 w-5 text-[#d4af37]" />
                <span className="text-white font-medium">$50 - $800 per referral</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-[#d4af37]" />
                <span className="text-white font-medium">13 product categories</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Zap className="h-5 w-5 text-[#d4af37]" />
                <span className="text-white font-medium">Weekly payouts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="signup" data-testid="tab-signup">Apply Now</TabsTrigger>
              <TabsTrigger value="payouts" data-testid="tab-payouts">Payouts</TabsTrigger>
              <TabsTrigger value="tiers" data-testid="tab-tiers">Tiers</TabsTrigger>
            </TabsList>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <div className="max-w-2xl mx-auto">
                {isSubmitted ? (
                  <Card className="text-center p-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold mb-4">Welcome to the Team!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your application has been approved. Here's your unique referral code:
                    </p>
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                      <p className="font-mono text-2xl font-bold text-[#d4af37]">{referralCode}</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={copyReferralLink} className="gap-2" data-testid="button-copy-link">
                        <Copy className="h-4 w-4" />
                        Copy Referral Link
                      </Button>
                      <Button variant="outline" className="gap-2" data-testid="button-dashboard">
                        <BarChart3 className="h-4 w-4" />
                        View Dashboard
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-2xl">Join Our Affiliate Program</CardTitle>
                      <CardDescription>
                        Fill out the form below to apply. Approval is instant for qualified applicants.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John" {...field} data-testid="input-first-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Doe" {...field} data-testid="input-last-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 555-1234" {...field} data-testid="input-phone" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="socialHandle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Social Handle</FormLabel>
                                  <FormControl>
                                    <Input placeholder="@yourhandle" {...field} data-testid="input-social" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://yoursite.com" {...field} data-testid="input-website" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="platform"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Platform</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-platform">
                                        <SelectValue placeholder="Select platform" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="youtube">YouTube</SelectItem>
                                      <SelectItem value="tiktok">TikTok</SelectItem>
                                      <SelectItem value="instagram">Instagram</SelectItem>
                                      <SelectItem value="twitter">Twitter/X</SelectItem>
                                      <SelectItem value="blog">Blog/Website</SelectItem>
                                      <SelectItem value="podcast">Podcast</SelectItem>
                                      <SelectItem value="email">Email Newsletter</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="audienceSize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Audience Size</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-audience">
                                        <SelectValue placeholder="Select size" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="0-1000">0 - 1,000</SelectItem>
                                      <SelectItem value="1000-10000">1,000 - 10,000</SelectItem>
                                      <SelectItem value="10000-50000">10,000 - 50,000</SelectItem>
                                      <SelectItem value="50000-100000">50,000 - 100,000</SelectItem>
                                      <SelectItem value="100000+">100,000+</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="niche"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Niche</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-niche">
                                      <SelectValue placeholder="Select your niche" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="personal-finance">Personal Finance</SelectItem>
                                    <SelectItem value="investing">Investing</SelectItem>
                                    <SelectItem value="credit">Credit/Debt</SelectItem>
                                    <SelectItem value="business">Business/Entrepreneurship</SelectItem>
                                    <SelectItem value="real-estate">Real Estate</SelectItem>
                                    <SelectItem value="student">Student/Education</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="paypalEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>PayPal Email (for payouts)</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="paypal@example.com" {...field} data-testid="input-paypal" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-[#d4af37] hover:bg-[#b8962f] text-[#0a1628] font-semibold"
                            disabled={mutation.isPending}
                            data-testid="button-submit-affiliate"
                          >
                            {mutation.isPending ? "Submitting..." : "Apply Now"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Payouts Tab */}
            <TabsContent value="payouts">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl font-bold mb-4">Commission by Category</h2>
                  <p className="text-muted-foreground">
                    Earn competitive commissions across all 13 financial product categories
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CATEGORY_PAYOUTS.map((item) => (
                    <Card key={item.category} className="p-4 hover-elevate" data-testid={`card-payout-${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-[#d4af37]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.category}</h3>
                          <p className="text-[#d4af37] font-bold">{item.range}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Avg</p>
                          <p className="font-semibold">{item.avg}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    Commissions are paid weekly via PayPal or direct deposit. 
                    Higher tiers unlock better payout rates and exclusive offers.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Tiers Tab */}
            <TabsContent value="tiers">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl font-bold mb-4">Affiliate Tiers</h2>
                  <p className="text-muted-foreground">
                    Level up as you bring more referrals. Higher tiers = better commissions.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {PAYOUT_TIERS.map((tier, index) => (
                    <Card 
                      key={tier.name} 
                      className={`p-6 relative ${index === 2 ? 'border-[#d4af37] border-2' : ''}`}
                      data-testid={`card-tier-${tier.name.toLowerCase()}`}
                    >
                      {index === 2 && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0a1628]">
                          <Award className="h-3 w-3 mr-1" />
                          Best Value
                        </Badge>
                      )}
                      <div className="text-center mb-6">
                        <div className={`w-12 h-12 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold">{tier.name}</h3>
                        <p className="text-sm text-muted-foreground">{tier.referrals} referrals</p>
                      </div>
                      <div className="text-center mb-6">
                        <p className="text-4xl font-bold text-[#d4af37]">{tier.commission}</p>
                        <p className="text-sm text-muted-foreground">of base commission</p>
                      </div>
                      <ul className="space-y-3">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start earning in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LinkIcon className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Get Your Link</h3>
              <p className="text-muted-foreground text-sm">
                Sign up and receive your unique referral link and tracking dashboard
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Share Products</h3>
              <p className="text-muted-foreground text-sm">
                Recommend financial products to your audience through content or direct links
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-[#d4af37]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Earn Commission</h3>
              <p className="text-muted-foreground text-sm">
                Get paid for every approved application. Weekly payouts, no minimum threshold.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
