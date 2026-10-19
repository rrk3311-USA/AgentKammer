/** Livability v1 scoring. Deterministic room-graph rules. Layout only. */
import {
  DILIGENCE_CHECKS,
  activeCheckCount,
  defaultDiligence,
  presetFromDiligence,
  severityFactor,
  severityLabel,
} from "./diligence.js";
import { wallIsShared, windowDotsFromPlan, windowsForRoom } from "./plan-graph.js";

export {
  CONSIDERATIONS,
  DILIGENCE_CHECKS,
  DILIGENCE_GROUPS,
  DILIGENCE_PRESETS,
  LIVABILITY_AID_LINE,
  SEVERITY_LABELS,
  STRICTNESS_CHIPS,
  activeCheckCount,
  applyDiligencePreset,
  defaultDiligence,
  emptyBuilding,
  hydrateDiligence,
  idsForPreset,
  presetFromDiligence,
  severityFactor,
  severityLabel,
} from "./diligence.js";

export const HORIZONS = [
  { id: "5", years: 5, label: "5 years", blurb: "Near term. Kids still small if you have them. Routines are forming." },
  { id: "10", years: 10, label: "10 years", blurb: "A decade. Privacy and a work room start to matter more." },
  { id: "15", years: 15, label: "15 years and on", blurb: "Long stay. Short, gentle paths and a bath near the main bedroom help." },
];

export const ROOM_TYPES = [
  { id: "entry", label: "Entry" },
  { id: "hallway", label: "Hall" },
  { id: "living", label: "Living" },
  { id: "dining", label: "Dining" },
  { id: "kitchen", label: "Kitchen" },
  { id: "bedroom", label: "Bedroom" },
  { id: "bath", label: "Bath" },
  { id: "study", label: "Study" },
  { id: "closet", label: "Closet" },
  { id: "terrace", label: "Terrace" },
  { id: "other", label: "Other" },
];

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export function emptyProfile() {
  return {
    id: "",
    name: "My household",
    householdSize: 2,
    kids: false,
    homebody: false,
    wfh: false,
    entertainer: false,
    pets: false,
    cooks: false,
    guestsOften: false,
  };
}

export function makeSuttonPlan() {
  const rooms = [
    { id: "foyer", name: "Foyer", type: "entry", sf: 48, x: 24, y: 168, w: 108, h: 148 },
    { id: "gallery", name: "Gallery", type: "hallway", sf: 56, x: 132, y: 168, w: 64, h: 200 },
    { id: "living", name: "Living", type: "living", sf: 286, x: 196, y: 20, w: 328, h: 148 },
    { id: "dining", name: "Dining", type: "dining", sf: 154, x: 196, y: 168, w: 188, h: 148 },
    { id: "kitchen", name: "Kitchen", type: "kitchen", sf: 92, x: 384, y: 168, w: 140, h: 148 },
    { id: "hall", name: "Sleeping hall", type: "hallway", sf: 42, x: 132, y: 368, w: 252, h: 48 },
    { id: "beda", name: "Bedroom A", type: "bedroom", sf: 168, x: 24, y: 368, w: 108, h: 168 },
    { id: "batha", name: "Bath A", type: "bath", sf: 46, x: 24, y: 536, w: 108, h: 56 },
    { id: "cloa", name: "Closet A", type: "closet", sf: 18, x: 132, y: 416, w: 52, h: 64 },
    { id: "bedb", name: "Bedroom B", type: "bedroom", sf: 148, x: 384, y: 368, w: 140, h: 148 },
    { id: "bathb", name: "Bath B", type: "bath", sf: 38, x: 384, y: 516, w: 88, h: 76 },
    { id: "clob", name: "Closet B", type: "closet", sf: 16, x: 472, y: 516, w: 52, h: 76 },
  ];
  const doors = [
    ["foyer", "gallery"],
    ["gallery", "living"],
    ["gallery", "dining"],
    ["dining", "kitchen"],
    ["gallery", "hall"],
    ["hall", "beda"],
    ["hall", "bedb"],
    ["beda", "batha"],
    ["beda", "cloa"],
    ["bedb", "bathb"],
    ["bedb", "clob"],
  ].map(([a, b]) => ({ a, b }));
  const plan = {
    id: "plan-sutton-sample",
    name: "Sutton sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A classic two-bedroom line, drawn for this tool. Not a real listing.",
    pxPerFt: 8,
  };
  plan.windowDots = windowDotsFromPlan(plan);
  return plan;
}

export function makeRiversidePlan() {
  const rooms = [
    { id: "entry", name: "Entry", type: "entry", sf: 36, x: 20, y: 20, w: 88, h: 120 },
    { id: "living", name: "Living", type: "living", sf: 210, x: 108, y: 20, w: 220, h: 160 },
    { id: "kitchen", name: "Kitchen", type: "kitchen", sf: 68, x: 328, y: 20, w: 120, h: 160 },
    { id: "hall", name: "Hall", type: "hallway", sf: 28, x: 108, y: 180, w: 220, h: 40 },
    { id: "bed", name: "Bedroom", type: "bedroom", sf: 132, x: 108, y: 220, w: 160, h: 140 },
    { id: "bath", name: "Bath", type: "bath", sf: 40, x: 268, y: 220, w: 60, h: 140 },
    { id: "closet", name: "Closet", type: "closet", sf: 12, x: 20, y: 220, w: 88, h: 80 },
  ];
  const doors = [
    ["entry", "living"],
    ["living", "kitchen"],
    ["living", "hall"],
    ["kitchen", "hall"],
    ["hall", "bed"],
    ["kitchen", "bed"],
    ["bed", "bath"],
    ["hall", "closet"],
  ].map(([a, b]) => ({ a, b }));
  const plan = {
    id: "plan-riverside-sample",
    name: "Riverside sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A railroad one-bedroom line, drawn for this tool. Not a real listing.",
    pxPerFt: 8,
  };
  plan.windowDots = windowDotsFromPlan(plan);
  return plan;
}

// Labeled sample from published public plans, not a survey.
// Sources:
// - NPS National Register nomination, Case Study House No. 22: L-plan, ~2,300 sf, 20-ft grid, public rooms in the short leg, bedrooms and carport in the long leg, dressing / master bath / service at the juncture, pool in the L, master bath behind the kitchen. https://npgallery.nps.gov/NRHP/GetAsset/21b55ed9-5129-4f45-aef5-3067e3e9f11d
// - Stahl House site: 1635 Woods Drive, 2,300 sf, 2 bedrooms, 2 baths. https://stahlhouse.com/info/
// - Wikipedia, "Stahl House": 2,200 sf, two bedrooms, glass on three sides. https://en.wikipedia.org/wiki/Stahl_House
// - Current listing (MLS 25621475 / BHHS): 1635 Woods Dr, Los Angeles, CA 90069, 2,200 sf, 2 bed, 3 bath (2 full, 1 half), jack-and-jill, utility, $20M.
// - Los Angeles Times, "Case Study House No. 22, by the numbers" (27 Jun 2009): 2,200 sf, two-bedroom.
// - Arts & Architecture, June 1960 (USModernist): Koenig CSH No. 22; living and kitchen as free-standing units; master bedroom looks across the pool.
// Room sizes below are approximate, scaled to that 2,200-2,300 sf envelope and the 20-foot bay.
export function makeStahlPlan() {
  // 8 px = 1 ft. Public glass wing on top (living cantilevered toward the view).
  // Bedroom wing drops from the elbow. Pool fills the inside of the L.
  const rooms = [
    { id: "view", name: "View deck (approx.)", type: "terrace", sf: 140, x: -72, y: 16, w: 92, h: 152 },
    { id: "living", name: "Living (approx.)", type: "living", sf: 390, x: 20, y: 16, w: 184, h: 152 },
    { id: "dining", name: "Dining (approx.)", type: "dining", sf: 230, x: 204, y: 16, w: 120, h: 152 },
    { id: "kitchen", name: "Kitchen (approx.)", type: "kitchen", sf: 280, x: 324, y: 16, w: 144, h: 152 },
    { id: "terrace", name: "Pool (approx.)", type: "terrace", sf: 180, x: 20, y: 168, w: 184, h: 416 },
    { id: "entry", name: "Entry (approx.)", type: "entry", sf: 70, x: 204, y: 168, w: 80, h: 88 },
    { id: "service", name: "Service (approx.)", type: "other", sf: 70, x: 324, y: 168, w: 72, h: 80 },
    { id: "mbath", name: "Master bath (approx.)", type: "bath", sf: 90, x: 396, y: 168, w: 72, h: 80 },
    { id: "bed2", name: "Bedroom 2 (approx.)", type: "bedroom", sf: 250, x: 204, y: 256, w: 160, h: 136 },
    { id: "jjbath", name: "Hall bath (approx.)", type: "bath", sf: 50, x: 364, y: 256, w: 68, h: 72 },
    { id: "dress", name: "Dressing (approx.)", type: "closet", sf: 40, x: 364, y: 328, w: 68, h: 64 },
    { id: "hall", name: "Sleeping hall (approx.)", type: "hallway", sf: 50, x: 204, y: 392, w: 160, h: 40 },
    { id: "mbed", name: "Master bedroom (approx.)", type: "bedroom", sf: 390, x: 204, y: 432, w: 228, h: 152 },
  ];
  const doors = [
    ["view", "living"],
    ["living", "dining"],
    ["dining", "kitchen"],
    ["dining", "entry"],
    ["kitchen", "service"],
    ["kitchen", "mbath"],
    ["service", "mbath"],
    ["entry", "bed2"],
    ["bed2", "hall"],
    ["hall", "mbed"],
    ["bed2", "jjbath"],
    ["mbed", "dress"],
    ["dress", "mbath"],
    ["living", "terrace"],
    ["entry", "terrace"],
    ["bed2", "terrace"],
    ["mbed", "terrace"],
  ].map(([a, b]) => ({ a, b }));
  const plan = {
    id: "plan-stahl-sample",
    name: "Stahl House (1635 Woods Dr) · approx. from public plans",
    source: "sample",
    address: "1635 Woods Dr, Los Angeles, CA 90069",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    pxPerFt: 8,
    note: "Labeled sample. L-shaped glass plan from published public drawings. Room sizes are approximate. Not a measured survey.",
  };
  plan.windowDots = windowDotsFromPlan(plan);
  return plan;
}

/** Fictional single-family house for sample reports. Not a real listing. */
export function makeWillowHousePlan() {
  const rooms = [
    { id: "entry", name: "Entry", type: "entry", sf: 24, x: 20, y: 20, w: 80, h: 140 },
    { id: "living", name: "Living", type: "living", sf: 176, x: 100, y: 20, w: 240, h: 120 },
    { id: "dining", name: "Dining", type: "dining", sf: 108, x: 340, y: 20, w: 120, h: 120 },
    { id: "pantry", name: "Pantry", type: "closet", sf: 16, x: 460, y: 20, w: 48, h: 80 },
    { id: "kitchen", name: "Kitchen", type: "kitchen", sf: 62, x: 520, y: 20, w: 48, h: 120 },
    { id: "hall", name: "Main hall", type: "hallway", sf: 96, x: 100, y: 140, w: 468, h: 40 },
    { id: "stair", name: "Stair", type: "other", sf: 42, x: 20, y: 180, w: 80, h: 160 },
    { id: "beda", name: "Main bedroom", type: "bedroom", sf: 188, x: 100, y: 180, w: 160, h: 160 },
    { id: "bedb", name: "Bedroom 2", type: "bedroom", sf: 136, x: 260, y: 180, w: 140, h: 160 },
    { id: "bedc", name: "Bedroom 3", type: "bedroom", sf: 128, x: 400, y: 180, w: 140, h: 160 },
    { id: "garage", name: "Garage", type: "other", sf: 168, x: 540, y: 180, w: 120, h: 160 },
    { id: "bath", name: "Bath", type: "bath", sf: 36, x: 100, y: 340, w: 80, h: 72 },
    { id: "laundry", name: "Laundry", type: "other", sf: 28, x: 180, y: 340, w: 80, h: 72 },
    { id: "terrace", name: "Terrace", type: "terrace", sf: 22, x: 260, y: 340, w: 140, h: 72 },
  ];
  const doors = [
    ["entry", "living"],
    ["living", "hall"],
    ["hall", "beda"],
    ["hall", "bedb"],
    ["hall", "bedc"],
    ["hall", "stair"],
    ["hall", "pantry"],
    ["beda", "bath"],
    ["beda", "laundry"],
    ["beda", "kitchen"],
    ["beda", "terrace"],
    ["bedc", "garage"],
  ].map(([a, b]) => ({ a, b }));
  const plan = {
    id: "plan-willow-house-sample",
    name: "Willow house demo",
    source: "sample",
    address: "1842 Willow Lane, Sample City, CA",
    sampleReport: true,
    sampleMark: "Sample report, example data",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Sample report, example data. Fictional single-family house drawn for this tool. Not a real listing.",
    pxPerFt: 8,
  };
  plan.windowDots = windowDotsFromPlan(plan);
  return plan;
}

export const DEMO_PLANS = [
  { id: "sutton", label: "Sutton line", make: makeSuttonPlan, needles: ["sutton sample", "sutton line"] },
  { id: "riverside", label: "Riverside line", make: makeRiversidePlan, needles: ["riverside sample", "riverside line"] },
  {
    id: "stahl",
    label: "Stahl House",
    make: makeStahlPlan,
    needles: ["1635 woods", "stahl house", "stahl", "case study house 22", "case study house #22", "csh 22", "csh #22"],
  },
  {
    id: "willow",
    label: "Willow house",
    make: makeWillowHousePlan,
    needles: ["1842 willow", "willow lane", "willow house", "sample report, example data"],
  },
];

export function normalizePlace(query) {
  return String(query || "")
    .toLowerCase()
    .replace(/[.#,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchKnownSample(query) {
  const q = normalizePlace(query);
  if (!q) return null;
  return DEMO_PLANS.find((demo) => (demo.needles || []).some((needle) => q.includes(normalizePlace(needle)))) || null;
}

export function cannotFetchPlan(query) {
  const place = String(query || "").trim() || "that address";
  return {
    ok: false,
    reason: `No floor plan is on file for ${place}. This version cannot read a listing page or a tax record. Find the plan online, download it, and drop it here. Or run a labeled demo against this address.`,
  };
}

export function heatMap(plan, result) {
  const traffic = {};
  for (const room of plan.rooms) traffic[room.id] = 0;
  for (const path of result?.flags?.paths || []) {
    for (const id of path.nodes) traffic[id] = (traffic[id] || 0) + 1;
  }
  const max = Math.max(1, ...Object.values(traffic));
  const cells = {};
  for (const room of plan.rooms) {
    const count = traffic[room.id] || 0;
    const intensity = count / max;
    let zone = "calm";
    if ((result?.flags?.bottlenecks || []).includes(room.id)) zone = "pinch";
    else if ((result?.flags?.quiet || []).includes(room.id)) zone = "quiet";
    else if (intensity >= 0.66) zone = "hot";
    else if (intensity >= 0.33) zone = "flow";
    cells[room.id] = { traffic: count, intensity, zone };
  }
  return cells;
}

function plainName(name) {
  return String(name || "This room").replace(/\s*\(approx\.\)\s*/gi, "").trim() || "This room";
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function graphOf(plan) {
  const adj = new Map();
  for (const room of plan.rooms) adj.set(room.id, []);
  for (const door of plan.doors) {
    if (!adj.has(door.a) || !adj.has(door.b)) continue;
    adj.get(door.a).push(door.b);
    adj.get(door.b).push(door.a);
  }
  return adj;
}

function pathBetween(adj, start, goal) {
  if (!start || !goal || !adj.has(start) || !adj.has(goal)) return null;
  const q = [[start]];
  const seen = new Set([start]);
  while (q.length) {
    const cur = q.shift();
    const last = cur[cur.length - 1];
    if (last === goal) return cur;
    for (const next of adj.get(last) || []) {
      if (seen.has(next)) continue;
      seen.add(next);
      q.push([...cur, next]);
    }
  }
  return null;
}

function roomsOf(plan, type) {
  return plan.rooms.filter((room) => room.type === type);
}

function adjacent(adj, a, b) {
  return (adj.get(a) || []).includes(b);
}

function shortestExisting(adj, fromIds, toIds) {
  let best = null;
  for (const from of fromIds) {
    for (const to of toIds) {
      const path = pathBetween(adj, from, to);
      if (!path) continue;
      if (!best || path.length < best.length) best = path;
    }
  }
  return best;
}

export function scoreLivability(plan, profile, horizonId, diligence, extras = {}) {
  const cfg = diligence?.checks ? diligence : defaultDiligence();
  const building = extras.building || plan.building || {};
  const ticks = building.ticks || {};
  const adj = graphOf(plan);
  const beds = roomsOf(plan, "bedroom");
  const baths = roomsOf(plan, "bath");
  const closets = roomsOf(plan, "closet");
  const kitchens = roomsOf(plan, "kitchen");
  const livings = roomsOf(plan, "living");
  const dinings = roomsOf(plan, "dining");
  const studies = roomsOf(plan, "study");
  const entries = roomsOf(plan, "entry");
  const halls = roomsOf(plan, "hallway");
  const terraces = roomsOf(plan, "terrace");
  const size = clamp(Number(profile.householdSize) || 1, 1, 8);
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const totalSf = plan.rooms.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const closetSf = closets.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const kitchenSf = kitchens.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const livingSf = livings.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const px = Number(plan.pxPerFt) || 8;
  const windowDots = (plan.windowDots && plan.windowDots.length ? plan.windowDots : windowDotsFromPlan(plan)).filter(
    (dot) => !dot.kind || dot.kind === "window",
  );

  const flags = { bottlenecks: [], quiet: [], strain: [], paths: [] };
  const morning = shortestExisting(
    adj,
    beds.map((room) => room.id),
    kitchens.map((room) => room.id),
  );
  const evening = shortestExisting(
    adj,
    entries.map((room) => room.id),
    beds.map((room) => room.id),
  );
  const guest = shortestExisting(
    adj,
    entries.map((room) => room.id),
    livings.map((room) => room.id),
  );
  const cook = shortestExisting(
    adj,
    kitchens.map((room) => room.id),
    dinings.map((room) => room.id),
  );
  const entryKitchen = shortestExisting(
    adj,
    entries.map((room) => room.id),
    kitchens.map((room) => room.id),
  );
  if (morning) flags.paths.push({ id: "morning", label: "Morning", nodes: morning });
  if (evening) flags.paths.push({ id: "return", label: "Return", nodes: evening });
  if (guest) flags.paths.push({ id: "guest", label: "Guests", nodes: guest });
  if (cook) flags.paths.push({ id: "cook", label: "Kitchen to dining", nodes: cook });

  const bedNeed = profile.kids && horizon.years >= 10 ? Math.max(2, Math.ceil(size / 2)) : Math.ceil(size / 2);
  const laundryRoom = plan.rooms.find((room) => /laund|washer|utility/i.test(room.name || ""));
  const daylightRooms = [...livings, ...dinings, ...kitchens, ...beds, ...studies];
  const cores = plan.rooms.filter((room) => /elevat|stair|chute|compactor|\bcore\b|trash/i.test(room.name || ""));
  const pantries = plan.rooms.filter((room) => /pantr/i.test(room.name || ""));
  const mechanicals = plan.rooms.filter((room) => /garage|boiler|mechanical|mech room|roof unit/i.test(room.name || ""));
  const primary = [...beds].sort((a, b) => (Number(b.sf) || 0) - (Number(a.sf) || 0))[0] || beds[0];
  const roomMinFt = (room) => Math.min(Number(room.w) || 0, Number(room.h) || 0) / px;
  const hallSf = halls.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);

  const evalCheck = (id) => {
    if (id === "cutThrough") {
      let delta = 4;
      const notes = [];
      for (const hall of halls) {
        const degree = (adj.get(hall.id) || []).length;
        if (degree >= 4 || hall.sf < 50) {
          delta -= 9;
          flags.bottlenecks.push(hall.id);
          notes.push(`${plainName(hall.name)} is only ${hall.sf} square feet, with ${degree} doors. People will stack there on a busy morning.`);
        }
      }
      if (!morning) {
        delta -= 12;
        notes.push("I cannot walk from a bedroom to the kitchen on the doors you drew.");
      } else if (morning.length > 5) {
        delta -= 6;
        notes.push("The morning path is long. Breakfast will feel farther than the square footage suggests.");
      }
      return { delta, note: notes[0] || "Daily paths have somewhere to go.", passed: delta >= 0, detail: notes };
    }
    if (id === "kitchenTraffic") {
      let delta = 4;
      const notes = [];
      for (const kitchen of kitchens) {
        const degree = (adj.get(kitchen.id) || []).length;
        if (degree >= 3) {
          delta -= 8;
          flags.bottlenecks.push(kitchen.id);
          notes.push(`${plainName(kitchen.name)} has ${degree} openings. Anyone crossing the plan walks through the cook.`);
        }
      }
      if (!kitchens.length) {
        delta -= 6;
        notes.push("I do not see a kitchen on this plan.");
      }
      return { delta, note: notes[0] || "The kitchen sits off the main cross traffic.", passed: delta >= 0, detail: notes };
    }
    if (id === "entryKitchen") {
      if (!entries.length || !kitchens.length) {
        return { delta: -4, note: "There is no clear entry-to-kitchen path yet.", passed: false, detail: [] };
      }
      if (!entryKitchen) {
        return { delta: -8, note: "Bags from the door cannot reach the kitchen on these doors.", passed: false, detail: [] };
      }
      if (entryKitchen.length > 5) {
        return { delta: -5, note: "The path from the door to the kitchen is long for a grocery drop.", passed: false, detail: [] };
      }
      return { delta: 4, note: "The door reaches the kitchen in a short walk.", passed: true, detail: [] };
    }
    if (id === "bedBath") {
      if (!beds.length || !baths.length) {
        return { delta: -8, note: "A bedroom-to-bath path needs both rooms on the plan.", passed: false, detail: [] };
      }
      let far = 0;
      for (const bed of beds) {
        const path = shortestExisting(adj, [bed.id], baths.map((room) => room.id));
        if (!path) far += 1;
        else if (path.length > 4) far += 1;
      }
      if (far) {
        return { delta: -6 * far, note: "Some bedrooms sit far from a bath. Night walks will feel longer than the square footage.", passed: false, detail: [] };
      }
      return { delta: 4, note: "Each bedroom reaches a bath in a short walk.", passed: true, detail: [] };
    }
    if (id === "bedQuiet") {
      if (!beds.length) {
        return { delta: -16, note: "I do not see a bedroom. Quiet scoring stays low until one is on the plan.", passed: false, detail: [] };
      }
      const notes = [];
      let delta = 6;
      for (const bed of beds) {
        const noisy = [...livings, ...kitchens, ...dinings].some((room) => adjacent(adj, bed.id, room.id));
        if (noisy) {
          delta -= 10;
          notes.push(`${plainName(bed.name)} opens onto a social room. Sleep and conversation share a door.`);
        } else {
          flags.quiet.push(bed.id);
        }
      }
      return { delta, note: notes[0] || "Bedrooms sit off the social rooms.", passed: delta >= 0, detail: notes };
    }
    if (id === "sharedWalls") {
      const notes = [];
      let delta = 4;
      for (const bed of beds) {
        const social = [...livings, ...kitchens, ...dinings];
        const shared = social.find((room) => facingWall(bed, room));
        if (shared && !adjacent(adj, bed.id, shared.id)) {
          delta -= 6;
          notes.push(`${plainName(bed.name)} shares a wall with ${plainName(shared.name)}. Sound will travel even without a door.`);
        }
      }
      return { delta, note: notes[0] || "Sleeping rooms do not share a long wall with the loud rooms.", passed: delta >= 0, detail: notes };
    }
    if (id === "wfhZone") {
      if (!profile.wfh) {
        return { delta: 0, note: "No work-from-home room was asked for.", passed: true, detail: [], skip: true };
      }
      const extraBed = beds.length > bedNeed;
      if (!studies.length && !extraBed) {
        return { delta: -8, note: "Work from home wants a study, or a bedroom that is not already spoken for.", passed: false, detail: [] };
      }
      return { delta: 5, note: "There is a room that can stay a work room without stealing a bed.", passed: true, detail: [] };
    }
    if (id === "daylight") {
      if (!daylightRooms.length) {
        return { delta: 0, note: "No living or sleeping rooms to score for daylight.", passed: true, detail: [], skip: true };
      }
      const notes = [];
      let delta = 6;
      for (const room of daylightRooms) {
        const wins = windowsForRoom(room, windowDots, Math.max(8, px));
        const exterior = ["n", "s", "e", "w"].filter((wall) => !wallIsShared(room, wall, plan.rooms)).length;
        const winFt = wins.reduce((sum, win) => sum + (Number(win.w) || px * 4) / px, 0);
        const need = Math.max(3, (Number(room.sf) || 120) / 70);
        if (!wins.length && exterior) {
          delta -= 5;
          notes.push(`${plainName(room.name)} has an exterior wall and no window mark yet.`);
        } else if (winFt + exterior < need) {
          delta -= 3;
          notes.push(`${plainName(room.name)} looks short on glass for its size. Confirm the window marks.`);
        }
      }
      return {
        delta,
        note: notes[0] || "Window marks look in scale with the rooms that want light.",
        passed: delta >= 0,
        detail: notes,
      };
    }
    if (id === "windowOrient") {
      const known = windowDots.filter((dot) => dot.wall || dot.orient);
      if (!known.length) {
        return { delta: 0, note: "Window facing is not on this drawing yet.", passed: true, detail: [], skip: true };
      }
      const southish = windowDots.filter((dot) => dot.wall === "s" || dot.wall === "n").length;
      if (southish) {
        return { delta: 3, note: "Some rooms take light on more than one side. Facing is still a guess from the drawing.", passed: true, detail: [] };
      }
      return { delta: 1, note: "Windows are marked. True compass facing is still unknown.", passed: true, detail: [] };
    }
    if (id === "crossVent") {
      const breezy = daylightRooms.filter((room) => {
        const wins = windowsForRoom(room, windowDots, Math.max(8, px));
        const walls = new Set(wins.map((win) => win.wall || (win.orient === "h" ? "n" : "e")));
        const opposite = (walls.has("n") && walls.has("s")) || (walls.has("e") && walls.has("w"));
        const exterior = ["n", "s", "e", "w"].filter((wall) => !wallIsShared(room, wall, plan.rooms));
        return opposite || exterior.length >= 2;
      });
      if (!breezy.length) {
        return { delta: -5, note: "Few rooms take air on two sides. A cross breeze will be hard without a through-window.", passed: false, detail: [] };
      }
      return { delta: 4, note: `${breezy.length} room${breezy.length === 1 ? "" : "s"} can take air on more than one side.`, passed: true, detail: [] };
    }
    if (id === "closetsPerBed") {
      let need = 16 * size;
      if (profile.cooks) need += 12;
      if (profile.guestsOften || profile.entertainer) need += 10;
      if (profile.kids) need += 12;
      if (profile.pets) need += 8;
      if (horizon.years >= 15) need += 10;
      const gap = need - closetSf;
      const perBed = beds.length ? closets.length / beds.length : closets.length;
      if (gap > 20) {
        for (const closet of closets) flags.strain.push(closet.id);
        if (!closets.length) flags.strain.push(...halls.map((room) => room.id));
        return { delta: -14, note: "Closet space is thin for this household and horizon. Halls will start to hold what rooms cannot.", passed: false, detail: [] };
      }
      if (beds.length && perBed < 1) {
        return { delta: -6, note: "Not every bedroom has a closet. Dressers will take floor you might have wanted for a path.", passed: false, detail: [] };
      }
      if (gap > 0) {
        return { delta: -5, note: "Storage is workable, not generous. A linen closet would take pressure off the halls.", passed: false, detail: [] };
      }
      return { delta: 5, note: "Closets keep up with this household, which keeps the rooms themselves clearer.", passed: true, detail: [] };
    }
    if (id === "entryDrop") {
      if (!entries.length) {
        return { delta: -5, note: "There is no true entry. Coats and bags will land in the first social room.", passed: false, detail: [] };
      }
      const foyer = entries[0];
      if ((foyer.sf || 0) < 30) {
        return { delta: -2, note: "The entry is tight. A small drop zone still beats landing in the living room.", passed: false, detail: [] };
      }
      return { delta: 3, note: "The entry can take a drop zone before the rest of the plan.", passed: true, detail: [] };
    }
    if (id === "laundryAccess") {
      if (ticks.laundryInUnit || laundryRoom) {
        const fromBed = laundryRoom ? shortestExisting(adj, beds.map((room) => room.id), [laundryRoom.id]) : ["ok"];
        if (fromBed && fromBed.length > 6) {
          return { delta: -2, note: "Laundry is in the home, but the walk from a bedroom is long.", passed: false, detail: [] };
        }
        return { delta: 3, note: "Laundry sits in the home, within a fair walk of the bedrooms.", passed: true, detail: [] };
      }
      if (ticks.laundryUnknown) {
        return { delta: 0, note: "Laundry is not marked yet. Ask where the machines live.", passed: true, detail: [] };
      }
      return { delta: -3, note: "I do not see laundry in the home. Confirm with the listing, then tick it if it is there.", passed: false, detail: [] };
    }
    if (id === "fitKids") {
      if (!profile.kids) {
        return { delta: 0, note: "No children in this household.", passed: true, detail: [], skip: true };
      }
      let delta = 2;
      const notes = [];
      if (horizon.years >= 10 && beds.length < 2) {
        delta -= 10;
        notes.push("At a ten-year stay, a second bedroom gives growing children a door of their own.");
      }
      if (horizon.years === 5 && livingSf < 200) {
        delta -= 5;
        notes.push("The first five years with children ask more of the common room than this living room offers.");
      }
      if (beds.length >= bedNeed) delta += 3;
      return { delta, note: notes[0] || "The bedroom count can hold this household of children.", passed: delta >= 0, detail: notes };
    }
    if (id === "fitPets") {
      if (!profile.pets) {
        return { delta: 0, note: "No pets in this household.", passed: true, detail: [], skip: true };
      }
      if (!entries.length) {
        return { delta: -5, note: "Pets do better with a true entry, so the rest of the plan stays cleaner.", passed: false, detail: [] };
      }
      return { delta: 3, note: "The entry gives pets a place to shake off the walk before the living room.", passed: true, detail: [] };
    }
    if (id === "fitGuests") {
      if (!(profile.entertainer || profile.guestsOften)) {
        return { delta: 0, note: "Guests are not a focus for this household.", passed: true, detail: [], skip: true };
      }
      if (!livings.length || !dinings.length || !cook) {
        return { delta: -7, note: "Guests need a living room and a dining room that actually connect.", passed: false, detail: [] };
      }
      return { delta: 4, note: "Guests can sit, then eat, without walking through a bedroom.", passed: true, detail: [] };
    }
    if (id === "agingInPlace") {
      const primary = beds[0];
      const bathNear =
        primary &&
        baths.some((bath) => adjacent(adj, primary.id, bath.id) || (pathBetween(adj, primary.id, bath.id) || []).length <= 3);
      const stepFree = ticks.elevator || Number(building.walkupFloor) === 0 || building.walkupFloor === "0";
      let delta = 2;
      const notes = [];
      if (!bathNear) {
        delta -= 8;
        notes.push("A bath should sit next to the main bedroom if this is meant to age in place.");
      } else {
        notes.push("A bath near the main bedroom helps this plan age in place.");
      }
      if (morning && morning.length <= 4) delta += 2;
      if (Number(building.walkupFloor) >= 2 && !ticks.elevator) {
        delta -= 6;
        notes.push("A walk-up floor asks more of knees over the years. Confirm a step-free path with the listing.");
      } else if (stepFree) {
        delta += 2;
      }
      return { delta, note: notes[0], passed: delta >= 0, detail: notes };
    }
    if (id === "flexibility") {
      const spare = studies.length + Math.max(0, beds.length - bedNeed) + plan.rooms.filter((room) => room.type === "other").length;
      if (profile.homebody && livingSf < 180) {
        return { delta: -4, note: "A homebody household will feel the living room more than a larger common room would.", passed: false, detail: [] };
      }
      if (spare < 1 && horizon.years >= 10) {
        return { delta: -5, note: "There is little spare room to change use over a long stay.", passed: false, detail: [] };
      }
      return { delta: spare ? 4 : 1, note: spare ? "A spare room can change job as the years stack." : "The rooms are spoken for, but they connect cleanly.", passed: true, detail: [] };
    }
    if (id === "growingHh") {
      let delta = 2;
      const notes = [];
      if (beds.length < bedNeed) {
        delta -= 12;
        notes.push("Bedroom count is tight for the household you described.");
      }
      if (totalSf > 0 && totalSf / size < 220) {
        delta -= 5;
        notes.push("Square footage per person is tight. Circulation and storage will do more of the work.");
      }
      if (profile.kids && horizon.years >= 10 && beds.length < 3 && size >= 4) {
        delta -= 4;
        notes.push("A growing household will want another door in a decade.");
      }
      return { delta, note: notes[0] || "There is room for this household to stay a while.", passed: delta >= 0, detail: notes };
    }
    if (id === "floorSlip") {
      if (!ticks.floorGlossWet && !ticks.tileBath) {
        return { delta: 0, note: "No flooring caution ticked. Skip, or mark what you see in the photos.", passed: true, detail: [], skip: true };
      }
      const notes = [];
      let delta = 0;
      if (ticks.floorGlossWet) {
        delta -= 6;
        notes.push("High-gloss floors in a wet area, entry, or stair can be slippery when they are wet. Ask an inspector how they feel underfoot.");
      }
      if (ticks.tileBath) {
        delta -= 4;
        notes.push("Bath tile without much texture can be slick. A bath mat helps, and an inspector can speak to the finish.");
      }
      return { delta, note: notes[0], passed: false, detail: notes, caution: true };
    }
    if (id === "counters") {
      if (!ticks.marbleKitchen && !ticks.laminateCooktop) {
        return { delta: 0, note: "No countertop caution ticked.", passed: true, detail: [], skip: true };
      }
      const notes = [];
      let delta = 0;
      if (ticks.marbleKitchen) {
        delta -= 5;
        notes.push("Marble in a kitchen can etch and stain. Many households love it anyway. Ask how it has been cared for, and let an inspector weigh in.");
      }
      if (ticks.laminateCooktop) {
        delta -= 4;
        notes.push("Laminate next to a cooktop can scorch. Confirm the clearance, then have an inspector look at it.");
      }
      return { delta, note: notes[0], passed: false, detail: notes, caution: true };
    }
    if (id === "cooling") {
      if (ticks.windowAc || ticks.noDucts) {
        return {
          delta: -5,
          note: "Every room has its own AC unit. That usually means no central air. Confirm coverage on a hot day, and ask an inspector about the electrical load.",
          passed: false,
          detail: [],
          caution: true,
        };
      }
      return { delta: 0, note: "Cooling type is not marked yet.", passed: true, detail: [], skip: true };
    }
    if (id === "heating") {
      if (building.heating === "radiators") {
        return { delta: 0, note: "Radiators are marked. They heat slowly and take wall space. Ask how even the rooms feel in winter.", passed: true, detail: [], caution: true };
      }
      if (building.heating === "baseboard") {
        return { delta: 0, note: "Baseboard heat is marked. It can leave cold corners. Ask which rooms get the most use in winter.", passed: true, detail: [], caution: true };
      }
      return { delta: 0, note: "Heating type is not marked yet.", passed: true, detail: [], skip: true };
    }
    if (id === "leadPaint") {
      const year = Number(building.yearBuilt);
      if (!year) {
        return { delta: 0, note: "Year built is not entered. If it is before 1978, ask for the federal lead paint disclosure.", passed: true, detail: [], skip: true };
      }
      if (year < 1978) {
        return {
          delta: -4,
          note: `Built ${year}. Homes from before 1978 fall under the federal lead paint disclosure (EPA/HUD). Ask for that paper, and let an inspector speak to paint, wiring, and plumbing.`,
          passed: false,
          detail: [],
          caution: true,
        };
      }
      if (year < 1990) {
        return {
          delta: -1,
          note: `Built ${year}. Worth asking an inspector about wiring, plumbing, and any older materials.`,
          passed: true,
          detail: [],
          caution: true,
        };
      }
      return { delta: 1, note: `Built ${year}. Still have an inspector walk the systems.`, passed: true, detail: [] };
    }
    if (id === "bathVsBed") {
      if (baths.length < Math.max(1, Math.round(size / 2))) {
        return { delta: -7, note: "Bath count is lean for the morning crush this household would make.", passed: false, detail: [] };
      }
      if (beds.length && baths.length < Math.ceil(beds.length / 2)) {
        return { delta: -4, note: "Fewer baths than bedrooms. Mornings will queue.", passed: false, detail: [] };
      }
      return { delta: 3, note: "Bath count can handle this household's morning.", passed: true, detail: [] };
    }
    if (id === "laundryInUnit") {
      if (ticks.laundryInUnit || laundryRoom) {
        return { delta: 3, note: "Laundry is in the home.", passed: true, detail: [] };
      }
      return { delta: -2, note: "Laundry in the home is not marked. Confirm it before you count on it.", passed: false, detail: [] };
    }
    if (id === "elevatorWalkup") {
      const floor = Number(building.walkupFloor);
      if (ticks.elevator) {
        return { delta: 3, note: "An elevator is marked, which keeps the path step-free.", passed: true, detail: [] };
      }
      if (Number.isFinite(floor) && floor >= 2) {
        return { delta: -6, note: `Walk-up, floor ${floor}. Confirm the stair and whether a step-free path exists.`, passed: false, detail: [], caution: true };
      }
      if (floor === 1 || floor === 0) {
        return { delta: 2, note: "Ground or a low floor is marked.", passed: true, detail: [] };
      }
      return { delta: 0, note: "Elevator or walk-up is not marked yet.", passed: true, detail: [], skip: true };
    }
    if (id === "outdoor") {
      if (ticks.outdoor || terraces.length) {
        return { delta: 3, note: "There is outdoor space on the plan or in the notes.", passed: true, detail: [] };
      }
      return { delta: 0, note: "No outdoor space marked. Tick it if the listing shows a terrace or garden.", passed: true, detail: [], skip: true };
    }
    if (id === "hallAsFoyer") {
      if (!entries.length) {
        return { delta: -6, note: "The plan opens on a hall. Coats and guests will land in the first long corridor.", passed: false, detail: [] };
      }
      const foyer = entries[0];
      const aspect = Math.max(foyer.w, foyer.h) / Math.max(1, Math.min(foyer.w, foyer.h));
      if ((foyer.sf || 0) < 28 || aspect >= 3) {
        return { delta: -5, note: "The entry reads as a hall. There is little room to pause before the rest of the plan.", passed: false, detail: [] };
      }
      return { delta: 3, note: "The entry can hold a pause before the rooms begin.", passed: true, detail: [] };
    }
    if (id === "corridorShare") {
      if (!totalSf || !halls.length) {
        return { delta: 0, note: "Hall share is not a factor on this plan.", passed: true, detail: [], skip: true };
      }
      const share = hallSf / totalSf;
      if (share > 0.18) {
        return { delta: -6, note: "Halls take a large share of the floor. Daily life will spend more time in corridors than the listing square footage suggests.", passed: false, detail: [] };
      }
      return { delta: 2, note: "Halls stay in proportion to the rooms they serve.", passed: true, detail: [] };
    }
    if (id === "pathThroughPrimary") {
      if (!primary) {
        return { delta: 0, note: "No main bedroom to test a daily path against.", passed: true, detail: [], skip: true };
      }
      const daily = [morning, evening, entryKitchen, guest].filter(Boolean);
      const crossed = daily.some((path) => {
        const mid = path.slice(1, -1);
        return mid.includes(primary.id);
      });
      if (crossed) {
        return { delta: -14, note: "A daily path crosses the main bedroom. Privacy and sleep will share the walk.", passed: false, detail: [] };
      }
      return { delta: 4, note: "Daily walks stay out of the main bedroom.", passed: true, detail: [] };
    }
    if (id === "kitchenOrphaned") {
      if (!kitchens.length || !(livings.length || dinings.length)) {
        return { delta: 0, note: "Kitchen distance needs both a kitchen and a living room on the plan.", passed: true, detail: [], skip: true };
      }
      const social = [...livings, ...dinings];
      const near = kitchens.some((kitchen) =>
        social.some((room) => {
          const path = pathBetween(adj, kitchen.id, room.id);
          return adjacent(adj, kitchen.id, room.id) || (path && path.length <= 3);
        }),
      );
      if (!near) {
        return { delta: -12, note: "The kitchen sits far from the living rooms. Cooking and sitting will feel like two houses.", passed: false, detail: [] };
      }
      return { delta: 3, note: "The kitchen sits near the rooms people gather in.", passed: true, detail: [] };
    }
    if (id === "bedsInRow") {
      if (beds.length < 3) {
        return { delta: 0, note: "Not enough bedrooms to pack into a row.", passed: true, detail: [], skip: true };
      }
      const touching = beds.filter((bed) => beds.some((other) => other.id !== bed.id && facingWall(bed, other)));
      if (touching.length >= 3) {
        return { delta: -6, note: "Bedrooms sit packed in a row. Sound and privacy will travel along that wall.", passed: false, detail: [] };
      }
      return { delta: 2, note: "The bedrooms are not packed along one wall.", passed: true, detail: [] };
    }
    if (id === "bedByCore") {
      if (!cores.length || !beds.length) {
        return { delta: 0, note: "No elevator or stair core is marked next to a bedroom.", passed: true, detail: [], skip: true };
      }
      const hit = beds.find((bed) => cores.some((core) => facingWall(bed, core)));
      if (hit) {
        return { delta: -7, note: `${plainName(hit.name)} sits on the elevator or stair. Worth pricing in the sound.`, passed: false, detail: [] };
      }
      return { delta: 2, note: "Bedrooms sit off the elevator and stair.", passed: true, detail: [] };
    }
    if (id === "openPlanEcho") {
      const open = kitchens.some((kitchen) =>
        livings.some((living) => adjacent(adj, kitchen.id, living.id) && (Number(kitchen.sf) || 0) + (Number(living.sf) || 0) >= 350),
      );
      if (open) {
        return { delta: -5, note: "The kitchen and living room share one open volume. Noise and cooking smells will travel.", passed: false, detail: [] };
      }
      return { delta: 2, note: "The kitchen is not an open echo into the main living room.", passed: true, detail: [] };
    }
    if (id === "windowlessBedroom") {
      if (!beds.length) {
        return { delta: 0, note: "No bedroom to test for a window.", passed: true, detail: [], skip: true };
      }
      const dark = beds.find((bed) => {
        const wins = windowsForRoom(bed, windowDots, Math.max(8, px));
        const exterior = ["n", "s", "e", "w"].some((wall) => !wallIsShared(bed, wall, plan.rooms));
        return !wins.length && !exterior;
      });
      if (dark) {
        return { delta: -16, note: `${plainName(dark.name)} has no window and no exterior wall. A bedroom needs daylight.`, passed: false, detail: [] };
      }
      return { delta: 4, note: "Each bedroom has a path to daylight, or an exterior wall to confirm.", passed: true, detail: [] };
    }
    if (id === "darkInterior") {
      const dark = daylightRooms.filter((room) => {
        const wins = windowsForRoom(room, windowDots, Math.max(8, px));
        const exterior = ["n", "s", "e", "w"].some((wall) => !wallIsShared(room, wall, plan.rooms));
        return !wins.length && !exterior;
      });
      if (dark.length) {
        return { delta: -6, note: `${plainName(dark[0].name)} has no window. Confirm whether it borrows light from another room.`, passed: false, detail: [] };
      }
      return { delta: 2, note: "The main rooms have a window or an exterior wall.", passed: true, detail: [] };
    }
    if (id === "coatCloset") {
      if (!entries.length) {
        return { delta: -2, note: "There is no entry closet for coats.", passed: false, detail: [] };
      }
      const near = closets.some((closet) => entries.some((entry) => adjacent(adj, closet.id, entry.id) || facingWall(closet, entry)));
      if (!near) {
        return { delta: -2, note: "No coat closet sits at the entry. Bags will land on a chair.", passed: false, detail: [] };
      }
      return { delta: 2, note: "A closet at the entry can take coats and bags.", passed: true, detail: [] };
    }
    if (id === "pantryDoor") {
      if (!pantries.length) {
        return { delta: 0, note: "No pantry is marked.", passed: true, detail: [], skip: true };
      }
      const wrong = pantries.find((pantry) => !kitchens.some((kitchen) => adjacent(adj, pantry.id, kitchen.id)));
      if (wrong) {
        return { delta: -5, note: "The pantry does not open to the kitchen. That extra step adds up.", passed: false, detail: [] };
      }
      return { delta: 3, note: "The pantry opens to the kitchen.", passed: true, detail: [] };
    }
    if (id === "noPantry") {
      if (pantries.length) {
        return { delta: 2, note: "A pantry is on the plan.", passed: true, detail: [] };
      }
      if (profile.cooks && kitchenSf >= 100) {
        return { delta: 2, note: "The kitchen is large enough to hold tall storage.", passed: true, detail: [] };
      }
      return { delta: -2, note: "No pantry is marked. Tall storage would take pressure off the counters.", passed: false, detail: [] };
    }
    if (id === "primaryCloset") {
      if (!primary) {
        return { delta: 0, note: "No main bedroom to test for a closet.", passed: true, detail: [], skip: true };
      }
      const own = closets.some((closet) => adjacent(adj, primary.id, closet.id) || facingWall(primary, closet));
      if (!own) {
        return { delta: -14, note: "The main bedroom has no closet of its own.", passed: false, detail: [] };
      }
      return { delta: 4, note: "The main bedroom has a closet.", passed: true, detail: [] };
    }
    if (id === "secondaryClosets") {
      const secondary = beds.filter((bed) => !primary || bed.id !== primary.id);
      if (!secondary.length) {
        return { delta: 0, note: "No second bedroom to test for a closet.", passed: true, detail: [], skip: true };
      }
      const missing = secondary.filter((bed) => !closets.some((closet) => adjacent(adj, bed.id, closet.id) || facingWall(bed, closet)));
      if (missing.length) {
        return { delta: -6, note: `${plainName(missing[0].name)} has no closet. Dressers will take floor from the room.`, passed: false, detail: [] };
      }
      return { delta: 3, note: "The other bedrooms have closets.", passed: true, detail: [] };
    }
    if (id === "laundryByBed") {
      if (!laundryRoom || !beds.length) {
        return { delta: 0, note: "Laundry is not marked against a bedroom wall.", passed: true, detail: [], skip: true };
      }
      const hit = beds.find((bed) => facingWall(bed, laundryRoom) || adjacent(adj, bed.id, laundryRoom.id));
      if (hit) {
        return { delta: -2, note: `Laundry sits on a wall with ${plainName(hit.name)}. Machines will be part of the night.`, passed: false, detail: [] };
      }
      return { delta: 1, note: "Laundry is in the home and off the bedroom walls.", passed: true, detail: [] };
    }
    if (id === "tooManyBeds") {
      const common = livings.length + dinings.length + studies.length;
      if (beds.length >= 3 && beds.length > common + 1) {
        return { delta: -6, note: "Bedroom count crowds out the rooms people share.", passed: false, detail: [] };
      }
      return { delta: 2, note: "The bedroom count leaves room for shared life.", passed: true, detail: [] };
    }
    if (id === "tooBig") {
      if (totalSf / size > 900 && beds.length > bedNeed + 1) {
        return { delta: -5, note: "This floor is large for the household you described. Empty rooms still need care.", passed: false, detail: [] };
      }
      return { delta: 1, note: "The size is in range for this household.", passed: true, detail: [] };
    }
    if (id === "bathThroughBed") {
      if (!baths.length || !beds.length) {
        return { delta: 0, note: "Bath access needs both rooms on the plan.", passed: true, detail: [], skip: true };
      }
      const hallBath = baths.some((bath) =>
        (adj.get(bath.id) || []).some((id) => {
          const room = plan.rooms.find((item) => item.id === id);
          return room && room.type !== "bedroom" && room.type !== "closet";
        }),
      );
      if (hallBath || baths.length >= beds.length) {
        return { delta: 3, note: "A bath can be reached without crossing someone else's bedroom.", passed: true, detail: [] };
      }
      const trapped = beds.some((bed) => {
        const path = shortestExisting(adj, [bed.id], baths.map((room) => room.id));
        if (!path) return true;
        return path.slice(1, -1).some((id) => beds.some((other) => other.id === id && other.id !== bed.id));
      });
      if (trapped) {
        return { delta: -7, note: "The only bath is reached through a bedroom. Guests and housemates will cross a private room.", passed: false, detail: [] };
      }
      return { delta: 2, note: "Baths can be reached without a path through another bedroom.", passed: true, detail: [] };
    }
    if (id === "kitchenWidth") {
      if (!kitchens.length) {
        return { delta: 0, note: "No kitchen width to measure.", passed: true, detail: [], skip: true };
      }
      const tight = kitchens.find((kitchen) => roomMinFt(kitchen) < 7);
      if (tight) {
        return { delta: -6, note: `${plainName(tight.name)} is under seven feet wide. Two people will have trouble passing while someone cooks.`, passed: false, detail: [] };
      }
      return { delta: 3, note: "The kitchen is wide enough for two people to pass.", passed: true, detail: [] };
    }
    if (id === "greatRoomWidth") {
      if (!livings.length) {
        return { delta: 0, note: "No living room width to measure.", passed: true, detail: [], skip: true };
      }
      const tight = livings.find((room) => roomMinFt(room) < 16);
      if (tight) {
        return { delta: -6, note: `${plainName(tight.name)} is too narrow for two sofas and a path between them.`, passed: false, detail: [] };
      }
      return { delta: 3, note: "The living room can take two sofas with a path between.", passed: true, detail: [] };
    }
    if (id === "terraceThroughPrimary") {
      if (!terraces.length) {
        return { delta: 0, note: "No terrace is marked.", passed: true, detail: [], skip: true };
      }
      const socialIds = new Set([...livings, ...dinings, ...entries, ...halls].map((room) => room.id));
      const blocked = terraces.filter((terrace) => {
        const reach = adj.get(terrace.id) || [];
        const viaSocial = reach.some((id) => socialIds.has(id));
        const viaPrimary =
          primary &&
          (reach.includes(primary.id) ||
            baths.some((bath) => reach.includes(bath.id) && adjacent(adj, primary.id, bath.id)));
        return !viaSocial && viaPrimary;
      });
      if (blocked.length) {
        return { delta: -12, note: "The terrace is only reached through the main bedroom. Outdoor space becomes private by force.", passed: false, detail: [] };
      }
      return { delta: 3, note: "Outdoor space can be reached without crossing the main bedroom.", passed: true, detail: [] };
    }
    if (id === "outdoorTiny") {
      if (!terraces.length && !ticks.outdoor) {
        return { delta: 0, note: "No outdoor space is marked.", passed: true, detail: [], skip: true };
      }
      const tiny = terraces.find((terrace) => (Number(terrace.sf) || 0) < 25 || roomMinFt(terrace) < 3);
      if (tiny) {
        return { delta: -5, note: `${plainName(tiny.name)} is too small to use as a room outdoors.`, passed: false, detail: [] };
      }
      if (terraces.length || ticks.outdoor) {
        return { delta: 2, note: "The outdoor space is large enough to stand in.", passed: true, detail: [] };
      }
      return { delta: 0, note: "No outdoor space is marked.", passed: true, detail: [], skip: true };
    }
    if (id === "lowFloorStreet") {
      if (!ticks.lowFloorStreet) {
        return { delta: 0, note: "Low floor on a busy street is not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -2,
        note: "Low floor on a busy street is marked. Worth confirming noise at the hours you would be home.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "mechanicalNear") {
      const fromPlan = beds.find((bed) => mechanicals.some((room) => facingWall(bed, room)));
      if (!ticks.mechanicalNear && !fromPlan) {
        return { delta: 0, note: "No bedroom is marked near a boiler, garage, or roof unit.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -6,
        note: "A bedroom sits near a boiler, garage, or roof unit. Worth confirming sound with an inspector.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "noParking") {
      if (!ticks.noParking) {
        return { delta: 0, note: "Parking is not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -4,
        note: "Parking looks hard or costly. Worth confirming the actual arrangement.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "waterStains") {
      if (!ticks.waterStains) {
        return { delta: 0, note: "Stains or fresh paint patches are not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -8,
        note: "Stains or fresh paint patches are marked. Worth confirming with a licensed home inspector.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "noPackage") {
      if (!ticks.noPackage) {
        return { delta: 0, note: "Package handling is not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -2,
        note: "No marked place for packages. Worth confirming how deliveries are handled.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "trashAwkward") {
      if (!ticks.trashAwkward) {
        return { delta: 0, note: "Trash access is not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -2,
        note: "Trash and recycling look awkward to reach. Worth confirming the path.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    if (id === "noBulkStorage") {
      if (!ticks.noBulkStorage) {
        return { delta: 0, note: "Bulk storage is not marked.", passed: true, detail: [], skip: true };
      }
      return {
        delta: -4,
        note: "No marked place for bikes, luggage, or seasonal items. Worth confirming building storage.",
        passed: false,
        detail: [],
        caution: true,
      };
    }
    return { delta: 0, note: "", passed: true, detail: [], skip: true };
  };

  const dimensions = { circulation: 80, quiet: 80, storage: 76, fit: 78, light: 78, comfort: 82 };
  const breakdown = [];
  const notes = [];
  const dimWeight = {
    circulation: 0.26,
    quiet: 0.18,
    storage: 0.16,
    fit: 0.22,
    light: 0.1,
    comfort: 0.08,
  };
  const used = { circulation: 0, quiet: 0, storage: 0, fit: 0, light: 0, comfort: 0 };

  for (const meta of DILIGENCE_CHECKS) {
    const row = cfg.checks?.[meta.id] || { on: false, strictness: "standard" };
    if (!row.on) continue;
    const result = evalCheck(meta.id);
    const severity = meta.severity || row.severity || "tax";
    if (result.skip && result.delta === 0) {
      breakdown.push({
        id: meta.id,
        group: meta.group,
        label: meta.label,
        on: true,
        severity,
        severityLabel: severityLabel(severity),
        strictness: row.strictness || severity,
        delta: 0,
        note: result.note,
        passed: true,
        scanned: true,
        caution: Boolean(result.caution),
      });
      continue;
    }
    const factor = severityFactor(severity);
    const delta = result.delta * (result.delta < 0 ? factor : 1);
    dimensions[meta.dim] = (dimensions[meta.dim] || 80) + delta;
    used[meta.dim] = (used[meta.dim] || 0) + 1;
    breakdown.push({
      id: meta.id,
      group: meta.group,
      label: meta.label,
      on: true,
      severity,
      severityLabel: severityLabel(severity),
      strictness: row.strictness || severity,
      delta: Math.round(delta),
      note: result.note,
      passed: result.passed,
      scanned: true,
      caution: Boolean(result.caution),
    });
    if (result.note) notes.push(result.note);
    for (const extra of result.detail || []) {
      if (extra !== result.note) notes.push(extra);
    }
  }

  if (profile.cooks && kitchenSf < 80 && cfg.checks?.fitGuests) {
    /* kitchen size still colors household fit when cooks is on */
  }
  if (profile.cooks && kitchenSf < 80) {
    dimensions.fit -= 6;
    notes.push("A household that cooks a lot will feel a kitchen under 80 square feet.");
  } else if (profile.cooks && kitchenSf >= 90) {
    dimensions.fit += 3;
  }

  const dimNames = Object.keys(dimensions);
  for (const name of dimNames) {
    dimensions[name] = clamp(Math.round(dimensions[name]), 0, 100);
  }
  let weightSum = 0;
  let acc = 0;
  for (const name of dimNames) {
    if (!used[name] && name !== "circulation" && name !== "quiet" && name !== "storage" && name !== "fit") continue;
    const w = dimWeight[name] || 0.1;
    acc += dimensions[name] * w;
    weightSum += w;
  }
  const score = clamp(Math.round(acc / (weightSum || 1)), 0, 100);

  const uniqueNotes = [];
  const cautionNotes = breakdown.filter((row) => row.caution || row.passed === false).map((row) => row.note);
  for (const note of [...cautionNotes, ...notes]) {
    if (note && !uniqueNotes.includes(note)) uniqueNotes.push(note);
  }
  if (!uniqueNotes.length) uniqueNotes.push("The rooms connect cleanly. Daily paths have somewhere to go.");

  return {
    score,
    dimensions: {
      circulation: dimensions.circulation,
      quiet: dimensions.quiet,
      storage: dimensions.storage,
      fit: dimensions.fit,
      light: dimensions.light,
      comfort: dimensions.comfort,
    },
    notes: uniqueNotes.slice(0, 8),
    breakdown,
    flags,
    totals: { totalSf, closetSf, kitchenSf, livingSf, beds: beds.length, baths: baths.length },
    horizon: horizon.id,
    diligencePreset: presetFromDiligence(cfg),
    checksActive: activeCheckCount(cfg),
    furnishedAssumed: extras.furnished !== false,
  };
}

function roomPxPerFt(room, plan) {
  if (Number(plan?.pxPerFt)) return Number(plan.pxPerFt);
  if (room?.sf > 10 && room.w > 8 && room.h > 8) return Math.sqrt((room.w * room.h) / room.sf);
  return 8;
}

function doorWallsOf(room, plan) {
  const walls = new Set();
  for (const door of plan.doors || []) {
    const otherId = door.a === room.id ? door.b : door.b === room.id ? door.a : null;
    const other = plan.rooms.find((item) => item.id === otherId);
    if (!other) continue;
    const ax2 = room.x + room.w;
    const ay2 = room.y + room.h;
    const bx2 = other.x + other.w;
    const by2 = other.y + other.h;
    const ox = Math.min(ax2, bx2) - Math.max(room.x, other.x);
    const oy = Math.min(ay2, by2) - Math.max(room.y, other.y);
    if (ox > 10 && Math.abs(ay2 - other.y) < 8) walls.add("s");
    else if (ox > 10 && Math.abs(by2 - room.y) < 8) walls.add("n");
    else if (oy > 10 && Math.abs(ax2 - other.x) < 8) walls.add("e");
    else if (oy > 10 && Math.abs(bx2 - room.x) < 8) walls.add("w");
  }
  return walls;
}

function piece(room, kind, x, y, w, h, rot = 0) {
  return {
    id: `${kind}-${room.id}-${Math.round(x)}-${Math.round(y)}`,
    roomId: room.id,
    kind,
    x: Math.round(x),
    y: Math.round(y),
    w: Math.round(w),
    h: Math.round(h),
    rot,
  };
}

export function labelReserve(room) {
  const compact = room.w < 100 || room.h < 88;
  const h = Math.min(room.h * 0.42, compact ? 30 : 40);
  const w = Math.min(room.w - 14, compact ? 68 : 120);
  return { x: room.x + 7, y: room.y + 5, w, h };
}

function doorSpansOn(room, plan) {
  const spans = { n: [], s: [], e: [], w: [] };
  const scale = roomPxPerFt(room, plan);
  const reserve = labelReserve(room);
  spans.n.push([reserve.x - 6, reserve.x + reserve.w + 8]);
  spans.w.push([reserve.y - 4, reserve.y + reserve.h + 6]);
  for (const door of plan.doors || []) {
    const otherId = door.a === room.id ? door.b : door.b === room.id ? door.a : null;
    const other = plan.rooms.find((item) => item.id === otherId);
    if (!other) continue;
    const hit = facingWall(room, other);
    if (!hit) continue;
    const open = room.type === "terrace" || other.type === "terrace" || room.type === "living" || other.type === "living";
    const gap = Math.min(hit.len * 0.55, open ? scale * 7 : scale * 2.7);
    const start = hit.len / 2 - gap / 2;
    if (hit.wall === "n" || hit.wall === "s") spans[hit.wall].push([hit.x + start, hit.x + start + gap]);
    else spans[hit.wall].push([hit.y + start, hit.y + start + gap]);
  }
  return spans;
}

function facingWall(a, b) {
  const ax2 = a.x + a.w;
  const ay2 = a.y + a.h;
  const bx2 = b.x + b.w;
  const by2 = b.y + b.h;
  const ox = Math.min(ax2, bx2) - Math.max(a.x, b.x);
  const oy = Math.min(ay2, by2) - Math.max(a.y, b.y);
  if (ox > 10 && Math.abs(ay2 - b.y) < 8) return { wall: "s", x: Math.max(a.x, b.x), y: ay2, len: ox };
  if (ox > 10 && Math.abs(by2 - a.y) < 8) return { wall: "n", x: Math.max(a.x, b.x), y: a.y, len: ox };
  if (oy > 10 && Math.abs(ax2 - b.x) < 8) return { wall: "e", x: ax2, y: Math.max(a.y, b.y), len: oy };
  if (oy > 10 && Math.abs(bx2 - a.x) < 8) return { wall: "w", x: a.x, y: Math.max(a.y, b.y), len: oy };
  return null;
}

function longestFree(lo, hi, blocked, need) {
  const cuts = blocked
    .map(([a, b]) => [Math.max(lo, a), Math.min(hi, b)])
    .filter(([a, b]) => b - a > 2)
    .sort((a, b) => a[0] - b[0]);
  let cursor = lo;
  let best = [lo, hi];
  let bestLen = -1;
  const consider = (a, b) => {
    const len = b - a;
    if (len > bestLen && len >= need) {
      best = [a, b];
      bestLen = len;
    }
  };
  for (const [a, b] of cuts) {
    if (a > cursor) consider(cursor, a);
    cursor = Math.max(cursor, b);
  }
  if (cursor < hi) consider(cursor, hi);
  if (bestLen >= 0) return best;
  cursor = lo;
  for (const [a, b] of cuts) {
    if (a > cursor && a - cursor > bestLen) {
      best = [cursor, a];
      bestLen = a - cursor;
    }
    cursor = Math.max(cursor, b);
  }
  if (hi - cursor > bestLen) best = [cursor, hi];
  return best;
}

function againstWall(room, plan, kind, ftW, ftH, prefer, used) {
  const s = roomPxPerFt(room, plan);
  const blockedWalls = doorWallsOf(room, plan);
  const spans = doorSpansOn(room, plan);
  const inset = 1.2 * s;
  const order = [prefer, "n", "s", "w", "e"].filter(Boolean);
  const scoreWall = (wall) => {
    const along = wall === "e" || wall === "w";
    const need = (along ? ftH : ftW) * s;
    const lo = along ? room.y + inset : room.x + inset;
    const hi = along ? room.y + room.h - inset : room.x + room.w - inset;
    const free = longestFree(lo, hi, spans[wall] || [], need);
    const len = free[1] - free[0];
    let rank = len;
    if (len < need) rank -= 360;
    if (used?.has(wall)) rank -= 400;
    if (blockedWalls.has(wall) && len < need + 8) rank -= 200;
    if (wall === prefer) rank += 40;
    return { wall, along, need, free, len, rank };
  };
  const picked = order.map(scoreWall).sort((a, b) => b.rank - a.rank)[0] || scoreWall(prefer || "n");
  const wall = picked.wall;
  used?.add(wall);
  const along = wall === "e" || wall === "w";
  const w = (along ? ftH : ftW) * s;
  const h = (along ? ftW : ftH) * s;
  const maxW = room.w - inset * 2;
  const maxH = room.h - inset * 2;
  const span = Math.max(8, picked.free[1] - picked.free[0]);
  const pw = Math.min(w, maxW, along ? w : span);
  const ph = Math.min(h, maxH, along ? span : h);
  const mid = (picked.free[0] + picked.free[1]) / 2;
  let x = room.x + room.w / 2;
  let y = room.y + room.h / 2;
  let rot = 0;
  if (wall === "n") {
    x = mid;
    y = room.y + inset + ph / 2;
    rot = 0;
  } else if (wall === "s") {
    x = mid;
    y = room.y + room.h - inset - ph / 2;
    rot = 180;
  } else if (wall === "w") {
    x = room.x + inset + pw / 2;
    y = mid;
    rot = -90;
  } else {
    x = room.x + room.w - inset - pw / 2;
    y = mid;
    rot = 90;
  }
  return piece(room, kind, x, y, along ? ph : pw, along ? pw : ph, rot);
}

export function furnitureFor(plan, profile, horizonId) {
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const items = [];
  const used = new Map();
  const wallSet = (room) => {
    if (!used.has(room.id)) used.set(room.id, new Set());
    return used.get(room.id);
  };
  const beds = roomsOf(plan, "bedroom").slice().sort((a, b) => (b.sf || 0) - (a.sf || 0) || b.w * b.h - a.w * a.h);
  const livings = roomsOf(plan, "living");
  const dinings = roomsOf(plan, "dining");
  const kitchens = roomsOf(plan, "kitchen");
  const studies = roomsOf(plan, "study");
  const baths = roomsOf(plan, "bath");
  const entries = roomsOf(plan, "entry");

  for (const room of livings) {
    const s = roomPxPerFt(room, plan);
    items.push(againstWall(room, plan, "sofa", 7, 3, "s", wallSet(room)));
    items.push(piece(room, "rug", room.x + room.w / 2, room.y + room.h * 0.58, 9 * s, 6 * s, 0));
  }
  for (const room of dinings) {
    const s = roomPxPerFt(room, plan);
    items.push(piece(room, "rug", room.x + room.w / 2, room.y + room.h / 2, 8 * s, 6 * s, 0));
    items.push(piece(room, "table", room.x + room.w / 2, room.y + room.h / 2, 6 * s, 3.3 * s, 0));
  }
  if (!dinings.length && livings[0] && (profile.entertainer || profile.guestsOften || profile.homebody)) {
    const room = livings[0];
    const s = roomPxPerFt(room, plan);
    items.push(piece(room, "table", room.x + room.w * 0.32, room.y + room.h * 0.38, 6 * s, 3.3 * s, 0));
  }
  for (const room of kitchens) {
    const s = roomPxPerFt(room, plan);
    const blocked = doorWallsOf(room, plan);
    const depth = 2 * s;
    if (!blocked.has("n") && room.w > 8 * s) {
      const reserve = labelReserve(room);
      const left = reserve.x + reserve.w + 6;
      const right = room.x + room.w - 8;
      const cw = right - left;
      if (cw >= 3 * s) {
        items.push(piece(room, "counter", left + cw / 2, room.y + depth / 2 + 4, cw, depth, 0));
        wallSet(room).add("n");
      }
    }
    if (!blocked.has("s") && room.w > 8 * s) {
      items.push(piece(room, "counter", room.x + room.w / 2, room.y + room.h - depth / 2 - 4, room.w - 16, depth, 0));
      wallSet(room).add("s");
    }
    items.push(againstWall(room, plan, "range", 2.5, 2.5, blocked.has("e") ? "w" : "e", wallSet(room)));
    const ftW = room.w / s;
    const ftH = room.h / s;
    if (ftW >= 12 && ftH >= 11) {
      items.push(piece(room, "island", room.x + room.w / 2, room.y + room.h / 2, 6 * s, 3 * s, 0));
    }
  }
  for (const room of baths) {
    const s = roomPxPerFt(room, plan);
    const tiny = room.w / s < 10 || room.h / s < 10;
    items.push(againstWall(room, plan, "tub", tiny ? 4 : 5, tiny ? 2.2 : 2.5, tiny ? "s" : "n", wallSet(room)));
    items.push(againstWall(room, plan, "vanity", tiny ? 2.4 : 3, 1.6, tiny ? "e" : "s", wallSet(room)));
  }
  beds.forEach((room, index) => {
    const s = roomPxPerFt(room, plan);
    const king = room.w / s >= 11 && room.h / s >= 12;
    if (index === 0) {
      items.push(againstWall(room, plan, king ? "king" : "bed", king ? 6.3 : 5, 6.7, "n", wallSet(room)));
      if (profile.kids && beds.length === 1) {
        items.push(againstWall(room, plan, horizon.years <= 5 ? "crib" : "kidbed", horizon.years <= 5 ? 2.5 : 3.2, horizon.years <= 5 ? 4.4 : 6.3, "e", wallSet(room)));
      }
      return;
    }
    if (profile.kids) {
      items.push(againstWall(room, plan, horizon.years <= 5 ? "crib" : "kidbed", horizon.years <= 5 ? 2.5 : 3.2, horizon.years <= 5 ? 4.4 : 6.3, "n", wallSet(room)));
      if ((Number(profile.householdSize) || 1) >= 4 && horizon.years >= 10) {
        items.push(againstWall(room, plan, "kidbed", 3.2, 6.3, "s", wallSet(room)));
      }
      return;
    }
    items.push(againstWall(room, plan, "bed", 5, 6.7, "n", wallSet(room)));
  });
  if (profile.wfh) {
    const deskRoom = studies[0] || (beds.length > 1 && !profile.kids ? beds[1] : null) || livings[0] || beds[0];
    if (deskRoom) items.push(againstWall(deskRoom, plan, "desk", 5, 2.5, studies[0] ? "w" : "e", wallSet(deskRoom)));
  }
  if (profile.pets) {
    const host = livings[0] || entries[0] || plan.rooms[0];
    if (host) {
      const s = roomPxPerFt(host, plan);
      items.push(piece(host, "pet", host.x + 2.2 * s, host.y + host.h - 2.2 * s, 2.2 * s, 1.4 * s, 0));
    }
  }
  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  items.sort((a, b) => {
    const ra = roomMap.get(a.roomId);
    const rb = roomMap.get(b.roomId);
    return (ra?.y || 0) - (rb?.y || 0) || (ra?.x || 0) - (rb?.x || 0);
  });
  return items;
}

export function typicalDay(plan, profile, result) {
  const adj = graphOf(plan);
  const routes = [];
  const seen = new Set();
  const add = (id, label, nodes) => {
    if (!nodes || nodes.length < 2 || seen.has(id)) return;
    seen.add(id);
    routes.push({ id, label, nodes });
  };
  for (const path of result?.flags?.paths || []) add(path.id, path.label, path.nodes);
  const beds = roomsOf(plan, "bedroom").map((room) => room.id);
  const baths = roomsOf(plan, "bath").map((room) => room.id);
  const kitchens = roomsOf(plan, "kitchen").map((room) => room.id);
  const livings = roomsOf(plan, "living").map((room) => room.id);
  const entries = roomsOf(plan, "entry").map((room) => room.id);
  const studies = roomsOf(plan, "study").map((room) => room.id);
  add("wash", "Wash", shortestExisting(adj, beds, baths));
  if (profile.wfh) {
    const desk = studies[0] || beds[1];
    if (desk && kitchens[0]) add("work", "Work", pathBetween(adj, kitchens[0], desk));
  }
  if (profile.kids && beds[1] && livings[0]) add("kids", "Children", pathBetween(adj, livings[0], beds[1]));
  if (profile.pets && entries[0] && livings[0]) add("pets", "Pets", pathBetween(adj, livings[0], entries[0]));
  add("lounge", "Evening", shortestExisting(adj, kitchens, livings));
  return routes;
}

export function horizonNeedLine(year) {
  const n = Number(year) || 0;
  if (n < 6) return "Routines are forming.";
  if (n < 11) return "Privacy and a work room start to matter more.";
  return "Short, gentle paths help a long stay.";
}

export function defaultGuideHello() {
  return "Due-diligence simulator. Enter an address, or drop a plan. You check the doors and windows, then I walk the floor.";
}
