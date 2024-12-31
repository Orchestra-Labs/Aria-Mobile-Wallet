'use dom';

import '@tailwind';
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TempCryptoComponent } from '@/components/TempCryptoComponent';
import { DialogContainer } from '@/components/DialogContainer';
import { Fragment } from 'react';
import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/atoms';
import { useLogout } from '@/hooks';

export default function HomeScreen() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const logout = useLogout();

  return (
    <Fragment>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <div className="text-4xl font-bold">
            Welcome! (isLoggedIn: {JSON.stringify(isLoggedIn)})
          </div>
          <HelloWave />
        </ThemedView>
        <Link href="/auth/new-wallet" className="text-blue-500">
          Go to New Wallet
        </Link>
        {isLoggedIn && <div onClick={logout}>Logout</div>}
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
            to see changes. Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{' '}
            to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
            directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
        <TempCryptoComponent />
      </ParallaxScrollView>
      <DialogContainer />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
