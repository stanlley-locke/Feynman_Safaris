# Feynman Safaris Platform

Feynman Safaris is a full-stack Next.js application for running a safari business:

- public marketing site with destination pages and planning inquiries
- admin control center for destinations, bookings, customers, stays, transport, messages, reviews, blog posts, and users
- SQLite-backed API layer powered by Drizzle ORM

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Drizzle ORM
- SQLite
- Vitest + Playwright (configured)

## Project Structure

```txt
src/
  app/
    admin/                 # Admin login and dashboard pages
    api/                   # Server route handlers
    destinations/          # Public destinations list + detail pages
    journal/               # Public blog pages
  components/              # Shared UI/layout components
  db/                      # Drizzle database setup and schema
public/
  assets/                  # Local images/video assets
prisma/                    # Prisma schema/migrations (legacy/mixed tooling)
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint checks
- `npm run test` - run unit tests
- `npm run test:watch` - run tests in watch mode

## Admin Access (Current Local Mock)

The admin login currently uses a temporary client-side credential check.

- email: `admin@feynmansafaris.com`
- password: `feynman2026`

After login, a simple cookie (`admin_session=true`) is set and used for access checks in the admin layout.

## Key Features

### Public Site

- destination listing and detail pages
- destination itinerary rendering
- “Start Planning” inquiry flow on destination pages
- journal/blog listing

### Admin Dashboard

- destination management with itinerary editing
- bookings CRUD actions + CSV export
- customers CRUD actions + CSV export
- accommodations and transport management
- messages and reviews moderation
- blog and user management

## API Overview

The application uses route handlers under `src/app/api`.

Main endpoints include:

- `GET/POST/PATCH/DELETE /api/destinations`
- `GET /api/destinations/[slug]`
- `GET/POST/PATCH/DELETE /api/bookings`
- `GET /api/bookings/export` (CSV)
- `GET/POST/PATCH/DELETE /api/customers`
- `GET /api/customers/export` (CSV)
- `GET/POST/PATCH/DELETE /api/accommodations`
- `GET/POST/PATCH/DELETE /api/transport`
- `GET/POST/PATCH/DELETE /api/messages`
- `GET/POST/PATCH/DELETE /api/reviews`
- `GET/POST/PATCH/DELETE /api/blog`
- `GET/POST/PATCH/DELETE /api/users`
- `GET /api/stats`

## Notes

- The repo contains a mix of legacy files from earlier scaffolding and the active Next.js app.
- Some features are intentionally mock/simple right now (notably admin authentication), and should be replaced with real auth/session management for production.

## Production Recommendations

- replace mock admin login with real auth (NextAuth/Auth.js or custom session backend)
- add server-side authorization checks on all admin APIs
- move secrets to environment variables and avoid committing sensitive files
- add audit logging for admin actions
- add endpoint tests for critical admin workflows
