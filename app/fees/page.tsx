import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = { title: "Fees" };

const sections: LegalSection[] = [
  { title: "Our regulatory information", paragraphs: ["Executive Lets Ltd is a member of [THE PROPERTY OMBUDSMAN / THE PROPERTY REDRESS SCHEME], membership no. [NUMBER]. Client money protection: [SCHEME AND MEMBERSHIP NUMBER / WE DO NOT HOLD CLIENT MONEY]. All prices include VAT at [VAT RATE] unless stated otherwise."] },
  { title: "Landlords — lettings and management", items: ["Tenant find: [X]% / £[AMOUNT] inc. VAT. Covers [SERVICES].", "Rent collection: [X]% / £[AMOUNT] inc. VAT per month. Covers [SERVICES].", "Full management: [X]% / £[AMOUNT] inc. VAT per month. Covers [SERVICES].", "Renewal, inventory, safety certificates, repairs, tax administration and withdrawal: [LIST EACH FEE, VAT AND WHAT IT COVERS]."] },
  { title: "Sellers — sales", items: ["Sole agency: [X]% / £[AMOUNT] inc. VAT on a sale at £[EXAMPLE PRICE], payable on [LEGAL COMPLETION].", "Multi-agency: [X]% / £[AMOUNT] inc. VAT on a sale at £[EXAMPLE PRICE], payable on [LEGAL COMPLETION].", "Other costs or aborted sale: [DETAILS AND PRICES]."] },
  { title: "Tenants and applicants", paragraphs: ["We do not charge tenants except payments permitted by the Tenant Fees Act 2019, including rent, permitted deposits, approved changes or early termination, utilities and reasonable evidenced default costs. We do not charge for referencing, inventories, check-in, tenancy agreements or renewals."] },
  { title: "Referral fees", paragraphs: ["[WE DO NOT RECEIVE REFERRAL FEES / LIST EACH RECOMMENDED PROVIDER, FCA NUMBER AND FEE]. You are never obliged to use a recommended provider."] },
  { title: "Complaints and redress", paragraphs: ["See our Complaints Procedure. Unresolved complaints may be referred to [REDRESS SCHEME AND CONTACT DETAILS]."] },
];

export default function FeesPage() {
  return <LegalPage eyebrow="Legal" title="Fees" sections={sections} />;
}
