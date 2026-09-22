import { createCipheriv, createDecipheriv, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

function key(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function isConfigured() {
  return ["SUPABASE_URL", "SUPABASE_SECRET_KEY", "AUTH_PEPPER", "ADMIN_USERNAME_DIGEST", "ADMIN_PASSWORD_HASH", "DATA_ENCRYPTION_KEY"].every(name => Boolean(process.env[name]));
}

export function digest(value: string) {
  return createHmac("sha256", key("AUTH_PEPPER")).update(value).digest("hex");
}

export async function verifyLogin(username: string, password: string) {
  const expectedName = Buffer.from(key("ADMIN_USERNAME_DIGEST"), "hex");
  const suppliedName = Buffer.from(digest(username.trim().toLowerCase()), "hex");
  const [salt, expectedHex] = key("ADMIN_PASSWORD_HASH").split(":");
  if (!salt || !expectedHex) throw new Error("Invalid password hash configuration");
  // Always derive the password before comparing the username to avoid a timing oracle.
  const suppliedPassword = await scrypt(password, Buffer.from(salt, "hex"), 64) as Buffer;
  const expectedPassword = Buffer.from(expectedHex, "hex");
  return expectedName.length === suppliedName.length && expectedPassword.length === suppliedPassword.length &&
    timingSafeEqual(expectedName, suppliedName) && timingSafeEqual(expectedPassword, suppliedPassword);
}

function encryptionKey() {
  const secret = Buffer.from(key("DATA_ENCRYPTION_KEY"), "base64");
  if (secret.length !== 32) throw new Error("DATA_ENCRYPTION_KEY must be 32 bytes");
  return secret;
}

export function encrypt(value: unknown) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return ["v1", iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), body.toString("base64url")].join(".");
}

export function decrypt<T>(value: string): T {
  const [version, encodedIv, encodedTag, encodedBody] = value.split(".");
  if (version !== "v1" || !encodedIv || !encodedTag || !encodedBody) throw new Error("Unsupported encrypted record");
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(encodedIv, "base64url"));
  decipher.setAuthTag(Buffer.from(encodedTag, "base64url"));
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(encodedBody, "base64url")), decipher.final()]).toString("utf8")) as T;
}
