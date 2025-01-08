/**
 * Provides essential managers and providers for the authenticated screens.
 *
 * This component should be used at the top level of the screen,
 * wrapping all the components
 */

import { AuthGuard } from '@/guards';
import {
  DataManager,
  InitWalletManager,
  ScreenSuspense,
  StoreLoader,
} from '@/managers';
import { FC, PropsWithChildren } from 'react';

export const AuthenticatedScreenWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreLoader>
      <ScreenSuspense>
        <InitWalletManager>
          <AuthGuard>{children}</AuthGuard>
          <DataManager />
        </InitWalletManager>
      </ScreenSuspense>
    </StoreLoader>
  );
};
