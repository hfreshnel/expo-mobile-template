const jestExpoPreset = require('jest-expo/jest-preset');

module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest-env-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  // msw (via msw/native) pulls in ESM-only transitive deps (e.g. rettime) that
  // ship as .mjs with no CommonJS build. jest-expo's default transform only
  // matches .js/.ts(x), so .mjs is never transformed regardless of
  // transformIgnorePatterns — reuse the same babel config jest-expo already
  // applies to .ts/.tsx files for .mjs too.
  transform: {
    ...jestExpoPreset.transform,
    '\\.mjs$': jestExpoPreset.transform['\\.[jt]sx?$'],
  },
  // Extends jest-expo's own default rather than replacing it (same escaped-
  // backslash Windows path separators it uses) so rettime's .mjs gets to the
  // transform step above instead of being skipped as plain node_modules.
  transformIgnorePatterns: [
    '\\\\node_modules\\\\(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry\\\\react-native|native-base|standard-navigation|rettime|@open-draft|until-async))',
    '\\\\node_modules\\\\react-native-reanimated\\\\plugin\\\\',
    '\\\\node_modules\\\\@react-native\\\\babel-preset\\\\',
  ],
};
