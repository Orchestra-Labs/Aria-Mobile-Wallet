import { ScreenLoader } from '@/components';
import { PropsWithChildren, Suspense } from 'react';

export const ScreenSuspense = ({ children }: PropsWithChildren) => (
  <Suspense fallback={<ScreenLoader />}>{children}</Suspense>
);
