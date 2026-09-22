"use server";

import { redirect } from "next/navigation";
import { createSession, endSession, allowLogin, recordFailure, requireAdmin } from "@/lib/admin-auth";
import { isConfigured, verifyLogin } from "@/lib/secure";
import { createProperty, getProperty, removeProperty, statuses, updateProperty, updateStatus, type PropertyDetails, type Status } from "@/lib/storage";

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

function readProperty(form: FormData): { details: PropertyDetails; status: Status } {
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
  const imageUrl = value("imageUrl", 1000);
  if (imageUrl && (!/^https:\/\//i.test(imageUrl) || (() => { try { const url = new URL(imageUrl); return !["https:"].includes(url.protocol) || Boolean(url.username || url.password); } catch { return true; } })())) throw new Error("Use an HTTPS image URL.");
  return { status, details: { title, location, price, description, kind, bedrooms, bathrooms, imageUrl, address: value("address", 250), ownerNotes: value("ownerNotes", 2000), features: value("features", 1200).split("\n").map(x => x.trim()).filter(Boolean).slice(0, 25) } };
}

export async function savePropertyAction(form: FormData) {
  await requireAdmin();
  let property;
  try { property = readProperty(form); } catch { redirect("/admin?error=fields"); }
  const id = String(form.get("id") || "");
  if (id) {
    if (!(await getProperty(id))) redirect("/admin?error=missing");
    await updateProperty(id, property.details, property.status);
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
  if (!(await getProperty(id))) redirect("/admin?error=missing");
  await removeProperty(id);
  redirect("/admin?removed=1");
}
