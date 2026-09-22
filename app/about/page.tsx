import type { Metadata } from "next";
import { ArrowRight, Ear, HomeIcon, MessagesSquare } from "lucide-react";
import { ContactBand, FactStrip, PageHero, PageShell, SectionHeading } from "@/components/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <PageShell><PageHero eyebrow="About Executive Lets Ltd" title="A place to start your property plans." copy="Explore lettings, sales and property management services under one roof." /><FactStrip /><section className="section about-story"><div className="about-image"><img src="/hero-london.webp" alt="Residential street" /></div><div><SectionHeading eyebrow="How to get started" title="Tell us what you need from your next move" copy="Whether you are looking for a home, considering a sale or reviewing a rental property, the first step is to outline your goals and the details that matter to you." /><a className="button button-navy" href="/contact">Contact details <ArrowRight /></a></div></section><section className="section value-grid"><div><Ear /><h3>Share your priorities</h3><p>Start with your property, plans and timescale.</p></div><div><HomeIcon /><h3>Explore the options</h3><p>Consider the route that fits your situation.</p></div><div><MessagesSquare /><h3>Plan the next step</h3><p>Move forward with a clearer understanding of the process.</p></div></section><ContactBand /></PageShell>;
}
