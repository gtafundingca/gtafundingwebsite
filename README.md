# GTA Funding Website

Marketing website and lead capture platform for GTA Funding, built with Next.js App Router.

## Tech stack

- Next.js 16 (App Router, Turbopack in dev)
- React 19 + TypeScript
- Tailwind CSS 4
- Supabase (optional persistent storage)
- Resend (optional lead email notifications)

## Features

- Public landing page with service sections and contact channels
- Apply form endpoint (`/api/apply`)
- Contact form endpoint (`/api/contact`)
- Admin login and contact inbox (`/admin`, `/admin/login`, `/admin/contacts`)
- Storage fallback to local JSON files in `data/` when Supabase is not configured

## Requirements

- Node.js 20+
- `pnpm` 10+

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Create a local env file:

```bash
touch .env.local
```

3. Start the app:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Add these in `.env.local` for local use and in your hosting provider for production.

### Core

- `NEXT_PUBLIC_SITE_URL` - public site URL used in metadata (example: `https://gtafunding.ca`)

### Admin auth

- `ADMIN_LOGIN_ID` - admin username/login id
- `ADMIN_PASSWORD` - admin password
- `ADMIN_SESSION_SECRET` - secret used to sign admin session token

### Supabase (optional, recommended for production)

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

If both are missing, submissions are stored in local files:

- `data/contact-submissions.json`
- `data/apply-submissions.json`

### Resend (optional email notifications)

- `RESEND_API_KEY`
- `CONTACT_RESEND_FROM`
- `CONTACT_RESEND_TO`

If these are not set, contact submissions are still saved, but email notifications are skipped.

## Scripts

- `pnpm dev` - run development server
- `pnpm build` - build for production
- `pnpm start` - start production server
- `pnpm lint` - run ESLint

## API routes

- `POST /api/contact` - submit contact form lead
- `POST /api/apply` - submit funding application
- `POST /api/admin/login` - create admin session cookie
- `POST /api/admin/logout` - clear admin session cookie
- `PATCH /api/admin/contacts/[id]` - mark lead completed/incomplete
- `DELETE /api/admin/contacts/[id]` - soft-delete lead

## Deployment

The project is ready for Vercel deployment.

1. Add all required environment variables in project settings.
2. Use `pnpm build` as the build command (default for Next.js projects).
3. Ensure Supabase tables are created before using admin inbox in production.
