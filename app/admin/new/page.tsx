import type { Metadata } from "next";
import { PageShell } from "@/components/site";
import { AdminPropertyForm } from "@/components/admin-property-form";
import { requireAdmin } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Add property", robots: { index: false, follow: false } };
export default async function NewProperty() { await requireAdmin(); return <PageShell><section className="admin-wrap"><div className="admin-heading"><p className="eyebrow">Property workspace</p><h1>Add a property</h1><p>Start as a draft until the listing is ready to show publicly.</p></div><AdminPropertyForm /></section></PageShell>; }
