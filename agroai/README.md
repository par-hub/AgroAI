# AgroAI — Flutter Mobile App

This directory contains the Flutter mobile application for the AgroAI cattle-breed project.

## Structure

- `lib/main.dart` — initializes Flutter and Supabase, then launches the app.
- `lib/screens/` — application screens.
- `lib/services/` — app service integrations.
- `lib/models/` — data models.
- `lib/widgets/` — reusable UI widgets.
- `lib/utils/constants.dart` — shared constants and Supabase setup.

## Run locally

Install Flutter and configure the Supabase project settings used by the app. From this directory:

```bash
flutter pub get
flutter run
```

Before using a personal deployment, verify the URL and public client key in the Supabase configuration and enforce appropriate Row Level Security policies. Never put a Supabase service-role key in a client application.

## Parent project

See the [AgroAI repository README](../README.md) for the web application, project layout, and current detection-flow status.

## Technology

Flutter · Dart · Supabase
