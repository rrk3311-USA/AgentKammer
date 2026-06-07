import { SavedSearchCard } from "@/components/SavedSearchCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";

export default function SavedSearches() {
  const savedSearches = [
    {
      id: "1",
      name: "Manhattan Luxury Condos",
      criteria: {
        location: "Manhattan, NY",
        priceRange: [2000000, 5000000] as [number, number],
        beds: "2+",
        propertyType: "Condo",
      },
      newListingsCount: 3,
      emailEnabled: true,
    },
    {
      id: "2",
      name: "Brooklyn Brownstones",
      criteria: {
        location: "Brooklyn Heights, Brooklyn, NY",
        priceRange: [3000000, 6000000] as [number, number],
        beds: "3+",
        propertyType: "Townhouse",
      },
      newListingsCount: 1,
      emailEnabled: true,
    },
    {
      id: "3",
      name: "Upper West Side Family Homes",
      criteria: {
        location: "Upper West Side, Manhattan, NY",
        priceRange: [1500000, 3500000] as [number, number],
        beds: "3+",
        propertyType: "Co-op",
      },
      newListingsCount: 0,
      emailEnabled: false,
    },
  ];

  const handleCreateSearch = () => {
    console.log("Create new search");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="font-serif text-4xl font-semibold mb-2">
                Your Saved Searches
              </h1>
              <p className="text-muted-foreground">
                Manage your property searches and email notifications
              </p>
            </div>
            <Button
              size="lg"
              className="rounded-full"
              onClick={handleCreateSearch}
              data-testid="button-create-search"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Search
            </Button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="secondary">
              {savedSearches.length} Active Searches
            </Badge>
            <Badge variant="outline">
              {savedSearches.reduce((acc, s) => acc + s.newListingsCount, 0)} New Listings
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {savedSearches.map((search) => (
            <SavedSearchCard key={search.id} {...search} />
          ))}

          <Card
            className="border-dashed hover-elevate active-elevate-2 cursor-pointer transition-all"
            onClick={handleCreateSearch}
            data-testid="card-create-new-search"
          >
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[320px] text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Plus className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                Create New Search
              </h3>
              <p className="text-sm text-muted-foreground">
                Set up a new property search with custom criteria and email alerts
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              How Saved Searches Work
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Your saved searches continuously monitor the market for new listings that match your criteria. 
              Enable email notifications to receive daily digests with the latest properties delivered straight to your inbox.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
              <Badge variant="outline">Automatic Updates</Badge>
              <Badge variant="outline">Daily Email Digests</Badge>
              <Badge variant="outline">Price Alerts</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
