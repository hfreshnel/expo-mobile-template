// Required env vars — edit this list for your app. Keep it in sync with
// .env.example and every eas.json build profile's `env` block.
const REQUIRED_KEYS = ['EXPO_PUBLIC_API_URL'] as const;

type RequiredKey = (typeof REQUIRED_KEYS)[number];

function readRequired(): Record<RequiredKey, string> {
  const missing = REQUIRED_KEYS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    // Reported together (not fail-fast on the first one) so fixing
    // .env.local doesn't take one run per missing key.
    throw new Error(
      `Missing environment variable(s): ${missing.join(', ')}. ` +
        `Set them in .env.local (dev) or in the matching eas.json build profile.`,
    );
  }
  return Object.fromEntries(REQUIRED_KEYS.map((key) => [key, process.env[key] as string])) as Record<
    RequiredKey,
    string
  >;
}

const required = readRequired();

export const env = {
  apiUrl: required.EXPO_PUBLIC_API_URL,
  // Expo public env vars are always strings (or undefined), never booleans —
  // an exact 'true' match avoids the literal string 'false' being truthy.
  useMocks: process.env.EXPO_PUBLIC_USE_MOCKS === 'true',
  // Optional — initSentry() is a no-op until this is set.
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN || undefined,
};
