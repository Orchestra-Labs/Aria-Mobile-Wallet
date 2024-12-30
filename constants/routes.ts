// TODO: organize and include sub-routing for open slidetrays and swipe indices
export const ROUTES = {
  APP: {
    ROOT: '/explore' as const,
    TRANSACTIONS_HISTORY: '/auth/new-wallet' as const,
    TRANSACTION: '/auth/new-wallet' as const,
    SEND: '/auth/new-wallet' as const,
    RECEIVE: '/auth/new-wallet' as const,
    ADD_NETWORK: '/auth/new-wallet' as const,
    EDIT_COIN_LIST: '/auth/new-wallet' as const,
  },
  AUTH: {
    ROOT: '/auth/index' as const,
    NEW_WALLET: {
      ROOT: '/auth/new-wallet' as const,
      CREATE: '/auth/new-wallet' as const,
      IMPORT: '/auth/new-wallet' as const,
    },
  },
};
