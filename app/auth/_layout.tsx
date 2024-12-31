import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="new-wallet/index" />
      <Stack.Screen name="import-wallet" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
