import CryptoJS from 'crypto-js';

export const encryptMnemonic = (mnemonic: string, password: string): string => {
  return CryptoJS.AES.encrypt(mnemonic, password).toString();
};

export const decryptMnemonic = (
  encryptedMnemonic: string,
  password: string,
): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
