'use dom';

import { useReloadSessionStorage } from '@/hooks';

const SessionStorageLoader = () => {
  useReloadSessionStorage();

  return null;
};

export default SessionStorageLoader;
