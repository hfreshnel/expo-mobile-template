import { captureException, captureMessage, isSentryEnabled } from './sentry';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const COLORS: Record<LogLevel, string> = {
  debug: '\x1b[90m',
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};
const RESET = '\x1b[0m';

function print(level: LogLevel, message: string, ...args: unknown[]) {
  const tag = `[${level.toUpperCase()}]`;
  const prefix = __DEV__ ? `${COLORS[level]}${tag}${RESET}` : tag;
  const line = `${prefix} ${message}`;

  switch (level) {
    case 'debug':
      console.debug(line, ...args);
      return;
    case 'info':
      console.info(line, ...args);
      return;
    case 'warn':
      console.warn(line, ...args);
      return;
    case 'error':
      console.error(line, ...args);
      return;
  }
}

// Single entry point for all app logging — never call console.log directly
// from feature code.
export const logger = {
  debug(message: string, meta?: Record<string, unknown>) {
    if (!__DEV__) return;
    print('debug', message, meta ?? '');
  },

  info(message: string, meta?: Record<string, unknown>) {
    print('info', message, meta ?? '');
  },

  warn(message: string, meta?: Record<string, unknown>) {
    print('warn', message, meta ?? '');
    if (isSentryEnabled()) {
      captureMessage(message, 'warning');
    }
  },

  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    print('error', message, error ?? '', meta ?? '');
    if (isSentryEnabled()) {
      captureException(error ?? new Error(message), { message, ...meta });
    }
  },
};
