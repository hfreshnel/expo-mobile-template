// msw/native references MessageEvent/Event/EventTarget/BroadcastChannel/
// XMLHttpRequestUpload, browser globals Hermes doesn't provide — it crashes at
// import time (or, for XMLHttpRequestUpload, on the first intercepted XHR
// request — `@mswjs/interceptors` does `target instanceof XMLHttpRequestUpload`
// with no `typeof` guard in its event trigger path) without these. Minimal
// stand-ins are enough since msw/native only needs them to exist, not to
// implement the full DOM event contract. See https://github.com/mswjs/mswjs.io/issues/453.
type PolyfillableGlobal = 'MessageEvent' | 'Event' | 'EventTarget' | 'BroadcastChannel' | 'XMLHttpRequestUpload';

const globalRecord = globalThis as unknown as Record<PolyfillableGlobal, unknown>;
const polyfillableGlobals: PolyfillableGlobal[] = [
  'MessageEvent',
  'Event',
  'EventTarget',
  'BroadcastChannel',
  'XMLHttpRequestUpload',
];

for (const name of polyfillableGlobals) {
  if (typeof globalRecord[name] === 'undefined') {
    globalRecord[name] = class {
      type: string;
      constructor(type: string, eventInitDict?: Record<string, unknown>) {
        this.type = type;
        Object.assign(this, eventInitDict);
      }
    };
  }
}

// RN's XMLHttpRequest.getAllResponseHeaders() returns null when
// `responseHeaders` was never populated (see
// react-native/Libraries/Network/XMLHttpRequest.js) — true for MSW's
// synthetic/mocked responses. @mswjs/interceptors calls `.split()` on the
// result unguarded, assuming the spec-compliant "" rather than null, and
// crashes. Wrap it so it never returns null.
// `typeof XMLHttpRequest === 'undefined'` under Jest (jest-expo's environment
// never installs the global, unlike the on-device Hermes runtime) — guard so
// the test suite doesn't crash on a global that genuinely isn't there.
if (typeof XMLHttpRequest !== 'undefined') {
  type XHRWithHeaders = { getAllResponseHeaders(): string | null };
  const xhrProto = XMLHttpRequest.prototype as unknown as XHRWithHeaders;
  const originalGetAllResponseHeaders = xhrProto.getAllResponseHeaders;
  xhrProto.getAllResponseHeaders = function (this: XHRWithHeaders) {
    return originalGetAllResponseHeaders.call(this) ?? '';
  };
}

// If a new @mswjs/interceptors/Hermes crash shows up (a different missing
// global, or another XMLHttpRequest method with a contract that diverges
// from RN's), same strategy: a minimal stand-in here, never a fork/patch of
// node_modules.
