'use dom';

import '@tailwind';

import { SendScreen as Send } from '@/screens';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';

export default function SendScreen() {
  return (
    <AuthenticatedScreenWrapper>
      <MainLayout>
        <Send />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
}
