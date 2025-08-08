import { COLORS } from '@/constants';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background.black,
      }}
    >
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
    </SafeAreaView>
  );
}
