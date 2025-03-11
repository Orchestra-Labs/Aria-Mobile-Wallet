import { walletkit } from '@/helpers';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { getSdkError } from '@walletconnect/utils';
import { SignClientTypes } from '@walletconnect/types';

type Params = {
  proposal: SignClientTypes.EventArguments['session_proposal'];
};

const rejectWCSession = async ({ proposal }: Params) => {
  if (!proposal) return;

  await walletkit.rejectSession({
    id: proposal.id,
    reason: getSdkError('USER_REJECTED_METHODS'),
  });
};

export const useRejectWCSessionMutation = (
  options?: UseMutationOptions<void, Error, Params, unknown>,
) => {
  return useMutation({
    mutationFn: rejectWCSession,
    ...options,
  });
};
