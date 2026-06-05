import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Bell,
  Calculator,
  CheckCircle2,
  DollarSign,
  Eye,
  Mail,
  Percent,
  RefreshCw,
  Shield,
  Smartphone,
  TrendingDown,
} from "lucide-react";

export default function Refinancing() {
  const [currentRate, setCurrentRate] = useState("");
  const [loanBalance, setLoanBalance] = useState("");
  const [loanType, setLoanType] = useState("mortgage");
  const [showResults, setShowResults] = useState(false);

  const loanTypeData: Record<string, { avgNewRate: number; closingCostPct: number; termMonths: number }> = {
    mortgage: { avgNewRate: 6.25, closingCostPct: 2.5, termMonths: 360 },
    auto: { avgNewRate: 6.5, closingCostPct: 0, termMonths: 60 },
    student: { avgNewRate: 5.0, closingCostPct: 0, termMonths: 120 },
    personal: { avgNewRate: 9.5, closingCostPct: 1, termMonths: 60 },
  };

  const loanTypes = [
    { id: "mortgage", name: "Mortgage", avgRate: "6.75%", potential: "0.5-1.5%" },
    { id: "auto", name: "Auto Loan", avgRate: "7.25%", potential: "1-2%" },
    { id: "student", name: "Student Loan", avgRate: "5.50%", potential: "0.5-1%" },
    { id: "personal", name: "Personal Loan", avgRate: "11.50%", potential: "2-4%" },
  ];

  const howItWorks = [
    { step: 1, title: "Input Your Current Loan", description: "Enter your current rate and balance." },
    { step: 2, title: "Set Your Threshold", description: "Pick the savings level that matters to you." },
    { step: 3, title: "Market Monitoring", description: "We track daily market shifts for your loan type." },
    { step: 4, title: "Action Alerts", description: "You get notified when net savings are favorable." },
  ];

  const features = [
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "Our system tracks lender windows so you do not have to check rates manually.",
    },
    {
      icon: Calculator,
      title: "Break-Even Math",
      description: "Closing costs, monthly delta, and time horizon are modeled before any recommendation.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Alerts fire only when projected savings exceed your chosen threshold.",
    },
    {
      icon: Shield,
      title: "Confidential Review",
      description: "Compare options with a controlled workflow before sharing sensitive details.",
    },
  ];

  const calculateSavings = () => {
    const rate = parseFloat(currentRate);
    const balance = parseFloat(loanBalance.replace(/,/g, ""));

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

    const currentPayment =
      (balance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, n))) /
      (Math.pow(1 + currentMonthlyRate, n) - 1);
    const newPayment =
      (balance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, n))) /
      (Math.pow(1 + newMonthlyRate, n) - 1);

    const monthlySavings = currentPayment - newPayment;
    const closingCosts = balance * (data.closingCostPct / 100);
    const breakEvenMonths =
      closingCosts > 0 && monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

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

  return (
    <main className="min-h-screen bg-brand-ivory text-brand-graphite">
      <section className="relative overflow-hidden bg-brand-midnight text-brand-ivory">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.78)_45%,rgba(15,23,42,0.52)_100%)]" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-brand-champagne">
              <RefreshCw className="h-4 w-4" />
              Refinance Intelligence
            </p>
            <h1
              className="text-5xl font-semibold leading-[0.98] md:text-7xl"
              style={{ fontFamily: "Noe Display, var(--font-serif)" }}
            >
              We Watch Rates
              <span className="block">So You Move On Math</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/82">
              Track mortgage, auto, student, and personal loan opportunities in real time. You get
              alerted only when expected net savings are worth acting on.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                className="h-12 rounded-none bg-brand-sapphire px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-sapphire/90"
                data-testid="button-activate-rate-watch"
              >
                <Bell className="mr-2 h-4 w-4" />
                Activate Rate Watch
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-none border-brand-ivory/35 bg-transparent px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory hover:text-brand-midnight"
                data-testid="button-learn-more"
              >
                Learn How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border border-brand-ivory/15 bg-brand-midnight/70 p-6 text-brand-ivory shadow-xl backdrop-blur-sm">
            <h2 className="mb-1 text-2xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              Quick Rate Check
            </h2>
            <p className="mb-6 text-sm text-brand-ivory/70">
              See immediate savings potential from current market averages.
            </p>

            <div>
              <Label className="text-brand-ivory/88">Loan Type</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {loanTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setLoanType(type.id)}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      loanType === type.id
                        ? "border-brand-sapphire bg-brand-sapphire text-brand-ivory"
                        : "border-brand-ivory/25 bg-brand-ivory/5 text-brand-ivory/80 hover:border-brand-champagne/60"
                    }`}
                    data-testid={`button-loan-type-${type.id}`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-brand-ivory/88">Current Interest Rate (%)</Label>
              <div className="relative mt-2">
                <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ivory/45" />
                <Input
                  type="text"
                  placeholder="e.g., 7.25"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(e.target.value)}
                  className="border-brand-ivory/25 bg-brand-ivory/8 pl-10 text-brand-ivory placeholder:text-brand-ivory/45"
                  data-testid="input-current-rate"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-brand-ivory/88">Loan Balance ($)</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ivory/45" />
                <Input
                  type="text"
                  placeholder="e.g., 250,000"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(e.target.value)}
                  className="border-brand-ivory/25 bg-brand-ivory/8 pl-10 text-brand-ivory placeholder:text-brand-ivory/45"
                  data-testid="input-loan-balance"
                />
              </div>
            </div>

            <Button
              className="mt-5 w-full rounded-none bg-brand-sapphire text-brand-ivory hover:bg-brand-sapphire/90"
              data-testid="button-check-savings"
              onClick={() => setShowResults(true)}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Check My Savings Potential
            </Button>

            {showResults && savings && (
              <div className="mt-4 space-y-3 rounded-md border border-brand-ivory/16 bg-brand-ivory/8 p-4">
                {savings.alreadyLower ? (
                  <div className="rounded bg-brand-sapphire/20 p-3 text-center text-sm text-brand-ivory">
                    <p className="font-medium">Your rate is already at or below market estimates.</p>
                    <p className="mt-1 text-xs text-brand-ivory/72">We will alert you if rates drop further.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-ivory/72">Current Payment</span>
                      <span className="font-medium text-brand-ivory">
                        ${savings.currentPayment.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-ivory/72">New Payment ({savings.newRate}%)</span>
                      <span className="font-medium text-brand-champagne">
                        ${savings.newPayment.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="h-px bg-brand-ivory/16" />
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-ivory/72">Monthly Savings</span>
                      <span className="font-bold text-emerald-400">
                        ${savings.monthlySavings.toLocaleString()}/mo
                      </span>
                    </div>
                    {savings.closingCosts > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-brand-ivory/72">Estimated Closing Costs</span>
                          <span className="text-brand-ivory/86">${savings.closingCosts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-brand-ivory/72">Break-Even</span>
                          <span className="font-medium text-brand-champagne">
                            {savings.breakEvenMonths} months
                          </span>
                        </div>
                      </>
                    )}
                    <div
                      className={`rounded p-2 text-center text-sm font-medium ${
                        savings.worthIt
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {savings.worthIt
                        ? "Refinancing likely makes sense now."
                        : "Not worth it yet. We can alert you when it is."}
                    </div>
                  </>
                )}
              </div>
            )}

            {showResults && !savings && (
              <div className="mt-4 rounded border border-red-500/35 bg-red-500/16 p-3 text-center text-sm text-red-200">
                Please enter valid rate and balance values.
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="border-y border-brand-graphite/12 bg-brand-ivory px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-steel">
              Current Snapshot
            </p>
            <h2 className="text-4xl font-semibold text-brand-midnight" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              Market Rates by Loan Type
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {loanTypes.map((type) => (
              <Card key={type.id} className="border border-brand-graphite/10 bg-brand-ivory p-5 text-center shadow-sm">
                <p className="text-sm text-brand-steel">{type.name}</p>
                <p className="mt-1 text-3xl font-semibold text-brand-sapphire">{type.avgRate}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Potential savings: {type.potential}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-sapphire">How It Works</p>
            <h2 className="text-4xl font-semibold text-brand-midnight" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              Intelligent Refinance Monitoring
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <Card key={item.step} className="border border-brand-graphite/12 bg-brand-ivory p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-sapphire text-sm font-bold text-brand-ivory">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-brand-midnight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-graphite/70">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Rate Watch Features</p>
            <h2 className="text-4xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
              Why This Workflow Wins
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border border-brand-ivory/14 bg-brand-midnight p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-sapphire/22">
                    <Icon className="h-6 w-6 text-brand-champagne" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-ivory">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-ivory/72">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold text-brand-midnight" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
            Get Notified Your Way
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-graphite/72">
            Choose your preferred channel when refinancing becomes net-positive.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="border border-brand-graphite/12 bg-brand-ivory p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-sapphire/14">
                <Smartphone className="h-7 w-7 text-brand-sapphire" />
              </div>
              <h3 className="text-xl font-semibold text-brand-midnight">Text Alerts</h3>
              <p className="mt-2 text-sm text-brand-graphite/70">
                Instant messages when savings opportunities clear your threshold.
              </p>
            </Card>
            <Card className="border border-brand-graphite/12 bg-brand-ivory p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-sapphire/14">
                <Mail className="h-7 w-7 text-brand-sapphire" />
              </div>
              <h3 className="text-xl font-semibold text-brand-midnight">Email Briefings</h3>
              <p className="mt-2 text-sm text-brand-graphite/70">
                Detailed breakdowns with payment deltas and break-even projections.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-brand-midnight px-6 py-16 text-brand-ivory lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold" style={{ fontFamily: "Noe Display, var(--font-serif)" }}>
            Ready to Stop Overpaying?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-ivory/72">
            Let refinancing alerts run in the background and act only when the numbers are clearly in your favor.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              className="h-12 rounded-none bg-brand-sapphire px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-sapphire/90"
              data-testid="button-start-rate-watch"
            >
              <Bell className="mr-2 h-4 w-4" />
              Start Rate Watch Free
            </Button>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="h-12 rounded-none border-brand-ivory/40 bg-transparent px-7 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-ivory hover:bg-brand-ivory hover:text-brand-midnight"
                data-testid="button-go-to-dashboard"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
