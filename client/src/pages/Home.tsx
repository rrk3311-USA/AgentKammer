import { HeroSearch } from "@/components/HeroSearch";
import { PropertyGrid } from "@/components/PropertyGrid";
import { EmailDigestPreview } from "@/components/EmailDigestPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Heart, TrendingUp } from "lucide-react";
import property1 from "@assets/generated_images/Modern_Manhattan_condo_exterior_bdf30aa9.png";
import property2 from "@assets/generated_images/Brooklyn_brownstone_townhouse_exterior_43d55d05.png";
import property3 from "@assets/generated_images/NYC_apartment_living_space_interior_ba500d46.png";
import property4 from "@assets/generated_images/Manhattan_penthouse_rooftop_terrace_25c2682e.png";
import property5 from "@assets/generated_images/Upper_West_Side_co-op_building_1e75d246.png";

export default function Home() {
  const featuredProperties = [
    {
      id: "1",
      image: property1,
      price: 2500000,
      title: "Modern Luxury Condo",
      address: "450 West 42nd Street, Manhattan, NY 10036",
      beds: 2,
      baths: 2,
      sqft: 1450,
      propertyType: "Condo",
    },
    {
      id: "2",
      image: property2,
      price: 4200000,
      title: "Historic Brooklyn Brownstone",
      address: "125 Berkeley Place, Brooklyn, NY 11217",
      beds: 4,
      baths: 3,
      sqft: 2800,
      propertyType: "Townhouse",
    },
    {
      id: "3",
      image: property3,
      price: 1850000,
      title: "Elegant Upper West Side",
      address: "201 West 72nd Street, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1600,
      propertyType: "Co-op",
    },
    {
      id: "4",
      image: property4,
      price: 8500000,
      title: "Penthouse with Rooftop Terrace",
      address: "75 Wall Street, Manhattan, NY 10005",
      beds: 3,
      baths: 3,
      sqft: 2400,
      propertyType: "Penthouse",
    },
    {
      id: "5",
      image: property5,
      price: 3100000,
      title: "Classic Pre-War Co-op",
      address: "145 Central Park West, Manhattan, NY 10023",
      beds: 2,
      baths: 2,
      sqft: 1800,
      propertyType: "Co-op",
    },
    {
      id: "6",
      image: property1,
      price: 1950000,
      title: "Contemporary Chelsea Loft",
      address: "520 West 28th Street, Manhattan, NY 10001",
      beds: 2,
      baths: 1.5,
      sqft: 1350,
      propertyType: "Condo",
    },
  ];

  const digestProperties = [
    {
      id: "1",
      image: property1,
      price: 2500000,
      title: "Modern Luxury Condo",
      address: "450 West 42nd Street, Manhattan, NY 10036",
      beds: 2,
      baths: 2,
      sqft: 1450,
    },
    {
      id: "2",
      image: property2,
      price: 4200000,
      title: "Historic Brooklyn Brownstone",
      address: "125 Berkeley Place, Brooklyn, NY 11217",
      beds: 4,
      baths: 3,
      sqft: 2800,
    },
    {
      id: "3",
      image: property3,
      price: 1850000,
      title: "Elegant Upper West Side",
      address: "201 West 72nd Street, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1600,
    },
  ];

  const benefits = [
    {
      icon: Search,
      title: "Personalized Search",
      description: "Set your preferences and let us find properties that match your exact criteria",
    },
    {
      icon: Mail,
      title: "Daily Digest",
      description: "Receive curated property matches delivered to your inbox every morning",
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep track of properties you love and get notified of price changes",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access real-time data and trends from NYC's most dynamic neighborhoods",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSearch />

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Featured Listings
            </Badge>
            <h2 className="font-serif text-4xl font-semibold mb-4">
              Latest Luxury Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked exceptional homes in New York's most sought-after neighborhoods
            </p>
          </div>
          <PropertyGrid properties={featuredProperties} />
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full" data-testid="button-view-all-properties">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Why Choose Agent Kammer
            </Badge>
            <h2 className="font-serif text-4xl font-semibold mb-4">
              Your NYC Real Estate Partner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center" data-testid={`card-benefit-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <EmailDigestPreview properties={digestProperties} />

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of New Yorkers who trust Agent Kammer to find their perfect property
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full px-8"
            data-testid="button-get-started"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
