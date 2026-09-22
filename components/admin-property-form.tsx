import { savePropertyAction } from "@/app/admin/actions";
import { statuses, statusNames, type Property } from "@/lib/storage";

export function AdminPropertyForm({ property }: { property?: Property }) {
  return <form action={savePropertyAction} className="admin-panel admin-form property-form">
    {property && <input type="hidden" name="id" value={property.id} />}
    <div className="form-grid"><label>Listing title *<input name="title" required maxLength={150} defaultValue={property?.title} placeholder="e.g. Modern two bedroom apartment" /></label><label>Area or town *<input name="location" required maxLength={150} defaultValue={property?.location} placeholder="e.g. Wembley, London" /></label></div>
    <div className="form-grid"><label>Property address (private until added to a public description)<input name="address" maxLength={250} defaultValue={property?.address} /></label><label>Advertised price *<input name="price" required maxLength={80} defaultValue={property?.price} placeholder="e.g. £1,650 pcm or £425,000" /></label></div>
    <div className="form-grid"><label>Listing type<select name="kind" defaultValue={property?.kind || "letting"}><option value="letting">To let</option><option value="sale">For sale</option></select></label><label>Status<select name="status" defaultValue={property?.status || "draft"}>{statuses.map(status => <option key={status} value={status}>{statusNames[status]}</option>)}</select></label></div>
    <div className="form-grid"><label>Bedrooms<input name="bedrooms" type="number" min="0" max="50" defaultValue={property?.bedrooms ?? 1} required /></label><label>Bathrooms<input name="bathrooms" type="number" min="0" max="50" defaultValue={property?.bathrooms ?? 1} required /></label></div>
    <label>Description *<textarea name="description" rows={6} maxLength={5000} required defaultValue={property?.description} placeholder="Describe the home and its highlights." /></label>
    <label>Features, one per line<textarea name="features" rows={4} maxLength={1200} defaultValue={property?.features.join("\n")} placeholder="Parking&#10;Garden&#10;Close to station" /></label>
    <label>Cover photo HTTPS URL<input name="imageUrl" type="url" maxLength={1000} defaultValue={property?.imageUrl} placeholder="https://..." /></label>
    <label>Private owner or staff notes<textarea name="ownerNotes" rows={4} maxLength={2000} defaultValue={property?.ownerNotes} placeholder="Only visible in the management area" /></label>
    <div className="admin-actions"><button className="button button-navy" type="submit">{property ? "Save changes" : "Add property"}</button><a href="/admin">Cancel</a></div>
  </form>;
}
