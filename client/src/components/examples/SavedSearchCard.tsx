import { SavedSearchCard } from "../SavedSearchCard";

export default function SavedSearchCardExample() {
  return (
    <div className="p-8 max-w-md">
      <SavedSearchCard
        id="1"
        name="Manhattan Luxury Condos"
        criteria={{
          location: "Manhattan, NY",
          priceRange: [2000000, 5000000],
          beds: "2+",
          propertyType: "Condo",
        }}
        newListingsCount={3}
        emailEnabled={true}
      />
    </div>
  );
}
