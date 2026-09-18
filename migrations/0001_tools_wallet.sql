-- Pay-to-run Tools: wallets, credit ledger, runs, Stripe payment refs.
-- Apply with a DIRECT (non-pooled) DATABASE_URL, e.g.
--   psql "$DATABASE_URL_UNPOOLED" -f migrations/0001_tools_wallet.sql
-- or `npm run db:push` once DATABASE_URL is set (Drizzle schema includes these tables).

CREATE TABLE IF NOT EXISTS tool_wallets (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text,
  member_id text,
  email text,
  credits integer NOT NULL DEFAULT 0,
  free_livability_used boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS tool_wallets_visitor_uidx
  ON tool_wallets (visitor_id)
  WHERE visitor_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS tool_wallets_member_uidx
  ON tool_wallets (member_id)
  WHERE member_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS tool_credit_ledger (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id varchar NOT NULL REFERENCES tool_wallets(id),
  type text NOT NULL,
  credits integer NOT NULL,
  reason text,
  stripe_session_id text,
  stripe_payment_intent_id text,
  run_id varchar,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS tool_ledger_stripe_session_uidx
  ON tool_credit_ledger (stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS tool_ledger_wallet_idx
  ON tool_credit_ledger (wallet_id, created_at DESC);

CREATE TABLE IF NOT EXISTS tool_runs (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id varchar NOT NULL REFERENCES tool_wallets(id),
  tool_slug text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  address text,
  listing_url text,
  image_count integer NOT NULL DEFAULT 0,
  input_metadata text,
  result_json text,
  charged_credits integer NOT NULL DEFAULT 0,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tool_runs_wallet_idx
  ON tool_runs (wallet_id, created_at DESC);

CREATE TABLE IF NOT EXISTS tool_payments (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id varchar NOT NULL REFERENCES tool_wallets(id),
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  amount_cents integer NOT NULL,
  credits integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
