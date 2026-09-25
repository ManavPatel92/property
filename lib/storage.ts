import { randomBytes } from "node:crypto";
import { decrypt, encrypt } from "@/lib/secure";

export * from "@/lib/types";
import { type Property, type PropertyDetails, type Status } from "@/lib/types";
type Row = { id: string; status: Status; payload: string; created_at: string; updated_at: string };

export async function db<T>(table: "properties" | "admin_sessions" | "login_attempts", query: string, init: { method?: string; body?: unknown; returnRows?: boolean } = {}): Promise<T> {
  const origin = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!origin || !secret) throw new Error("Property database is not configured");
  const url = new URL(origin);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) throw new Error("Invalid Supabase URL");
  const response = await fetch(`${url.origin}/rest/v1/${table}?${query}`, {
    method: init.method || "GET",
    headers: { apikey: secret, "Content-Type": "application/json", ...(init.returnRows ? { Prefer: "return=representation" } : {}) },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Database request failed (${response.status})`);
  const text = await response.text();
  return (text ? JSON.parse(text) : []) as T;
}

function fromRow(row: Row): Property { return { ...decrypt<PropertyDetails>(row.payload), id: row.id, status: row.status, createdAt: row.created_at, updatedAt: row.updated_at }; }
export async function listProperties(includeHidden = false) {
  const filter = includeHidden ? "" : "&status=not.in.(draft,off_market)";
  return (await db<Row[]>("properties", `select=id,status,payload,created_at,updated_at&order=created_at.desc${filter}`)).map(fromRow);
}
export async function getProperty(id: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return null;
  const rows = await db<Row[]>("properties", `select=id,status,payload,created_at,updated_at&id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows[0] ? fromRow(rows[0]) : null;
}
export async function createProperty(details: PropertyDetails, status: Status) {
  await db("properties", "", { method: "POST", body: { status, payload: encrypt(details) } });
}
export async function updateProperty(id: string, details: PropertyDetails, status: Status, previousImageUrl = "") {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { status, payload: encrypt(details), updated_at: new Date().toISOString() } });
  if (previousImageUrl && previousImageUrl !== details.imageUrl) await removeStorageObject(previousImageUrl);
}
export async function updateStatus(id: string, status: Status) {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { status, updated_at: new Date().toISOString() } });
}
export async function removeProperty(id: string, imageUrl = "") {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
  if (imageUrl) await removeStorageObject(imageUrl);
}

let bucketChecked = false;
async function ensureStorageBucket(origin: string, secret: string) {
  if (bucketChecked) return;
  try {
    const response = await fetch(`${origin}/storage/v1/bucket`, {
      method: "POST",
      headers: {
        apikey: secret,
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "property-images", name: "property-images", public: true }),
    });
    if (response.ok || response.status === 409) bucketChecked = true;
  } catch {
  }
}

export async function uploadPropertyImage(file: File): Promise<string> {
  const origin = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!origin || !secret) throw new Error("Property database is not configured");
  const url = new URL(origin);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) throw new Error("Invalid Supabase URL");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid image format. Please upload JPG, PNG, WEBP, AVIF, or GIF.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image file is too large. Maximum size is 10MB.");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = /^[a-z0-9]+$/i.test(ext) ? ext : "jpg";
  const fileName = `${Date.now()}-${randomBytes(8).toString("hex")}.${safeExt}`;
  const arrayBuffer = await file.arrayBuffer();

  await ensureStorageBucket(url.origin, secret);

  const response = await fetch(`${url.origin}/storage/v1/object/property-images/${fileName}`, {
    method: "POST",
    headers: {
      apikey: secret,
      Authorization: `Bearer ${secret}`,
      "Content-Type": file.type,
      "x-upsert": "true",
    },
    body: Buffer.from(arrayBuffer),
    cache: "no-store",
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to upload image (${response.status}): ${errText}`);
  }

  return `${url.origin}/storage/v1/object/public/property-images/${fileName}`;
}

async function removeStorageObject(imageUrl: string) {
  const origin = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!origin || !secret || !imageUrl) return;

  try {
    const url = new URL(imageUrl);
    const prefix = "/storage/v1/object/public/property-images/";
    if (url.origin !== new URL(origin).origin || !url.pathname.startsWith(prefix)) return;
    const path = url.pathname.slice(prefix.length);
    if (!path || path.includes("..")) return;
    const response = await fetch(`${new URL(origin).origin}/storage/v1/object/property-images/${path}`, {
      method: "DELETE",
      headers: { apikey: secret, Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (!response.ok && response.status !== 404) throw new Error(`Storage cleanup failed (${response.status})`);
  } catch (error) {
    console.error("Storage cleanup error:", error);
  }
}
