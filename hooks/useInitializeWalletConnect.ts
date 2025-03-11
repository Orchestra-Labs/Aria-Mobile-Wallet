import { isLoggedInAtom } from '@/atoms';
import { getSessionToken } from '@/helpers';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { createWalletKit } from '@/helpers/walletConnect';

export const useInitializeWalletConnect = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const [loading, setLoading] = useState(true);

  const initializeWalletConnect = async () => {
    if (!isLoggedIn) return;

    const sessionToken = await getSessionToken();

    if (!sessionToken?.mnemonic) {
      return;
    }

    try {
      await createWalletKit();
    } catch (error) {
      console.error('Failed to initialize WalletConnect: ', error);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await initializeWalletConnect();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return { loading };
};
