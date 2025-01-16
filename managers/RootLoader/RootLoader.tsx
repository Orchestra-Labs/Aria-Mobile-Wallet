import { useLoadFonts, useLoadStore } from '@/hooks';
import * as SplashScreen from 'expo-splash-screen';
import { Fragment, PropsWithChildren, useEffect } from 'react';
import { View } from 'react-native';
import { SessionStorageLoader } from '../SessionStorageLoader';

export const RootLoader = ({ children }: PropsWithChildren) => {
  const { loaded: storeLoaded } = useLoadStore();
  const { loaded: fontsLoaded } = useLoadFonts();

  useEffect(() => {
    if (!storeLoaded) return;
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();
  }, [storeLoaded, fontsLoaded]);

  if (!storeLoaded) return null;
  if (!fontsLoaded) return null;
  return (
    <Fragment>
      <View style={{ position: 'absolute', height: 0, width: 0 }}>
        <SessionStorageLoader />
      </View>
      {children}
    </Fragment>
  );
};
