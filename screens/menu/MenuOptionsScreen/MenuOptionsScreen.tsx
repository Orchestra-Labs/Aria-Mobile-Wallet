import { ArrowLeft, Discord, Edit } from '@/assets/icons';
import { LINKS, ROUTES } from '@/constants';
import { Link } from 'expo-router';
import { Button } from '@/ui-kit';
import { LogOut } from 'lucide-react';
import { useLogout } from '@/hooks';

const OPTIONS = [
  {
    id: 1,
    name: 'Edit Coin List',
    icon: <Edit width={16} height={16} />,
    to: ROUTES.APP.EDIT_COIN_LIST,
  },
  {
    id: 2,
    name: 'Contact Us',
    icon: <Discord />,
    to: LINKS.DISCORD_SERVER,
  },
];

// TODO: add animation slide down on open, animation slide up on close
export const MenuOptions = () => {
  const logout = useLogout();
  return (
    <div className="p-5">
      <h3 className="text-h5 font-bold text-white">Options</h3>
      <div className="grid">
        {OPTIONS.map((option) => (
          <Link
            key={option.id}
            href={option.to}
            className="flex items-center text-sm text-white font-normal py-3 not-last:border-b not-last:border-neutral-4 hover:text-white"
          >
            <div className="h-8 w-8 bg-blue rounded-full flex items-center justify-center p-1.5 mr-2.5 text-black">
              {option.icon}
            </div>
            {option.name}
            <div className="flex-1" />
            <ArrowLeft className="rotate-180 h-3 w-3" />
          </Link>
        ))}
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
      </div>
    </div>
  );
};
