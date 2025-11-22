/**
 * Module Storage for Home Page Sections
 * Archived sections removed from homepage on Nov 22, 2025
 * Can be imported and used again if needed in the future
 */

import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { LuxuryMoodBoard } from "@/components/LuxuryMoodBoard";

/**
 * Render archived sections - import and use as needed
 * Example: <ArchivedHomeSections />
 */
export function ArchivedHomeSections() {
  return (
    <>
      <ProcessFlowSection />
      <LuxuryMoodBoard />
    </>
  );
}

/**
 * Individual exports for selective use
 */
export { ProcessFlowSection };
export { LuxuryMoodBoard };
