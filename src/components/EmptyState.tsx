import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';
import Button from './Button';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

// Doubles as the empty AND error state — pass a "Retry" actionLabel for
// errors, a "Create one" actionLabel (or nothing) for genuinely empty lists.
export default function EmptyState({ icon, title, description, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} variant="secondary" style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: LIGHT_PALETTE.textPrimary,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.body,
    color: LIGHT_PALETTE.textSecondary,
    textAlign: 'center',
  },
  action: {
    marginTop: SPACING.m,
  },
});
