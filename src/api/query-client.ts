import axios from 'axios';
import { QueryClient, focusManager, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { AppState, type AppStateStatus } from 'react-native';

// Tune to your target network conditions — more generous than TanStack
// Query's default (3) if you expect unreliable mobile connections, but
// bounded: beyond this, an explicit error state beats an indefinite wait.
const MAX_RETRIES = 5;
const MAX_RETRY_DELAY_MS = 30_000;

function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= MAX_RETRIES) return false;
  // 4xx isn't a network problem — retrying won't change the outcome.
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status !== undefined && status < 500) return false;
  return true;
}

function retryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, MAX_RETRY_DELAY_MS);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryDelay,
    },
    mutations: {
      // No auto-retry on mutations — replaying a write that may have already
      // succeeded server-side is risky even with an idempotency key. An
      // explicit failure beats a silent retry.
      retry: false,
    },
  },
});

// Without these two, TanStack Query assumes a browser (navigator.onLine,
// window focus) and never detects an RN network drop or foreground return.
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => setOnline(!!state.isConnected));
});

function onAppStateChange(status: AppStateStatus): void {
  focusManager.setFocused(status === 'active');
}
AppState.addEventListener('change', onAppStateChange);
