import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Accessibility Statement" };

const sections: LegalSection[] = [
  { title: "Our commitment", paragraphs: ["Executive Lets Ltd wants everyone to be able to use this website. We aim to meet WCAG 2.2 level AA and take our duties under the Equality Act 2010 seriously."] },
  { title: "How accessible is this website?", paragraphs: ["[CHOOSE ONE: WE HAVE TESTED THIS WEBSITE AND BELIEVE IT MEETS WCAG 2.2 AA / THIS WEBSITE IS PARTIALLY COMPLIANT BECAUSE OF THE LIMITATIONS BELOW / WE HAVE NOT YET FORMALLY TESTED IT BUT ARE WORKING TOWARDS COMPLIANCE].", "Known limitations: [LIST CONFIRMED LIMITATIONS OR WRITE NONE]."] },
  { title: "Feedback and contact", paragraphs: ["If you have difficulty using any part of this website, contact [ACCESSIBILITY EMAIL ADDRESS], [TELEPHONE NUMBER] or [POSTAL ADDRESS]. Tell us which page or feature caused difficulty and what support you need. We aim to respond within [RESPONSE TIME]."] },
  { title: "Enforcement procedure", paragraphs: ["If you are not satisfied with our response, contact [RELEVANT ENFORCEMENT BODY OR OMBUDSMAN DETAILS]. This statement was prepared on [DATE] and reviewed on [DATE]."] },
];

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Legal" title="Accessibility Statement" sections={sections} />;
}
