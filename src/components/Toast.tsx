import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS, LIGHT_PALETTE, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useToastStore, type ToastVariant } from './toast-store';

export default function Toast() {
  const message = useToastStore((state) => state.message);
  const variant = useToastStore((state) => state.variant);
  const visible = useToastStore((state) => state.visible);
  const hide = useToastStore((state) => state.hide);
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      pointerEvents="box-none"
      style={[styles.container, { top: insets.top + SPACING.m }]}
    >
      <Pressable onPress={hide} style={[styles.content, variantStyles[variant]]}>
        <Text style={styles.message}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SPACING.l,
    right: SPACING.l,
  },
  content: {
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    ...SHADOWS.md,
  },
  message: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    color: LIGHT_PALETTE.textInverse,
    textAlign: 'center',
  },
});

const variantStyles: Record<ToastVariant, ViewStyle> = {
  success: { backgroundColor: LIGHT_PALETTE.success },
  error: { backgroundColor: LIGHT_PALETTE.error },
  info: { backgroundColor: LIGHT_PALETTE.textPrimary },
};
