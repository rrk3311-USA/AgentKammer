# Platinum paper and trim

Core print theme for Agent Kammer. Use this file as the reference. Implement from `client/public/chrome/platinum-print.css`.

The daily “Kammer Report” name is retired in product copy (it now maps to Property Assessment). The **platinum grey paper + double platinum trim** that those report pages were meant to share lives in the Wheel of Life print layout. That is the source. This file extracts it so calculator, wheel, and later reports print the same sheet.

## Source files

| Role | Path |
|------|------|
| Shared theme (use this) | `client/public/chrome/platinum-print.css` |
| Original implementation | `client/public/tools/wheel-of-life/index.html` (`.print-page`, `.mm-frame`, `@media print`) |
| Calculator PDF (same palette, drawn in RGB) | `client/src/lib/calculator-pdf.ts` |
| Calculator browser print | `client/src/index.css` (`@media print` + `.calculator-sheet`) |
| Screen cousins (do not treat as print) | `--platinum: #E8E4DC` in the wheel `:root`; `--ak-compact-platinum: #E5E4E2` in `client/public/chrome/compact-header.css`; `--brand-border: #D8D1C7` in `client/src/index.css` |

Screen grain on the wheel (`.grain`, `--grain` fractalNoise SVG) is **not** part of the print sheet. Print is flat paper plus the metal trim.

## Tokens

| Token | Hex | Use |
|-------|-----|-----|
| `--ak-platinum-paper` | `#d8d2c6` | Page ground. The grey paper. |
| `--ak-platinum-panel` | `#f7f3ea` | Inner cards, strips, note blocks |
| `--ak-platinum-bar` | `#e8e2d6` | Bar tracks |
| `--ak-platinum-trim` | `#B8BCC2` | Outer rule, corner brackets |
| `--ak-platinum-trim-in` | `#D6D9DE` | Inner rule, 1.7mm inset |
| `--ak-platinum-ink` | `#1c1914` | Body type |
| `--ak-platinum-navy` | `#161c28` | Display type |
| `--ak-platinum-slate` | `#2a3447` | Kickers, folio |
| `--ak-platinum-rule` | `#cfc8bb` | Interior grid lines |
| `--ak-platinum-rule-soft` | `#d8d1c4` | Soft list rules |
| `--ak-platinum-muted` | `#3a352c` | Secondary italic |

PDF RGB equivalents (0–1):

| Color | RGB |
|-------|-----|
| Paper `#d8d2c6` | `0.847 0.824 0.776` |
| Panel `#f7f3ea` | `0.969 0.953 0.918` |
| Trim `#B8BCC2` | `0.722 0.737 0.761` |
| Inner trim `#D6D9DE` | `0.839 0.851 0.871` |
| Ink `#1c1914` | `0.110 0.098 0.078` |

## Trim construction

1. Outer box: `1.15pt solid #B8BCC2` at the page edge.
2. Inner box: `0.4pt solid #D6D9DE`, inset `1.7mm`.
3. Corner brackets: `5.6mm` L-marks, `#B8BCC2`, `0.95pt`, offset `1.15mm` from the outer edge.

Markup:

```html
<div class="ak-platinum-frame" aria-hidden="true">
  <i class="rule-out"></i><i class="rule-in"></i>
  <i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>
</div>
```

`.mm-frame` is an alias so the Wheel print markup keeps working.

## How to apply a new print surface

1. Link `/chrome/platinum-print.css`.
2. Give the printed page `ak-platinum-page` (or set `background: var(--ak-platinum-paper)`).
3. Place the frame as the first child of a `position: relative` sheet.
4. Keep `print-color-adjust: exact`.
5. Hide chrome (header, footer, dock) in `@media print`.

Do not invent a second paper grey. If the sheet must change, change the shared file first, then the PDF RGB constants in `calculator-pdf.ts`.
