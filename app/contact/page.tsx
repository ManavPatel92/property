import type { Metadata } from "next";
import { PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <PageShell><section className="contact-hero contact-hero-simple"><div><p className="eyebrow">Contact Executive Lets Ltd</p><h1>Let’s talk about your property.</h1><p>For lettings, sales or management enquiries, speak with the Executive Lets Ltd team.</p></div><div className="contact-pending"><p className="eyebrow">Contact details</p><h2>Direct details coming soon.</h2><p>The business phone number and email address will appear here once confirmed.</p></div></section></PageShell>;
}
