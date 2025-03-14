import { walletkit } from '@/helpers';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { GetWCPairingsResponse } from '@/queries';
import { getSdkError } from '@walletconnect/utils';

type Params = {
  pairing: GetWCPairingsResponse[number];
};

export const deleteWCPairing = async ({ pairing: { topic } }: Params) => {
  await walletkit.disconnectSession({
    topic,
    reason: getSdkError('USER_DISCONNECTED'),
  });
};

export const useDeleteWCPairingMutation = (
  options?: UseMutationOptions<void, Error, Params, unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWCPairing,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wc-pairings'],
      });
    },
    ...options,
  });
};
