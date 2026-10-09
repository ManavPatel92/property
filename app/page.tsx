import { ArrowRight, Globe2, HomeIcon, KeyRound } from "lucide-react";
import { PageShell, SectionHeading, ContactBand } from "@/components/site";

export default function Home() {
  return <PageShell>
    <section className="hero-grid"><div className="hero-content"><p className="eyebrow">Executive Lets Ltd</p><h1>Exceptional homes.<br />Personal service.</h1><p className="hero-copy">Explore lettings, sales and international property with a team focused on your next move.</p><div className="hero-actions"><a className="button button-copper" href="/sales#properties">Properties for sale <ArrowRight /></a><a className="button button-ghost-light" href="/lettings#properties">Properties to let</a></div></div><div className="hero-image" role="img" aria-label="Residential street" /></section>
    <section className="section intro-section"><SectionHeading eyebrow="What we do" title="Property services for every stage" copy="Find the service that fits your plans and explore the next steps." /><div className="service-grid"><a className="service-card" href="/sales"><HomeIcon /><span>01</span><h3>Sales</h3><p>Guidance for people preparing to sell or looking to buy.</p><b>Explore sales <ArrowRight /></b></a><a className="service-card featured" href="/lettings"><KeyRound /><span>02</span><h3>Lettings</h3><p>Information for landlords looking to let and tenants looking for a home.</p><b>Explore lettings <ArrowRight /></b></a><a className="service-card" href="/international"><Globe2 /><span>03</span><h3>International</h3><p>Explore overseas property opportunities and discuss your plans.</p><b>Explore international <ArrowRight /></b></a></div></section>
    <section className="section statement-section"><p className="eyebrow">Executive Lets Ltd</p><blockquote>Property expertise built around people, places and possibilities.</blockquote><a className="text-link light" href="/about">About the agency <ArrowRight /></a></section>
    <ContactBand />
  </PageShell>;
}
