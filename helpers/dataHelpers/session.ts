import { SessionToken } from '@/types';
import { Secp256k1HdWallet } from '@cosmjs/amino';
import { LocalStorage } from '../localStorage';

export const userIsLoggedIn = async () => {
  const token = await getSessionToken();
  return token != null;
};

const SESSION_KEY = 'sessionToken';

const saveSessionToken = async (sessionToken: SessionToken): Promise<void> => {
  const sessionTokenJSON = JSON.stringify(sessionToken);
  await LocalStorage.setItem(SESSION_KEY, sessionTokenJSON);
  console.log('Session token saved to localStorage');
};

export const getSessionToken = async (): Promise<SessionToken | null> => {
  try {
    const tokenString = await LocalStorage.getItem<string>(SESSION_KEY);
    if (!tokenString) return null;

    const token = JSON.parse(tokenString);

    // Validate token structure
    if (!token || !token.mnemonic || !token.accountID) {
      console.error('Invalid token structure:', token);
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error retrieving session token:', error);
    return null;
  }
};

export const removeSessionData = async () => {
  await LocalStorage.removeItem(SESSION_KEY);
  console.log('Session token removed');
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
  await saveSessionToken(sessionToken);

  return sessionToken;
};
