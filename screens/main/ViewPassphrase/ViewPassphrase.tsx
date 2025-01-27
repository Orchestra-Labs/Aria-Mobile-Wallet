'use dom';

import '@tailwind';

import React, { useEffect } from 'react';
import { Header, RecoveryPhraseGrid } from '@/components';
import { ROUTES } from '@/constants';
import { useSetAtom } from 'jotai';
import { mnemonic12State, mnemonic24State, use24WordsState } from '@/atoms';
import { router } from 'expo-router';
import { useSessionToken } from '@/hooks';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { MainLayout } from '@/layouts';
import { DOMProps } from 'expo/dom';

type ViewPassphraseScreenProps = {
  dom?: DOMProps;
};

const ViewPassphrase: React.FC = () => {
  const setMnemonic12 = useSetAtom(mnemonic12State);
  const setMnemonic24 = useSetAtom(mnemonic24State);
  const setUse24Words = useSetAtom(use24WordsState);

  const { sessionToken, loading: loadingSessionToken } = useSessionToken();

  useEffect(() => {
    if (loadingSessionToken) return;
    const passphrase = sessionToken?.mnemonic.split(' ');

    const passphraseLength = passphrase?.length;
    const passphraseIs24Words = passphraseLength === 24;

    if (!passphrase) {
      return router.push(ROUTES.APP.ROOT);
    }

    if (passphraseIs24Words) {
      setUse24Words(true);
      setMnemonic24(passphrase);
    } else {
      setUse24Words(false);
      setMnemonic12(passphrase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken, loadingSessionToken]);

  return (
    <div className="h-full">
      <Header title="Recovery phrase" />

      <div className="w-full h-full pt-7 flex flex-col px-6">
        <p className="mt-2.5 text-base text-neutral-1">
          Remember to keep your phrase hidden!
        </p>
        <RecoveryPhraseGrid singleWordCount />
      </div>
    </div>
  );
};

const ViewPassphraseScreen = (_: ViewPassphraseScreenProps) => {
  return (
    <AuthenticatedScreenWrapper>
      <MainLayout>
        <ViewPassphrase />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
};

export default ViewPassphraseScreen;
