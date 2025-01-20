import {
  symphonyAssetsAtom,
  isFetchingWalletDataAtom,
  isInitialDataLoadAtom,
  sendStateAtom,
  userWalletAtom,
  validatorDataAtom,
  walletAssetsAtom,
} from '@/atoms';
import { userAccountAtom } from '@/atoms/accountAtom';
import { getWalletByID } from '@/helpers/dataHelpers/account';
import { useExchangeAssetsQuery } from '@/hooks';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const DataManager: React.FC = () => {
  const [walletAssets] = useAtom(walletAssetsAtom);
  const [isInitialDataLoad, setIsInitialDataLoad] = useAtom(
    isInitialDataLoadAtom,
  );
  const isFetchingWalletData = useAtomValue(isFetchingWalletDataAtom);
  const validatorState = useAtomValue(validatorDataAtom);
  const isFetchingValidatorData = useAtomValue(isFetchingWalletDataAtom);
  const userAccount = useAtomValue(userAccountAtom);
  const setUserWallet = useSetAtom(userWalletAtom);

  const {
    data: availableAssets,
    isLoading: loadingExchangeAssets,
    refetch: refetchExchangeAssets,
    error: errorExchangeAssets,
  } = useExchangeAssetsQuery();

  const sendState = useAtomValue(sendStateAtom);
  const setExchangeAssets = useSetAtom(symphonyAssetsAtom);

  useEffect(() => {
    if (isInitialDataLoad) {
      const initialLoadHasCompleted =
        !isFetchingWalletData &&
        !isFetchingValidatorData &&
        (walletAssets.length > 0 || validatorState.length > 0);

      if (initialLoadHasCompleted) {
        setIsInitialDataLoad(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isInitialDataLoad,
    isFetchingWalletData,
    isFetchingValidatorData,
    walletAssets,
    validatorState,
  ]);

  useEffect(() => {
    if (userAccount) {
      const wallet = getWalletByID(
        userAccount,
        userAccount.settings.activeWalletID,
      );
      if (wallet) setUserWallet(wallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccount]);

  useEffect(() => {
    if (!loadingExchangeAssets && !errorExchangeAssets) return;
    setExchangeAssets(availableAssets ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAssets, loadingExchangeAssets]);

  useEffect(() => {
    if (errorExchangeAssets) {
      console.error('Error fetching exchange assets:', errorExchangeAssets);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorExchangeAssets]);

  useEffect(() => {
    refetchExchangeAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccount?.id, sendState.asset, walletAssets]);

  return null;
};
