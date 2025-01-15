import { STORED_DATA_TIMEOUT } from '@/constants';
import { ChainData, PrefixStorage } from '@/types';
import { LocalStorage } from '../localStorage';

const PREFIXES_STORAGE_KEY = 'bech32Prefixes';

export const getPrefixes = async (): Promise<PrefixStorage | null> => {
  const storedData = await LocalStorage.getItem<string>(PREFIXES_STORAGE_KEY);

  if (storedData) {
    try {
      return JSON.parse(storedData) as PrefixStorage;
    } catch (error) {
      console.error('Failed to parse prefixes from localStorage:', error);
    }
  }

  return null;
};

export const savePrefixes = async (data: ChainData[]): Promise<void> => {
  const prefixStorage: PrefixStorage = {
    lastUpdated: new Date().toISOString(),
    data,
  };

  await LocalStorage.setItem(
    PREFIXES_STORAGE_KEY,
    JSON.stringify(prefixStorage),
  );
};

export const prefixesNeedRefresh = (
  prefixStorage: PrefixStorage | null,
): boolean => {
  if (!prefixStorage) return true;

  const lastUpdatedTime = new Date(prefixStorage.lastUpdated).getTime();
  const currentTime = new Date().getTime();

  return currentTime - lastUpdatedTime >= STORED_DATA_TIMEOUT;
};
