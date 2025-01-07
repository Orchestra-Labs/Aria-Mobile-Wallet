import { CombinedStakingInfo } from '@/types';
import { atom } from 'jotai';
import { filterAndSortValidators } from '@/helpers';
import { ValidatorStatusFilter } from '@/constants';
import {
  dialogSearchTermAtom,
  searchTermAtom,
  validatorDialogSortOrderAtom,
  validatorDialogSortTypeAtom,
  validatorSortOrderAtom,
  validatorSortTypeAtom,
} from './searchFilterAtom';

export const showCurrentValidatorsAtom = atom<boolean>(true);
export const validatorDataAtom = atom<CombinedStakingInfo[]>([]);
export const selectedValidatorsAtom = atom<CombinedStakingInfo[]>([]);
export const validatorStatusFilterAtom = atom<ValidatorStatusFilter>(
  ValidatorStatusFilter.STATUS_ACTIVE,
);

export const filteredValidatorsAtom = atom(async (get) => {
  const validatorData = get(validatorDataAtom);
  const searchTerm = await get(searchTermAtom);
  const sortOrder = get(validatorSortOrderAtom);
  const sortType = get(validatorSortTypeAtom);
  const showCurrentValidators = get(showCurrentValidatorsAtom);
  const statusFilter = get(validatorStatusFilterAtom);

  return filterAndSortValidators(
    validatorData,
    searchTerm,
    sortType,
    sortOrder,
    showCurrentValidators,
    statusFilter,
  );
});

export const filteredDialogValidatorsAtom = atom(async (get) => {
  const validatorData = get(validatorDataAtom);
  const searchTerm = await get(dialogSearchTermAtom);
  const sortOrder = get(validatorDialogSortOrderAtom);
  const sortType = get(validatorDialogSortTypeAtom);
  const statusFilter = get(validatorStatusFilterAtom);

  return filterAndSortValidators(
    validatorData,
    searchTerm,
    sortType,
    sortOrder,
    true,
    statusFilter,
  );
});
