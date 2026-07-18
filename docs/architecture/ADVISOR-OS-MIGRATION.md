# Advisor OS — Database migration instructions

## Prerequisites

1. Neon (or Postgres) connection string in `DATABASE_URL`
2. Node dependencies installed (`npm install`)

## Apply schema

Advisor OS tables live in `shared/schema.ts`. This project uses Drizzle push (no committed SQL migrations folder yet).

```bash
export DATABASE_URL="postgresql://..."
npm run db:push
```

Tables created:

- `visitors`
- `client_profiles`
- `chat_sessions`
- `chat_messages`
- `profile_events`
- `saved_items`
- `goals`
- `advisor_reviews`
- `attio_sync_jobs`
- `attio_sync_logs`
- `account_claim_tokens`
- `audit_logs`

Existing tables (`leads`, `chat_conversations`, `member_profiles`, …) are unchanged.

## Seed sample clients

```bash
npm run seed:advisory
```

Then open `/admin/clients` with `ADMIN_USER` / `ADMIN_PASS`.

## Attio

1. Create Housing Advisory custom object + attributes (see `docs/integrations/attio.md`)
2. Set env vars from `.env.example`
3. Confirm sync with a Decision Guide turn that includes an email, or use **Resync Attio** in admin

## Without DATABASE_URL

Local Express still runs. Advisory data uses an in-memory repository for the process lifetime (same pattern as MemStorage). Restart clears it.
