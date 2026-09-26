# Executive Lets Ltd — Vercel edition

The estate agency website, public property listings and a private management area, using Next.js 16, React 19, TypeScript and Tailwind CSS 4.

## Run locally

Requires Node.js 24. Run `npm install`, then `npm run dev`. Open http://localhost:3000.

For the complete local, Supabase, SMTP, admin, image upload, and Vercel setup instructions, see [SETUP.md](SETUP.md).

## Deploy to Vercel

Import this folder as a new Vercel project (via Git), select the Next.js framework preset, use Node.js 24.x and use the included `next build` command. This GitHub project uses npm and should not contain `pnpm-lock.yaml`. You can also use the Vercel CLI (`vercel` then `vercel --prod`) once signed into the correct account. Add `executiveltd.co.uk` and `www.executiveltd.co.uk` to this project under Settings → Domains, then follow the DNS instructions Vercel gives for your account. The domain owner must update DNS.

The contact page awaits the client's real phone and email details. The management area adds live property listings after database setup.

## Property management setup

1. Create a Supabase project. In its SQL editor, run `database/schema.sql`. The tables have row level security and no browser access policies.
2. Copy `.env.example` to `.env.local`; replace `SUPABASE_URL` and `SUPABASE_SECRET_KEY` with your project URL and **server-only secret key**. Do not use a publishable key.
3. Run `npm run create-admin` in your own terminal. Type the username and password securely when prompted. This adds `ADMIN_USERNAME_DIGEST`, `ADMIN_PASSWORD_HASH`, `AUTH_PEPPER`, and `DATA_ENCRYPTION_KEY` to `.env.local`. Never send the plain password in chat or commit `.env.local`.
4. In Vercel → Project → Settings → Environment Variables, add those six values from `.env.local` to Production (and Preview if needed), then redeploy. Keep the encryption key unchanged or existing property records cannot be decrypted.
5. The private management URL is `/admin/login`. It is intentionally absent from public navigation. Sign in there to add, edit, remove and change status. Public listings appear on `/properties` after publishing them. Draft and Off market listings are hidden publicly.

Passwords are salted and one-way hashed with scrypt. Usernames are stored only as keyed one-way digests, not reversible text. Property details, including private notes, are encrypted with AES-256-GCM before storage. Sessions use random HttpOnly cookies and server-side hashed tokens, expiring after 12 hours. Never add a secret key or `.env.local` to Git. Public listing details are intentionally decrypted on the server to display to visitors; owner notes and private addresses are not rendered publicly. Cover photos currently accept HTTPS image URLs; an image upload service can be added later.

## If Vercel says scripts/run-framework.mjs is missing

That build is using the earlier general-source package. Redeploy this Vercel edition, or open the existing Vercel project → Settings → Build and Deployment → Build Command, switch Override on and enter `next build`. Keep Framework Preset `Next.js`. The `vercel.json` in this package also sets the build command explicitly.
