'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { NewWallet } from '@/screens';
import { GuestGuard } from '@/guards';

export default function NewWalletScreen() {
  return (
    <GuestGuard>
      <AuthLayout>
        <NewWallet />
      </AuthLayout>
    </GuestGuard>
  );
}
