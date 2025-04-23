'use dom';

import React, { startTransition, useEffect, useMemo } from 'react';
import {
  Header,
  Loader,
  ScreenLoader,
  SearchBar,
  SortDialog,
  TileScroller,
} from '@/components';
import {
  assetDialogSortOrderAtom,
  assetDialogSortTypeAtom,
  dialogSearchTermAtom,
  filteredExchangeAssetsAtom,
  isInitialDataLoadAtom,
  selectedCoinListAtom,
  subscribedAssetsAtom,
  symphonyAssetsAtom,
} from '@/atoms';
import { Atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { DEFAULT_CHAIN_ID, DEFAULT_SUBSCRIPTION, ROUTES } from '@/constants';
import { Button, Separator } from '@/ui-kit';
import {
  AccountRecord,
  Asset,
  DOMComponentProps,
  SubscriptionRecord,
} from '@/types';
import { saveAccountByID } from '@/helpers/dataHelpers/account';
import { userAccountAtom } from '@/atoms/accountAtom';
import { router } from 'expo-router';
import { MainLayout } from '@/layouts';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { useToast } from '@/hooks';

const PAGE_TITLE = 'Select Visible Coins';

type EditCoinListScreenProps = (
  | ({
      withWrappers?: true;
    } & DOMComponentProps)
  | ({
      withWrappers?: false;
    } & Partial<DOMComponentProps>)
) & {
  isOnSendPage: boolean;
};

// TODO: make registry, add github action to auto-update entries based on items in pull request. then sort?
// TODO: save registry info into localStorage, set default data expiration to one day
// TODO: pull registry info whenever data is empty or data expires
const EditCoinList: React.FC<EditCoinListScreenProps> = ({ isOnSendPage }) => {
  const { toast } = useToast();
  const isInitialDataLoad = useAtomValue(isInitialDataLoadAtom);
  const [selectedCoins, setSelectedCoins] = useAtom(
    selectedCoinListAtom as Atom<Asset[]>,
  );
  const filteredExchangeCoins = useAtomValue(filteredExchangeAssetsAtom);
  const subscribedAssets = useAtomValue(subscribedAssetsAtom);
  const unfilteredAssets = useAtomValue(symphonyAssetsAtom as Atom<Asset[]>);
  const setSearchTerm = useSetAtom(dialogSearchTermAtom);
  const setSortOrder = useSetAtom(assetDialogSortOrderAtom);
  const setSortType = useSetAtom(assetDialogSortTypeAtom);
  const [userAccount, setUserAccount] = useAtom(
    userAccountAtom as Atom<AccountRecord | null>,
  );

  const allCoinsSelected = selectedCoins.length === unfilteredAssets.length;
  const noCoinsSelected = selectedCoins.length === 0;

  // Store initial settings to revert to them on cancel
  const initialSettings = useMemo(
    () => ({
      hasSetCoinList: true,
      subscribedTo:
        userAccount?.settings.subscribedTo &&
        Object.keys(userAccount.settings.subscribedTo).length > 0
          ? userAccount.settings.subscribedTo
          : DEFAULT_SUBSCRIPTION,
    }),
    [userAccount],
  );

  const resetDefaults = () => {
    setSearchTerm('').finally(() => {
      setSortOrder('Desc');
      setSortType('name');
    });
  };

  const handleSelectAll = () => setSelectedCoins(filteredExchangeCoins);

  const handleSelectNone = () => setSelectedCoins([]);

  const closeAndReturn = () => {
    resetDefaults();
    router.navigate(ROUTES.APP.ROOT);
  };

  const handleSelectCoin = (coin: Asset) =>
    setSelectedCoins((prevSelectedCoins) => {
      const isAlreadySelected = prevSelectedCoins.some(
        (selectedCoin) => selectedCoin.denom === coin.denom,
      );

      return isAlreadySelected
        ? prevSelectedCoins.filter(
            (selectedCoin) => selectedCoin.denom !== coin.denom,
          )
        : [...prevSelectedCoins, coin];
    });

  // TODO: with multi-coin support, change to select specific coin and chain by sorted category and selection
  const confirmSelection = async () => {
    if (userAccount) {
      const updatedSubscriptions: { [networkID: string]: SubscriptionRecord } =
        {};

      // TODO: change page's save structure to reflect subscription/registry structure to prevent excess looping here
      const networkID = DEFAULT_CHAIN_ID;
      const networkCoinDenoms = unfilteredAssets.map((asset) => asset.denom);
      const selectedNetworkCoins = selectedCoins.map((coin) => coin.denom);

      console.log('saving selected coins', selectedNetworkCoins);
      if (selectedNetworkCoins.length === networkCoinDenoms.length) {
        // All coins in the network are selected, so save as an empty array
        updatedSubscriptions[networkID] = { coinDenoms: [] };
      } else if (selectedNetworkCoins.length > 0) {
        // Partial selection, save the selected denoms
        updatedSubscriptions[networkID] = { coinDenoms: selectedNetworkCoins };
      }

      const updatedUserAccount = {
        ...userAccount,
        settings: {
          ...userAccount.settings,
          hasSetCoinList: true,
          subscribedTo: updatedSubscriptions,
        },
      };

      console.log('updated user account', updatedUserAccount);

      // Update state and save to local storage
      await setUserAccount(updatedUserAccount);
      await saveAccountByID(updatedUserAccount);
    } else {
      console.warn('userAccount is undefined');
    }

    closeAndReturn();
  };

  const cancel = async () => {
    if (userAccount) {
      // select all
      await handleSelectAll();
      // Restore the initial settings
      const updatedAccount = {
        ...userAccount,
        settings: {
          ...userAccount.settings,
          hasSetCoinList: initialSettings.hasSetCoinList,
          hasViewedTutorial: true,
          subscribedTo: initialSettings.subscribedTo,
        },
      };
      const status = await saveAccountByID(updatedAccount);

      if (status) {
        await setUserAccount(updatedAccount);
      } else {
        toast({
          title: 'something went wrong',
          description:
            'Something went wrong during the closing. Please select coins and click confirm.',
          duration: 4000,
        });
      }
    }
    closeAndReturn();
  };

  useEffect(() => {
    if (userAccount) {
      console.log('subscribed assets', subscribedAssets);
      startTransition(() => {
        setSelectedCoins(subscribedAssets);
      });
    } else {
      console.warn('userAccount is undefined');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitialDataLoad) return <ScreenLoader />;

  return (
    <div className="h-full flex flex-col bg-black text-white">
      <Header title={PAGE_TITLE} onClose={cancel} />

      {/* TODO: extract the below items from here and assetselectdialog to external component */}
      <div className="flex pt-2 px-4 justify-between items-center px-2">
        <div className="text-sm">Tap to select</div>
        <div className="flex items-center">
          <Button
            variant={allCoinsSelected ? 'selected' : 'unselected'}
            size="xsmall"
            className="px-1 rounded-md text-xs"
            onClick={handleSelectAll}
            disabled={isInitialDataLoad}
          >
            All
          </Button>
          <p className="text-sm px-1">/</p>
          <Button
            variant={noCoinsSelected ? 'selected' : 'unselected'}
            size="xsmall"
            className="px-1 rounded-md text-xs"
            onClick={handleSelectNone}
            disabled={isInitialDataLoad}
          >
            None
          </Button>
        </div>
        <div className="justify-end">
          <SortDialog isDialog />
        </div>
      </div>

      <div className="flex-grow px-4 flex flex-col overflow-hidden">
        {isInitialDataLoad ? (
          <Loader />
        ) : (
          // TODO: create CategoryTiles option or new component that allows for animated tile inclusion
          <TileScroller
            activeIndex={0}
            onSelectAsset={handleSelectCoin}
            isSelectable
            multiSelectEnabled
            isOnSendPage={isOnSendPage}
            isEditPage
          />
        )}
        <SearchBar />
      </div>

      <Separator variant="top" />
      <div className="flex justify-center mb-4">
        <Button
          className="w-[56%] text-center"
          disabled={selectedCoins.length === 0}
          onClick={() => confirmSelection()}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const EditCoinListScreen = (props: EditCoinListScreenProps) => {
  if (props?.withWrappers) {
    return (
      <AuthenticatedScreenWrapper {...props}>
        <MainLayout>
          <EditCoinList {...props} isOnSendPage={false} />
        </MainLayout>
      </AuthenticatedScreenWrapper>
    );
  }
  return <EditCoinList {...props} />;
};

export default EditCoinListScreen;
