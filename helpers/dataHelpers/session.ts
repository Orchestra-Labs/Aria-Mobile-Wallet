import { SessionToken } from '@/types';
import { Secp256k1HdWallet } from '@cosmjs/amino';
import { LocalStorage } from '../localStorage';

export const userIsLoggedIn = () => {
  // TODO: implement this function
  return false;
};

const SESSION_KEY = 'sessionToken';

const saveSessionToken = (sessionToken: SessionToken): void => {
  const sessionTokenJSON = JSON.stringify(sessionToken);
  LocalStorage.setItem(SESSION_KEY, sessionTokenJSON);
  console.log('Session token saved to localStorage');
};

export const saveSessionData = async (
  wallet: Secp256k1HdWallet,
  accountID: string,
  persist: boolean = false,
): Promise<SessionToken> => {
  const mnemonic = wallet.mnemonic;
  const sessionStartTime = new Date().toISOString();

  const sessionToken: SessionToken = {
    mnemonic,
    accountID,
    rememberMe: persist,
    timestamp: sessionStartTime,
  };
  saveSessionToken(sessionToken);

  return sessionToken;
};
