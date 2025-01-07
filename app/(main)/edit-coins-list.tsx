'use dom';

import '@tailwind';

import { EditCoinListScreen } from '@/screens';
import { MainLayout } from '@/layouts';
import { MainManagers, StoreLoader } from '@/managers';
import { AuthGuard } from '@/guards';

export default function EditCoinsList() {
  return (
    <StoreLoader>
      <AuthGuard>
        <MainManagers>
          <MainLayout>
            <EditCoinListScreen isOnSendPage={false} />
          </MainLayout>
        </MainManagers>
      </AuthGuard>
    </StoreLoader>
  );
}
