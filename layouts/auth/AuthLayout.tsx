'use dom';

import '@tailwind';

import React, { PropsWithChildren } from 'react';
import { router } from 'expo-router';

import { Logo } from '@/assets/icons';
import { ROUTES } from '@/constants';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const onLogoClick = () => {
    router.push(ROUTES.APP.ROOT);
  };
  return (
    <div className="max-w-full h-screen w-full bg-background-black p-5 flex flex-col">
      <header className="py-2 flex justify-center items-center">
        <Logo className="h-9" role="button" onClick={onLogoClick} />
      </header>
      {children}
    </div>
  );
};

export default AuthLayout;
