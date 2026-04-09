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
- Replace the simple `middleware.ts` cookie guard with validated Supabase session and admin-role checks
- Persist analytics events from PostHog client + `/api/events` into `user_events` and `search_logs`
- Upload the free eBook PDF to Supabase Storage and store the active file URL in `ebooks`
- Add proper shadcn/ui generated primitives if you want the full registry workflow
- Validate issuer/card data on an editorial schedule before deployment

## Google OAuth setup

1. In Supabase, go to Authentication > Providers > Google and enable Google.
2. In Google Cloud Console, create an OAuth client and add Supabase's callback URL from the provider setup screen.
3. In Supabase Authentication URL settings, add these redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-VERCEL-DOMAIN.vercel.app/auth/callback`
   - your production custom domain callback URL if you use one
4. In Vercel, set:
   - `NEXT_PUBLIC_APP_URL=https://YOUR-VERCEL-DOMAIN.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`
   - `ADMIN_EMAILS=comma-separated-admin-emails`
5. Redeploy after saving env vars so the login modal can start the real OAuth flow.
"# CardWise-india" 
"# CardWise-india" 
