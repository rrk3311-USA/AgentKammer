-- Curation IQ: Suggested (IQ) → Selected (Raphi) report queue
-- Apply via `npm run db:push` (Drizzle) or run this file against Neon.

CREATE TABLE IF NOT EXISTS curation_batches (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  period_date timestamp NOT NULL,
  notes text,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS curation_suggestions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id varchar NOT NULL,
  address text NOT NULL,
  ask_price text,
  band text NOT NULL,
  persona text,
  notes text,
  source_url text NOT NULL,
  raw_payload text,
  rank integer NOT NULL DEFAULT 1,
  captured_at timestamp NOT NULL DEFAULT now(),
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS curation_selections (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  suggestion_id varchar,
  address text NOT NULL,
  ask_price text,
  band text NOT NULL,
  persona text,
  notes text,
  source_url text NOT NULL,
  on_sale boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  raphi_replaced boolean NOT NULL DEFAULT false,
  replaced_suggestion_id varchar,
  report_status text NOT NULL DEFAULT 'queued',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS curation_suggestions_batch_idx ON curation_suggestions (batch_id);
CREATE INDEX IF NOT EXISTS curation_selections_on_sale_idx ON curation_selections (on_sale);
CREATE INDEX IF NOT EXISTS curation_selections_replaced_idx ON curation_selections (raphi_replaced);
