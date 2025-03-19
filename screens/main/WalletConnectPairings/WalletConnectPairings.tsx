'use dom';

import React from 'react';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { router } from 'expo-router';
import { Header, PairingTile } from '@/components';
import { DOMComponentProps } from '@/types';
import { ROUTES } from '@/constants';
import { useGetWCPairingsQuery } from '@/queries';
import { MainLayout } from '@/layouts';

const PAGE_TITLE = 'Connected Websites';

type WalletConnectPairingsProps = DOMComponentProps;

const WalletConnectPairings: React.FC<WalletConnectPairingsProps> = () => {
  const { data: pairings } = useGetWCPairingsQuery();

  const closeScreen = () => {
    router.push(ROUTES.APP.ROOT);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden text-white">
      <Header title={PAGE_TITLE} onClose={closeScreen} />

      <div className="p-4 mt-4 h-full flex flex-grow flex-col gap-2">
        {!pairings?.length && (
          <p className="font-bold text-center text-xl flex-grow h-full flex items-center justify-center">
            No connected websites yet
          </p>
        )}
        {pairings?.map((pairing) => (
          <PairingTile pairing={pairing} key={pairing.topic} />
        ))}
      </div>
    </div>
  );
};

const WalletConnectPairingsScreen = (props: WalletConnectPairingsProps) => {
  return (
    <AuthenticatedScreenWrapper {...props}>
      <MainLayout>
        <WalletConnectPairings {...props} />
      </MainLayout>
    </AuthenticatedScreenWrapper>
  );
};

export default WalletConnectPairingsScreen;
