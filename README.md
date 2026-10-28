# AgroAI — Cattle Breed Detection

AgroAI is a cattle-breed identification project with a **Next.js web interface** and a **Flutter mobile application** in the `agroai/` directory.

## Repository map

- `app/` — Next.js pages for the landing page, breed information, image upload, and result display.
- `components/`, `hooks/`, `lib/`, `styles/` — shared web UI and styling.
- `agroai/` — Flutter mobile app, including screens, services, models, and utilities.
- `supabase_schema.sql` — SQL schema used for the Supabase data layer.

## Run the web app

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (normally `http://localhost:3000`). For a production build:

```bash
npm run build
npm run start
```

## Run the Flutter app

```bash
cd agroai
flutter pub get
flutter run
```

Review `agroai/lib/utils/constants.dart` and the Supabase configuration before running against your own project. Do not commit privileged keys.

## Current implementation note

The web upload flow in `app/detect/page.tsx` currently simulates analysis and the results page uses sample breed data. This means the current web flow is a **UI prototype**, not proof of live inference. Connect and validate a model/API before presenting uploaded-image predictions as real model outputs.

## Technology

Next.js · React · TypeScript · Tailwind CSS · Flutter · Dart · Supabase

---

This README documents the current repository structure; verify the app and backend/model integration independently before deployment.
