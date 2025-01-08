import '../globals';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants';
import { AppWrapper } from '@/wrappers';

export default function RootLayout() {
  return (
    <AppWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background.app },
        }}
      >
        <Stack.Screen name="(main)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      </Stack>
    </AppWrapper>
  );
}
