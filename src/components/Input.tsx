import { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { BORDER_RADIUS, LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = forwardRef<TextInput, Props>(function Input(
  { label, error, style, onFocus, onBlur, multiline, ...rest },
  ref,
) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        multiline={multiline}
        placeholderTextColor={LIGHT_PALETTE.textTertiary}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={[
          styles.input,
          multiline && styles.multiline,
          isFocused && styles.focused,
          error && styles.errored,
          style,
        ]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  label: {
    fontFamily: TYPOGRAPHY.label.fontFamily,
    fontSize: TYPOGRAPHY.label.fontSize,
    fontWeight: TYPOGRAPHY.label.fontWeight,
    letterSpacing: TYPOGRAPHY.label.letterSpacing,
    color: LIGHT_PALETTE.textSecondary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: LIGHT_PALETTE.surfaceAlt,
    borderRadius: BORDER_RADIUS.m,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
    borderWidth: 1.5,
    borderColor: 'transparent',
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    color: LIGHT_PALETTE.textPrimary,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  focused: {
    borderColor: LIGHT_PALETTE.primary,
  },
  errored: {
    borderColor: LIGHT_PALETTE.error,
  },
  error: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: LIGHT_PALETTE.error,
    marginTop: SPACING.xs,
  },
});
