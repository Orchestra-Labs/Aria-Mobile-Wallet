import { RouteStore } from '@/types';
import { usePathname } from 'expo-router';
import { DOMProps } from 'expo/dom';

export const usePrepareDOMComponentProps = () => {
  const pathname = usePathname();

  return {
    dom: {
      style: {
        userSelect: 'none',
      },
      overScrollMode: 'never' as const,
      matchContents: true,
    } satisfies DOMProps,
    route: { pathname } satisfies RouteStore,
  };
};
