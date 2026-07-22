# Expo Mobile Template

A starter Expo Router app pre-wired with the infra every app needs, and none
of the business logic. Scaffold a new project with:

```
npx create-expo-app my-app --template github.com/hfreshnel/expo-mobile-template
```

`create-expo-app` handles renaming the app (`app.json`'s `name`/`slug`/
`scheme`) to match your project folder automatically — see the checklist
below for what it *doesn't* handle.

## What's included

- Expo Router (typed routes, React Compiler) with a two-tab `(tabs)` group
  and an `(auth)/login` route, gated by a cold-start splash screen.
- Zustand for client state, TanStack Query for server state (retry/online/
  focus-aware `QueryClient` in `src/api/query-client.ts`).
- A small generic component library (`Screen`, `Button`, `Input`, `Toast`,
  `ErrorBoundary`, `SafeComponent`, `Header`, `IconButton`, `Badge`, `Chip`,
  `Avatar`, `EmptyState`, `Skeleton`) and a theme system
  (`src/theme`, `src/constants/theme.ts`) with a brand-neutral placeholder
  palette.
- Auth token storage (`expo-secure-store`) plus an OAuth2/PKCE skeleton
  (`src/features/auth/use-oauth-pkce.ts`) for wiring up a real provider.
- A logger + Sentry wrapper (`src/observability`) — no-ops until you set
  `EXPO_PUBLIC_SENTRY_DSN`.
- i18n scaffolding (i18next/react-i18next), single language by default.
- MSW (`msw/native`) for mocking a backend that isn't ready yet, shared
  between Jest and the on-device app — including the Hermes polyfills MSW
  needs on React Native (`src/mocks/polyfills.ts`) and the Jest transform
  quirks that come with it (`jest.config.js`).
- `eslint-plugin-boundaries` enforcing a barrel-only import convention for
  `src/features/*`.
- EAS Build profiles (`eas.json`) + EAS Update (OTA) wiring in `app.json`.

See `AGENTS.md` for the fuller architecture write-up (conventions, why each
piece is shaped the way it is) — useful context for both humans and coding
agents working in this repo.

## Getting started

```
npm install
cp .env.example .env.local   # fill in EXPO_PUBLIC_API_URL at minimum
npm start
```

## Post-scaffold checklist

Things `create-expo-app` can't fill in for you:

- [ ] Run `eas init` to generate a real EAS project id, then replace the
      `TODO-run-eas-init` placeholders in `app.json` (`updates.url`,
      `extra.eas.projectId`).
- [ ] Set `EXPO_PUBLIC_API_URL` (and any other required keys) in
      `.env.local` and in every `eas.json` build profile.
- [ ] Swap the placeholder colors in `src/constants/theme.ts`
      (`LIGHT_PALETTE`) for your brand's.
- [ ] Add custom fonts if you need them: install an `@expo-google-fonts/*`
      package, load it with `useFonts()` in `src/app/_layout.tsx`, and point
      `FONT_FAMILY` in `src/constants/theme.ts` at the loaded family names.
- [ ] Fill in real permission-usage strings for `expo-image-picker` in
      `app.json` if your app uses the camera/photo library.
- [ ] Wire up real auth: replace the mock-token button in
      `src/app/(auth)/login.tsx` with `useOAuthPkce()`
      (`src/features/auth/use-oauth-pkce.ts`), after setting
      `EXPO_PUBLIC_OAUTH_ISSUER_URL`/`EXPO_PUBLIC_OAUTH_CLIENT_ID`.
- [ ] Set `EXPO_PUBLIC_SENTRY_DSN` once you have a Sentry project.
- [ ] Delete `src/mocks/handlers/example.ts` and
      `src/app/(tabs)/explore.tsx`'s demo query once you have real handlers
      and screens — they only exist to prove the plumbing works.
- [ ] Update `android`/`ios` bundle identifiers in `app.json` if you need
      native builds (not set by default — this template targets managed
      workflow / EAS Build).
