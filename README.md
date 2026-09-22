# Executive Lets Ltd — Vercel website

Six-page informational property website built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

## Deploy

Import this repository into Vercel as a Next.js project with the root directory set to the repository root. Use Node.js 22.x, `npm install` for installation, and `npm run build` for the build. These commands are configured in `vercel.json`. This repository intentionally does not have an outdated `pnpm-lock.yaml`; npm generates `package-lock.json` when an install runs locally. Commit that generated lockfile when you can.

The images in `public/` are optimised WebP versions of the source images for GitHub transfer. The original high-resolution PNGs remain in the source ZIP provided in the chat.

The site is currently informational only: property listings, administration login, property editing, and enquiry submissions are **not implemented**. Contact details await confirmation.

If Vercel still attempts `scripts/run-framework.mjs`, remove the stale build-command override in Vercel Project Settings and use `npm run build`. Check Root Directory is the repository root.
