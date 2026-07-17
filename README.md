# Kyagulanyi Ministries Platform

A production-oriented ministry and nonprofit platform composed of a Next.js 15 frontend and Strapi 5 CMS.

## Applications

- `frontend/` — Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, Axios, React Hook Form and Zod.
- `backend/` — Strapi 5 CMS with ministry content models and SQLite for local development.
- `strapi/` — upstream Strapi source checkout used during initial setup; it is not the application CMS.

## Local development

Start Strapi:

```bash
cd backend
npm run develop
```

Create the first administrator at <http://localhost:1337/admin>.

In a second terminal, start Next.js:

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## CMS content model

Public/editorial models include Programs, Projects, Events, Campaigns, Impact Stories, Sermons, Team Members, Partners, Pages, Reports and Site Settings. Operational models include Volunteer Applications, Prayer Requests, Contact Submissions and Newsletter Subscribers. Sensitive submission fields are marked private.

Strapi denies public API access by default. In **Settings → Users & Permissions → Roles → Public**, enable only `find` and `findOne` for public editorial content. For forms, expose narrowly scoped create endpoints only after rate limiting, CAPTCHA and notification handling are configured.

## PostgreSQL production configuration

The backend already supports PostgreSQL through environment variables. Set:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=kyagulanyi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=replace-with-a-strong-secret
DATABASE_SSL=false
```

The root `docker-compose.yml` provides a PostgreSQL 16 service for development or a single-server deployment. Do not commit production secrets.

## Build

```bash
cd backend && NODE_OPTIONS=--max-old-space-size=2048 npm run build
cd ../frontend && npm run build
```

For Vercel, deploy `frontend/` as the project root and set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_STRAPI_URL`. Deploy Strapi separately on an Ubuntu VPS with PostgreSQL, persistent media storage, HTTPS, backups and a process manager such as systemd or PM2.

The Nginx example is at `deploy/nginx/kyagulanyi-ministries.conf`.

## Production items requiring organization decisions

- Confirm official brand assets, contact details, ministry copy and photography rights.
- Select a payment provider and provide merchant credentials before donations can be processed.
- Select SMTP/newsletter providers and configure transactional notifications.
- Add CAPTCHA and rate limiting before enabling anonymous submissions.
- Establish privacy, safeguarding, retention, financial approval and content publishing policies.

