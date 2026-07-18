/**
 * Bootstrap Agent Kammer Attio workspace via API.
 * Usage: npx tsx scripts/setup-attio.ts
 */
import "../server/load-env";

const BASE = "https://api.attio.com/v2";

type Json = Record<string, unknown>;

async function attio<T = Json>(
  method: string,
  path: string,
  body?: unknown,
): Promise<{ ok: boolean; status: number; data: T }> {
  const key = process.env.ATTIO_API_KEY?.trim();
  if (!key) throw new Error("ATTIO_API_KEY missing");
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: T;
  try {
    data = text ? (JSON.parse(text) as T) : ({} as T);
  } catch {
    data = { raw: text } as T;
  }
  return { ok: res.ok, status: res.status, data };
}

async function ensureObject(slug: string, singular: string, plural: string) {
  const listed = await attio<{ data: Array<{ api_slug: string; id: { object_id: string } }> }>(
    "GET",
    "/objects",
  );
  if (!listed.ok) {
    console.error("Failed to list objects", listed.status, listed.data);
    throw new Error("Cannot list Attio objects — check API key scopes");
  }
  const existing = listed.data.data?.find((o) => o.api_slug === slug);
  if (existing) {
    console.log(`Object exists: ${slug} (${existing.id.object_id})`);
    return existing;
  }
  const created = await attio<{ data: { api_slug: string; id: { object_id: string } } }>(
    "POST",
    "/objects",
    {
      data: {
        api_slug: slug,
        singular_noun: singular,
        plural_noun: plural,
      },
    },
  );
  if (!created.ok) {
    // Race / reserved slug: re-list and reuse if present
    const again = await attio<{ data: Array<{ api_slug: string; id: { object_id: string } }> }>(
      "GET",
      "/objects",
    );
    const found = again.data.data?.find((o) => o.api_slug === slug);
    if (found) {
      console.log(`Object exists after conflict: ${slug}`);
      return found;
    }
    console.error(`Create object ${slug} failed`, created.status, created.data);
    throw new Error(`Failed to create object ${slug}`);
  }
  console.log(`Created object: ${slug} (${created.data.data.id.object_id})`);
  return created.data.data;
}

async function listAttributes(object: string) {
  const res = await attio<{ data: Array<{ api_slug: string; type: string; title: string }> }>(
    "GET",
    `/objects/${encodeURIComponent(object)}/attributes`,
  );
  if (!res.ok) {
    console.warn(`Could not list attributes for ${object}`, res.status, res.data);
    return [];
  }
  return res.data.data || [];
}

async function ensureAttribute(
  object: string,
  attr: {
    title: string;
    api_slug: string;
    type: string;
    description?: string;
    is_required?: boolean;
    is_unique?: boolean;
    is_multiselect?: boolean;
    config?: Json;
  },
) {
  const existing = await listAttributes(object);
  if (existing.some((a) => a.api_slug === attr.api_slug)) {
    console.log(`  attr exists: ${object}.${attr.api_slug}`);
    return;
  }
  const payload: Json = {
    data: {
      title: attr.title,
      description: attr.description || "",
      api_slug: attr.api_slug,
      type: attr.type,
      is_required: attr.is_required ?? false,
      is_unique: attr.is_unique ?? false,
      is_multiselect: attr.is_multiselect ?? false,
      config: attr.config || {},
    },
  };
  const created = await attio("POST", `/objects/${encodeURIComponent(object)}/attributes`, payload);
  if (!created.ok) {
    console.warn(`  attr FAILED ${object}.${attr.api_slug}`, created.status, JSON.stringify(created.data).slice(0, 400));
    return;
  }
  console.log(`  attr created: ${object}.${attr.api_slug}`);
}

async function ensureSelectOptions(object: string, attrSlug: string, options: string[]) {
  // Options are often created with the attribute; if select already exists, try appending
  for (const option of options) {
    const res = await attio(
      "POST",
      `/objects/${encodeURIComponent(object)}/attributes/${encodeURIComponent(attrSlug)}/options`,
      { data: { title: option } },
    );
    if (res.ok) console.log(`    option: ${attrSlug} → ${option}`);
  }
}

async function ensureList(apiSlug: string, name: string, parentObject: string) {
  const lists = await attio<{ data: Array<{ api_slug: string; id: { list_id: string } }> }>(
    "GET",
    "/lists",
  );
  const existing = lists.ok
    ? lists.data.data?.find((l) => l.api_slug === apiSlug)
    : undefined;
  if (existing) {
    console.log(`List exists: ${apiSlug}`);
    return existing;
  }
  const created = await attio<{ data: { api_slug: string; id: { list_id: string } } }>(
    "POST",
    "/lists",
    {
      data: {
        name,
        api_slug: apiSlug,
        parent_object: parentObject,
        workspace_access: "full-access",
        workspace_member_access: [],
      },
    },
  );
  if (!created.ok) {
    console.warn(`List create failed ${apiSlug}`, created.status, JSON.stringify(created.data).slice(0, 500));
    return null;
  }
  console.log(`Created list: ${apiSlug}`);
  return created.data.data;
}

async function ensureListStatusAttribute(listSlug: string, options: string[]) {
  const attrs = await attio<{ data: Array<{ api_slug: string; type: string }> }>(
    "GET",
    `/lists/${encodeURIComponent(listSlug)}/attributes`,
  );
  const stageAttr = attrs.ok
    ? attrs.data.data?.find((a) => a.api_slug === "stage")
    : undefined;
  if (!stageAttr) {
    const created = await attio("POST", `/lists/${encodeURIComponent(listSlug)}/attributes`, {
      data: {
        title: "Stage",
        api_slug: "stage",
        type: "status",
        description: "Pipeline stage",
        is_required: false,
        is_unique: false,
        is_multiselect: false,
        config: {},
      },
    });
    if (!created.ok) {
      console.warn(`  list stage attr failed for ${listSlug}`, created.status, created.data);
      return;
    }
    console.log(`  list stage attr created for ${listSlug}`);
  } else {
    console.log(`  list stage attr exists for ${listSlug}`);
  }

  const existing = await attio<{ data: Array<{ title: string }> }>(
    "GET",
    `/lists/${encodeURIComponent(listSlug)}/attributes/stage/statuses`,
  );
  const have = new Set(
    (existing.ok ? existing.data.data || [] : []).map((s) => s.title.toLowerCase()),
  );
  for (const option of options) {
    if (have.has(option.toLowerCase())) continue;
    const created = await attio(
      "POST",
      `/lists/${encodeURIComponent(listSlug)}/attributes/stage/statuses`,
      { data: { title: option } },
    );
    if (!created.ok) {
      console.warn(`  status "${option}" failed on ${listSlug}`, created.status);
    } else {
      console.log(`  + stage: ${option}`);
    }
  }
}

/** Exact labels shared with website + admin (see shared/client-profile.ts). */
const LIFECYCLE_OPTIONS = [
  "New Signal",
  "Engaged",
  "Profiled",
  "Qualified",
  "Call Ready",
  "Long-Term Nurture",
  "Advisory Client",
  "Transaction Ready",
  "Inactive",
];

const LEAD_PIPELINE_STAGES = [
  "New Signal",
  "Engaged",
  "Profiled",
  "Qualified",
  "Call Ready",
  "Long-Term Nurture",
];

const CLIENT_PIPELINE_STAGES = [
  "Advisory Client",
  "Transaction Ready",
  "Inactive",
];

async function main() {
  console.log("=== Attio workspace bootstrap ===\n");

  // 1) Inspect existing objects
  const objects = await attio<{ data: Array<{ api_slug: string; singular_noun: string }> }>(
    "GET",
    "/objects",
  );
  if (!objects.ok) {
    console.error("API key cannot read objects. Scopes needed: object_configuration:read-write, record_permission:read-write, list_configuration:read-write");
    console.error(objects.status, objects.data);
    process.exit(1);
  }
  console.log(
    "Existing objects:",
    objects.data.data?.map((o) => o.api_slug).join(", "),
  );

  // 2) People — contact + light ops only (housing chart lives on Housing Advisory)
  console.log("\n— People attributes (ops only) —");
  await ensureAttribute("people", {
    title: "Visitor ID",
    api_slug: "website_visitor_id",
    type: "text",
    is_unique: false,
  });
  await ensureAttribute("people", {
    title: "Lead source",
    api_slug: "lead_source",
    type: "text",
  });
  await ensureAttribute("people", {
    title: "Lifecycle stage",
    api_slug: "lifecycle_stage",
    type: "select",
  });
  await ensureSelectOptions("people", "lifecycle_stage", LIFECYCLE_OPTIONS);
  await ensureAttribute("people", {
    title: "Lead score",
    api_slug: "lead_score",
    type: "number",
  });
  await ensureAttribute("people", {
    title: "Timeline",
    api_slug: "timeline",
    type: "text",
  });
  await ensureAttribute("people", {
    title: "Assigned advisor",
    api_slug: "assigned_advisor",
    type: "text",
  });
  await ensureAttribute("people", {
    title: "Last active",
    api_slug: "last_active_date",
    type: "date",
  });
  await ensureAttribute("people", {
    title: "Next action",
    api_slug: "next_action",
    type: "text",
  });
  await ensureAttribute("people", {
    title: "Attio sync status",
    api_slug: "attio_sync_status",
    type: "select",
  });
  await ensureSelectOptions("people", "attio_sync_status", ["Pending", "Synced", "Error"]);

  // 3) Housing Advisory object (chart)
  console.log("\n— Housing Advisory object —");
  const housing = await ensureObject("housing_advisory", "Housing Advisory", "Housing Advisories");
  const housingSlug = housing.api_slug || "housing_advisory";

  const housingAttrs: Array<Parameters<typeof ensureAttribute>[1]> = [
    { title: "Client", api_slug: "client", type: "record-reference", config: { record_reference: { allowed_objects: ["people"] } } },
    { title: "Situation", api_slug: "situation", type: "text" },
    { title: "Desired outcome", api_slug: "desired_outcome", type: "text" },
    { title: "Current housing", api_slug: "current_housing_situation", type: "text" },
    { title: "Current location", api_slug: "current_location", type: "text" },
    { title: "Target locations", api_slug: "target_locations", type: "text" },
    { title: "Property type", api_slug: "property_type", type: "text" },
    { title: "Budget range", api_slug: "budget_range", type: "text" },
    { title: "Timeline", api_slug: "timeline", type: "text" },
    { title: "Financing status", api_slug: "financing_status", type: "text" },
    { title: "Credit readiness", api_slug: "credit_readiness", type: "text" },
    { title: "Down payment readiness", api_slug: "down_payment_readiness", type: "text" },
    { title: "Constraints", api_slug: "housing_constraints", type: "text" },
    { title: "Trade-offs", api_slug: "tradeoffs", type: "text" },
    { title: "Dealbreakers", api_slug: "dealbreakers", type: "text" },
    { title: "Readiness score", api_slug: "readiness_score", type: "number" },
    { title: "Belonging score", api_slug: "belonging_score", type: "number" },
    { title: "Advisor summary", api_slug: "last_advisor_summary", type: "text" },
    { title: "Last AI summary", api_slug: "last_ai_summary", type: "text" },
    { title: "Next recommendation", api_slug: "recommended_next_action", type: "text" },
    { title: "Next review date", api_slug: "next_review_date", type: "date" },
    { title: "Membership status", api_slug: "advisory_membership_status", type: "select" },
    { title: "Assigned advisor", api_slug: "assigned_advisor", type: "text" },
    { title: "Assigned partner", api_slug: "assigned_partner", type: "text" },
    { title: "Last contact date", api_slug: "last_contact_date", type: "date" },
    { title: "Lifecycle stage", api_slug: "lifecycle_stage", type: "select" },
    { title: "Website visitor ID", api_slug: "website_visitor_id", type: "text", is_unique: true },
    { title: "Website profile ID", api_slug: "website_profile_id", type: "text" },
  ];

  for (const attr of housingAttrs) {
    await ensureAttribute(housingSlug, attr);
  }
  await ensureSelectOptions(housingSlug, "lifecycle_stage", LIFECYCLE_OPTIONS);
  await ensureSelectOptions(housingSlug, "advisory_membership_status", [
    "None",
    "Exploring",
    "Active",
    "Paused",
    "Former",
  ]);

  // 4) Transactions object — deal file when buy/sell begins (slug "deals" is reserved/conflicting)
  console.log("\n— Transactions object —");
  const listedAgain = await attio<{ data: Array<{ api_slug: string; id: { object_id: string } }> }>(
    "GET",
    "/objects",
  );
  console.log(
    "Objects now:",
    listedAgain.data.data?.map((o) => o.api_slug).join(", "),
  );
  const transactions = await ensureObject("transactions", "Transaction", "Transactions");
  const transactionsSlug = transactions.api_slug || "transactions";
  for (const attr of [
    { title: "Client", api_slug: "client", type: "record-reference", config: { record_reference: { allowed_objects: ["people"] } } },
    { title: "Housing chart", api_slug: "housing_chart", type: "record-reference", config: { record_reference: { allowed_objects: [housingSlug] } } },
    { title: "Deal type", api_slug: "deal_type", type: "select" },
    { title: "Property address", api_slug: "property_address", type: "text" },
    { title: "Asking price", api_slug: "asking_price", type: "number" },
    { title: "Offer price", api_slug: "offer_price", type: "number" },
    { title: "Deal stage", api_slug: "deal_stage", type: "select" },
    { title: "Close date", api_slug: "close_date", type: "date" },
    { title: "Brokerage partner", api_slug: "brokerage_partner", type: "text" },
    { title: "Notes", api_slug: "notes", type: "text" },
  ] as Array<Parameters<typeof ensureAttribute>[1]>) {
    await ensureAttribute(transactionsSlug, attr);
  }
  await ensureSelectOptions(transactionsSlug, "deal_type", ["Purchase", "Sale", "Buy-Sell", "Lease", "Advisory only"]);
  await ensureSelectOptions(transactionsSlug, "deal_stage", [
    "Preparing",
    "Searching",
    "Touring",
    "Offer",
    "Under contract",
    "Due diligence",
    "Closed",
    "Lost",
  ]);

  // 5) Lists = process boards (leads vs current clients vs transactions)
  console.log("\n— Lists (pipelines) —");
  await ensureList("lead_pipeline", "Lead Pipeline", "people");
  await ensureListStatusAttribute("lead_pipeline", LEAD_PIPELINE_STAGES);

  await ensureList("client_pipeline", "Current Clients", "people");
  await ensureListStatusAttribute("client_pipeline", CLIENT_PIPELINE_STAGES);

  await ensureList("deal_pipeline", "Active Transactions", transactionsSlug);
  await ensureListStatusAttribute("deal_pipeline", [
    "Preparing",
    "Searching",
    "Touring",
    "Offer",
    "Under contract",
    "Due diligence",
    "Closed",
    "Lost",
  ]);

  // Workspace id hint from a person query if available
  const peopleSample = await attio<{ data: Array<{ id: { workspace_id: string } }> }>(
    "POST",
    "/objects/people/records/query",
    { limit: 1 },
  );
  const workspaceId =
    peopleSample.ok && peopleSample.data.data?.[0]?.id?.workspace_id
      ? peopleSample.data.data[0].id.workspace_id
      : process.env.ATTIO_WORKSPACE_ID || "";

  console.log("\n=== Done ===");
  console.log("Add these to .env.local:\n");
  console.log(`ATTIO_PEOPLE_OBJECT_ID=people`);
  console.log(`ATTIO_HOUSING_RECORD_OBJECT_ID=${housingSlug}`);
  console.log(`ATTIO_TRANSACTIONS_OBJECT_ID=${transactionsSlug}`);
  if (workspaceId) console.log(`ATTIO_WORKSPACE_ID=${workspaceId}`);
  console.log("\nArchitecture:");
  console.log("  People             = identity (everyone)");
  console.log("  Housing Advisory   = ongoing client chart (one per client)");
  console.log("  Lead Pipeline      = pre-client board (New Signal → Call Ready)");
  console.log("  Current Clients    = advisory / active relationship board");
  console.log("  Transactions       = deal file when they buy/sell");
  console.log("  Active Transactions list = deal board");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
