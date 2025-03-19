import { walletStateAtom } from '@/atoms';
import { DEFAULT_CHAIN_ID } from '@/constants';
import { useAtomValue } from 'jotai';

export const useWCAddress = () => {
  const { address } = useAtomValue(walletStateAtom);

  const wcAddress = `cosmos:${DEFAULT_CHAIN_ID}:${address}`;

  return {
    address: wcAddress,
  };
};
