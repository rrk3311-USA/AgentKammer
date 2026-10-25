import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync(new URL("../client/public/tools/wheel-of-life/index.html", import.meta.url), "utf8");
const phoneCss = html.slice(html.indexOf("@media(max-width:480px){"), html.indexOf(".print-doc{"));

describe("Wheel of Life phone readability", () => {
  it("scopes the fix to phones at 480px and leaves print and desktop contracts in place", () => {
    expect(phoneCss).toContain("@media(max-width:480px){");
    expect(html).toContain('uid==="p"?7.2');
    expect(html).toContain('uid!=="p"');
    expect(html).toContain('id="printwheel"');
    expect(html).toContain('viewBox="-205 -198 410 396"');
    expect(html).toContain("body.dock-on{padding-bottom:176px}");
    expect(html).toContain(".need-plate svg{width:100%;height:auto;max-height:280px");
  });

  it("keeps names off the phone life wheel and lets the one-column list carry them", () => {
    expect(phoneCss).toContain("#needchart text{font-size:20px;fill:#0D182B");
    expect(phoneCss).toContain("#bigwheel text{font-size:20px;fill:#F5F2EB");
    expect(phoneCss).toContain(".plate svg,.need-plate svg{max-height:min(48svh,340px);width:100%");
    expect(phoneCss).toContain("padding:8px 16px");
    expect(phoneCss).toContain("scroll-margin-top:calc(var(--ak-compact-header-h,52px) + 12px)");
    expect(phoneCss).toContain(".scores{margin:12px 16px 0;font-size:1.68rem;grid-template-columns:1fr");
    expect(phoneCss).toContain(".scores li{padding:8px 0");
    expect(phoneCss).toContain(".persp{padding:20px 0 12px");
    expect(html).toContain('viewBox",phone()?"-220 -220 440 440"');
    expect(html).toContain('phone?"-180 -180 360 360"');
    expect(html).toContain("const reach=R+16");
    expect(html).toContain("writeLabel(t,x,[scoreMark(st.s[a.k])])");
    expect(html).toContain('writeLabel(t,x,[n.n.toUpperCase()])');
    expect(html).toContain('stroke-width",phone?"2.6"');
    expect(html).toContain("scoreMark");
  });

  it("gives every area note label 18px of air and keeps radar names at the prior size", () => {
    expect(html).toContain(".move label{display:block;font:600 10.5px/1.4 var(--sans)");
    expect(html).toContain("margin:18px 0 8px");
    expect(html).toContain('"font-size":8');
    expect(html).toContain("Your note for this area");
    expect(html).not.toContain("const font=16/scale");
  });

  it("puts the life wheel and needs radar behind one two-option toggle", () => {
    expect(html).toContain('role="tablist"');
    expect(html).toContain('id="tab-wheel"');
    expect(html).toContain('id="tab-needs"');
    expect(html).toContain('id="panel-wheel"');
    expect(html).toContain('id="panel-needs"');
    expect(html).toContain("function setChartView");
    expect(html).toContain("Life wheel");
    expect(phoneCss).toContain("min-height:56px");
  });

  it("groups the eight areas into three compact sets and keeps eight wheel wedges", () => {
    expect(html).toContain('id:"body"');
    expect(html).toContain('id:"work"');
    expect(html).toContain('id:"people"');
    expect(html).toContain('n:"Body and mind"');
    expect(html).toContain('n:"Work and rooms"');
    expect(html).toContain('n:"People"');
    expect(html).toContain('keys:["health","fun","growth"]');
    expect(html).toContain('keys:["career","money","home"]');
    expect(html).toContain('keys:["family","relationships"]');
    expect(html).toContain("AREAS.forEach((a,i)");
    expect(html).toContain("N=AREAS.length");
    expect(html).not.toContain('id="ch-health"');
  });

  it("lets the dock wheel jump to the chart without changing the toggle", () => {
    expect(html).toContain('id="dock-chart"');
    expect(html).toContain("function goToChart");
    expect(html).toContain('scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})');
    expect(html).toContain("function setChartView");
  });

  it("compacts the dock, keeps 44px tabs, and pads the page from measured height", () => {
    expect(phoneCss).toContain(".vibe{display:none}");
    expect(phoneCss).toContain(".spin{width:52px;height:52px}");
    expect(phoneCss).toContain(".chip{min-height:44px;min-width:44px");
    expect(html).toContain(".chips{display:flex;gap:6px;overflow-x:auto");
    expect(html).toContain("function syncDockPad");
    expect(phoneCss).toContain("padding-bottom:calc(var(--dock-h,140px) + 12px)");
    expect(phoneCss).toContain("footer{padding-bottom:20px}");
    expect(html).not.toContain('class="dock-clear"');
    expect(html).toContain('id="dock-fold"');
    expect(html).toContain("setDockSlim");
  });
});
