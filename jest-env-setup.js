// Jest does not load .env.local under NODE_ENV=test (Expo's @expo/env
// intentionally skips it in test, mirroring Next.js) — set required
// EXPO_PUBLIC_* vars here instead so src/constants/env.ts doesn't throw on
// import. Keep this list in sync with REQUIRED_KEYS in src/constants/env.ts.
process.env.EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
