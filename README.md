# Kinly

Kinly is a production-oriented Expo React Native application for private family communication and coordination. It includes phone authentication, family groups, one-to-one and group chat, media upload, calendar events, live location, expense tracking, notifications, offline cache, dark mode, Firestore security rules, and Firebase Storage rules.

## Stack

- React Native + Expo + TypeScript
- React Navigation
- TanStack Query
- Zustand
- React Native Paper
- Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase Cloud Messaging
- Expo Notifications, Location, Image Manipulator, AsyncStorage

## Project structure

```text
src/
  app/navigation/          Navigation graph and deep links
  core/                    Shared config, types, utilities
  data/firebase/           Firebase app initialization
  data/repositories/       Repository pattern around Firebase APIs
  data/storage/            Local cache and media upload adapters
  domain/entities/         Type-safe domain models
  features/                Feature-based screens, hooks, components
  presentation/            Reusable UI shell and theme
  services/                Cross-cutting services such as notifications
firebase/                  Firestore and Storage rules
docs/firebase-schema.md    Schema, indexes, queries, and cost notes
```

## Firebase setup

The app is preconfigured for project `your-project-id` in `app.json` and `src/data/firebase/firebase.ts`. Add native Firebase config files before device builds:

- Android: `google-services.json`
- iOS: `GoogleService-Info.plist`

Deploy rules with the Firebase CLI after reviewing them:

```bash
firebase deploy --only firestore:rules,storage
```

## Development

```bash
npm install
npm run typecheck
npm start
```

> `npm run typecheck` is defined at the repository root and delegates to `scripts/typecheck.mjs`, which verifies local dependencies are installed before running `tsc --noEmit`. Run it from this directory after `npm install`.


## Cost controls

See [`docs/firebase-schema.md`](docs/firebase-schema.md) for collection design, composite indexes, query examples, and explanations of Firestore/Storage cost optimizations.
