import { StyleSheet, Text, View } from 'react-native';
import Button from '@/components/Button';
import Screen from '@/components/Screen';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useAuthStore } from '@/features/auth';

// Bypasses real auth with a mock token so the cold-start → login → tabs loop
// is exercisable before a real OAuth2/PKCE flow exists — see
// src/features/auth/use-oauth-pkce.ts for that wiring point.
export default function LoginScreen() {
  const setToken = useAuthStore((state) => state.setToken);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <Button title="Log in" onPress={() => setToken('mock-token')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    gap: SPACING.m,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: LIGHT_PALETTE.textPrimary,
  },
});
