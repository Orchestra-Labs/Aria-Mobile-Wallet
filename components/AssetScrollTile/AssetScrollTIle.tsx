import { Asset } from '@/types';
import { SlideTray, Button } from '@/ui-kit';
import { ScrollTile } from '../ScrollTile';
import { ReceiveDialog } from '../ReceiveDialog';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { DEFAULT_ASSET, ROUTES } from '@/constants';
import {
  swiperIndexState,
  selectedAssetAtom,
  dialogSelectedAssetAtom,
  sendStateAtom,
  selectedCoinListAtom,
  receiveStateAtom,
} from '@/atoms/';
import { formatBalanceDisplay } from '@/helpers';
import { router } from 'expo-router';
import { Fragment } from 'react';

interface AssetScrollTileProps {
  asset: Asset;
  isSelectable?: boolean;
  isReceiveDialog?: boolean;
  multiSelectEnabled?: boolean;
  onClick?: (asset: Asset) => void;
  isOnSendPage: boolean;
}

export const AssetScrollTile = ({
  asset,
  isSelectable = false,
  isReceiveDialog = false,
  multiSelectEnabled = false,
  onClick,
  isOnSendPage,
}: AssetScrollTileProps) => {
  const setActiveIndex = useSetAtom(swiperIndexState);
  const setSelectedAsset = useSetAtom(selectedAssetAtom);
  const currentState = useAtomValue(
    isReceiveDialog ? receiveStateAtom : sendStateAtom,
  );
  const [dialogSelectedAsset, setDialogSelectedAsset] = useAtom(
    dialogSelectedAssetAtom,
  );
  const selectedCoins = useAtomValue(selectedCoinListAtom);

  const symbol = asset.symbol || DEFAULT_ASSET.symbol || 'MLD';
  const title = asset.symbol || 'Unknown Asset';
  const logo = asset.logo;

  const valueAmount = isReceiveDialog
    ? asset.exchangeRate === '0'
      ? '-'
      : asset.exchangeRate || '1'
    : asset.amount;

  let value = '';
  const sendState = useAtomValue(sendStateAtom);
  if (isReceiveDialog) {
    if (isNaN(parseFloat(valueAmount))) {
      value = '-';
    } else {
      const unitSymbol = sendState.asset.symbol || 'MLD';
      value = formatBalanceDisplay(valueAmount, unitSymbol);
    }
  } else {
    const unitSymbol = symbol;
    value = formatBalanceDisplay(valueAmount, unitSymbol);
  }

  const handleSendClick = () => {
    // Set the selected asset in the send state
    setSelectedAsset(asset);
    router.navigate(ROUTES.APP.SEND);
  };

  const handleClick = () => {
    if (onClick) {
      setDialogSelectedAsset(asset);
      onClick(asset);
    }
  };

  // Check if the current page is the SEND page

  // const { pathName } = usePathName();
  // const isOnSendPage = pathName === ROUTES.APP.SEND;

  // Determine if the asset is selected, based on current state or multi-select mode
  const isSelected = multiSelectEnabled
    ? selectedCoins.some((selectedCoin) => selectedCoin.denom === asset.denom)
    : isOnSendPage
      ? asset.denom === currentState.asset.denom
      : asset.denom === dialogSelectedAsset.denom;

  return (
    <Fragment>
      {isSelectable ? (
        <ScrollTile
          title={title}
          subtitle="Symphony"
          value={value}
          icon={<img src={logo} alt={title} />}
          selected={isSelected}
          onClick={handleClick}
        />
      ) : (
        <SlideTray
          triggerComponent={
            <div>
              <ScrollTile
                title={title}
                subtitle="Symphony"
                value={value}
                icon={<img src={logo} alt={title} />}
              />
            </div>
          }
          title={title}
          showBottomBorder
        >
          <Fragment>
            <div className="text-center mb-2">
              <div className="truncate text-base font-medium text-neutral-1 line-clamp-1">
                Amount: <span className="text-blue">{value}</span>
              </div>
              <span className="text-grey-dark text-xs text-base">
                Current Chain: <span className="text-blue">Symphony</span>
              </span>
            </div>
          </Fragment>

          {/* Asset Information */}
          <div className="mb-4 min-h-[7.5rem] max-h-[7.5rem] overflow-hidden shadow-md bg-black p-2">
            <p>
              <strong>Ticker: </strong>
              {asset.symbol}
            </p>
            <p>
              <strong>Sub-unit: </strong>
              {asset.denom}
            </p>
            {/* 
              TODO: include information such as...
              is stakeable,
              is IBC, 
              is Token or native, 
              native chain, 
              current chain, 
              native to which application, 
              price, 
              website, 
              etc 
            */}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center grid grid-cols-3 w-full gap-x-4 px-2">
            <Button
              size="medium"
              className={'w-full'}
              onClick={handleSendClick}
            >
              Send
            </Button>
            <ReceiveDialog buttonSize="medium" asset={asset} />
            <Button
              size="medium"
              className={'w-full'}
              onClick={() => setActiveIndex(1)}
            >
              Stake
            </Button>
          </div>
        </SlideTray>
      )}
    </Fragment>
  );
};
