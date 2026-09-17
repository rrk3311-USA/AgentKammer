-- Get Qualified submissions — own table, site Neon/Postgres only.
-- Do not use contact_submissions for this flow.
-- Hub sub-status (get_qualified / session_booked / strategy_session_held)
-- lives here and is not one of the six public Hub trophies.

CREATE TABLE IF NOT EXISTS get_qualified_submissions (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  budget_lane text NOT NULL,
  call_purpose text NOT NULL,
  notes text,
  source text NOT NULL DEFAULT 'site',
  route text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  process_pdf_sent boolean NOT NULL DEFAULT false,
  hub_member_id varchar,
  session_booked boolean NOT NULL DEFAULT false,
  strategy_session_held boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS get_qualified_submissions_email_idx
  ON get_qualified_submissions (lower(email));

CREATE INDEX IF NOT EXISTS get_qualified_submissions_created_at_idx
  ON get_qualified_submissions (created_at DESC);
