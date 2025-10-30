import { MarketBanner } from "../MarketBanner";
import property1 from "@assets/generated_images/Brooklyn_brownstone_townhouse_exterior_43d55d05.png";
import property2 from "@assets/generated_images/Upper_West_Side_co-op_building_1e75d246.png";
import property3 from "@assets/generated_images/NYC_apartment_living_space_interior_ba500d46.png";

export default function MarketBannerExample() {
  const discountedProperties = [
    {
      id: "1",
      image: property1,
      price: 3800000,
      originalPrice: 4500000,
      discountPercent: 15,
      title: "Brooklyn Heights Townhouse",
      address: "125 Montague Street, Brooklyn, NY 11201",
      beds: 4,
      baths: 3,
      sqft: 2900,
      propertyType: "Townhouse",
    },
    {
      id: "2",
      image: property2,
      price: 2550000,
      originalPrice: 3000000,
      discountPercent: 15,
      title: "Upper West Side Classic",
      address: "88 Central Park West, Manhattan, NY 10023",
      beds: 3,
      baths: 2,
      sqft: 1900,
      propertyType: "Co-op",
    },
    {
      id: "3",
      image: property3,
      price: 1700000,
      originalPrice: 2100000,
      discountPercent: 19,
      title: "Chelsea Modern Loft",
      address: "245 West 19th Street, Manhattan, NY 10011",
      beds: 2,
      baths: 2,
      sqft: 1500,
      propertyType: "Condo",
    },
  ];

  return <MarketBanner type="discounted" properties={discountedProperties} />;
}
