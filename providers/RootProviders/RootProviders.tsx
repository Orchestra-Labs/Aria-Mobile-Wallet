import { PropsWithChildren } from 'react';
import { JotaiProvider } from '../JotaiProvider';

const RootProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default RootProviders;
