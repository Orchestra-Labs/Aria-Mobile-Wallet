import { atomWithAsyncStorage } from '@/helpers';

export const isLoggedInAtom = atomWithAsyncStorage<boolean | null>(
  'isLoggedInAtom',
  false,
)();
