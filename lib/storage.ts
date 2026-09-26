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
export async function updateProperty(id: string, details: PropertyDetails, status: Status, expectedUpdatedAt: string, previousImageUrl = "") {
  const updated = await db<Row[]>("properties", `id=eq.${encodeURIComponent(id)}&updated_at=eq.${encodeURIComponent(expectedUpdatedAt)}`, { method: "PATCH", body: { status, payload: encrypt(details), updated_at: new Date().toISOString() }, returnRows: true });
  if (!updated.length) {
    if (details.imageUrl && details.imageUrl !== previousImageUrl) await removeStorageObject(details.imageUrl);
    throw new Error("Property was changed by another admin.");
  }
  if (previousImageUrl && previousImageUrl !== details.imageUrl) await removeStorageObject(previousImageUrl);
}
export async function updateStatus(id: string, status: Status) {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { status, updated_at: new Date().toISOString() } });
}
export async function removeProperty(id: string, imageUrl = "", expectedUpdatedAt: string) {
  const updated = await db<Row[]>("properties", `id=eq.${encodeURIComponent(id)}&updated_at=eq.${encodeURIComponent(expectedUpdatedAt)}`, { method: "DELETE", returnRows: true });
  if (!updated.length) throw new Error("Property was changed by another admin.");
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
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("Image file is too large. Maximum size is 4MB.");
  }

  const arrayBuffer = await file.arrayBuffer();
  if (!hasValidImageSignature(new Uint8Array(arrayBuffer), file.type)) throw new Error("The uploaded file is not a valid image.");
  const safeExt = ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif", "image/gif": "gif" } as Record<string, string>)[file.type] || "jpg";
  const fileName = `${Date.now()}-${randomBytes(8).toString("hex")}.${safeExt}`;

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

function hasValidImageSignature(bytes: Uint8Array, type: string) {
  const startsWith = (...values: number[]) => values.every((value, index) => bytes[index] === value);
  const asciiAt = (offset: number, value: string) => value.split("").every((character, index) => bytes[offset + index] === character.charCodeAt(0));
  if (type === "image/jpeg") return startsWith(0xff, 0xd8, 0xff);
  if (type === "image/png") return startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  if (type === "image/gif") return asciiAt(0, "GIF87a") || asciiAt(0, "GIF89a");
  if (type === "image/webp") return asciiAt(0, "RIFF") && asciiAt(8, "WEBP");
  if (type === "image/avif") return asciiAt(4, "ftyp") && (asciiAt(8, "avif") || asciiAt(8, "avis"));
  return false;
}

async function removeStorageObject(imageUrl: string) {
  const origin = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!origin || !secret || !imageUrl) return;

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
}
