# Changelog

All notable changes to this project are recorded here. Add a new dated section before each push.

## 2026-09-25

### Contact page

- Improved the three-column contact layout and equal-height form and office blocks.
- Improved spacing, form field sizing, label readability, and navigation typography.
- Added the office mini map and improved address contrast.
- Moved the contact form into the central contact layout.
- contact email delivery to Nodemailer SMTP.

### Admin property management

- Added optimistic concurrency checks for property updates and deletes using `updated_at`.
- Prevented stale edits from deleting current or replacement images.
- Surfaced storage cleanup failures instead of silently ignoring them.
- Added server-side image signature validation for JPEG, PNG, WEBP, AVIF, and GIF uploads.
- Reduced the upload and Server Action limit to 4MB for Vercel compatibility.
- Improved invalid file replacement handling and preview object URL cleanup.
