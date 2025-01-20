'use dom';

import '@tailwind';

import { SwapTutorial } from '@/screens';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';

export default function SwapTutorialScreen() {
  return (
    <AuthenticatedScreenWrapper>
      <MainLayout>
        <SwapTutorial />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
}
