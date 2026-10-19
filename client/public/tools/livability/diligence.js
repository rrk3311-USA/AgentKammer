/** Diligence presets and named checks. Layout only. No neighborhood or people judgments. */

export const DILIGENCE_GROUPS = [
  { id: "flow", label: "Flow and circulation", hint: "How people move through the rooms." },
  { id: "quiet", label: "Quiet and privacy", hint: "Sleep and work, away from the social rooms." },
  { id: "light", label: "Light and air", hint: "Windows, daylight, and a breeze across the plan." },
  { id: "storage", label: "Storage and function", hint: "Closets, a drop zone, laundry you can reach." },
  { id: "fit", label: "Household fit", hint: "Kids, pets, guests, and a gentle path as years stack." },
  { id: "longterm", label: "Long-term", hint: "Tied to the years lever. Room to grow." },
  { id: "materials", label: "Materials and building", hint: "What you see in photos and the listing. Verify with an inspector." },
];

export const DILIGENCE_CHECKS = [
  { id: "cutThrough", group: "flow", label: "Cut-through rooms", hasStrict: true, dim: "circulation" },
  { id: "kitchenTraffic", group: "flow", label: "Kitchen traffic", hasStrict: true, dim: "circulation" },
  { id: "entryKitchen", group: "flow", label: "Entry to kitchen path", hasStrict: true, dim: "circulation" },
  { id: "bedBath", group: "flow", label: "Bedroom to bath distance", hasStrict: true, dim: "circulation" },
  { id: "bedQuiet", group: "quiet", label: "Bedrooms away from living or kitchen", hasStrict: true, dim: "quiet" },
  { id: "sharedWalls", group: "quiet", label: "Shared walls", hasStrict: true, dim: "quiet" },
  { id: "wfhZone", group: "quiet", label: "WFH zone", hasStrict: false, dim: "quiet" },
  { id: "daylight", group: "light", label: "Daylight per room", hasStrict: true, dim: "light" },
  { id: "windowOrient", group: "light", label: "Window orientation", hasStrict: false, dim: "light" },
  { id: "crossVent", group: "light", label: "Cross-ventilation", hasStrict: true, dim: "light" },
  { id: "closetsPerBed", group: "storage", label: "Closets per bedroom", hasStrict: true, dim: "storage" },
  { id: "entryDrop", group: "storage", label: "Entry drop zone", hasStrict: false, dim: "storage" },
  { id: "laundryAccess", group: "storage", label: "Laundry access", hasStrict: false, dim: "storage" },
  { id: "fitKids", group: "fit", label: "Kids", hasStrict: true, dim: "fit" },
  { id: "fitPets", group: "fit", label: "Pets", hasStrict: false, dim: "fit" },
  { id: "fitGuests", group: "fit", label: "Guests", hasStrict: true, dim: "fit" },
  { id: "agingInPlace", group: "fit", label: "Aging in place", hasStrict: true, dim: "fit" },
  { id: "flexibility", group: "longterm", label: "Flexibility", hasStrict: true, dim: "fit" },
  { id: "growingHh", group: "longterm", label: "Room for a growing household", hasStrict: true, dim: "fit" },
  { id: "floorSlip", group: "materials", label: "Flooring in wet areas", hasStrict: true, dim: "comfort" },
  { id: "counters", group: "materials", label: "Countertops", hasStrict: true, dim: "comfort" },
  { id: "cooling", group: "materials", label: "Cooling coverage", hasStrict: true, dim: "comfort" },
  { id: "heating", group: "materials", label: "Heating type", hasStrict: false, dim: "comfort" },
  { id: "leadPaint", group: "materials", label: "Building age", hasStrict: true, dim: "comfort" },
  { id: "bathVsBed", group: "materials", label: "Bathrooms vs bedrooms", hasStrict: true, dim: "fit" },
  { id: "laundryInUnit", group: "materials", label: "Laundry in unit", hasStrict: false, dim: "storage" },
  { id: "elevatorWalkup", group: "materials", label: "Elevator or walk-up", hasStrict: true, dim: "fit" },
  { id: "outdoor", group: "materials", label: "Outdoor space", hasStrict: false, dim: "fit" },
];

const LAYOUT_18 = [
  "cutThrough",
  "kitchenTraffic",
  "entryKitchen",
  "bedBath",
  "bedQuiet",
  "sharedWalls",
  "wfhZone",
  "daylight",
  "crossVent",
  "closetsPerBed",
  "entryDrop",
  "laundryAccess",
  "fitKids",
  "fitPets",
  "fitGuests",
  "agingInPlace",
  "flexibility",
  "growingHh",
];

const RELAXED_12 = [
  "cutThrough",
  "kitchenTraffic",
  "entryKitchen",
  "bedBath",
  "bedQuiet",
  "daylight",
  "closetsPerBed",
  "fitKids",
  "fitGuests",
  "agingInPlace",
  "growingHh",
  "bathVsBed",
];

export const DILIGENCE_PRESETS = {
  standard: { id: "standard", label: "Standard", on: LAYOUT_18, defaultStrictness: "standard" },
  strict: {
    id: "strict",
    label: "Strict",
    on: DILIGENCE_CHECKS.map((item) => item.id),
    defaultStrictness: "strict",
  },
  relaxed: { id: "relaxed", label: "Relaxed", on: RELAXED_12, defaultStrictness: "relaxed" },
};

export const STRICTNESS_CHIPS = [
  { id: "relaxed", label: "Relaxed", factor: 0.62 },
  { id: "standard", label: "Standard", factor: 1 },
  { id: "strict", label: "Strict", factor: 1.42 },
];

export function emptyBuilding() {
  return {
    yearBuilt: "",
    walkupFloor: "",
    heating: "",
    ticks: {
      floorGlossWet: false,
      tileBath: false,
      marbleKitchen: false,
      laminateCooktop: false,
      windowAc: false,
      noDucts: false,
      laundryInUnit: false,
      laundryUnknown: false,
      outdoor: false,
      elevator: false,
    },
    photos: [],
    suggestions: [],
  };
}

export function applyDiligencePreset(id) {
  const preset = DILIGENCE_PRESETS[id] || DILIGENCE_PRESETS.standard;
  const on = new Set(preset.on);
  return {
    preset: preset.id,
    checks: Object.fromEntries(
      DILIGENCE_CHECKS.map((item) => [
        item.id,
        { on: on.has(item.id), strictness: preset.defaultStrictness },
      ]),
    ),
  };
}

export function defaultDiligence() {
  return applyDiligencePreset("standard");
}

function checksKey(diligence) {
  const checks = diligence?.checks || {};
  return DILIGENCE_CHECKS.map((item) => {
    const row = checks[item.id] || { on: false, strictness: "standard" };
    return `${item.id}:${row.on ? 1 : 0}:${row.strictness || "standard"}`;
  }).join("|");
}

export function presetFromDiligence(diligence) {
  const key = checksKey(diligence);
  for (const id of ["standard", "strict", "relaxed"]) {
    if (checksKey(applyDiligencePreset(id)) === key) return id;
  }
  return "custom";
}

export function activeCheckCount(diligence) {
  const checks = diligence?.checks || defaultDiligence().checks;
  return DILIGENCE_CHECKS.filter((item) => checks[item.id]?.on).length;
}

export function strictnessFactor(id) {
  return STRICTNESS_CHIPS.find((item) => item.id === id)?.factor || 1;
}

export function checkMeta(id) {
  return DILIGENCE_CHECKS.find((item) => item.id === id) || null;
}
