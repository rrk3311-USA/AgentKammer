import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, MapPin, DollarSign, Home as HomeIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import reportImage from "@assets/generated_images/Luxury_marble_desk_Manhattan_view_647cbb4e.png";
import { HappyDocIcon } from "./HappyDocIcon";

export function ListingReportSection() {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Listing report request:", { address, category });
    toast({
      title: "Report Requested!",
      description: "Your comprehensive market analysis will be sent to your email shortly.",
    });
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={reportImage}
              alt="Luxury Marble Desk with Market Reports"
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-lg rounded-xl p-5 shadow-2xl border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <HappyDocIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-lg">Market Analysis Report</p>
                  <p className="text-sm text-muted-foreground">Comprehensive Property Insights</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Market Trends</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Neighborhood Data</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>Price Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HomeIcon className="h-4 w-4 text-primary" />
                  <span>Comparable Sales</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HappyDocIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold">
                  Comprehensive Research Report
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Market analysis for every listing includes valuable research, pricing trends, and neighborhood insights.
              </p>
            </div>

            <Card className="p-6 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-address">Enter Property Address</Label>
                  <Input
                    id="report-address"
                    placeholder="123 Park Avenue, Manhattan, NY"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    data-testid="input-report-address"
                  />
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-category">Choose a Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="report-category" data-testid="select-report-category">
                      <SelectValue placeholder="Select property category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury-condos">Luxury Condos</SelectItem>
                      <SelectItem value="penthouses">Penthouses</SelectItem>
                      <SelectItem value="townhouses">Townhouses</SelectItem>
                      <SelectItem value="co-ops">Co-ops</SelectItem>
                      <SelectItem value="waterfront">Waterfront Properties</SelectItem>
                      <SelectItem value="new-development">New Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full text-black mt-6"
                  data-testid="button-request-report"
                >
                  <HappyDocIcon className="mr-2 h-4 w-4" />
                  Request Free Market Report
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Includes pricing trends, comparable sales, and expert market insights
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
