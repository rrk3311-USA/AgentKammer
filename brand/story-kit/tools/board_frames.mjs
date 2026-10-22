// Render board.html reveal states to PNGs (used by tools/build_story.py).
// Usage: node tools/board_frames.mjs <config.json> <states.json> <outdir> [template]   (template: board (editorial, default) | board-panel)
//   states.json : [{"name":"s000","prog":{"r1":0.5,"r2":0,...}}, ...]
// Prints {"parts":[...],"fontsOk":bool,"fit":{rowPadding,keyBottom,ok,pastX960},"n":N} as the last line.
import { chromium } from 'playwright';
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [cfgPath, statesPath, outDir, tplArg] = process.argv.slice(2);
const tpl = (tplArg || 'board').replace(/\.html$/, '');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
for (const [k, v] of Object.entries(cfg)) if (typeof v === 'string' && /[\u2013\u2014]/.test(v)) { console.error(`refusing: en/em dash in "${k}"`); process.exit(2); }
const states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.addInitScript(c => { window.KIT_CONFIG = c; }, cfg);
page.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') console.log('page:', m.text()); });
await page.goto(pathToFileURL(path.join(dir, tpl + '.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(async () => { await document.fonts.ready; });
const fontsOk = await page.evaluate(() => document.fonts.check('400 48px "Cormorant Garamond"') && document.fonts.check('italic 500 36px "Cormorant Garamond"') && document.fonts.check('600 44px Inter'));
if (!fontsOk) console.log('WARNING: web fonts not loaded (needs network for Google Fonts)');
await page.evaluate(() => window.fitBoard());
await page.waitForTimeout(300);
const cap = page.locator('#capture');
for (const s of states) {
  await page.evaluate(p => window.setReveal(p), s.prog);
  await cap.screenshot({ path: path.join(outDir, s.name + '.png'), type: 'png' });
}
const parts = await page.evaluate(() => window.BOARD_PARTS);
const fit = await page.evaluate(() => {
  const over = [...document.querySelectorAll('.addr,.meta,.why,.seg,.note p,.stat,.statcap,.pre,.watch,.aside p,.runhead span')].filter(e => !e.hidden && e.getBoundingClientRect().height)
    .filter(e => { const r = document.createRange(); r.selectNodeContents(e); const b = r.getBoundingClientRect(); return b.right > 960.5 || e.scrollWidth > e.clientWidth + 1; })
    .map(e => (e.dataset.slot || e.className));
  return Object.assign({}, window.BOARD_FIT, { pastX960: over });
});
await browser.close();
console.log(JSON.stringify({ parts, fontsOk, fit, n: states.length }));
