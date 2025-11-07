import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  benefits: string[];
  rating: number;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Peak Performance Stack",
    description: "Premium nootropic blend for mental clarity and cognitive enhancement",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
    benefits: ["Enhanced focus", "Mental clarity", "Sustained energy"],
    rating: 4.9,
    inStock: true
  },
  {
    id: 2,
    name: "Adaptogen Complex",
    description: "Stress-balancing botanical blend with ashwagandha and rhodiola",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
    benefits: ["Stress resilience", "Balanced cortisol", "Mental calm"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 3,
    name: "Omega-3 Elite",
    description: "Triple-strength fish oil with high EPA/DHA for brain and heart health",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80",
    benefits: ["Brain health", "Heart support", "Anti-inflammatory"],
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "Sleep Optimization Formula",
    description: "Science-backed sleep support with magnesium, L-theanine, and apigenin",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80",
    benefits: ["Deep sleep", "Faster sleep onset", "Morning recovery"],
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    name: "Mitochondrial Energy",
    description: "Cellular energy optimizer with CoQ10, PQQ, and NAD+ precursors",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80",
    benefits: ["Cellular energy", "Longevity support", "Vitality boost"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 6,
    name: "Gut Restore Pro",
    description: "Advanced probiotic blend with 50 billion CFU and digestive enzymes",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80",
    benefits: ["Digestive health", "Immune support", "Gut-brain axis"],
    rating: 4.7,
    inStock: true
  },
  {
    id: 7,
    name: "Immune Defense Plus",
    description: "Comprehensive immune support with vitamin D3, zinc, and elderberry",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
    benefits: ["Immune strength", "Antioxidant protection", "Year-round wellness"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 8,
    name: "Collagen Peptides",
    description: "Grass-fed bovine collagen for skin, joints, and connective tissue",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    benefits: ["Skin elasticity", "Joint health", "Hair & nail strength"],
    rating: 4.9,
    inStock: true
  },
  {
    id: 9,
    name: "Lion's Mane Extract",
    description: "Pure mushroom extract for cognitive function and nerve growth factor",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&q=80",
    benefits: ["Neuroplasticity", "Memory support", "Focus enhancement"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 10,
    name: "Electrolyte Hydration",
    description: "Sugar-free electrolyte powder with essential minerals and trace elements",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1523575708161-ad0d3a3755eb?w=400&q=80",
    benefits: ["Optimal hydration", "Mineral balance", "Performance support"],
    rating: 4.7,
    inStock: true
  },
  {
    id: 11,
    name: "Longevity NAD+ Boost",
    description: "Advanced NAD+ precursor blend for cellular health and anti-aging",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&q=80",
    benefits: ["Cellular repair", "Anti-aging", "Metabolic health"],
    rating: 4.9,
    inStock: false
  },
  {
    id: 12,
    name: "Creatine Monohydrate",
    description: "Pure micronized creatine for strength, power, and cognitive performance",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80",
    benefits: ["Muscle strength", "Power output", "Brain energy"],
    rating: 4.8,
    inStock: true
  }
];

export default function WellnessShop() {
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:text-[#d4af37] -ml-2"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-3">
                Wellness Shop
              </h1>
              <p className="text-white/80 text-lg">
                Premium supplements and wellness products for peak performance
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm">
              <ShoppingCart className="h-5 w-5 text-[#d4af37]" />
              <div className="text-sm">
                <div className="font-semibold">{cart.length} Items</div>
                <div className="text-white/60 text-xs">In Cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 flex flex-col"
              data-testid={`card-product-${product.id}`}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm px-3 py-1 bg-black/80 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <Star className="h-3 w-3 fill-[#d4af37] text-[#d4af37]" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.map((benefit, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between gap-3 mt-auto">
                  <div>
                    <div className="text-2xl font-bold">
                      ${product.price}
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                    className="rounded-full text-black font-semibold"
                    data-testid={`button-add-to-cart-${product.id}`}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </>
                    ) : (
                      "Sold Out"
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-muted/30 border-y py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Questions About Our Products?
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Our wellness experts are here to help you choose the right supplements for your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="rounded-full text-black font-semibold"
              data-testid="button-contact-expert"
            >
              Contact a Wellness Expert
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full"
              data-testid="button-learn-more"
            >
              Learn More About Supplements
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
