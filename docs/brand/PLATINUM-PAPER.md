# Platinum Paper

Canonical print sheet for Agent Kammer. Implement from `client/public/chrome/platinum-paper.css`.

The core reference is **The Manhattan Minute** Kammer Report story sheet (grey v11): honed limestone paper, silver inlay, a small AK monogram, and a low `AGENTKAMMER.COM` pinstripe footer. Do not use cream, beige, or a dark navy header block.

`platinum-print.css` is a shim that imports this file so older links keep working.

## Source files

| Role | Path |
|------|------|
| Shared theme (use this) | `client/public/chrome/platinum-paper.css` |
| Stone texture | `client/public/chrome/stone-bg.png` (from `scripts/make_stone.py`) |
| Calculator browser print | `client/src/pages/Calculator.tsx` (`.calculator-print-doc`) + `client/src/index.css` |
| Calculator PDF | `client/src/lib/calculator-pdf.ts` |
| Wheel print | `client/public/tools/wheel-of-life/index.html` (`#print-doc`) |

## Template (nothing else by default)

1. **Paper.** `#CFCCC6` with `stone-bg.png` mottled over it.
2. **Frame.** Double silver hairline inset from the page edge (`rgba(126,133,140,.30)`), plus a platinum gradient ring.
3. **Masthead.** Small AK monogram, centered. Short platinum rule under it.
4. **Footer.** `AGENTKAMMER.COM` between fine pinstripe bars, sitting on the floor of the frame.
5. **Slug.** Bottom-left inside the frame. Each page fills `.ak-pp-slug` with its own path (`interactive-tools/calculator`).
6. **Notes.** `.ak-pp-notes` flex-fills leftover space. Never forces a second page.

Hairline dividers and numbered `01 / 02 / 03` sections are opt-in. The off-white inlay card is opt-in (Calculator, Property Assessment).

## Tokens

| Token | Value | Use |
|-------|--------|-----|
| `--ak-pp-paper` | `#CFCCC6` | Page ground |
| `--ak-pp-deep` | `#161C28` | Main ink |
| `--ak-pp-navy` | `#2A3447` | Accents only |
| `--ak-pp-plat` | `#9AA1A8` | Platinum |
| `--ak-pp-plat-ink` | `#7E858C` | Platinum ink |
| `--ak-pp-label` | `#4A5058` | Tracked caps labels (`.32em`, 600) |
| `--ak-pp-meta` | `#5F6672` | Date, disclaimer |
| `--ak-pp-sep` | `rgba(22,28,40,.26)` | Quiet separators |
| `--ak-pp-hair` | `rgba(126,133,140,.30)` | Silver hairline |
| `--ak-pp-card-from` | `#FCFCFB` | Inlay top |
| `--ak-pp-card-to` | `#F0F1F1` | Inlay bottom |
| `--ak-pp-notes` | `rgba(255,255,255,.35)` | Bleached notes wash |
| `--ak-pp-rule` | `rgba(22,28,40,.08)` | Notes writing lines |
| `--ak-pp-gradient` | `135deg #7E858C → #C9CED3 → #EEF0F2 → #9AA1A8 → #7E858C → #C9CED3` | Platinum rules and inlay ring |
| `--ak-pp-pinstripe` | `repeating-linear-gradient(90deg, rgba(42,52,71,.22) 0 1px, transparent 1px 7px)` | Footer ticks |

Type: Cormorant Garamond for display and large numerals. Inter for UI, labels, and body.

## Markup

```html
<article class="ak-pp-page">
  <div class="ak-pp-frame" aria-hidden="true">
    <i class="rule-out"></i><i class="rule-in"></i>
  </div>
  <header class="ak-pp-mast">
    <img class="ak-pp-mark" src="/brand/ak-monogram-midnight.png" alt="">
    <i class="ak-pp-rule"></i>
  </header>
  <div class="ak-pp-body">
    <!-- page content -->
    <div class="ak-pp-notes">
      <p class="ak-pp-notes-label">Notes</p>
      <div class="ak-pp-notes-rules" aria-hidden="true"></div>
    </div>
  </div>
  <footer class="ak-pp-foot">
    <p class="ak-pp-slug">interactive-tools/example</p>
    <p class="ak-pp-word"><i class="ak-pp-ticks"></i>AGENTKAMMER.COM<i class="ak-pp-ticks"></i></p>
    <span class="ak-pp-foot-end" aria-hidden="true"></span>
  </footer>
</article>
```

Fill `.ak-pp-notes-rules` with enough empty `<i>` marks that the flex box can show ruled lines for whatever height remains. The block itself `flex: 1 1 auto` and the page is `overflow: hidden`, so leftover paper is used and nothing spills to a second sheet.

## Inlay (opt-in)

Off-white card, set into the stone:

- Fill: `#FCFCFB` to `#F0F1F1`
- 2px platinum gradient ring
- Soft shadow
- Class: `.ak-pp-inlay`

The big monthly figure sits on the paper, not in a dark block.

## How to apply

1. Link `/chrome/platinum-paper.css`.
2. Use the markup above. Set the slug to the page path.
3. Keep `print-color-adjust: exact`. Hide screen chrome in `@media print`.
4. One letter page. Fit by tightening type, not by adding pages.

If the sheet must change, change this file first, then the RGB constants in `calculator-pdf.ts`.
