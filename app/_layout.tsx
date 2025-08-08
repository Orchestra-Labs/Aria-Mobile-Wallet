import '../globals';
import { Stack } from 'expo-router';
import { COLORS } from '@/constants';
import { AppWrapper } from '@/wrappers';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
