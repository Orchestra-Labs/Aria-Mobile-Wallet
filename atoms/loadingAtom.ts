import { atomWithAsyncStorage } from '@/helpers';

export const isInitialDataLoadAtom = atomWithAsyncStorage(
  'isInitialDataLoadAtom',
  true,
);
