import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Bell, 
  TrendingDown, 
  Calculator, 
  Clock, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  DollarSign,
  Percent,
  Brain,
  Mail,
  Smartphone,
  Eye,
  Target,
  Zap
} from "lucide-react";

export default function Refinancing() {
  const [currentRate, setCurrentRate] = useState("");
  const [loanBalance, setLoanBalance] = useState("");
  const [loanType, setLoanType] = useState("mortgage");
  const [showResults, setShowResults] = useState(false);

  const loanTypeData: Record<string, { avgNewRate: number; closingCostPct: number; termMonths: number }> = {
    mortgage: { avgNewRate: 6.25, closingCostPct: 2.5, termMonths: 360 },
    auto: { avgNewRate: 6.50, closingCostPct: 0, termMonths: 60 },
    student: { avgNewRate: 5.00, closingCostPct: 0, termMonths: 120 },
    personal: { avgNewRate: 9.50, closingCostPct: 1, termMonths: 60 },
  };

  const calculateSavings = () => {
    const rate = parseFloat(currentRate);
    const balance = parseFloat(loanBalance.replace(/,/g, ''));
    
    if (isNaN(rate) || isNaN(balance) || rate <= 0 || balance <= 0) {
      return null;
    }

    const data = loanTypeData[loanType];
    
    if (rate <= data.avgNewRate) {
      return {
        currentPayment: 0,
        newPayment: 0,
        monthlySavings: 0,
        closingCosts: 0,
        breakEvenMonths: 0,
        newRate: data.avgNewRate,
        worthIt: false,
        alreadyLower: true,
      };
    }

    const currentMonthlyRate = rate / 100 / 12;
    const newMonthlyRate = data.avgNewRate / 100 / 12;
    const n = data.termMonths;

    const currentPayment = balance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, n)) / (Math.pow(1 + currentMonthlyRate, n) - 1);
    const newPayment = balance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, n)) / (Math.pow(1 + newMonthlyRate, n) - 1);
    
    const monthlySavings = currentPayment - newPayment;
    const closingCosts = balance * (data.closingCostPct / 100);
    const breakEvenMonths = closingCosts > 0 && monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;
    
    return {
      currentPayment: Math.round(currentPayment),
      newPayment: Math.round(newPayment),
      monthlySavings: Math.round(monthlySavings),
      closingCosts: Math.round(closingCosts),
      breakEvenMonths,
      newRate: data.avgNewRate,
      worthIt: monthlySavings > 50 && (breakEvenMonths < 24 || closingCosts === 0),
      alreadyLower: false,
    };
  };

  const savings = showResults ? calculateSavings() : null;

  const features = [
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "Our AI agent watches market rates 24/7 so you don't have to"
    },
    {
      icon: Calculator,
      title: "Break-Even Math",
      description: "We factor in closing costs and calculate exactly when refinancing pays off"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified via text or email only when the math makes sense for you"
    },
    {
      icon: Shield,
      title: "Zero-Knowledge Bidding",
      description: "Lenders compete for your business without seeing your identity"
    }
  ];

  const loanTypes = [
    { id: "mortgage", name: "Mortgage", avgRate: "6.75%", potential: "0.5-1.5%" },
    { id: "auto", name: "Auto Loan", avgRate: "7.25%", potential: "1-2%" },
    { id: "student", name: "Student Loan", avgRate: "5.50%", potential: "0.5-1%" },
    { id: "personal", name: "Personal Loan", avgRate: "11.50%", potential: "2-4%" },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Input Your Current Loan",
      description: "Tell us your current rate, balance, and lender"
    },
    {
      step: 2,
      title: "Set Your Threshold",
      description: "Choose how much you want to save before we alert you"
    },
    {
      step: 3,
      title: "AI Monitors Markets",
      description: "Our agentic system continuously tracks rates and opportunities"
    },
    {
      step: 4,
      title: "Get Alerted When It Makes Sense",
      description: "Receive notification only when refinancing truly benefits you"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628] py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-4">
                <RefreshCw className="h-3 w-3 mr-1" />
                Rate Watch Technology
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                We Watch Rates
                <span className="block text-[#d4af37]">So You Don't Have To</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                Our AI agent continuously monitors the market and alerts you only when refinancing 
                makes mathematical sense for your specific situation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-[#d4af37] hover:bg-[#c9a227] text-[#0a1628] font-semibold gap-2" data-testid="button-activate-rate-watch">
                  <Bell className="h-5 w-5" />
                  Activate Rate Watch
                </Button>
                <Button size="lg" variant="outline" className="border-[#d4af37]/50 text-white hover:bg-[#d4af37]/10" data-testid="button-learn-more">
                  Learn How It Works
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-white/5 border-[#d4af37]/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#d4af37]" />
                    Quick Rate Check
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    See your potential savings in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/80">Loan Type</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {loanTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setLoanType(type.id)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                            loanType === type.id
                              ? 'bg-[#d4af37] text-[#0a1628] border-[#d4af37]'
                              : 'bg-white/5 text-white/80 border-white/20 hover:border-[#d4af37]/50'
                          }`}
                          data-testid={`button-loan-type-${type.id}`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white/80">Current Interest Rate (%)</Label>
                    <div className="relative mt-2">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input 
                        type="text"
                        placeholder="e.g., 7.25"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        data-testid="input-current-rate"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white/80">Loan Balance ($)</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input 
                        type="text"
                        placeholder="e.g., 250,000"
                        value={loanBalance}
                        onChange={(e) => setLoanBalance(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        data-testid="input-loan-balance"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#d4af37] hover:bg-[#c9a227] text-[#0a1628] font-semibold" 
                    data-testid="button-check-savings"
                    onClick={() => setShowResults(true)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Check My Savings Potential
                  </Button>

                  {showResults && savings && (
                    <div className="mt-4 p-4 rounded-lg bg-white/10 border border-[#d4af37]/30 space-y-3">
                      {savings.alreadyLower ? (
                        <div className="p-3 rounded bg-blue-500/20 text-blue-300 text-sm text-center">
                          <p className="font-medium">Your rate is already at or below current market rates!</p>
                          <p className="text-blue-300/70 text-xs mt-1">We'll monitor and alert you if rates drop further</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Current Payment</span>
                            <span className="text-white font-medium">${savings.currentPayment.toLocaleString()}/mo</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">New Payment ({savings.newRate}%)</span>
                            <span className="text-[#d4af37] font-medium">${savings.newPayment.toLocaleString()}/mo</span>
                          </div>
                          <div className="h-px bg-white/20" />
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Monthly Savings</span>
                            <span className="text-green-400 font-bold">${savings.monthlySavings.toLocaleString()}/mo</span>
                          </div>
                          {savings.closingCosts > 0 && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Est. Closing Costs</span>
                                <span className="text-white/80">${savings.closingCosts.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/70">Break-Even</span>
                                <span className="text-[#d4af37] font-medium">{savings.breakEvenMonths} months</span>
                              </div>
                            </>
                          )}
                          <div className={`mt-2 p-2 rounded text-center text-sm font-medium ${
                            savings.worthIt 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {savings.worthIt 
                              ? 'Refinancing likely makes sense for you!' 
                              : 'May not be worth it yet - we\'ll alert you when it is'}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {showResults && !savings && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center">
                      Please enter valid rate and balance values
                    </div>
                  )}

                  <p className="text-white/40 text-[10px] text-center mt-2">
                    Estimates based on current market averages. Actual rates may vary.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Current Market Snapshot */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Current Market Rates</h2>
            <p className="text-muted-foreground">Average rates across major lenders</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loanTypes.map((type) => (
              <Card key={type.id} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">{type.name}</p>
                  <p className="text-3xl font-bold text-[#d4af37]">{type.avgRate}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-green-600">
                    <TrendingDown className="h-3 w-3" />
                    <span className="text-xs">Potential savings: {type.potential}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Rate Watch Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Refinance Monitoring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our agentic AI does the heavy lifting, analyzing rates and calculating true savings 
              so you only act when it genuinely benefits you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent z-0" />
                )}
                <Card className="relative z-10 h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37] text-[#0a1628] flex items-center justify-center font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Rate Watch Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Our Approach Is Different
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover-elevate">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-[#d4af37]" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Break-Even Calculator Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">The Math That Matters</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Calculate Your <span className="text-[#d4af37]">Break-Even Point</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Not all refinances are worth it. Closing costs, time remaining on your loan, 
                and your future plans all factor in. Our AI calculates exactly when you'll 
                recoup your costs and start actually saving.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Closing Cost Analysis</p>
                    <p className="text-sm text-muted-foreground">We factor in all fees to show true net savings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Time-Value Calculation</p>
                    <p className="text-sm text-muted-foreground">Know exactly when you break even</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Personalized Recommendations</p>
                    <p className="text-sm text-muted-foreground">Based on your specific loan and goals</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-[#0a1628] to-[#0d1a2d] border-[#d4af37]/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-white/60 text-sm mb-1">Example Scenario</p>
                  <p className="text-white text-xl font-semibold">$350,000 Mortgage at 7.5%</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Current Monthly Payment</span>
                    <span className="text-white font-semibold">$2,447</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">New Rate (6.25%)</span>
                    <span className="text-[#d4af37] font-semibold">$2,156</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Monthly Savings</span>
                    <span className="text-green-400 font-semibold">$291/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">Estimated Closing Costs</span>
                    <span className="text-white font-semibold">$7,000</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-[#d4af37]/10 rounded-lg px-4">
                    <span className="text-[#d4af37] font-medium">Break-Even Point</span>
                    <span className="text-[#d4af37] font-bold text-xl">24 months</span>
                  </div>
                </div>
                
                <p className="text-white/50 text-xs text-center mt-6">
                  After 24 months, you save $291 every month for the life of your loan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alert Preferences */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4">Your Choice</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Notified Your Way
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose how you want to receive alerts when refinancing makes sense
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-elevate cursor-pointer border-2 hover:border-[#d4af37]/50 transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Text Alerts</h3>
                <p className="text-muted-foreground">
                  Get instant SMS notifications when opportunities arise
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate cursor-pointer border-2 hover:border-[#d4af37]/50 transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Updates</h3>
                <p className="text-muted-foreground">
                  Receive detailed reports with full savings breakdown
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0d1a2d] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 flex items-center justify-center mx-auto mb-8">
            <Zap className="h-10 w-10 text-[#d4af37]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Stop Overpaying?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of smart borrowers who let our AI watch the market for them. 
            We'll only alert you when it truly makes financial sense to refinance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#d4af37] hover:bg-[#c9a227] text-[#0a1628] font-semibold gap-2" data-testid="button-start-rate-watch">
              <Bell className="h-5 w-5" />
              Start Rate Watch Free
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-[#d4af37]/50 text-white hover:bg-[#d4af37]/10" data-testid="button-go-to-dashboard">
                <Target className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
          
          <p className="text-white/50 text-sm mt-6">
            No credit check required. Cancel anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
