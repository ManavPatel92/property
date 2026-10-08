import { ArrowRight, Menu, Phone } from "lucide-react";
import { nav, partners, phoneDisplay, phoneHref } from "@/lib/site-data";

export function Logo() {
  return <a className="logo" href="/" aria-label="Executive Lets Ltd home">
    <span className="customer-logo-viewport" aria-hidden="true"><img className="customer-logo" src="/executive-lets-estates-logo.png" alt="" /></span>
  </a>;
}

export function Header() {
  return <header className="site-header"><div className="header-inner"><details className="mobile-menu"><summary aria-label="Open menu"><Menu /></summary><nav aria-label="Mobile navigation">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}<a href="/terms-and-conditions">Terms &amp; Conditions</a></nav></details><Logo /><nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><a className="header-phone" href={phoneHref} aria-label={`Call Executive Lets on ${phoneDisplay}`}><Phone /><span><small>Call us</small>{phoneDisplay}</span></a></div></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><Logo /><p>Exceptional homes. Personal service.</p><a className="footer-phone" href={phoneHref}><Phone /> {phoneDisplay}</a></div><div><h3>Services</h3><a href="/lettings">Lettings</a><a href="/sales">Sales</a><a href="/property-management">Property management</a><a href="/international">International</a></div><div><h3>Explore</h3><a href="/properties">Properties</a><a href="/partners">Partners</a><a href="/about">About us</a><a href="/contact">Contact</a><a href="/terms-and-conditions">Terms &amp; Conditions</a></div><div><h3>Follow us</h3><p className="social-note">Social links coming soon.</p><div className="social-buttons" aria-label="Social media links coming soon"><span title="Facebook link coming soon">f</span><span title="Instagram link coming soon">ig</span><span title="LinkedIn link coming soon">in</span></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Executive Lets Ltd</span><span>Property information is subject to confirmation.</span></div></footer>;
}

export function PartnerStrip() { return <section className="partner-strip" aria-labelledby="partner-strip-title"><div className="partner-strip-heading"><p className="eyebrow">Professional partners</p><h2 id="partner-strip-title">Trusted industry memberships</h2></div><div className="partner-logos">{partners.map((partner) => <div className={`partner-mark partner-${partner.short.toLowerCase()}`} key={partner.short}><strong>{partner.short}</strong><span>{partner.name}</span></div>)}</div></section>; }
export function PageShell({ children }: { children: React.ReactNode }) { return <><Header /><main>{children}</main><PartnerStrip /><Footer /></>; }
export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }
export function PageHero({ eyebrow, title, copy, image, children }: { eyebrow: string; title: string; copy: string; image?: string; children?: React.ReactNode }) { return <section className="page-hero"><div className="page-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{children}</div>{image && <img src={image} alt="" />}</section>; }
export function ContactBand() { return <section className="contact-band"><div><p className="eyebrow">Your next move</p><h2>Start a property conversation.</h2></div><div className="contact-band-links"><a href={phoneHref}><Phone /> Call {phoneDisplay}</a><a href="/contact">Contact Executive Lets Ltd <ArrowRight /></a></div></section>; }
export function FactStrip() { return <div className="fact-strip"><div><strong>Lettings</strong><span>For landlords and tenants</span></div><div><strong>Sales</strong><span>For buyers and sellers</span></div><div><strong>Management</strong><span>For property owners</span></div></div>; }
