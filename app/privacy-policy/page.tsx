import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections: LegalSection[] = [
  {
    title: "1. Who we are",
    paragraphs: [
      "Executive Lets Ltd (\"we\", \"us\", \"our\") is registered in England and Wales, company number [COMPANY NUMBER], with registered office at [REGISTERED OFFICE ADDRESS]. We provide lettings, sales and property management services.",
      "We are the controller of the personal data described in this policy. Contact us at [PRIVACY EMAIL ADDRESS], [TELEPHONE NUMBER], or Data Protection, Executive Lets Ltd, [ADDRESS]. We are registered with the ICO under number [ICO REGISTRATION NUMBER].",
    ],
  },
  {
    title: "2. What personal data we collect",
    paragraphs: ["Depending on how you deal with us, we may collect your name, contact details, property information, identity and right-to-rent documents, financial and employment information, references, viewing records, tenancy records, communications and technical website data."],
  },
  {
    title: "3. How we use your data",
    items: [
      "To respond to enquiries, arrange viewings and provide lettings, sales and management services.",
      "To carry out identity, right-to-rent, anti-money-laundering, referencing and affordability checks.",
      "To manage complaints, disputes, insurance, debt recovery, legal claims and regulatory obligations.",
      "To run, secure and improve our website and prevent fraud.",
      "To send marketing where you have consented or where the law permits it. You can opt out at any time.",
    ],
  },
  {
    title: "4. Who we share your data with",
    paragraphs: ["Where necessary, we share data with landlords, tenants, buyers, sellers, referencing and identity providers, deposit schemes, contractors, insurers, solicitors, accountants, hosting and email providers, regulators and public authorities. We do not sell personal data."],
  },
  {
    title: "5. Retention and international transfers",
    paragraphs: ["We keep information only as long as needed. Our usual periods are [RETENTION PERIOD FOR ENQUIRIES], [RETENTION PERIOD FOR CLIENT RECORDS], five years for anti-money-laundering records and [RETENTION PERIOD FOR COMPLAINTS]. Some providers may process data outside the UK; [ADD THE RELEVANT SAFEGUARDS AND PROVIDER DETAILS]."],
  },
  {
    title: "6. Your rights",
    paragraphs: ["You may request access, correction, erasure, restriction, portability, or object to processing based on legitimate interests or direct marketing. Contact [PRIVACY EMAIL ADDRESS]. We may need to verify your identity and normally respond within one month."],
  },
  {
    title: "7. Complaints and cookies",
    paragraphs: ["Contact us first about a data protection complaint. You may also contact the Information Commissioner’s Office at www.ico.org.uk. Our use of cookies and local storage is explained in the Cookie and Storage Notice."],
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" sections={sections} />;
}
