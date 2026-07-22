import './polyfills';
import { setupServer } from 'msw/native';
import { exampleHandlers } from './handlers';

// Add new handler modules to this array as features grow — keep fixtures
// centralized under src/mocks/, not colocated per feature (this is infra,
// not business logic).
export const server = setupServer(...exampleHandlers);

export function enableMocksIfNeeded() {
  // Expo public env vars are always strings (or undefined), never booleans —
  // an exact 'true' match avoids the literal string 'false' being truthy.
  if (process.env.EXPO_PUBLIC_USE_MOCKS === 'true') {
    server.listen({ onUnhandledRequest: 'bypass' });
  }
}
