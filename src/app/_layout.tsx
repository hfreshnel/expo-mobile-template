import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from '@/components/ErrorBoundary';
import Toast from '@/components/Toast';
import { queryClient } from '@/api/query-client';
import '@/constants/env';
import '@/i18n';
import { useAuthStore } from '@/features/auth';
import { enableMocksIfNeeded } from '@/mocks/server.native';
import { initSentry } from '@/observability/sentry';

initSentry();
enableMocksIfNeeded();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  // If you add custom fonts later (useFonts()), combine its `loaded` flag
  // into this readiness check the same way — the splash screen should wait
  // on both, not just auth hydration.
  const isReady = isHydrated;

  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    SplashScreen.hideAsync();
    router.replace(status === 'authenticated' ? '/(tabs)' : '/(auth)/login');
  }, [isReady, status, router]);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <ErrorBoundary>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </ErrorBoundary>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
