import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";

const products = [
  {
    id: 1,
    price: 25,
    title: "American Ski Cabin Investment Forecast",
    description: "5-10 year projections for top US ski resort markets including Aspen, Vail, Park City, Jackson Hole, Lake Tahoe and more.",
    gradient: "from-blue-600/20 to-purple-600/20",
    borderGradient: "from-blue-400 to-purple-400"
  },
  {
    id: 2,
    price: 50,
    title: "Credit Score Optimization Blueprint",
    description: "Step-by-step guide to boost your credit score 100+ points with actionable strategies and templates.",
    gradient: "from-emerald-600/20 to-cyan-600/20",
    borderGradient: "from-emerald-400 to-cyan-400"
  },
  {
    id: 3,
    price: 100,
    title: "Investment Property Due Diligence Kit",
    description: "Comprehensive templates, checklists, and spreadsheets for evaluating real estate investment opportunities.",
    gradient: "from-amber-600/20 to-orange-600/20",
    borderGradient: "from-amber-400 to-orange-400"
  },
  {
    id: 4,
    price: 500,
    title: "Private Portfolio Analysis",
    description: "Personalized wealth assessment and investment strategy report customized to your financial goals.",
    gradient: "from-rose-600/20 to-pink-600/20",
    borderGradient: "from-rose-400 to-pink-400"
  }
];

export function DigitalProducts() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
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
            Premium Digital Resources
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">
            Instant Download Resources
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Data-driven research reports and tools designed for sophisticated investors
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden border-0 hover-elevate transition-all flex flex-col"
              style={{ 
                background: `linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(15,32,55,0.95) 100%)`
              }}
              data-testid={`card-product-${product.id}`}
            >
              {/* Gradient Header */}
              <div 
                className={`h-24 bg-gradient-to-br ${product.gradient}`}
                style={{
                  background: `linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)`
                }}
              />

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Price */}
                <div className="mb-3">
                  <div className="inline-block">
                    <Badge 
                      className="border-0"
                      style={{
                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
                        color: '#0a1628',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}
                    >
                      ${product.price}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-bold text-white mb-2 leading-tight">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/70 mb-6 flex-1">
                  {product.description}
                </p>

                {/* Instant Download Badge */}
                <div className="mb-4">
                  <Badge 
                    variant="outline"
                    className="border-[#d4af37]/50 text-[#d4af37] bg-transparent"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Instant Download
                  </Badge>
                </div>

                {/* CTA Button */}
                <Button 
                  className="gap-2 border-0 w-full"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                    color: '#000',
                    fontWeight: 600
                  }}
                  data-testid={`button-purchase-${product.id}`}
                >
                  <Download className="h-4 w-4" />
                  Download Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
