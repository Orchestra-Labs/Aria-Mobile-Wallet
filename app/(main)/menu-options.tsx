'use dom';

import '@tailwind';

import { MenuLayout } from '@/layouts';
import { MenuOptions } from '@/screens';

// TODO: add animation slide down on open, animation slide up on close
export default function MenuOptionsScreen() {
  return (
    <MenuLayout>
      <MenuOptions />
    </MenuLayout>
  );
}
