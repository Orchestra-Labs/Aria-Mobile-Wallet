import { useLoadFonts, useLoadStore } from '@/hooks';
import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, useEffect } from 'react';

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
  return children;
};
