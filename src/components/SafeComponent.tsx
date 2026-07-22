import { Suspense, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LIGHT_PALETTE, SPACING } from '@/constants/theme';

type Props = {
  children: ReactNode;
  name?: string;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  loadingFallback?: ReactNode;
};

export default function SafeComponent({ children, name, fallback, loadingFallback }: Props) {
  return (
    <ErrorBoundary name={name} fallback={fallback}>
      <Suspense fallback={loadingFallback ?? <DefaultLoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

function DefaultLoadingFallback() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={LIGHT_PALETTE.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
});
