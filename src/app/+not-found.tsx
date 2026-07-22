import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import Screen from '@/components/Screen';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Screen>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...TYPOGRAPHY.h2,
    color: LIGHT_PALETTE.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
  link: {
    marginTop: SPACING.l,
    alignSelf: 'center',
  },
  linkText: {
    ...TYPOGRAPHY.body,
    color: LIGHT_PALETTE.primary,
  },
});
