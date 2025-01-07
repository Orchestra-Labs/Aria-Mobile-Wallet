import { PropsWithChildren } from 'react';
import { useLoadStore } from '@/hooks';
import { ScreenLoader } from '@/components';

export const StoreLoader = ({ children }: PropsWithChildren) => {
  const { loaded: storeLoaded } = useLoadStore();

  if (!storeLoaded) return <ScreenLoader />;

  return children;
};
