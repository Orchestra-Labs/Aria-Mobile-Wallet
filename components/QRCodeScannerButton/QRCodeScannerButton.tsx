import React from 'react';
import { Button } from '@/ui-kit';
import { useAtomValue, useSetAtom } from 'jotai';
import { filteredAssetsAtom, recipientAddressAtom } from '@/atoms';
import { QRCode } from '@/assets/icons';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Asset } from '@/types';
import { useToast } from '@/hooks';

interface QRCodeScannerDialogProps {
  updateSendAsset: (asset: Asset, propagateChanges: boolean) => void;
}

export const QRCodeScannerButton: React.FC<QRCodeScannerDialogProps> = ({
  updateSendAsset,
}) => {
  const { toast } = useToast();
  const setAddress = useSetAtom(recipientAddressAtom);
  const filteredAssets = useAtomValue(filteredAssetsAtom);

  const qrCodeReader = new BrowserQRCodeReader();

  const handleScan = (result: string | null) => {
    if (!result)
      return toast({
        title: 'Error scanning QR code',
        description: 'Please try again with a different QR code.',
        duration: 5000,
      });

    try {
      const parsedResult = JSON.parse(result);
      if (parsedResult.address && parsedResult.denomPreference) {
        const preferredAsset = filteredAssets.find(
          (asset) => asset.denom === parsedResult.denomPreference,
        );

        setAddress(parsedResult.address);
        updateSendAsset(preferredAsset as Asset, true);
      } else {
        setAddress(result);
      }
    } catch (_) {
      setAddress(result);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const url = URL.createObjectURL(file);
        const result = await qrCodeReader.decodeFromImageUrl(url);
        handleScan(result.getText());
        URL.revokeObjectURL(url);
      } catch (_) {
        toast({
          title: 'Error scanning QR code',
          description: 'Please try again with a different QR code.',
          duration: 5000,
        });
      }
    }
  };

  const openFileInput = () => {
    const fileInput = document.getElementById(
      'qr-file-input',
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <>
      <Button variant="blank" onClick={openFileInput}>
        <QRCode
          className="h-7 w-7 text-neutral-1 hover:bg-blue-hover hover:text-blue-dark cursor-pointer"
          width={20}
        />
      </Button>

      {/* Hidden File Input */}
      <input
        id="qr-file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </>
  );
};
