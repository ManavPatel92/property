import { decrypt, encrypt } from "@/lib/secure";

export type Status = "draft" | "available" | "under_offer" | "let_agreed" | "sold" | "off_market";
export const statuses: Status[] = ["draft", "available", "under_offer", "let_agreed", "sold", "off_market"];
export const statusNames: Record<Status, string> = { draft: "Draft", available: "Available", under_offer: "Under offer", let_agreed: "Let agreed", sold: "Sold", off_market: "Off market" };
export type PropertyDetails = { title: string; location: string; address: string; kind: "sale" | "letting"; price: string; bedrooms: number; bathrooms: number; description: string; imageUrl: string; features: string[]; ownerNotes: string };
export type Property = PropertyDetails & { id: string; status: Status; createdAt: string; updatedAt: string };
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
export async function updateProperty(id: string, details: PropertyDetails, status: Status) {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { status, payload: encrypt(details), updated_at: new Date().toISOString() } });
}
export async function updateStatus(id: string, status: Status) {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { status, updated_at: new Date().toISOString() } });
}
export async function removeProperty(id: string) {
  await db("properties", `id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}
