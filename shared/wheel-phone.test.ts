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
    expect(html).toContain(".need-plate svg{width:100%;height:auto;max-height:none");
  });

  it("keeps names off the phone life wheel and lets the one-column list carry them", () => {
    expect(phoneCss).toContain("#needchart text{fill:#0D182B");
    expect(phoneCss).toContain("#bigwheel text{font-size:20px;fill:#F5F2EB");
    expect(phoneCss).toContain(".need-plate svg{max-height:none;width:100%");
    expect(phoneCss).toContain("padding:8px 16px");
    expect(phoneCss).toContain("scroll-margin-top:calc(var(--ak-compact-header-h,52px) + 12px)");
    expect(phoneCss).toContain(".scores{margin:12px 16px 0;font-size:1.68rem;grid-template-columns:1fr");
    expect(phoneCss).toContain(".scores li{padding:8px 0");
    expect(phoneCss).toContain(".persp{padding:28px 0 32px");
    expect(html).toContain('viewBox",phone()?"-220 -220 440 440"');
    expect(html).toContain("phone?[-250,-230,500,460]");
    expect(html).toContain("const reach=R+16");
    expect(html).toContain("writeLabel(t,x,[scoreMark(st.s[a.k])])");
    expect(html).toContain('writeLabel(t,x,[n.n.toUpperCase()])');
    expect(html).toContain('stroke-width",phone?"2.6"');
    expect(html).toContain("scoreMark");
  });

  it("gives every area note label 18px of air and doubles the needs-radar names", () => {
    expect(html).toContain(".move label{display:block;font:600 10.5px/1.4 var(--sans)");
    expect(html).toContain("margin:18px 0 8px");
    expect(html).toContain("const font=16/scale");
    expect(html).toContain("class:\"need-axis\"");
    expect(html).toContain("Your note for this area");
  });

  it("compacts the dock, keeps 44px tabs, and pads the page from measured height", () => {
    expect(phoneCss).toContain(".vibe{display:none}");
    expect(phoneCss).toContain(".spin{width:52px;height:52px}");
    expect(phoneCss).toContain(".chip{min-height:44px;min-width:44px");
    expect(html).toContain(".chips{display:flex;gap:6px;overflow-x:auto");
    expect(html).toContain("function syncDockPad");
    expect(phoneCss).toContain("padding-bottom:calc(var(--dock-h,140px) + 28px)");
    expect(phoneCss).toContain("body.dock-on .dock-clear{height:calc(var(--dock-h,140px) + 8px)}");
    expect(html).toContain('class="dock-clear"');
    expect(html).toContain('id="dock-fold"');
    expect(html).toContain("setDockSlim");
  });
});
