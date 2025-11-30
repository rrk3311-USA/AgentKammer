import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Home, CreditCard, PiggyBank, TrendingUp, Wallet, DollarSign, Target } from "lucide-react";

function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (p && r && n) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;
      setResult({ monthly, total, interest });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="loan-principal">Loan Amount ($)</Label>
          <Input id="loan-principal" type="number" placeholder="25000" value={principal} onChange={(e) => setPrincipal(e.target.value)} data-testid="input-loan-principal" />
        </div>
        <div>
          <Label htmlFor="loan-rate">Interest Rate (%)</Label>
          <Input id="loan-rate" type="number" step="0.1" placeholder="7.5" value={rate} onChange={(e) => setRate(e.target.value)} data-testid="input-loan-rate" />
        </div>
        <div>
          <Label htmlFor="loan-years">Loan Term (Years)</Label>
          <Input id="loan-years" type="number" placeholder="5" value={years} onChange={(e) => setYears(e.target.value)} data-testid="input-loan-years" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-loan">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Monthly Payment</p>
              <p className="text-2xl font-bold text-[#d4af37]">${result.monthly.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Payment</p>
              <p className="text-2xl font-bold text-white">${result.total.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Interest</p>
              <p className="text-2xl font-bold text-red-400">${result.interest.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function MortgageAffordability() {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{ maxHome: number; maxMortgage: number; monthlyPayment: number } | null>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income) / 12;
    const monthlyDebt = parseFloat(debt) || 0;
    const down = parseFloat(downPayment) || 0;
    const r = (parseFloat(rate) || 7) / 100 / 12;
    const n = 30 * 12;
    
    const maxMonthlyPayment = (monthlyIncome * 0.28) - monthlyDebt;
    const maxMortgage = maxMonthlyPayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    const maxHome = maxMortgage + down;
    
    setResult({ maxHome, maxMortgage, monthlyPayment: maxMonthlyPayment });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="mortgage-income">Annual Income ($)</Label>
          <Input id="mortgage-income" type="number" placeholder="85000" value={income} onChange={(e) => setIncome(e.target.value)} data-testid="input-mortgage-income" />
        </div>
        <div>
          <Label htmlFor="mortgage-debt">Monthly Debt ($)</Label>
          <Input id="mortgage-debt" type="number" placeholder="500" value={debt} onChange={(e) => setDebt(e.target.value)} data-testid="input-mortgage-debt" />
        </div>
        <div>
          <Label htmlFor="mortgage-down">Down Payment ($)</Label>
          <Input id="mortgage-down" type="number" placeholder="50000" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} data-testid="input-mortgage-down" />
        </div>
        <div>
          <Label htmlFor="mortgage-rate">Interest Rate (%)</Label>
          <Input id="mortgage-rate" type="number" step="0.1" placeholder="7.0" value={rate} onChange={(e) => setRate(e.target.value)} data-testid="input-mortgage-rate" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-mortgage">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Max Home Price</p>
              <p className="text-2xl font-bold text-[#d4af37]">${result.maxHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Max Mortgage</p>
              <p className="text-2xl font-bold text-white">${result.maxMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Monthly Payment</p>
              <p className="text-2xl font-bold text-green-400">${result.monthlyPayment.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function CreditCardPayoff() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [payment, setPayment] = useState("");
  const [result, setResult] = useState<{ months: number; totalInterest: number; totalPaid: number } | null>(null);

  const calculate = () => {
    const b = parseFloat(balance);
    const r = parseFloat(apr) / 100 / 12;
    const p = parseFloat(payment);
    
    if (b && r && p && p > b * r) {
      const months = Math.ceil(-Math.log(1 - (b * r) / p) / Math.log(1 + r));
      const totalPaid = p * months;
      const totalInterest = totalPaid - b;
      setResult({ months, totalInterest, totalPaid });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="cc-balance">Current Balance ($)</Label>
          <Input id="cc-balance" type="number" placeholder="5000" value={balance} onChange={(e) => setBalance(e.target.value)} data-testid="input-cc-balance" />
        </div>
        <div>
          <Label htmlFor="cc-apr">APR (%)</Label>
          <Input id="cc-apr" type="number" step="0.1" placeholder="22.99" value={apr} onChange={(e) => setApr(e.target.value)} data-testid="input-cc-apr" />
        </div>
        <div>
          <Label htmlFor="cc-payment">Monthly Payment ($)</Label>
          <Input id="cc-payment" type="number" placeholder="200" value={payment} onChange={(e) => setPayment(e.target.value)} data-testid="input-cc-payment" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-cc">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Months to Pay Off</p>
              <p className="text-2xl font-bold text-[#d4af37]">{result.months} months</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Interest</p>
              <p className="text-2xl font-bold text-red-400">${result.totalInterest.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Paid</p>
              <p className="text-2xl font-bold text-white">${result.totalPaid.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function DebtToIncomeCalculator() {
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [carPayment, setCarPayment] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [otherDebt, setOtherDebt] = useState("");
  const [result, setResult] = useState<{ dti: number; status: string; color: string } | null>(null);

  const calculate = () => {
    const monthlyIncome = parseFloat(income) / 12;
    const totalDebt = (parseFloat(housing) || 0) + (parseFloat(carPayment) || 0) + (parseFloat(creditCards) || 0) + (parseFloat(otherDebt) || 0);
    
    if (monthlyIncome > 0) {
      const dti = (totalDebt / monthlyIncome) * 100;
      let status = "Excellent";
      let color = "text-green-400";
      if (dti > 43) { status = "High Risk"; color = "text-red-400"; }
      else if (dti > 36) { status = "Concerning"; color = "text-orange-400"; }
      else if (dti > 28) { status = "Good"; color = "text-yellow-400"; }
      setResult({ dti, status, color });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="dti-income">Annual Income ($)</Label>
          <Input id="dti-income" type="number" placeholder="75000" value={income} onChange={(e) => setIncome(e.target.value)} data-testid="input-dti-income" />
        </div>
        <div>
          <Label htmlFor="dti-housing">Housing Payment ($)</Label>
          <Input id="dti-housing" type="number" placeholder="1500" value={housing} onChange={(e) => setHousing(e.target.value)} data-testid="input-dti-housing" />
        </div>
        <div>
          <Label htmlFor="dti-car">Car Payment ($)</Label>
          <Input id="dti-car" type="number" placeholder="400" value={carPayment} onChange={(e) => setCarPayment(e.target.value)} data-testid="input-dti-car" />
        </div>
        <div>
          <Label htmlFor="dti-cc">Credit Cards ($)</Label>
          <Input id="dti-cc" type="number" placeholder="200" value={creditCards} onChange={(e) => setCreditCards(e.target.value)} data-testid="input-dti-cc" />
        </div>
        <div>
          <Label htmlFor="dti-other">Other Debt ($)</Label>
          <Input id="dti-other" type="number" placeholder="100" value={otherDebt} onChange={(e) => setOtherDebt(e.target.value)} data-testid="input-dti-other" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-dti">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Debt-to-Income Ratio</p>
              <p className="text-2xl font-bold text-[#d4af37]">{result.dti.toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Status</p>
              <p className={`text-2xl font-bold ${result.color}`}>{result.status}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState("");
  const [months, setMonths] = useState("6");
  const [currentSavings, setCurrentSavings] = useState("");
  const [result, setResult] = useState<{ target: number; needed: number; progress: number } | null>(null);

  const calculate = () => {
    const exp = parseFloat(expenses);
    const m = parseFloat(months);
    const current = parseFloat(currentSavings) || 0;
    
    if (exp && m) {
      const target = exp * m;
      const needed = Math.max(0, target - current);
      const progress = Math.min(100, (current / target) * 100);
      setResult({ target, needed, progress });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="ef-expenses">Monthly Expenses ($)</Label>
          <Input id="ef-expenses" type="number" placeholder="4000" value={expenses} onChange={(e) => setExpenses(e.target.value)} data-testid="input-ef-expenses" />
        </div>
        <div>
          <Label htmlFor="ef-months">Months to Cover</Label>
          <Input id="ef-months" type="number" placeholder="6" value={months} onChange={(e) => setMonths(e.target.value)} data-testid="input-ef-months" />
        </div>
        <div>
          <Label htmlFor="ef-current">Current Savings ($)</Label>
          <Input id="ef-current" type="number" placeholder="10000" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} data-testid="input-ef-current" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-ef">Calculate</Button>
      {result && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#0f1d32] border-[#d4af37]/30">
              <CardContent className="pt-4">
                <p className="text-sm text-white/60">Target Fund</p>
                <p className="text-2xl font-bold text-[#d4af37]">${result.target.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0f1d32] border-[#d4af37]/30">
              <CardContent className="pt-4">
                <p className="text-sm text-white/60">Still Needed</p>
                <p className="text-2xl font-bold text-white">${result.needed.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0f1d32] border-[#d4af37]/30">
              <CardContent className="pt-4">
                <p className="text-sm text-white/60">Progress</p>
                <p className="text-2xl font-bold text-green-400">{result.progress.toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>
          <div className="w-full bg-[#1a2a42] rounded-full h-4">
            <div className="bg-[#d4af37] h-4 rounded-full transition-all" style={{ width: `${result.progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContrib, setMonthlyContrib] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<{ futureValue: number; totalContributions: number; earnings: number } | null>(null);

  const calculate = () => {
    const years = parseFloat(retireAge) - parseFloat(currentAge);
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContrib) || 0;
    const r = (parseFloat(returnRate) || 7) / 100 / 12;
    const n = years * 12;
    
    if (years > 0) {
      const futureValueCurrent = current * Math.pow(1 + r, n);
      const futureValueContrib = monthly * ((Math.pow(1 + r, n) - 1) / r);
      const futureValue = futureValueCurrent + futureValueContrib;
      const totalContributions = current + (monthly * n);
      const earnings = futureValue - totalContributions;
      setResult({ futureValue, totalContributions, earnings });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="ret-current-age">Current Age</Label>
          <Input id="ret-current-age" type="number" placeholder="30" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} data-testid="input-ret-current-age" />
        </div>
        <div>
          <Label htmlFor="ret-retire-age">Retirement Age</Label>
          <Input id="ret-retire-age" type="number" placeholder="65" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} data-testid="input-ret-retire-age" />
        </div>
        <div>
          <Label htmlFor="ret-savings">Current Savings ($)</Label>
          <Input id="ret-savings" type="number" placeholder="50000" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} data-testid="input-ret-savings" />
        </div>
        <div>
          <Label htmlFor="ret-monthly">Monthly Contribution ($)</Label>
          <Input id="ret-monthly" type="number" placeholder="500" value={monthlyContrib} onChange={(e) => setMonthlyContrib(e.target.value)} data-testid="input-ret-monthly" />
        </div>
        <div>
          <Label htmlFor="ret-return">Expected Return (%)</Label>
          <Input id="ret-return" type="number" step="0.1" placeholder="7" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} data-testid="input-ret-return" />
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-ret">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Retirement Savings</p>
              <p className="text-2xl font-bold text-[#d4af37]">${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Your Contributions</p>
              <p className="text-2xl font-bold text-white">${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Investment Earnings</p>
              <p className="text-2xl font-bold text-green-400">${result.earnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function NetWorthCalculator() {
  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [property, setProperty] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [mortgage, setMortgage] = useState("");
  const [loans, setLoans] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [result, setResult] = useState<{ assets: number; liabilities: number; netWorth: number } | null>(null);

  const calculate = () => {
    const assets = (parseFloat(cash) || 0) + (parseFloat(investments) || 0) + (parseFloat(property) || 0) + (parseFloat(vehicles) || 0);
    const liabilities = (parseFloat(mortgage) || 0) + (parseFloat(loans) || 0) + (parseFloat(creditCards) || 0);
    const netWorth = assets - liabilities;
    setResult({ assets, liabilities, netWorth });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-white mb-3">Assets</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="nw-cash">Cash & Savings ($)</Label>
              <Input id="nw-cash" type="number" placeholder="25000" value={cash} onChange={(e) => setCash(e.target.value)} data-testid="input-nw-cash" />
            </div>
            <div>
              <Label htmlFor="nw-investments">Investments & Retirement ($)</Label>
              <Input id="nw-investments" type="number" placeholder="150000" value={investments} onChange={(e) => setInvestments(e.target.value)} data-testid="input-nw-investments" />
            </div>
            <div>
              <Label htmlFor="nw-property">Property Value ($)</Label>
              <Input id="nw-property" type="number" placeholder="400000" value={property} onChange={(e) => setProperty(e.target.value)} data-testid="input-nw-property" />
            </div>
            <div>
              <Label htmlFor="nw-vehicles">Vehicles ($)</Label>
              <Input id="nw-vehicles" type="number" placeholder="35000" value={vehicles} onChange={(e) => setVehicles(e.target.value)} data-testid="input-nw-vehicles" />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-white mb-3">Liabilities</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="nw-mortgage">Mortgage Balance ($)</Label>
              <Input id="nw-mortgage" type="number" placeholder="280000" value={mortgage} onChange={(e) => setMortgage(e.target.value)} data-testid="input-nw-mortgage" />
            </div>
            <div>
              <Label htmlFor="nw-loans">Other Loans ($)</Label>
              <Input id="nw-loans" type="number" placeholder="15000" value={loans} onChange={(e) => setLoans(e.target.value)} data-testid="input-nw-loans" />
            </div>
            <div>
              <Label htmlFor="nw-cc">Credit Card Debt ($)</Label>
              <Input id="nw-cc" type="number" placeholder="5000" value={creditCards} onChange={(e) => setCreditCards(e.target.value)} data-testid="input-nw-cc" />
            </div>
          </div>
        </div>
      </div>
      <Button onClick={calculate} className="bg-[#d4af37] hover:bg-[#c19b2f] text-black" data-testid="button-calculate-nw">Calculate</Button>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-[#0f1d32] border-green-500/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Assets</p>
              <p className="text-2xl font-bold text-green-400">${result.assets.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-red-500/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-400">${result.liabilities.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1d32] border-[#d4af37]/30">
            <CardContent className="pt-4">
              <p className="text-sm text-white/60">Net Worth</p>
              <p className={`text-2xl font-bold ${result.netWorth >= 0 ? 'text-[#d4af37]' : 'text-red-400'}`}>
                ${result.netWorth.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

const tools = [
  { id: "loan", label: "Loan Calculator", icon: DollarSign, component: LoanCalculator, description: "Calculate monthly payments for personal loans" },
  { id: "mortgage", label: "Mortgage Affordability", icon: Home, component: MortgageAffordability, description: "Find out how much home you can afford" },
  { id: "creditcard", label: "Credit Card Payoff", icon: CreditCard, component: CreditCardPayoff, description: "Plan your credit card debt payoff" },
  { id: "dti", label: "Debt-to-Income", icon: TrendingUp, component: DebtToIncomeCalculator, description: "Check your debt-to-income ratio" },
  { id: "emergency", label: "Emergency Fund", icon: PiggyBank, component: EmergencyFundCalculator, description: "Calculate your emergency fund goal" },
  { id: "retirement", label: "Retirement", icon: Target, component: RetirementCalculator, description: "Project your retirement savings" },
  { id: "networth", label: "Net Worth", icon: Wallet, component: NetWorthCalculator, description: "Calculate your total net worth" },
];

export default function FreeTools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-[#d4af37]" />
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white">Free Financial Tools</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Powerful calculators to help you make smarter financial decisions. No signup required.
          </p>
        </div>

        <Tabs defaultValue="loan" className="space-y-8">
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-[#1a2a42] border border-[#d4af37]/30 p-1.5 inline-flex gap-1 flex-wrap justify-center w-full">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <TabsTrigger
                    key={tool.id}
                    value={tool.id}
                    className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black gap-2 whitespace-nowrap"
                    data-testid={`tab-tool-${tool.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {tools.map((tool) => {
            const Component = tool.component;
            return (
              <TabsContent key={tool.id} value={tool.id}>
                <Card className="bg-[#1a2a42]/50 border-[#d4af37]/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <tool.icon className="h-5 w-5 text-[#d4af37]" />
                      {tool.label}
                    </CardTitle>
                    <CardDescription className="text-white/60">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Component />
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
