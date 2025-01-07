'use dom';

import '@tailwind';

import React, { useEffect } from 'react';

import { LogoWhite } from '@/assets/icons/LogoWhite/LogoWhite';
import { ROUTES } from '@/constants';
import { Button } from '@/ui-kit';
import { useSetAtom } from 'jotai';
import {
  mnemonic12State,
  mnemonic24State,
  mnemonicVerifiedState,
  use24WordsState,
} from '@/atoms';
import { Link } from 'expo-router';

const NewWallet: React.FC = () => {
  const setMnemonic12 = useSetAtom(mnemonic12State);
  const setMnemonic24 = useSetAtom(mnemonic24State);
  const setUse24Words = useSetAtom(use24WordsState);
  const setMnemonicVerified = useSetAtom(mnemonicVerifiedState);

  const clearState = () => {
    setMnemonic12(new Array(12).fill(''));
    setMnemonic24(new Array(24).fill(''));
    setUse24Words(false);
    setMnemonicVerified(false);
  };

  useEffect(() => {
    clearState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[300px] mx-auto mt-7 h-full flex items-center flex-col justify-between text-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-h2 font-bold text-center">
          Welcome to Symphony wallet
        </h1>
        <div className="py-1.5">
          <LogoWhite className="w-[156px]" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-2">
        <Button className="w-full" asChild>
          <Link href={ROUTES.AUTH.NEW_WALLET.CREATE}>Create wallet</Link>
        </Button>
        <span className="mt-2.5 mb-3.5 text-sm">or</span>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={ROUTES.AUTH.NEW_WALLET.IMPORT}>Import existing</Link>
        </Button>
        <div className="mt-4">
          <span className="text-base text-white mr-1">
            Already have a wallet?
          </span>
          <Button variant="link" size="xsmall" className="text-base" asChild>
            <Link href={ROUTES.AUTH.ROOT}>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewWallet;
