'use dom';

import '@tailwind';

import { AuthLayout } from '@/layouts';
import { CreateWallet } from '@/screens';
import { NonAuthenticatedScreenWrapper } from '@/wrappers';

export default function CreateWalletScreen() {
  return (
    <NonAuthenticatedScreenWrapper>
      <AuthLayout>
        <CreateWallet />
      </AuthLayout>
    </NonAuthenticatedScreenWrapper>
  );
}
