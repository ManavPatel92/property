"use server";

import { redirect } from "next/navigation";
import { createSession, endSession, allowLogin, recordFailure, requireAdmin } from "@/lib/admin-auth";
import { isConfigured, verifyLogin } from "@/lib/secure";
import { createProperty, getProperty, removeProperty, statuses, updateProperty, updateStatus, uploadPropertyImage, type PropertyDetails, type Status } from "@/lib/storage";

export async function loginAction(form: FormData) {
  if (!isConfigured()) redirect("/admin/login?error=setup");
  const username = String(form.get("username") || "").slice(0, 150);
  const password = String(form.get("password") || "").slice(0, 1024);
  if (!username || !password || !(await allowLogin(username))) redirect("/admin/login?error=login");
  const valid = await verifyLogin(username, password);
  if (!valid) { await recordFailure(username); redirect("/admin/login?error=login"); }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() { await requireAdmin(); await endSession(); redirect("/admin/login"); }

async function readProperty(form: FormData): Promise<{ details: PropertyDetails; status: Status }> {
  const value = (name: string, limit = 300) => String(form.get(name) || "").trim().slice(0, limit);
  const title = value("title", 150);
  const location = value("location", 150);
  const price = value("price", 80);
  const description = value("description", 5000);
  if (!title || !location || !price || !description) throw new Error("Please complete all required fields.");
  const kind = value("kind") === "letting" ? "letting" : "sale";
  const status = value("status") as Status;
  if (!statuses.includes(status)) throw new Error("Invalid status.");
  const bedrooms = Number(value("bedrooms"));
  const bathrooms = Number(value("bathrooms"));
  if (![bedrooms, bathrooms].every(n => Number.isInteger(n) && n >= 0 && n <= 50)) throw new Error("Invalid bedroom or bathroom count.");
  let imageUrl = value("imageUrl", 1000);
  const imageFile = form.get("imageFile");
  if (imageFile && typeof imageFile === "object" && "size" in imageFile && (imageFile as File).size > 0) {
    imageUrl = await uploadPropertyImage(imageFile as File);
  }
  if (imageUrl && (!/^https:\/\//i.test(imageUrl) || (() => { try { const url = new URL(imageUrl); return !["https:"].includes(url.protocol) || Boolean(url.username || url.password); } catch { return true; } })())) throw new Error("Use an HTTPS image URL.");
  return { status, details: { title, location, price, description, kind, bedrooms, bathrooms, imageUrl, address: value("address", 250), ownerNotes: value("ownerNotes", 2000), features: value("features", 1200).split("\n").map(x => x.trim()).filter(Boolean).slice(0, 25) } };
}

export async function savePropertyAction(form: FormData) {
  await requireAdmin();
  let property;
  try { property = await readProperty(form); } catch (err) {
    console.error("Save property error:", err);
    redirect("/admin?error=fields");
  }
  const id = String(form.get("id") || "");
  if (id) {
    const existing = await getProperty(id);
    if (!existing) redirect("/admin?error=missing");
    await updateProperty(id, property.details, property.status, existing.imageUrl);
  } else await createProperty(property.details, property.status);
  redirect("/admin?updated=1");
}

export async function changeStatusAction(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "");
  const status = String(form.get("status") || "") as Status;
  if (!statuses.includes(status) || !(await getProperty(id))) redirect("/admin?error=missing");
  await updateStatus(id, status);
  redirect("/admin?updated=1");
}

export async function deletePropertyAction(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") || "");
  const property = await getProperty(id);
  if (!property) redirect("/admin?error=missing");
  await removeProperty(id, property.imageUrl);
  redirect("/admin?removed=1");
}
