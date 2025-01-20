import {
  dialogSearchTermAtom,
  symphonyAssetsAtom,
  filteredAssetsAtom,
  isFetchingValidatorDataAtom,
  isFetchingWalletDataAtom,
  isInitialDataLoadAtom,
  isLoggedInAtom,
  searchTermAtom,
  sendStateAtom,
  showAllAssetsAtom,
  userAccountAtom,
  userWalletAtom,
  validatorDataAtom,
  walletAddressAtom,
  walletAssetsAtom,
  walletStateAtom,
  subscribedAssetsAtom,
  coinListAssetsAtom,
} from '@/atoms';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

export const useLoadStore = () => {
  const { state: walletAssetsState } = useAtomValue(loadable(walletAssetsAtom));
  const { state: isFetchingWalletDataState } = useAtomValue(
    loadable(isFetchingWalletDataAtom),
  );
  const { state: validatorDataState } = useAtomValue(
    loadable(validatorDataAtom),
  );
  const { state: userAccountState } = useAtomValue(loadable(userAccountAtom));
  const { state: userWalletState } = useAtomValue(loadable(userWalletAtom));
  const { state: exchangeAssetsState } = useAtomValue(
    loadable(symphonyAssetsAtom),
  );
  const { state: sendStateState } = useAtomValue(loadable(sendStateAtom));
  const { state: isLoggedInState } = useAtomValue(loadable(isLoggedInAtom));

  const { state: walletAddressState } = useAtomValue(
    loadable(walletAddressAtom),
  );
  const { state: isFetchingValidatorDataState } = useAtomValue(
    loadable(isFetchingValidatorDataAtom),
  );
  const { state: filteredAssetsState } = useAtomValue(
    loadable(filteredAssetsAtom),
  );
  const { state: walletStateState } = useAtomValue(loadable(walletStateAtom));
  const { state: isInitialDataLoadState } = useAtomValue(
    loadable(isInitialDataLoadAtom),
  );
  const { state: dialogSearchTermState } = useAtomValue(
    loadable(dialogSearchTermAtom),
  );
  const { state: searchTermState } = useAtomValue(loadable(searchTermAtom));
  const { state: showAllAssetsState } = useAtomValue(
    loadable(showAllAssetsAtom),
  );
  const { state: subscribedAssetsState } = useAtomValue(
    loadable(subscribedAssetsAtom),
  );
  const { state: coinListAssetsState } = useAtomValue(
    loadable(coinListAssetsAtom),
  );

  const atomStates = [
    walletAssetsState,
    isFetchingWalletDataState,
    validatorDataState,
    userAccountState,
    userWalletState,
    exchangeAssetsState,
    sendStateState,
    isLoggedInState,
    walletAddressState,
    isFetchingValidatorDataState,
    filteredAssetsState,
    walletStateState,
    isInitialDataLoadState,
    dialogSearchTermState,
    searchTermState,
    showAllAssetsState,
    subscribedAssetsState,
    coinListAssetsState,
  ];

  const loaded = !atomStates.find((state) => state === 'loading');

  return {
    loaded,
  };
};
