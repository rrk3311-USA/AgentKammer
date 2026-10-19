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

export const SEVERITY_LABELS = {
  dealbreaker: { id: "dealbreaker", label: "Big one", factor: 1.4 },
  tax: { id: "tax", label: "Worth pricing in", factor: 1 },
  nit: { id: "nit", label: "Small note", factor: 0.5 },
};

export const DILIGENCE_CHECKS = [
  { id: "cutThrough", group: "flow", label: "Cut-through rooms", severity: "tax", dim: "circulation" },
  { id: "kitchenTraffic", group: "flow", label: "Kitchen traffic", severity: "tax", dim: "circulation" },
  { id: "entryKitchen", group: "flow", label: "Entry to kitchen path", severity: "tax", dim: "circulation" },
  { id: "bedBath", group: "flow", label: "Bedroom to bath distance", severity: "tax", dim: "circulation" },
  { id: "hallAsFoyer", group: "flow", label: "Hall used as the entry", severity: "tax", dim: "circulation" },
  { id: "corridorShare", group: "flow", label: "Halls take too much of the floor", severity: "tax", dim: "circulation" },
  { id: "pathThroughPrimary", group: "flow", label: "Daily path through the main bedroom", severity: "dealbreaker", dim: "circulation" },
  { id: "kitchenOrphaned", group: "flow", label: "Kitchen sits far from the living rooms", severity: "dealbreaker", dim: "circulation" },
  { id: "bedQuiet", group: "quiet", label: "Bedrooms away from living or kitchen", severity: "tax", dim: "quiet" },
  { id: "sharedWalls", group: "quiet", label: "Shared walls", severity: "tax", dim: "quiet" },
  { id: "wfhZone", group: "quiet", label: "A quiet room for work", severity: "tax", dim: "quiet" },
  { id: "bedsInRow", group: "quiet", label: "Bedrooms packed in a row", severity: "tax", dim: "quiet" },
  { id: "bedByCore", group: "quiet", label: "Bedroom next to the elevator or stair", severity: "tax", dim: "quiet" },
  { id: "openPlanEcho", group: "quiet", label: "Open kitchen and living share noise", severity: "tax", dim: "quiet" },
  { id: "daylight", group: "light", label: "Daylight per room", severity: "tax", dim: "light" },
  { id: "windowOrient", group: "light", label: "Window orientation", severity: "nit", dim: "light" },
  { id: "crossVent", group: "light", label: "Cross-ventilation", severity: "tax", dim: "light" },
  { id: "windowlessBedroom", group: "light", label: "Bedroom without a window", severity: "dealbreaker", dim: "light" },
  { id: "darkInterior", group: "light", label: "A room with no window", severity: "tax", dim: "light" },
  { id: "closetsPerBed", group: "storage", label: "Closets per bedroom", severity: "tax", dim: "storage" },
  { id: "entryDrop", group: "storage", label: "Entry drop zone", severity: "nit", dim: "storage" },
  { id: "laundryAccess", group: "storage", label: "Laundry access", severity: "nit", dim: "storage" },
  { id: "coatCloset", group: "storage", label: "Coat closet at the entry", severity: "nit", dim: "storage" },
  { id: "pantryDoor", group: "storage", label: "Pantry opens to the kitchen", severity: "tax", dim: "storage" },
  { id: "noPantry", group: "storage", label: "Pantry or tall storage", severity: "nit", dim: "storage" },
  { id: "primaryCloset", group: "storage", label: "Main bedroom closet", severity: "dealbreaker", dim: "storage" },
  { id: "secondaryClosets", group: "storage", label: "Other bedroom closets", severity: "tax", dim: "storage" },
  { id: "laundryByBed", group: "storage", label: "Laundry against a bedroom wall", severity: "nit", dim: "quiet" },
  { id: "fitKids", group: "fit", label: "Kids", severity: "tax", dim: "fit" },
  { id: "fitPets", group: "fit", label: "Pets", severity: "nit", dim: "fit" },
  { id: "fitGuests", group: "fit", label: "Guests", severity: "tax", dim: "fit" },
  { id: "agingInPlace", group: "fit", label: "Aging in place", severity: "tax", dim: "fit" },
  { id: "bathVsBed", group: "fit", label: "Baths versus bedrooms", severity: "tax", dim: "fit" },
  { id: "tooManyBeds", group: "fit", label: "More bedrooms than common rooms", severity: "tax", dim: "fit" },
  { id: "tooBig", group: "fit", label: "More house than this household needs", severity: "tax", dim: "fit" },
  { id: "bathThroughBed", group: "fit", label: "Only bath reached through a bedroom", severity: "tax", dim: "circulation" },
  { id: "kitchenWidth", group: "fit", label: "Kitchen width", severity: "tax", dim: "fit" },
  { id: "greatRoomWidth", group: "fit", label: "Living room width for two sofas", severity: "tax", dim: "fit" },
  { id: "terraceThroughPrimary", group: "fit", label: "Terrace only through the main bedroom", severity: "dealbreaker", dim: "circulation" },
  { id: "outdoorTiny", group: "fit", label: "Outdoor space too small to use", severity: "tax", dim: "fit" },
  { id: "flexibility", group: "longterm", label: "Flexibility", severity: "tax", dim: "fit" },
  { id: "growingHh", group: "longterm", label: "Room for a growing household", severity: "dealbreaker", dim: "fit" },
  { id: "floorSlip", group: "materials", label: "Flooring in wet areas", severity: "tax", dim: "comfort" },
  { id: "counters", group: "materials", label: "Countertops", severity: "tax", dim: "comfort" },
  { id: "cooling", group: "materials", label: "Cooling coverage", severity: "tax", dim: "comfort" },
  { id: "heating", group: "materials", label: "Heating type", severity: "nit", dim: "comfort" },
  { id: "leadPaint", group: "materials", label: "Building age", severity: "tax", dim: "comfort" },
  { id: "laundryInUnit", group: "materials", label: "Laundry in the home", severity: "tax", dim: "storage" },
  { id: "elevatorWalkup", group: "materials", label: "Elevator or walk-up", severity: "tax", dim: "fit" },
  { id: "outdoor", group: "materials", label: "Outdoor space", severity: "tax", dim: "fit" },
  { id: "lowFloorStreet", group: "materials", label: "Low floor on a busy street", severity: "nit", dim: "quiet" },
  { id: "mechanicalNear", group: "materials", label: "Bedroom near a boiler, garage, or roof unit", severity: "tax", dim: "quiet" },
  { id: "noParking", group: "materials", label: "Parking", severity: "tax", dim: "fit" },
  { id: "waterStains", group: "materials", label: "Stains or fresh paint patches", severity: "dealbreaker", dim: "comfort" },
  { id: "noPackage", group: "materials", label: "A place for packages", severity: "nit", dim: "fit" },
  { id: "trashAwkward", group: "materials", label: "Trash and recycling access", severity: "nit", dim: "fit" },
  { id: "noBulkStorage", group: "materials", label: "A place for bikes, luggage, or seasonal items", severity: "tax", dim: "storage" },
];

export const DILIGENCE_PRESETS = {
  standard: { id: "standard", label: "Standard" },
  strict: { id: "strict", label: "Strict" },
  relaxed: { id: "relaxed", label: "Relaxed" },
};

export const STRICTNESS_CHIPS = [
  { id: "relaxed", label: "Relaxed", factor: 0.62 },
  { id: "standard", label: "Standard", factor: 1 },
  { id: "strict", label: "Strict", factor: 1.42 },
];

export const CONSIDERATIONS = [
  {
    id: "land",
    label: "Land and environment",
    items: [
      {
        id: "flood",
        label: "Worth confirming: flood zone status",
        href: "https://msc.fema.gov/portal/home",
        linkLabel: "FEMA Flood Map Service Center",
      },
      {
        id: "wildfire",
        label: "Worth confirming: wildfire zone status",
        href: "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
        linkLabel: "CAL FIRE Fire Hazard Severity Zones",
      },
      {
        id: "quake-ca",
        label: "Worth confirming: earthquake fault and liquefaction (California)",
        href: "https://maps.conservation.ca.gov/cgs/EQZApp/",
        linkLabel: "California Geological Survey EQ Zapp",
      },
      {
        id: "quake-us",
        label: "Worth confirming: earthquake hazard (outside California)",
        href: "https://www.usgs.gov/programs/earthquake-hazards",
        linkLabel: "USGS Earthquake Hazards",
      },
      {
        id: "soil",
        label: "Worth confirming: soil and drainage",
        ask: "Ask a licensed home inspector or structural engineer",
      },
    ],
  },
  {
    id: "building",
    label: "Building and structure",
    items: [
      {
        id: "walls",
        label: "Worth confirming: wall thickness and insulation",
        ask: "Ask a licensed home inspector or structural engineer",
      },
      {
        id: "foundation",
        label: "Worth confirming: the condition of the foundation",
        ask: "Ask a licensed home inspector or structural engineer",
      },
      {
        id: "lead",
        label: "Worth confirming: pre-1978 lead paint disclosure",
        href: "https://www.epa.gov/lead/real-estate-disclosure",
        linkLabel: "EPA real estate disclosure",
        ask: "Ask a licensed home inspector",
      },
    ],
  },
  {
    id: "sound",
    label: "Sound and comfort",
    items: [
      {
        id: "noise",
        label: "Worth confirming: noise level",
        ask: "Visit at more than one time of day, then ask a licensed home inspector",
      },
    ],
  },
  {
    id: "rules",
    label: "Rules and costs",
    items: [
      {
        id: "hoa",
        label: "Worth confirming: HOA rules and assessments",
        ask: "Ask for the current rules, fees, and recent assessments",
      },
      {
        id: "commute",
        label: "Worth confirming: commute time to your usual destinations",
        ask: "Time the trip at the hours you would travel",
      },
    ],
  },
];

export const LIVABILITY_AID_LINE =
  "Livability is a planning aid, not an inspection, appraisal or guarantee. Confirm details with qualified professionals and official sources.";

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
      lowFloorStreet: false,
      mechanicalNear: false,
      noParking: false,
      waterStains: false,
      noPackage: false,
      trashAwkward: false,
      noBulkStorage: false,
    },
    photos: [],
    suggestions: [],
  };
}

export function idsForPreset(id) {
  if (id === "strict") return DILIGENCE_CHECKS.map((item) => item.id);
  if (id === "relaxed") return DILIGENCE_CHECKS.filter((item) => item.severity === "dealbreaker").map((item) => item.id);
  return DILIGENCE_CHECKS.filter((item) => item.severity === "dealbreaker" || item.severity === "tax").map((item) => item.id);
}

export function applyDiligencePreset(id) {
  const preset = DILIGENCE_PRESETS[id] || DILIGENCE_PRESETS.standard;
  const on = new Set(idsForPreset(preset.id));
  return {
    preset: preset.id,
    checks: Object.fromEntries(DILIGENCE_CHECKS.map((item) => [item.id, { on: on.has(item.id), severity: item.severity }])),
  };
}

export function defaultDiligence() {
  return applyDiligencePreset("standard");
}

function checksKey(diligence) {
  const checks = diligence?.checks || {};
  return DILIGENCE_CHECKS.map((item) => {
    const row = checks[item.id] || { on: false };
    return `${item.id}:${row.on ? 1 : 0}`;
  }).join("|");
}

export function presetFromDiligence(diligence) {
  const key = checksKey(diligence);
  for (const id of ["standard", "strict", "relaxed"]) {
    if (checksKey(applyDiligencePreset(id)) === key) return id;
  }
  return "custom";
}

export function hydrateDiligence(raw) {
  if (!raw || typeof raw !== "object") return defaultDiligence();
  if (raw.preset && raw.preset !== "custom" && DILIGENCE_PRESETS[raw.preset]) {
    return applyDiligencePreset(raw.preset);
  }
  const next = applyDiligencePreset("standard");
  const checks = raw.checks || {};
  for (const item of DILIGENCE_CHECKS) {
    if (checks[item.id] && typeof checks[item.id].on === "boolean") {
      next.checks[item.id].on = checks[item.id].on;
    }
  }
  next.preset = presetFromDiligence(next);
  return next;
}

export function activeCheckCount(diligence) {
  const checks = diligence?.checks || defaultDiligence().checks;
  return DILIGENCE_CHECKS.filter((item) => checks[item.id]?.on).length;
}

export function severityFactor(id) {
  return SEVERITY_LABELS[id]?.factor || 1;
}

export function severityLabel(id) {
  return SEVERITY_LABELS[id]?.label || "Worth pricing in";
}

export function strictnessFactor(id) {
  if (SEVERITY_LABELS[id]) return SEVERITY_LABELS[id].factor;
  return STRICTNESS_CHIPS.find((item) => item.id === id)?.factor || 1;
}

export function checkMeta(id) {
  return DILIGENCE_CHECKS.find((item) => item.id === id) || null;
}
