import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';
import IconButton from './IconButton';

type Props = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
};

export default function Header({ title, onBack, right }: Props) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <IconButton name="arrow-back" onPress={onBack} testID="header-back" />
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {right ?? <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_PALETTE.border,
  },
  spacer: {
    width: 20,
  },
  title: {
    ...TYPOGRAPHY.h2,
    flex: 1,
    color: LIGHT_PALETTE.textPrimary,
  },
});
