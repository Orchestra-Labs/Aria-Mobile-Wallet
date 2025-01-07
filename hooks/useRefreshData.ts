import { useAtom } from 'jotai';
import { useValidatorDataRefresh } from './useValidatorDataRefresh';
import { useWalletAssetsRefresh } from './useWalletDataRefresh';
import { walletAddressAtom } from '@/atoms';

export function useRefreshData() {
  const [walletAddress] = useAtom(walletAddressAtom);
  const { triggerWalletDataRefresh } = useWalletAssetsRefresh();
  const { triggerValidatorDataRefresh } = useValidatorDataRefresh();

  const refreshData = async ({
    wallet = true,
    validator = true,
    address,
  }: { wallet?: boolean; validator?: boolean; address?: string } = {}) => {
    const targetAddress = address || walletAddress;

    if (wallet) {
      triggerWalletDataRefresh(targetAddress);
    }
    if (validator) {
      triggerValidatorDataRefresh(targetAddress);
    }
  };

  return { refreshData };
}
