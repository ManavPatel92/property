import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/site";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <PageShell><section className="contact-hero contact-hero-simple"><div className="contact-info"><p className="eyebrow">Contact Executive Lets Ltd</p><h1>Contact us</h1><p>For lettings, sales or management enquiries, speak with the Executive Lets Ltd team.</p><div className="contact-hours"><h2>Opening hours</h2><div className="hours-table"><div className="hours-row hours-heading"><strong>Days</strong><strong>Hours</strong></div><div className="hours-row"><span>Monday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Tuesday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Wednesday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Thursday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Friday</span><span>9:00 AM - 5:00 PM</span></div></div></div></div><ContactForm /><div className="contact-map"><p className="eyebrow">Find us</p><MapPin /><h2>Our office</h2><p>123 Example Street<br />London, UK</p><a href="tel:+4402000000000"><Phone /> +44 (0)20 0000 0000</a><iframe className="office-mini-map" title="Map showing our office location" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.145%2C51.505%2C-0.105%2C51.525&amp;layer=mapnik&amp;marker=51.515%2C-0.125" loading="lazy" /></div></section></PageShell>;
}
