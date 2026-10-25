import React, { useCallback, useId, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { whatsChangingCards, wrapRolodexIndex } from "@/data/decision-navigation";
import { cn } from "@/lib/utils";

const SWIPE_PX = 42;

function cardPos(index: number, active: number, length: number) {
  const diff = wrapRolodexIndex(index - active, length);
  if (diff === 0) return "0";
  if (diff === 1) return "1";
  if (diff === length - 1) return "-1";
  return "far";
}

export function WhatsChangingRolodex({
  className,
  showKicker = false,
  kicker = "What's Changing?",
}: {
  className?: string;
  showKicker?: boolean;
  kicker?: string;
} = {}) {
  const length = whatsChangingCards.length;
  const [active, setActive] = useState(0);
  const pointer = useRef<{ id: number; x: number; dragged: boolean } | null>(null);
  const ignoreClick = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelId = useId();
  const current = whatsChangingCards[active];

  const go = useCallback(
    (next: number) => {
      setActive(wrapRolodexIndex(next, length));
    },
    [length],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointer.current = { id: event.pointerId, x: event.clientX, dragged: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    if (!start || start.id !== event.pointerId) return;
    if (Math.abs(event.clientX - start.x) > 8) start.dragged = true;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (start.dragged) ignoreClick.current = true;
    if (Math.abs(dx) >= SWIPE_PX) go(dx < 0 ? active + 1 : active - 1);
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ignoreClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    ignoreClick.current = false;
  };

  return (
    <div data-ak-whats-changing className={cn("w-full text-left", className)}>
      {showKicker ? (
        <p id={labelId} className="text-[10px] uppercase tracking-[0.2em] text-brand-ivory/48">
          {kicker}
        </p>
      ) : null}
      <div
        ref={rootRef}
        data-ak-whats-changing-rolodex
        data-ak-situations-pills
        className={cn("ak-rolo", showKicker ? "mt-3" : "mt-0")}
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={showKicker ? labelId : undefined}
        aria-label={showKicker ? undefined : "What's Changing"}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="ak-rolo-stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {whatsChangingCards.map((item, index) => {
            const pos = cardPos(index, active, length);
            const n = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="ak-rolo-card"
                data-pos={pos}
                aria-hidden={pos === "far" ? true : undefined}
                tabIndex={pos === "0" ? 0 : -1}
              >
                <p className="ak-rolo-num">{n}</p>
                <p className="ak-rolo-title">{item.label}</p>
                <p className="ak-rolo-line">{item.line}</p>
                <p className="ak-rolo-go">Open the brief</p>
              </Link>
            );
          })}
        </div>

        <div className="ak-rolo-bar">
          <p className="ak-rolo-count" aria-live="polite">
            <span className="sr-only">Showing </span>
            {String(active + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            <span className="sr-only">of </span>
            {String(length).padStart(2, "0")}
            <span className="sr-only">. {current?.label}</span>
          </p>
          <div className="ak-rolo-arrows">
            <button
              type="button"
              className="ak-rolo-arrow"
              aria-label="Previous life change"
              onClick={() => go(active - 1)}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="ak-rolo-arrow"
              aria-label="Next life change"
              onClick={() => go(active + 1)}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
