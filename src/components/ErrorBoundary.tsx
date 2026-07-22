import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { logger } from '@/observability/logger';

type FallbackRenderer = (error: Error, reset: () => void) => ReactNode;

type Props = {
  children: ReactNode;
  name?: string;
  fallback?: ReactNode | FallbackRenderer;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const label = this.props.name ? `[${this.props.name}]` : '[ErrorBoundary]';
    logger.error(`${label} caught an error`, error, { componentStack: errorInfo.componentStack });
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }

    const { fallback } = this.props;
    if (typeof fallback === 'function') {
      return fallback(error, this.reset);
    }
    if (fallback) {
      return fallback;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable style={styles.button} onPress={this.reset}>
          <Text style={styles.buttonLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: LIGHT_PALETTE.background,
    gap: SPACING.s,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: LIGHT_PALETTE.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...TYPOGRAPHY.body,
    color: LIGHT_PALETTE.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.m,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: LIGHT_PALETTE.primary,
  },
  buttonLabel: {
    ...TYPOGRAPHY.label,
    color: LIGHT_PALETTE.textInverse,
  },
});
