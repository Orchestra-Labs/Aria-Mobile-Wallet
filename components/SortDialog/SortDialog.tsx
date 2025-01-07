import React, { startTransition } from 'react';
import { Button, SlideTray } from '@/ui-kit';
import { Sort } from '@/assets/icons';
import { useAtom } from 'jotai';
import {
  assetSortOrderAtom,
  assetSortTypeAtom,
  validatorSortOrderAtom,
  validatorSortTypeAtom,
  assetDialogSortOrderAtom,
  assetDialogSortTypeAtom,
  validatorDialogSortOrderAtom,
  validatorDialogSortTypeAtom,
} from '@/atoms';
import { ValidatorSortType } from '@/constants';

interface SortDialogProps {
  isValidatorSort?: boolean;
  isDialog?: boolean;
}

export const SortDialog: React.FC<SortDialogProps> = ({
  isValidatorSort = false,
  isDialog = false,
}) => {
  const [assetSortOrder, setAssetSortOrder] = useAtom(
    isDialog ? assetDialogSortOrderAtom : assetSortOrderAtom,
  );
  const [validatorSortOrder, setValidatorSortOrder] = useAtom(
    isDialog ? validatorDialogSortOrderAtom : validatorSortOrderAtom,
  );
  const [assetSortType, setAssetSortType] = useAtom(
    isDialog ? assetDialogSortTypeAtom : assetSortTypeAtom,
  );
  const [validatorSortType, setValidatorSortType] = useAtom(
    isDialog ? validatorDialogSortTypeAtom : validatorSortTypeAtom,
  );

  const sortOptions = isValidatorSort
    ? Object.values(ValidatorSortType)
    : ['name', 'amount'];

  const setSortOrder = (sortOrder: 'Asc' | 'Desc') => {
    if (isValidatorSort) {
      setValidatorSortOrder(sortOrder);
    } else if (!isValidatorSort) {
      setAssetSortOrder(sortOrder);
    }
  };

  const setSortType = (sortType: string) => {
    if (isValidatorSort) {
      setValidatorSortType(sortType as any);
    } else if (!isValidatorSort) {
      setAssetSortType(sortType as any);
    }
  };

  const onResetDefaultsClick = () => {
    startTransition(() => {
      if (isValidatorSort) {
        setValidatorSortOrder('Desc');
        setValidatorSortType(ValidatorSortType.NAME);
      } else if (!isValidatorSort) {
        setAssetSortOrder('Desc');

        setAssetSortType('name');
      }
    });
  };

  const onAscClick = () => {
    startTransition(() => {
      setSortOrder('Asc');
    });
  };
  const onDescClick = () => {
    startTransition(() => {
      setSortOrder('Desc');
    });
  };

  const onSetSortClick = (option: string) => {
    startTransition(() => {
      setSortType(option);
    });
  };

  const sortOrder = isValidatorSort ? validatorSortOrder : assetSortOrder;
  const sortType = isValidatorSort ? validatorSortType : assetSortType;

  return (
    <SlideTray
      triggerComponent={
        <Button
          className="rounded-full bg-transparent text-neutral-1 p-[7px] hover:bg-blue-hover-secondary hover:text-blue-dark active:bg-blue-pressed-secondary active:text-black"
          size="rounded-default"
        >
          <Sort width={20} className="text-white" />
        </Button>
      }
      title={'Sort Options'}
      showBottomBorder
      height="45%"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-full">
          {/* Sort Order Selection */}
          <div className="flex justify-between items-center p-2">
            <div className="flex-1 text-sm text-white">Order:</div>
            <div className="flex items-center">
              <Button
                variant={sortOrder === 'Asc' ? 'selected' : 'unselected'}
                size="xsmall"
                className="px-1 rounded-md text-xs"
                onClick={onAscClick}
              >
                Asc
              </Button>
              <p className="text-sm px-1">/</p>
              <Button
                variant={sortOrder === 'Desc' ? 'selected' : 'unselected'}
                size="xsmall"
                className="px-1 rounded-md text-xs"
                onClick={onDescClick}
              >
                Desc
              </Button>
            </div>
          </div>

          {/* Sort Type Selection */}
          <div className="flex justify-between items-center p-2">
            <div className="flex-1 text-sm text-white">Sort by:</div>
            <div className="flex items-center">
              {sortOptions.map((option) => (
                <React.Fragment key={option}>
                  <Button
                    variant={sortType === option ? 'selected' : 'unselected'}
                    size="xsmall"
                    className="px-1 rounded-md text-xs"
                    onClick={() => onSetSortClick(option)}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                  {option !== sortOptions[sortOptions.length - 1] && (
                    <p className="text-sm px-1">/</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center p-2">
            <Button
              variant="unselected"
              size="small"
              className="px-1 rounded-md text-xs"
              onClick={onResetDefaultsClick}
            >
              Reset Defaults
            </Button>
          </div>
        </div>
      </div>
    </SlideTray>
  );
};
