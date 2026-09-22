import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site";
import { isConfigured } from "@/lib/secure";
import { getProperty, statusNames } from "@/lib/storage";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Property details" };
export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const property = isConfigured() ? await getProperty((await params).id) : null;
  if (!property || ["draft", "off_market"].includes(property.status)) notFound();
  return <PageShell><section className="listing-detail"><a href="/properties" className="back-link">← All properties</a><div className="detail-grid"><div><div className="detail-photo">{property.imageUrl ? <img src={property.imageUrl} alt={property.title} referrerPolicy="no-referrer" /> : <span>Executive Lets Ltd</span>}</div><div className="detail-description"><h2>About this home</h2><p>{property.description}</p>{property.features.length > 0 && <><h2>Features</h2><ul>{property.features.map((feature, index) => <li key={index}>{feature}</li>)}</ul></>}</div></div><aside className="detail-aside"><p className="eyebrow">{property.kind === "letting" ? "To let" : "For sale"} · {property.location}</p><h1>{property.title}</h1><p className="detail-price">{property.price}</p><p className="detail-status">{statusNames[property.status]}</p><p>{property.bedrooms} bedrooms · {property.bathrooms} bathrooms</p><a className="button button-navy" href="/contact">Enquire about this property</a></aside></div></section></PageShell>;
}
