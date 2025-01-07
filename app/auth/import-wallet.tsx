'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { ImportWallet } from '@/screens';
import { GuestGuard } from '@/guards';
import { StoreLoader } from '@/managers';

export default function ImportWalletScreen() {
  return (
    <StoreLoader>
      <GuestGuard>
        <AuthLayout>
          <ImportWallet />
        </AuthLayout>
      </GuestGuard>
    </StoreLoader>
  );
}
