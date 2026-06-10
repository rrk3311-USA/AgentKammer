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
  knownFor: string[];
  amenities: BuildingAmenity[];
}

export const trackedBuildings: TrackedBuilding[] = [
  {
    name: "35 Hudson Yards",
    area: "Hudson Yards",
    slug: "35-hudson-yards",
    price: { label: "Typical Lease", value: "$42K/mo" },
    knownFor: ["Location", "Service", "Scale", "Hudson Yards"],
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
    price: { label: "Typical Lease", value: "$35K/mo" },
    knownFor: ["Wellness", "Retail", "Security", "Yards Living"],
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
    price: { label: "Typical Lease", value: "$28K/mo" },
    knownFor: ["High Line", "Waterfront", "Resort Feel", "Scale"],
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
    price: { label: "Typical Residence", value: "$32K+" },
    knownFor: ["Design", "Character", "High Line", "Architecture"],
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
    price: { label: "Typical Lease", value: "$26K/mo" },
    knownFor: ["Privacy", "SoHo", "Minimalism", "Views"],
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
    price: { label: "Typical Lease", value: "$30K/mo" },
    knownFor: ["Transit", "Convenience", "West Side", "Service"],
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
    price: { label: "Typical Lease", value: "$24K/mo" },
    knownFor: ["Waterfront", "Family", "Park Access", "West Side"],
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
    price: { label: "Typical Lease", value: "$22K/mo" },
    knownFor: ["Wellness", "Park", "Family", "Upper West"],
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
    price: { label: "Observed Range", value: "$32K–$45K" },
    knownFor: ["Views", "Service", "Midtown West", "Convenience"],
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
    price: { label: "Typical Lease", value: "$18K/mo" },
    knownFor: ["Waterfront", "Value", "Downtown", "Scale"],
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
    knownFor: ["Neighborhood", "Family", "Quiet", "Tribeca"],
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
    price: { label: "Observed Range", value: "$38K–$55K" },
    knownFor: ["Park Views", "Flatiron", "Service", "Prestige"],
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
    knownFor: ["Design", "Prestige", "Privacy", "Midtown"],
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
    knownFor: ["Park South", "Service", "Privacy", "Trophy"],
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
    knownFor: ["Height", "Views", "Midtown", "Icon"],
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
    price: { label: "Typical Lease", value: "$29K/mo" },
    knownFor: ["Waterfront", "Retail", "FiDi", "Convenience"],
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
    price: { label: "Typical Lease", value: "$33K/mo" },
    knownFor: ["Yards Access", "Service", "Retail", "Transit"],
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
    price: { label: "Typical Lease", value: "$27K/mo" },
    knownFor: ["Chelsea", "Work-Life", "Service", "Modern"],
    amenities: [
      { key: "concierge", label: "Concierge" },
      { key: "gym", label: "Gym" },
      { key: "work-from-home", label: "Work From Home" },
      { key: "cafe", label: "Cafe Lounge" },
    ],
  },
];
