// Render a story-kit template to a 1080x1920 PNG.
// Usage: node shoot.mjs <cover-editorial|board|end-panel|cover|board-panel> [config.json] [--out=path.png] [--key=value ...]
//   config.json : optional JSON of slot values (see configs/). CLI --key=value overrides it.
//   default out : out/<template>-<date>.png
import { chromium } from 'playwright';
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const tpl = (args.shift() || 'cover').replace(/\.html$/, '');
let cfg = {}; let out = null;
for (const a of args) {
  if (a.startsWith('--out=')) out = a.slice(6);
  else if (a.startsWith('--')) { const i = a.indexOf('='); cfg[a.slice(2, i)] = a.slice(i + 1); }
  else cfg = Object.assign(JSON.parse(fs.readFileSync(a, 'utf8')), cfg);
}
for (const [k, v] of Object.entries(cfg)) if (typeof v === 'string' && /[\u2013\u2014]/.test(v)) { console.error(`refusing: en/em dash in "${k}"`); process.exit(2); }
const date = cfg.date || new Date().toLocaleDateString('en-CA');
out = path.resolve(out || path.join(dir, 'out', `${tpl}-${date}.png`));
fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.addInitScript(c => { window.KIT_CONFIG = c; }, cfg);
page.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') console.log('page:', m.text()); });
await page.goto(pathToFileURL(path.join(dir, tpl + '.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(async () => { await document.fonts.ready; });
const fontsOk = await page.evaluate(() => document.fonts.check('400 48px "Cormorant Garamond"') && document.fonts.check('italic 400 26px "Cormorant Garamond"') && document.fonts.check('500 16px Inter'));
if (!fontsOk) console.log('WARNING: web fonts not loaded (needs network for Google Fonts)');
const rep = await page.evaluate(() => {
  const sel = ['.mast img', '.kicker', '.mast .rule', '.title', '.plate', '.plate span', '.stand p', '.facts', '.fx', '.contents', '.c', '.sec', '.stat', '.statcap', '.panel', '.row', '.seg', '.addr', '.meta', '.why', '.note', '.signoff', '.signoff h2', '.signoff .label', '.art', '.cta', '.cta .dl', '.sticker', '.efoot .mono', '.divider', '.fbody', '.tag', '.fine', '.efoot .date'];
  const rows = [];
  for (const s of sel) for (const e of document.querySelectorAll(s)) { if (e.hidden) continue; const b = e.getBoundingClientRect(); if (!b.height) continue; rows.push([s, Math.round(b.top), Math.round(b.bottom), Math.round(b.left), Math.round(b.right), e.scrollWidth > e.clientWidth + 1]); }
  return rows;
});
rep.forEach(x => console.log(JSON.stringify(x)));
const fit = await page.evaluate(() => window.COVER_FIT || window.BOARD_FIT || null);
if (fit) console.log((fit.ok ? 'fit ' : 'WARNING: does not fit ') + JSON.stringify(fit));
await page.waitForTimeout(300);
await page.locator('#capture').screenshot({ path: out, type: 'png' });
await browser.close();
console.log('wrote', out);
