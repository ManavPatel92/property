import { createHmac, randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { readFile, writeFile, chmod } from "node:fs/promises";
import { resolve } from "node:path";

const scrypt = promisify(scryptCallback);
const path = resolve(process.cwd(), ".env.local");
if (!process.stdin.isTTY) throw new Error("Run this command in an interactive terminal.");

async function ask(label, hidden = false) {
  process.stdout.write(label);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  let answer = "";
  try {
    return await new Promise((resolveAnswer, reject) => {
      function onData(chunk) {
        const chars = chunk.toString("utf8");
        for (const char of chars) {
          if (char === "\r" || char === "\n") { process.stdout.write("\n"); process.stdin.off("data", onData); resolveAnswer(answer); return; }
          if (char === "\u0003") { process.stdin.off("data", onData); reject(new Error("Cancelled")); return; }
          if (char === "\u007f") { if (answer.length) { answer = answer.slice(0, -1); if (!hidden) process.stdout.write("\b \b"); } continue; }
          if (char.charCodeAt(0) >= 32) { answer += char; if (!hidden) process.stdout.write(char); }
        }
      }
      process.stdin.on("data", onData);
    });
  } finally { process.stdin.setRawMode(false); process.stdin.pause(); }
}

const username = (await ask("Admin username: ")).trim().toLowerCase();
const password = await ask("Admin password (hidden): ", true);
if (username.length < 4 || username.length > 150 || password.length < 14) throw new Error("Username needs 4–150 characters and password at least 14 characters.");
const existing = await readFile(path, "utf8").catch(() => "");
const settings = new Map();
for (const line of existing.split(/\r?\n/)) { const i = line.indexOf("="); if (i > 0 && !line.startsWith("#")) settings.set(line.slice(0, i).trim(), line.slice(i + 1)); }
const pepper = settings.get("AUTH_PEPPER") || randomBytes(32).toString("hex");
const dataKey = settings.get("DATA_ENCRYPTION_KEY") || randomBytes(32).toString("base64");
const salt = randomBytes(16);
const hashed = await scrypt(password, salt, 64);
settings.set("AUTH_PEPPER", pepper);
settings.set("DATA_ENCRYPTION_KEY", dataKey);
settings.set("ADMIN_USERNAME_DIGEST", createHmac("sha256", pepper).update(username).digest("hex"));
settings.set("ADMIN_PASSWORD_HASH", `${salt.toString("hex")}:${hashed.toString("hex")}`);
await writeFile(path, [...settings].map(([name, value]) => `${name}=${value}`).join("\n") + "\n", { mode: 0o600 });
await chmod(path, 0o600);
console.log("Saved hashed login and encryption keys to .env.local. Add these server-only values to Vercel's environment settings.");
