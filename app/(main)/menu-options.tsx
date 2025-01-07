'use dom';

import '@tailwind';

import { X } from '@/assets/icons';
import { router } from 'expo-router';
import { MainLayout, MenuLayout } from '@/layouts';
import { OptionsDialogButton } from '@/components';
import { MenuOptions } from '@/screens';

// TODO: add animation slide down on open, animation slide up on close
export default function MenuOptionsScreen() {
  const onCloseClick = () => {
    router.back();
  };

  return (
    <MainLayout
      className="bg-transparent"
      OptionsMenu={
        <OptionsDialogButton
          onClick={onCloseClick}
          Icon={<X width="100%" height="100%" />}
        />
      }
    >
      <MenuLayout>
        <MenuOptions />
      </MenuLayout>
    </MainLayout>
  );
}
