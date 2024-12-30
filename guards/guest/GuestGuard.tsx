import React, { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAtomValue } from 'jotai';
import { isLoggedInAtom } from '@/atoms';
import { router } from 'expo-router';

interface GuestGuardProps {
  children?: React.ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  useEffect(() => {
    if (!isLoggedIn) return;
    router.replace(ROUTES.APP.ROOT);
  }, [isLoggedIn]);

  return children;
};
