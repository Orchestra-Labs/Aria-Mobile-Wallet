'use dom';

import '@tailwind';

import { Main } from '@/screens';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';

export default function MainScreen() {
  return (
    <AuthenticatedScreenWrapper>
      <MainLayout>
        <Main />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
}
