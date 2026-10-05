import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site";
import { PropertyGallery } from "@/components/property-gallery";
import { SavePropertyButton } from "@/components/save-property-button";
import { isConfigured } from "@/lib/secure";
import { getProperty, statusNames } from "@/lib/storage";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Property details" };
export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const property = isConfigured() ? await getProperty((await params).id) : null;
  if (!property || ["draft", "off_market"].includes(property.status)) notFound();
  return <PageShell><section className="listing-detail"><a href="/properties" className="back-link">← All properties</a><div className="detail-grid"><div><PropertyGallery title={property.title} images={property.imageUrls} floorplans={property.floorplanUrls} location={property.address || property.location} /><div className="detail-description"><h2>About this home</h2><p>{property.description}</p>{property.features.length > 0 && <><h2>Features</h2><ul>{property.features.map((feature, index) => <li key={index}>{feature}</li>)}</ul></>}</div></div><aside className="detail-aside"><p className="eyebrow">{property.kind === "letting" ? "To let" : "For sale"} · {property.location}</p><h1>{property.title}</h1><p className="detail-intro">{property.description}</p><p className="detail-meta">{property.bedrooms} Beds · {property.bathrooms} Baths</p><p className="detail-price">{property.price}</p><p className="detail-status">{statusNames[property.status]}</p><div className="detail-actions"><a className="button button-navy" href="/contact">Book a viewing</a>{property.kind === "sale" && <a className="button button-light" href="/contact">Mortgage advice</a>}</div>  <SavePropertyButton propertyId={property.id} /><p className="detail-callout">Contact us today to arrange a viewing or ask a question about this property.</p></aside></div></section></PageShell>;
}
