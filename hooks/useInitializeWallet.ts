import { isLoggedInAtom, userAccountAtom, walletAddressAtom } from '@/atoms';
import { getAccountByID, getAddress, getSessionToken } from '@/helpers';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRefreshData } from './useRefreshData';
import { useEffect, useState } from 'react';
import { loadable } from 'jotai/utils';

export const useInitializeWallet = () => {
  const { refreshData } = useRefreshData();

  const isLoggedInAtomState = useAtomValue(loadable(isLoggedInAtom));

  const isLoggedIn =
    'data' in isLoggedInAtomState ? isLoggedInAtomState.data : false;

  const [loading, setLoading] = useState(true);

  const setWalletAddress = useSetAtom(walletAddressAtom);
  const setUserAccount = useSetAtom(userAccountAtom);

  const initializeWallet = async () => {
    if (!isLoggedIn) return;

    const sessionToken = await getSessionToken();

    if (!sessionToken?.mnemonic) {
      return;
    }

    try {
      const address = await getAddress(sessionToken.mnemonic);
      setWalletAddress(address);
      refreshData({ address });

      const accountData = await getAccountByID(sessionToken.accountID);
      setUserAccount(accountData);
    } catch (error) {
      console.error('Error initializing wallet address:', error);
    } finally {
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await initializeWallet();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return { loading };
};
