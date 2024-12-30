'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { NewWallet } from '@/screens';

export default function NewWalletScreen() {
  return (
    <AuthLayout>
      <NewWallet />
    </AuthLayout>
  );
}
