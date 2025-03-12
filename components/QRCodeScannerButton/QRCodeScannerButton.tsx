import React from 'react';
import { Button } from '@/ui-kit';
import { QRCode } from '@/assets/icons';
import { router } from 'expo-router';
import { ROUTES } from '@/constants';

export const QRCodeScannerButton = () => {
  const onScanClick = () => {
    router.push({
      pathname: ROUTES.APP.QR_SCANNER,
      params: {
        nextPathname: ROUTES.APP.SEND,
        nextParam: 'address',
      },
    });
  };

  return (
    <>
      <Button variant="blank" onClick={onScanClick}>
        <QRCode
          className="h-7 w-7 text-neutral-1 hover:bg-blue-hover hover:text-blue-dark cursor-pointer"
          width={20}
        />
      </Button>
    </>
  );
};
