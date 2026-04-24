Urban Sport Premium Local Admin Setup
====================================

Stack:
- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Local JSON content files
- Local protected admin with cookie auth

Quick Start
-----------

1. Install dependencies
   `npm install`

2. Create `.env.local`
   Copy `.env.example` and fill:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_SITE_URL`

3. Generate a password hash
   Run:
   `node scripts/hash-admin-password.mjs your-password`
   Then paste the output into `ADMIN_PASSWORD_HASH`.

4. Run the app
   `npm run dev`

5. Open:
   - Public site: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin/login`

Content System
--------------

Editable content lives in:
- `content/homepage.json`
- `content/clubs.json`
- `content/tournaments.json`
- `content/memberships.json`
- `content/sponsors.json`
- `content/gallery.json`
- `content/events.json`
- `content/site-settings.json`
- `content/booking-requests.json`
- `content/event-inquiries.json`
- `content/rankings.json`

Uploads are saved to:
- `public/uploads/clubs`
- `public/uploads/gallery`
- `public/uploads/tournaments`
- `public/uploads/sponsors`
- `public/uploads/branding`

Admin Routes
------------

- `/admin/login`
- `/admin`
- `/admin/homepage`
- `/admin/clubs`
- `/admin/tournaments`
- `/admin/gallery`
- `/admin/memberships`
- `/admin/events`
- `/admin/sponsors`
- `/admin/settings`
- `/admin/booking-requests`

Notes
-----

- The public site reads directly from local JSON files.
- The admin writes changes back to those files through protected API routes.
- Booking is an honest premium request flow, not fake realtime availability.
- The architecture is centralized so the content layer can be migrated to a database later if needed.
