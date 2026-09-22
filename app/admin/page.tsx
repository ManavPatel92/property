import type { Metadata } from "next";
import { PageShell } from "@/components/site";
import { DeletePropertyButton } from "@/components/delete-property-button";
import { changeStatusAction, deletePropertyAction, logoutAction } from "./actions";
import { requireAdmin } from "@/lib/admin-auth";
import { listProperties, statuses, statusNames } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Manage properties", robots: { index: false, follow: false } };

export default async function Admin({ searchParams }: { searchParams: Promise<{ updated?: string; removed?: string; error?: string }> }) {
  await requireAdmin();
  const properties = await listProperties(true);
  const message = await searchParams;
  return <PageShell><section className="admin-wrap"><div className="admin-top"><div><p className="eyebrow">Team workspace</p><h1>Manage properties</h1><p>Add a listing, change its status or update the details shown on the website.</p></div><form action={logoutAction}><button className="admin-plain" type="submit">Sign out</button></form></div>
    <div className="admin-toolbar"><a className="button button-navy" href="/admin/new">+ Add property</a><a href="/properties">View public listings →</a></div>
    {message.updated && <p className="admin-notice" role="status">Property changes saved.</p>}{message.removed && <p className="admin-notice" role="status">Property removed.</p>}{message.error && <p className="form-error" role="alert">That change could not be saved. Check the listing and try again.</p>}
    {properties.length ? <div className="admin-list">{properties.map(property => <article className="admin-row" key={property.id}><div className="admin-row-main"><span className="eyebrow">{property.kind === "letting" ? "To let" : "For sale"}</span><h2>{property.title}</h2><p>{property.location} · {property.price}</p></div><form action={changeStatusAction} className="admin-status"><input type="hidden" name="id" value={property.id} /><label>Status<select name="status" defaultValue={property.status}>{statuses.map(status => <option key={status} value={status}>{statusNames[status]}</option>)}</select></label><button type="submit">Update status</button></form><div className="admin-row-actions"><a href={`/admin/${property.id}`}>Edit details</a><form action={deletePropertyAction}><input type="hidden" name="id" value={property.id} /><DeletePropertyButton /></form></div></article>)}</div> : <div className="admin-panel admin-empty"><h2>No properties yet</h2><p>Add your first listing to start managing the property portfolio.</p><a href="/admin/new">Create a property →</a></div>}
  </section></PageShell>;
}
