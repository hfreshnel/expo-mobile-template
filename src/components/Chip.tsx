import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { BORDER_RADIUS, LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Chip({ label, selected = false, onPress, style, testID }: Props) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: LIGHT_PALETTE.surfaceAlt,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selected: {
    backgroundColor: LIGHT_PALETTE.primaryLight,
    borderColor: LIGHT_PALETTE.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontSize: 12,
    fontWeight: '600',
    color: LIGHT_PALETTE.textPrimary,
  },
  labelSelected: {
    color: LIGHT_PALETTE.primary,
  },
});
