import React, { PropsWithChildren, ReactElement } from 'react';

import { LogoIcon } from '@/assets/icons';
import { ROUTES } from '@/constants';
import { useAtomValue } from 'jotai';
import { userWalletAtom } from '@/atoms/walletStateAtom';
import { Link } from 'expo-router';
import { OptionsDialogButton } from '@/components';
import { cn } from '@/helpers';

type MainLayoutProps = {
  className?: string;
  OptionsMenu?: ReactElement;
};

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
  className,
  OptionsMenu = <OptionsDialogButton />,
}) => {
  const userWallet = useAtomValue(userWalletAtom);

  return (
    <div
      className={cn(
        'max-w-full h-screen min-h-screen w-full bg-background-dark-grey flex flex-col',
        className,
      )}
    >
      <header className="bg-gradient-to-b from-[#202022] to-[#33334652] h-20 p-4 flex items-center">
        <Link className="flex max-h-12 mr-4" href={ROUTES.APP.ROOT}>
          <LogoIcon className="h-auto w-auto" />
        </Link>
        <h1 className="text-white text-h3 font-semibold">{userWallet?.name}</h1>

        <div className="flex-1" />
        <div className="flex gap-x-2.5">{OptionsMenu}</div>
      </header>
      {children}
    </div>
  );
};

export default MainLayout;
