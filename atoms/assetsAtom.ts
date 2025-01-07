import { DEFAULT_ASSET } from '@/constants';
import { atomWithAsyncStorage } from '@/helpers';
import { Asset } from '@/types';
import { atom } from 'jotai';

export const showAllAssetsAtom = atomWithAsyncStorage<boolean>(
  'showAllAssetsAtom',
  false,
);

export const selectedAssetAtom = atomWithAsyncStorage<Asset>(
  'selectedAssetAtom',
  DEFAULT_ASSET,
);
export const dialogSelectedAssetAtom = atom<Asset>(DEFAULT_ASSET);
export const selectedCoinListAtom = atomWithAsyncStorage<Asset[]>(
  'selectedCoinListAtom',
  [],
);
