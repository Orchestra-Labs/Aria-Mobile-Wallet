'use dom';

import React, { useEffect } from 'react';
import { ScreenLoader } from '@/components';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { DOMComponentProps } from '@/types';
import { useInitWCSessionMutation } from '@/queries';
import { router } from 'expo-router';
import { useToast } from '@/hooks';
import { sleep } from '@walletconnect/utils';
import { ROUTES } from '@/constants';

interface WalletConnectScannerProps extends DOMComponentProps {
  uri: string;
}

const WalletConnectInitSession: React.FC<WalletConnectScannerProps> = ({
  uri,
}) => {
  const { mutateAsync: initWCSession } = useInitWCSessionMutation();

  const { toast } = useToast();

  const closeScreen = () => {
    router.dismissTo(ROUTES.APP.ROOT);
  };

  useEffect(() => {
    if (!uri) return;

    initWCSession(
      {
        uri,
        onPairingExpired: async () => {
          toast({
            title: `Failed to connect wallet`,
            description:
              'Session exired. Please try again with different QR code',
          });
          await sleep(5000);
          closeScreen();
        },
      },
      {
        onError: async (e) => {
          toast({
            title: `Failed to connect wallet`,
            description: e.message,
          });
          await sleep(5000);
          closeScreen();
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return <ScreenLoader />;
};

const WalletConnectInitSessionScreen = (props: WalletConnectScannerProps) => {
  return (
    <AuthenticatedScreenWrapper {...props}>
      <WalletConnectInitSession {...props} />
    </AuthenticatedScreenWrapper>
  );
};

export default WalletConnectInitSessionScreen;
