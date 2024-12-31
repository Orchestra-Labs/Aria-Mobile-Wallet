import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const atomWithAsyncStorage = <
  T extends Parameters<typeof atomWithStorage>[1],
>(
  key: Parameters<typeof atomWithStorage>[0],
  content: T,
) => {
  const storage = createJSONStorage<T>(() => AsyncStorage);
  return atomWithStorage<T>(key, content, storage);
};
