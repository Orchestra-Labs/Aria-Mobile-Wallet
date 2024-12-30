import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data to AsyncStorage
 * @param key - The key under which to store the value
 * @param value - The value to store
 */
const setItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param key - The key to retrieve the value for
 * @returns The parsed value or null
 */
const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param key - The key to remove
 */
const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};

/**
 * Clear all AsyncStorage data
 */
const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage', error);
  }
};

export const LocalStorage = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
};
