import {
  HORIZONS,
  ROOM_TYPES,
  defaultGuideHello,
  emptyProfile,
  makeSuttonPlan,
  scoreLivability,
  uid,
} from "./engine.js";

// Future billing (not shown in UI): five free runs on this browser, then $1 token packs.
// function canStartRun(store) { return store.runs.length < 5 || (store.tokens || 0) > 0; }

const KEY = "ak-livability-v1";
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
    /* keep empty */
  }
  return { plans: [], profiles: [], runs: [], active: { planId: "", profileId: "", horizon: "10" } };
}

function save(store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

const store = load();
let plan = store.plans.find((item) => item.id === store.active.planId) || {
  id: "",
  name: "Untitled plan",
  source: "blank",
  listingUrl: "",
  imageName: "",
  rooms: [],
  doors: [],
  note: "",
};
let profile = store.profiles.find((item) => item.id === store.active.profileId) || emptyProfile();
let horizon = store.active.horizon || "10";
let lastResult = null;
let vision = { available: false, note: "Checking whether image reading is configured…" };
let zTop = 8;
let libKind = "plans";

function say(text, mode) {
  const el = $("#guide-speech");
  el.textContent = text;
  el.classList.toggle("doing", mode === "doing");
}

function focusWin(id) {
  const win = $(`.win[data-win="${id}"]`);
  if (!win) return;
  win.hidden = false;
  $$(".win").forEach((node) => node.classList.remove("is-focus"));
  win.classList.add("is-focus");
  win.style.zIndex = String(++zTop);
  $$(".dock [data-show]").forEach((btn) => btn.classList.toggle("on", btn.getAttribute("data-show") === id));
}

function hideWin(id) {
  const win = $(`.win[data-win="${id}"]`);
  if (win) win.hidden = true;
}

function layoutIfNeeded(rooms) {
  return rooms.map((room, index) => ({
    ...room,
    id: room.id || uid("rm"),
    x: Number.isFinite(room.x) ? room.x : 24 + (index % 4) * 186,
    y: Number.isFinite(room.y) ? room.y : 20 + Math.floor(index / 4) * 148,
    w: Number.isFinite(room.w) ? room.w : 168,
    h: Number.isFinite(room.h) ? room.h : 128,
  }));
}

function drawPlan(target, result) {
  const host = $(target);
  if (!plan.rooms.length) {
    host.innerHTML = `<p class="empty-lib" style="padding:24px">No rooms yet. Use the Sutton sample, upload a plan, or add rooms by hand.</p>`;
    return;
  }
  const flags = result?.flags || { bottlenecks: [], quiet: [], strain: [], paths: [] };
  const maxX = Math.max(...plan.rooms.map((room) => room.x + room.w), 520);
  const maxY = Math.max(...plan.rooms.map((room) => room.y + room.h), 360);
  const roomMap = new Map(plan.rooms.map((room) => [room.id, room]));
  const paths = (flags.paths || [])
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
      const cls = [
        "room-rect",
        flags.bottlenecks.includes(room.id) ? "hot" : "",
        flags.quiet.includes(room.id) ? "quiet" : "",
        flags.strain.includes(room.id) ? "strain" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `<g>
        <rect class="${cls}" x="${room.x}" y="${room.y}" width="${room.w}" height="${room.h}"/>
        <text class="room-lab" x="${room.x + 8}" y="${room.y + 18}">${escape(room.name)}</text>
        <text class="room-lab" x="${room.x + 8}" y="${room.y + 32}" style="opacity:.6">${room.sf} sf</text>
      </g>`;
    })
    .join("");
  host.innerHTML = `<svg class="plan-svg" viewBox="0 0 ${maxX + 24} ${maxY + 24}" role="img" aria-label="Floor plan">${rects}${paths}</svg>`;
}

function escape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  drawPlan("#plan-canvas", lastResult);
}

function renderProfile() {
  $("#profile-name").value = profile.name || "My household";
  $("#household").value = String(profile.householdSize || 2);
  $("#traits").innerHTML = TRAITS.map(
    (trait) =>
      `<button class="toggle" type="button" data-trait="${trait.id}" aria-pressed="${profile[trait.id] ? "true" : "false"}">${trait.label}</button>`,
  ).join("");
}

function renderHorizon() {
  $("#horizons").innerHTML = HORIZONS.map(
    (item) => `<button class="chip" type="button" data-horizon="${item.id}" aria-pressed="${horizon === item.id}">
      <strong style="display:block;font:500 1.2rem var(--serif);letter-spacing:0;text-transform:none">${item.label}</strong>
      <span class="fine">${item.blurb}</span>
    </button>`,
  ).join("");
}

function folderLabel(kind) {
  const n = store[kind].length;
  if (!n) return "Empty";
  return n === 1 ? "1 saved" : `${n} saved`;
}

function renderFolders() {
  $("#count-plans").textContent = folderLabel("plans");
  $("#count-profiles").textContent = folderLabel("profiles");
  $("#count-runs").textContent = folderLabel("runs");
}

function openLibrary(kind) {
  libKind = kind;
  const titles = { plans: "Plans", profiles: "Profiles", runs: "Runs" };
  $("#lib-title").textContent = titles[kind];
  const items = store[kind];
  if (!items.length) {
    $("#lib-list").innerHTML = `<p class="empty-lib">This folder is still empty. Save as you go and it will fill.</p>`;
  } else {
    $("#lib-list").innerHTML = items
      .map((item) => {
        const extra =
          kind === "runs"
            ? `Livability ${item.result?.score ?? "-"} · ${item.horizon} years`
            : item.note || item.source || "";
        return `<button type="button" data-open-item="${item.id}"><strong>${escape(item.name || "Untitled")}</strong><span class="fine">${escape(extra)}</span></button>`;
      })
      .join("");
  }
  focusWin("library");
}

function persistPlan() {
  if (!plan.rooms.length) {
    say("Add a room first, or open the Sutton sample.");
    return;
  }
  if (!plan.id) plan.id = uid("plan");
  if (!plan.name) plan.name = plan.source === "sample" ? "Sutton sample" : "Floor plan";
  const copy = structuredClone(plan);
  const idx = store.plans.findIndex((item) => item.id === copy.id);
  if (idx >= 0) store.plans[idx] = copy;
  else store.plans.unshift(copy);
  store.active.planId = copy.id;
  save(store);
  renderFolders();
  say("Plan saved in this browser. It will be waiting in the Plans folder.");
}

function persistProfile() {
  profile.name = $("#profile-name").value.trim() || "My household";
  profile.householdSize = clampNum($("#household").value, 1, 8);
  if (!profile.id) profile.id = uid("pro");
  const copy = structuredClone(profile);
  const idx = store.profiles.findIndex((item) => item.id === copy.id);
  if (idx >= 0) store.profiles[idx] = copy;
  else store.profiles.unshift(copy);
  store.active.profileId = copy.id;
  save(store);
  renderFolders();
  say("Profile saved. It describes your household, not a market.");
}

function clampNum(value, lo, hi) {
  return Math.max(lo, Math.min(hi, Number(value) || lo));
}

function readFormIntoPlan() {
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
  plan.listingUrl = $("#listing-url").value.trim();
}

function runSimulation() {
  readFormIntoPlan();
  if (plan.rooms.length < 2) {
    say("I need at least two rooms and a door before I can walk a day through the plan.");
    focusWin("plan");
    return;
  }
  profile.name = $("#profile-name").value.trim() || profile.name;
  profile.householdSize = clampNum($("#household").value, 1, 8);
  say("Tracing the morning path, then the evening return. Looking for pinch points, quiet rooms, and whether storage keeps up.", "doing");
  const result = scoreLivability(plan, profile, horizon);
  lastResult = result;
  persistPlan();
  persistProfile();
  const run = {
    id: uid("run"),
    name: `${plan.name} · ${profile.name}`,
    planId: plan.id,
    profileId: profile.id,
    horizon,
    result,
    at: new Date().toISOString(),
  };
  store.runs.unshift(run);
  save(store);
  renderFolders();
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
  drawPlan("#sim-canvas", result);
  drawPlan("#plan-canvas", result);
  focusWin("results");
  const lead = result.notes[0] || "The rooms connect.";
  say(`Livability ${result.score}. ${lead}`);
}

async function checkVision() {
  try {
    const res = await fetch("/api/livability/vision-status");
    if (!res.ok) throw new Error("status");
    vision = await res.json();
  } catch {
    vision = {
      available: false,
      note: "Vision reading is not configured on this deploy. Use the labeled sample or the room editor.",
    };
  }
  const note = $("#vision-note");
  if (vision.available) {
    note.innerHTML = `<span class="badge">Vision ready</span> An uploaded floor-plan image can be read. A listing link is still only stored.`;
  } else {
    note.innerHTML = `<span class="badge">Sample and editor</span> ${escape(vision.note || "No vision key is configured.")}`;
  }
}

async function onUpload(file) {
  if (!file) return;
  plan.imageName = file.name;
  plan.source = "upload";
  plan.name = file.name.replace(/\.[^.]+$/, "") || "Uploaded plan";
  if (!vision.available) {
    say("I have the image name, but this deploy has no vision key. Use the sample or draw the rooms yourself. I will not invent a read.");
    return;
  }
  say("Reading the uploaded plan. If I cannot see rooms, I will say so.", "doing");
  const image = await fileToDataUrl(file);
  try {
    const res = await fetch("/api/livability/read-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    const body = await res.json();
    if (!body.ok || !body.rooms?.length) {
      say(body.error || "I could not read rooms from that image. The editor is still here.");
      return;
    }
    plan.rooms = layoutIfNeeded(body.rooms);
    plan.doors = Array.isArray(body.doors) ? body.doors : [];
    plan.source = "vision";
    renderRooms();
    say(`I found ${plan.rooms.length} rooms. Check the names and doors, then save.`);
  } catch {
    say("The vision request failed. Nothing was invented. Use the sample or the editor.");
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function useSample() {
  plan = makeSuttonPlan();
  $("#listing-url").value = "";
  renderRooms();
  persistPlan();
  say("This is the Sutton sample, a labeled two-bedroom line. Not a real listing. Edit anything that is not yours.");
  focusWin("plan");
}

function keepLink() {
  const url = $("#listing-url").value.trim();
  if (!url) {
    say("Paste a listing link first. I will keep it with the plan. I will not pretend to have read the page.");
    return;
  }
  plan.listingUrl = url;
  plan.source = plan.rooms.length ? plan.source : "link";
  if (!plan.rooms.length) {
    const sample = makeSuttonPlan();
    plan.rooms = sample.rooms;
    plan.doors = sample.doors;
    plan.name = "Listing sketch";
    plan.note = "Rooms are the labeled sample. The listing page was not read.";
    renderRooms();
  }
  persistPlan();
  say("Link kept. The rooms are still a sketch unless you edit them or a vision read succeeds.");
}

function bindWindows() {
  $$(".win .bar").forEach((bar) => {
    const win = bar.closest(".win");
    bar.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      if (window.matchMedia("(max-width:899px)").matches) {
        focusWin(win.dataset.win);
        return;
      }
      focusWin(win.dataset.win);
      const rect = win.getBoundingClientRect();
      const desk = $("#desk").getBoundingClientRect();
      const ox = event.clientX - rect.left;
      const oy = event.clientY - rect.top;
      const move = (ev) => {
        win.style.left = `${Math.max(8, ev.clientX - desk.left - ox)}px`;
        win.style.top = `${Math.max(8, ev.clientY - desk.top - oy)}px`;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    });
  });
  $$("[data-hide]").forEach((btn) => btn.addEventListener("click", () => hideWin(btn.dataset.hide)));
  $$("[data-show]").forEach((btn) => btn.addEventListener("click", () => focusWin(btn.dataset.show)));
  $$("[data-open-lib]").forEach((btn) => btn.addEventListener("click", () => openLibrary(btn.dataset.openLib)));
}

function bindEditor() {
  $("#room-list").addEventListener("input", () => {
    readFormIntoPlan();
    drawPlan("#plan-canvas", lastResult);
  });
  $("#room-list").addEventListener("click", (event) => {
    const id = event.target.dataset.delRoom;
    if (!id) return;
    plan.rooms = plan.rooms.filter((room) => room.id !== id);
    plan.doors = plan.doors.filter((door) => door.a !== id && door.b !== id);
    renderRooms();
  });
  $("#door-list").addEventListener("change", readFormIntoPlan);
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
      x: 24 + (n % 4) * 186,
      y: 20 + Math.floor(n / 4) * 148,
      w: 168,
      h: 128,
    });
    renderRooms();
  });
  $("#add-door").addEventListener("click", () => {
    if (plan.rooms.length < 2) return;
    plan.doors.push({ a: plan.rooms[0].id, b: plan.rooms[1].id });
    renderRooms();
  });
  $("#save-plan").addEventListener("click", () => {
    readFormIntoPlan();
    persistPlan();
  });
  $("#use-sample").addEventListener("click", useSample);
  $("#keep-link").addEventListener("click", keepLink);
  $("#plan-file").addEventListener("change", (event) => onUpload(event.target.files?.[0]));
}

function bindProfile() {
  $("#traits").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-trait]");
    if (!btn) return;
    const key = btn.dataset.trait;
    profile[key] = !profile[key];
    btn.setAttribute("aria-pressed", profile[key] ? "true" : "false");
  });
  $("#save-profile").addEventListener("click", persistProfile);
  $("#horizons").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-horizon]");
    if (!btn) return;
    horizon = btn.dataset.horizon;
    store.active.horizon = horizon;
    save(store);
    renderHorizon();
    say(HORIZONS.find((item) => item.id === horizon).blurb);
  });
  $("#run-sim").addEventListener("click", runSimulation);
  $("#lib-list").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-open-item]");
    if (!btn) return;
    const id = btn.dataset.openItem;
    if (libKind === "plans") {
      const found = store.plans.find((item) => item.id === id);
      if (!found) return;
      plan = structuredClone(found);
      $("#listing-url").value = plan.listingUrl || "";
      lastResult = null;
      renderRooms();
      focusWin("plan");
      say(`Opened ${plan.name}.`);
    } else if (libKind === "profiles") {
      const found = store.profiles.find((item) => item.id === id);
      if (!found) return;
      profile = structuredClone(found);
      renderProfile();
      focusWin("profile");
      say(`Opened ${profile.name}.`);
    } else {
      const found = store.runs.find((item) => item.id === id);
      if (!found) return;
      lastResult = found.result;
      const foundPlan = store.plans.find((item) => item.id === found.planId);
      const foundProfile = store.profiles.find((item) => item.id === found.profileId);
      if (foundPlan) plan = structuredClone(foundPlan);
      if (foundProfile) profile = structuredClone(foundProfile);
      horizon = found.horizon;
      $("#score-num").textContent = String(found.result.score);
      $("#notes").innerHTML = found.result.notes.map((note) => `<li>${escape(note)}</li>`).join("");
      $("#dims").innerHTML = [
        ["Circulation", found.result.dimensions.circulation],
        ["Quiet", found.result.dimensions.quiet],
        ["Storage", found.result.dimensions.storage],
        ["Household fit", found.result.dimensions.fit],
      ]
        .map(
          ([label, value]) =>
            `<div class="dim"><span>${label}</span><div class="barline"><i style="width:${value}%"></i></div><b>${value}</b></div>`,
        )
        .join("");
      drawPlan("#sim-canvas", found.result);
      renderRooms();
      renderProfile();
      renderHorizon();
      focusWin("results");
      say(`Livability ${found.result.score}. A saved run from this browser.`);
    }
  });
}

function placeDesktopWindows() {
  if (window.matchMedia("(max-width:899px)").matches) {
    $$(".win").forEach((win) => {
      win.style.left = "";
      win.style.top = "";
    });
    return;
  }
  const spots = {
    guide: [118, 18],
    plan: [560, 22],
    profile: [130, 80],
    horizon: [170, 110],
    results: [400, 64],
    library: [210, 86],
  };
  Object.entries(spots).forEach(([id, [x, y]]) => {
    const win = $(`.win[data-win="${id}"]`);
    if (!win) return;
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
  });
}

say(defaultGuideHello());
$("#listing-url").value = plan.listingUrl || "";
renderRooms();
renderProfile();
renderHorizon();
renderFolders();
bindWindows();
bindEditor();
bindProfile();
placeDesktopWindows();
window.addEventListener("resize", placeDesktopWindows);
if (store.runs[0]?.result) {
  lastResult = store.runs[0].result;
  horizon = store.runs[0].horizon || horizon;
  $("#score-num").textContent = String(lastResult.score);
  $("#notes").innerHTML = lastResult.notes.map((note) => `<li>${escape(note)}</li>`).join("");
  $("#dims").innerHTML = [
    ["Circulation", lastResult.dimensions.circulation],
    ["Quiet", lastResult.dimensions.quiet],
    ["Storage", lastResult.dimensions.storage],
    ["Household fit", lastResult.dimensions.fit],
  ]
    .map(
      ([label, value]) =>
        `<div class="dim"><span>${label}</span><div class="barline"><i style="width:${value}%"></i></div><b>${value}</b></div>`,
    )
    .join("");
  drawPlan("#sim-canvas", lastResult);
}
focusWin("guide");
focusWin("plan");
checkVision();
