import { ScreenLoader } from '@/components';
import { useInitializeWalletConnect } from '@/hooks';
import { useWalletConnectEventsManager } from '@/hooks/useWalletConnectEventsManager';
import { Fragment, PropsWithChildren } from 'react';

type Props = {
  pathname: string;
};

export const InitWalletConnectManager = ({
  children,
  pathname,
}: PropsWithChildren<Props>) => {
  const { loading } = useInitializeWalletConnect();

  useWalletConnectEventsManager({ initialized: !loading, pathname });

  if (loading) return <ScreenLoader />;

  return <Fragment>{children}</Fragment>;
};
