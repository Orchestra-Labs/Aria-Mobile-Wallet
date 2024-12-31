import { removeSessionData, resetNodeErrorCounts } from '@/helpers';
import { ROUTES } from '@/constants';
import { useSetAtom } from 'jotai';
import { isLoggedInAtom } from '@/atoms';
import { router } from 'expo-router';

export const useLogout = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const logout = async () => {
    // Clear necessary data
    await resetNodeErrorCounts();
    await removeSessionData();

    // Update login status to trigger re-renders
    setIsLoggedIn(false);

    // Redirect to the login page
    router.replace(ROUTES.AUTH.ROOT);
  };

  return logout;
};
