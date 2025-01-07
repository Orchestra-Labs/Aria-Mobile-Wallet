import { atomWithAsyncStorage } from '@/helpers';

export const isFetchingWalletDataAtom = atomWithAsyncStorage(
  'isFetchingWalletDataAtom',
  false,
);
export const isFetchingValidatorDataAtom = atomWithAsyncStorage(
  'isFetchingValidatorDataAtom',
  false,
);
