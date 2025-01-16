import { LocalStorage } from './localStorage';

const sessionStorageKey = 'session-storage';

/**
 * Save data to SessionStorage
 * @param key - The key under which to store the value
 * @param value - The value to store
 */
const setItem = async <T>(key: string, value: T): Promise<void> => {
  const currentSessionStorage =
    (await LocalStorage.getItem<Record<string, T>>(sessionStorageKey)) || {};

  const newSessionStorage = {
    ...currentSessionStorage,
    [key]: value,
  };

  await LocalStorage.setItem(sessionStorageKey, newSessionStorage);
};

/**
 * Retrieve data from SessionStorage
 * @param key - The key to retrieve the value for
 * @returns The parsed value or null
 */
const getItem = async <T>(key: string): Promise<T | null> => {
  const currentSessionStorage =
    (await LocalStorage.getItem<Record<string, T>>(sessionStorageKey)) || {};

  const value = currentSessionStorage?.[key] || null;
  return value;
};

/**
 * Remove data from SessionStorage
 * @param key - The key to remove
 */
const removeItem = async (key: string): Promise<void> => {
  await setItem(key, null);
};

/**
 * Clear all SessionStorage data
 */
const clearStorage = async (): Promise<void> => {
  await LocalStorage.setItem(sessionStorageKey, null);
};

export const SessionStorage = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
};
