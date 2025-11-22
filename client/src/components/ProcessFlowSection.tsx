import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, User, TrendingUp, Users, Lock, DollarSign, Briefcase } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export function ProcessFlowSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "center",
    containScroll: "trimSnaps"
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const cards = [
    {
      number: 1,
      icon: User,
      iconBg: "from-[#d4af37] to-[#f4d03f]",
      iconColor: "text-black",
      numberColor: "text-[#d4af37]",
      title: "You",
      description: "Start your luxury property search with complete privacy and control",
      badge: null
    },
    {
      number: 2,
      icon: Shield,
      iconBg: "from-purple-500 to-indigo-600",
      iconColor: "text-white",
      numberColor: "text-purple-300",
      title: "Encrypted Trust Layer",
      description: "Your identity protected through Anonymous LLC structure",
      badge: {
        icon: Lock,
        text: "Blockchain Privacy",
        color: "text-purple-200 bg-purple-500/30 border-purple-400/30"
      }
    },
    {
      number: 3,
      icon: TrendingUp,
      iconBg: "from-emerald-500 to-teal-600",
      iconColor: "text-white",
      numberColor: "text-emerald-300",
      title: "Bidding Profile",
      description: "We create your leverage profile with all buying power",
      badge: null,
      stats: [
        { label: "Cash Available", value: "$2.5M", color: "text-emerald-200 bg-emerald-500/30" },
        { label: "Buying Power", value: "$8.5M", color: "text-emerald-200 bg-emerald-500/30" }
      ]
    },
    {
      number: 4,
      icon: Users,
      iconBg: "from-[#d4af37] to-[#f4d03f]",
      iconColor: "text-black",
      numberColor: "text-[#d4af37]",
      title: "Brokers Compete",
      description: "Agents submit their best funding options and compete for you",
      badge: {
        icon: Briefcase,
        text: "Reverse Auction",
        color: "text-[#d4af37] bg-[#d4af37]/30 border-[#d4af37]/30"
      }
    },
    {
      number: 5,
      icon: TrendingUp,
      iconBg: "from-[#d4af37] to-[#f4d03f]",
      iconColor: "text-black",
      numberColor: "text-[#d4af37]",
      title: "The Power is Yours",
      description: "Stop chasing brokers. Let them compete for the privilege of representing you. Your privacy protected, your leverage maximized, your options unlimited.",
      badge: null,
      features: [
        { icon: Shield, text: "Complete Privacy" },
        { icon: DollarSign, text: "Maximum Leverage" },
        { icon: TrendingUp, text: "Best Funding" }
      ]
    }
  ];

  return (
    <section className="py-8 lg:py-10 bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#f4d03f] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-2">
            How Our Process <span className="text-[#d4af37]">Differs</span>
          </h2>
          <p className="text-base lg:text-lg text-white/80 max-w-3xl mx-auto">
            Traditional real estate puts you at a disadvantage. Our encrypted platform flips the power dynamic—brokers compete for your business.
          </p>
        </div>

        {/* Swipeable Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 touch-pan-y">
              {cards.map((card, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_75%] lg:flex-[0_0_50%]"
                  data-testid={`card-process-step-${card.number}`}
                >
                  <Card 
                    className="border-white/20 p-3 shadow-xl backdrop-blur-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                      color: 'white'
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Icon + Number */}
                      <div className="flex flex-col items-center gap-0.5 shrink-0">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.iconBg} flex items-center justify-center shadow-lg`}>
                          <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                        </div>
                        <div className={`text-xl font-bold ${card.numberColor}`}>{card.number}</div>
                      </div>

                      {/* Title + Description + Extras */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base font-semibold mb-0.5 text-white">{card.title}</h3>
                        <p className="text-white/90 text-xs leading-tight mb-1.5 line-clamp-2">
                          {card.description}
                        </p>

                        {/* Badges, Stats, Features - All in horizontal row */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {card.badge && (
                            <div className={`inline-flex items-center gap-0.5 text-[10px] ${card.badge.color} px-1.5 py-0.5 rounded-full border`}>
                              <card.badge.icon className="h-2.5 w-2.5" />
                              <span className="font-medium whitespace-nowrap">{card.badge.text}</span>
                            </div>
                          )}

                          {card.stats && card.stats.map((stat, idx) => (
                            <div key={idx} className={`inline-flex items-center gap-1 text-[10px] ${stat.color} px-1.5 py-0.5 rounded-lg`}>
                              <span className="font-medium whitespace-nowrap">{stat.label}:</span>
                              <span className="text-xs font-bold">{stat.value}</span>
                            </div>
                          ))}

                          {card.features && card.features.map((feature, idx) => (
                            <div key={idx} className="inline-flex items-center gap-0.5 text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full border border-white/30">
                              <feature.icon className="h-2.5 w-2.5 text-[#d4af37]" />
                              <span className="font-medium whitespace-nowrap">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-[#d4af37] w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              data-testid={`button-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-3">
          <p className="text-white/50 text-xs">
            Swipe to navigate
          </p>
        </div>
      </div>
    </section>
  );
}
