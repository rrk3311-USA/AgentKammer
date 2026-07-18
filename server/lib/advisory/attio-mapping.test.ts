import { describe, expect, it } from "vitest";
import {
  mapLifecycleToAttio,
  mapLifecycleToMembershipStatus,
  mapProfileToAttioHousingValues,
  mapProfileToAttioPersonValues,
  normalizeEmail,
  pruneAttioValues,
} from "./attio-mapping";
import { attioPeopleListForStage } from "@shared/client-profile";

describe("normalizeEmail", () => {
  it("normalizes and rejects invalid emails", () => {
    expect(normalizeEmail("  Alex@Example.COM ")).toBe("alex@example.com");
    expect(normalizeEmail("not-an-email")).toBeNull();
  });
});

describe("mapProfileToAttioPersonValues", () => {
  it("maps only contact + operational People fields", () => {
    const values = pruneAttioValues(
      mapProfileToAttioPersonValues(
        {
          visitorId: "akv_test",
          email: "Alex@Example.COM",
          firstName: "Alex",
          lastName: "Rivera",
          phone: "2125550199",
          timeline: "3-6 months",
          targetLocations: ["Brooklyn"],
          leadScore: 72,
          lifecycleStage: "qualified",
          nextRecommendedAction: "Schedule strategy call",
          assignedAdvisor: "Raphael Kammer",
          lastActiveAt: "2026-07-17T12:00:00.000Z",
          createdAt: "2026-07-01T12:00:00.000Z",
          updatedAt: "2026-07-17T12:00:00.000Z",
        },
        { syncStatus: "Synced" },
      ),
    );

    expect(values.email_addresses).toEqual([{ email_address: "alex@example.com" }]);
    expect(values.name?.[0]).toMatchObject({ first_name: "Alex", last_name: "Rivera" });
    expect(values.lead_score).toEqual([{ value: 72 }]);
    expect(values.lifecycle_stage).toEqual([{ option: "Qualified" }]);
    expect(values.next_action).toEqual([{ value: "Schedule strategy call" }]);
    expect(values.assigned_advisor).toEqual([{ value: "Raphael Kammer" }]);
    expect(values.attio_sync_status).toEqual([{ option: "Synced" }]);
    expect(values).not.toHaveProperty("preferred_location");
    expect(values).not.toHaveProperty("budget_range");
    expect(values).not.toHaveProperty("client_type");
  });
});

describe("mapProfileToAttioHousingValues", () => {
  it("links person and maps housing advisory chart fields", () => {
    const values = pruneAttioValues(
      mapProfileToAttioHousingValues(
        {
          visitorId: "akv_test",
          situation: "Considering a primary residence change",
          currentHousing: "Renter in Manhattan",
          desiredOutcome: "Simpler primary home",
          constraints: ["Elevator building", "Pet friendly"],
          lifecycleStage: "profiled",
          lastActiveAt: "2026-07-17T12:00:00.000Z",
          createdAt: "2026-07-01T12:00:00.000Z",
          updatedAt: "2026-07-17T12:00:00.000Z",
        },
        { personRecordId: "person-1", profileId: "profile-1" },
      ),
    );

    expect(values.client).toEqual([{ target_object: "people", target_record_id: "person-1" }]);
    expect(values.situation).toEqual([{ value: "Considering a primary residence change" }]);
    expect(values.desired_outcome).toEqual([{ value: "Simpler primary home" }]);
    expect(values.housing_constraints).toEqual([{ value: "Elevator building; Pet friendly" }]);
    expect(values.website_profile_id).toEqual([{ value: "profile-1" }]);
    expect(values.lifecycle_stage).toEqual([{ option: "Profiled" }]);
  });
});

describe("stage sync", () => {
  it("maps website stages to Attio labels exactly", () => {
    expect(mapLifecycleToAttio("anonymous")).toBe("New Signal");
    expect(mapLifecycleToAttio("call_ready")).toBe("Call Ready");
    expect(mapLifecycleToAttio("long_term_nurture")).toBe("Long-Term Nurture");
    expect(mapLifecycleToAttio("advisory_client")).toBe("Advisory Client");
    expect(mapLifecycleToAttio("active_client")).toBe("Transaction Ready");
    expect(mapLifecycleToAttio("closed")).toBe("Advisory Client");
    expect(mapLifecycleToAttio("inactive")).toBe("Inactive");
  });

  it("routes Advisory Client to Current Clients list", () => {
    expect(attioPeopleListForStage("Qualified")).toBe("lead");
    expect(attioPeopleListForStage("Long-Term Nurture")).toBe("lead");
    expect(attioPeopleListForStage("Advisory Client")).toBe("client");
    expect(attioPeopleListForStage("Transaction Ready")).toBe("client");
    expect(attioPeopleListForStage("Inactive")).toBe("client");
  });

  it("derives membership from lifecycle", () => {
    expect(mapLifecycleToMembershipStatus("engaged")).toBe("None");
    expect(mapLifecycleToMembershipStatus("qualified")).toBe("Exploring");
    expect(mapLifecycleToMembershipStatus("advisory_client")).toBe("Active");
    expect(mapLifecycleToMembershipStatus("closed")).toBe("Active");
    expect(mapLifecycleToMembershipStatus("inactive")).toBe("Former");
  });
});
