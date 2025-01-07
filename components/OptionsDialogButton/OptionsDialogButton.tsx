import React from 'react';

import { DotsVertical } from '@/assets/icons';
import { Button } from '@/ui-kit';
import { ROUTES } from '@/constants';
import { router } from 'expo-router';

type OptionsDialogButtonProps = {
  onClick?: () => void;
  Icon?: React.ReactNode;
};

const goToOptionsRoute = () => router.push(ROUTES.MENU.OPTIONS);

export const OptionsDialogButton: React.FC<OptionsDialogButtonProps> = ({
  onClick = goToOptionsRoute,
  Icon = <DotsVertical width="100%" height="100%" />,
}) => {
  return (
    <Button
      className="p-[7px] bg-neutral-3"
      variant="icon"
      size="rounded-default"
      onClick={onClick}
    >
      {Icon}
    </Button>
  );
};
