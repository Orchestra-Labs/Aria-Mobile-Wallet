import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { walletAddressAtom } from '@/atoms';
import { ROUTES } from '@/constants';

import { router } from 'expo-router';
import { useAuth } from '@/hooks';
import { ScreenLoader } from '@/components';

interface AuthGuardProps {
  children?: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { canLogIn, isLoggedIn, loading } = useAuth();

  const [walletAddress] = useAtom(walletAddressAtom);

  useEffect(() => {
    if (loading) return;

    if (!canLogIn) return router.replace(ROUTES.AUTH.NEW_WALLET.ROOT);
    if (!isLoggedIn) return router.replace(ROUTES.AUTH.ROOT);
    if (!walletAddress) return router.replace(ROUTES.AUTH.ROOT);
  }, [walletAddress, canLogIn, isLoggedIn, loading]);

  if (loading) return <ScreenLoader />;

  return <>{children}</>;
};
