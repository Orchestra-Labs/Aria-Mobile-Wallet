/**
 * Provides essential managers and providers for the app.
 *
 * This component should be used at the top level of the app
 * in root layout, wrapping all the screens
 */

import { RootLoader, ScreenSuspense } from '@/managers';
import { JotaiProvider } from '@/providers';
import { FC, PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';

export const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <JotaiProvider>
      <RootLoader>
        <ScreenSuspense>{children}</ScreenSuspense>
        <StatusBar style="light" backgroundColor="black" translucent={false} />
      </RootLoader>
    </JotaiProvider>
  );
};
