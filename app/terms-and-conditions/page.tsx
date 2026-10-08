import type { Metadata } from "next";
import { PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return <PageShell>
    <section className="legal-hero"><p className="eyebrow">Website information</p><h1>Terms &amp; Conditions</h1><p>Important information about using this website and the property details it contains.</p></section>
    <article className="legal-content">
      <section><h2>Using this website</h2><p>By using this website, you agree to use it lawfully and not to interfere with its operation, security or availability. Website content may be updated, corrected or withdrawn without notice.</p></section>
      <section><h2>Property particulars</h2><p>Property descriptions, photographs, dimensions, prices, availability and other particulars are provided as a general guide. They do not form part of an offer or contract and should be independently checked before you make a decision or incur costs.</p></section>
      <section><h2>Availability and enquiries</h2><p>Properties may be withdrawn, let, sold or changed at any time. Please contact Executive Lets Ltd to confirm current availability and arrange any appropriate checks or viewings.</p></section>
      <section><h2>Third-party services</h2><p>References to partners, professional bodies or external services do not make Executive Lets Ltd responsible for third-party websites, content or decisions. Their own terms and privacy practices will apply.</p></section>
      <section><h2>Intellectual property</h2><p>Unless stated otherwise, the website design, text and original content belong to Executive Lets Ltd. They may not be reproduced for commercial use without permission.</p></section>
      <section><h2>Liability</h2><p>Executive Lets Ltd aims to keep this website accurate and available but cannot guarantee that every item will always be complete, current or error-free. Nothing on this website is legal, financial, investment or surveying advice.</p></section>
      <section><h2>Contact</h2><p>Questions about these website terms can be raised by calling <a href="tel:+447535317777">07535 317777</a> or using the contact page.</p></section>
      <p className="legal-note">These website terms are a general starting point and should be reviewed by the business or its legal adviser before final commercial use.</p>
    </article>
  </PageShell>;
}
