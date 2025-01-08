import { PropsWithChildren } from 'react';
import { DataManager } from '../DataManager';
import { InitWalletManager } from '../InitWalletManager';

/**
 * Provides essential managers for the main app workflow.
 *
 * This component should be used at the top level of the app, under <StoreLoader /> 
 * wrapping all other components that require access to the app's data and
 * wallet.
 */

export const MainManagers = ({ children }: PropsWithChildren) => {
  return (
    <InitWalletManager>
      {children}
      <DataManager />
    </InitWalletManager>
  );
};
