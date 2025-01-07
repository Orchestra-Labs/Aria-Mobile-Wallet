import '../globals';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { RootManagers } from '@/managers';
import { RootProviders } from '@/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <RootProviders>
      <RootManagers>
        <Stack>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </RootManagers>
    </RootProviders>
  );
}
