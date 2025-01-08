import { removeSessionData, resetNodeErrorCounts } from '@/helpers';
import { ROUTES } from '@/constants';
import { useSetAtom } from 'jotai';
import { isLoggedInAtom, userAccountAtom, walletAddressAtom } from '@/atoms';
import { router } from 'expo-router';

export const useLogout = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const userAccount = useSetAtom(userAccountAtom);
  const setWalletAddress = useSetAtom(walletAddressAtom);

  const logout = async () => {
    // Clear necessary data
    await resetNodeErrorCounts();
    await removeSessionData();

    // Update login status to trigger re-renders
    setIsLoggedIn(false);
    userAccount(null);
    setWalletAddress('');

    // Redirect to the login page
    router.replace(ROUTES.AUTH.ROOT);
  };

  return logout;
};
