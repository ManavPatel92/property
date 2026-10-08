import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { ContactBand, PageHero, PageShell, PartnerLogo, SectionHeading } from "@/components/site";
import { partners } from "@/lib/site-data";

export const metadata: Metadata = { title: "Partners & Memberships" };

export default function PartnersPage() {
  return <PageShell>
    <PageHero eyebrow="Partners" title="Professional standards and trusted support." copy="Our industry memberships and service partners support a professional, responsible approach to property." />
    <section className="section partners-page">
      <SectionHeading eyebrow="Memberships & partners" title="Working with recognised property organisations" copy="Executive Lets Ltd has confirmed its association with the organisations listed below." />
      <div className="partner-detail-grid">{partners.map((partner) => <article key={partner.short}><div className="partner-mark"><PartnerLogo partner={partner} /></div><h3>{partner.name}</h3><p><CheckCircle2 /> Confirmed partner or membership</p></article>)}</div>
    </section>
    <section className="section partner-assurance"><ShieldCheck /><div><p className="eyebrow">Professional confidence</p><h2>Clear standards for landlords and tenants.</h2><p>Ask the team if you would like more information about a particular membership, protection scheme or service partner.</p></div></section>
    <ContactBand />
  </PageShell>;
}
