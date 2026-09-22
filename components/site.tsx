import { ArrowRight, Menu } from "lucide-react";
import { nav } from "@/lib/site-data";

export function Logo() {
  return <a className="logo" href="/" aria-label="Executive Lets Ltd home">
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="5" fill="#0c2630" />
      <rect x="5.5" y="5.5" width="53" height="53" rx="2" fill="none" stroke="#c68252" strokeWidth="1" />
      <path d="M30 16H15v32h15M15 32h13" fill="none" stroke="#f7f4ed" strokeWidth="3.3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M37 16v32h13" fill="none" stroke="#c68252" strokeWidth="3.3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
    <span className="logo-wordmark"><span>Executive</span><small>LETS LTD</small></span>
  </a>;
}

export function Header() {
  return <header className="site-header"><div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><a className="header-cta" href="/contact">Contact <ArrowRight /></a><details className="mobile-menu"><summary aria-label="Open menu"><Menu /></summary><nav>{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav></details></div></header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div><Logo /><p>Property services for landlords, tenants, buyers and sellers.</p></div><div><h3>Services</h3><a href="/lettings">Lettings</a><a href="/sales">Sales</a><a href="/property-management">Property management</a></div><div><h3>Explore</h3><a href="/properties">Properties</a><a href="/about">About</a><a href="/contact">Contact</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Executive Lets Ltd</span><span>Property information is subject to confirmation.</span></div></footer>;
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><Header /><main>{children}</main><Footer /></>; }
export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }
export function PageHero({ eyebrow, title, copy, image, children }: { eyebrow: string; title: string; copy: string; image?: string; children?: React.ReactNode }) { return <section className="page-hero"><div className="page-hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{children}</div>{image && <img src={image} alt="" />}</section>; }
export function ContactBand() { return <section className="contact-band"><div><p className="eyebrow">Your next move</p><h2>Start a property conversation.</h2></div><div className="contact-band-links"><a href="/contact">Contact Executive Lets Ltd <ArrowRight /></a></div></section>; }
export function FactStrip() { return <div className="fact-strip"><div><strong>Lettings</strong><span>For landlords and tenants</span></div><div><strong>Sales</strong><span>For buyers and sellers</span></div><div><strong>Management</strong><span>For property owners</span></div></div>; }
