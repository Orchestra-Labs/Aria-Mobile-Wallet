import { walletkit } from '@/helpers';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { getSdkError } from '@walletconnect/utils';
import { SignClientTypes } from '@walletconnect/types';
import { formatJsonRpcError } from '@json-rpc-tools/utils';

type Params = {
  requestEvent: SignClientTypes.EventArguments['session_request'];
};

const rejectWCSession = async ({ requestEvent }: Params) => {
  if (!requestEvent) return;

  const { id, topic } = requestEvent;

  const response = formatJsonRpcError(
    id,
    getSdkError('USER_REJECTED_METHODS').message,
  );

  await walletkit.respondSessionRequest({
    topic,
    response,
  });
};

export const useRejectWCTransactionMutation = (
  options?: UseMutationOptions<void, Error, Params, unknown>,
) => {
  return useMutation({
    mutationFn: rejectWCSession,
    ...options,
  });
};
