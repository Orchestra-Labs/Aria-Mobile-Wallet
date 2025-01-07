import { userCanLogIn } from '@/helpers';
import { useEffect, useState } from 'react';

export const useUserCanLogin = () => {
  const [loading, setLoading] = useState(true);
  const [canLogIn, setCanLogIn] = useState(false);

  useEffect(() => {
    (async () => {
      const canLogIn = await userCanLogIn();
      setCanLogIn(canLogIn);
      setLoading(false);
    })();
  }, []);

  return {
    loading,
    userCanLogIn: canLogIn,
  };
};
