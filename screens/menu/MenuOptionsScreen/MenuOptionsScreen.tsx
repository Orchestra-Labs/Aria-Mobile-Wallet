'use dom';

import '@tailwind';

import { ArrowLeft, Discord, Edit } from '@/assets/icons';
import { LINKS, ROUTES } from '@/constants';
import { Button } from '@/ui-kit';
import {
  Globe,
  GraduationCap,
  LogOut,
  NotebookPenIcon,
  NotebookTextIcon,
  ScanQrCode,
  Settings,
} from 'lucide-react';
import { useLogout } from '@/hooks';
import { LocalStorage } from '@/helpers';
import { SETTINGS } from '@/constants';
import { ExternalLink } from '@/components';
import { Link } from 'expo-router';
import { MenuLayout } from '@/layouts';
import { DOMProps } from 'expo/dom';

const OPTIONS = [
  {
    id: 1,
    name: 'Settings',
    icon: <Settings width={16} height={16} />,
    target: '',
    to: ROUTES.APP.SETTINGS,
  },
  {
    id: 2,
    name: 'Change Password',
    icon: <NotebookPenIcon width={16} height={16} />,
    target: '',
    to: ROUTES.APP.CHANGE_PASSWORD,
  },
  {
    id: 3,
    name: 'View Passphrase',
    icon: <NotebookTextIcon width={16} height={16} />,
    target: '',
    to: ROUTES.APP.VIEW_PASSPHRASE,
  },
  {
    id: 4,
    name: 'Edit Coin List',
    icon: <Edit width={16} height={16} />,
    to: ROUTES.APP.EDIT_COIN_LIST,
  },

  {
    id: 5,
    name: 'View Tutorial',
    icon: <GraduationCap width={16} height={16} />,
    target: '',
    to: ROUTES.APP.SWAP_TUTORIAL,
  },
  {
    id: 6,
    name: 'Contact Us',
    icon: <Discord />,
    target: '_blank',
    to: LINKS.DISCORD_SERVER,
  },
  {
    id: 7,
    name: 'Connect dApp',
    icon: <ScanQrCode width={16} height={16} />,
    to: `${ROUTES.APP.QR_SCANNER}?nextPathname=${ROUTES.APP.WALLET_CONNECT.INIT_SESSION}` as const,
  },
  {
    id: 7,
    name: 'Connected dApps',
    icon: <Globe width={16} height={16} />,
    to: ROUTES.APP.WALLET_CONNECT.PAIRINGS,
  },
];

type MenuOptionsScreenProps = {
  dom?: DOMProps;
};

// TODO: add animation slide down on open, animation slide up on close
const MenuOptions = () => {
  const logout = useLogout();
  const clearStorage = () => LocalStorage.clearStorage();
  const showClearStorageButton = SETTINGS.isDev || SETTINGS.isPreview;
  return (
    <div className="p-5">
      <h3 className="text-h5 font-bold text-white">Options</h3>
      <div className="grid">
        {OPTIONS.map((option) => {
          const Component = option.target === '_blank' ? ExternalLink : Link;
          return (
            <Component
              key={option.id}
              href={option.to}
              replace
              className="flex items-center text-sm text-white font-normal py-3 not-last:border-b not-last:border-neutral-4 hover:text-white"
            >
              <div className="h-8 w-8 bg-blue rounded-full flex items-center justify-center p-1.5 mr-2.5 text-black">
                {option.icon}
              </div>
              {option.name}
              <div className="flex-1" />
              <ArrowLeft className="rotate-180 h-3 w-3" />
            </Component>
          );
        })}
        <Button
          variant="transparent"
          className="flex items-center text-sm text-white font-normal py-3 px-0 h-auto rounded-none hover:text-white"
          onClick={logout}
        >
          <div className="h-8 w-8 bg-blue rounded-full flex items-center justify-center p-1.5 mr-2.5 text-black">
            <LogOut width={16} height={16} />
          </div>
          Logout
          <div className="flex-1" />
          <ArrowLeft className="rotate-180 h-3 w-3" />
        </Button>
        {showClearStorageButton && (
          <Button
            variant="transparent"
            className="flex items-center text-sm text-white font-normal py-3 px-0 h-auto rounded-none hover:text-white"
            onClick={clearStorage}
          >
            Clear Storage (Dev)
            <div className="flex-1" />
            <ArrowLeft className="rotate-180 h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

const MenuOptionsScreen = (_: MenuOptionsScreenProps) => {
  return (
    <MenuLayout>
      <MenuOptions />
    </MenuLayout>
  );
};

export default MenuOptionsScreen;
