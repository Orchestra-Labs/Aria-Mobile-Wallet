import { GuestGuard } from '@/guards';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <GuestGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="new-wallet/index" />
        <Stack.Screen name="index" />
      </Stack>
    </GuestGuard>
  );
}
