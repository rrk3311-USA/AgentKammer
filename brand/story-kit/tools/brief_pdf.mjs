// Render brief.html to a US Letter PDF + PNG preview, and dump text boxes for the contrast check.
// Usage: node tools/brief_pdf.mjs <config.json> <out.pdf> <preview.png> <textbg.png>
// Prints {"fontsOk","title","overflow","text":[...]} as the last line.
import { chromium } from 'playwright';
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path'; import fs from 'fs';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [cfgPath, pdf, png, bg] = process.argv.slice(2);
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const b = await chromium.launch({ headless: true });
const page = await b.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.addInitScript(c => { window.KIT_CONFIG = c; }, cfg);
await page.goto(pathToFileURL(path.join(dir, 'brief.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(async () => { await document.fonts.ready; });
const fontsOk = await page.evaluate(() => document.fonts.check('400 48px "Cormorant Garamond"') && document.fonts.check('italic 500 20px "Cormorant Garamond"') && document.fonts.check('600 12px Inter'));
await page.waitForTimeout(200);
const info = await page.evaluate(() => {
  const pg = document.querySelector('.page').getBoundingClientRect(), foot = document.querySelector('.foot').getBoundingClientRect();
  const secs = [...document.querySelectorAll('.sec')].map(s => s.getBoundingClientRect().bottom);
  const text = [...document.querySelectorAll('#capture *')].filter(e => !e.closest('[hidden]') && !e.matches('[aria-hidden="true"]') &&
      [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())).map(e => {
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    return { t: e.textContent.trim().slice(0, 40), c: cs.color, fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, box: [r.left, r.top, r.right, r.bottom].map(Math.round) }; });
  return { title: document.title, overflow: Math.max(...secs) > foot.top - 8, lastSection: Math.round(Math.max(...secs)), footTop: Math.round(foot.top), pageBottom: Math.round(pg.bottom), text };
});
await page.locator('#capture').screenshot({ path: png, type: 'png' });
await page.addStyleTag({ content: '#capture *{color:transparent !important;text-shadow:none !important}' });
await page.locator('#capture').screenshot({ path: bg, type: 'png' });
await page.evaluate(() => document.querySelectorAll('style[data-x], style').forEach(s => { if (s.textContent.includes('transparent !important')) s.remove(); }));
await page.pdf({ path: pdf, width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await b.close();
console.log(JSON.stringify({ fontsOk, ...info }));
