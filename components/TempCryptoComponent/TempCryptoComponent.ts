import {useEffect} from 'react';
import {
  decryptMnemonic,
  encryptMnemonic,
} from '../../helpers/dataHelpers/crypto';

const mnemonic =
  'access fury hip actual legal hidden fatigue lawsuit yard render lawn book';
const password = '123';

export const TempCryptoComponent = () => {
  useEffect(() => {
    const encryptedMnemonic = encryptMnemonic(mnemonic, password);
    console.log('🚀 ~ encryptedMnemonic:', encryptedMnemonic);
    const decryptedMnemonic = decryptMnemonic(encryptedMnemonic, password);
    console.log('🚀 ~ decryptedMnemonic:', decryptedMnemonic);
  }, []);

  return null;
};
