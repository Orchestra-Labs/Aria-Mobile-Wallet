import { isLoggedInAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { useUserCanLogin } from './useUserCanLogin';

export const useAuth = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const { loading, userCanLogIn } = useUserCanLogin();

  return { loading, isLoggedIn: !!isLoggedIn, canLogIn: userCanLogIn };
};
