/**
 * Provides essential managers and providers for the authenticated screens.
 *
 * This component should be used at the top level of the screen,
 * wrapping all the components
 */

import { GuestGuard } from '@/guards';
import { StoreLoader } from '@/managers';
import { FC, PropsWithChildren } from 'react';

export const NonAuthenticatedScreenWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StoreLoader>
      <GuestGuard>{children}</GuestGuard>
    </StoreLoader>
  );
};
