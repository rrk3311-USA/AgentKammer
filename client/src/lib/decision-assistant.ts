export const DECISION_ASSISTANT_OPEN_EVENT = "ak:open-decision-assistant";
export const DECISION_ASSISTANT_NUDGE_EVENT = "ak:advisor-nudge";
export const DECISION_ASSISTANT_NUDGE_CLEAR_EVENT = "ak:advisor-nudge-clear";
export const PAGE_SCROLL_ID = "ak-page-scroll";

export function scrollPageToTop() {
  const scroller = document.getElementById(PAGE_SCROLL_ID);
  if (scroller) {
    scroller.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function openDecisionAssistant(starter?: string) {
  window.dispatchEvent(
    new CustomEvent(DECISION_ASSISTANT_OPEN_EVENT, {
      detail: starter?.trim() ? { starter: starter.trim() } : undefined,
    }),
  );
  window.setTimeout(() => {
    document.getElementById("decision-assistant")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    document.getElementById("decision-assistant-input")?.focus({ preventScroll: true });
  }, 50);
}

export function nudgeDecisionAssistant(text: string) {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_NUDGE_EVENT, { detail: { text } }));
}

export function clearDecisionAssistantNudge() {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT));
}
