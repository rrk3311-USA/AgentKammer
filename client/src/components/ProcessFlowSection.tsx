import { Card } from "@/components/ui/card";
import { Shield, User, TrendingUp, Users, ArrowRight, Lock, DollarSign, Briefcase } from "lucide-react";

export function ProcessFlowSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#f4d03f] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
            How Our Process is <span className="text-[#d4af37]">Different</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Traditional real estate puts you at a disadvantage. Our encrypted platform flips the power dynamic—brokers compete for your business.
          </p>
        </div>

        {/* Process Flow - Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-6 mb-12">
          {/* Step 1: Client */}
          <div className="flex-1">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 h-full hover-elevate">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center mb-6 shadow-xl">
                  <User className="h-10 w-10 text-black" />
                </div>
                <div className="text-6xl font-bold text-[#d4af37] mb-2">1</div>
                <h3 className="font-serif text-2xl font-semibold mb-3">You</h3>
                <p className="text-white/70 text-sm">
                  Start your luxury property search with complete privacy and control
                </p>
              </div>
            </Card>
          </div>

          {/* Arrow */}
          <ArrowRight className="h-8 w-8 text-[#d4af37] shrink-0" />

          {/* Step 2: Encrypted Trust Layer */}
          <div className="flex-1">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 h-full hover-elevate">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 shadow-xl">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="text-6xl font-bold text-purple-400 mb-2">2</div>
                <h3 className="font-serif text-2xl font-semibold mb-3">Encrypted Trust Layer</h3>
                <p className="text-white/70 text-sm mb-4">
                  Your identity protected through NFT entity structure
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full">
                  <Lock className="h-3 w-3" />
                  <span>Blockchain Privacy</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Arrow */}
          <ArrowRight className="h-8 w-8 text-[#d4af37] shrink-0" />

          {/* Step 3: Bidding Profile */}
          <div className="flex-1">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 h-full hover-elevate">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-xl">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="text-6xl font-bold text-emerald-400 mb-2">3</div>
                <h3 className="font-serif text-2xl font-semibold mb-3">Bidding Profile</h3>
                <p className="text-white/70 text-sm mb-4">
                  We create your leverage profile with all buying power
                </p>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-between text-xs bg-emerald-500/20 px-3 py-1.5 rounded">
                    <span className="text-white/60">Cash Available</span>
                    <span className="text-emerald-300 font-semibold">$2.5M</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-emerald-500/20 px-3 py-1.5 rounded">
                    <span className="text-white/60">Buying Power</span>
                    <span className="text-emerald-300 font-semibold">$8.5M</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Arrow */}
          <ArrowRight className="h-8 w-8 text-[#d4af37] shrink-0" />

          {/* Step 4: Brokers Compete */}
          <div className="flex-1">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 h-full hover-elevate">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center mb-6 shadow-xl">
                  <Users className="h-10 w-10 text-black" />
                </div>
                <div className="text-6xl font-bold text-[#d4af37] mb-2">4</div>
                <h3 className="font-serif text-2xl font-semibold mb-3">Brokers Compete</h3>
                <p className="text-white/70 text-sm mb-4">
                  Agents submit their best funding options and compete for you
                </p>
                <div className="flex items-center gap-2 text-xs text-[#d4af37] bg-[#d4af37]/20 px-3 py-1.5 rounded-full">
                  <Briefcase className="h-3 w-3" />
                  <span>Reverse Auction</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Process Flow - Mobile */}
        <div className="lg:hidden space-y-6 mb-12">
          {/* Step 1 */}
          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shrink-0 shadow-xl">
                  <User className="h-8 w-8 text-black" />
                </div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-[#d4af37] mb-1">1</div>
                  <h3 className="font-serif text-xl font-semibold mb-2">You</h3>
                  <p className="text-white/70 text-sm">
                    Start your luxury property search with complete privacy and control
                  </p>
                </div>
              </div>
            </Card>
            <div className="flex justify-center my-3">
              <ArrowRight className="h-6 w-6 text-[#d4af37] rotate-90" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-purple-400 mb-1">2</div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Encrypted Trust Layer</h3>
                  <p className="text-white/70 text-sm mb-3">
                    Your identity protected through NFT entity structure
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full w-fit">
                    <Lock className="h-3 w-3" />
                    <span>Blockchain Privacy</span>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex justify-center my-3">
              <ArrowRight className="h-6 w-6 text-[#d4af37] rotate-90" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-emerald-400 mb-1">3</div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Bidding Profile</h3>
                  <p className="text-white/70 text-sm mb-3">
                    We create your leverage profile with all buying power
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs bg-emerald-500/20 px-3 py-1.5 rounded">
                      <span className="text-white/60">Cash Available</span>
                      <span className="text-emerald-300 font-semibold">$2.5M</span>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-emerald-500/20 px-3 py-1.5 rounded">
                      <span className="text-white/60">Buying Power</span>
                      <span className="text-emerald-300 font-semibold">$8.5M</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex justify-center my-3">
              <ArrowRight className="h-6 w-6 text-[#d4af37] rotate-90" />
            </div>
          </div>

          {/* Step 4 */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] flex items-center justify-center shrink-0 shadow-xl">
                <Users className="h-8 w-8 text-black" />
              </div>
              <div className="flex-1">
                <div className="text-4xl font-bold text-[#d4af37] mb-1">4</div>
                <h3 className="font-serif text-xl font-semibold mb-2">Brokers Compete</h3>
                <p className="text-white/70 text-sm mb-3">
                  Agents submit their best funding options and compete for you
                </p>
                <div className="flex items-center gap-2 text-xs text-[#d4af37] bg-[#d4af37]/20 px-3 py-1.5 rounded-full w-fit">
                  <Briefcase className="h-3 w-3" />
                  <span>Reverse Auction</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-[#d4af37]/20 to-[#f4d03f]/20 backdrop-blur-lg border-[#d4af37]/30 p-8 max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold mb-3">
              The Power is Yours
            </h3>
            <p className="text-white/80 mb-6">
              Stop chasing brokers. Let them compete for the privilege of representing you. Your privacy protected, your leverage maximized, your options unlimited.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-[#d4af37]" />
                <span>Complete Privacy</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full">
                <DollarSign className="h-4 w-4 text-[#d4af37]" />
                <span>Maximum Leverage</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-[#d4af37]" />
                <span>Best Funding</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
