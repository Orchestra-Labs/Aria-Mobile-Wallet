import { NetworkLevel, STORED_DATA_TIMEOUT } from '@/constants';
import { IBCConnectionFile } from '@/types';
import { LocalStorage } from '../localStorage';

const IBC_FILE_KEY_PREFIX = {
  testnet: 'testnet_ibcFileCache_',
  mainnet: 'mainnet_ibcFileCache_',
};

const getFileCacheKey = (network: NetworkLevel, fileName: string): string => {
  return `${IBC_FILE_KEY_PREFIX[network]}_${fileName}`;
};

export const getIBCFile = async (
  network: NetworkLevel,
  fileName: string,
): Promise<IBCConnectionFile | null> => {
  const cacheKey = getFileCacheKey(network, fileName);
  const storedData = await LocalStorage.getItem<string>(cacheKey);

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData) as IBCConnectionFile;
      console.log(
        `Parsed IBC file (${fileName}) from localStorage:`,
        parsedData,
      );
      return parsedData;
    } catch (error) {
      console.error(
        `Failed to parse IBC file (${fileName}) from localStorage:`,
        error,
      );
    }
  }
  return null;
};

export const saveIBCFile = async (
  network: NetworkLevel,
  fileName: string,
  data: any,
): Promise<void> => {
  const cacheKey = getFileCacheKey(network, fileName);
  const storageData = {
    lastUpdated: new Date().toISOString(),
    data,
  };

  await LocalStorage.setItem(cacheKey, JSON.stringify(storageData));
  console.log(`Saved IBC file (${fileName}) to localStorage.`);
};

export const ibcFileNeedsRefresh = (
  file: IBCConnectionFile | null,
): boolean => {
  if (!file) return true;

  const lastUpdatedTime = new Date(file.lastUpdated).getTime();
  const currentTime = new Date().getTime();
  return currentTime - lastUpdatedTime >= STORED_DATA_TIMEOUT;
};

export const deleteIBCFile = async (
  network: NetworkLevel,
  fileName: string,
): Promise<void> => {
  const cacheKey = getFileCacheKey(network, fileName);
  await LocalStorage.removeItem(cacheKey);
  console.log(`Deleted IBC file (${fileName}) from localStorage.`);
};

export const clearIBCFilesForNetwork = (): void => {
  Object.keys(localStorage).forEach(async (key) => {
    if (key.startsWith(`${IBC_FILE_KEY_PREFIX}`)) {
      await LocalStorage.removeItem(key);
      console.log(`Cleared IBC file (${key}) from localStorage.`);
    }
  });
};
