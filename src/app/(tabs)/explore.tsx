import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { apiClient } from '@/api/client';
import Button from '@/components/Button';
import Screen from '@/components/Screen';
import { useToastStore } from '@/components/toast-store';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useAuthStore } from '@/features/auth';

// Demonstrates the pieces wired together: TanStack Query + axios hitting the
// MSW-mocked /health endpoint (src/mocks/handlers/example.ts), the toast
// store, and auth logout. Safe to delete once you have real screens.
export default function ExploreScreen() {
  const show = useToastStore((state) => state.show);
  const clearToken = useAuthStore((state) => state.clearToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => (await apiClient.get<{ status: string }>('/health')).data,
  });

  return (
    <Screen scroll>
      <View style={styles.container}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.body}>
          {isLoading && 'Checking API…'}
          {error && 'API request failed — is EXPO_PUBLIC_USE_MOCKS set?'}
          {data && `API says: ${data.status}`}
        </Text>
        <Button title="Show a toast" onPress={() => show('Hello from the toast store')} />
        <Button title="Log out" variant="secondary" onPress={() => clearToken()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    gap: SPACING.m,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: LIGHT_PALETTE.textPrimary,
  },
  body: {
    ...TYPOGRAPHY.body,
    color: LIGHT_PALETTE.textSecondary,
  },
});
