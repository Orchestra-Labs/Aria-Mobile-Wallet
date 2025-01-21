import { atom } from 'jotai';
import { Asset, WalletRecord } from '@/types';
import { atomWithAsyncStorage, filterAndSortAssets } from '@/helpers';
import { userAccountAtom } from './accountAtom';
import { LOCAL_CHAIN_REGISTRY } from '@/constants';
import {
  assetDialogSortOrderAtom,
  assetDialogSortTypeAtom,
  assetSortOrderAtom,
  assetSortTypeAtom,
  dialogSearchTermAtom,
  searchTermAtom,
} from './searchFilterAtom';
import { showAllAssetsAtom } from './assetsAtom';
import { symphonyAssetsAtom } from './exchangeAssetAtom';

export const userWalletAtom = atomWithAsyncStorage<WalletRecord | null>(
  'userWalletAtom',
  null,
);

export const walletAddressAtom = atomWithAsyncStorage<string>(
  'walletAddressAtom',
  '',
);
export const walletAssetsAtom = atomWithAsyncStorage<Asset[]>(
  'walletAssetsAtom',
  [],
);
// Read only
export const walletStateAtom = atom(async (get) => ({
  address: await get(walletAddressAtom),
  assets: await get(walletAssetsAtom),
}));

export const subscribedAssetsAtom = atom(async (get) => {
  const walletState = await get(walletStateAtom);
  const userAccount = await get(userAccountAtom);
  const symphonyAssets = await get(symphonyAssetsAtom);

  console.log('symphony assets:', symphonyAssets);

  const visibleAssets: Asset[] = [];
  if (userAccount && userAccount.settings.subscribedTo) {
    Object.entries(userAccount.settings.subscribedTo).forEach(
      ([networkID, subscription]) => {
        const networkAssets = symphonyAssets.reduce(
          (map: { [key: string]: Asset }, asset) => {
            map[asset.denom] = asset;
            return map;
          },
          {},
        );

        const hasCoinSubscriptions = subscription.coinDenoms.length > 0;

        if (hasCoinSubscriptions) {
          subscription.coinDenoms.forEach((denom) => {
            const asset = networkAssets[denom];
            if (asset) {
              const walletAsset = walletState.assets.find(
                (wAsset) => wAsset.denom === denom,
              );
              visibleAssets.push(
                walletAsset ? walletAsset : { ...asset, amount: '0' },
              );
            } else {
              console.warn(
                `Asset with denom ${denom} not found in network assets for ${networkID}`,
              );
            }
          });
        } else {
          Object.values(symphonyAssets).forEach((asset) => {
            const walletAsset = walletState.assets.find(
              (wAsset) => wAsset.denom === asset.denom,
            );
            visibleAssets.push(
              walletAsset ? walletAsset : { ...asset, amount: '0' },
            );
          });
        }
      },
    );
  } else {
    console.warn('No user account found.');
  }

  return visibleAssets;
});

export const filteredAssetsAtom = atom(async (get) => {
  const walletState = await get(walletStateAtom);
  const searchTerm = await get(searchTermAtom);
  const sortOrder = get(assetSortOrderAtom);
  const sortType = get(assetSortTypeAtom);
  const showAllAssets = await get(showAllAssetsAtom);
  const userAccount = await get(userAccountAtom);

  const visibleAssets: Asset[] = [];

  const assets = (await walletState.assets) || [];

  if (userAccount) {
    Object.entries(userAccount.settings.subscribedTo || {}).forEach(
      ([networkID, subscription]) => {
        console.log(`Processing networkID: ${networkID}`, subscription);

        const networkAssets = LOCAL_CHAIN_REGISTRY[networkID]?.assets;

        if (!networkAssets) {
          console.warn(`No assets found for networkID: ${networkID}`);
          return;
        }

        if (subscription.coinDenoms.length === 0) {
          console.log(
            `No specific denoms subscribed for ${networkID}, including all assets.`,
          );
          Object.values(networkAssets).forEach(async (asset) => {
            const walletAsset = assets.find(
              (wAsset) => wAsset.denom === asset.denom,
            );
            visibleAssets.push(
              walletAsset ? walletAsset : { ...asset, amount: '0' },
            );
            console.log(
              'Added asset:',
              walletAsset ? walletAsset : { ...asset, amount: '0' },
            );
          });
        } else {
          console.log(
            `Subscribed denoms for ${networkID}:`,
            subscription.coinDenoms,
          );
          subscription.coinDenoms.forEach((denom) => {
            const asset = networkAssets[denom];
            if (asset) {
              const walletAsset = assets.find(
                (wAsset) => wAsset.denom === denom,
              );
              visibleAssets.push(
                walletAsset ? walletAsset : { ...asset, amount: '0' },
              );
              console.log(
                'Added specific asset:',
                walletAsset ? walletAsset : { ...asset, amount: '0' },
              );
            } else {
              console.warn(
                `Asset with denom ${denom} not found in network assets for ${networkID}`,
              );
            }
          });
        }
      },
    );
  } else {
    console.warn('No user account found.');
  }

  // TODO: change fetch query to sort into slots by chain ID.  this filter chan then include all under a given chain ID

  const filteredAndSortedAssets = filterAndSortAssets(
    visibleAssets,
    searchTerm,
    sortType,
    sortOrder,
    showAllAssets as boolean,
  );
  console.log(
    'Final visible assets after filtering and sorting:',
    filteredAndSortedAssets,
  );
  return filteredAndSortedAssets;
});

export const filteredDialogAssetsAtom = atom(async (get) => {
  const searchTerm = await get(dialogSearchTermAtom);
  const sortOrder = get(assetDialogSortOrderAtom);
  const sortType = get(assetDialogSortTypeAtom);
  const subscribedAssets = await get(subscribedAssetsAtom);
  console.log('subscribed assets, filtered:', subscribedAssets);

  const filteredAndSortedDialogAssets = filterAndSortAssets(
    subscribedAssets,
    searchTerm,
    sortType,
    sortOrder,
  );
  console.log('results, filtered:', filteredAndSortedDialogAssets);

  return filteredAndSortedDialogAssets;
});

// For exchange page, show all possible assets
export const coinListAssetsAtom = atom(async (get) => {
  const searchTerm = await get(dialogSearchTermAtom);
  const sortOrder = get(assetDialogSortOrderAtom);
  const sortType = get(assetDialogSortTypeAtom);
  const subscribedAssets = await get(symphonyAssetsAtom);

  console.log('subscribed assets:', subscribedAssets);
  console.log('searching for:', searchTerm);
  const filteredAndSortedDialogAssets = filterAndSortAssets(
    subscribedAssets,
    searchTerm,
    sortType,
    sortOrder,
  );
  console.log('result of search: ', filteredAndSortedDialogAssets);
  return filteredAndSortedDialogAssets;
});
