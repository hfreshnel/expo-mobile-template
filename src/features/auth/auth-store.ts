import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

export const SECURE_STORE_TOKEN_KEY = 'app_auth_token';

export type AuthStatus = 'idle' | 'hydrating' | 'authenticated' | 'unauthenticated';

interface AuthState {
  token: string | null;
  status: AuthStatus;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  status: 'idle',
  isHydrated: false,

  hydrate: async () => {
    if (get().status !== 'idle') return;
    set({ status: 'hydrating' });
    const token = await SecureStore.getItemAsync(SECURE_STORE_TOKEN_KEY);
    set({
      token,
      status: token ? 'authenticated' : 'unauthenticated',
      isHydrated: true,
    });
  },

  setToken: async (token: string) => {
    await SecureStore.setItemAsync(SECURE_STORE_TOKEN_KEY, token);
    set({ token, status: 'authenticated', isHydrated: true });
  },

  clearToken: async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_TOKEN_KEY);
    set({ token: null, status: 'unauthenticated', isHydrated: true });
  },
}));
