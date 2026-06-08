export type BuildingAmenityKey =
  | "pool"
  | "gym"
  | "river-view"
  | "concierge"
  | "doorman"
  | "park"
  | "wine-room"
  | "lounge"
  | "security"
  | "transit"
  | "skyline"
  | "valet"
  | "pet-friendly"
  | "work-from-home"
  | "shopping"
  | "cafe";

export interface BuildingAmenity {
  key: BuildingAmenityKey;
  label: string;
}

export interface BuildingPrice {
  label: string;
  value: string;
}

export interface TrackedBuilding {
  name: string;
  area: string;
  slug: string;
  price: BuildingPrice;
  amenities: BuildingAmenity[];
}

export const trackedBuildings: TrackedBuilding[] = [
  {
    name: "35 Hudson Yards",
    area: "Hudson Yards",
    slug: "35-hudson-yards",
    price: { label: "From", value: "$42K/mo" },
    amenities: [
      { key: "gym", label: "Fitness Center" },
      { key: "concierge", label: "Concierge" },
      { key: "park", label: "Park Access" },
      { key: "transit", label: "Direct Access" },
    ],
  },
  {
    name: "15 Hudson Yards",
    area: "Hudson Yards",
    slug: "15-hudson-yards",
    price: { label: "From", value: "$35K/mo" },
    amenities: [
      { key: "pool", label: "Pool" },
      { key: "doorman", label: "Doorman" },
      { key: "security", label: "24/7 Security" },
      { key: "shopping", label: "Shopping Nearby" },
    ],
  },
  {
    name: "One High Line",
    area: "West Chelsea",
    slug: "one-high-line",
    price: { label: "From", value: "$28K/mo" },
    amenities: [
      { key: "pool", label: "Pool" },
      { key: "gym", label: "Gym" },
      { key: "river-view", label: "River View" },
      { key: "concierge", label: "Concierge" },
    ],
  },
  {
    name: "Lantern House",
    area: "West Chelsea",
    slug: "lantern-house",
    price: { label: "Starting Residence", value: "$32K+" },
    amenities: [
      { key: "doorman", label: "Doorman" },
      { key: "park", label: "Park Nearby" },
      { key: "wine-room", label: "Wine Room" },
      { key: "lounge", label: "Residents Lounge" },
    ],
  },
  {
    name: "565 Broome",
    area: "SoHo",
    slug: "565-broome",
    price: { label: "From", value: "$26K/mo" },
    amenities: [
      { key: "concierge", label: "Concierge" },
      { key: "gym", label: "Fitness Center" },
      { key: "skyline", label: "Skyline Views" },
      { key: "doorman", label: "Doorman" },
    ],
  },
  {
    name: "Manhattan West",
    area: "Penn District",
    slug: "manhattan-west",
    price: { label: "From", value: "$30K/mo" },
    amenities: [
      { key: "transit", label: "Transit Close" },
      { key: "gym", label: "Fitness Center" },
      { key: "concierge", label: "Concierge" },
      { key: "lounge", label: "Residents Lounge" },
    ],
  },
  {
    name: "The Cortland",
    area: "West Side",
    slug: "the-cortland",
    price: { label: "From", value: "$24K/mo" },
    amenities: [
      { key: "river-view", label: "River View" },
      { key: "gym", label: "Gym" },
      { key: "doorman", label: "Doorman" },
      { key: "park", label: "Park Nearby" },
    ],
  },
  {
    name: "Waterline Square",
    area: "Upper West Side",
    slug: "waterline-square",
    price: { label: "From", value: "$22K/mo" },
    amenities: [
      { key: "pool", label: "Pool" },
      { key: "park", label: "Park Access" },
      { key: "gym", label: "Wellness Center" },
      { key: "concierge", label: "Concierge" },
    ],
  },
  {
    name: "The Avery",
    area: "Hell's Kitchen",
    slug: "the-avery",
    price: { label: "Lease Range", value: "$32K–$45K" },
    amenities: [
      { key: "skyline", label: "Skyline Views" },
      { key: "concierge", label: "Concierge" },
      { key: "gym", label: "Fitness Center" },
      { key: "valet", label: "Valet Parking" },
    ],
  },
  {
    name: "One Manhattan Square",
    area: "Two Bridges",
    slug: "one-manhattan-square",
    price: { label: "From", value: "$18K/mo" },
    amenities: [
      { key: "pool", label: "Pool" },
      { key: "lounge", label: "Residents Lounge" },
      { key: "gym", label: "Fitness Center" },
      { key: "river-view", label: "River View" },
    ],
  },
  {
    name: "Tribeca Green",
    area: "Tribeca",
    slug: "tribeca-green",
    price: { label: "Typical Lease", value: "$28K–$38K" },
    amenities: [
      { key: "park", label: "Park Nearby" },
      { key: "concierge", label: "Concierge" },
      { key: "pet-friendly", label: "Pet Friendly" },
      { key: "doorman", label: "Doorman" },
    ],
  },
  {
    name: "One Madison",
    area: "Flatiron",
    slug: "one-madison",
    price: { label: "Lease Range", value: "$38K–$55K" },
    amenities: [
      { key: "park", label: "Central Park Views" },
      { key: "concierge", label: "Concierge" },
      { key: "wine-room", label: "Wine Room" },
      { key: "pet-friendly", label: "Pet Friendly" },
    ],
  },
  {
    name: "111 West 57",
    area: "Midtown",
    slug: "111-west-57",
    price: { label: "Typical Lease", value: "$65K–$95K" },
    amenities: [
      { key: "concierge", label: "Concierge" },
      { key: "pool", label: "Pool" },
      { key: "skyline", label: "Skyline Views" },
      { key: "security", label: "Private Security" },
    ],
  },
  {
    name: "220 Central Park South",
    area: "Central Park South",
    slug: "220-central-park-south",
    price: { label: "Typical Residence", value: "$95K–$150K" },
    amenities: [
      { key: "park", label: "Central Park Views" },
      { key: "concierge", label: "Concierge" },
      { key: "valet", label: "Valet Parking" },
      { key: "wine-room", label: "Wine Room" },
    ],
  },
  {
    name: "432 Park Avenue",
    area: "Midtown",
    slug: "432-park-avenue",
    price: { label: "Typical Residence", value: "$75K–$110K" },
    amenities: [
      { key: "skyline", label: "Skyline Views" },
      { key: "concierge", label: "Concierge" },
      { key: "gym", label: "Fitness Center" },
      { key: "security", label: "24/7 Security" },
    ],
  },
  {
    name: "Brookfield Place",
    area: "Battery Park City",
    slug: "brookfield-place",
    price: { label: "From", value: "$29K/mo" },
    amenities: [
      { key: "river-view", label: "River View" },
      { key: "shopping", label: "Shopping Nearby" },
      { key: "concierge", label: "Concierge" },
      { key: "transit", label: "Transit Close" },
    ],
  },
  {
    name: "Hudson Yards Residences",
    area: "Hudson Yards",
    slug: "hudson-yards-residences",
    price: { label: "From", value: "$33K/mo" },
    amenities: [
      { key: "gym", label: "Fitness Center" },
      { key: "concierge", label: "Concierge" },
      { key: "shopping", label: "Shopping Nearby" },
      { key: "transit", label: "Direct Access" },
    ],
  },
  {
    name: "The Symoné",
    area: "West Chelsea",
    slug: "the-symone",
    price: { label: "From", value: "$27K/mo" },
    amenities: [
      { key: "concierge", label: "Concierge" },
      { key: "gym", label: "Gym" },
      { key: "work-from-home", label: "Work From Home" },
      { key: "cafe", label: "Cafe Lounge" },
    ],
  },
];
