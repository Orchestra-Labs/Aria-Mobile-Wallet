import { PropsWithChildren } from 'react';
import { DataManager } from '../DataManager';
import { InitWalletManager } from '../InitWalletManager';

export const MainManagers = ({ children }: PropsWithChildren) => {
  return (
    <InitWalletManager>
      {children}
      <DataManager />
    </InitWalletManager>
  );
};
