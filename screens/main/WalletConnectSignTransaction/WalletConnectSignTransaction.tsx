'use dom';

import React from 'react';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { SignClientTypes } from '@walletconnect/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui-kit';
import { walletkit } from '@/helpers/walletConnect';
import { router } from 'expo-router';
import { useToast } from '@/hooks';
import { COSMOS_CHAINS } from '@/constants/wc';
import {
  useApproveWCTransactionMutation,
  useRejectWCTransactionMutation,
} from '@/queries';
import { DOMComponentProps } from '@/types';
import { Header, WCProposalButtons } from '@/components';
import { WCProposalMetadata } from '@/components';
import { ROUTES } from '@/constants';
import { sleep } from '@/helpers';

const PAGE_TITLE = 'Approve Transaction';

interface WalletConnectSignTransactionProps extends DOMComponentProps {
  requestEvent: SignClientTypes.EventArguments['session_request'];
}

const WalletConnectSignTransaction: React.FC<
  WalletConnectSignTransactionProps
> = ({ requestEvent }) => {
  const { verifyContext } = requestEvent;

  const signDoc: object | undefined =
    requestEvent.params.request.params?.signDoc;

  const { topic, params } = requestEvent;
  const { chainId } = params;

  const chainIds = [chainId];

  const chains = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  }).format(
    chainIds.map(
      (chainId) =>
        COSMOS_CHAINS?.[chainId as keyof typeof COSMOS_CHAINS]?.name ?? chainId,
    ) ?? [],
  );

  const requestSession = walletkit.engine.signClient.session.get(topic);

  const metadata = requestSession.peer.metadata;

  const { toast } = useToast();

  const closeScreen = () => {
    router.dismissTo(ROUTES.APP.REFRESH); // close all screens modals, go to ROOT path and refresh it
  };

  const { mutate: approveWCTransaction, isPending: approvingTransaction } =
    useApproveWCTransactionMutation();
  const { mutate: rejectWCTransaction, isPending: rejectingTransaction } =
    useRejectWCTransactionMutation();

  const onApprove = async () => {
    approveWCTransaction(
      {
        requestEvent,
      },
      {
        onError: (error) => {
          toast({
            title: 'Error approving',
            description: error.message ?? 'Something went wrong.',
            duration: 5000,
          });
        },
        onSuccess: () => {
          closeScreen();
        },
      },
    );
  };

  const onReject = async () => {
    rejectWCTransaction(
      { requestEvent },
      {
        onError: async (error) => {
          toast({
            title: 'Error rejecting',
            description: error.message ?? 'Something went wrong.',
            duration: 5000,
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

  const onCloseClick = () => {
    onReject();
    closeScreen();
  };

  const { name } = metadata;

  const disabled = approvingTransaction || rejectingTransaction;

  return (
    <div className="min-h-dvh flex flex-col overflow-hidden bg-black text-white">
      <Header title={PAGE_TITLE} onClose={onCloseClick} />

      <div className="p-8 mt-4 h-full flex flex-grow flex-col justify-center">
        <WCProposalMetadata metadata={metadata} verifyContext={verifyContext}>
          <div className="text-xl my-5 font-medium">
            {name} wants you to sign transaction on {chains}
          </div>
        </WCProposalMetadata>
        {signDoc && (
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Data</AccordionTrigger>
                <AccordionContent>
                  <pre className="max-w-full overflow-auto select-none">
                    {JSON.stringify(signDoc, null, 2)}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>

      <WCProposalButtons
        disabled={disabled}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};

const WalletConnectSignTransactionScreen = (
  props: WalletConnectSignTransactionProps,
) => {
  return (
    <AuthenticatedScreenWrapper {...props}>
      <WalletConnectSignTransaction {...props} />
    </AuthenticatedScreenWrapper>
  );
};

export default WalletConnectSignTransactionScreen;
