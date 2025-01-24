import { getSessionToken } from '@/helpers';
import { SessionToken } from '@/types';
import { useEffect, useState } from 'react';

export const useSessionToken = () => {
  const [sessionToken, setSessionToken] = useState<SessionToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const sessionToken = await getSessionToken();
      setSessionToken(sessionToken);
      setLoading(false);
    })();
  }, []);

  return { sessionToken, loading };
};
