# PrivacyResize.com

PrivacyResize.com is a privacy-first micro-SaaS for resizing images in the browser. It supports manual crop mode, compression, format conversion, batch ZIP export, Firebase-backed saved presets, and SEO-friendly preset landing pages for long-tail search traffic.

## What’s included

- Next.js 16 App Router app with strict TypeScript
- Client-side image resizing, fit/fill/crop modes, compression, and ZIP export
- Public marketing pages plus SEO preset pages and exact-size pages
- Firebase Auth with Google sign-in and anonymous guest mode
- Firestore persistence for users, saved presets, usage history, feedback, blog drafts scaffold, and admin-managed SEO presets
- Firebase Storage wiring reserved for admin/demo assets only
- Firebase App Hosting deployment config
- Robots, sitemap, canonical metadata, Open Graph, Twitter cards, SoftwareApplication schema, FAQ schema, and internal linking
- Firestore rules, indexes, storage rules, seed script, and admin claim script

## Core product behavior

- Image processing is local-first by default. Uploaded images are not sent to a backend just to resize, crop, compress, or export them.
- Firebase persists metadata only: saved preset configs, favorites, usage events, feedback, and shared SEO content.
- Ads are scaffolded behind `NEXT_PUBLIC_ENABLE_ADS=false` and are not placed inside UX-critical controls.

## Tech stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Firebase Web SDK + Firebase Admin SDK
- Firestore, Auth, Storage
- Zod
- React Hook Form
- JSZip
- pica
- Vitest + Testing Library
- Playwright smoke scaffolding

## Main routes

- `/`
- `/tool`
- `/pricing`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/blog`
- `/presets`
- `/resize-image-for-[slug]` via rewrite to `/presets/[slug]`
- `/resize-image-[width]x[height]` via rewrite to `/sizes/[dimensions]`
- `/dashboard` noindex
- `/admin/seo-presets` noindex

## Project structure

```text
app/
components/
data/
e2e/
lib/
scripts/
tests/
types/
apphosting.yaml
firebase.json
firestore.rules
firestore.indexes.json
storage.rules
```

## Exact environment variables

Create `.env.local` from `.env.example` and fill these values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_ENABLE_ADS=false
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

Notes:

- `NEXT_PUBLIC_*` values come from your Firebase Web App settings.
- `FIREBASE_ADMIN_*` values come from a Firebase service account with Firestore/Auth admin access.
- `FIREBASE_ADMIN_PRIVATE_KEY` must preserve line breaks. In env files and App Hosting secrets, store it with escaped `\n` characters.

## Local setup

1. Use `pnpm` through Corepack if available.
   Recommended:
   `corepack prepare pnpm@10.33.0 --activate`
2. Install dependencies:
   `pnpm install`
3. Copy envs:
   `cp .env.example .env.local`
4. Start the app:
   `pnpm dev`
5. Open `http://localhost:3000`

If Corepack is blocked in your shell, `npx pnpm@10.33.0 install` also works.

## Firebase setup

### 1. Create the Firebase project

1. Open the Firebase console.
2. Create a project for PrivacyResize.com.
3. Add a Web App to that project.
4. Copy the Web App config values into `.env.local`.

### 2. Enable authentication

1. In Firebase Console, go to Authentication.
2. Enable `Google` as a provider.
3. Enable `Anonymous` sign-in.
4. Add your production domain and local dev domain to the authorized domains list.

### 3. Enable Firestore

1. Create a Firestore database in Native mode.
2. Deploy the included rules and indexes:
   `firebase deploy --only firestore`

Collections used by the app:

- `users`
- `savedPresets`
- `seoPresets`
- `feedback`
- `toolUsage`
- `blogDrafts`

### 4. Enable Storage

1. Create the default Storage bucket.
2. Deploy storage rules:
   `firebase deploy --only storage`

Storage is reserved for admin/demo assets such as site assets or example files. The normal image-resize workflow does not upload user images.

### 5. Configure admin credentials

1. Create a service account in Firebase project settings.
2. Set `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, and `FIREBASE_ADMIN_PRIVATE_KEY`.
3. Assign the first admin claim:
   `pnpm admin:set-claim you@example.com`

This enables the protected `/admin/seo-presets` screen.

### 6. Seed shared SEO presets

To copy the launch preset library into Firestore:

```bash
pnpm seed:seo
```

The public app still works without this step because local seed data is bundled in the repo. Seeding is useful when you want Firestore-managed overrides and new shared preset pages.

## Firebase App Hosting deployment

### 1. Update tooling

If you want local-source App Hosting rollouts, use `firebase-tools >= 14.4.0`.

### 2. Prepare the Firebase backend

1. In Firebase Console, open App Hosting.
2. Create an App Hosting backend.
3. Choose your region and connect the Firebase project.

### 3. Connect GitHub or deploy from local source

GitHub-connected flow:

1. Push this repo to GitHub.
2. Connect the repo in App Hosting.
3. Set the production branch.
4. Add all required env vars and secrets in the App Hosting backend settings.

Local-source flow:

1. Install `firebase-tools >= 14.4.0`.
2. Authenticate with `firebase login`.
3. Link the project with `firebase use --add`.
4. Deploy through the App Hosting workflow described in Firebase’s App Hosting docs.

### 4. Set production environment variables

Add every variable from `.env.example` to the App Hosting backend. Use secrets for the `FIREBASE_ADMIN_*` values.

### 5. Roll out

1. Confirm Auth providers are enabled.
2. Confirm Firestore and Storage rules are deployed.
3. Confirm admin claim is set on your admin account.
4. Confirm `NEXT_PUBLIC_SITE_URL` matches the production domain.
5. Roll out the backend.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm format
pnpm format:write
pnpm seed:seo
pnpm admin:set-claim <uid-or-email>
```

Notes:

- `pnpm build` uses `next build --webpack` intentionally for predictable builds in restricted environments.
- `pnpm test:e2e` requires Playwright browsers to be installed separately.

## SEO system

- Canonical public URLs use rewrites:
  - `/resize-image-for-[slug]`
  - `/resize-image-[width]x[height]`
- `robots.ts` allows public pages and blocks `/dashboard` and `/admin`
- `sitemap.ts` includes public routes, seeded preset pages, exact-size pages, and Firestore-backed preset slugs when admin credentials are available
- Dynamic pages use `generateMetadata`
- JSON-LD includes `SoftwareApplication`, `FAQPage`, and `BreadcrumbList`

## Admin flow

- `/admin/seo-presets` is visible only to Firebase users with `admin: true` custom claims
- Admins can create or update shared `seoPresets` entries in Firestore
- Public preset pages use local seed content by default and can read Firestore overrides/extensions on the server

## Validation status

The repo is designed to pass:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

If you change Firebase rules, route patterns, or environment handling, rerun all four before deploying.
