'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { CreateWallet } from '@/screens';
import { GuestGuard } from '@/guards';
import { StoreLoader } from '@/managers';

export default function CreateWalletScreen() {
  return (
    <StoreLoader>
      <GuestGuard>
        <AuthLayout>
          <CreateWallet />
        </AuthLayout>
      </GuestGuard>
    </StoreLoader>
  );
}
