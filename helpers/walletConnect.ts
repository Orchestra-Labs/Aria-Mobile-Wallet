import { ENV } from '@/constants';
import { WalletKit, IWalletKit } from '@reown/walletkit';
import { Core } from '@walletconnect/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IKeyValueStorage } from '@walletconnect/keyvaluestorage';

export let walletkit: IWalletKit;

class WCStorage implements IKeyValueStorage {
  // Retrieve all keys
  async getKeys() {
    const keys = await AsyncStorage.getAllKeys();
    return (keys as string[]) || []; // Ensure it returns an array
  }

  // Retrieve a specific item
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  // Store an item
  async setItem<T>(key: string, value: T) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  // Remove an item
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }

  // Retrieve all key-value pairs safely
  async getEntries<T>() {
    const keys = await this.getKeys();
    if (keys.length === 0) return [];

    const entries = await AsyncStorage.multiGet(keys);

    // Ensure no `null` values by replacing them with empty strings
    return [
      ...(entries.map(
        ([key, value]) => [key, value ? JSON.parse(value) : ''] as const,
      ) as [string, T][]),
    ];
  }
}
export async function createWalletKit() {
  if (walletkit) return;
  const core = new Core({
    projectId: ENV.WALLETCONNECT_PROJECT_ID,
    logger: 'trace',
    storage: new WCStorage(),
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

  const clientId = await walletkit.engine.signClient.core.crypto.getClientId();
  console.log(`WalletKit initialized with Client ID: ${clientId}`);
}
