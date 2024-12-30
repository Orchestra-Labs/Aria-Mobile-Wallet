import { Asset } from '@/types';
import { NetworkLevel } from './enums';

// Network-related constants
export const NETWORK = 'symphony';
export const WALLET_PREFIX = 'symphony';

// RPC and REST URLs for the Symphony network
export const DEFAULT_CHAIN_NAME = 'symphonytestnet';
const DEFAULT_CHAIN_ID = 'symphony-testnet-4';

// IBC-related constants
export const IBC_PREFIX = 'ibc/';
export const LESSER_EXPONENT_DEFAULT = 0;
export const GREATER_EXPONENT_DEFAULT = 6;

export const MAX_NODES_PER_QUERY = 3;
// Endpoints for different network operations

// ! TODO: get from env
const isDev = true;

const DEV_PROXY = 'http://localhost:5173';

// Define the shape of the local asset registry
type AssetRegistry = {
  [key: string]: Asset;
};

// Asset registry for the Symphony network
export const LOCAL_ASSET_REGISTRY: AssetRegistry = {
  uusd: {
    denom: 'uusd',
    amount: '10',
    isIbc: false,
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/symphonytestnet/images/husd.png',
    symbol: 'HUSD',
    exponent: GREATER_EXPONENT_DEFAULT,
    networkName: 'Symphony Testnet',
    networkID: DEFAULT_CHAIN_ID,
  },
  ukhd: {
    denom: 'uhkd',
    amount: '1.282',
    isIbc: false,
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/symphonytestnet/images/hhkd.png',
    symbol: 'HHKD',
    exponent: GREATER_EXPONENT_DEFAULT,
    networkName: 'Symphony Testnet',
    networkID: DEFAULT_CHAIN_ID,
  },
  uvnd: {
    denom: 'uvnd',
    amount: '0.000399',
    isIbc: false,
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/symphonytestnet/images/hvnd.png',
    symbol: 'HVND',
    exponent: GREATER_EXPONENT_DEFAULT,
    networkName: 'Symphony Testnet',
    networkID: DEFAULT_CHAIN_ID,
  },
  note: {
    denom: 'note',
    amount: '1',
    isIbc: false,
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/symphonytestnet/images/mld.png',
    symbol: 'MLD',
    exponent: GREATER_EXPONENT_DEFAULT,
    isFeeToken: true,
    networkName: 'Symphony Testnet',
    networkID: DEFAULT_CHAIN_ID,
  },
};

export const DEFAULT_ASSET = LOCAL_ASSET_REGISTRY.note;

export const CHAIN_NODES = {
  symphonytestnet: [
    {
      rpc: isDev
        ? `${DEV_PROXY}/kleomedes-rpc`
        : 'https://symphony-rpc.kleomedes.network',
      rest: isDev
        ? `${DEV_PROXY}/kleomedes-rest`
        : 'https://symphony-api.kleomedes.network',
      provider: 'Kleomedes',
    },
    /*nodeshub has tx indexing disabled, this is a good way to test errors, but not for production
    {
      rpc: isDev ? `${DEV_PROXY}/nodeshub-rpc` : 'https://symphony.test.rpc.nodeshub.online',
      rest: isDev ? `${DEV_PROXY}/nodeshub-rest` : 'https://symphony.test.api.nodeshub.online',
      provider: 'Nodes Hub',
    },*/
    {
      rpc: isDev
        ? `${DEV_PROXY}/cogwheel-rpc`
        : 'https://symphony-testnet-rpc.cogwheel.zone',
      rest: isDev
        ? `${DEV_PROXY}/cogwheel-rest`
        : 'https://symphony-testnet-api.cogwheel.zone',
      provider: 'Cogwheel',
    },
  ],
};

export const CHAIN_ENDPOINTS = {
  getBalance: '/cosmos/bank/v1beta1/balances/',
  getDelegations: '/cosmos/staking/v1beta1/delegations/',
  getSpecificDelegations: '/cosmos/staking/v1beta1/delegators/',
  getValidators: '/cosmos/staking/v1beta1/validators',
  getIBCInfo: '/ibc/apps/transfer/v1/denom_traces/',
  getRewards: '/cosmos/distribution/v1beta1/delegators',
  claimRewards: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  delegateToValidator: '/cosmos.staking.v1beta1.MsgDelegate',
  undelegateFromValidator: '/cosmos.staking.v1beta1.MsgUndelegate',
  sendMessage: '/cosmos.bank.v1beta1.MsgSend',
  swap: '/symphony/market/v1beta1/swap?',
  exchangeRequirements: '/symphony/market/v1beta1/exchange_requirements',
  getStakingParams: '/cosmos/staking/v1beta1/params',
  getUptime: '/cosmos/slashing/v1beta1/signing_infos/',
  getIBCConnections: '/ibc/core/channel/v1/channels',
  sendIbcMessage: '/cosmos/tx/v1beta1/txs',
};

type LocalChainRegistryType = {
  [key: string]: {
    chainID: string;
    prefix: string;
    nodes: any;
    assets: AssetRegistry;
    chainName?: string;
  };
};

export const LOCAL_CHAIN_REGISTRY: LocalChainRegistryType = {
  [DEFAULT_CHAIN_ID]: {
    chainName: 'Symphony',
    chainID: DEFAULT_CHAIN_ID,
    prefix: 'symphony',
    nodes: CHAIN_NODES,
    assets: LOCAL_ASSET_REGISTRY,
  },
};

export const DEFAULT_SUBSCRIPTION = {
  [DEFAULT_CHAIN_ID]: {
    coinDenoms: [] as string[],
  },
};

// Time constants
export const ONE_MINUTE = 60 * 1000;
const FIVE_MINUTES = 5 * ONE_MINUTE;
const FIFTEEN_MINUTES = 3 * FIVE_MINUTES; // 15 minutes in milliseconds
const ONE_HOUR = 4 * FIFTEEN_MINUTES;
const ONE_DAY = 24 * ONE_HOUR;

export const RECHECK_TIMEOUT = FIVE_MINUTES;
export const INACTIVITY_TIMEOUT = FIFTEEN_MINUTES;
export const TOKEN_EXPIRATION_TIME = FIFTEEN_MINUTES;
export const STORED_DATA_TIMEOUT = ONE_DAY;
export const DATA_FRESHNESS_TIMEOUT = 15 * 1000; // Data is considered fresh for 15 seconds
export const ICON_CHANGEOVER_TIMEOUT = 750; // 0.75 seconds to hold confirmation icon
export const DELAY_BETWEEN_NODE_ATTEMPTS = 1000; //1 second between queries

export const defaultSendState = {
  asset: DEFAULT_ASSET,
  amount: 0,
  chainName: DEFAULT_CHAIN_NAME,
  networkLevel: NetworkLevel.TESTNET,
};
export const defaultReceiveState = {
  asset: DEFAULT_ASSET,
  amount: 0,
  chainName: DEFAULT_CHAIN_NAME,
  networkLevel: NetworkLevel.TESTNET,
};
