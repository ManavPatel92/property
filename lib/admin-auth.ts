import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/storage";
import { digest } from "@/lib/secure";

const cookieName = "executive_admin_session";
const lifetime = 12 * 60 * 60 * 1000;
const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

export async function createSession() {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + lifetime);
  await db("admin_sessions", "", { method: "POST", body: { token_hash: tokenHash(token), expires_at: expires.toISOString() } });
  (await cookies()).set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires });
}

export async function isAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return false;
  const rows = await db<Array<{ expires_at: string }>>("admin_sessions", `select=expires_at&token_hash=eq.${tokenHash(token)}&limit=1`);
  return Boolean(rows[0] && new Date(rows[0].expires_at).getTime() > Date.now());
}

export async function requireAdmin() { if (!(await isAdmin())) redirect("/admin/login"); }

export async function endSession() {
  const token = (await cookies()).get(cookieName)?.value;
  if (token) await db("admin_sessions", `token_hash=eq.${tokenHash(token)}`, { method: "DELETE" });
  (await cookies()).delete(cookieName);
}

export async function allowLogin(username: string) {
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const loginKey = digest(username.trim().toLowerCase());
  const attempts = await db<Array<{ id: number }>>("login_attempts", `select=id&login_key=eq.${loginKey}&created_at=gte.${encodeURIComponent(cutoff)}&limit=8`);
  return attempts.length < 8;
}

export async function recordFailure(username: string) {
  await db("login_attempts", "", { method: "POST", body: { login_key: digest(username.trim().toLowerCase()) } });
}
