import React from 'react';
import { AssetScrollTile } from '../AssetScrollTile';
import { useAtomValue } from 'jotai';
import {
  coinListAssetsAtom,
  filteredAssetsAtom,
  filteredDialogAssetsAtom,
  filteredExchangeAssetsAtom,
} from '@/atoms';
import { Asset } from '@/types';

interface AssetTilesProps {
  isSelectable?: boolean;
  onClick?: (asset: Asset) => void;
  isDialog?: boolean;
  isReceiveDialog?: boolean;
  multiSelectEnabled?: boolean;
  isEditPage?: boolean;
  isOnSendPage: boolean;
}

export const AssetTiles: React.FC<AssetTilesProps> = ({
  isSelectable = false,
  onClick,
  isDialog = false,
  isReceiveDialog = false,
  multiSelectEnabled = false,
  isEditPage = false,
  isOnSendPage,
}) => {
  const currentAtom = (() => {
    if (isEditPage) return coinListAssetsAtom;
    if (!isDialog) {
      return filteredAssetsAtom;
    }
    if (isReceiveDialog) {
      return filteredExchangeAssetsAtom;
    } else {
      return filteredDialogAssetsAtom;
    }
  })();

  const filteredAssets = useAtomValue(currentAtom);

  return (
    <>
      {filteredAssets.map((asset) => (
        <AssetScrollTile
          key={asset.denom}
          asset={asset}
          isSelectable={isSelectable}
          isReceiveDialog={isReceiveDialog}
          multiSelectEnabled={multiSelectEnabled}
          onClick={onClick}
          isOnSendPage={isOnSendPage}
        />
      ))}
    </>
  );
};
