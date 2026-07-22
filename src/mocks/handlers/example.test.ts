import { apiClient } from '@/api/client';

// Smoke test for the MSW wiring itself (jest-setup.ts + server.native.ts +
// polyfills.ts) — if this fails, something in the mock plumbing broke, not
// application logic.
it('serves the example /health handler through MSW', async () => {
  const response = await apiClient.get('/health');
  expect(response.data).toEqual({ status: 'ok' });
});
