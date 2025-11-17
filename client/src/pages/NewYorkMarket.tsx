import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, MapPin, ArrowUpRight, Activity } from "lucide-react";
import { MarketReportDownload } from "@/components/MarketReportDownload";

export default function NewYorkMarket() {
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
                NYC Luxury Market Dashboard
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
                <h2 className="text-2xl font-serif font-semibold mb-1">Balanced Market - Seller Advantage</h2>
                <p className="text-muted-foreground">
                  Q1 2025: Strong seller conditions with 4th consecutive quarter of growth
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-base px-4 py-2 bg-background/50">
              36% Sold Above List
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
                +12%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$1.175M</h3>
            <p className="text-sm text-muted-foreground">Manhattan Median Price</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-sales-volume">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +39%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$6.05B</h3>
            <p className="text-sm text-muted-foreground">Manhattan Sales Volume</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-days-on-market">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                Fast
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">42-69</h3>
            <p className="text-sm text-muted-foreground">Days on Market</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-luxury-sales">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +37%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$10.3M</h3>
            <p className="text-sm text-muted-foreground">Avg Luxury Price</p>
          </Card>
        </div>

        {/* Highest Yielding Neighborhoods */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Highest Yielding Manhattan Neighborhoods 2025</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-tribeca">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">TriBeCa</h3>
                  <p className="text-muted-foreground">Luxury Lofts • Waterfront</p>
                </div>
                <Badge className="bg-[#d4af37] text-black text-lg px-4 py-2">4.5% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Median Price</p>
                  <p className="text-xl font-semibold">$3.77M - $4.15M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">Steady</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Strong appreciation + rental yields. Celebrity appeal, high-net-worth tenants, established prestige.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-east-village">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">East Village</h3>
                  <p className="text-muted-foreground">Bohemian • Diverse</p>
                </div>
                <Badge className="bg-[#d4af37] text-black text-lg px-4 py-2">4.5% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Type</p>
                  <p className="text-xl font-semibold">Strong Rental</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vibe</p>
                  <p className="text-xl font-semibold">Cultural Hub</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Bohemian vibe with diverse culture. Strong rental demand from young professionals and creatives.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-lower-east-side">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Lower East Side</h3>
                  <p className="text-muted-foreground">Trendy • Cultural Heritage</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">4.4% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Demographics</p>
                  <p className="text-xl font-semibold">Young Professionals</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Character</p>
                  <p className="text-xl font-semibold">Historic + Modern</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Young professionals attracted to trendy dining, nightlife, and cultural heritage sites.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-chelsea">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Chelsea</h3>
                  <p className="text-muted-foreground">Artistic Hub • High Line</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">4.2% Yield</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Features</p>
                  <p className="text-xl font-semibold">Art Galleries</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Proximity</p>
                  <p className="text-xl font-semibold">High Line Park</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Artistic neighborhood with luxury condos. High Line proximity and gallery district appeal.
              </p>
            </Card>
          </div>
        </section>

        {/* Top Luxury Neighborhoods */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Most Expensive NYC Neighborhoods</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Rank</th>
                    <th className="text-left p-4 font-semibold">Neighborhood</th>
                    <th className="text-left p-4 font-semibold">Borough</th>
                    <th className="text-left p-4 font-semibold">Median Price</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover-elevate" data-testid="row-hudson-yards">
                    <td className="p-4">
                      <Badge className="bg-[#d4af37] text-black">#1</Badge>
                    </td>
                    <td className="p-4 font-semibold">Hudson Yards</td>
                    <td className="p-4">Manhattan</td>
                    <td className="p-4 font-semibold text-lg">$4.99M - $5.95M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400">Modern Luxury</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-tribeca">
                    <td className="p-4">
                      <Badge variant="outline">#2</Badge>
                    </td>
                    <td className="p-4 font-semibold">TriBeCa</td>
                    <td className="p-4">Manhattan</td>
                    <td className="p-4 font-semibold text-lg">$3.77M - $4.15M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">Established Prestige</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-soho">
                    <td className="p-4">
                      <Badge variant="outline">#3</Badge>
                    </td>
                    <td className="p-4 font-semibold">SoHo</td>
                    <td className="p-4">Manhattan</td>
                    <td className="p-4 font-semibold text-lg">$3.36M - $3.69M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400">Historic Lofts</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-cobble-hill">
                    <td className="p-4">
                      <Badge variant="outline">#4</Badge>
                    </td>
                    <td className="p-4 font-semibold">Cobble Hill</td>
                    <td className="p-4">Brooklyn</td>
                    <td className="p-4 font-semibold text-lg">$2.28M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-teal-500/10 text-teal-700 dark:text-teal-400">+24% Growth</Badge>
                    </td>
                  </tr>
                  <tr className="hover-elevate" data-testid="row-dumbo">
                    <td className="p-4">
                      <Badge variant="outline">#5</Badge>
                    </td>
                    <td className="p-4 font-semibold">DUMBO</td>
                    <td className="p-4">Brooklyn</td>
                    <td className="p-4 font-semibold text-lg">Premium</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Waterfront Views</Badge>
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
              <p className="text-4xl font-bold mb-2">20-30%</p>
              <p className="text-muted-foreground mb-4">Cumulative Growth 2025-2030</p>
              <p className="text-sm text-muted-foreground">
                Supply scarcity, Wall Street wealth, international buyers driving sustained appreciation.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-serif font-semibold">Annual Appreciation</h3>
              </div>
              <p className="text-4xl font-bold mb-2">4-5%</p>
              <p className="text-muted-foreground mb-4">Sustained Annual Growth</p>
              <p className="text-sm text-muted-foreground">
                Manhattan core (TriBeCa, SoHo, UES) and Brooklyn waterfront lead projections.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-serif font-semibold">Cash Buyers</h3>
              </div>
              <p className="text-4xl font-bold mb-2">90%</p>
              <p className="text-muted-foreground mb-4">Of Luxury Closings</p>
              <p className="text-sm text-muted-foreground">
                All-cash purchases dominate $10M+ market. Wealth transfer creating new buyer pool.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <h3 className="text-2xl font-serif font-semibold mb-4">Top Growth Neighborhoods (2025-2030)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">TriBeCa (10013)</p>
                <p className="text-sm text-muted-foreground">Strong appreciation</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">SoHo (10012)</p>
                <p className="text-sm text-muted-foreground">Above-average growth</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Brooklyn Heights</p>
                <p className="text-sm text-muted-foreground">Family-driven demand</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">DUMBO (11201)</p>
                <p className="text-sm text-muted-foreground">High appreciation</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Borough Comparison */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Borough Performance Comparison</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Manhattan</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$1.175M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">YoY Growth</span>
                  <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Closings</span>
                  <span className="font-semibold">+14%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                All demand indicators improved for 4th consecutive quarter. Best Q1 growth in 3 years.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Brooklyn</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$1.1M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">YoY Growth</span>
                  <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +7.6%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Above-Ask Sales</span>
                  <span className="font-semibold">33.5%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Seller's haven with 99.7% sale-to-list ratio. Waterfront properties commanding premiums.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Home className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Queens</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Inventory Growth</span>
                  <Badge className="bg-purple-500/10 text-purple-700 dark:text-purple-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +14.9%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Type</span>
                  <span className="font-semibold">Entry Point</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rental Yield</span>
                  <span className="font-semibold">4-5.5%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Co-op comeback underway. Long Island City offers luxury condos with high yields.
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
                <h4 className="font-semibold">Seller Advantages</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>36% of homes sold above list price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Active listings down 9% YoY citywide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Luxury sales ($10M+) surged 37%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Fast sales velocity at 42-69 days</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Buyer Opportunities</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Inventory up 11.2% in some markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Mortgage rates stabilizing at 6.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>More time for due diligence vs 2021</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Mid-market ($1-3M) offers negotiation room</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-[#d4af37]" />
                <h4 className="font-semibold">Investment Strategies</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Rental income: TriBeCa, East Village (4.5%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Appreciation: Central Park South, TriBeCa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Value + growth: Long Island City, Cobble Hill</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>90% of luxury closings are all-cash</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Download Market Report */}
        <MarketReportDownload market="nyc" marketName="New York City" />

        {/* Footer Note */}
        <Card className="p-6 mt-8 bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Data Sources:</strong> Corcoran, Robert DeFalco Realty, REBNY, PropertyShark, StreetEasy • 
            <strong> Last Updated:</strong> Q1 2025
          </p>
        </Card>
      </div>
    </div>
  );
}
