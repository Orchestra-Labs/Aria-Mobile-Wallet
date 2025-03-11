import { WalletKit, IWalletKit } from '@reown/walletkit';
import { Core } from '@walletconnect/core';

export let walletkit: IWalletKit;

export async function createWalletKit() {
  if (walletkit) return;
  const core = new Core({
    projectId: process.env.EXPO_PUBLIC_REOWN_PROJECT_ID,
    logger: 'trace',
  });
  walletkit = await WalletKit.init({
    core,
    metadata: {
      name: 'Aria Wallet',
      description: 'Symphony chain Wallet',
      url: 'https://orchestralabs.org/',
      icons: ['https://orchestralabs.org/favicon.ico'],
    },
  });
}
