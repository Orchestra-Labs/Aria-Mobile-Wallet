import React, { PropsWithChildren } from 'react';

import { router } from 'expo-router';

const MenuLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const onCloseClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="max-w-full w-full bg-background-dialog-bg h-auto flex flex-col">
        <div className="bg-background-dialog-bg">{children}</div>
      </div>
      <div
        className="flex-grow w-full bg-background-dialog-bg/50 backdrop-blur-sm"
        role="button"
        onClick={onCloseClick}
      />
    </div>
  );
};

export default MenuLayout;
