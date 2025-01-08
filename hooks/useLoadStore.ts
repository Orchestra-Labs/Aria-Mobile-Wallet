import {
  dialogSearchTermAtom,
  exchangeAssetsAtom,
  filteredAssetsAtom,
  isFetchingValidatorDataAtom,
  isFetchingWalletDataAtom,
  isInitialDataLoadAtom,
  isLoggedInAtom,
  searchTermAtom,
  sendStateAtom,
  userAccountAtom,
  userWalletAtom,
  validatorDataAtom,
  walletAddressAtom,
  walletAssetsAtom,
  walletStateAtom,
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
    loadable(exchangeAssetsAtom),
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
  ];

  const loaded = !atomStates.find((state) => state === 'loading');

  return {
    loaded,
  };
};
