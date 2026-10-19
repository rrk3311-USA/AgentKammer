/** Livability v1 scoring. Deterministic room-graph rules. Layout only. */
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
  return {
    id: "plan-sutton-sample",
    name: "Sutton sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A classic two-bedroom line, drawn for this tool. Not a real listing.",
  };
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
  return {
    id: "plan-riverside-sample",
    name: "Riverside sample",
    source: "sample",
    address: "",
    listingUrl: "",
    imageName: "",
    rooms,
    doors,
    note: "Labeled demo. A railroad one-bedroom line, drawn for this tool. Not a real listing.",
  };
}

export const DEMO_PLANS = [
  { id: "sutton", label: "Sutton line", make: makeSuttonPlan },
  { id: "riverside", label: "Riverside line", make: makeRiversidePlan },
];

export function cannotFetchPlan(query) {
  const place = String(query || "").trim() || "that address";
  return {
    ok: false,
    reason: `No floor plan is on file for ${place}. This version cannot read a listing page or a tax record. Upload a plan, or run a labeled demo against this address.`,
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

export function scoreLivability(plan, profile, horizonId) {
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
  const size = clamp(Number(profile.householdSize) || 1, 1, 8);
  const horizon = HORIZONS.find((item) => item.id === horizonId) || HORIZONS[0];
  const totalSf = plan.rooms.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const closetSf = closets.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const kitchenSf = kitchens.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);
  const livingSf = livings.reduce((sum, room) => sum + (Number(room.sf) || 0), 0);

  const notes = [];
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

  if (morning) flags.paths.push({ id: "morning", label: "Morning", nodes: morning });
  if (evening) flags.paths.push({ id: "return", label: "Return", nodes: evening });
  if (guest) flags.paths.push({ id: "guest", label: "Guests", nodes: guest });
  if (cook) flags.paths.push({ id: "cook", label: "Kitchen to dining", nodes: cook });

  let circulation = 78;
  if (!morning) {
    circulation -= 16;
    notes.push("I cannot walk from a bedroom to the kitchen on the doors you drew.");
  } else if (morning.length > 5) {
    circulation -= 8;
    notes.push("The morning path is long. Breakfast will feel farther than the square footage suggests.");
  }
  if (!evening) {
    circulation -= 10;
    notes.push("There is no door path from the entry to a bedroom.");
  }
  for (const hall of halls) {
    const degree = (adj.get(hall.id) || []).length;
    if (degree >= 4 || hall.sf < 50) {
      circulation -= 7;
      flags.bottlenecks.push(hall.id);
      notes.push(`${hall.name} is doing too much work for its size. Most days will meet there.`);
    }
  }
  for (const kitchen of kitchens) {
    const degree = (adj.get(kitchen.id) || []).length;
    if (degree >= 3) {
      circulation -= 6;
      flags.bottlenecks.push(kitchen.id);
      notes.push(`${kitchen.name} sits on a through path. Cooking and walking will share the same floor.`);
    }
  }
  if (profile.homebody && livingSf < 180) {
    circulation -= 5;
    notes.push("A homebody household will feel the living room more than a larger common room would.");
  }

  let quiet = 80;
  for (const bed of beds) {
    const noisy = [...livings, ...kitchens, ...dinings].some((room) => adjacent(adj, bed.id, room.id));
    if (noisy) {
      quiet -= 12;
      notes.push(`${bed.name} opens onto a social room. Sleep and talk will share a door.`);
    } else {
      flags.quiet.push(bed.id);
    }
  }
  if (profile.kids && horizon.years >= 10 && beds.length < 2) {
    quiet -= 10;
    notes.push("At a ten-year stay, a second bedroom gives growing children a door of their own.");
  }
  if (!beds.length) {
    quiet -= 20;
    notes.push("I do not see a bedroom. Quiet scoring stays low until one is on the plan.");
  }

  let storage = 74;
  let need = 16 * size;
  if (profile.cooks) need += 12;
  if (profile.guestsOften || profile.entertainer) need += 10;
  if (profile.kids) need += 12;
  if (profile.pets) need += 8;
  if (horizon.years >= 15) need += 10;
  const gap = need - closetSf;
  if (gap > 20) {
    storage -= 18;
    for (const closet of closets) flags.strain.push(closet.id);
    if (!closets.length) flags.strain.push(...halls.map((room) => room.id));
    notes.push("Closet space is thin for this household and horizon. Halls will start to hold what rooms cannot.");
  } else if (gap > 0) {
    storage -= 8;
    notes.push("Storage is workable, not generous. A linen closet would take pressure off the halls.");
  } else {
    notes.push("Closets keep up with this household, which keeps the rooms themselves clearer.");
  }

  let fit = 76;
  const bedNeed = profile.kids && horizon.years >= 10 ? Math.max(2, Math.ceil(size / 2)) : Math.ceil(size / 2);
  if (beds.length < bedNeed) {
    fit -= 14;
    notes.push("Bedroom count is tight for the household you described.");
  }
  if (baths.length < Math.max(1, Math.round(size / 2))) {
    fit -= 8;
    notes.push("Bath count is lean for the morning crush this household would make.");
  }
  if (profile.cooks && kitchenSf < 80) {
    fit -= 10;
    notes.push("A household that cooks a lot will feel a kitchen under 80 square feet.");
  } else if (profile.cooks && kitchenSf >= 90) {
    fit += 4;
  }
  if ((profile.entertainer || profile.guestsOften) && (!livings.length || !dinings.length || !cook)) {
    fit -= 8;
    notes.push("Guests need a living room and a dining room that actually connect.");
  }
  if (profile.wfh) {
    const extraBed = beds.length > bedNeed;
    if (!studies.length && !extraBed) {
      fit -= 10;
      notes.push("Work from home wants a study, or a bedroom that is not already spoken for.");
    } else {
      fit += 4;
      notes.push("There is a room that can stay a work room without stealing a bed.");
    }
  }
  if (profile.pets && !entries.length) {
    fit -= 6;
    notes.push("Pets do better with a true entry, so the rest of the plan stays cleaner.");
  }
  if (horizon.years >= 15) {
    const primary = beds[0];
    const bathNear = primary && baths.some((bath) => adjacent(adj, primary.id, bath.id) || pathBetween(adj, primary.id, bath.id)?.length <= 3);
    if (!bathNear) {
      fit -= 10;
      notes.push("For a long stay, a bath should sit next to the main bedroom.");
    } else {
      fit += 3;
      notes.push("A bath near the main bedroom helps this plan age in place.");
    }
    if (morning && morning.length <= 4) fit += 3;
  }
  if (horizon.years === 5 && profile.kids && livingSf < 200) {
    fit -= 6;
    notes.push("The first five years with children ask more of the common room than this living room offers.");
  }
  if (totalSf > 0 && totalSf / size < 220) {
    fit -= 6;
    notes.push("Square footage per person is tight. Circulation and storage will do more of the work.");
  }

  circulation = clamp(Math.round(circulation), 0, 100);
  quiet = clamp(Math.round(quiet), 0, 100);
  storage = clamp(Math.round(storage), 0, 100);
  fit = clamp(Math.round(fit), 0, 100);
  const score = clamp(Math.round(circulation * 0.3 + quiet * 0.22 + storage * 0.2 + fit * 0.28), 0, 100);

  if (!notes.length) {
    notes.push("The rooms connect cleanly. Daily paths have somewhere to go.");
  }

  return {
    score,
    dimensions: {
      circulation,
      quiet,
      storage,
      fit,
    },
    notes: notes.slice(0, 7),
    flags,
    totals: { totalSf, closetSf, kitchenSf, livingSf, beds: beds.length, baths: baths.length },
    horizon: horizon.id,
  };
}

export function defaultGuideHello() {
  return "Due-diligence simulator. Enter an address. I try to walk the floor: circulation, daily paths, a heat map, a score. You describe your own household. I stay with the rooms.";
}
