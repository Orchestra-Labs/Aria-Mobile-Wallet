'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { CreateWallet } from '@/screens';
import { GuestGuard } from '@/guards';

export default function CreateWalletScreen() {
  return (
    <GuestGuard>
      <AuthLayout>
        <CreateWallet />
      </AuthLayout>
    </GuestGuard>
  );
}
