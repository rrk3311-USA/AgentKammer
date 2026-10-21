import { useEffect, useRef, useState } from "react";
import { grammar } from "@/components/visual-grammar";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { cn } from "@/lib/utils";
import {
  BOUNCE_NOTICE,
  CENTER_LINE,
  COMMUNICATION_MAP_PATH,
  COMMUNICATION_ROUTES,
  chooseRoute,
  focusedNode,
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

export default function CommunicationMap() {
  usePageMetadata({
    title: "The Anatomy of Communication",
    description: "What we do with words, what words do to us, and how to hear what people actually mean.",
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

  const plate = state.notice && !state.routeId ? state.notice : current?.line ?? route?.trail ?? CENTER_LINE;
  const focus = current && placed ? placed.nodes.find((item) => item.id === current.id) : null;
  const panX = focus ? (CENTER.x - focus.x) * 0.05 : 0;
  const panY = focus ? (CENTER.y - focus.y) * 0.05 : 0;

  return (
    <main
      data-testid="communication-map"
      className="flex h-full min-h-0 flex-col overflow-hidden bg-brand-ivory text-brand-ink"
    >
      <div className="flex shrink-0 items-baseline justify-between gap-4 px-4 pt-3 sm:px-6">
        <p className={grammar.eyebrow}>The anatomy</p>
        <p className="text-[11px] uppercase tracking-[0.16em] text-brand-cocoa">
          Content
          <span className="mx-2 text-brand-border">/</span>
          Relationship
        </p>
      </div>

      <div className="relative min-h-0 flex-1">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label="A mind. Content on the left, relationship on the right."
        >
          <g className="cm-pan" transform={`translate(${panX} ${panY})`}>
            {placed ? (
              <Trails routeId={route!.id} nodes={placed.nodes} step={state.step} across={route!.across} />
            ) : (
              <StartBranches
                closed={state.closed}
                onStart={(id) => setState((prev) => chooseRoute(prev, id))}
              />
            )}
            <Hologram
              dim={Boolean(current)}
              onReturn={route ? () => setState((prev) => returnToMind(prev)) : undefined}
            />
            {route?.surround ? (
              <text
                x="50"
                y="14.5"
                textAnchor="middle"
                fill="#7A5A3A"
                fontSize="1.7"
                letterSpacing="0.12"
                fontFamily="Inter, sans-serif"
              >
                {route.surround.join("  ·  ")}
              </text>
            ) : null}
            <text
              x="30"
              y="10"
              textAnchor="middle"
              fill="#7A5A3A"
              fontSize="1.8"
              letterSpacing="0.16"
              fontFamily="Inter, sans-serif"
            >
              CONTENT
            </text>
            <text
              x="70"
              y="10"
              textAnchor="middle"
              fill="#7A5A3A"
              fontSize="1.8"
              letterSpacing="0.16"
              fontFamily="Inter, sans-serif"
            >
              RELATIONSHIP
            </text>
            {placed?.nodes.map((item) => (
              <NodeMark
                key={item.id}
                item={item}
                active={current?.id === item.id}
                onChoose={() => setState((prev) => moveTo(prev, item.index + 1))}
              />
            ))}
            {placed?.orbs.map((orb) => {
              const reached = state.step === orb.index + 1;
              const taken = state.taken.includes(orb.id);
              return (
                <g key={orb.id} opacity={reached || taken ? 1 : 0.35}>
                  <circle
                    cx={orb.x}
                    cy={orb.y}
                    r="1.7"
                    fill={taken ? (orb.pole === "plus" ? "#B08D57" : "#2C3138") : "#F5F2EB"}
                    stroke={orb.pole === "plus" ? "#B08D57" : "#2A3447"}
                    strokeWidth="0.28"
                  />
                  <text
                    x={orb.x}
                    y={orb.y + 0.55}
                    textAnchor="middle"
                    fontSize="1.7"
                    fill={taken ? "#F5F2EB" : "#2A3447"}
                    fontFamily="Inter, sans-serif"
                  >
                    {orb.pole === "plus" ? "+" : "−"}
                  </text>
                  {reached ? (
                    <circle
                      cx={orb.x}
                      cy={orb.y}
                      r="2.6"
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
        </svg>
      </div>

      <div className="shrink-0 border-t border-brand-border bg-brand-ivory px-4 py-3 sm:px-6">
        <p className="line-clamp-2 font-display text-[1.35rem] leading-tight text-brand-navy" aria-live="polite">
          {plate}
        </p>

        {current ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
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

        {route ? (
          <div className="mt-3 flex items-center gap-3">
            <label className="sr-only" htmlFor="communication-toggle">
              Move along the route toward a response
            </label>
            <input
              id="communication-toggle"
              className="cm-toggle w-full flex-1"
              type="range"
              min={1}
              max={route.nodes.length}
              step={1}
              value={Math.max(1, state.step)}
              aria-valuetext={current ? current.title : route.trail}
              onChange={(event) => setState((prev) => moveTo(prev, Number(event.target.value)))}
            />
          </div>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {COMMUNICATION_ROUTES.map((item, index) => {
            const closed = state.closed.includes(item.id);
            const selected = state.routeId === item.id;
            return (
              <button
                key={item.id}
                ref={index === 0 ? firstOpenRoute : undefined}
                type="button"
                disabled={closed}
                aria-pressed={selected}
                onClick={() => setState((prev) => chooseRoute(prev, item.id))}
                className={cn(
                  "border px-3 py-2 text-[11px] uppercase tracking-[0.14em]",
                  selected && "border-brand-navy bg-brand-navy text-brand-ivory",
                  !selected && !closed && "border-brand-border bg-white text-brand-navy",
                  closed && "border-brand-border text-brand-graphite/40",
                )}
              >
                {closed ? `${item.title} closed` : item.title}
              </button>
            );
          })}
          {route ? (
            <button
              type="button"
              onClick={() => setState((prev) => returnToMind(prev))}
              className="px-2 py-2 text-[11px] uppercase tracking-[0.14em] text-brand-navy"
            >
              To the mind
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function Hologram({ dim, onReturn }: { dim: boolean; onReturn?: () => void }) {
  return (
    <g
      opacity={dim ? 0.55 : 1}
      className={onReturn ? "cursor-pointer" : undefined}
      role={onReturn ? "button" : undefined}
      tabIndex={onReturn ? 0 : undefined}
      aria-label={onReturn ? "Back to the mind" : undefined}
      onClick={onReturn}
      onKeyDown={
        onReturn
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onReturn();
              }
            }
          : undefined
      }
    >
      <ellipse cx="50" cy="48" rx="15.5" ry="12.4" fill="none" stroke="#2A3447" strokeWidth="0.35" />
      <ellipse cx="50" cy="48" rx="11" ry="8.6" fill="none" stroke="#2A3447" strokeWidth="0.22" opacity="0.65" />
      <ellipse cx="50" cy="48" rx="6.4" ry="4.8" fill="none" stroke="#B08D57" strokeWidth="0.28" />
      <path d="M50 35.8 Q45.6 48 50 60.2" fill="none" stroke="#2A3447" strokeWidth="0.28" />
      <path d="M50 35.8 Q54.4 48 50 60.2" fill="none" stroke="#B08D57" strokeWidth="0.28" />
      <path d="M35.2 48 H64.8" stroke="#D8D1C7" strokeWidth="0.22" />
      <circle cx="50" cy="50.4" r="0.85" fill="#B08D57" />
      <text
        x="50"
        y="45.8"
        textAnchor="middle"
        fill="#2A3447"
        fontSize="2.4"
        fontFamily='"Cormorant Garamond", Georgia, serif'
      >
        The mind
      </text>
    </g>
  );
}

function StartBranches({
  closed,
  onStart,
}: {
  closed: readonly string[];
  onStart: (id: string) => void;
}) {
  const starts = [
    { id: "four-stations", x: 24, y: 28, title: "Four stations" },
    { id: "one-breath", x: 76, y: 28, title: "One breath" },
    { id: "integration", x: 50, y: 78, title: "Integration" },
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
            <circle cx={item.x} cy={item.y - 0.6} r="5" fill="transparent" />
            <text
              x={item.x}
              y={item.y}
              textAnchor="middle"
              fill="#2A3447"
              opacity={shut ? 0.35 : 1}
              fontSize="2.15"
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
        const from = index === 0 ? CENTER : nodes[index - 1]!;
        const reached = step >= index + 1;
        return (
          <path
            key={`${routeId}-trail-${item.id}`}
            d={segmentPath(from, item)}
            fill="none"
            stroke={reached ? "#B08D57" : "#2A3447"}
            strokeWidth={reached ? 0.42 : 0.28}
            opacity={reached ? 0.95 : 0.35}
          />
        );
      })}
    </g>
  );
}

function NodeMark({ item, active, onChoose }: { item: PlacedNode; active: boolean; onChoose: () => void }) {
  const anchor = item.side === "content" ? "end" : "start";
  const labelX = item.side === "content" ? item.x - 3.4 : item.x + 3.4;
  return (
    <g className="cursor-pointer" onClick={onChoose}>
      <circle cx={item.x} cy={item.y} r={active ? 2.15 : 1.45} fill={active ? "#2A3447" : "#F5F2EB"} stroke="#2A3447" strokeWidth="0.28" />
      <text
        x={labelX}
        y={item.y - 0.6}
        textAnchor={anchor}
        fill="#7A5A3A"
        fontSize="1.45"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.08"
      >
        {String(item.index + 1).padStart(2, "0")}
      </text>
      <text
        x={labelX}
        y={item.y + 1.8}
        textAnchor={anchor}
        fill="#2A3447"
        fontSize="2.15"
        fontFamily='"Cormorant Garamond", Georgia, serif'
      >
        {item.title}
      </text>
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
        "flex min-h-11 items-center gap-2 border px-2.5 py-1.5 text-left text-[12px] leading-4 text-brand-navy",
        pole === "plus" ? "border-brand-brass/70 bg-white" : "border-brand-border bg-white",
        pressed && pole === "plus" && "bg-brand-navy text-brand-ivory",
        pressed && pole === "minus" && "bg-brand-charcoal text-brand-ivory",
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm",
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
