import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, TrendingUp, MapPin, DollarSign, Home as HomeIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import reportImage from "@assets/stock_images/professional_market__a4ee88f4.jpg";

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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-3xl" />
            <img
              src={reportImage}
              alt="Market Analysis Report Preview"
              className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-serif font-semibold">Market Analysis Report</p>
                  <p className="text-xs text-muted-foreground">Comprehensive Property Insights</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Market Trends</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Neighborhood Data</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>Price Analysis</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <HomeIcon className="h-3 w-3" />
                  <span>Comparable Sales</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-4">
                Get Your Listing Report
              </h2>
              <p className="text-lg text-muted-foreground">
                Each listing includes a comprehensive market analysis deck with valuable research, pricing trends, and neighborhood insights.
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
                  <FileText className="mr-2 h-4 w-4" />
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
