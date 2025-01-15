import { SessionStorage } from '@/helpers';
import { useEffect } from 'react';

/**
 * Custom hook to reload session storage.
 * Use only once in the root wrapper in separate DOM component
 *
 * This hook clears all data from session storage upon initialization
 */

export const useReloadSessionStorage = () => {
  const reloadSessionStorage = async () => {
    await SessionStorage.clearStorage();
    console.info('Session storage cleared');
  };

  useEffect(() => {
    reloadSessionStorage();
  }, []);
};
