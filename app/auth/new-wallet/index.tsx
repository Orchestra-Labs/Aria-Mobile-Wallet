'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { NewWallet } from '@/screens';
import { GuestGuard } from '@/guards';
import { StoreLoader } from '@/managers';

export default function NewWalletScreen() {
  return (
    <StoreLoader>
      <GuestGuard>
        <AuthLayout>
          <NewWallet />
        </AuthLayout>
      </GuestGuard>
    </StoreLoader>
  );
}
