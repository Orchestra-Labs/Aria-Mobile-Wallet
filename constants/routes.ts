// TODO: organize and include sub-routing for open slidetrays and swipe indices
export const ROUTES = {
  APP: {
    ROOT: '/' as const,
    TRANSACTIONS_HISTORY: '/auth/new-wallet' as const,
    TRANSACTION: '/auth/new-wallet' as const,
    SEND: '/auth/new-wallet' as const,
    RECEIVE: '/auth/new-wallet' as const,
    ADD_NETWORK: '/auth/new-wallet' as const,
    EDIT_COIN_LIST: '/edit-coins-list' as const,
  },
  AUTH: {
    ROOT: '/auth' as const,
    NEW_WALLET: {
      ROOT: '/auth/new-wallet' as const,
      CREATE: '/auth/create-wallet' as const,
      IMPORT: '/auth/import-wallet' as const,
    },
  },
  MENU: {
    OPTIONS: '/menu-options' as const,
  },
};
