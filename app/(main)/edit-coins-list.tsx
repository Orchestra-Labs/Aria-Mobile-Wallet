'use dom';

import '@tailwind';

import { EditCoinListScreen } from '@/screens';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';

export default function EditCoinsList() {
  return (
    <AuthenticatedScreenWrapper>
      <MainLayout>
        <EditCoinListScreen isOnSendPage={false} />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
}
