import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Gift, Zap } from "lucide-react";

const perks = [
  { icon: Gift, text: "Travel Rewards", color: "#d4af37" },
  { icon: TrendingUp, text: "Cashback", color: "#d4af37" },
  { icon: Zap, text: "0% APR", color: "#d4af37" },
  { icon: Sparkles, text: "Sign-up Bonus", color: "#d4af37" },
];

const cards = [
  {
    name: "Chase Sapphire Reserve",
    rewards: "3x Travel",
    perks: ["Travel Rewards", "Cashback", "Sign-up Bonus"]
  },
  {
    name: "American Express Platinum",
    rewards: "5x Points",
    perks: ["Travel Rewards", "0% APR", "Sign-up Bonus"]
  },
  {
    name: "Capital One Venture",
    rewards: "2x All Purchases",
    perks: ["Cashback", "Travel Rewards", "Sign-up Bonus"]
  },
];

export function StrategicCardMatching() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge 
            className="mb-4 border-0" 
            style={{ 
              background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
              color: '#000',
              fontSize: '0.9rem',
              padding: '0.5rem 1rem'
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Strategic Card Matching
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
            AI-Matched Credit Cards
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Your financial profile unlocks personalized card recommendations with the best perks for you
          </p>
        </div>

        {/* Cards Grid with Animated Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, cardIdx) => (
            <div key={card.name} className="relative">
              {/* Card */}
              <Card 
                className="overflow-hidden border-0 h-full"
                style={{ 
                  background: `linear-gradient(135deg, rgba(15, 32, 55, 0.8) 0%, rgba(20, 40, 65, 0.8) 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
                data-testid={`card-strategic-${cardIdx}`}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Card Header */}
                  <div className="mb-6">
                    <h3 className="font-serif text-xl font-bold text-white mb-2">
                      {card.name}
                    </h3>
                    <div className="text-2xl font-bold text-[#d4af37]">
                      {card.rewards}
                    </div>
                  </div>

                  {/* Perks Container */}
                  <div className="flex-1 relative min-h-[200px] mb-6">
                    {/* Background glow */}
                    <div 
                      className="absolute inset-0 opacity-20 rounded-lg"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2), transparent)',
                      }}
                    />

                    {/* Flowing Perks */}
                    <div className="relative h-full flex flex-col justify-center gap-4">
                      {card.perks.map((perk, perkIdx) => {
                        const perkObj = perks.find(p => p.text === perk);
                        if (!perkObj) return null;

                        const Icon = perkObj.icon;
                        return (
                          <div
                            key={perk}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                            style={{
                              animation: `slideIn 0.8s ease-out forwards`,
                              animationDelay: `${perkIdx * 0.15}s`,
                              opacity: 0,
                            }}
                          >
                            <Icon className="h-5 w-5 flex-shrink-0" style={{ color: perkObj.color }} />
                            <span className="text-sm text-white/80 font-medium">{perk}</span>
                            {/* Animated pulse dot */}
                            <div 
                              className="ml-auto w-2 h-2 rounded-full"
                              style={{
                                background: perkObj.color,
                                animation: `pulse 2s ease-in-out infinite`,
                                animationDelay: `${perkIdx * 0.3}s`,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Match Score</span>
                      <span className="text-lg font-bold text-[#d4af37]">
                        {85 + cardIdx * 5}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)`,
                          width: `${85 + cardIdx * 5}%`,
                          animation: `expandWidth 1.2s ease-out`,
                          animationDelay: `${0.5 + cardIdx * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Decorative flow lines connecting cards */}
              {cardIdx < cards.length - 1 && (
                <div 
                  className="hidden md:block absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent"
                  style={{
                    animation: `flowRight 2s ease-in-out infinite`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
              box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
            }
            50% {
              opacity: 1;
              box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
            }
          }

          @keyframes expandWidth {
            from {
              width: 0;
            }
            to {
              width: var(--target-width, 100%);
            }
          }

          @keyframes flowRight {
            0%, 100% {
              opacity: 0.3;
              transform: translateX(0);
            }
            50% {
              opacity: 0.8;
              transform: translateX(4px);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
