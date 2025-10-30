import { PropertyCard } from "../PropertyCard";
import propertyImage from "@assets/generated_images/Modern_Manhattan_condo_exterior_bdf30aa9.png";

export default function PropertyCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <PropertyCard
        id="1"
        image={propertyImage}
        price={2500000}
        title="Modern Luxury Condo"
        address="450 West 42nd Street, Manhattan, NY 10036"
        beds={2}
        baths={2}
        sqft={1450}
        propertyType="Condo"
      />
    </div>
  );
}
