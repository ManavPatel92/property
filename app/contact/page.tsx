import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageShell } from "@/components/site";
import { ContactForm } from "@/components/contact-form";
import { phoneDisplay, phoneHref } from "@/lib/site-data";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <PageShell><section className="contact-hero contact-hero-simple"><div className="contact-info"><p className="eyebrow">Contact Executive Lets Ltd</p><h1>Contact us</h1><p>For lettings, sales, international or management enquiries, speak with the Executive Lets Ltd team.</p><div className="contact-hours"><h2>Opening hours</h2><div className="hours-table"><div className="hours-row hours-heading"><strong>Days</strong><strong>Hours</strong></div><div className="hours-row"><span>Monday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Tuesday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Wednesday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Thursday</span><span>9:00 AM - 5:00 PM</span></div><div className="hours-row"><span>Friday</span><span>9:00 AM - 5:00 PM</span></div></div></div></div><ContactForm /><div className="contact-map"><p className="eyebrow">Call us</p><Phone /><h2>Speak with the team</h2><p>For property enquiries and appointments, call Executive Lets Ltd.</p><a href={phoneHref}><Phone /> {phoneDisplay}</a><p className="contact-social-note">Social-media links will be added here once confirmed.</p></div></section></PageShell>;
}
