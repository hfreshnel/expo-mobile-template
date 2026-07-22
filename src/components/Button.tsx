import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { BORDER_RADIUS, LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'destructive';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  testID,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant].container,
        isDisabled && styles.disabled,
        pressed && !isDisabled && pressedStyles[variant],
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].text.color} />
      ) : (
        <Text style={[styles.label, variantStyles[variant].text]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: TYPOGRAPHY.label.fontFamily,
    fontSize: 15,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: LIGHT_PALETTE.primary },
    text: { color: LIGHT_PALETTE.textInverse },
  },
  secondary: {
    container: { backgroundColor: LIGHT_PALETTE.surfaceAlt },
    text: { color: LIGHT_PALETTE.textPrimary },
  },
  destructive: {
    container: { backgroundColor: LIGHT_PALETTE.error },
    text: { color: LIGHT_PALETTE.textInverse },
  },
};

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: LIGHT_PALETTE.primaryDark },
  secondary: { opacity: 0.7 },
  destructive: { opacity: 0.85 },
});
