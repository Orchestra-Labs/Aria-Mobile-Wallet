'use dom';

import '@tailwind';

import { Main } from '@/screens';
import { MainLayout } from '@/layouts';
import { MainManagers, StoreLoader } from '@/managers';
import { AuthGuard } from '@/guards';

export default function MainScreen() {
  return (
    <StoreLoader>
      <MainManagers>
        <AuthGuard>
          <MainLayout>
            <Main />
          </MainLayout>
        </AuthGuard>
      </MainManagers>
    </StoreLoader>
  );
}
