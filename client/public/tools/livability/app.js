import {
  HORIZONS,
  ROOM_TYPES,
  cannotFetchPlan,
  defaultGuideHello,
  emptyProfile,
  furnitureFor,
  heatMap,
  horizonNeedLine,
  makeRiversidePlan,
  makeStahlPlan,
  makeSuttonPlan,
  matchKnownSample,
  scoreLivability,
  typicalDay,
  uid,
} from "./engine.js";
import { furnitureMarkup, renderPlanSvg, setHeatOpacity } from "./draw.js";

// Future billing (not shown in UI): five free runs on this browser, then $1 token packs.
// function canStartRun(store) { return store.runs.length < 5 || (store.tokens || 0) > 0; }
// Future licensed listing work only: ./suggestions.js (SUGGESTIONS_ENABLED). Do not show in v1.

const KEY = "ak-livability-v2";
const TRAITS = [
  { id: "kids", label: "Kids at home" },
  { id: "homebody", label: "Homebody" },
  { id: "wfh", label: "Works from home" },
  { id: "entertainer", label: "Entertains" },
  { id: "pets", label: "Pets" },
  { id: "cooks", label: "Cooks a lot" },
  { id: "guestsOften", label: "Guests often" },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    if (raw && typeof raw === "object") return raw;
  } catch {
    /* empty */
  }
  return { runs: [], collection: [], compare: [], profile: emptyProfile(), horizon: "10" };
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(store));
}

const store = load();
let plan = {
  id: "",
  name: "",
  source: "blank",
  address: "",
  listingUrl: "",
  rooms: [],
  doors: [],
  note: "",
};
let profile = store.profile || emptyProfile();
let horizon = store.horizon || "10";
let lastRun = store.runs[0] || null;
let vision = { available: false, note: "" };
let cinemaRaf = 0;
let cinemaSkip = false;
let cinemaPlaying = false;

function setGuideLive(on) {
  $$(".guide-glyph").forEach((node) => node.classList.toggle("is-live", Boolean(on)));
}

function say(text, mode) {
  const el = $("#guide-speech");
  el.textContent = text;
  el.classList.toggle("doing", mode === "doing");
  setGuideLive(mode === "doing" || cinemaPlaying);
}

function escape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clampNum(value, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(value) || lo));
}

function status() {
  $("#st-state").textContent = lastRun ? "ran" : plan.rooms.length ? "plan" : "idle";
  $("#st-horizon").textContent = `${horizon}y`;
  $("#st-runs").textContent = String(store.runs.length);
  $("#st-compare").textContent = String(store.compare.length);
  $("#st-col").textContent = String(store.collection.length);
}

function layoutIfNeeded(rooms) {
  return rooms.map((room, index) => ({
    ...room,
    id: room.id || uid("rm"),
    x: Number.isFinite(room.x) ? room.x : 20 + (index % 4) * 170,
    y: Number.isFinite(room.y) ? room.y : 16 + Math.floor(index / 4) * 140,
    w: Number.isFinite(room.w) ? room.w : 154,
    h: Number.isFinite(room.h) ? room.h : 120,
  }));
}

function currentFurniture() {
  return plan.rooms.length ? furnitureFor(plan, profile, horizon) : [];
}

function drawPlan(target, result, opts = {}) {
  const host = $(target);
  if (!plan.rooms.length) {
    host.innerHTML = `<p class="empty" style="padding:28px 20px">No plan yet. Look up an address, upload an image, or run a labeled sample.</p>`;
    return;
  }
  const furniture = opts.furniture || (result ? currentFurniture() : []);
  host.innerHTML = renderPlanSvg(plan, {
    heat: result ? heatMap(plan, result) : {},
    furniture,
    furnish: opts.furnish !== false,
    label: "Architectural floor plan",
  });
}

function thumbSvg(run) {
  if (!run.plan?.rooms?.length) return "";
  return renderPlanSvg(run.plan, {
    heat: heatMap(run.plan, run.result),
    furniture: [],
    labels: false,
    label: "Heat thumbnail",
  });
}

function renderRooms() {
  const types = ROOM_TYPES.map((type) => `<option value="${type.id}">${type.label}</option>`).join("");
  $("#room-list").innerHTML = plan.rooms
    .map(
      (room) => `<div class="room-row" data-id="${room.id}">
      <input data-k="name" value="${escape(room.name)}" aria-label="Room name">
      <select data-k="type" aria-label="Room type">${types.replace(`value="${room.type}"`, `value="${room.type}" selected`)}</select>
      <input data-k="sf" type="number" min="10" max="900" value="${room.sf}" aria-label="Square feet">
      <button type="button" data-del-room="${room.id}" aria-label="Remove room">×</button>
    </div>`,
    )
    .join("");
  const options = plan.rooms.map((room) => `<option value="${room.id}">${escape(room.name)}</option>`).join("");
  $("#door-list").innerHTML = plan.doors
    .map(
      (door, index) => `<div class="door-row">
      <select data-door="${index}" data-end="a">${options.replace(`value="${door.a}"`, `value="${door.a}" selected`)}</select>
      <select data-door="${index}" data-end="b">${options.replace(`value="${door.b}"`, `value="${door.b}" selected`)}</select>
      <button type="button" data-del-door="${index}" aria-label="Remove door">×</button>
    </div>`,
    )
    .join("");
  drawPlan("#plan-canvas", lastRun?.result);
}

function renderProfile() {
  $("#household").value = String(profile.householdSize || 2);
  $("#traits").innerHTML = TRAITS.map(
    (trait) =>
      `<button class="toggle" type="button" data-trait="${trait.id}" aria-pressed="${profile[trait.id] ? "true" : "false"}">${trait.label}</button>`,
  ).join("");
}

function renderHorizon() {
  $("#horizons").innerHTML = HORIZONS.map(
    (item) => `<button class="chip" type="button" data-horizon="${item.id}" aria-pressed="${horizon === item.id}">${item.label}</button>`,
  ).join("");
}

function renderScore(result) {
  if (!result) {
    $("#score-num").textContent = "-";
    $("#dims").innerHTML = "";
    $("#notes").innerHTML = "";
    return;
  }
  $("#score-num").textContent = String(result.score);
  $("#dims").innerHTML = [
    ["Circulation", result.dimensions.circulation],
    ["Quiet", result.dimensions.quiet],
    ["Storage", result.dimensions.storage],
    ["Household fit", result.dimensions.fit],
  ]
    .map(
      ([label, value]) =>
        `<div class="dim"><span>${label}</span><div class="barline"><i style="width:${value}%"></i></div><b>${value}</b></div>`,
    )
    .join("");
  $("#notes").innerHTML = result.notes.map((note) => `<li>${escape(note)}</li>`).join("");
}

function renderCollection() {
  const ranked = [...store.collection].sort((a, b) => (b.result?.score || 0) - (a.result?.score || 0));
  if (!ranked.length) {
    $("#collection").innerHTML = `<p class="empty">Empty. Keep a run and it ranks here.</p>`;
    return;
  }
  $("#collection").innerHTML = ranked
    .map(
      (run, index) =>
        `<button type="button" data-open-run="${run.id}"><span class="rank">0${index + 1}</span> <strong>${escape(run.address || run.plan?.name || "Run")}</strong> · ${run.result?.score ?? "-"}</button>`,
    )
    .join("");
}

function renderCompare() {
  const runs = store.compare.map((id) => store.runs.find((run) => run.id === id)).filter(Boolean);
  if (!runs.length) {
    $("#compare").innerHTML = `<p class="empty">Run a few addresses, then pin them here. Score, heat map, and notes sit side by side.</p>`;
    return;
  }
  $("#compare").innerHTML = runs
    .map(
      (run) => `<article class="card">
      <p class="addr">${escape(run.address || run.plan?.name || "Untitled")}</p>
      <strong class="sc">${run.result?.score ?? "-"}</strong>
      <div class="plan-wrap">${thumbSvg(run)}</div>
      <ul class="notes">${(run.result?.notes || []).slice(0, 2).map((note) => `<li>${escape(note)}</li>`).join("")}</ul>
    </article>`,
    )
    .join("");
}

function readForm() {
  $$("#room-list .room-row").forEach((row) => {
    const room = plan.rooms.find((item) => item.id === row.dataset.id);
    if (!room) return;
    room.name = $("[data-k=name]", row).value.trim() || room.name;
    room.type = $("[data-k=type]", row).value;
    room.sf = clampNum($("[data-k=sf]", row).value, 10, 900);
  });
  $$("#door-list .door-row").forEach((row) => {
    const index = Number($("[data-end=a]", row).dataset.door);
    if (!plan.doors[index]) return;
    plan.doors[index].a = $("[data-end=a]", row).value;
    plan.doors[index].b = $("[data-end=b]", row).value;
  });
  plan.address = $("#address").value.trim();
  plan.listingUrl = $("#listing-url").value.trim();
  profile.householdSize = clampNum($("#household").value, 1, 8);
}

function attachPlace() {
  plan.address = $("#address").value.trim();
  plan.listingUrl = $("#listing-url").value.trim();
}

function useDemo(make) {
  const place = $("#address").value.trim();
  const canned = make();
  plan = canned;
  plan.id = uid("plan");
  attachPlace();
  if (!plan.address) plan.address = place;
  if (place && canned.name && !/stahl house/i.test(canned.name)) {
    plan.name = `${place} · ${canned.name}`;
  }
  lastRun = null;
  renderRooms();
  renderScore(null);
  status();
  say(
    place
      ? `Labeled demo on ${place}. Not fetched from a record. Check the rooms, then run.`
      : "Labeled demo. Not a real listing. Add an address if you want it on the compare cards.",
  );
}

function lookup() {
  const address = $("#address").value.trim();
  const listing = $("#listing-url").value.trim();
  const query = address || listing;
  if (!query) {
    say("Start with an address. A listing link is a fallback. I will not invent a floor.");
    return;
  }
  const known = matchKnownSample(query);
  if (known) {
    if (!address) $("#address").value = known.make().address || query;
    useDemo(known.make);
    $("#lookup-note").textContent = `Known sample: ${plan.name}. Sizes are approximate, from published plans.`;
    say(`I have a labeled sample for that address. ${plan.name}. Check the rooms, then run.`);
    return;
  }
  const miss = cannotFetchPlan(query);
  $("#lookup-note").textContent = miss.reason;
  say(miss.reason);
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setPlaying(on) {
  cinemaPlaying = on;
  $("#run-sim").disabled = on;
  $("#bar-run").disabled = on;
  $("#st-state").textContent = on ? "run" : lastRun ? "ran" : plan.rooms.length ? "plan" : "idle";
  setGuideLive(on);
}

function hideCinema() {
  if (cinemaRaf) cancelAnimationFrame(cinemaRaf);
  cinemaRaf = 0;
  cinemaSkip = false;
  $("#cinema").hidden = true;
  setPlaying(false);
}

function landRun(run) {
  hideCinema();
  drawPlan("#plan-canvas", run.result, { furniture: furnitureFor(run.plan, run.profile, run.horizon) });
  renderScore(run.result);
  renderCollection();
  renderCompare();
  status();
  say(`Livability ${run.result.score}. ${run.result.notes[0] || "The rooms connect."}`);
}

function clockAt(u) {
  const minutes = 7 * 60 + Math.round(Math.max(0, Math.min(1, u)) * (22 - 7) * 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function along(pts, t) {
  if (!pts.length) return { x: 0, y: 0 };
  if (pts.length === 1) return pts[0];
  let total = 0;
  const segs = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y) || 1;
    segs.push({ a: pts[i], b: pts[i + 1], len });
    total += len;
  }
  let d = ((t % 2) > 1 ? 2 - (t % 2) : t % 2) * total;
  for (const seg of segs) {
    if (d <= seg.len) {
      const u = d / seg.len;
      return { x: seg.a.x + (seg.b.x - seg.a.x) * u, y: seg.a.y + (seg.b.y - seg.a.y) * u };
    }
    d -= seg.len;
  }
  return pts[pts.length - 1];
}

function playCinema(run) {
  const furniture = furnitureFor(run.plan, run.profile, run.horizon);
  const cells = heatMap(run.plan, run.result);
  const roomMap = new Map(run.plan.rooms.map((room) => [room.id, room]));
  const routes = typicalDay(run.plan, run.profile, run.result)
    .map((route) => ({
      ...route,
      pts: route.nodes
        .map((id) => roomMap.get(id))
        .filter(Boolean)
        .map((room) => ({ x: room.x + room.w / 2, y: room.y + room.h / 2 })),
    }))
    .filter((route) => route.pts.length > 1);
  const walkers = [];
  const count = clampNum(run.profile.householdSize, 1, 5);
  const tones = ["", "b", "c", "d", "b"];
  for (let i = 0; i < count; i += 1) {
    const route = routes[i % Math.max(1, routes.length)];
    if (!route) continue;
    walkers.push({ pts: route.pts, phase: i * 0.28, tone: tones[i], history: [] });
  }
  if (run.profile.pets && routes.length) {
    const pet = routes.find((route) => route.id === "pets") || routes[0];
    walkers.push({ pts: pet.pts, phase: 0.7, tone: "b", history: [] });
  }

  const extras = `${walkers
    .map((_, i) => `<polyline class="trail-soft" data-trail="${i}" points=""></polyline>`)
    .join("")}${walkers
    .map((_, i) => `<circle class="walker ${walkers[i].tone}" data-w="${i}" cx="-40" cy="-40" r="3.2" opacity="0"></circle>`)
    .join("")}`;
  $("#cinema-stage").innerHTML = renderPlanSvg(run.plan, {
    heat: cells,
    heatU: 0,
    furniture,
    furnish: false,
    extras,
    label: "Bird's-eye simulation",
  });
  $("#cinema").hidden = false;
  $("#cin-clock").textContent = "07:00";
  $("#cin-year").textContent = `horizon ${run.horizon}y`;
  $("#cin-score").textContent = "";
  $("#cin-need").textContent = "The rooms take their furniture.";
  setPlaying(true);
  say("The rooms take their furniture.", "doing");

  const roomsOrder = [];
  for (const item of furniture) {
    if (!roomsOrder.includes(item.roomId)) roomsOrder.push(item.roomId);
  }
  const FURNISH = 2200;
  const DAY = 2800;
  const YEARS = 900;
  const SCORE = 700;
  const TOTAL = FURNISH + DAY + YEARS + SCORE;
  const yearsMax = HORIZONS.find((item) => item.id === run.horizon)?.years || 10;
  const svg = $("#cinema-stage svg");
  const furnNodes = furniture.map((item) => svg.querySelector(`[data-furn="${item.id}"]`));
  const walkerNodes = walkers.map((_, i) => svg.querySelector(`[data-w="${i}"]`));
  const trailNodes = walkers.map((_, i) => svg.querySelector(`[data-trail="${i}"]`));
  let spoken = "furnish";
  const t0 = performance.now();

  const tick = (now) => {
    const t = cinemaSkip ? TOTAL : now - t0;
    if (t >= TOTAL) {
      landRun(run);
      return;
    }
    if (t < FURNISH) {
      const u = t / FURNISH;
      roomsOrder.forEach((roomId, index) => {
        const start = index / Math.max(1, roomsOrder.length);
        const local = Math.max(0, Math.min(1, (u - start) * roomsOrder.length));
        const ease = 1 - (1 - local) ** 3;
        furniture.forEach((item, fi) => {
          if (item.roomId !== roomId || !furnNodes[fi]) return;
          const y = item.y + 14 * (1 - ease);
          furnNodes[fi].setAttribute("opacity", String(ease));
          furnNodes[fi].setAttribute("transform", `translate(${item.x} ${y}) rotate(${item.rot || 0})`);
        });
      });
      $("#cin-clock").textContent = "07:00";
      $("#cin-need").textContent = "Furniture finds the walls, room by room.";
      setHeatOpacity(svg, cells, 0);
    } else if (t < FURNISH + DAY) {
      if (spoken !== "day") {
        spoken = "day";
        say("A typical day, sped up. Watch the paths heat.", "doing");
      }
      furniture.forEach((item, fi) => {
        if (!furnNodes[fi]) return;
        furnNodes[fi].setAttribute("opacity", "1");
        furnNodes[fi].setAttribute("transform", `translate(${item.x} ${item.y}) rotate(${item.rot || 0})`);
      });
      const u = (t - FURNISH) / DAY;
      $("#cin-clock").textContent = clockAt(u);
      $("#cin-year").textContent = "year 1";
      $("#cin-need").textContent = "Morning, return, the rooms that get used.";
      walkerNodes.forEach((node, i) => {
        if (!node) return;
        const pos = along(walkers[i].pts, u * 2.4 + walkers[i].phase);
        node.setAttribute("cx", String(pos.x));
        node.setAttribute("cy", String(pos.y));
        node.setAttribute("opacity", "1");
        walkers[i].history.push(pos);
        if (walkers[i].history.length > 28) walkers[i].history.shift();
        trailNodes[i]?.setAttribute("points", walkers[i].history.map((pt) => `${pt.x},${pt.y}`).join(" "));
      });
      setHeatOpacity(svg, cells, u);
    } else if (t < FURNISH + DAY + YEARS) {
      if (spoken !== "years") {
        spoken = "years";
        say("Needs shift as the years stack.", "doing");
      }
      const u = (t - FURNISH - DAY) / YEARS;
      const year = Math.max(1, Math.round(u * yearsMax));
      $("#cin-clock").textContent = "22:00";
      $("#cin-year").textContent = yearsMax >= 15 && year >= 15 ? "15+" : `year ${year}`;
      $("#cin-need").textContent = horizonNeedLine(year);
      walkerNodes.forEach((node) => node?.setAttribute("opacity", String(1 - u * 0.65)));
      setHeatOpacity(svg, cells, 1);
    } else {
      if (spoken !== "score") {
        spoken = "score";
        say(`Livability ${run.result.score}. ${run.result.notes[0] || "The rooms connect."}`, "doing");
      }
      const u = (t - FURNISH - DAY - YEARS) / SCORE;
      const shown = Math.round(run.result.score * (1 - (1 - u) ** 2));
      $("#cin-score").textContent = String(shown);
      $("#cin-need").textContent = "The score lands on the layout, not the neighborhood.";
      setHeatOpacity(svg, cells, 1);
    }
    cinemaRaf = requestAnimationFrame(tick);
  };
  cinemaRaf = requestAnimationFrame(tick);
}

function runSimulation() {
  if (cinemaPlaying) return;
  readForm();
  if (plan.rooms.length < 2) {
    say("I still need a plan. I cannot fetch one from that address. Upload an image or use a labeled demo.");
    return;
  }
  const result = scoreLivability(plan, profile, horizon);
  const run = {
    id: uid("run"),
    address: plan.address || plan.name || "Untitled",
    plan: structuredClone(plan),
    profile: structuredClone(profile),
    horizon,
    result,
    at: new Date().toISOString(),
  };
  lastRun = run;
  store.runs.unshift(run);
  store.profile = profile;
  store.horizon = horizon;
  save();
  if (prefersReduced()) {
    landRun(run);
    return;
  }
  playCinema(run);
}

function keepCollection() {
  if (!lastRun) {
    say("Run a simulation first, then I can keep it in the collection.");
    return;
  }
  if (store.collection.some((run) => run.id === lastRun.id)) {
    say("Already in the collection.");
    return;
  }
  store.collection.push(lastRun);
  save();
  renderCollection();
  status();
  say("Kept. Collection ranks by score. A personal shortlist of layouts, not of neighborhoods.");
}

function addCompare() {
  if (!lastRun) {
    say("Run a simulation first, then pin it to compare.");
    return;
  }
  if (store.compare.includes(lastRun.id)) {
    say("That run is already on the compare row.");
    return;
  }
  store.compare = [...store.compare, lastRun.id].slice(-3);
  save();
  renderCompare();
  status();
  say("Pinned beside the others. Walk the heat maps, then decide which layout you prefer.");
}

function openRun(id) {
  const run = store.runs.find((item) => item.id === id) || store.collection.find((item) => item.id === id);
  if (!run) return;
  lastRun = run;
  plan = structuredClone(run.plan);
  profile = structuredClone(run.profile || emptyProfile());
  horizon = run.horizon || horizon;
  $("#address").value = plan.address || "";
  $("#listing-url").value = plan.listingUrl || "";
  renderRooms();
  renderProfile();
  renderHorizon();
  renderScore(run.result);
  drawPlan("#plan-canvas", run.result);
  status();
  say(`Opened ${run.address}. Livability ${run.result?.score ?? "-"}.`);
}

async function checkVision() {
  try {
    const res = await fetch("/api/livability/vision-status");
    if (!res.ok) throw new Error("status");
    vision = await res.json();
  } catch {
    vision = {
      available: false,
      note: "Image reading is not configured on this deploy. Upload still stores a name. Rooms come from a demo or the editor.",
    };
  }
  $("#vision-note").textContent = vision.available
    ? "An uploaded floor-plan image can be read."
    : "Upload reading coming soon. Try a sample or build the rooms.";
}

async function onUpload(file) {
  if (!file) return;
  attachPlace();
  plan.imageName = file.name;
  plan.source = "upload";
  plan.name = file.name.replace(/\.[^.]+$/, "") || "Uploaded plan";
  if (!plan.id) plan.id = uid("plan");
  if (!vision.available) {
    say("I have the file name. Upload reading is not ready on this deploy. Use a sample or the room editor.");
    return;
  }
  say("Reading the uploaded plan. If I cannot see rooms, I will say so.", "doing");
  const image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  try {
    const res = await fetch("/api/livability/read-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    const body = await res.json();
    if (!body.ok || !body.rooms?.length) {
      say(body.error || "I could not read rooms from that image.");
      return;
    }
    plan.rooms = layoutIfNeeded(body.rooms);
    plan.doors = Array.isArray(body.doors) ? body.doors : [];
    plan.source = "vision";
    renderRooms();
    say(`I found ${plan.rooms.length} rooms. Check the names and doors, then run.`);
  } catch {
    say("The vision request failed. Nothing was invented.");
  }
}

function bind() {
  $("#lookup").addEventListener("click", lookup);
  $("#use-sutton").addEventListener("click", () => useDemo(makeSuttonPlan));
  $("#use-riverside").addEventListener("click", () => useDemo(makeRiversidePlan));
  $("#use-stahl").addEventListener("click", () => {
    if (!$("#address").value.trim()) $("#address").value = "1635 Woods Dr, Los Angeles, CA 90069";
    useDemo(makeStahlPlan);
  });
  $("#plan-file").addEventListener("change", (event) => onUpload(event.target.files?.[0]));
  $("#run-sim").addEventListener("click", runSimulation);
  $("#bar-run").addEventListener("click", runSimulation);
  $("#cin-skip").addEventListener("click", () => {
    cinemaSkip = true;
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cinemaPlaying) cinemaSkip = true;
  });
  $("#keep-col").addEventListener("click", keepCollection);
  $("#add-compare").addEventListener("click", addCompare);
  $("#traits").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-trait]");
    if (!btn) return;
    profile[btn.dataset.trait] = !profile[btn.dataset.trait];
    btn.setAttribute("aria-pressed", profile[btn.dataset.trait] ? "true" : "false");
  });
  $("#horizons").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-horizon]");
    if (!btn) return;
    horizon = btn.dataset.horizon;
    store.horizon = horizon;
    save();
    renderHorizon();
    status();
    say(HORIZONS.find((item) => item.id === horizon).blurb);
  });
  $("#room-list").addEventListener("input", () => {
    readForm();
    drawPlan("#plan-canvas", lastRun?.result);
  });
  $("#room-list").addEventListener("click", (event) => {
    const id = event.target.dataset.delRoom;
    if (!id) return;
    plan.rooms = plan.rooms.filter((room) => room.id !== id);
    plan.doors = plan.doors.filter((door) => door.a !== id && door.b !== id);
    renderRooms();
  });
  $("#door-list").addEventListener("change", readForm);
  $("#door-list").addEventListener("click", (event) => {
    const index = event.target.dataset.delDoor;
    if (index == null) return;
    plan.doors.splice(Number(index), 1);
    renderRooms();
  });
  $("#add-room").addEventListener("click", () => {
    const n = plan.rooms.length;
    plan.rooms.push({
      id: uid("rm"),
      name: `Room ${n + 1}`,
      type: "other",
      sf: 80,
      x: 20 + (n % 4) * 170,
      y: 16 + Math.floor(n / 4) * 140,
      w: 154,
      h: 120,
    });
    renderRooms();
  });
  $("#add-door").addEventListener("click", () => {
    if (plan.rooms.length < 2) return;
    plan.doors.push({ a: plan.rooms[0].id, b: plan.rooms[1].id });
    renderRooms();
  });
  $("#collection").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-open-run]");
    if (btn) openRun(btn.dataset.openRun);
  });
  $$("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.jump;
      const node = id === "collection" ? $("#collection") : $(`.pane[data-pane="${id}"]`) || $(`#${id}`);
      node?.scrollIntoView({ block: "start", behavior: "smooth" });
      $$(".pane").forEach((pane) => pane.classList.toggle("on", pane.dataset.pane === id || (id === "collection" && pane.dataset.pane === "compare")));
    });
  });
  $$(".pane").forEach((pane) => {
    pane.addEventListener("pointerdown", () => {
      $$(".pane").forEach((node) => node.classList.remove("on"));
      pane.classList.add("on");
    });
  });
}

say(defaultGuideHello());
$("#address").value = "";
renderRooms();
renderProfile();
renderHorizon();
renderScore(lastRun?.result);
renderCollection();
renderCompare();
status();
bind();
checkVision();
