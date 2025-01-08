import { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootLoader } from '../RootLoader';

const RootManagers = ({ children }: PropsWithChildren) => {
  // add manager components here
  return (
    <RootLoader>
      {children}
      <StatusBar style="light" backgroundColor="black" translucent={false} />
    </RootLoader>
  );
};

export default RootManagers;
