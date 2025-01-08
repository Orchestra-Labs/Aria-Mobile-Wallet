import { COLORS } from '@/constants';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background.app },
      }}
    >
      <Stack.Screen name="new-wallet/index" />
      <Stack.Screen name="import-wallet" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
