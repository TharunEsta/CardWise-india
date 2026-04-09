# CardWise India

Premium 3D credit card discovery and comparison platform for Indian users, built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP-ready animation hooks, Lenis, React Three Fiber, Supabase, PostHog, and Resend.

## Highlights

- Free-to-use product model with no billing, subscriptions, checkout, or payment gateways
- Public browsing for homepage, banks, cards, search, and comparison
- Login-only actions for save, reviews, comments, callback, and free eBook flows
- 40+ Indian banks and 120+ seeded cards in a reusable data architecture
- Premium 3D homepage hero, layered featured card section, immersive card detail pages
- Admin dashboard routes for content operations, leads, analytics, search insights, reviews, comments, and eBooks
- Supabase schema for users, banks, cards, benefits, fees, eligibility, comments, reviews, events, downloads, search logs, leads, and eBooks

## Folder structure

- `app/` App Router pages, layouts, loading UI, and API routes
- `components/` shared premium UI, card surfaces, hero scene, admin shell, search, auth modal
- `lib/` data model, utilities, environment parsing, analytics, auth helpers, Supabase helpers, email helper
- `supabase/schema.sql` PostgreSQL schema and starter RLS policies
- `scripts/seed.ts` seed snapshot generator

## Getting started

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill in Supabase, PostHog, Resend, and admin email variables
4. Run `npm run dev`
5. Apply `supabase/schema.sql` in your Supabase SQL editor
6. Run `npm run db:seed` to generate a seed snapshot file

## Production notes

- Replace the in-memory dataset in `lib/data.ts` with Supabase queries and admin mutations
- Connect auth modal actions to Supabase Google OAuth
- Replace the simple `middleware.ts` cookie guard with validated Supabase session and admin-role checks
- Persist analytics events from PostHog client + `/api/events` into `user_events` and `search_logs`
- Upload the free eBook PDF to Supabase Storage and store the active file URL in `ebooks`
- Add proper shadcn/ui generated primitives if you want the full registry workflow
- Validate issuer/card data on an editorial schedule before deployment
"# CardWise-india" 
