import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Mail } from "lucide-react";
import { useState } from "react";

interface SavedSearchCardProps {
  id: string;
  name: string;
  criteria: {
    location: string;
    priceRange: [number, number];
    beds: string;
    propertyType: string;
  };
  newListingsCount: number;
  emailEnabled: boolean;
}

export function SavedSearchCard({
  id,
  name,
  criteria,
  newListingsCount,
  emailEnabled: initialEmailEnabled,
}: SavedSearchCardProps) {
  const [emailEnabled, setEmailEnabled] = useState(initialEmailEnabled);

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const handleEmailToggle = (checked: boolean) => {
    setEmailEnabled(checked);
    console.log(`Email notifications ${checked ? "enabled" : "disabled"} for search ${id}`);
  };

  const handleEdit = () => {
    console.log(`Edit search ${id}`);
  };

  const handleDelete = () => {
    console.log(`Delete search ${id}`);
  };

  return (
    <Card data-testid={`card-saved-search-${id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="font-serif text-xl mb-2">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{criteria.location}</p>
          </div>
          {newListingsCount > 0 && (
            <Badge variant="default" data-testid={`badge-new-listings-${id}`}>
              {newListingsCount} New
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {formatPrice(criteria.priceRange[0])} - {formatPrice(criteria.priceRange[1])}
          </Badge>
          <Badge variant="outline">{criteria.beds} Bedrooms</Badge>
          <Badge variant="outline">{criteria.propertyType}</Badge>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`email-${id}`} className="text-sm cursor-pointer">
              Daily email digest
            </Label>
          </div>
          <Switch
            id={`email-${id}`}
            checked={emailEnabled}
            onCheckedChange={handleEmailToggle}
            data-testid={`switch-email-${id}`}
          />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleEdit}
          data-testid={`button-edit-${id}`}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleDelete}
          data-testid={`button-delete-${id}`}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
