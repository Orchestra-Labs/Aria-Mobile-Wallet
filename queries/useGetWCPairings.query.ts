import { walletkit } from '@/helpers';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { PairingTypes } from '@walletconnect/types';

type Response = PairingTypes.Struct[];

export type { Response as GetWCPairingsResponse };

const getWCPairings = () => {
  return walletkit.core.pairing.getPairings();
};

export const useGetWCPairingsQuery = (
  options?: UseQueryOptions<
    Response,
    Error,
    Response,
    readonly ['wc-pairings']
  >,
) => {
  return useQuery({
    queryKey: ['wc-pairings'],
    queryFn: getWCPairings,
    ...options,
  });
};
