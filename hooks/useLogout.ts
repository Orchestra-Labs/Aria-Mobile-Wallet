// import { useNavigate } from 'react-router-dom';
// import { removeSessionData, resetNodeErrorCounts } from '@/helpers';
// import { ROUTES } from '@/constants';
import { useSetAtom } from 'jotai';
import { isLoggedInAtom } from '@/atoms';

// ! TODO uncomment this lines

export const useLogout = () => {
  // const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const logout = () => {
    // Clear necessary data
    // resetNodeErrorCounts();
    // removeSessionData();

    // Update login status to trigger re-renders
    setIsLoggedIn(false);

    // Redirect to the login page

    // TODO: uncomment this line when the route is ready
    // navigate(ROUTES.AUTH.ROOT);
  };

  return logout;
};
