'use dom';

import React from 'react';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { SignClientTypes } from '@walletconnect/types';
import { router } from 'expo-router';
import { useSupportedWCNamespaces, useToast } from '@/hooks';
import { useApproveWCSessionMutation } from '@/queries/useApproveWCSession.mutation';
import { useRejectWCSessionMutation } from '@/queries/useRejectWCSession.mutation';
import { Header, WCProposalButtons } from '@/components';
import { COSMOS_CHAINS } from '@/constants/wc';
import { DOMComponentProps } from '@/types';
import { WCProposalMetadata } from '@/components';
import { ROUTES } from '@/constants';
import { sleep } from '@/helpers';

const PAGE_TITLE = 'Requesting Connection';

interface WalletConnectApproveSessionProps extends DOMComponentProps {
  proposal: SignClientTypes.EventArguments['session_proposal'];
}

const WalletConnectApproveSession: React.FC<
  WalletConnectApproveSessionProps
> = ({ proposal }) => {
  const { metadata } = proposal.params.proposer;

  const chainIds: string[] =
    Object.values(proposal.params.requiredNamespaces).flatMap(
      ({ chains }) => chains?.map((chain) => chain) ?? [],
    ) ?? [];

  const chains = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  }).format(
    chainIds.map(
      (chainId) =>
        COSMOS_CHAINS?.[chainId as keyof typeof COSMOS_CHAINS]?.name ?? chainId,
    ) ?? [],
  );

  const { verifyContext } = proposal;

  const { toast } = useToast();

  const { supportedNamespaces } = useSupportedWCNamespaces();
  const { mutate: approveWCSession, isPending: approvingWCSession } =
    useApproveWCSessionMutation();

  const closeScreen = () => {
    router.dismissTo(ROUTES.APP.REFRESH); // close all screens modals, go to ROOT path and refresh it
  };

  const onApprove = () => {
    approveWCSession(
      {
        supportedNamespaces,
        proposal,
      },
      {
        onError: async (e) => {
          toast({
            title: 'Error Approving Session',
            description: (e as Error)?.message,
          });
        },
        onSuccess: async () => {
          closeScreen();
        },
      },
    );
  };

  const { mutate: rejectWCSession, isPending: rejectingWCSession } =
    useRejectWCSessionMutation();

  const onReject = () => {
    rejectWCSession(
      { proposal },
      {
        onError: async (e) => {
          toast({
            title: 'Error Rejecting Session',
            description: (e as Error)?.message,
          });
          await sleep(5000);
          closeScreen();
        },
        onSuccess: () => {
          closeScreen();
        },
      },
    );
  };

  const { name } = metadata;

  const disabled = approvingWCSession || rejectingWCSession;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
      <Header title={PAGE_TITLE} onClose={closeScreen} />

      <div className="p-8 mt-4 h-full flex flex-grow flex-col justify-center">
        <WCProposalMetadata metadata={metadata} verifyContext={verifyContext}>
          <div className="text-xl my-5 font-medium">
            {name} is requesting to connect to your account on {chains}
          </div>
        </WCProposalMetadata>
      </div>
      <WCProposalButtons
        disabled={disabled}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};

const WalletConnectApproveSessionScreen = (
  props: WalletConnectApproveSessionProps,
) => {
  return (
    <AuthenticatedScreenWrapper {...props}>
      <WalletConnectApproveSession {...props} />
    </AuthenticatedScreenWrapper>
  );
};

export default WalletConnectApproveSessionScreen;
