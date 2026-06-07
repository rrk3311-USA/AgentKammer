import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, MapPin, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { MarketReportDownload } from "@/components/MarketReportDownload";

export default function CaliforniaMarket() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <section className="py-8 lg:py-12 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#d4af37] flex items-center justify-center">
              <Activity className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold">
                California Luxury Market Dashboard
              </h1>
              <p className="text-white/70 text-lg mt-1">
                Real-time insights, trends, and projections for Q1 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Market Condition Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-1">Balanced Market - Slight Seller Advantage</h2>
                <p className="text-muted-foreground">
                  Q1 2025: Transitioning from seller's to balanced market with improving buyer opportunities
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-base px-4 py-2 bg-background/50">
              3.5-4 Month Supply
            </Badge>
          </div>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover-elevate" data-testid="card-median-price">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +6.3%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$786,400</h3>
            <p className="text-sm text-muted-foreground">Median Home Price</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-days-on-market">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +17%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">26-53</h3>
            <p className="text-sm text-muted-foreground">Days on Market</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-sale-to-list">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                Stable
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">99.9%</h3>
            <p className="text-sm text-muted-foreground">Sale-to-List Ratio</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-inventory">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +22.8%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">3.5-4</h3>
            <p className="text-sm text-muted-foreground">Months of Inventory</p>
          </Card>
        </div>

        {/* Highest Yielding Counties */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Highest Yielding Counties 2025</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-riverside-county">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Riverside County</h3>
                  <p className="text-muted-foreground">Inland Empire • Logistics Hub</p>
                </div>
                <Badge className="bg-[#d4af37] text-[#0a1628] text-lg px-4 py-2">9% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Home Price</p>
                  <p className="text-xl font-semibold">$661,000</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rent</p>
                  <p className="text-xl font-semibold">$2,469/mo</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Highest yield among large CA counties. Manufacturing growth and coastal migration driving demand.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-santa-clara-county">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Santa Clara County</h3>
                  <p className="text-muted-foreground">Silicon Valley • Tech Hub</p>
                </div>
                <Badge className="bg-[#d4af37] text-[#0a1628] text-lg px-4 py-2">9% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Status</p>
                  <p className="text-xl font-semibold">Premium</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Appreciation</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+50% (5yr)</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                AI boom and return-to-office driving unprecedented growth. Largest luxury home market by volume.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-san-diego-county">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">San Diego County</h3>
                  <p className="text-muted-foreground">Coastal • Tourism & Military</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">5.2% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Luxury Median</p>
                  <p className="text-xl font-semibold">$3.2M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cash Buyers</p>
                  <p className="text-xl font-semibold">68%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Strong fundamentals with 8.5% annual luxury appreciation. Limited land and climate advantages.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-los-angeles-county">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Los Angeles County</h3>
                  <p className="text-muted-foreground">Entertainment • Diverse Economy</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">6% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Median Price</p>
                  <p className="text-xl font-semibold">$984,000</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Appreciation</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+9% YoY</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Luxury segment recovering post-wildfires. 4 of top 10 US luxury sales in 2025 including $110M Bel-Air estate.
              </p>
            </Card>
          </div>
        </section>

        {/* Top Luxury ZIP Codes */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Top California Luxury ZIP Codes</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">ZIP Code</th>
                    <th className="text-left p-4 font-semibold">Location</th>
                    <th className="text-left p-4 font-semibold">Median Price</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover-elevate" data-testid="row-zip-94027">
                    <td className="p-4">
                      <Badge className="bg-[#d4af37] text-[#0a1628]">#2</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">94027</td>
                    <td className="p-4">Atherton</td>
                    <td className="p-4 font-semibold text-lg">$8.33M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-primary/10">2nd Nationwide</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-zip-92657">
                    <td className="p-4">
                      <Badge variant="outline">#3</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">92657</td>
                    <td className="p-4">Newport Beach</td>
                    <td className="p-4 font-semibold text-lg">$5.72M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Orange County Coastal</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-zip-93108">
                    <td className="p-4">
                      <Badge variant="outline">#4</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">93108</td>
                    <td className="p-4">Santa Barbara</td>
                    <td className="p-4 font-semibold text-lg">$5.24M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400">Central Coast</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-zip-94970">
                    <td className="p-4">
                      <Badge variant="outline">#5</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">94970</td>
                    <td className="p-4">Stinson Beach</td>
                    <td className="p-4 font-semibold text-lg">$5.23M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-teal-500/10 text-teal-700 dark:text-teal-400">Marin Waterfront</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-zip-94022">
                    <td className="p-4">
                      <Badge variant="outline">#6</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">94022</td>
                    <td className="p-4">Los Altos</td>
                    <td className="p-4 font-semibold text-lg">$5.10M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">Silicon Valley</Badge>
                    </td>
                  </tr>
                  <tr className="hover-elevate" data-testid="row-zip-92067">
                    <td className="p-4">
                      <Badge variant="outline">#7</Badge>
                    </td>
                    <td className="p-4 font-mono font-semibold">92067</td>
                    <td className="p-4">Rancho Santa Fe</td>
                    <td className="p-4 font-semibold text-lg">$4.99M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-rose-500/10 text-rose-700 dark:text-rose-400">Estate Community</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 5-10 Year Projections */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">5-10 Year Growth Projections (2025-2030)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 bg-gradient-to-br from-[#d4af37]/10 to-[#f4d03f]/10 border-[#d4af37]/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <ArrowUpRight className="h-8 w-8 text-[#d4af37]" />
                <h3 className="text-2xl font-serif font-semibold">Luxury Market Growth</h3>
              </div>
              <p className="text-4xl font-bold mb-2">$338B</p>
              <p className="text-muted-foreground mb-4">US Luxury Market by 2030</p>
              <p className="text-sm text-muted-foreground">
                From $289B in 2024. California maintains dominance with 8 of top 10 most expensive ZIP codes.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-serif font-semibold">Annual Appreciation</h3>
              </div>
              <p className="text-4xl font-bold mb-2">3-5%</p>
              <p className="text-muted-foreground mb-4">Expected CA Luxury Growth</p>
              <p className="text-sm text-muted-foreground">
                Southern California outperforming Northern CA. Hidden markets showing 15-22% growth.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-serif font-semibold">2030 Median Price</h3>
              </div>
              <p className="text-4xl font-bold mb-2">$1.1M+</p>
              <p className="text-muted-foreground mb-4">California Statewide</p>
              <p className="text-sm text-muted-foreground">
                From $786K (2025) to $1.1M+ (2030). Coastal properties commanding premiums.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <h3 className="text-2xl font-serif font-semibold mb-4">Hidden Opportunity Markets (15-22% Annual Growth)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Montecito Canyon</p>
                <p className="text-sm text-muted-foreground">Premium compounds</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Rancho Santa Fe</p>
                <p className="text-sm text-muted-foreground">Equestrian estates</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Ojai/Santa Ynez</p>
                <p className="text-sm text-muted-foreground">Foothill properties</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Inland Empire Luxury</p>
                <p className="text-sm text-muted-foreground">30-50% below coastal</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Regional Performance */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Regional Performance Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Southern California</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Growth</span>
                  <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +4.8%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$905,790</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Condition</span>
                  <Badge variant="outline">Strong Seller's</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Orange County (+9.1%), San Diego (+8.5%), Santa Barbara (+55%) leading growth. Coastal markets experiencing sharp increases.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Bay Area</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Growth</span>
                  <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.7%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$1.3M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Luxury Sales ($2M+)</span>
                  <span className="font-semibold">24 days</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Santa Clara (+50% 5yr) and San Mateo hitting new highs. SF luxury subdued at +7.7%. Marin declining -5.7%.
              </p>
            </Card>
          </div>
        </section>

        {/* Market Indicators */}
        <section>
          <h2 className="font-serif text-3xl font-semibold mb-6">Current Market Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-semibold">Buyer Advantages</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Inventory up +22.8% YoY - more choices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Only 33% selling above asking (down from pandemic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>More time to decide - 26-53 days on market</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Seller concessions appearing for first time in years</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-semibold">Buyer Challenges</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>Only 16% can afford median CA home</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>Still seller's market at 3.5-4 months supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>Prices rising +6.3% YoY - not getting cheaper</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>Median nearly double national average</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Investment Strategies</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Cash flow: Riverside, Fresno (9%+ yields)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Appreciation: LA, San Diego (long-term wealth)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Hybrid: Napa, Santa Rosa (luxury STR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>50-68% of luxury sales ($2-10M) all-cash</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Download Market Report */}
        <MarketReportDownload market="california" marketName="California" />

        {/* Footer Note */}
        <Card className="p-6 mt-8 bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Data Sources:</strong> California Association of Realtors (C.A.R.), ManageCasa, Redfin, Compass, Norada Real Estate • 
            <strong> Last Updated:</strong> Q1 2025
          </p>
        </Card>
      </div>
    </div>
  );
}
