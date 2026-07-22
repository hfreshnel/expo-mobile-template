import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { LIGHT_PALETTE } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: LIGHT_PALETTE.primary,
        tabBarInactiveTintColor: LIGHT_PALETTE.textTertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
