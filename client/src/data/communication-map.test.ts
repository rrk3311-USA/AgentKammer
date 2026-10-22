import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Router } from "wouter";
import { primaryNav } from "@/components/site-shell";
import CommunicationMap from "@/pages/tools/CommunicationMap";
import ToolsHome from "@/pages/tools/ToolsHome";
import {
  CENTER_LINE,
  GUIDE_NAME,
  PURPOSE_LINE,
  COMMUNICATION_ROUTES,
  MINUS_LIMIT,
  assertNoSaaSLanguage,
  applyScopeTurn,
  INSTRUCTION_BOUNCE,
  INSTRUCTION_CHOOSE,
  INSTRUCTION_CONTINUE,
  INSTRUCTION_ORB,
  chooseRoute,
  communicationCopy,
  guideLine,
  guidePhase,
  initialMindState,
  layoutRoute,
  moveTo,
  orbId,
  takeOrb,
} from "./communication-map";

describe("communication map", () => {
  it("keeps the three routes that the map actually names", () => {
    expect(COMMUNICATION_ROUTES.map((route) => route.title)).toEqual([
      "Four stations",
      "One breath",
      "Integration",
    ]);
    expect(COMMUNICATION_ROUTES[0]?.nodes.map((node) => node.title)).toEqual([
      "Speaker",
      "Message",
      "Receiver",
      "Outcome",
    ]);
    expect(COMMUNICATION_ROUTES[1]?.nodes.map((node) => node.title)).toEqual([
      "Act",
      "Form",
      "Words and dials",
      "Channel",
      "Context",
      "Ear",
      "Response",
    ]);
    expect(communicationCopy()).toContain(CENTER_LINE);
    expect(() => assertNoSaaSLanguage(communicationCopy())).not.toThrow();
  });

  it("puts content on the left and relationship on the right", () => {
    for (const route of COMMUNICATION_ROUTES) {
      const { nodes } = layoutRoute(route);
      for (const node of nodes) {
        if (node.side === "content") expect(node.x).toBeLessThan(50);
        if (node.side === "relationship") expect(node.x).toBeGreaterThan(50);
      }
    }
  });

  it("returns to the mind and closes that route after three minus orbs", () => {
    let state = chooseRoute(initialMindState, "four-stations");
    const route = COMMUNICATION_ROUTES[0]!;
    for (let index = 0; index < MINUS_LIMIT; index += 1) {
      const node = route.nodes[index]!;
      state = moveTo(state, index + 1);
      state = takeOrb(state, orbId(route.id, node.id, "minus"));
    }
    expect(state.routeId).toBeNull();
    expect(state.step).toBe(0);
    expect(state.closed).toEqual(["four-stations"]);
    expect(state.notice).toMatch(/mind/i);
    expect(chooseRoute(state, "four-stations")).toEqual(state);
    const next = chooseRoute(state, "one-breath");
    expect(next.routeId).toBe("one-breath");
    expect(next.step).toBe(1);
  });

  it("replaces the instruction after each step of the route", () => {
    expect(guidePhase(initialMindState)).toBe("choose");
    expect(guideLine(initialMindState)).toBe(INSTRUCTION_CHOOSE);
    const opened = chooseRoute(initialMindState, "four-stations");
    expect(opened.step).toBe(1);
    expect(guidePhase(opened)).toBe("orb");
    expect(guideLine(opened)).toBe(INSTRUCTION_ORB);
    const taken = takeOrb(opened, orbId("four-stations", "speaker", "plus"));
    expect(taken.routeId).toBe("four-stations");
    expect(taken.step).toBe(1);
    expect(guidePhase(taken)).toBe("continue");
    expect(guideLine(taken)).toBe(INSTRUCTION_CONTINUE);
    const continued = moveTo(taken, 2);
    expect(continued.step).toBe(2);
    expect(guideLine(continued)).toBe(INSTRUCTION_ORB);
    expect(() => assertNoSaaSLanguage([INSTRUCTION_CHOOSE, INSTRUCTION_ORB, INSTRUCTION_CONTINUE, INSTRUCTION_BOUNCE].join(" "))).not.toThrow();

    let warned = opened;
    warned = takeOrb(warned, orbId("four-stations", "speaker", "minus"));
    warned = moveTo(warned, 2);
    warned = takeOrb(warned, orbId("four-stations", "message", "minus"));
    warned = moveTo(warned, 3);
    expect(guideLine(warned)).toBe(INSTRUCTION_ORB);
    warned = takeOrb(warned, orbId("four-stations", "receiver", "minus"));
    expect(warned.routeId).toBeNull();
    expect(warned.closed).toEqual(["four-stations"]);
    expect(guideLine(warned)).toBe(INSTRUCTION_BOUNCE);
  });

  it("opens the other routes again when every route has closed", () => {
    let state = initialMindState;
    for (const route of COMMUNICATION_ROUTES) {
      state = chooseRoute(state, route.id);
      for (let index = 0; index < MINUS_LIMIT; index += 1) {
        state = moveTo(state, index + 1);
        state = takeOrb(state, orbId(route.id, route.nodes[index]!.id, "minus"));
      }
    }
    expect(state.routeId).toBeNull();
    expect(state.closed).toEqual(["integration"]);
    expect(chooseRoute(state, "four-stations").routeId).toBe("four-stations");
    expect(chooseRoute(state, "integration").routeId).toBeNull();
  });

  it("renders step 1 of the decision guide, and hides later controls", () => {
    const html = renderToStaticMarkup(
      createElement(Router, { ssrPath: "/tools/communication-map" }, createElement(CommunicationMap)),
    );
    expect(html).toContain(GUIDE_NAME);
    expect(html).toContain("The mind");
    expect(html).toContain("Four stations");
    expect(html).toContain("One breath");
    expect(html).toContain("Integration");
    expect(html).toContain(PURPOSE_LINE);
    expect(() => assertNoSaaSLanguage(PURPOSE_LINE)).not.toThrow();
    expect(html).toContain(INSTRUCTION_CHOOSE);
    expect(html).toContain("Step 1");
    expect(html).not.toContain(INSTRUCTION_ORB);
    expect(html).not.toContain(INSTRUCTION_CONTINUE);
    expect(html).not.toContain("To the mind");
    expect(html).not.toContain("Turn the scope either way");
    expect(html).toContain("Calibration scope");
    expect(html).not.toContain('type="range"');
    expect(html).not.toContain("Speaker");
    expect(html).not.toContain("<article");
    expect(html.toLowerCase()).not.toContain("platform");
    expect(html.toLowerCase()).not.toContain("subscription");
    expect(html.toLowerCase()).not.toContain("signup");
    expect(html.toLowerCase()).not.toContain("dashboard");
    expect(html.toLowerCase()).not.toContain("software");
    expect(html).not.toMatch(/\bplan\b/i);
    expect(html).not.toContain("Anatomy of Communication");
  });

  it("turns the scope clockwise to advance and counterclockwise to go back", () => {
    expect(applyScopeTurn(1, 4, 36)).toEqual({ step: 2, carry: 0 });
    expect(applyScopeTurn(1, 4, 80)).toEqual({ step: 3, carry: 8 });
    expect(applyScopeTurn(3, 4, -36)).toEqual({ step: 2, carry: 0 });
    expect(applyScopeTurn(1, 4, -40)).toEqual({ step: 1, carry: -14 });
    expect(applyScopeTurn(4, 4, 50)).toEqual({ step: 4, carry: 14 });
  });

  it("keeps five header doors and lists the Decision Guide", () => {
    expect(primaryNav).toHaveLength(5);
    expect(primaryNav.map((item) => item.label)).toEqual([
      "Home",
      "Start Here",
      "Guides",
      "Interactive Tools",
      "Contact",
    ]);
    const html = renderToStaticMarkup(createElement(Router, { ssrPath: "/tools" }, createElement(ToolsHome)));
    expect(html).toContain('href="/tools/communication-map"');
    expect(html).toContain("Decision Guide");
    expect(html).toContain('href="/calculator"');
    expect(html).not.toContain("Desk");
    expect(html).not.toContain("/insights");
  });
});
