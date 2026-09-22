import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site";
import { AdminPropertyForm } from "@/components/admin-property-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getProperty } from "@/lib/storage";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit property", robots: { index: false, follow: false } };
export default async function EditProperty({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const property = await getProperty((await params).id); if (!property) notFound(); return <PageShell><section className="admin-wrap"><div className="admin-heading"><p className="eyebrow">Property workspace</p><h1>Edit property</h1><p>Changes to public listings appear after saving.</p></div><AdminPropertyForm property={property} /></section></PageShell>; }
