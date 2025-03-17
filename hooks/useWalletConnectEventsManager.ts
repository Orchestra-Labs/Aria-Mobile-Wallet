import { ROUTES } from '@/constants';
import { COSMOS_SIGNING_METHODS } from '@/constants/wc';
import { walletkit } from '@/helpers/walletConnect';
import { useApproveWCTransactionMutation } from '@/queries';
import { SignClientTypes } from '@walletconnect/types';
import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';

type Params = { initialized: boolean; pathname: string };

export const useWalletConnectEventsManager = ({
  initialized,
  pathname,
}: Params) => {
  const { mutate: approveWCTransaction } = useApproveWCTransactionMutation({
    retry: 3,
  });

  /******************************************************************************
   * 1. Open session proposal modal
   *****************************************************************************/
  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      router.replace({
        pathname: ROUTES.APP.WALLET_CONNECT.APPROVE_SESSION,
        params: { proposal: JSON.stringify(proposal) },
      });
    },
    [],
  );

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      if (pathname === ROUTES.APP.WALLET_CONNECT.SIGN_TRANSACTION) return;

      const { params } = requestEvent;
      const { request } = params;
      switch (request.method) {
        case COSMOS_SIGNING_METHODS.COSMOS_SIGN_DIRECT:
        case COSMOS_SIGNING_METHODS.COSMOS_SIGN_AMINO:
          return router.replace({
            pathname: ROUTES.APP.WALLET_CONNECT.SIGN_TRANSACTION,
            params: { requestEvent: JSON.stringify(requestEvent) },
          });
        case COSMOS_SIGNING_METHODS.COSMOS_GET_ACCOUNTS:
          return approveWCTransaction({
            requestEvent,
          });
        default:
          alert('Unsupported method');
      }
    },
    [pathname],
  );

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (!initialized || !walletkit) return;
    walletkit.on('session_proposal', onSessionProposal);
    walletkit.on('session_request', onSessionRequest);

    walletkit.on('session_authenticate', () => {
      alert('session_authenticate');
    });

    return () => {
      walletkit.off('session_request', onSessionRequest);
      walletkit.off('session_proposal', onSessionProposal);
    };
  }, [initialized, onSessionProposal, onSessionRequest]);
};
