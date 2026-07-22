import type { ReactNode } from 'react';

// Wiring point for a real auth provider (context exposing login()/logout(),
// wrapping a PKCE exchange or SDK init) once you have one. auth-store.ts
// already handles token storage/hydration; this stays a passthrough until
// there's provider-specific setup to do here.
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
