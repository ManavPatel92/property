import type { Metadata } from "next";
import { ArrowRight, Camera, ChartNoAxesCombined, Handshake, Megaphone } from "lucide-react";
import { ContactBand, PageHero, PageShell, SectionHeading } from "@/components/site";

export const metadata: Metadata = { title: "Sales" };

export default function SalesPage() {
  const steps = [[ChartNoAxesCombined,"Understand","Discuss your property, priorities and likely timescale."],[Camera,"Prepare","Consider how to present the home clearly."],[Megaphone,"Market","Plan enquiries, viewings and buyer communication."],[Handshake,"Progress","Keep track of the steps from offer to completion."]] as const;
  return <PageShell><PageHero eyebrow="Sales" title="Plan your next property move." copy="Explore the key stages of buying or selling, from the first conversation through to completion." image="/hero-london.webp" /><section className="section"><SectionHeading eyebrow="The process" title="Four clear stages" /><div className="steps-grid">{steps.map(([Icon,title,copy],i)=><div className="step" key={title}><span>0{i+1}</span><Icon /><h3>{title}</h3><p>{copy}</p></div>)}</div></section><section className="section owner-panel"><div><p className="eyebrow">Talk about your plans</p><h2>Thinking of selling?</h2></div><p>Start with your goals and the property details, then discuss the next steps with Executive Lets Ltd. <a className="text-link light" href="/contact">Contact details <ArrowRight /></a></p></section><ContactBand /></PageShell>;
}
