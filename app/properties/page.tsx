import type { Metadata } from "next";
import { PageShell } from "@/components/site";
import { isConfigured } from "@/lib/secure";
import { listProperties, statusNames } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Properties" };

export default async function PropertiesPage() {
  const properties = isConfigured() ? await listProperties() : [];
  return <PageShell><section className="listings-intro"><p className="eyebrow">Executive Lets Ltd</p><h1>Discover your next property.</h1><p>Explore homes available to let and for sale. Contact our team for details or to arrange the next step.</p></section><section className="listing-wrap">
    {properties.length ? <div className="property-grid">{properties.map(property => <a href={`/properties/${property.id}`} className="property-card" key={property.id}><div className="property-photo">{property.imageUrl ? <img src={property.imageUrl} alt={property.title} loading="lazy" referrerPolicy="no-referrer" /> : <span>Executive Lets Ltd</span>}<span className="property-badge">{statusNames[property.status]}</span></div><div className="property-info"><span className="eyebrow">{property.kind === "letting" ? "To let" : "For sale"} · {property.location}</span><h2>{property.title}</h2><strong>{property.price}</strong><p>{property.bedrooms} bed · {property.bathrooms} bath</p><span className="property-link">View details →</span></div></a>)}</div> : <div className="admin-panel admin-empty"><h2>Properties coming soon</h2><p>New listings will appear here as soon as the Executive Lets Ltd team publishes them.</p><a href="/contact">Contact us →</a></div>}
  </section></PageShell>;
}
