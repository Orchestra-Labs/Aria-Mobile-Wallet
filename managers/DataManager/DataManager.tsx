import {
  exchangeAssetsAtom,
  isFetchingWalletDataAtom,
  isInitialDataLoadAtom,
  sendStateAtom,
  userWalletAtom,
  validatorDataAtom,
  walletAssetsAtom,
} from '@/atoms';
import { userAccountAtom } from '@/atoms/accountAtom';
import { getWalletByID } from '@/helpers/dataHelpers/account';
import { useExchangeAssets } from '@/hooks';
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

  const { availableAssets, refetch } = useExchangeAssets();
  const setExchangeAssets = useSetAtom(exchangeAssetsAtom);

  const sendState = useAtomValue(sendStateAtom);

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
    setExchangeAssets(availableAssets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAssets]);

  useEffect(() => {
    const fetchExchangeAssets = async () => {
      try {
        await refetch(); // Ensure refetch is awaited
      } catch (error) {
        console.error('Error fetching exchange assets:', error);
      }
    };

    fetchExchangeAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAccount, sendState, walletAssets]);

  return null;
};
