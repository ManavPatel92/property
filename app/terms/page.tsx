import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Use" };

const sections: LegalSection[] = [
  { title: "1. About us", paragraphs: ["This website is operated by Executive Lets Ltd, registered in England and Wales, company number [COMPANY NUMBER], registered office [REGISTERED OFFICE ADDRESS]. By using the website you agree to these terms."] },
  { title: "2. Property information", paragraphs: ["Property details, prices, photographs, floorplans and measurements are guidance only, based on information supplied by landlords and sellers. They do not form part of an offer or contract and may change without notice. Check important details with us and take independent advice before committing."] },
  { title: "3. General information", paragraphs: ["Website content is general information, not legal, financial, tax or mortgage advice. [CONFIRM WHETHER MORTGAGE ADVICE OR REFERRALS ARE PROVIDED.]"] },
  { title: "4. Liability and intellectual property", paragraphs: ["Nothing excludes liability that cannot legally be excluded. Subject to that, we are not responsible for unforeseeable losses or interruptions. The website, design, text, logo and content belong to us or our licensors and must not be copied, scraped or republished without permission."] },
  { title: "5. Enquiries and third-party links", paragraphs: ["A website enquiry does not create a contract or instruction for us to act. We are not responsible for third-party websites or embedded content. Personal data is handled under our Privacy Policy and Cookie Notice."] },
  { title: "6. Governing law and contact", paragraphs: ["These terms are governed by the law of England and Wales. Contact: Executive Lets Ltd, [TRADING ADDRESS], [EMAIL ADDRESS], [TELEPHONE NUMBER]."] },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms of Use and Disclaimer" sections={sections} />;
}
