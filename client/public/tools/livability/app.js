import {
  HORIZONS,
  ROOM_TYPES,
  cannotFetchPlan,
  defaultGuideHello,
  emptyProfile,
  furnitureFor,
  furnitureMarkup,
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

function say(text, mode) {
  const el = $("#guide-speech");
  el.textContent = text;
  el.classList.toggle("doing", mode === "doing");
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
    host.innerHTML = `<p class="empty" style="padding:20px">No plan yet. Look up an address, upload an image, or run a labeled demo.</p>`;
    return;
  }
  const heat = result ? heatMap(plan, result) : {};
  const maxX = Math.max(...plan.rooms.map((room) => room.x + room.w), 420);
  const maxY = Math.max(...plan.rooms.map((room) => room.y + room.h), 280);
  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  const paths = (result?.flags?.paths || [])
    .map((path) => {
      const pts = path.nodes
        .map((id) => roomMap.get(id))
        .filter(Boolean)
        .map((room) => `${room.x + room.w / 2},${room.y + room.h / 2}`);
      return pts.length > 1 ? `<polyline class="path" points="${pts.join(" ")}"></polyline>` : "";
    })
    .join("");
  const rects = plan.rooms
    .map((room) => {
      const cell = heat[room.id];
      const zone = cell?.zone || "calm";
      return `<g>
        <rect class="room-rect ${zone}" data-room="${room.id}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}"/>
        <text class="room-lab" x="${room.x + 7}" y="${room.y + 16}">${escape(room.name)}</text>
        <text class="room-lab" x="${room.x + 7}" y="${room.y + 28}" style="opacity:.55">${room.sf}sf${cell ? ` · ${cell.traffic}` : ""}</text>
      </g>`;
    })
    .join("");
  const furniture = opts.furniture || (result ? currentFurniture() : []);
  const furn = furniture.map((item) => furnitureMarkup(item, opts.furnish !== false)).join("");
  host.innerHTML = `<svg class="plan-svg" viewBox="0 0 ${maxX + 20} ${maxY + 20}" role="img" aria-label="Floor plan heat map">${rects}${paths}${furn}</svg>`;
}

function thumbSvg(run) {
  const rooms = run.plan?.rooms || [];
  if (!rooms.length) return "";
  const heat = heatMap(run.plan, run.result);
  const maxX = Math.max(...rooms.map((room) => room.x + room.w), 200);
  const maxY = Math.max(...rooms.map((room) => room.y + room.h), 160);
  const rects = rooms
    .map((room) => {
      const zone = heat[room.id]?.zone || "calm";
      return `<rect class="room-rect ${zone}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}"/>`;
    })
    .join("");
  return `<svg class="plan-svg" viewBox="0 0 ${maxX + 16} ${maxY + 16}" aria-hidden="true">${rects}</svg>`;
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
    (item) => `<button class="chip" type="button" data-horizon="${item.id}" aria-pressed="${horizon === item.id}">
      ${item.label}<br><span class="fine">${item.blurb}</span>
    </button>`,
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

function paintHeat(root, cells, u) {
  for (const room of plan.rooms) {
    const rect = root.querySelector(`rect[data-room="${room.id}"]`);
    const cell = cells[room.id];
    if (!rect || !cell) continue;
    const intensity = cell.intensity * u;
    let zone = "calm";
    if (u > 0.15 && cell.zone === "quiet" && intensity < 0.33) zone = "quiet";
    else if (cell.zone === "pinch" && intensity >= 0.4) zone = "pinch";
    else if (intensity >= 0.66) zone = "hot";
    else if (intensity >= 0.33) zone = "flow";
    rect.setAttribute("class", `room-rect ${zone}`);
  }
}

function playCinema(run) {
  const furniture = furnitureFor(run.plan, run.profile, run.horizon);
  const cells = heatMap(run.plan, run.result);
  const roomMap = new Map(run.plan.rooms.map((room) => [room.id, room]));
  const routes = typicalDay(run.plan, run.profile, run.result)
    .map((route) => ({
      ...route,
      pts: route.nodes.map((id) => roomMap.get(id)).filter(Boolean).map((room) => ({
        x: room.x + room.w / 2,
        y: room.y + room.h / 2,
      })),
    }))
    .filter((route) => route.pts.length > 1);
  const walkers = [];
  const count = clampNum(run.profile.householdSize, 1, 5);
  const tones = ["", "b", "c", "d", "b"];
  for (let i = 0; i < count; i += 1) {
    const route = routes[i % Math.max(1, routes.length)];
    if (!route) continue;
    walkers.push({ pts: route.pts, phase: i * 0.28, tone: tones[i], r: 5 - (i % 2) });
  }
  if (run.profile.pets && routes.length) {
    const pet = routes.find((route) => route.id === "pets") || routes[0];
    walkers.push({ pts: pet.pts, phase: 0.7, tone: "b", r: 3.4 });
  }

  const maxX = Math.max(...run.plan.rooms.map((room) => room.x + room.w), 420);
  const maxY = Math.max(...run.plan.rooms.map((room) => room.y + room.h), 280);
  const rects = run.plan.rooms
    .map(
      (room) => `<g>
        <rect class="room-rect calm" data-room="${room.id}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}"/>
        <text class="room-lab" x="${room.x + 7}" y="${room.y + 16}">${escape(room.name)}</text>
      </g>`,
    )
    .join("");
  const trails = routes
    .map((route) => `<polyline class="trail" points="${route.pts.map((pt) => `${pt.x},${pt.y}`).join(" ")}"></polyline>`)
    .join("");
  const furn = furniture.map((item) => furnitureMarkup(item, false)).join("");
  const dots = walkers
    .map((_, i) => `<circle class="walker ${walkers[i].tone}" data-w="${i}" cx="-20" cy="-20" r="${walkers[i].r}" opacity="0"></circle>`)
    .join("");
  $("#cinema-stage").innerHTML = `<svg class="plan-svg" viewBox="0 0 ${maxX + 20} ${maxY + 20}" aria-hidden="true">${rects}${trails}${furn}${dots}</svg>`;
  $("#cinema").hidden = false;
  $("#cin-clock").textContent = "07:00";
  $("#cin-year").textContent = `horizon ${run.horizon}y`;
  $("#cin-need").textContent = "The rooms take their furniture.";
  setPlaying(true);
  say("The rooms take their furniture.", "doing");

  const roomsOrder = [];
  for (const item of furniture) {
    if (!roomsOrder.includes(item.roomId)) roomsOrder.push(item.roomId);
  }
  const FURNISH = 2000;
  const DAY = 2600;
  const YEARS = 900;
  const TOTAL = FURNISH + DAY + YEARS;
  const yearsMax = HORIZONS.find((item) => item.id === run.horizon)?.years || 10;
  const svg = $("#cinema-stage svg");
  const furnNodes = furniture.map((item) => svg.querySelector(`[data-furn="${item.id}"]`));
  const walkerNodes = walkers.map((_, i) => svg.querySelector(`[data-w="${i}"]`));
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
          const y = item.y - 16 * (1 - ease);
          furnNodes[fi].setAttribute("opacity", String(ease));
          furnNodes[fi].setAttribute(
            "transform",
            `translate(${item.x} ${y}) scale(${(item.scale || 1) * (0.86 + 0.14 * ease)})`,
          );
        });
      });
      $("#cin-clock").textContent = "07:00";
      $("#cin-need").textContent = "Beds, a sofa, the table. Room by room.";
    } else if (t < FURNISH + DAY) {
      if (spoken !== "day") {
        spoken = "day";
        say("A typical day, sped up. Watch the paths heat.", "doing");
      }
      furniture.forEach((item, fi) => {
        if (!furnNodes[fi]) return;
        furnNodes[fi].setAttribute("opacity", "1");
        furnNodes[fi].setAttribute("transform", `translate(${item.x} ${item.y}) scale(${item.scale || 1})`);
      });
      const u = (t - FURNISH) / DAY;
      $("#cin-clock").textContent = clockAt(u);
      $("#cin-year").textContent = `year 1`;
      $("#cin-need").textContent = "Morning, return, the rooms that get used.";
      walkerNodes.forEach((node, i) => {
        if (!node) return;
        const pos = along(walkers[i].pts, u * 2.4 + walkers[i].phase);
        node.setAttribute("cx", String(pos.x));
        node.setAttribute("cy", String(pos.y));
        node.setAttribute("opacity", "1");
      });
      paintHeat(svg, cells, u);
    } else {
      if (spoken !== "years") {
        spoken = "years";
        say("Needs shift as the years stack.", "doing");
      }
      const u = (t - FURNISH - DAY) / YEARS;
      const year = Math.max(1, Math.round(u * yearsMax));
      $("#cin-clock").textContent = "22:00";
      $("#cin-year").textContent = yearsMax >= 15 && year >= 15 ? "15+" : `year ${year}`;
      $("#cin-need").textContent = horizonNeedLine(year);
      walkerNodes.forEach((node) => node?.setAttribute("opacity", String(1 - u * 0.7)));
      paintHeat(svg, cells, 1);
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
  $("#vision-note").innerHTML = vision.available
    ? `<span class="badge">Vision ready</span> An uploaded floor-plan image can be read.`
    : `<span class="badge">No vision key</span> ${escape(vision.note)}`;
}

async function onUpload(file) {
  if (!file) return;
  attachPlace();
  plan.imageName = file.name;
  plan.source = "upload";
  plan.name = file.name.replace(/\.[^.]+$/, "") || "Uploaded plan";
  if (!plan.id) plan.id = uid("plan");
  if (!vision.available) {
    say("I have the file name. This deploy has no vision key, so I will not invent rooms. Use a demo or the editor.");
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
      $$(".pane").forEach((pane) => pane.classList.toggle("on", pane.dataset.pane === id || (id === "collection" && pane.dataset.pane === "side")));
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
