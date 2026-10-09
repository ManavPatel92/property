import { SavedPropertyLabel } from "@/components/saved-property-label";
import { isConfigured } from "@/lib/secure";
import { listProperties, statusNames } from "@/lib/storage";

export async function PropertyListings({ kind }: { kind: "sale" | "letting" }) {
  const properties = isConfigured()
    ? (await listProperties()).filter((property) => property.kind === kind)
    : [];
  const heading = kind === "sale" ? "Properties for sale" : "Properties to let";

  return <section className="listing-wrap service-listings" id="properties">
    <div className="section-heading"><p className="eyebrow">Current availability</p><h2>{heading}</h2></div>
    {properties.length ? <div className="property-grid">{properties.map((property) => <a href={`/properties/${property.id}`} className="property-card" key={property.id}><div className="property-photo">{property.imageUrl ? <img src={property.imageUrl} alt={property.title} loading="lazy" referrerPolicy="no-referrer" /> : <span>Executive Lets Ltd</span>}<div className="property-badges"><span className="property-badge">{statusNames[property.status]}</span><SavedPropertyLabel propertyId={property.id} /></div></div><div className="property-info"><span className="eyebrow">{kind === "letting" ? "To let" : "For sale"} · {property.location}</span><h2>{property.title}</h2><strong>{property.price}</strong><p>{property.bedrooms} bed · {property.bathrooms} bath</p><span className="property-link">View details →</span></div></a>)}</div> : <div className="admin-panel admin-empty"><h2>{heading} coming soon</h2><p>New listings will appear here as soon as the Executive Lets Ltd team publishes them.</p><a href="/contact">Contact us →</a></div>}
  </section>;
}
