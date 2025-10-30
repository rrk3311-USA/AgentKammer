import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import logoImage from "@assets/ChatGPT Image Oct 30, 2025, 12_21_32 PM_1761855952032.png";

interface DigestProperty {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface EmailDigestPreviewProps {
  properties: DigestProperty[];
}

export function EmailDigestPreview({ properties }: EmailDigestPreviewProps) {
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Email Preview
          </Badge>
          <h2 className="font-serif text-4xl font-semibold mb-4">
            Your Daily Property Digest
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Receive personalized property matches delivered to your inbox every morning
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="border-b bg-card p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <img src={logoImage} alt="Agent Kammer" className="h-12" />
              <Badge variant="outline">Daily Digest</Badge>
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-2xl font-semibold mb-2">
                Good Morning!
              </h3>
              <p className="text-muted-foreground">
                We found {properties.length} new properties matching your preferences
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden" data-testid={`card-digest-${property.id}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-40 aspect-square sm:aspect-auto flex-shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h4 className="font-serif text-lg font-medium">
                        {property.title}
                      </h4>
                      <span className="font-serif text-lg font-semibold text-primary">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {property.address}
                    </p>
                    <div className="flex items-center gap-3 text-sm pt-2">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>{property.beds} bd</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>{property.baths} ba</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="h-4 w-4 text-muted-foreground" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Button
              className="w-full rounded-full"
              size="lg"
              data-testid="button-view-all-listings"
            >
              View All New Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center pt-6 border-t space-y-2">
              <p className="text-sm text-muted-foreground">
                Manage your search preferences or unsubscribe
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="link-email-preferences">
                  Email Preferences
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="link-unsubscribe">
                  Unsubscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
