import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { LIGHT_PALETTE, TYPOGRAPHY } from '@/constants/theme';

type Variant = 'green' | 'accent' | 'gray' | 'red' | 'blue';

type Props = {
  label: string;
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export default function Badge({ label, variant = 'gray', style }: Props) {
  return (
    <Text style={[styles.base, variantStyles[variant], style]} numberOfLines={1}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    ...TYPOGRAPHY.label,
    fontSize: 10,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 7,
    overflow: 'hidden',
  },
});

const variantStyles: Record<Variant, TextStyle> = {
  green: { backgroundColor: LIGHT_PALETTE.primaryLight, color: LIGHT_PALETTE.primaryDark },
  accent: { backgroundColor: LIGHT_PALETTE.accentLight, color: LIGHT_PALETTE.accent },
  gray: { backgroundColor: LIGHT_PALETTE.surfaceAlt, color: LIGHT_PALETTE.textSecondary },
  red: { backgroundColor: LIGHT_PALETTE.errorLight, color: LIGHT_PALETTE.error },
  blue: { backgroundColor: LIGHT_PALETTE.infoLight, color: LIGHT_PALETTE.info },
};
