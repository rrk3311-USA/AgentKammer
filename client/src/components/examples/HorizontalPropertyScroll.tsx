import { HorizontalPropertyScroll } from "../HorizontalPropertyScroll";
import { TrendingDown } from "lucide-react";
import property1 from "@assets/generated_images/Modern_Manhattan_condo_exterior_bdf30aa9.png";
import property2 from "@assets/generated_images/Brooklyn_brownstone_townhouse_exterior_43d55d05.png";

export default function HorizontalPropertyScrollExample() {
  const properties = [
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
  ];

  return (
    <div className="bg-background">
      <HorizontalPropertyScroll
        title="Featured Properties"
        subtitle="Handpicked exceptional homes"
        properties={properties}
        badge="Curated"
        icon={TrendingDown}
      />
    </div>
  );
}
