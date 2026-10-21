/**
 * Routes, nodes, and orbs from The Anatomy of Communication (v3).
 * Phrases are the map's own words. Nothing here is a second process.
 */

export const COMMUNICATION_MAP_PATH = "/tools/communication-map";

export const MINUS_LIMIT = 3;

export const CENTER_LINE = "Someone wants something to change in another mind.";

export const BOUNCE_NOTICE = "Too many minus orbs. Back to the mind.";

export const ROUND_NOTICE = "Every response becomes the next message.";

const BANNED = ["platform", "subscription", "signup", "dashboard", "software"] as const;

export type Hemisphere = "content" | "relationship";

export type Orb = {
  id: string;
  pole: "plus" | "minus";
  label: string;
};

export type MapNode = {
  id: string;
  side: Hemisphere;
  title: string;
  line: string;
  plus: string;
  minus: string;
};

export type MapRoute = {
  id: string;
  title: string;
  trail: string;
  nodes: readonly MapNode[];
  /** Pairs that relate across the two levels. */
  across: readonly (readonly [string, string])[];
  /** Four-stations surround, named on the glance map. */
  surround?: readonly string[];
};

export type PlacedNode = MapNode & { x: number; y: number; index: number };

export type PlacedOrb = Orb & { x: number; y: number; nodeId: string; index: number };

export type MindState = {
  routeId: string | null;
  step: number;
  taken: readonly string[];
  closed: readonly string[];
  notice: string | null;
};

function node(partial: Omit<MapNode, "plus" | "minus"> & { plus: string; minus: string }): MapNode {
  return partial;
}

export const COMMUNICATION_ROUTES: readonly MapRoute[] = [
  {
    id: "four-stations",
    title: "Four stations",
    trail: "One message, four stations, one surround.",
    surround: ["Context", "Channel", "Noise"],
    across: [
      ["speaker", "message"],
      ["message", "receiver"],
      ["receiver", "outcome"],
    ],
    nodes: [
      node({
        id: "speaker",
        side: "relationship",
        title: "Speaker",
        line: "A speaker has a purpose and makes a move.",
        plus: "When we're done, I want them to…",
        minus: "Answer the wrong purpose and even good advice falls flat.",
      }),
      node({
        id: "message",
        side: "content",
        title: "Message",
        line: "The move takes a shape.",
        plus: "Let your words carry exactly as much certainty as you actually have.",
        minus: "Too many hedges and you seem to have no view.",
      }),
      node({
        id: "receiver",
        side: "relationship",
        title: "Receiver",
        line: "Meaning is finished by the listener.",
        plus: "You waited up. Were you worried?",
        minus: "Yes. It's 11:40. Technically cooperative, actually provocative.",
      }),
      node({
        id: "outcome",
        side: "content",
        title: "Outcome",
        line: "Something happens. The response completes it.",
        plus: "That's wonderful! What did they say? How do you feel?",
        minus: "Did you see what's for dinner?",
      }),
    ],
  },
  {
    id: "one-breath",
    title: "One breath",
    trail: "The anatomy in one breath.",
    across: [
      ["act", "form"],
      ["dials", "context"],
      ["channel", "ear"],
    ],
    nodes: [
      node({
        id: "act",
        side: "content",
        title: "Act",
        line: "Assert, direct, commit, express, declare.",
        plus: "I expect it'll be ready Friday.",
        minus: "I guarantee it'll be ready Friday.",
      }),
      node({
        id: "form",
        side: "content",
        title: "Form",
        line: "The shape of a sentence only hints at its job.",
        plus: "Could you send me the file?",
        minus: "Send me the file.",
      }),
      node({
        id: "dials",
        side: "content",
        title: "Words and dials",
        line: "Hedges, boosters, softeners, certainty.",
        plus: "Let your words carry exactly as much certainty as you actually have.",
        minus: "If everything is absolutely critical, nothing is.",
      }),
      node({
        id: "channel",
        side: "relationship",
        title: "Channel",
        line: "Voice, text, face, body, silence.",
        plus: "Bad news, apologies and anything that could be misread go face to face, or at least by voice.",
        minus: "We hear our own tone in our heads and forget the reader can't.",
      }),
      node({
        id: "context",
        side: "relationship",
        title: "Context",
        line: "Place, power, culture, face.",
        plus: "Could you possibly close the window?",
        minus: "This could use a little salt.",
      }),
      node({
        id: "ear",
        side: "relationship",
        title: "Ear",
        line: "Fact, self, relationship, appeal.",
        plus: "Am I reading it right?",
        minus: "You're just stressed.",
      }),
      node({
        id: "response",
        side: "relationship",
        title: "Response",
        line: "Every response becomes the next message.",
        plus: "Oh, beautiful.",
        minus: "You always… you never…",
      }),
    ],
  },
  {
    id: "integration",
    title: "Integration",
    trail: "Intent, content, context, delivery, reception, response.",
    across: [
      ["intent", "content"],
      ["content", "context"],
      ["delivery", "reception"],
    ],
    nodes: [
      node({
        id: "intent",
        side: "relationship",
        title: "Intent",
        line: "What do I want to change?",
        plus: "Listen before you aim.",
        minus: "Manipulation exploits fear, fatigue, confusion or haste.",
      }),
      node({
        id: "content",
        side: "content",
        title: "Content",
        line: "The words, the form, the modifiers.",
        plus: "Say the point early.",
        minus: "I feel that you're not listening.",
      }),
      node({
        id: "context",
        side: "relationship",
        title: "Context",
        line: "Setting, relationship, face, culture.",
        plus: "Hard news in private and in a rich channel.",
        minus: "A big question asked while someone is rushing out the door.",
      }),
      node({
        id: "delivery",
        side: "relationship",
        title: "Delivery",
        line: "Channel, voice, body, timing, silence.",
        plus: "Holding back after someone finishes often draws out the thing they almost didn't say.",
        minus: "The silent treatment.",
      }),
      node({
        id: "reception",
        side: "relationship",
        title: "Reception",
        line: "Four ears, implicature, noise.",
        plus: "Tell me how you'd explain it.",
        minus: "Obviously.",
      }),
      node({
        id: "response",
        side: "content",
        title: "Response",
        line: "Reply, outcome, and round again.",
        plus: "Let me try that again.",
        minus: "Well, you're the one who…",
      }),
    ],
  },
];

export const initialMindState: MindState = {
  routeId: null,
  step: 0,
  taken: [],
  closed: [],
  notice: null,
};

export function routeById(id: string | null): MapRoute | null {
  if (!id) return null;
  return COMMUNICATION_ROUTES.find((route) => route.id === id) ?? null;
}

export function orbId(routeId: string, nodeId: string, pole: Orb["pole"]) {
  return `${routeId}:${nodeId}:${pole}`;
}

export function layoutRoute(route: MapRoute): { nodes: PlacedNode[]; orbs: PlacedOrb[] } {
  const left = route.nodes.filter((item) => item.side === "content");
  const right = route.nodes.filter((item) => item.side === "relationship");
  const column = (items: readonly MapNode[], x: number) => {
    const span = 62;
    const top = 18;
    return items.map((item, index) => {
      const y = items.length === 1 ? 48 : top + (index * span) / (items.length - 1);
      return { x, y };
    });
  };
  const leftPos = column(left, 30);
  const rightPos = column(right, 70);
  const pos = new Map<string, { x: number; y: number }>();
  left.forEach((item, index) => pos.set(item.id, leftPos[index]!));
  right.forEach((item, index) => pos.set(item.id, rightPos[index]!));

  const nodes: PlacedNode[] = route.nodes.map((item, index) => {
    const point = pos.get(item.id)!;
    return { ...item, ...point, index };
  });

  const orbs: PlacedOrb[] = [];
  const center = { x: 50, y: 48 };
  nodes.forEach((item, index) => {
    const prev = index === 0 ? center : { x: nodes[index - 1]!.x, y: nodes[index - 1]!.y };
    const control = bend(prev, item);
    const plusAt = quad(prev, control, item, 0.42);
    const minusAt = quad(prev, control, item, 0.72);
    orbs.push({
      id: orbId(route.id, item.id, "plus"),
      pole: "plus",
      label: item.plus,
      nodeId: item.id,
      index,
      ...plusAt,
    });
    orbs.push({
      id: orbId(route.id, item.id, "minus"),
      pole: "minus",
      label: item.minus,
      nodeId: item.id,
      index,
      ...minusAt,
    });
  });

  return { nodes, orbs };
}

export function segmentPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const control = bend(from, to);
  return `M ${from.x} ${from.y} Q ${control.x} ${control.y} ${to.x} ${to.y}`;
}

function bend(from: { x: number; y: number }, to: { x: number; y: number }) {
  return {
    x: (from.x + to.x) / 2 * 0.42 + 50 * 0.58,
    y: (from.y + to.y) / 2 * 0.42 + 48 * 0.58,
  };
}

function quad(
  from: { x: number; y: number },
  control: { x: number; y: number },
  to: { x: number; y: number },
  t: number,
) {
  const u = 1 - t;
  return {
    x: u * u * from.x + 2 * u * t * control.x + t * t * to.x,
    y: u * u * from.y + 2 * u * t * control.y + t * t * to.y,
  };
}

export function minusCount(state: MindState, routeId: string) {
  return state.taken.filter((id) => id.startsWith(`${routeId}:`) && id.endsWith(":minus")).length;
}

export function chooseRoute(state: MindState, routeId: string): MindState {
  if (state.closed.includes(routeId)) return state;
  if (!routeById(routeId)) return state;
  return { ...state, routeId, step: 1, notice: null };
}

export function returnToMind(state: MindState): MindState {
  if (!state.routeId) return state;
  return { ...state, routeId: null, step: 0, notice: null };
}

export function moveTo(state: MindState, step: number): MindState {
  const route = routeById(state.routeId);
  if (!route) return state;
  const next = Math.max(0, Math.min(route.nodes.length, Math.round(step)));
  const arrived = next === route.nodes.length && next > 0;
  return {
    ...state,
    step: next,
    closed: arrived ? [] : state.closed,
    notice: null,
  };
}

export function takeOrb(state: MindState, id: string): MindState {
  const route = routeById(state.routeId);
  if (!route) return state;
  const focused = route.nodes[state.step - 1];
  if (!focused) return state;
  const [routeId, nodeId, pole] = id.split(":");
  if (routeId !== route.id || nodeId !== focused.id) return state;
  if (pole !== "plus" && pole !== "minus") return state;
  if (state.taken.some((taken) => taken.startsWith(`${route.id}:${focused.id}:`))) return state;

  const taken = [...state.taken, id];
  const next = { ...state, taken, notice: null };
  if (pole === "plus") return stepForward(next);

  const minuses = taken.filter((item) => item.startsWith(`${route.id}:`) && item.endsWith(":minus")).length;
  if (minuses < MINUS_LIMIT) return stepForward(next);

  const closed = state.closed.includes(route.id) ? [...state.closed] : [...state.closed, route.id];
  const everyRouteClosed = COMMUNICATION_ROUTES.every((item) => closed.includes(item.id));
  const nextClosed = everyRouteClosed ? [route.id] : closed;
  return {
    routeId: null,
    step: 0,
    taken: taken.filter((item) => !item.startsWith(`${route.id}:`)),
    closed: nextClosed,
    notice: everyRouteClosed ? ROUND_NOTICE : BOUNCE_NOTICE,
  };
}

function stepForward(state: MindState): MindState {
  const route = routeById(state.routeId);
  if (!route || state.step >= route.nodes.length) return state;
  return moveTo(state, state.step + 1);
}

export function focusedNode(state: MindState): MapNode | null {
  const route = routeById(state.routeId);
  if (!route || state.step < 1) return null;
  return route.nodes[state.step - 1] ?? null;
}

export function communicationCopy(): string {
  const parts = [CENTER_LINE, BOUNCE_NOTICE, ROUND_NOTICE];
  for (const route of COMMUNICATION_ROUTES) {
    parts.push(route.title, route.trail, ...(route.surround ?? []));
    for (const item of route.nodes) {
      parts.push(item.title, item.line, item.plus, item.minus);
    }
  }
  return parts.join("\n");
}

export function assertNoSaaSLanguage(copy: string) {
  const lower = copy.toLowerCase();
  for (const word of BANNED) {
    if (lower.includes(word)) {
      throw new Error(`SaaS wording: ${word}`);
    }
  }
  if (/\bplan\b/i.test(copy)) {
    throw new Error("SaaS wording: plan");
  }
}
