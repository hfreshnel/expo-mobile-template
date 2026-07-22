import { StyleSheet, Text, View } from 'react-native';
import Screen from '@/components/Screen';
import { LIGHT_PALETTE, SPACING, TYPOGRAPHY } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.body}>
          Edit src/app/(tabs)/index.tsx to get started. Generic building blocks live in
          src/components, src/theme, src/api, src/features, src/observability, and src/mocks.
        </Text>
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
    gap: SPACING.s,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: LIGHT_PALETTE.textPrimary,
  },
  body: {
    ...TYPOGRAPHY.body,
    color: LIGHT_PALETTE.textSecondary,
    textAlign: 'center',
  },
});
