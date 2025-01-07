import { atomWithStorage } from 'jotai/utils';
import { LocalStorage } from './localStorage';
import { atom } from 'jotai';

type Update<T> = T | ((prev: T) => T);

export const atomWithAsyncStorage = <
  T extends Parameters<typeof atomWithStorage>[1],
>(
  key: Parameters<typeof atomWithStorage>[0],
  initialValue: T,
) => {
  const baseAtom = atom<T | 'loading'>('loading');

  const getItem = async () =>
    (await LocalStorage.getItem<T>(key)) || initialValue;
  baseAtom.onMount = (setValue) => {
    (async () => {
      const item = await getItem();
      setValue(item);
    })();
  };
  const derivedAtom = atom(
    async (get) => {
      const value = await get(baseAtom);
      if (value === 'loading') {
        return await getItem();
      }
      return value as T;
    },
    async (get, set, update: Update<T>) => {
      const nextValue =
        typeof update === 'function'
          ? (update as (prev: T) => T)(get(baseAtom) as unknown as T)
          : update;
      await set(baseAtom, nextValue);
      // await set(derivedAtom, nextValue);
      await LocalStorage.setItem(key, nextValue);
    },
  );
  derivedAtom.onMount = (setValue) => {
    (async () => {
      const item = await getItem();
      setValue(item);
    })();
  };

  return derivedAtom;
};
