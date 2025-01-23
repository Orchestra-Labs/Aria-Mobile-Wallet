'use dom';

import '@tailwind';

import React, { useState } from 'react';
import { isInitialDataLoadAtom } from '@/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { ROUTES, SettingsOptions } from '@/constants';
import { Button, Separator } from '@/ui-kit';
import { saveAccountByID } from '@/helpers/dataHelpers/account';
import { userAccountAtom } from '@/atoms/accountAtom';
import { Header } from '@/components';
import { AuthenticatedScreenWrapper } from '@/wrappers';
import { AuthLayout } from '@/layouts';
import { router } from 'expo-router';
import { DOMProps } from 'expo/dom';

interface SettingsScreenProps {
  dom?: DOMProps;
}

const DEFAULT_CONFIG = {
  // [SettingsOptions.STABLECOIN_FEE]: false,
  [SettingsOptions.VALIDATOR_STATUS]: false,
};

const PAGE_TITLE = 'Change Settings';

const Settings: React.FC<SettingsScreenProps> = () => {
  const isInitialDataLoad = useAtomValue(isInitialDataLoadAtom);
  const [userAccount, setUserAccount] = useAtom(userAccountAtom);

  const [tempSettings, setTempSettings] = useState(userAccount?.settings);

  const closeAndReturn = () => {
    router.push(ROUTES.APP.ROOT);
  };

  const toggleOption = (option: SettingsOptions) => {
    if (tempSettings) {
      const updatedAccount = {
        ...tempSettings,
        [option]: !tempSettings[option],
      };

      setTempSettings(updatedAccount);
    } else {
      console.warn('Settings is undefined');
    }
  };

  const confirmSelection = () => {
    if (userAccount && tempSettings) {
      const updatedAccount = {
        ...userAccount,
        settings: tempSettings,
      };

      setUserAccount(updatedAccount);
      saveAccountByID(updatedAccount);
    } else {
      console.warn('Settings or userAccount is undefined:', {
        config: tempSettings,
        userAccount,
      });
    }

    closeAndReturn();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white">
      {/* Top bar */}
      <Header title={PAGE_TITLE} />

      {/* Configuration options */}
      <div className="flex flex-grow flex-col px-4 pt-4">
        <h2 className="text-lg font-bold text-center">Configuration Options</h2>
        <div className="flex flex-col gap-4 mt-4 mx-[10%]">
          {/* <label className="flex flex-grow gap-4">
            <input
              type="checkbox"
              checked={
                (tempSettings && tempSettings[SettingsOptions.STABLECOIN_FEE]) ||
                DEFAULT_CONFIG[SettingsOptions.STABLECOIN_FEE]
              }
              onChange={() => toggleOption(SettingsOptions.STABLECOIN_FEE)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-left flex">Pay Gas With Stablecoins</span>
          </label> */}
          <label className="flex flex-grow gap-4">
            <input
              type="checkbox"
              checked={
                (tempSettings &&
                  tempSettings[SettingsOptions.VALIDATOR_STATUS]) ||
                DEFAULT_CONFIG[SettingsOptions.VALIDATOR_STATUS]
              }
              onChange={() => toggleOption(SettingsOptions.VALIDATOR_STATUS)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-left flex">
              View Validators by Activity Status
            </span>
          </label>
        </div>
      </div>

      <Separator variant="top" />
      <div className="flex justify-center mb-4">
        <Button
          className="w-[56%] text-center"
          disabled={isInitialDataLoad}
          onClick={confirmSelection}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const SettingsScreen = (_: SettingsScreenProps) => {
  return (
    <AuthenticatedScreenWrapper>
      <AuthLayout>
        <Settings />
      </AuthLayout>
    </AuthenticatedScreenWrapper>
  );
};

export default SettingsScreen;
