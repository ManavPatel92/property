import type { Metadata } from "next";
import { ArrowRight, Building2, Globe2, Handshake, MapPin } from "lucide-react";
import { ContactBand, PageHero, PageShell, SectionHeading } from "@/components/site";

export const metadata: Metadata = { title: "International Property" };

export default function InternationalPage() {
  const services = [
    [Globe2, "International reach", "Start a conversation about property opportunities beyond the UK."],
    [MapPin, "Location-led search", "Share the destinations, lifestyle and investment priorities that matter to you."],
    [Building2, "Residential opportunities", "Explore homes and developments that suit your plans and timescale."],
    [Handshake, "Personal introductions", "Receive a clear handover to the appropriate property contact where available."],
  ] as const;

  return <PageShell>
    <PageHero eyebrow="International" title="Property opportunities without borders." copy="Tell us where you are looking and what matters most. We will help you begin the right property conversation." image="/hero-london.webp">
      <a className="button button-copper" href="/contact">Discuss your search <ArrowRight /></a>
    </PageHero>
    <section className="section">
      <SectionHeading eyebrow="Your international search" title="A considered starting point for your next move" copy="From lifestyle purchases to investment enquiries, begin with your preferred location, budget and timeframe." />
      <div className="international-grid">{services.map(([Icon, title, copy]) => <div key={title}><Icon /><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </section>
    <section className="section owner-panel"><div><p className="eyebrow">Start the conversation</p><h2>Where would you like property to take you?</h2></div><p>Share your destination and requirements with Executive Lets Ltd. Availability, local rules and professional services will always be confirmed for the relevant location.</p></section>
    <ContactBand />
  </PageShell>;
}
