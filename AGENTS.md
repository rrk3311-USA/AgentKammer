# AGENTS.md

## Cursor Cloud specific instructions

This is a single full-stack app ("Agent Kammer"): an Express + TypeScript backend that
also serves the Vite/React client on one port. There is only one service to run.

### Running

- Dev: `npm run dev` (runs `server/index.ts` via `tsx`). Serves both the API and the
  client on `PORT` (defaults to `5000`) at `http://localhost:5000`. API routes are under
  `/api/*`; all other paths are handled by the Vite dev middleware / client SPA.
- Build: `npm run build`; production: `npm start` (serves the prebuilt client from `dist`).
- Scripts live in `package.json`.

### Storage / database (important, non-obvious)

- The app uses in-memory storage by default: `server/storage.ts` exports
  `new MemStorage()`, so no `DATABASE_URL` is required to run or test locally. Data does
  not persist across restarts.
- Postgres (Neon) is optional. To use it, provide `DATABASE_URL` and switch the export to
  `new DbStorage()`, then run `npm run db:push` (Drizzle) to sync the schema. `drizzle.config.ts`
  throws if `DATABASE_URL` is unset, so only run `db:push`/`drizzle-kit` when it is set.

### Optional integrations

All external integrations are optional and degrade gracefully when their env vars are
absent (no crash on startup):
- `OPENAI_API_KEY` (or `AI_INTEGRATIONS_OPENAI_API_KEY` / `AI_INTEGRATIONS_OPENAI_BASE_URL`) —
  required only for the `/api/chat` AI assistant.
- `RESEND_API_KEY` — email sending; `EMAIL_USER` / `EMAIL_PASS` — nodemailer.
- `RENTCAST_API_KEY` — property valuations; `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — lead alerts.

### Lint / typecheck / tests

- There is no ESLint config and no automated test suite.
- `npm run check` runs `tsc` (the closest thing to lint). It currently reports several
  pre-existing type errors (e.g. `MemStorage` missing travel-deal methods, a nullable
  `openai`, a missing example import). These are pre-existing and do NOT block running the
  app, because dev/build use `tsx`/`esbuild` which do not type-check. Do not treat these
  as an environment failure.

### Notes

- `puppeteer` is a dependency (used for PDF preview generation via `preview-script.mjs`);
  it is not needed to run the app.
