import { atom } from 'jotai';
import { filterAndSortAssets } from '@/helpers';
import { Asset } from '@/types';
import {
  assetDialogSortOrderAtom,
  assetDialogSortTypeAtom,
  dialogSearchTermAtom,
} from './searchFilterAtom';

export const exchangeAssetsAtom = atom<Asset[]>([]);

// Create a filtered version for the dialog
export const filteredExchangeAssetsAtom = atom(async (get) => {
  const exchangeAssets = get(exchangeAssetsAtom);
  const searchTerm = await get(dialogSearchTermAtom);
  const sortOrder = get(assetDialogSortOrderAtom);
  const sortType = get(assetDialogSortTypeAtom);

  const nonIbcAssets = exchangeAssets.filter((asset) => !asset.isIbc);

  return filterAndSortAssets(nonIbcAssets, searchTerm, sortType, sortOrder);
});
