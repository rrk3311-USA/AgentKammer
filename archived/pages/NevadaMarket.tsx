import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, MapPin, ArrowUpRight, Activity } from "lucide-react";

export default function NevadaMarket() {
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
                Nevada Luxury Market Dashboard
              </h1>
              <p className="text-white/70 text-lg mt-1">
                Real-time insights for Las Vegas, Reno, and Lake Tahoe - Q1 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Market Condition Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-1">Balanced Market - Regional Variation</h2>
                <p className="text-muted-foreground">
                  Q1 2025: Henderson cooling, Reno strong seller's market, Lake Tahoe luxury resilient
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-base px-4 py-2 bg-background/50">
              4 Month Supply
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
                +5%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$455K</h3>
            <p className="text-sm text-muted-foreground">Nevada Median Price</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-luxury-median">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                Record High
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">$1.4M</h3>
            <p className="text-sm text-muted-foreground">Las Vegas Luxury Median</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-days-on-market">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">
                Moderate
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">48-64</h3>
            <p className="text-sm text-muted-foreground">Days on Market</p>
          </Card>

          <Card className="p-6 hover-elevate" data-testid="card-inventory">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +37%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold mb-1">14,855</h3>
            <p className="text-sm text-muted-foreground">Homes for Sale</p>
          </Card>
        </div>

        {/* Las Vegas Luxury Neighborhoods */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Las Vegas Top Luxury Neighborhoods</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-summerlin">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Summerlin</h3>
                  <p className="text-muted-foreground">Master-Planned • Red Rock Access</p>
                </div>
                <Badge className="bg-[#d4af37] text-[#0a1628] text-lg px-4 py-2">Premium</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-xl font-semibold">$550K - $1M+</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Growth Driver</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">Studio Expansion</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Warner Bros $8.5B and Sony $1.8B studio developments. Professionals relocating from CA.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-henderson">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Henderson</h3>
                  <p className="text-muted-foreground">Top Schools • Low Crime</p>
                </div>
                <Badge className="bg-[#d4af37] text-[#0a1628] text-lg px-4 py-2">Premium</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Median Price</p>
                  <p className="text-xl font-semibold">$485K - $497K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Growth</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">6.1%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Green Valley and Anthem areas. 15 min to Strip. Dual-income families and executives.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-macdonald-highlands">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">MacDonald Highlands</h3>
                  <p className="text-muted-foreground">Ultra-Luxury • Custom Estates</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">Ultra-Luxury</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-xl font-semibold">$1M - $10M+</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Views</p>
                  <p className="text-xl font-semibold">Breathtaking</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Custom estates with panoramic Strip and mountain views. High-net-worth individuals.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-summit-club">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-1">Summit Club</h3>
                  <p className="text-muted-foreground">Summerlin • Ultra-Exclusive</p>
                </div>
                <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">Ultra-Luxury</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price Range</p>
                  <p className="text-xl font-semibold">$5M - $25M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Record Sale 2025</p>
                  <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">$15.75M</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Ultra-exclusive gated community. Record-breaking sales in 2025. Ultra-high-net-worth buyers.
              </p>
            </Card>
          </div>
        </section>

        {/* Regional Markets */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Regional Market Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Las Vegas</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$475K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Luxury Median</span>
                  <span className="font-semibold">$1.4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Type</span>
                  <Badge variant="outline">Balanced</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Inventory up 37% creating buyer leverage. Major studio expansions driving long-term growth.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Reno</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Median Price</span>
                  <span className="font-semibold">$542,850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">YoY Growth</span>
                  <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +9%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Months Supply</span>
                  <span className="font-semibold">1.51</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Strong seller's market. Tech hub growth and California migration driving demand.
              </p>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Lake Tahoe</h3>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Luxury Median</span>
                  <span className="font-semibold">$2.06M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ultra-Luxury</span>
                  <span className="font-semibold">$3.25M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Record Sale</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">$27.5M</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Incline Village, West Shore, Truckee. Tax advantages and lifestyle driving demand.
              </p>
            </Card>
          </div>
        </section>

        {/* Lake Tahoe Luxury Detail */}
        <section className="mb-8">
          <h2 className="font-serif text-3xl font-semibold mb-6">Lake Tahoe Luxury Markets</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Region</th>
                    <th className="text-left p-4 font-semibold">Median Price</th>
                    <th className="text-left p-4 font-semibold">YoY Change</th>
                    <th className="text-left p-4 font-semibold">Days on Market</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover-elevate" data-testid="row-incline-village">
                    <td className="p-4 font-semibold">Incline Village</td>
                    <td className="p-4 font-semibold text-lg">$2.06M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400">-24.5%</Badge>
                    </td>
                    <td className="p-4">70 days</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Tax Advantage</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-west-shore">
                    <td className="p-4 font-semibold">West Shore</td>
                    <td className="p-4 font-semibold text-lg">$3.13M (avg)</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +97%
                      </Badge>
                    </td>
                    <td className="p-4">41 days</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400">Ultra-Luxury</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="row-truckee">
                    <td className="p-4 font-semibold">Truckee/North Tahoe</td>
                    <td className="p-4 font-semibold text-lg">$1.27M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5.6%
                      </Badge>
                    </td>
                    <td className="p-4">43 days</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-teal-500/10 text-teal-700 dark:text-teal-400">Fastest Movement</Badge>
                    </td>
                  </tr>
                  <tr className="hover-elevate" data-testid="row-south-tahoe">
                    <td className="p-4 font-semibold">South Lake Tahoe</td>
                    <td className="p-4 font-semibold text-lg">$674K - $2M</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +4.2%
                      </Badge>
                    </td>
                    <td className="p-4">66 days</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">Value Play</Badge>
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
                <h3 className="text-2xl font-serif font-semibold">Lake Tahoe Luxury</h3>
              </div>
              <p className="text-4xl font-bold mb-2">12-25%</p>
              <p className="text-muted-foreground mb-4">Total Growth 2025-2030</p>
              <p className="text-sm text-muted-foreground">
                Nevada-side properties and lakefront segments will lead. Annual appreciation 2.5-5%.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-serif font-semibold">Population Growth</h3>
              </div>
              <p className="text-4xl font-bold mb-2">3M</p>
              <p className="text-muted-foreground mb-4">Clark County by 2042</p>
              <p className="text-sm text-muted-foreground">
                Up from 2.41M today. Major infrastructure and entertainment projects driving growth.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-serif font-semibold">No State Tax</h3>
              </div>
              <p className="text-4xl font-bold mb-2">0%</p>
              <p className="text-muted-foreground mb-4">Income Tax Rate</p>
              <p className="text-sm text-muted-foreground">
                Major advantage attracting high-net-worth buyers. ~0.5% property tax average.
              </p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <h3 className="text-2xl font-serif font-semibold mb-4">Major Economic Drivers (2025-2030)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Film Studios</p>
                <p className="text-sm text-muted-foreground">$10.3B investment</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Sports & Entertainment</p>
                <p className="text-sm text-muted-foreground">A's ballpark, MSG Sphere</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">High-Speed Rail</p>
                <p className="text-sm text-muted-foreground">Brightline West $2.5B</p>
              </div>
              <div className="p-4 bg-background/50 backdrop-blur rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold">Tech Hub Growth</p>
                <p className="text-sm text-muted-foreground">Reno/Tahoe corridor</p>
              </div>
            </div>
          </Card>
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
                  <span>Inventory up 22.5% YoY statewide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Henderson: 63% sold under asking (June)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>More time - 64 days average vs 56 last year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>Lake Tahoe: Correction creating entry points</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold">Seller Highlights</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Reno: 24.1% sold above asking price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Only 1.51 months supply in Reno (tight)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Lake Tahoe ultra-luxury: 98.6% sale-to-list</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">•</span>
                  <span>Strong rental demand: &lt;4% vacancy rates</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover-elevate">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="h-5 w-5 text-[#d4af37]" />
                <h4 className="font-semibold">Investment Strategies</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Cash flow: North Las Vegas (high yields)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Appreciation: Summerlin, Henderson (stable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>Luxury: Incline Village (tax advantage)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37]">•</span>
                  <span>STR: Lake Tahoe near ski resorts</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Footer Note */}
        <Card className="p-6 mt-8 bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Data Sources:</strong> Houzeo, Norada Real Estate, Dickson Realty, Tahoe Luxury Properties, Las Vegas REALTORS® • 
            <strong> Last Updated:</strong> Q1 2025
          </p>
        </Card>
      </div>
    </div>
  );
}
