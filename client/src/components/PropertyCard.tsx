import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Bed, Bath, Maximize, MapPin, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HappyDocIcon } from "./HappyDocIcon";

interface PropertyCardProps {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  daysOnMarket?: number;
  dealScore?: number;
}

export function PropertyCard({
  id,
  image,
  price,
  title,
  address,
  beds,
  baths,
  sqft,
  propertyType,
  daysOnMarket,
  dealScore,
}: PropertyCardProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [email, setEmail] = useState("");

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log(`Property ${id} ${!isFavorite ? "added to" : "removed from"} favorites`);
  };

  const handleViewDetails = () => {
    console.log(`View details for property ${id}`);
  };

  const handleGetReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowReportDialog(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Report requested for property ${id} to email: ${email}`);
    toast({
      title: "Report Requested!",
      description: "Your comprehensive market analysis PDF will be sent to your email shortly.",
    });
    setShowReportDialog(false);
    setEmail("");
  };

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer group shadow-xl hover:shadow-2xl" data-testid={`card-property-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        
        {/* Favorite Button - Top Right */}
        <div className="absolute top-4 right-4 backdrop-blur-md bg-background/80 rounded-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            data-testid={`button-favorite-${id}`}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
          </Button>
        </div>

        {/* Unified Glassmorphism Info Module - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="backdrop-blur-xl bg-white/85 dark:bg-black/75 rounded-2xl p-4 border border-white/20 shadow-2xl">
            {/* Price - 75% Larger */}
            <div className="mb-3">
              <span className="font-serif text-3xl font-bold text-foreground">
                {formatPrice(price)}
              </span>
            </div>

            {/* Title & Address */}
            <div className="mb-3">
              <h3 className="font-serif text-base font-semibold mb-1 line-clamp-1 text-foreground">
                {title}
              </h3>
              <div className="flex items-start gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span className="text-xs line-clamp-1">{address}</span>
              </div>
            </div>

            {/* Property Details & Badges Row */}
            <div className="flex items-center justify-between gap-3">
              {/* Beds/Baths/SqFt */}
              <div className="flex items-center gap-2 text-xs text-foreground/90">
                <div className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{beds}</span>
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1">
                  <Bath className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{baths}</span>
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1">
                  <Maximize className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs">{sqft.toLocaleString()}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Badge variant="secondary" className="text-xs px-2 py-0.5 h-auto">
                  {propertyType}
                </Badge>
                {daysOnMarket && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5 h-auto flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {daysOnMarket}d
                  </Badge>
                )}
                {dealScore && (
                  <Badge variant="default" className="text-xs px-2 py-0.5 h-auto flex items-center gap-1 bg-primary/90">
                    <TrendingUp className="h-3 w-3" />
                    {dealScore}/10
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-foreground/10">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-full text-xs h-8"
                onClick={handleViewDetails}
                data-testid={`button-view-details-${id}`}
              >
                View Details
              </Button>
              <Button
                variant="default"
                size="sm"
                className="rounded-full text-black h-8 px-3"
                onClick={handleGetReport}
                data-testid={`button-get-report-${id}`}
              >
                <HappyDocIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Get Market Analysis Report</DialogTitle>
            <DialogDescription>
              Receive a comprehensive PDF with pricing trends, comparable sales, and expert insights for {title}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email-report">Email Address</Label>
              <Input
                id="email-report"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email-report"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-black"
              data-testid="button-submit-report"
            >
              <HappyDocIcon className="mr-2 h-4 w-4" />
              Send Me the Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
