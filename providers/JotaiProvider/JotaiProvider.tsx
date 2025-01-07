import { createStore, Provider } from 'jotai';

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={createStore()}>{children}</Provider>;
};
