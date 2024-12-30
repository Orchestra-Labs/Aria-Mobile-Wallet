import { AccountRecord, SubscriptionRecord, WalletRecord } from '@/types';
import { LocalStorage } from '../localStorage';
import { getPasswordRecords, hashPassword, savePasswordHash } from './password';
import { generateUUID } from '../uuid';
import { createWallet } from './wallet';
import { saveSessionData } from './session';

const ACCOUNTS_KEY = 'accountsToken';

export const getAccounts = async (): Promise<AccountRecord[]> => {
  console.log('Fetching accounts from local storage');
  const accounts = await LocalStorage.getItem<string>(ACCOUNTS_KEY);
  const parsedAccounts = accounts ? JSON.parse(accounts) : [];
  console.log('Accounts retrieved:', parsedAccounts);
  return parsedAccounts;
};

const saveAccounts = (accounts: AccountRecord[]): void => {
  console.log('Saving accounts to local storage:', accounts);
  LocalStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  console.log('Accounts saved successfully.');
};

export const getAccountByID = async (
  id: string,
): Promise<AccountRecord | null> => {
  const accounts = await getAccounts();
  return accounts.find((acc) => acc.id === id) || null;
};

export const getAccountIDByPassword = async (
  inputPassword: string,
): Promise<string | null> => {
  console.log('Searching for password hash in records');
  const passwords = await getPasswordRecords();
  const index = passwords.findIndex(
    (record) => hashPassword(inputPassword, record.salt) === record.hash,
  );
  console.log('Password hash found at index:', index);
  return index !== -1 ? passwords[index].id : null;
};

export const saveAccountByID = async (
  updatedAccount: AccountRecord,
): Promise<boolean> => {
  const accounts = await getAccounts();
  const accountIndex = accounts.findIndex(
    (acc) => acc.id === updatedAccount.id,
  );

  if (accountIndex === -1) {
    console.warn(`Account with id ${updatedAccount.id} not found.`);
    return false;
  }

  accounts[accountIndex] = updatedAccount;
  saveAccounts(accounts);
  return true;
};

export const removeAccountByID = async (id: string): Promise<boolean> => {
  console.log(`Removing account by ID: ${id}`);
  const accounts = await getAccounts();
  const filteredAccounts = accounts.filter((acc) => acc.id === id);

  if (accounts.length === filteredAccounts.length) {
    console.warn(`Account with ID ${id} not found.`);
    return false;
  }

  saveAccounts(filteredAccounts);
  console.log(`Account with ID ${id} removed successfully.`);
  return true;
};

// TODO: check password for ifExists. If exists, add wallet.  if not exists, create account
export const createAccount = async (
  mnemonic: string,
  password: string,
  walletName: string,
  subscriptions: { [networkID: string]: SubscriptionRecord } = {},
  persist: boolean = true,
): Promise<AccountRecord> => {
  console.log('Creating new account with walletName:', walletName);

  const accountID = generateUUID();
  const passwordHash = await savePasswordHash(accountID, password);
  console.log('Password hash generated:', passwordHash);

  const walletInfo = await createWallet(mnemonic, password, walletName);
  const secpWallet = walletInfo.wallet;
  const walletRecord = walletInfo.walletRecord;
  console.log('Wallet created and wallet record generated:', walletRecord);

  // Set default network and coin denom based on the first entry in subscriptions, if available
  const defaultNetworkID = Object.keys(subscriptions)[0] || '';
  const defaultCoinDenom =
    subscriptions[defaultNetworkID]?.coinDenoms?.at(0) || '';

  const newAccount: AccountRecord = {
    id: accountID,
    settings: {
      hasSetCoinList: false,
      defaultNetworkID,
      defaultCoinDenom,
      subscribedTo: subscriptions,
      activeWalletID: walletRecord.id,
    },
    wallets: [walletRecord],
  };

  console.log('New account structure:', newAccount);

  const accounts = await getAccounts();
  accounts.push(newAccount);
  saveAccounts(accounts);
  console.log('New account saved successfully.');

  const sessionCreated = await saveSessionData(
    secpWallet,
    passwordHash,
    persist,
  );
  console.log('Session created:', sessionCreated);

  if (!sessionCreated) {
    throw new Error('Failed to create wallet session');
  }

  return newAccount;
};

export const getWalletByID = (
  account: AccountRecord,
  walletID: string,
): WalletRecord | null => {
  const walletRecord = account.wallets.find((wallet) => wallet.id === walletID);
  return walletRecord ? walletRecord : null;
};

export const addWalletToAccount = async (
  accountID: string,
  wallet: WalletRecord,
): Promise<boolean> => {
  const account = await getAccountByID(accountID);
  if (!account) return false;

  const walletExists = account.wallets.some(
    (existingWallet) => existingWallet.id === wallet.id,
  );
  if (walletExists) {
    console.warn('Wallet with this ID already exists in the account.');
    return false;
  }

  account.wallets.push(wallet);
  saveAccountByID(account);
  console.log('Wallet added to account successfully.');

  return true;
};

export const removeWalletFromAccount = async (
  accountID: string,
  walletID: string,
): Promise<boolean> => {
  console.log(
    `Removing wallet with ID ${walletID} from account with ID ${accountID}`,
  );

  const account = await getAccountByID(accountID);
  if (!account) {
    console.warn(`Account with ID ${accountID} not found.`);
    return false;
  }

  const walletIndex = account.wallets.findIndex(
    (wallet) => wallet.id === walletID,
  );

  if (walletIndex === -1) {
    console.warn(`Wallet with ID ${walletID} not found in account.`);
    return false;
  }

  if (account.wallets.length <= 1) {
    console.warn(
      `Cannot remove wallet; account must retain at least one wallet.`,
    );
    return false;
  }

  account.wallets.splice(walletIndex, 1);
  console.log(
    `Wallet with ID ${walletID} removed. Remaining wallets:`,
    account.wallets,
  );

  if (account.settings.activeWalletID === walletID) {
    account.settings.activeWalletID = account.wallets[0].id;
    console.log(
      'Active wallet ID updated to:',
      account.settings.activeWalletID,
    );
  }

  saveAccountByID(account);
  console.log('Account updated successfully after wallet removal.');
  return true;
};
