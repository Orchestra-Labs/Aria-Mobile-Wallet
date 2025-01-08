import { isLoggedInAtom, userAccountAtom, walletAddressAtom } from '@/atoms';
import { getAccountByID, getAddress, getSessionToken } from '@/helpers';
import { useAtom, useAtomValue } from 'jotai';
import { useRefreshData } from './useRefreshData';
import { useEffect, useState } from 'react';

export const useInitializeWallet = () => {
  const { refreshData } = useRefreshData();

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const [loading, setLoading] = useState(true);

  const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
  const [userAccount, setUserAccount] = useAtom(userAccountAtom);

  const initializeWallet = async () => {
    if (!isLoggedIn) return;

    const sessionToken = await getSessionToken();

    if (!sessionToken?.mnemonic) {
      return;
    }

    try {
      const address = await getAddress(sessionToken.mnemonic);
      refreshData({ address });
      if (walletAddress === address) return;
      setWalletAddress(address);

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
  }, [isLoggedIn, userAccount, walletAddress]);

  return { loading };
};
