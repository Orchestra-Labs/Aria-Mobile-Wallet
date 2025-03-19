/**
 * Provides essential managers and providers for the authenticated screens.
 *
 * This component should be used at the top level of the screen,
 * wrapping all the components
 */

import { Toaster } from '@/components';
import { AuthGuard } from '@/guards';
import {
  DataManager,
  InitWalletManager,
  ScreenSuspense,
  StoreLoader,
} from '@/managers';
import { InitWalletConnectManager } from '@/managers/InitWalletConnectManager/InitWalletConnectManager';
import { ReactQueryProvider } from '@/providers';
import { DOMComponentProps } from '@/types';
import { FC, PropsWithChildren } from 'react';

export const AuthenticatedScreenWrapper: FC<
  PropsWithChildren<DOMComponentProps>
> = ({ children, route }) => {
  return (
    <StoreLoader>
      <ReactQueryProvider>
        <ScreenSuspense>
          <InitWalletManager>
            <InitWalletConnectManager {...route}>
              <Toaster />
              <AuthGuard>{children}</AuthGuard>
              <DataManager />
            </InitWalletConnectManager>
          </InitWalletManager>
        </ScreenSuspense>
      </ReactQueryProvider>
    </StoreLoader>
  );
};
