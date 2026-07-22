import * as Sentry from '@sentry/react-native';
import { env } from '@/constants/env';

let sentryEnabled = false;

export function initSentry() {
  if (!env.sentryDsn) {
    return; // no-op until a DSN is configured
  }

  Sentry.init({
    dsn: env.sentryDsn,
    debug: __DEV__,
    enableAutoSessionTracking: true,
  });

  sentryEnabled = true;
}

export function isSentryEnabled(): boolean {
  return sentryEnabled;
}

export function captureException(error: unknown, context?: Record<string, unknown>) {
  if (!sentryEnabled) return;
  Sentry.captureException(error, context ? { extra: context } : undefined);
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (!sentryEnabled) return;
  Sentry.captureMessage(message, level);
}
