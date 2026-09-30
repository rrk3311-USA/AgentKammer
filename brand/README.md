# Agent Kammer brand assets

This folder is the drop zone for reusable, non-site brand assets (logo masters, photography, social kits). Shipped UI logos live in `client/public/brand/`. Implementation tokens live in `client/src/index.css` and `tailwind.config.ts`.

The older site product / brand operating manual is still at [`docs/brand/AGENT-KAMMER-BRAND.md`](../docs/brand/AGENT-KAMMER-BRAND.md). For publication copy, Instagram, plates and listing reviews, follow `AGENTS.md` and `.cursor/rules/` when the two disagree.

## Manhattan Minute story kit

- Spec: [`stone-platinum-story-kit.md`](./stone-platinum-story-kit.md)
- Code: [`story-kit/`](./story-kit/)
- Cursor rule: `.cursor/rules/manhattan-minute-story-kit.mdc`

Rendering needs Node with Playwright (Chromium) and network access for Google Fonts: `npm i -D playwright && npx playwright install chromium` inside `brand/story-kit/`, then `node shoot.mjs cover-editorial <config>` from that folder. Python tools need Pillow and numpy (`build_story.py` also needs ffmpeg).

Start a day by copying `story-kit/configs/_template.json` to `story-kit/configs/YYYY-MM-DD.json`.

A few tools mention older box paths (`/workspace/manhattan-minute/...` as a data-file fallback in `tools/build_brief.py`, and a provenance comment in `kit.css`). They are harmless when missing.

The kit is excluded from the Vite / TypeScript site build. Do not commit `node_modules`, `out/` renders, audio or video.

## What was left out of the kit commit

- `out/` renders (about 182 MB, including MP4s)
- `retired/` (old QR and procedural owl assets)
- `assets/charcoal/owls/previews/` (review renders)
- original pre-processing owl PNGs (`assets/charcoal/owls/*.png`; the processed layers in `owls/stone/` are included)
- `configs/2026-09-29.json` (the dated sample config)
- `tools/__pycache__`
- a `node_modules` symlink
- all audio and video
- `stone-platinum-story-kit.md.bak-*` backups

Nothing private is included: no personal, medical or ID information, no secrets or tokens, and no private workspace links.
