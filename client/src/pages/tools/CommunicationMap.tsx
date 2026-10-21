import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";
import {
  GUIDE_NAME,
  PURPOSE_LINE,
  ROUND_NOTICE,
  COMMUNICATION_MAP_PATH,
  COMMUNICATION_ROUTES,
  SCOPE_DETENT,
  applyScopeTurn,
  chooseRoute,
  focusedNode,
  guideLine,
  guidePhase,
  initialMindState,
  layoutRoute,
  moveTo,
  returnToMind,
  routeById,
  segmentPath,
  takeOrb,
  type MindState,
  type PlacedNode,
} from "@/data/communication-map";

const CENTER = { x: 50, y: 48 };

function toBoard(x: number, y: number) {
  return { x: 1.55 * (x - CENTER.x) + CENTER.x, y: 1.55 * (y - CENTER.y) + CENTER.y };
}

function stepFrame(phase: "choose" | "orb" | "continue", placed: ReturnType<typeof layoutRoute> | null, state: MindState) {
  if (phase === "choose" || !placed) return "0 0 100 100";
  const marks: { x: number; y: number }[] = [];
  const add = (x: number, y: number) => marks.push(toBoard(x, y));
  add(CENTER.x - 16, CENTER.y);
  add(CENTER.x + 16, CENTER.y);
  add(CENTER.x, CENTER.y - 16);
  add(CENTER.x, CENTER.y + 16);
  for (const item of placed.nodes) {
    const open = item.index + 1 <= state.step;
    const upcoming = item.index === state.step;
    if (!open && !upcoming) continue;
    if (!open) {
      add(item.x - 2.5, item.y - 2.5);
      add(item.x + 2.5, item.y + 2.5);
      continue;
    }
    const labelW = Math.max(10, item.title.length * 2.5);
    const labelX = item.side === "content" ? item.x - 3.4 : item.x + 3.4;
    const left = item.side === "content" ? labelX - labelW : item.x - 3;
    const right = item.side === "content" ? item.x + 3 : labelX + labelW;
    add(left, item.y - 4.2);
    add(right, item.y + 3.4);
  }
  for (const orb of placed.orbs) {
    const reached = state.step === orb.index + 1;
    const taken = state.taken.includes(orb.id);
    if (!(phase === "orb" && reached) && !(phase === "continue" && taken)) continue;
    add(orb.x - 5.2, orb.y - 5.2);
    add(orb.x + 5.2, orb.y + 5.2);
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const mark of marks) {
    minX = Math.min(minX, mark.x);
    minY = Math.min(minY, mark.y);
    maxX = Math.max(maxX, mark.x);
    maxY = Math.max(maxY, mark.y);
  }
  const pad = 4;
  minX -= pad;
  minY -= pad;
  maxX += pad;
  maxY += pad;
  return `${minX.toFixed(1)} ${minY.toFixed(1)} ${(maxX - minX).toFixed(1)} ${(maxY - minY).toFixed(1)}`;
}

export default function CommunicationMap() {
  usePageMetadata({
    title: GUIDE_NAME,
    description: PURPOSE_LINE,
    path: COMMUNICATION_MAP_PATH,
  });

  const [state, setState] = useState<MindState>(initialMindState);
  const firstOpenRoute = useRef<HTMLButtonElement>(null);
  const route = routeById(state.routeId);
  const placed = route ? layoutRoute(route) : null;
  const current = focusedNode(state);

  useEffect(() => {
    if (!state.routeId && state.notice) firstOpenRoute.current?.focus();
  }, [state.notice, state.routeId]);

  const phase = guidePhase(state);
  const plate =
    phase === "choose"
      ? state.notice === ROUND_NOTICE
        ? ROUND_NOTICE
        : null
      : (current?.line ?? route?.trail ?? null);
  const guide = guideLine(state);
  const focus = current && placed ? placed.nodes.find((item) => item.id === current.id) : null;
  const panX = focus ? (CENTER.x - focus.x) * 0.05 : 0;
  const panY = focus ? (CENTER.y - focus.y) * 0.05 : 0;
  const stepMark = phase === "orb" ? "Step 2" : phase === "continue" ? "Step 3" : "Step 1";

  return (
    <main data-testid="communication-map" className="bg-brand-ivory text-brand-ink">
      <section className="border-b border-brand-border bg-brand-navy text-brand-ivory">
        <PageSection className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-14">
          <div>
            <p className="text-base uppercase tracking-[0.18em] text-brand-stone sm:text-lg">{GUIDE_NAME}</p>
            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,4.75rem)] leading-[0.88] tracking-[-0.03em]">
              {stepMark}
            </h1>
            <p className="mt-4 max-w-xl font-display text-[clamp(1.55rem,2.8vw,2.15rem)] leading-[1.12] text-brand-ivory/90">
              {guide.replace(/^Step \d+\.\s*/, "")}
            </p>
          </div>
          <div className="border-l border-brand-ivory/16 pl-5 lg:pl-8">
            <p className="font-display text-[clamp(1.45rem,2.2vw,1.9rem)] leading-snug text-brand-ivory">{PURPOSE_LINE}</p>
          </div>
        </PageSection>
      </section>

      <PageSection className="py-10 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">The mind</h2>
            <p className="mt-2 text-lg leading-snug text-brand-navy sm:text-xl">
              Content on the left. Relationship on the right.
            </p>
            {route?.surround ? (
              <p className="mt-1 text-lg text-brand-cocoa sm:text-xl">{route.surround.join("  ·  ")}</p>
            ) : null}
            <div className="mt-6 border border-brand-navy bg-white">
        <svg
          viewBox={stepFrame(phase, placed, state)}
          className="block h-auto w-full"
          role="img"
          aria-label="A mind. Content on the left, relationship on the right."
        >
          <g transform="translate(50 48) scale(1.55) translate(-50 -48)">
          <g className="cm-pan" transform={`translate(${panX} ${panY})`}>
            {placed ? (
              <Trails routeId={route!.id} nodes={placed.nodes} step={state.step} across={route!.across} />
            ) : (
              <StartBranches
                closed={state.closed}
                onStart={(id) => setState((prev) => chooseRoute(prev, id))}
              />
            )}
            {placed?.nodes.map((item) => {
              const open = item.index + 1 <= state.step;
              const upcoming = item.index === state.step;
              if (!open && !upcoming) return null;
              return (
                <NodeMark
                  key={item.id}
                  item={item}
                  active={current?.id === item.id}
                  open={open}
                />
              );
            })}
            {placed?.orbs.map((orb) => {
              const reached = state.step === orb.index + 1;
              const taken = state.taken.includes(orb.id);
              const offer = phase === "orb" && reached;
              if (!offer && !(phase === "continue" && taken)) return null;
              return (
                <g key={orb.id} opacity={reached || taken ? 1 : 0.35}>
                  <circle
                    cx={orb.x}
                    cy={orb.y}
                    r="3.8"
                    fill={taken ? (orb.pole === "plus" ? "#B08D57" : "#2C3138") : "#F5F2EB"}
                    stroke={orb.pole === "plus" ? "#B08D57" : "#2A3447"}
                    strokeWidth="0.28"
                  />
                  <text
                    x={orb.x}
                    y={orb.y + 1.45}
                    textAnchor="middle"
                    fontSize="4.6"
                    fill={taken ? "#F5F2EB" : "#2A3447"}
                    fontFamily="Inter, sans-serif"
                  >
                    {orb.pole === "plus" ? "+" : "−"}
                  </text>
                  {offer ? (
                    <circle
                      cx={orb.x}
                      cy={orb.y}
                      r="4.4"
                      fill="transparent"
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`${orb.pole === "plus" ? "Plus" : "Minus"} orb. ${orb.label}`}
                      onClick={() => setState((prev) => takeOrb(prev, orb.id))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setState((prev) => takeOrb(prev, orb.id));
                        }
                      }}
                    />
                  ) : null}
                </g>
              );
            })}
          </g>
          <CenterScope
            step={route ? state.step : 0}
            steps={route?.nodes.length ?? 0}
            station={current?.title ?? null}
            onTurn={phase === "continue" ? (step) => setState((prev) => moveTo(prev, step)) : undefined}
            onReturn={phase === "continue" ? () => setState((prev) => returnToMind(prev)) : undefined}
          />
          </g>
        </svg>
            </div>
          </div>

          <div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.05] text-brand-navy">This step</h2>
            <div className="mt-6 border border-brand-navy bg-white">
              <div className="border-b border-brand-border px-5 py-5 sm:px-6">
                <p className="font-display text-[clamp(1.7rem,3vw,2.25rem)] leading-tight text-brand-navy" aria-live="polite">
                  {guide}
                </p>
                {plate ? <p className="mt-3 text-lg leading-snug text-brand-ink sm:text-xl">{plate}</p> : null}
              </div>

              {phase === "orb" && current ? (
                <div>
                  <OrbButton
                    pole="plus"
                    label={current.plus}
                    pressed={state.taken.includes(`${route!.id}:${current.id}:plus`)}
                    onTake={() => setState((prev) => takeOrb(prev, `${route!.id}:${current.id}:plus`))}
                  />
                  <OrbButton
                    pole="minus"
                    label={current.minus}
                    pressed={state.taken.includes(`${route!.id}:${current.id}:minus`)}
                    onTake={() => setState((prev) => takeOrb(prev, `${route!.id}:${current.id}:minus`))}
                  />
                </div>
              ) : null}

              {phase === "choose" ? (
                <div>
                  {COMMUNICATION_ROUTES.map((item, index) => {
                    const closed = state.closed.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        ref={index === 0 ? firstOpenRoute : undefined}
                        type="button"
                        disabled={closed}
                        onClick={() => setState((prev) => chooseRoute(prev, item.id))}
                        className={cn(
                          "flex w-full items-center border-b border-brand-navy/15 px-5 py-5 text-left font-display text-[clamp(1.7rem,2.6vw,2.15rem)] leading-none last:border-b-0 sm:px-6",
                          !closed && "text-brand-navy hover:bg-brand-ivory",
                          closed && "text-brand-graphite/40",
                        )}
                      >
                        {closed ? `${item.title} closed` : item.title}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {phase === "continue" ? (
                <button
                  type="button"
                  onClick={() => setState((prev) => returnToMind(prev))}
                  className="flex w-full items-center px-5 py-5 text-left font-display text-[clamp(1.7rem,2.6vw,2.15rem)] leading-none text-brand-navy hover:bg-brand-ivory sm:px-6"
                >
                  To the mind
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
}

function CenterScope({
  step,
  steps,
  station,
  onTurn,
  onReturn,
}: {
  step: number;
  steps: number;
  station: string | null;
  onTurn?: (step: number) => void;
  onReturn?: () => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [turning, setTurning] = useState<-1 | 0 | 1>(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    pointer: number;
    last: number;
    spun: number;
    origin: number;
    direction: -1 | 0 | 1;
  } | null>(null);
  const stepRef = useRef(step);
  const face = useRef<SVGCircleElement>(null);

  useEffect(() => {
    stepRef.current = step;
    if (!drag.current) setRotation((Math.max(step, 1) - 1) * SCOPE_DETENT);
  }, [step]);

  function pointerAngle(event: ReactPointerEvent) {
    const node = face.current;
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2));
  }

  function onPointerDown(event: ReactPointerEvent<SVGCircleElement>) {
    if (!onTurn || steps < 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointer: event.pointerId,
      last: pointerAngle(event),
      spun: 0,
      origin: stepRef.current,
      direction: 0,
    };
    setDragging(true);
  }

  function onPointerMove(event: ReactPointerEvent<SVGCircleElement>) {
    const session = drag.current;
    if (!session || session.pointer !== event.pointerId || !onTurn) return;
    const ang = pointerAngle(event);
    let delta = ang - session.last;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    session.last = ang;
    const deg = (delta * 180) / Math.PI;
    session.spun += deg;
    if (deg > 0.4) session.direction = 1;
    else if (deg < -0.4) session.direction = -1;
    const turned = applyScopeTurn(session.origin, steps, session.spun);
    setRotation((turned.step - 1) * SCOPE_DETENT + turned.carry);
    setTurning(session.direction);
    if (turned.step !== stepRef.current) {
      stepRef.current = turned.step;
      onTurn(turned.step);
    }
  }

  function endDrag(event: ReactPointerEvent<SVGCircleElement>) {
    const session = drag.current;
    if (!session || session.pointer !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    setTurning(0);
    setRotation((Math.max(stepRef.current, 1) - 1) * SCOPE_DETENT);
  }

  const ticks = Array.from({ length: 48 }, (_, index) => {
    const theta = (index / 48) * Math.PI * 2 - Math.PI / 2;
    const major = index % 4 === 0;
    const inner = major ? 11.15 : 11.7;
    const outer = 12.85;
    return {
      major,
      x1: 50 + Math.cos(theta) * inner,
      y1: 48 + Math.sin(theta) * inner,
      x2: 50 + Math.cos(theta) * outer,
      y2: 48 + Math.sin(theta) * outer,
    };
  });

  return (
    <g aria-label="Calibration scope">
      <defs>
        <linearGradient id="cm-scope-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6D5B0" />
          <stop offset="0.42" stopColor="#B08D57" />
          <stop offset="1" stopColor="#7A5A3A" />
        </linearGradient>
        <radialGradient id="cm-scope-lens" cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#F8F5EF" />
          <stop offset="1" stopColor="#E4DCCF" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="48" r="13.55" fill="#F5F2EB" stroke="url(#cm-scope-metal)" strokeWidth="1.45" />
      <circle cx="50" cy="48" r="12.15" fill="none" stroke="#2A3447" strokeWidth="0.22" opacity="0.45" />
      <g
        className={dragging ? "cm-scope-dial is-turning" : "cm-scope-dial"}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle cx="50" cy="48" r="12.5" fill="none" />
        {ticks.map((tick) => (
          <line
            key={`${tick.x1}-${tick.y1}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.major ? "#B08D57" : "#2A3447"}
            strokeWidth={tick.major ? 0.28 : 0.16}
            opacity={tick.major ? 1 : 0.55}
          />
        ))}
        <polygon points="50,34.85 49.28,36.7 50.72,36.7" fill="#B08D57" />
      </g>
      <polygon points="50,33.15 49.42,34.55 50.58,34.55" fill="#2A3447" />
      {onTurn ? <ScopeChevron angle={-68} direction={1} lit={turning === 1} /> : null}
      {onTurn ? <ScopeChevron angle={-112} direction={-1} lit={turning === -1} /> : null}
      <circle cx="50" cy="48" r="10.7" fill="url(#cm-scope-lens)" stroke="#2A3447" strokeWidth="0.28" />
      <ellipse cx="50" cy="48" rx="7.1" ry="5.5" fill="none" stroke="#2A3447" strokeWidth="0.22" />
      <ellipse cx="50" cy="48" rx="4.1" ry="3.15" fill="none" stroke="#B08D57" strokeWidth="0.24" />
      <path d="M50 42.6 Q47.6 48 50 53.4" fill="none" stroke="#2A3447" strokeWidth="0.22" />
      <path d="M50 42.6 Q52.4 48 50 53.4" fill="none" stroke="#B08D57" strokeWidth="0.22" />
      <path d="M43.2 48 H56.8" stroke="#D8D1C7" strokeWidth="0.2" />
      <circle cx="50" cy="49.15" r="0.62" fill="#B08D57" />
      <text
        x="50"
        y="46.7"
        textAnchor="middle"
        fill="#2A3447"
        fontSize="4.6"
        fontFamily='"Cormorant Garamond", Georgia, serif'
      >
        The mind
      </text>
      {onReturn ? (
        <circle
          cx="50"
          cy="48"
          r="6.2"
          fill="transparent"
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Back to the mind"
          onClick={onReturn}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onReturn();
            }
          }}
        />
      ) : null}
      <circle
        ref={face}
        cx="50"
        cy="48"
        r="12.4"
        fill="none"
        stroke="transparent"
        strokeWidth="3.4"
        data-testid="scope-ring"
        className={onTurn ? "cm-scope-ring" : undefined}
        role={onTurn ? "slider" : undefined}
        tabIndex={onTurn ? 0 : undefined}
        aria-label={onTurn ? "Turn the scope either way" : undefined}
        aria-valuemin={onTurn ? 1 : undefined}
        aria-valuemax={onTurn ? steps : undefined}
        aria-valuenow={onTurn ? Math.max(1, step) : undefined}
        aria-valuetext={onTurn ? (station ?? "The mind") : undefined}
        aria-orientation="horizontal"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={
          onTurn
            ? (event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                  event.preventDefault();
                  onTurn(Math.min(steps, step + 1));
                } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                  event.preventDefault();
                  onTurn(Math.max(1, step - 1));
                }
              }
            : undefined
        }
      />
      <circle className="cm-scope-focus" cx="50" cy="48" r="14.85" fill="none" stroke="#B08D57" strokeWidth="0.28" />
    </g>
  );
}

function ScopeChevron({ angle, direction, lit }: { angle: number; direction: 1 | -1; lit: boolean }) {
  const theta = (angle * Math.PI) / 180;
  const radius = 14.55;
  const x = 50 + Math.cos(theta) * radius;
  const y = 48 + Math.sin(theta) * radius;
  const tx = -Math.sin(theta) * direction;
  const ty = Math.cos(theta) * direction;
  const px = -ty;
  const py = tx;
  const tip = `${x + tx * 1.05},${y + ty * 1.05}`;
  const left = `${x - tx * 0.62 + px * 0.48},${y - ty * 0.62 + py * 0.48}`;
  const right = `${x - tx * 0.62 - px * 0.48},${y - ty * 0.62 - py * 0.48}`;
  return <polygon points={`${tip} ${left} ${right}`} fill={lit ? "#B08D57" : "#2A3447"} opacity={lit ? 1 : 0.38} />;
}

function StartBranches({
  closed,
  onStart,
}: {
  closed: readonly string[];
  onStart: (id: string) => void;
}) {
  const starts = [
    { id: "four-stations", x: 32, y: 26, title: "Four stations" },
    { id: "one-breath", x: 68, y: 26, title: "One breath" },
    { id: "integration", x: 50, y: 76, title: "Integration" },
  ];
  return (
    <g>
      {starts.map((item) => (
        <path
          key={item.id}
          d={segmentPath(CENTER, item)}
          fill="none"
          stroke="#D8D1C7"
          strokeWidth="0.28"
        />
      ))}
      {starts.map((item) => {
        const shut = closed.includes(item.id);
        return (
          <g
            key={`${item.id}-label`}
            className={shut ? undefined : "cursor-pointer"}
            role="button"
            tabIndex={shut ? undefined : 0}
            aria-disabled={shut || undefined}
            onClick={() => {
              if (!shut) onStart(item.id);
            }}
            onKeyDown={(event) => {
              if (shut) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onStart(item.id);
              }
            }}
          >
            <circle cx={item.x} cy={item.y - 0.6} r="10" fill="transparent" />
            <text
              x={item.x}
              y={item.y}
              textAnchor="middle"
              fill="#2A3447"
              opacity={shut ? 0.35 : 1}
              fontSize="5.6"
              fontFamily='"Cormorant Garamond", Georgia, serif'
            >
              {item.title}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Trails({
  routeId,
  nodes,
  step,
  across,
}: {
  routeId: string;
  nodes: PlacedNode[];
  step: number;
  across: readonly (readonly [string, string])[];
}) {
  const byId = new Map(nodes.map((item) => [item.id, item]));
  return (
    <g aria-hidden>
      {across.map(([a, b]) => {
        const from = byId.get(a);
        const to = byId.get(b);
        if (!from || !to) return null;
        if (from.index + 1 > step || to.index + 1 > step) return null;
        return (
          <path
            key={`${routeId}-${a}-${b}`}
            d={segmentPath(from, to)}
            fill="none"
            stroke="#D8D1C7"
            strokeWidth="0.22"
            strokeDasharray="0.7 0.8"
          />
        );
      })}
      {nodes.map((item, index) => {
        const opened = step >= index + 1;
        const upcoming = index === step;
        if (!opened && !upcoming) return null;
        const from = index === 0 ? CENTER : nodes[index - 1]!;
        return (
          <path
            key={`${routeId}-trail-${item.id}`}
            d={segmentPath(from, item)}
            fill="none"
            stroke={opened ? "#B08D57" : "#2A3447"}
            strokeWidth={opened ? 0.42 : 0.28}
            opacity={opened ? 0.95 : 0.35}
          />
        );
      })}
    </g>
  );
}

function NodeMark({
  item,
  active,
  open,
  onChoose,
}: {
  item: PlacedNode;
  active: boolean;
  open: boolean;
  onChoose?: () => void;
}) {
  const anchor = item.side === "content" ? "end" : "start";
  const labelX = item.side === "content" ? item.x - 3.4 : item.x + 3.4;
  return (
    <g
      className={onChoose ? "cursor-pointer" : undefined}
      role={onChoose ? "button" : undefined}
      aria-label={onChoose ? item.title : undefined}
      aria-hidden={onChoose ? undefined : true}
      onClick={onChoose}
    >
      <circle
        cx={item.x}
        cy={item.y}
        r={active ? 2.8 : open ? 2 : 1.4}
        fill={active ? "#2A3447" : "#F5F2EB"}
        stroke="#2A3447"
        strokeWidth="0.28"
        opacity={open ? 1 : 0.4}
      />
      {open ? (
        <>
          <text
            x={labelX}
            y={item.y - 0.6}
            textAnchor={anchor}
            fill="#7A5A3A"
            fontSize="2.4"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.08"
          >
            {String(item.index + 1).padStart(2, "0")}
          </text>
          <text
            x={labelX}
            y={item.y + 2.6}
            textAnchor={anchor}
            fill="#2A3447"
            fontSize="3.8"
            fontFamily='"Cormorant Garamond", Georgia, serif'
          >
            {item.title}
          </text>
        </>
      ) : null}
    </g>
  );
}

function OrbButton({
  pole,
  label,
  pressed,
  onTake,
}: {
  pole: "plus" | "minus";
  label: string;
  pressed: boolean;
  onTake: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onTake}
      className={cn(
        "flex w-full items-center gap-4 border-b border-brand-border px-5 py-5 text-left font-display text-[clamp(1.35rem,2vw,1.7rem)] leading-snug text-brand-navy last:border-b-0 sm:px-6",
        pole === "plus" ? "border-brand-brass/70 bg-white" : "border-brand-border bg-white",
        pressed && pole === "plus" && "bg-brand-navy text-brand-ivory",
        pressed && pole === "minus" && "bg-brand-charcoal text-brand-ivory",
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-full border font-sans text-2xl",
          pole === "plus" ? "border-brand-brass" : "border-brand-navy/30",
          pressed && "border-brand-ivory/40",
        )}
        aria-hidden
      >
        {pole === "plus" ? "+" : "−"}
      </span>
      <span className="line-clamp-2">{label}</span>
    </button>
  );
}
