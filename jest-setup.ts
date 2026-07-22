/// <reference types="jest" />
import '@testing-library/react-native/matchers';
// msw's package.json blocks the "react-native" export condition from resolving
// msw/node, and jest-expo sets that condition to mimic Metro's module resolution
// — so Jest must use the same msw/native server the on-device app uses.
import { server } from '@/mocks/server.native';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
