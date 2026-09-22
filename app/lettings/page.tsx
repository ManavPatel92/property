import type { Metadata } from "next";
import { ArrowRight, KeyRound, ShieldCheck, Users } from "lucide-react";
import { ContactBand, PageHero, PageShell, SectionHeading } from "@/components/site";

export const metadata: Metadata = { title: "Lettings" };

export default function LettingsPage() {
  return <PageShell><PageHero eyebrow="Lettings" title="Find the right way to let or rent." copy="Explore the steps involved in letting a property or finding your next home." image="/lettings-interior.webp" />
    <section className="section split-service"><SectionHeading eyebrow="For landlords" title="A clear route from listing to move-in" copy="Discuss your property, marketing plans, tenant enquiries and the handover process." /><div className="feature-list"><div><Users /><h3>Find a tenant</h3><p>Consider how enquiries and viewings will be managed.</p></div><div><ShieldCheck /><h3>Agree the details</h3><p>Review the proposed tenancy terms and practical arrangements.</p></div><div><KeyRound /><h3>Plan the move</h3><p>Prepare for a smooth transition into the property.</p></div></div></section>
    <section className="section owner-panel"><div><p className="eyebrow">For tenants</p><h2>Looking for a home?</h2></div><p>Discuss your requirements with the agency and check current property availability and terms before arranging a viewing. <a className="text-link light" href="/contact">Contact details <ArrowRight /></a></p></section><ContactBand /></PageShell>;
}
