import { http, HttpResponse } from 'msw';
import { env } from '@/constants/env';

// Delete this once real handlers exist — it only proves the MSW wiring works
// end to end (Jest + on-device, cf. server.native.ts).
export const exampleHandlers = [
  http.get(`${env.apiUrl}/health`, () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
