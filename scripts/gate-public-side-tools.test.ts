import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PUBLIC_SIDE_TOOLS_OFFLINE_STUB, gatePublicSideTools } from "./gate-public-side-tools";

describe("gate public side tools build", () => {
  it("leaves the built files alone when the flag is on", () => {
    const root = mkdtempSync(path.join(tmpdir(), "ak-gate-on-"));
    const file = path.join(root, "dist/public/tools/livability/index.html");
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, "<html>Livability</html>");
    expect(gatePublicSideTools(root, true)).toEqual({ gated: false, files: [] });
    expect(readFileSync(file, "utf8")).toBe("<html>Livability</html>");
  });

  it("writes a noindex stub and drops the Wheel Livability link when the flag is off", () => {
    const root = mkdtempSync(path.join(tmpdir(), "ak-gate-off-"));
    const livability = path.join(root, "dist/public/tools/livability/index.html");
    const harness = path.join(root, "dist/public/tools/livability/harness.html");
    const wheel = path.join(root, "dist/public/tools/wheel-of-life/index.html");
    const robots = path.join(root, "dist/public/robots.txt");
    mkdirSync(path.dirname(livability), { recursive: true });
    mkdirSync(path.dirname(wheel), { recursive: true });
    writeFileSync(livability, "<html>Livability</html>");
    writeFileSync(harness, "<html>Harness</html>");
    writeFileSync(wheel, '<nav><a href="/tools/livability/">Livability</a>\n<a href="/calculator">Calculator</a></nav>');
    writeFileSync(robots, "User-agent: *\nDisallow: /tools/livability\nDisallow: /hub\n");

    const result = gatePublicSideTools(root, false);
    expect(result.gated).toBe(true);
    expect(readFileSync(livability, "utf8")).toBe(PUBLIC_SIDE_TOOLS_OFFLINE_STUB);
    expect(readFileSync(harness, "utf8")).toBe(PUBLIC_SIDE_TOOLS_OFFLINE_STUB);
    expect(readFileSync(livability, "utf8")).toContain('content="noindex, nofollow, noarchive"');
    expect(readFileSync(wheel, "utf8")).not.toContain("/tools/livability/");
    expect(readFileSync(wheel, "utf8")).toContain("/calculator");
    expect(readFileSync(robots, "utf8")).toContain("Disallow: /tools/communication-map");
  });
});
