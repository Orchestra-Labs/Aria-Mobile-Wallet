import { atomWithAsyncStorage } from '@/helpers';
import { AccountRecord } from '@/types';

export const userAccountAtom = atomWithAsyncStorage<AccountRecord | null>(
  'userAccountAtom',
  null,
);
