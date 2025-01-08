'use dom';

import '@tailwind';

import { EditCoinListScreen } from '@/screens';
import { MainLayout } from '@/layouts';
import { MainManagers, StoreLoader } from '@/managers';
import { AuthGuard } from '@/guards';

export default function EditCoinsList() {
  return (
    <StoreLoader>
      <MainManagers>
        <AuthGuard>
          <MainLayout>
            <EditCoinListScreen isOnSendPage={false} />
          </MainLayout>
        </AuthGuard>
      </MainManagers>
    </StoreLoader>
  );
}
