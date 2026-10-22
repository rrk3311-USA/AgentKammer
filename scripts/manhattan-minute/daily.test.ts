import { readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

const dir = join(process.cwd(), "scripts/manhattan-minute");

test("spoken script template has no dashes and keeps the three beats", () => {
  const script = readFileSync(join(dir, "script.template.txt"), "utf8");
  expect(script).not.toMatch(/[\u2013\u2014]/);
  expect(script).toContain("Good morning. This is the Manhattan Minute.");
  expect(script).toContain("[weather] {{spokenWeather}}");
  expect(script).toContain("The discount check.");
  expect(script).toContain("One deal.");
  expect(script).toContain("[aside] {{r2Aside}}");
  expect(script).toContain("One thing to watch.");
  expect(script).toContain("Until tomorrow.");
  expect(script).not.toMatch(/Live [Ww]here [Yy]ou [Bb]elong/);
  expect(script).not.toMatch(/Housing Strategy Session|transaction team|membership/i);
});

test("gate accepts a real verdict and refuses a placeholder", () => {
  execFileSync("python3", [join(dir, "gate.py"), "--self-test"], { stdio: "pipe" });
});

test("Instagram publish refuses to fire without an explicit approve flag", () => {
  try {
    execFileSync("python3", [join(dir, "publish-instagram.py"), "--dry-run"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    throw new Error("publish should have refused");
  } catch (error) {
    const err = error as { status?: number; stderr?: string };
    expect(err.status).toBe(2);
    expect(String(err.stderr)).toMatch(/--i-approve-publish/);
  }
});

test("voice parser keeps tags and drops empty bodies", () => {
  const out = execFileSync(
    "python3",
    [join(dir, "produce-voice.py"), join(dir, "script.template.txt"), "--parse-only", "-o", "/tmp/unused.mp3"],
    { encoding: "utf8" },
  );
  const lines = JSON.parse(out);
  expect(lines[0]).toEqual({
    tag: "",
    text: "Good morning. This is the Manhattan Minute.",
  });
  expect(lines[1].tag).toBe("weather");
  expect(lines.at(-1)).toEqual({ tag: "", text: "Until tomorrow." });
});
