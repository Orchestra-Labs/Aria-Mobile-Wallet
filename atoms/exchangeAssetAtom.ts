import { atom } from 'jotai';
import { atomWithAsyncStorage, filterAndSortAssets } from '@/helpers';
import { Asset } from '@/types';
import {
  assetDialogSortOrderAtom,
  assetDialogSortTypeAtom,
  dialogSearchTermAtom,
} from './searchFilterAtom';

export const symphonyAssetsAtom = atomWithAsyncStorage<Asset[]>(
  'symphonyAssetsAtom',
  [],
);

// Create a filtered version for the dialog
export const filteredExchangeAssetsAtom = atom(async (get) => {
  const symphonyAssets = await get(symphonyAssetsAtom);
  const searchTerm = await get(dialogSearchTermAtom);
  const sortOrder = get(assetDialogSortOrderAtom);
  const sortType = get(assetDialogSortTypeAtom);

  const nonIbcAssets = symphonyAssets.filter((asset) => !asset.isIbc);

  return filterAndSortAssets(nonIbcAssets, searchTerm, sortType, sortOrder);
});
