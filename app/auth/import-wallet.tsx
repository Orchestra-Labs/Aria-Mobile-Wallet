'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { ImportWallet } from '@/screens';
import { GuestGuard } from '@/guards';

export default function ImportWalletScreen() {
  return (
    <GuestGuard>
      <AuthLayout>
        <ImportWallet />
      </AuthLayout>
    </GuestGuard>
  );
}
