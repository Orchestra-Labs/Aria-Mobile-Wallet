import { COLORS } from '@/constants';
import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.app },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-coins-list" />
      <Stack.Screen
        name="menu-options"
        options={{
          presentation: 'containedTransparentModal',
          animation: 'fade',
          contentStyle: { backgroundColor: undefined },
        }}
      />
    </Stack>
  );
}
