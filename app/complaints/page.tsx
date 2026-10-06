import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Complaints Procedure" };

const sections: LegalSection[] = [
  { title: "How to complain", paragraphs: ["Contact us in writing or by telephone. Include your name, contact details, property address, what went wrong and what you would like us to do.", "Email: [COMPLAINTS EMAIL ADDRESS]. Post: Complaints, Executive Lets Ltd, [ADDRESS]. Telephone: [TELEPHONE NUMBER]. Your complaint will be handled by [NAME / ROLE]."] },
  { title: "What happens next", items: ["Acknowledgement within [3] working days.", "Stage 1 investigation and written response within [15] working days.", "Stage 2 review on request within [14] days, with a final response within [15] working days.", "If unresolved after [8 WEEKS], refer the complaint to [THE PROPERTY OMBUDSMAN / THE PROPERTY REDRESS SCHEME], subject to its rules and time limits."] },
  { title: "Data protection complaints", paragraphs: ["For complaints about personal data, see our Privacy Policy. You may also contact the ICO at www.ico.org.uk or on 0303 123 1113."] },
  { title: "Record keeping", paragraphs: ["We keep complaint records for [6 YEARS] and use them to improve our service."] },
];

export default function ComplaintsPage() {
  return <LegalPage eyebrow="Legal" title="Complaints Procedure" sections={sections} />;
}
