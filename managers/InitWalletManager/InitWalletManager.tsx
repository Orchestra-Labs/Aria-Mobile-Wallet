import { ScreenLoader } from '@/components';
import { useInitializeWallet } from '@/hooks';
import { Fragment, PropsWithChildren } from 'react';

export const InitWalletManager = ({ children }: PropsWithChildren) => {
  const { loading } = useInitializeWallet();

  if (loading) return <ScreenLoader />;

  return <Fragment>{children}</Fragment>;
};
