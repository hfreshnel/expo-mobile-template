import * as AuthSession from 'expo-auth-session';
import { useAuthStore } from './auth-store';

// Skeleton for a real OAuth2/PKCE login (Keycloak, Auth0, Cognito, any OIDC
// provider) using expo-auth-session. Not wired up by default — fill in the
// discovery/client-id env vars and call `login()` from your login screen.
//
//   const discovery = { authorizationEndpoint, tokenEndpoint }
//     — or AuthSession.useAutoDiscovery(issuerUrl) if the provider exposes
//     /.well-known/openid-configuration.

const CLIENT_ID = process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID;
const ISSUER_URL = process.env.EXPO_PUBLIC_OAUTH_ISSUER_URL;

export function useOAuthPkce() {
  const discovery = AuthSession.useAutoDiscovery(ISSUER_URL ?? '');
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID ?? '',
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    },
    discovery,
  );

  async function login() {
    if (!discovery || !request) return;
    const result = await promptAsync();
    if (result.type !== 'success' || !result.params.code) return;

    const tokenResult = await AuthSession.exchangeCodeAsync(
      {
        clientId: CLIENT_ID ?? '',
        code: result.params.code,
        redirectUri,
        extraParams: request.codeVerifier ? { code_verifier: request.codeVerifier } : undefined,
      },
      discovery,
    );

    if (tokenResult.accessToken) {
      await useAuthStore.getState().setToken(tokenResult.accessToken);
    }
  }

  return { login, ready: !!discovery && !!request };
}
