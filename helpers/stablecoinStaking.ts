import { CHAIN_ENDPOINTS } from '@/constants';
import { RPCResponse } from '@/types';
import {
  StablecoinStakeParams,
  StablecoinStakingParams,
  StablecoinStakingStablePool,
  StablecoinStakingStablePools,
  StablecoinStakingUserStake,
  StablecoinStakingUserTotalStake,
  StablecoinStakingUserTotalUnbondings,
  StablecoinStakingUserUnbonding,
} from '@/types/stablecoin-staking';

import { queryRestNode, queryRpcNode } from './queryNodes';

export const fetchStablecoinStakingParams = async () => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingParams}`;
    const response = await queryRestNode<StablecoinStakingParams>({ endpoint });
    console.log('Stable-Staking: params', response);

    return response;
  } catch (error) {
    console.error('Error fetching staking params:', error);
    throw error;
  }
};

export const fetchStablecoinStakingStablePool = async (
  denom: string,
): Promise<StablecoinStakingStablePool> => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingStablePool}?denom=${denom}`;
    const response = await queryRestNode<StablecoinStakingStablePool>({
      endpoint,
    });
    console.log('Stable-Staking: stable pool', response);

    return response;
  } catch (error) {
    console.error('Error fetching stable pool:', error);
    throw error;
  }
};

export const fetchStablecoinStakingStablePools =
  async (): Promise<StablecoinStakingStablePools> => {
    try {
      const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingStablePools}`;
      const response = await queryRestNode<StablecoinStakingStablePools>({
        endpoint,
      });
      console.log('Stable-Staking: stable pools', response);

      return response;
    } catch (error) {
      console.error('Error fetching stable pools:', error);
      throw error;
    }
  };

export const fetchStablecoinStakingUserStake = async ({
  address,
  denom,
}: {
  address: string;
  denom: string;
}): Promise<StablecoinStakingUserStake> => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingUserStake}?address=${address}&denom=${denom}`;
    const response = await queryRestNode<StablecoinStakingUserStake>({
      endpoint,
    });
    console.log('Stable-Staking: user stake info', response);

    return response;
  } catch (error) {
    console.error('Error fetching user stake info:', error);
    throw error;
  }
};

export const fetchStablecoinStakingUserTotalStake = async (
  address: string,
): Promise<StablecoinStakingUserTotalStake> => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingUserTotalStake}?address=${address}`;
    const response = await queryRestNode<StablecoinStakingUserTotalStake>({
      endpoint,
    });
    console.log('Stable-Staking: user total stake', response);

    return response;
  } catch (error) {
    console.error('Error fetching user total stake:', error);
    throw error;
  }
};

export const fetchStablecoinStakingUserUnbounding = async ({
  address,
  denom,
}: {
  address: string;
  denom: string;
}): Promise<StablecoinStakingUserUnbonding> => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingUserUnbounding}?address=${address}&denom=${denom}`;
    const response = await queryRestNode<StablecoinStakingUserUnbonding>({
      endpoint,
    });
    console.log('Stable-Staking: user unbounding', response);

    return response;
  } catch (error) {
    console.error('Error fetching user unbounding:', error);
    throw error;
  }
};

export const fetchStablecoinStakingUserTotalUnbounding = async (
  address: string,
): Promise<StablecoinStakingUserTotalUnbondings> => {
  try {
    const endpoint = `${CHAIN_ENDPOINTS.stablecoinStakingUserTotalUnbounding}?address=${address}`;
    const response = await queryRestNode<StablecoinStakingUserTotalUnbondings>({
      endpoint,
    });
    console.log('Stable-Staking: user total unbounding', response);

    return response;
  } catch (error) {
    console.error('Error fetching total unbounding:', error);
    throw error;
  }
};

export const stakeStablecoin = async ({
  body,
  feeDenom,
}: {
  body: StablecoinStakeParams;
  feeDenom: string;
}): Promise<RPCResponse> => {
  const endpoint = CHAIN_ENDPOINTS.stablecoinStake;

  const messages = [
    {
      typeUrl: endpoint,
      value: {
        staker: body.staker,
        amount: body.amount,
      },
    },
  ];

  try {
    const response = await queryRpcNode<RPCResponse>({
      endpoint,
      walletAddress: body.staker,
      messages: messages,
      feeDenom: feeDenom,
      simulateOnly: false,
    });

    console.log('Stable-Staking: stake', response);

    return response;
  } catch (error) {
    console.error('Error staking stablecoin:', error);
    throw error;
  }
};

export const unstakeStablecoin = async ({
  body,
  feeDenom,
}: {
  body: StablecoinStakeParams;
  feeDenom: string;
}): Promise<RPCResponse> => {
  const messages = [
    {
      typeUrl: CHAIN_ENDPOINTS.stablecoinUnstake,
      value: body,
    },
  ];

  try {
    const response = await queryRpcNode<RPCResponse>({
      endpoint: CHAIN_ENDPOINTS.stablecoinUnstake,
      walletAddress: body.staker,
      messages,
      feeDenom,
    });

    console.log('Stable-Staking: unstake', response);

    return response;
  } catch (error) {
    console.error('Error unstaking stablecoin:', error);
    throw error;
  }
};
