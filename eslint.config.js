// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const boundaries = require('eslint-plugin-boundaries');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: { boundaries },
    settings: {
      // Replaces eslint-config-expo's default `node` resolver — without it,
      // eslint-plugin-boundaries doesn't understand the `@/*` tsconfig alias
      // and can't classify any file imported through it.
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
      // "feature" (folders under src/features/*) + a catch-all "source" for
      // the rest of `src/`. The catch-all is required, not just belt-and-
      // braces: eslint-plugin-boundaries only inspects a file's imports if
      // that file itself is a recognized element — without it, a bad import
      // written from `app/` or `components/` (unclassified) would be
      // silently ignored. Order matters: "feature" before "source" so files
      // under `features/*` are classified "feature", not "source".
      'boundaries/elements': [
        { type: 'feature', pattern: 'src/features/*' },
        { type: 'source', pattern: 'src/**' },
      ],
    },
    rules: {
      // Convention: always import a feature from outside via its barrel
      // (`@/features/auth`), never a file internal to it
      // (`@/features/auth/auth-store`). Only imports between files within
      // the same feature are exempt.
      //
      // Deprecated in v7 of eslint-plugin-boundaries (in favor of
      // `boundaries/dependencies` + `policies`) but still functional — kept
      // as-is since its behavior here (internal imports allowed, external
      // imports limited to index.ts) is straightforward to verify; the newer
      // `dependencies` syntax has no locally-documented example for this
      // exact case (entry-point restriction).
      'boundaries/entry-point': [
        'error',
        {
          // `default: 'allow'`, not 'disallow' — `disallow` applies to EVERY
          // (from, to) pair no policy selects, not just imports targeting a
          // feature. With only one element type ("feature") declared and
          // `default: 'disallow'`, the rest of the app's unrelated imports
          // would get blocked too. Only the policy below (targeting
          // `feature` specifically) should restrict anything.
          default: 'allow',
          policies: [{ target: ['feature'], disallow: '!(index.ts)' }],
        },
      ],
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
