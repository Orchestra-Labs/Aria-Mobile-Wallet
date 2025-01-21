/**
 * Provides essential managers and providers for the authenticated screens.
 *
 * This component should be used at the top level of the screen,
 * wrapping all the components
 */

import { AuthGuard } from '@/guards';
import { DataManager, ScreenSuspense, StoreLoader } from '@/managers';
import { ReactQueryProvider } from '@/providers';
import { FC, PropsWithChildren } from 'react';

export const AuthenticatedScreenWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreLoader>
      <ReactQueryProvider>
        <ScreenSuspense>
          <AuthGuard>{children}</AuthGuard>
          <DataManager />
        </ScreenSuspense>
      </ReactQueryProvider>
    </StoreLoader>
  );
};
