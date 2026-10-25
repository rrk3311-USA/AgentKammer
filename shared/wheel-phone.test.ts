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
    expect(html).toContain(".need-plate svg{width:100%;height:auto;max-height:280px}");
  });

  it("makes radar and life-wheel labels readable and keeps the chart full width", () => {
    expect(phoneCss).toContain("#needchart text{font-size:27px;fill:#0D182B");
    expect(phoneCss).toContain("#bigwheel text{font-size:27px;fill:#F5F2EB");
    expect(phoneCss).toContain(".need-plate svg{max-height:none;width:100%");
    expect(phoneCss).toContain(".scores{margin-left:16px;margin-right:16px;font-size:1.68rem;grid-template-columns:1fr");
    expect(html).toContain("NEED_SHORT");
    expect(html).toContain('significance:"Sign"');
    expect(html).toContain('stroke-width",phone?"2.6"');
    expect(html).toContain('fill",phone?"rgba(13,24,43,.38)"');
    expect(html).toContain("scoreMark");
    expect(html).toContain("writeLabel");
  });

  it("compacts the dock, keeps 44px tabs, and pads the page from measured height", () => {
    expect(phoneCss).toContain(".vibe{display:none}");
    expect(phoneCss).toContain(".spin{width:52px;height:52px}");
    expect(phoneCss).toContain(".chip{min-height:44px;min-width:44px");
    expect(html).toContain(".chips{display:flex;gap:6px;overflow-x:auto");
    expect(html).toContain("function syncDockPad");
    expect(phoneCss).toContain("padding-bottom:calc(var(--dock-h,140px) + 48px)");
    expect(phoneCss).toContain("body.dock-on .dock-clear{height:calc(var(--dock-h,140px) + 24px)}");
    expect(html).toContain('class="dock-clear"');
    expect(html).toContain('id="dock-fold"');
    expect(html).toContain("setDockSlim");
  });
});
