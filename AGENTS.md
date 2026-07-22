# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# Architecture conventions

This is a generic starter template — infra and scaffolding, not a finished
app. Read `README.md` first for the post-scaffold checklist.

## Structure

- No `shared/` folder — flat under `src/`: `api/`, `components/`,
  `constants/`, `theme/`, `observability/`, `i18n/`, `mocks/`.
- `src/features/{domain}/` — one folder per business domain, each with its
  own `api`, `store`, and colocated components, plus a barrel `index.ts`
  (`export * from './module'`). **Always import a feature from outside via
  its barrel** (`@/features/auth`, never `@/features/auth/auth-store`) —
  enforced by `eslint-plugin-boundaries` (`eslint.config.js`), not just
  convention. Only imports between files within the same feature are exempt.
- tsconfig alias `@/*` → `./src/*` — imports never have a `src/` prefix.
- Tests are colocated (`foo.test.ts` next to `foo.ts`), no `__tests__/`.

## State management

- Zustand for all client state, colocated with its domain — no centralized
  `src/store/`.
- TanStack Query for all server state. `QueryClient` in
  `src/api/query-client.ts` wires `onlineManager`/`focusManager` to
  `NetInfo`/`AppState` (without this, TanStack Query assumes a browser and
  never detects RN network drops or foreground returns) and retries queries
  (not mutations) with backoff, skipping 4xx.
- Auth token → `expo-secure-store` (sensitive). Other persisted client prefs
  (theme mode) → `@react-native-async-storage/async-storage`. Everything else
  (toast, cart-like ephemeral state) → not persisted.

## Theme

- `src/theme/types.ts` (shape), `src/theme/light.ts` (fills the shape from
  `src/constants/theme.ts` tokens), `src/theme/theme-store.ts` (persisted
  mode), `src/theme/index.ts` (`useTheme()` hook).
- `LIGHT_PALETTE` in `constants/theme.ts` is a brand-neutral placeholder —
  swap every value for your brand's. `DARK_PALETTE` is `null` until you add
  one; treat dark mode as its own feature once core flows work, not a
  day-one requirement.
- `FONT_FAMILY` values are `undefined` by default (OS default font). To add
  custom fonts: install `@expo-google-fonts/*`, load with `useFonts()` in
  `src/app/_layout.tsx`, combine its `loaded` flag into the splash-screen
  readiness check in the same file, then point `FONT_FAMILY` at the loaded
  family names. Each font weight is a distinct RN family name — don't combine
  a generic `fontFamily` with `fontWeight`.

## Generic components (`src/components/`)

`Screen`, `Button`, `Input`, `Toast` (+ `toast-store`), `ErrorBoundary`,
`SafeComponent`, `Header`, `IconButton`, `Badge`, `Chip`, `Avatar`,
`EmptyState`, `Skeleton`. None of them know about business domain data —
domain-specific cards/lists belong in `src/components/` only if reused
across multiple *unrelated* features, otherwise colocate inside the owning
feature. `Screen`'s `scroll` prop should be passed on any screen with text
inputs (renders a `ScrollView` with `keyboardShouldPersistTaps="handled"`
instead of a plain `View`) so the keyboard doesn't cover fields at the
bottom.

## Auth

`src/features/auth/auth-store.ts` only handles token get/set/clear +
hydration — no OAuth exchange. `use-oauth-pkce.ts` is an unwired skeleton
for a real OAuth2/PKCE flow (Keycloak, Auth0, Cognito, any OIDC provider)
via `expo-auth-session`; `(auth)/login.tsx` currently bypasses it with a
mock token. For a real backend, also add a request/response interceptor on
`api/client.ts` that attaches the token and queues concurrent requests
during a refresh (a `failQueue` array flushed/rejected once the refresh
settles) to avoid a refresh-storm loop.

### Cold start

`SplashScreen.preventAutoHideAsync()` at module load in `_layout.tsx`;
`isReady = isHydrated` (combine with a fonts-loaded flag if you add custom
fonts) gates both hiding the splash screen and rendering the `Stack` —
return `null` until ready, then `router.replace()` to `(tabs)` or
`(auth)/login` based on auth status.

## i18n

`src/i18n/index.ts` — single language (`en`) fixed via `lng`, not detected.
To add a language: new file in `locales/`, register it in `resources`,
replace the fixed `lng` with device-locale detection (`expo-localization`)
and/or a persisted user preference.

## Observability

`src/observability/logger.ts` is the single entry point for all app
logging — never call `console.log` directly from feature code. `warn`/
`error` also forward to Sentry (`sentry.ts`) if `EXPO_PUBLIC_SENTRY_DSN` is
set; both are no-ops otherwise.

## Mocking a backend that isn't ready (MSW)

`src/mocks/server.native.ts` uses **`msw/native`**, not `msw/node` — `msw`'s
package.json blocks the `react-native` export condition from resolving
`msw/node`, and `jest-expo` sets that condition to mimic Metro's resolution,
so Jest is forced through `msw/native` too, same as the on-device app.

- `src/mocks/polyfills.ts` stands in minimal versions of browser globals
  Hermes doesn't provide (`MessageEvent`/`Event`/`EventTarget`/
  `BroadcastChannel`/`XMLHttpRequestUpload`) that `@mswjs/interceptors`
  assumes exist, plus a guard on `XMLHttpRequest.getAllResponseHeaders()`
  (RN returns `null`, not `""`, when never populated — true for MSW's
  synthetic responses; `@mswjs/interceptors` calls `.split()` on it
  unguarded). If a new Hermes/`@mswjs/interceptors` crash shows up, same
  strategy: a minimal stand-in here, never a fork/patch of `node_modules`.
- `jest.config.js` extends `transformIgnorePatterns` and adds a `.mjs`
  transform: `msw/native` depends on ESM-only transitive deps (e.g.
  `rettime`) that Jest ignores by default in `node_modules`.
- **Jest does not load `.env.local`** (`@expo/env` intentionally skips it
  under `NODE_ENV=test`, mirroring Next.js) — `jest-env-setup.js`
  (`setupFiles` in `jest.config.js`, which runs *before* `setupFilesAfterEnv`)
  sets required `EXPO_PUBLIC_*` vars directly so `src/constants/env.ts`
  doesn't throw on import during tests. Keep it in sync with
  `REQUIRED_KEYS` in `env.ts`.
- Gate mocks with `EXPO_PUBLIC_USE_MOCKS=true`, present only in the
  `development` `eas.json` profile / local `.env.local` — never in
  `preview`/`production`.

## Env vars

`src/constants/env.ts` validates all `REQUIRED_KEYS` at module load and
throws listing everything missing at once (not fail-fast on the first one).
Import it for its side effect at the very top of `_layout.tsx`. Keep
`.env.example`, `eas.json`'s per-profile `env` blocks, and `REQUIRED_KEYS`
in sync.

## OTA / EAS

`runtimeVersion.policy: "appVersion"` in `app.json` — an OTA update can only
reach installs on the same native `version`; a native change requires a
version bump + rebuild, not just a republish. `updates.checkAutomatically:
"ON_LOAD"` + `fallbackToCacheTimeout: 0` checks at startup without blocking
it. `updates.url`/`extra.eas.projectId` are placeholders
(`TODO-run-eas-init`) until `eas init` generates real ones.

## Misc gotchas

- Expo Router's typed routes (`.expo/types/router.d.ts`, gitignored)
  regenerate only via `expo start`/`expo export`, not `tsc` alone. After
  adding a new screen, `npx tsc --noEmit` can fail on the new route path
  even though the code is correct — run `expo start` for a few seconds (or
  `npx expo export --platform web --output-dir <tmp>`) once to regenerate
  the cache before re-checking.
- `10.0.2.2` (used in `eas.json`'s `development` profile) is the Android
  emulator's alias for the host machine's `localhost` — use it, not
  `localhost`, when pointing the dev client at a locally-running backend.
